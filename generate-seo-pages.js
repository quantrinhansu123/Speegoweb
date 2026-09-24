const fs = require("fs");
const path = require("path");

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function plainText(html) {
  return decodeEntities(html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractRoutes(indexHtml) {
  const start = indexHtml.indexOf("const ROUTES = {");
  const end = indexHtml.indexOf("const TRI_LANG_MAP", start);
  if (start < 0 || end < 0) throw new Error("Could not find explore route definitions");
  const table = indexHtml.slice(start, end);
  const routePattern = /'(#\/[^']+)':\s*\{\s*file:\s*'([^']+)',\s*title:\s*'((?:\\.|[^'])*)',\s*nav:\s*'([^']+)',\s*lang:\s*'([^']+)'/g;
  const routes = [];
  for (const match of table.matchAll(routePattern)) {
    const [, hash, file, rawTitle, nav, lang] = match;
    const routePath = hash.slice(2);
    const localizedPath = lang === "vi" ? `vi/${routePath}` : `${lang}/${routePath.replace(/^(en|es)\//, "")}`;
    routes.push({ hash, file, title: rawTitle.replace(/\\'/g, "'"), nav, lang, urlPath: `/explore/${localizedPath}/` });
  }
  if (!routes.length) throw new Error("No explore routes were found for SEO page generation");
  return routes;
}

function extractShell(homeHtml) {
  const headerStart = homeHtml.indexOf('<header id="masthead"');
  const headerEnd = homeHtml.indexOf("</header>", headerStart) + "</header>".length;
  const footerStart = homeHtml.indexOf('<footer id="colophon"');
  const footerEnd = homeHtml.indexOf("</footer>", footerStart) + "</footer>".length;
  if (headerStart < 0 || headerEnd < 10 || footerStart < 0 || footerEnd < 10) {
    throw new Error("Could not extract shared homepage header and footer");
  }
  const canonical = homeHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  if (!canonical) throw new Error("Homepage canonical URL is required to generate SEO URLs");
  return {
    header: homeHtml.slice(headerStart, headerEnd),
    footer: homeHtml.slice(footerStart, footerEnd),
    origin: new URL(canonical).origin
  };
}

function renderBreadcrumb(items, routeLookup) {
  if (!items.length) return "";
  const links = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) return `<span class="breadcrumb-current">${escapeHtml(item.label)}</span>`;
    const route = routeLookup.get(item.href);
    const href = index === 0 ? "/" : (route ? route.urlPath : "/");
    return `<a href="${href}" class="breadcrumb-link">${escapeHtml(item.label)}</a><span class="breadcrumb-sep">/</span>`;
  }).join("");
  return `<nav class="breadcrumb-section" aria-label="Đường dẫn trang"><div class="container"><div class="breadcrumb-list">${links}</div></div></nav>`;
}

function cleanupFragment(fragment, routeLookup) {
  let html = fragment.replace(/<script\b[^>]*>[\s\S]*?window\.location\.replace\([\s\S]*?<\/script>/i, "");
  html = html.replace(/href=(['"])#(\/[^'"]+)\1/gi, (_full, quote, route) => {
    const target = routeLookup.get(`#${route}`);
    return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}#${route}${quote}`;
  });
  html = html.replace(/(src|poster|href)=(['"])assets\//gi, "$1=$2/explore/assets/");
  html = html.replace(/url\((['"]?)assets\//gi, "url($1/explore/assets/");
  html = html.replace(/href=(['"])#contact-form\1/gi, 'href="/#consultation-form"');
  // These client-rendered form mounts have no usable form in static HTML. The shared homepage CTA remains available.
  html = html.replace(/\s*<div\b(?:(?:[^>"']|"[^"]*"|'[^']*'))*data-component=(["'])cta-form\1(?:(?:[^>"']|"[^"]*"|'[^']*'))*>\s*<\/div>/gi, "");
  return html;
}

function generate({ root, output }) {
  const exploreRoot = path.join(root, "explore");
  const indexHtml = fs.readFileSync(path.join(exploreRoot, "index.html"), "utf8");
  const homeHtml = fs.readFileSync(path.join(output, "index.html"), "utf8");
  const routes = extractRoutes(indexHtml);
  const routeLookup = new Map(routes.map((route) => [route.hash, route]));
  const { header, footer, origin } = extractShell(homeHtml);
  const alternates = new Map();
  const langMapStart = indexHtml.indexOf("const TRI_LANG_MAP = [");
  const langMapEnd = indexHtml.indexOf("];", langMapStart);
  const langMap = indexHtml.slice(langMapStart, langMapEnd);
  for (const group of langMap.matchAll(/\{\s*vi:\s*'([^']+)',\s*en:\s*'([^']+)',\s*es:\s*'([^']+)'\s*\}/g)) {
    const entries = { vi: group[1], en: group[2], es: group[3] };
    for (const route of Object.values(entries)) alternates.set(route, entries);
  }

  for (const route of routes) {
    const source = path.join(exploreRoot, route.file);
    if (!fs.existsSync(source)) throw new Error(`Missing route content: ${route.file}`);
    let fragment = cleanupFragment(fs.readFileSync(source, "utf8"), routeLookup);
    const breadcrumbJson = fragment.match(/\bdata-breadcrumb='([^']+)'/i)?.[1];
    let breadcrumbs = [];
    if (breadcrumbJson) {
      try { breadcrumbs = JSON.parse(decodeEntities(breadcrumbJson)); } catch (error) {
        throw new Error(`Invalid breadcrumbs for ${route.file}: ${error.message}`);
      }
    }
    const breadcrumbMarkup = renderBreadcrumb(breadcrumbs, routeLookup);
    const isPost = route.file.includes("post-");
    if (isPost && breadcrumbMarkup) {
      fragment = fragment.replace(/<div\b[^>]*data-post-breadcrumb-slot[^>]*>\s*<\/div>/i, breadcrumbMarkup);
    }
    const description = (fragment.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1] || route.title);
    const metaDescription = plainText(description).slice(0, 300);
    const canonical = `${origin}${route.urlPath}`;
    const languageLinks = alternates.get(route.hash);
    const alternateUrls = languageLinks ? Object.fromEntries(Object.entries(languageLinks).map(([lang, hash]) => {
      const target = routeLookup.get(hash);
      return [lang, target ? target.urlPath : null];
    }).filter(([, url]) => url)) : {};
    const alternateTags = Object.entries(alternateUrls).map(([lang, url]) => `<link rel="alternate" hreflang="${lang}" href="${origin}${url}">`).join("\n    ");
    const localizedHeader = header
      .replace(/(src|href)=(['"])(?!\/|#|[a-z]+:)([^'"]+)\2/gi, "$1=$2/$3$2")
      .replace(/href=(['"])#([^'"]*)\1/gi, 'href="/#$2"')
      .replace(/href=(['"])\/explore\/#(\/[^'"]+)\1/gi, (_full, quote, hash) => {
        const target = routeLookup.get(`#${hash}`);
        return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}/explore/${quote}`;
      });
    const localizedFooter = footer
      .replace(/(src|href)=(['"])(?!\/|#|[a-z]+:)([^'"]+)\2/gi, "$1=$2/$3$2")
      .replace(/href=(['"])#([^'"]*)\1/gi, 'href="/#$2"')
      .replace(/href=(['"])\/explore\/#(\/[^'"]+)\1/gi, (_full, quote, hash) => {
        const target = routeLookup.get(`#${hash}`);
        return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}/explore/${quote}`;
      });
    const outputFile = path.join(output, ...route.urlPath.replace(/^\//, "").split("/"), "index.html");
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    const html = `<!doctype html>
<html lang="${route.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(route.title)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  ${alternateTags}
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="SpeeGo Logistics">
  <meta property="og:title" content="${escapeHtml(route.title)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" href="/wp-content/themes/logistica/images/favicon-speego.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/bootstrapb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/mainb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/styleb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/speego-custom.css?v=sourcing_home_20260923">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/speego-process-tabs.css">
  <link rel="stylesheet" href="/explore/css/style.css">
</head>
<body class="home wp-theme-logistica elementor-default elementor-template-full-width speego-seo-page" data-seo-language="${route.lang}">
  <div id="page" class="hfeed site">
    ${localizedHeader}
    <main id="app-main">${isPost ? "" : breadcrumbMarkup}${fragment}</main>
    ${localizedFooter}
  </div>
  <script>
    (function () {
      var localizedRoutes = ${JSON.stringify(alternateUrls)};
      document.addEventListener('click', function (event) {
        var option = event.target.closest('.speego-lang-option, .speego-lang-pill');
        if (!option) return;
        var target = localizedRoutes[option.getAttribute('data-lang')];
        if (!target) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.assign(target);
      }, true);
    }());
  </script>
  <script src="/explore/js/knowledge-article.js"></script>
  <script src="/wp-content/themes/logistica/js/speego-main.js?v=seo_routes_20260924_langfix1"></script>
</body>
</html>`;
    fs.writeFileSync(outputFile, html, "utf8");
  }

  // Point homepage discovery links at the full HTML routes so both visitors and crawlers reach page content directly.
  const homepagePath = path.join(output, "index.html");
  let homepage = fs.readFileSync(homepagePath, "utf8");
  homepage = homepage.replace(/href=(['"])\/explore\/#(\/[^'"]+)\1/gi, (_full, quote, hash) => {
    const target = routeLookup.get(`#${hash}`);
    return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}/explore/${quote}`;
  });
  fs.writeFileSync(homepagePath, homepage, "utf8");

  const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`];
  for (const route of routes) {
    const languageLinks = alternates.get(route.hash);
    const links = languageLinks ? Object.entries(languageLinks).map(([lang, hash]) => {
      const target = routeLookup.get(hash);
      return target ? `<xhtml:link rel="alternate" hreflang="${lang}" href="${origin}${target.urlPath}" />` : "";
    }).join("") : `<xhtml:link rel="alternate" hreflang="${route.lang}" href="${origin}${route.urlPath}" />`;
    sitemap.push(`  <url><loc>${origin}${route.urlPath}</loc><changefreq>monthly</changefreq>${links}</url>`);
  }
  sitemap.push(`  <url><loc>${origin}/</loc><changefreq>weekly</changefreq></url>`, `</urlset>`, "");
  fs.writeFileSync(path.join(output, "sitemap.xml"), sitemap.join("\n"), "utf8");
  fs.writeFileSync(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, "utf8");
  console.log(`Generated ${routes.length} static SEO routes, sitemap.xml, and robots.txt`);
}

module.exports = { generate };
