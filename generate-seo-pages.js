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
  const logisticsPaths = {
    '#/logistics/china-to-us-ca-au': '/logistics/china-to-us-ca-au/',
    '#/logistics/vietnam-to-us-ca-au': '/logistics/vietnam-to-us-ca-au/',
    '#/en/logistics/china-to-us-ca-au': '/en/logistics/china-to-us-ca-au/',
    '#/en/logistics/vietnam-to-us-ca-au': '/en/logistics/vietnam-to-us-ca-au/',
    '#/es/logistica/china-a-eeuu-canada-australia': '/es/logistica/china-a-eeuu-canada-australia/',
    '#/es/logistica/vietnam-a-eeuu-canada-australia': '/es/logistica/vietnam-a-eeuu-canada-australia/'
  };
  for (const match of table.matchAll(routePattern)) {
    const [, hash, file, rawTitle, nav, lang] = match;
    const routePath = hash.slice(2);
    const localizedPath = lang === "vi" ? `vi/${routePath}` : `${lang}/${routePath.replace(/^(en|es)\//, "")}`;
    const origin = routePath.includes('vietnam-to-us-ca-au') || routePath.includes('vietnam-a-eeuu-canada-australia') ? 'vietnam' :
      routePath.includes('china-to-us-ca-au') || routePath.includes('china-a-eeuu-canada-australia') ? 'china' : null;
    routes.push({ hash, file, title: rawTitle.replace(/\\'/g, "'"), nav, lang, origin, urlPath: logisticsPaths[hash] || `/explore/${localizedPath}/` });
  }
  if (!routes.length) throw new Error("No explore routes were found for SEO page generation");
  return routes;
}

function applyShippingOrigin(fragment, route) {
  if (!route.origin) return fragment;
  const vietnam = route.origin === 'vietnam';
  const names = {
    vi: vietnam ? 'Việt Nam' : 'Trung Quốc',
    en: vietnam ? 'Vietnam' : 'China',
    es: vietnam ? 'Vietnam' : 'China'
  };
  const origin = names[route.lang] || names.vi;
  const destinations = {
    vi: vietnam ? ['Việt Nam ➔ Mỹ', 'Việt Nam ➔ Canada', 'Việt Nam ➔ Úc', 'Việt Nam ➔ Nước khác'] : ['Trung Quốc ➔ Mỹ', 'Trung Quốc ➔ Canada', 'Trung Quốc ➔ Úc', 'Trung Quốc ➔ Nước khác'],
    en: vietnam ? ['Vietnam ➔ United States', 'Vietnam ➔ Canada', 'Vietnam ➔ Australia', 'Vietnam ➔ Other Countries'] : ['China ➔ United States', 'China ➔ Canada', 'China ➔ Australia', 'China ➔ Other Countries'],
    es: vietnam ? ['Vietnam ➔ Estados Unidos', 'Vietnam ➔ Canadá', 'Vietnam ➔ Australia', 'Vietnam ➔ Otros Países'] : ['China ➔ Estados Unidos', 'China ➔ Canadá', 'China ➔ Australia', 'China ➔ Otros Países']
  }[route.lang] || [];
  const replaceElementText = (html, id, text) => {
    const escaped = escapeHtml(text);
    const pattern = new RegExp(`(<[^>]*\\bid=["']${id}["'][^>]*>)[\\s\\S]*?(<\\/[a-z][^>]*>)`, 'i');
    return html.replace(pattern, `$1${escaped}$2`);
  };
  fragment = replaceElementText(fragment, 'routeOriginName', origin);
  fragment = replaceElementText(fragment, 'routeOriginDescName', origin);
  ['destRouteUS', 'destRouteCA', 'destRouteAU', 'destRouteGlobal'].forEach((id, index) => {
    fragment = replaceElementText(fragment, id, destinations[index]);
  });
  fragment = fragment.replace(/<a\b([^>]*data-route-origin="(?:china|vietnam)"[^>]*)>([\s\S]*?)<\/a>/gi, (_all, attrs, content) => {
    const current = attrs.includes(`data-route-origin="${route.origin}"`);
    const cleanAttrs = attrs.replace(/\s+aria-current="page"/gi, '').replace(/\s+class="([^"]*)"/i, (_match, classes) => ` class="${classes.split(/\s+/).filter((name) => name !== 'active').concat(current ? ['active'] : []).join(' ')}"`);
    return `<a${cleanAttrs}${current ? ' aria-current="page"' : ''}>${content}</a>`;
  });
  const currentName = route.lang === 'en' ? `Shipping Routes from ${vietnam ? 'Vietnam' : 'China'}` :
    route.lang === 'es' ? `Rutas de Envío desde ${vietnam ? 'Vietnam' : 'China'}` :
      `Tuyến vận chuyển từ ${vietnam ? 'Việt Nam' : 'Trung Quốc'}`;
  const breadcrumbAttr = fragment.match(/\bdata-breadcrumb='([^']+)'/i);
  if (breadcrumbAttr) {
    try {
      const crumbs = JSON.parse(decodeEntities(breadcrumbAttr[1]));
      if (crumbs.length) crumbs[crumbs.length - 1].label = currentName;
      fragment = fragment.replace(breadcrumbAttr[0], `data-breadcrumb='${JSON.stringify(crumbs)}'`);
    } catch (_) {}
  }
  return fragment;
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

function cleanupFragment(fragment, routeLookup, route) {
  let html = fragment.replace(/<script\b[^>]*>[\s\S]*?window\.location\.replace\([\s\S]*?<\/script>/i, "");
  html = html.replace(/href=(['"])#(\/[^'"]+)\1/gi, (_full, quote, routeHash) => {
    const target = routeLookup.get(`#${routeHash}`);
    return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}#${routeHash}${quote}`;
  });
  html = html.replace(/(src|poster|href)=(['"])assets\//gi, "$1=$2/explore/assets/");
  html = html.replace(/url\((['"]?)assets\//gi, "url($1/explore/assets/");

  // Inline the CTA band for static SEO pages (SPA mounts this via data-component).
  const ctaBand = buildCtaBandHtml(route && route.lang);
  if (ctaBand) {
    html = html.replace(
      /\s*<div\b(?:(?:[^>"']|"[^"]*"|'[^']*'))*data-component=(["'])cta-form\1(?:(?:[^>"']|"[^"]*"|'[^']*'))*>\s*<\/div>/gi,
      `\n${ctaBand}\n`
    );
    html = html.replace(/href=(['"])#contact-form\1/gi, 'href="#contact-form"');
  } else {
    html = html.replace(/href=(['"])#contact-form\1/gi, 'href="/#consultation-form"');
    html = html.replace(/\s*<div\b(?:(?:[^>"']|"[^"]*"|'[^']*'))*data-component=(["'])cta-form\1(?:(?:[^>"']|"[^"]*"|'[^']*'))*>\s*<\/div>/gi, "");
  }
  return html;
}

function buildCtaBandHtml(lang) {
  const copy = {
    vi: {
      tag: "LET'S MOVE FORWARD",
      heading: "Bắt đầu từ nhu cầu của bạn.",
      subtext: "Chia sẻ về hàng hóa và kế hoạch của doanh nghiệp. SpeeGo sẽ tư vấn giải pháp phù hợp.",
      labelName: "Họ và tên",
      placeholderName: "Nguyễn Văn An",
      labelEmail: "Email",
      placeholderEmail: "ban@congty.com",
      labelPhone: "Số điện thoại",
      placeholderPhone: "Số điện thoại liên hệ",
      labelMessage: "Nhu cầu tư vấn",
      placeholderMessage: "Loại hàng, số lượng, điểm đi và điểm đến...",
      btn: "Soạn email tư vấn ↗",
      note: "Mở ứng dụng email với nội dung đã điền. Thông tin chỉ được gửi đi khi bạn bấm Gửi trong email."
    },
    en: {
      tag: "LET'S MOVE FORWARD",
      heading: "Start with what<br>you need.",
      subtext: "Tell us about your products and business plans. SpeeGo will help you find the right solution.",
      labelName: "Full name",
      placeholderName: "Your full name",
      labelEmail: "Email",
      placeholderEmail: "you@company.com",
      labelPhone: "Phone number",
      placeholderPhone: "Your contact number",
      labelMessage: "How can we help?",
      placeholderMessage: "Product type, quantity, origin, and destination...",
      btn: "Draft an Inquiry ↗",
      note: "Opens your email app with a prepared message. Your information is only sent when you click Send in your email app."
    },
    es: {
      tag: "AVANCEMOS JUNTOS",
      heading: "Comience con lo que<br>su negocio necesita.",
      subtext: "Comparta los detalles de sus productos y planes comerciales. SpeeGo diseñará la solución ideal para usted.",
      labelName: "Nombre completo",
      placeholderName: "Su nombre y apellido",
      labelEmail: "Correo electrónico",
      placeholderEmail: "usted@empresa.com",
      labelPhone: "Número de teléfono",
      placeholderPhone: "Teléfono de contacto",
      labelMessage: "Consulta de servicios",
      placeholderMessage: "Tipo de producto, volumen estimado, origen y destino...",
      btn: "Enviar consulta comercial ↗",
      note: "Abre su aplicación de correo con el mensaje preparado. Sus datos se envían únicamente al hacer clic en Enviar en su cliente de correo."
    }
  }[lang || "vi"] || null;
  if (!copy) return "";
  return `  <section class="cta-form-band-section" id="contact-form">
    <div class="container cta-form-band-grid">
      <div class="cta-band-left">
        <span class="section-tag">${copy.tag}</span>
        <h2 class="section-title section-title-white">${copy.heading}</h2>
        <p class="cta-band-desc">${copy.subtext}</p>
        <a href="tel:+84906828898" class="cta-hotline-link">(+84) 906 828 898 ↗</a>
      </div>
      <div class="cta-band-right">
        <div class="consult-card-white">
          <form class="consult-form" onsubmit="handleConsultSubmit(event)">
            <div class="form-row-2col">
              <div class="form-group">
                <label class="form-label" for="band_fullName">${copy.labelName}</label>
                <input type="text" id="band_fullName" name="fullName" class="form-control" placeholder="${copy.placeholderName}" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="band_email">${copy.labelEmail}</label>
                <input type="email" id="band_email" name="email" class="form-control" placeholder="${copy.placeholderEmail}" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="band_phone">${copy.labelPhone}</label>
              <input type="tel" id="band_phone" name="phone" class="form-control" placeholder="${copy.placeholderPhone}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="band_message">${copy.labelMessage}</label>
              <textarea id="band_message" name="message" class="form-control" placeholder="${copy.placeholderMessage}"></textarea>
            </div>
            <button type="submit" class="btn-orange btn-submit">${copy.btn}</button>
            <p class="form-security-note">${copy.note}</p>
          </form>
        </div>
      </div>
    </div>
  </section>`;
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
    let fragment = applyShippingOrigin(fs.readFileSync(source, "utf8"), route);
    fragment = cleanupFragment(fragment, routeLookup, route);
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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600;1,700;1,800&display=swap">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/bootstrapb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/mainb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/styleb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/speego-custom.css?v=mobile_tracking_20260923">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/speego-process-tabs.css">
  <link rel="stylesheet" href="/explore/css/style.css?v=cta_left_form_right_20260925">
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
  <script>
    function handleConsultSubmit(event) {
      event.preventDefault();
      var form = event.target;
      var name = (form.querySelector('[name="fullName"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var phone = (form.querySelector('[name="phone"]') || {}).value || '';
      var message = (form.querySelector('[name="message"]') || {}).value || '';
      var subject = encodeURIComponent('SpeeGo inquiry — ' + name);
      var body = encodeURIComponent('Full name: ' + name + '\\nEmail: ' + email + '\\nPhone: ' + phone + '\\n\\nMessage:\\n' + message);
      window.location.href = 'mailto:info@speegologistic.com?subject=' + subject + '&body=' + body;
    }
  </script>
  ${route.nav === "fulfillment" ? '<script src="/explore/js/fulfillment-dock.js?v=ff_dock_fix_20260925e"></script>' : ""}
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
