const fs = require("fs");
const path = require("path");
const publicRouteDefinitions = require("./wordpress-theme/speego-logistics/route-map.json").pages;

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

/** Canonical public URLs per SpeeGo URL table (/{lang}/…). */
function toSeoUrlPath(hash, lang, file) {
  if (publicRouteDefinitions[hash]) return publicRouteDefinitions[hash].path;
  const explicit = {
    // Logistics corridor pages
    '#/logistics/china-to-us-ca-au': '/vi/logistics/china-to-us-ca-au/',
    '#/logistics/vietnam-to-us-ca-au': '/vi/logistics/vietnam-to-us-ca-au/',
    '#/en/logistics/china-to-us-ca-au': '/en/logistics/china-to-us-ca-au/',
    '#/en/logistics/vietnam-to-us-ca-au': '/en/logistics/vietnam-to-us-ca-au/',
    '#/es/logistica/china-a-eeuu-canada-australia': '/es/logistica/china-to-us-ca-au/',
    '#/es/logistica/vietnam-a-eeuu-canada-australia': '/es/logistica/vietnam-to-us-ca-au/',
    // Logistics parent
    '#/tuyen-van-chuyen': '/vi/logistics/',
    '#/en/shipping-routes': '/en/logistics/',
    '#/es/rutas-de-envio': '/es/logistica/',
    // Knowledge Hub
    '#/knowledge': '/vi/kien-thuc/',
    '#/en/knowledge': '/en/knowledge/',
    '#/es/knowledge': '/es/conocimiento/',
    // Knowledge Categories
    '#/knowledge/huong-dan-van-chuyen': '/vi/kien-thuc/huong-dan-van-chuyen/',
    '#/en/shipping-guides': '/en/knowledge/shipping-guides/',
    '#/es/guias-de-envio': '/es/conocimiento/guias-de-envio/',
    '#/knowledge/kien-thuc-nganh-hang': '/vi/kien-thuc/kien-thuc-nganh-hang/',
    '#/en/industry-guides': '/en/knowledge/industry-guides/',
    '#/es/guias-por-industria': '/es/conocimiento/guias-por-industria/',
    '#/knowledge/tuyen-thuong-mai': '/vi/kien-thuc/tuyen-thuong-mai/',
    '#/en/trade-routes': '/en/knowledge/trade-routes/',
    '#/es/rutas-comerciales': '/es/conocimiento/rutas-comerciales/',
    '#/knowledge/sourcing-qc': '/vi/kien-thuc/sourcing-qc/',
    '#/en/sourcing-qc': '/en/knowledge/sourcing-qc/',
    '#/es/sourcing-qc': '/es/conocimiento/sourcing-qc/',
    '#/knowledge/fulfillment-kho-van': '/vi/kien-thuc/fulfillment-kho-van/',
    '#/en/fulfillment-warehouse': '/en/knowledge/fulfillment-warehouse/',
    '#/es/fulfillment-almacen': '/es/conocimiento/fulfillment-almacen/',
    '#/knowledge/tin-xuat-nhap-khau': '/vi/kien-thuc/tin-xuat-nhap-khau/',
    '#/en/import-export-news': '/en/knowledge/import-export-news/',
    '#/es/noticias-import-export': '/es/conocimiento/noticias-import-export/',
    // Posts: /{lang}/{knowledge-base}/{category}/{post-slug}
    '#/knowledge/chuan-bi-lo-hang': '/vi/kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang/',
    '#/knowledge/quy-trinh-nhap-kho': '/vi/kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho/',
    '#/knowledge/kiem-soat-chat-luong': '/vi/kien-thuc/sourcing-qc/kiem-soat-chat-luong/',
    '#/en/post/preparing-your-shipment': '/en/knowledge/shipping-guides/preparing-your-shipment/',
    '#/en/post/fulfillment-receiving': '/en/knowledge/fulfillment-warehouse/fulfillment-receiving/',
    '#/en/post/quality-control': '/en/knowledge/sourcing-qc/quality-control/',
    '#/es/post/preparar-su-envio': '/es/conocimiento/guias-de-envio/preparar-su-envio/',
    '#/es/post/recepcion-fulfillment': '/es/conocimiento/fulfillment-almacen/recepcion-fulfillment/',
    '#/es/post/control-de-calidad': '/es/conocimiento/sourcing-qc/control-de-calidad/',
    // Sourcing
    '#/sourcing': '/vi/tim-nguon-hang/',
    '#/en/sourcing': '/en/sourcing/',
    '#/es/sourcing': '/es/abastecimiento/',
    // Fulfillment
    '#/fulfillment': '/vi/kho-van/',
    '#/en/fulfillment': '/en/fulfillment/',
    '#/es/fulfillment': '/es/almacenamiento/',
    // Contact
    '#/contact': '/vi/lien-he/',
    '#/en/contact': '/en/contact/',
    '#/es/contact': '/es/contacto/'
  };
  if (explicit[hash]) return explicit[hash];

  let slug = hash.slice(2); // strip "#/"
  if (lang === 'en' || lang === 'es') slug = slug.replace(new RegExp(`^${lang}/`), '');

  const knowledgeCategories = {
    en: new Set(['shipping-guides', 'industry-guides', 'trade-routes', 'sourcing-qc', 'fulfillment-warehouse', 'import-export-news']),
    es: new Set(['guias-de-envio', 'guias-por-industria', 'rutas-comerciales', 'sourcing-qc', 'fulfillment-almacen', 'noticias-import-export']),
    vi: new Set(['huong-dan-van-chuyen', 'kien-thuc-nganh-hang', 'tuyen-thuong-mai', 'sourcing-qc', 'fulfillment-kho-van', 'tin-xuat-nhap-khau'])
  };
  if (lang === 'vi' && slug.startsWith('knowledge/')) {
    const rest = slug.slice('knowledge/'.length);
    if (knowledgeCategories.vi.has(rest)) return `/vi/kien-thuc/${rest}/`;
  }
  if (lang === 'en' && knowledgeCategories.en.has(slug)) {
    return `/en/knowledge/${slug}/`;
  }
  if (lang === 'es' && knowledgeCategories.es.has(slug)) {
    return `/es/conocimiento/${slug}/`;
  }

  return `/${lang}/${slug}/`;
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
    const origin = routePath.includes('vietnam-to-us-ca-au') || routePath.includes('vietnam-a-eeuu-canada-australia') ? 'vietnam' :
      routePath.includes('china-to-us-ca-au') || routePath.includes('china-a-eeuu-canada-australia') ? 'china' : null;
    routes.push({
      hash,
      file,
      title: rawTitle.replace(/\\'/g, "'"),
      nav,
      lang,
      origin,
      urlPath: toSeoUrlPath(hash, lang, file)
    });
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

function renderBreadcrumb(items, routeLookup, lang = "vi") {
  if (!items.length) return "";
  const links = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) return `<span class="breadcrumb-current">${escapeHtml(item.label)}</span>`;
    const route = routeLookup.get(item.href);
    const href = index === 0 ? `/${lang}/` : (route ? route.urlPath : `/${lang}/`);
    return `<a href="${href}" class="breadcrumb-link">${escapeHtml(item.label)}</a><span class="breadcrumb-sep">/</span>`;
  }).join("");
  const ariaLabel = lang === 'en' ? 'Breadcrumb' : (lang === 'es' ? 'Miga de pan' : 'Đường dẫn trang');
  return `<nav class="breadcrumb-section" aria-label="${ariaLabel}"><div class="container"><div class="breadcrumb-list">${links}</div></div></nav>`;
}

function cleanupFragment(fragment, routeLookup, route) {
  let html = fragment.replace(/<script\b[^>]*>[\s\S]*?window\.location\.replace\([\s\S]*?<\/script>/i, "");
  html = html.replace(/href=(['"])#(\/[^'"]+)\1/gi, (_full, quote, routeHash) => {
    const target = routeLookup.get(`#${routeHash}`);
    return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}#${routeHash}${quote}`;
  });
  html = html.replace(/(src|poster|href)=(['"])assets\//gi, "$1=$2/explore/assets/");
  html = html.replace(/url\((['"]?)assets\//gi, "url($1/explore/assets/");

  // Article sidebars stay in place. Full-width bands stay where the page
  // placeholder sits (directly under "Why SpeeGo" when that section exists).
  const isPost = route && String(route.file || "").includes("post-");
  if (isPost) html = inlineSidebarCtas(html, route.lang);

  const ctaBand = buildCtaBandHtml(route && route.lang);
  let placedBand = false;
  html = html.replace(
    /<div\b(?:(?:[^>"']|"[^"]*"|'[^']*'))*data-component=(["'])cta-form\1(?:(?:[^>"']|"[^"]*"|'[^']*'))*>\s*<\/div>/gi,
    (full) => {
      if (!ctaBand || !/data-variant=(["'])band\1/i.test(full)) return full;
      placedBand = true;
      return ctaBand;
    }
  );
  const hadCta = /data-component=(["'])cta-form\1/i.test(html);
  html = html.replace(
    /\s*<div\b(?:(?:[^>"']|"[^"]*"|'[^']*'))*data-component=(["'])cta-form\1(?:(?:[^>"']|"[^"]*"|'[^']*'))*>\s*<\/div>/gi,
    ""
  );
  if (hadCta && ctaBand && !placedBand) {
    html = `${html.trimEnd()}\n${ctaBand}\n`;
    html = html.replace(/href=(['"])#contact-form\1/gi, 'href="#contact-form"');
  } else if (!ctaBand) {
    html = html.replace(/href=(['"])#contact-form\1/gi, 'href="/#consultation-form"');
  }
  return html;
}

function inlineSidebarCtas(html, lang) {
  const copy = ctaCopy(lang);
  if (!copy) return html;
  return html.replace(
    /<div\b((?:(?:[^>"']|"[^"]*"|'[^']*'))*)data-component=(["'])cta-form\2((?:(?:[^>"']|"[^"]*"|'[^']*'))*)>\s*<\/div>/gi,
    (full, before, _quote, after) => {
      const attrs = `${before} ${after}`;
      if (!/data-variant=(["'])sidebar\1/i.test(attrs)) return full;
      const attr = (name) => {
        const match = attrs.match(new RegExp(`data-${name}=(["'])([\\s\\S]*?)\\1`, "i"));
        return match ? decodeEntities(match[2]) : "";
      };
      return buildSidebarCtaHtml({
        tag: attr("tag") || copy.tag,
        heading: attr("heading") || "Ask us a question",
        subtext: attr("subtext") || copy.subtext,
        phone: attr("phone") || "(+84) 906 828 898 ↗",
        copy
      });
    }
  );
}

function buildSidebarCtaHtml({ tag, heading, subtext, phone, copy }) {
  return `<div class="consult-card-sidebar" id="contact-form">
    <span class="section-tag">${escapeHtml(tag)}</span>
    <h3 class="sidebar-title">${escapeHtml(heading)}</h3>
    <p class="sidebar-desc">${escapeHtml(subtext)}</p>
    <div>
      <a href="tel:+84906828898" class="sidebar-hotline">${escapeHtml(phone)}</a>
    </div>
    <form class="consult-form" onsubmit="handleConsultSubmit(event)">
      <div class="form-group">
        <label class="form-label" for="sidebar_fullName">${escapeHtml(copy.labelName)}</label>
        <input type="text" id="sidebar_fullName" name="fullName" class="form-control" placeholder="${escapeHtml(copy.placeholderName)}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="sidebar_email">${escapeHtml(copy.labelEmail)}</label>
        <input type="email" id="sidebar_email" name="email" class="form-control" placeholder="${escapeHtml(copy.placeholderEmail)}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="sidebar_phone">${escapeHtml(copy.labelPhone)}</label>
        <input type="tel" id="sidebar_phone" name="phone" class="form-control" placeholder="${escapeHtml(copy.placeholderPhone)}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="sidebar_message">${escapeHtml(copy.labelMessage)}</label>
        <textarea id="sidebar_message" name="message" class="form-control" placeholder="${escapeHtml(copy.placeholderMessage)}"></textarea>
      </div>
      <button type="submit" class="btn-orange btn-submit">${escapeHtml(copy.btn)}</button>
      <p class="form-security-note">${escapeHtml(copy.note)}</p>
    </form>
  </div>`;
}

function ctaCopy(lang) {
  return {
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
}

function buildCtaBandHtml(lang) {
  const copy = ctaCopy(lang);
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
    const breadcrumbMarkup = renderBreadcrumb(breadcrumbs, routeLookup, route.lang);
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
    const localizedHeader = rewriteDiscoveryLinks(
      header
        .replace(/(src|href)=(['"])(?!\/|#|[a-z]+:)([^'"]+)\2/gi, "$1=$2/$3$2")
        .replace(/href=(['"])#([^'"]*)\1/gi, 'href="/#$2"'),
      routeLookup,
      route.lang
    );
    const localizedFooter = rewriteDiscoveryLinks(
      footer
        .replace(/(src|href)=(['"])(?!\/|#|[a-z]+:)([^'"]+)\2/gi, "$1=$2/$3$2")
        .replace(/href=(['"])#([^'"]*)\1/gi, 'href="/#$2"'),
      routeLookup,
      route.lang
    );
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
  <link rel="stylesheet" href="/explore/css/style.css?v=about_vision_fix_20260928">
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
  <script src="/explore/js/cta-band.js?v=cta_motion_20260925"></script>
  ${route.nav === "fulfillment" ? '<script src="/explore/js/fulfillment-estimate.js?v=ff_estimate_20260926"></script>\n  <script src="/explore/js/fulfillment-dock.js?v=ff_dock_fix_20260925e"></script>' : ""}
  ${route.nav === "about" ? '<script src="/explore/js/about-page.js?v=about_click_slider_20260928"></script>' : ""}
  <script src="/explore/js/knowledge-article.js"></script>
  <script src="/wp-content/themes/logistica/js/speego-main.js?v=seo_slugs_20260928"></script>
</body>
</html>`;
    fs.writeFileSync(outputFile, localizeKnownSlugs(html, route.lang), "utf8");
  }

  // Point homepage discovery links at the full HTML routes so both visitors and crawlers reach page content directly.
  const homepagePath = path.join(output, "index.html");
  let homepage = fs.readFileSync(homepagePath, "utf8");
  homepage = rewriteDiscoveryLinks(homepage, routeLookup, "en");
  fs.writeFileSync(homepagePath, homepage, "utf8");

  writeLocaleHomepages({ homepage, output, origin });
  writeAboutAndContactPages({ homepage, header, footer, origin, output, routeLookup, exploreRoot });


  const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`];
  for (const route of routes) {
    const languageLinks = alternates.get(route.hash);
    const links = languageLinks ? Object.entries(languageLinks).map(([lang, hash]) => {
      const target = routeLookup.get(hash);
      return target ? `<xhtml:link rel="alternate" hreflang="${lang}" href="${origin}${target.urlPath}" />` : "";
    }).join("") : `<xhtml:link rel="alternate" hreflang="${route.lang}" href="${origin}${route.urlPath}" />`;
    sitemap.push(`  <url><loc>${origin}${route.urlPath}</loc><changefreq>monthly</changefreq>${links}</url>`);
  }
  for (const lang of ["en", "vi", "es"]) {
    sitemap.push(`  <url><loc>${origin}/${lang}/</loc><changefreq>weekly</changefreq></url>`);
    const aboutHash = lang === "vi" ? "#/about-us" : (lang === "es" ? "#/es/about-us" : "#/en/about-us");
    const aboutPath = publicRouteDefinitions[aboutHash].path;
    sitemap.push(`  <url><loc>${origin}${aboutPath}</loc><changefreq>monthly</changefreq></url>`);
    const contactHash = lang === "vi" ? "#/contact" : (lang === "es" ? "#/es/contact" : "#/en/contact");
    const contactPath = publicRouteDefinitions[contactHash] ? publicRouteDefinitions[contactHash].path : `/${lang}/contact/`;
    sitemap.push(`  <url><loc>${origin}${contactPath}</loc><changefreq>monthly</changefreq></url>`);
  }
  sitemap.push(`  <url><loc>${origin}/</loc><changefreq>weekly</changefreq></url>`, `</urlset>`, "");
  fs.writeFileSync(path.join(output, "sitemap.xml"), sitemap.join("\n"), "utf8");
  fs.writeFileSync(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, "utf8");
  console.log(`Generated ${routes.length} static SEO routes, locale homes, about/contact, sitemap.xml, and robots.txt`);
}

function localizeKnownSlugs(html, lang) {
  // Remap every /{en|vi|es}/… href onto the counterpart slug for `lang`.
  // Homepage shell is English, so VI/ES pages must rewrite nav/footer paths.
  const counterparts = {
    "": { en: "", vi: "", es: "" },
    "about-us": { en: "about-us", vi: "ve-chung-toi", es: "sobre-nosotros" },
    "ve-chung-toi": { en: "about-us", vi: "ve-chung-toi", es: "sobre-nosotros" },
    "sobre-nosotros": { en: "about-us", vi: "ve-chung-toi", es: "sobre-nosotros" },
    contact: { en: "contact", vi: "lien-he", es: "contacto" },
    "lien-he": { en: "contact", vi: "lien-he", es: "contacto" },
    contacto: { en: "contact", vi: "lien-he", es: "contacto" },
    fulfillment: { en: "fulfillment", vi: "kho-van", es: "almacenamiento" },
    "kho-van": { en: "fulfillment", vi: "kho-van", es: "almacenamiento" },
    almacenamiento: { en: "fulfillment", vi: "kho-van", es: "almacenamiento" },
    knowledge: { en: "knowledge", vi: "kien-thuc", es: "conocimiento" },
    "kien-thuc": { en: "knowledge", vi: "kien-thuc", es: "conocimiento" },
    conocimiento: { en: "knowledge", vi: "kien-thuc", es: "conocimiento" },
    logistics: { en: "logistics", vi: "logistics", es: "logistica" },
    logistica: { en: "logistics", vi: "logistics", es: "logistica" },
    "logistics/china-to-us-ca-au": {
      en: "logistics/china-to-us-ca-au",
      vi: "logistics/china-to-us-ca-au",
      es: "logistica/china-to-us-ca-au"
    },
    "logistica/china-to-us-ca-au": {
      en: "logistics/china-to-us-ca-au",
      vi: "logistics/china-to-us-ca-au",
      es: "logistica/china-to-us-ca-au"
    },
    "logistics/vietnam-to-us-ca-au": {
      en: "logistics/vietnam-to-us-ca-au",
      vi: "logistics/vietnam-to-us-ca-au",
      es: "logistica/vietnam-to-us-ca-au"
    },
    "logistica/vietnam-to-us-ca-au": {
      en: "logistics/vietnam-to-us-ca-au",
      vi: "logistics/vietnam-to-us-ca-au",
      es: "logistica/vietnam-to-us-ca-au"
    },
    sourcing: { en: "sourcing", vi: "tim-nguon-hang", es: "abastecimiento" },
    "tim-nguon-hang": { en: "sourcing", vi: "tim-nguon-hang", es: "abastecimiento" },
    abastecimiento: { en: "sourcing", vi: "tim-nguon-hang", es: "abastecimiento" },
    "import-export": { en: "import-export", vi: "xuat-nhap-khau", es: "import-export" },
    "xuat-nhap-khau": { en: "import-export", vi: "xuat-nhap-khau", es: "import-export" },
    "knowledge/shipping-guides": {
      en: "knowledge/shipping-guides",
      vi: "kien-thuc/huong-dan-van-chuyen",
      es: "conocimiento/guias-de-envio"
    },
    "kien-thuc/huong-dan-van-chuyen": {
      en: "knowledge/shipping-guides",
      vi: "kien-thuc/huong-dan-van-chuyen",
      es: "conocimiento/guias-de-envio"
    },
    "conocimiento/guias-de-envio": {
      en: "knowledge/shipping-guides",
      vi: "kien-thuc/huong-dan-van-chuyen",
      es: "conocimiento/guias-de-envio"
    },
    "knowledge/industry-guides": {
      en: "knowledge/industry-guides",
      vi: "kien-thuc/kien-thuc-nganh-hang",
      es: "conocimiento/guias-por-industria"
    },
    "kien-thuc/kien-thuc-nganh-hang": {
      en: "knowledge/industry-guides",
      vi: "kien-thuc/kien-thuc-nganh-hang",
      es: "conocimiento/guias-por-industria"
    },
    "conocimiento/guias-por-industria": {
      en: "knowledge/industry-guides",
      vi: "kien-thuc/kien-thuc-nganh-hang",
      es: "conocimiento/guias-por-industria"
    },
    "knowledge/trade-routes": {
      en: "knowledge/trade-routes",
      vi: "kien-thuc/tuyen-thuong-mai",
      es: "conocimiento/rutas-comerciales"
    },
    "kien-thuc/tuyen-thuong-mai": {
      en: "knowledge/trade-routes",
      vi: "kien-thuc/tuyen-thuong-mai",
      es: "conocimiento/rutas-comerciales"
    },
    "conocimiento/rutas-comerciales": {
      en: "knowledge/trade-routes",
      vi: "kien-thuc/tuyen-thuong-mai",
      es: "conocimiento/rutas-comerciales"
    },
    "knowledge/sourcing-qc": {
      en: "knowledge/sourcing-qc",
      vi: "kien-thuc/sourcing-qc",
      es: "conocimiento/sourcing-qc"
    },
    "kien-thuc/sourcing-qc": {
      en: "knowledge/sourcing-qc",
      vi: "kien-thuc/sourcing-qc",
      es: "conocimiento/sourcing-qc"
    },
    "conocimiento/sourcing-qc": {
      en: "knowledge/sourcing-qc",
      vi: "kien-thuc/sourcing-qc",
      es: "conocimiento/sourcing-qc"
    },
    "knowledge/fulfillment-warehouse": {
      en: "knowledge/fulfillment-warehouse",
      vi: "kien-thuc/fulfillment-kho-van",
      es: "conocimiento/fulfillment-almacen"
    },
    "kien-thuc/fulfillment-kho-van": {
      en: "knowledge/fulfillment-warehouse",
      vi: "kien-thuc/fulfillment-kho-van",
      es: "conocimiento/fulfillment-almacen"
    },
    "conocimiento/fulfillment-almacen": {
      en: "knowledge/fulfillment-warehouse",
      vi: "kien-thuc/fulfillment-kho-van",
      es: "conocimiento/fulfillment-almacen"
    },
    "knowledge/import-export-news": {
      en: "knowledge/import-export-news",
      vi: "kien-thuc/tin-xuat-nhap-khau",
      es: "conocimiento/noticias-import-export"
    },
    "kien-thuc/tin-xuat-nhap-khau": {
      en: "knowledge/import-export-news",
      vi: "kien-thuc/tin-xuat-nhap-khau",
      es: "conocimiento/noticias-import-export"
    },
    "conocimiento/noticias-import-export": {
      en: "knowledge/import-export-news",
      vi: "kien-thuc/tin-xuat-nhap-khau",
      es: "conocimiento/noticias-import-export"
    },
    "knowledge/shipping-guides/preparing-your-shipment": {
      en: "knowledge/shipping-guides/preparing-your-shipment",
      vi: "kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang",
      es: "conocimiento/guias-de-envio/preparar-su-envio"
    },
    "kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang": {
      en: "knowledge/shipping-guides/preparing-your-shipment",
      vi: "kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang",
      es: "conocimiento/guias-de-envio/preparar-su-envio"
    },
    "conocimiento/guias-de-envio/preparar-su-envio": {
      en: "knowledge/shipping-guides/preparing-your-shipment",
      vi: "kien-thuc/huong-dan-van-chuyen/chuan-bi-lo-hang",
      es: "conocimiento/guias-de-envio/preparar-su-envio"
    },
    "knowledge/fulfillment-warehouse/fulfillment-receiving": {
      en: "knowledge/fulfillment-warehouse/fulfillment-receiving",
      vi: "kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho",
      es: "conocimiento/fulfillment-almacen/recepcion-fulfillment"
    },
    "kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho": {
      en: "knowledge/fulfillment-warehouse/fulfillment-receiving",
      vi: "kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho",
      es: "conocimiento/fulfillment-almacen/recepcion-fulfillment"
    },
    "conocimiento/fulfillment-almacen/recepcion-fulfillment": {
      en: "knowledge/fulfillment-warehouse/fulfillment-receiving",
      vi: "kien-thuc/fulfillment-kho-van/quy-trinh-nhap-kho",
      es: "conocimiento/fulfillment-almacen/recepcion-fulfillment"
    },
    "knowledge/sourcing-qc/quality-control": {
      en: "knowledge/sourcing-qc/quality-control",
      vi: "kien-thuc/sourcing-qc/kiem-soat-chat-luong",
      es: "conocimiento/sourcing-qc/control-de-calidad"
    },
    "kien-thuc/sourcing-qc/kiem-soat-chat-luong": {
      en: "knowledge/sourcing-qc/quality-control",
      vi: "kien-thuc/sourcing-qc/kiem-soat-chat-luong",
      es: "conocimiento/sourcing-qc/control-de-calidad"
    },
    "conocimiento/sourcing-qc/control-de-calidad": {
      en: "knowledge/sourcing-qc/quality-control",
      vi: "kien-thuc/sourcing-qc/kiem-soat-chat-luong",
      es: "conocimiento/sourcing-qc/control-de-calidad"
    }
  };

  return html.replace(
    /href=(['"])\/(en|vi|es)(?:\/([^'"#]*?))?\/?(#[^'"]*)?\1/gi,
    (_full, quote, _fromLang, rest = "", anchor = "") => {
      const path = String(rest || "").replace(/\/+$/, "");
      const mapped = counterparts[path];
      const next = mapped ? mapped[lang] : path;
      const href = next ? `/${lang}/${next}/` : `/${lang}/`;
      return `href=${quote}${href}${anchor || ""}${quote}`;
    }
  );
}

function rewriteDiscoveryLinks(html, routeLookup, lang = "en") {
  let out = html;
  out = out.replace(/href=(['"])\/explore\/#(\/[^'"]+)\1/gi, (_full, quote, hash) => {
    const target = routeLookup.get(`#${hash}`);
    return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}/${quote}`;
  });
  // Legacy SEO folders: /explore/{lang}/{path}/#anchor → /{lang}/… or mapped SEO path
  out = out.replace(/href=(['"])\/explore\/(en|es|vi)\/([^'"#]*)(#[^'"]*)?\1/gi, (_full, quote, _fromLang, rest, anchor = "") => {
    const pathOnly = String(rest || "").replace(/\/$/, "");
    const hash = _fromLang === "vi" ? `#/${pathOnly}` : `#/${_fromLang}/${pathOnly}`;
    const target = routeLookup.get(hash);
    if (target) return `href=${quote}${target.urlPath}${anchor || ""}${quote}`;
    return `href=${quote}/${lang}/${pathOnly}/${anchor || ""}${quote}`.replace(/\/+#/, "#").replace(/\/{2,}(#|$)/, "/$1");
  });
  // Hash SPA routes → SEO paths for current page language
  out = out.replace(/href=(['"])\/#(\/[^'"]+)\1/gi, (_full, quote, hashPath) => {
    const target = routeLookup.get(`#${hashPath}`);
    return target ? `href=${quote}${target.urlPath}${quote}` : `href=${quote}/${lang}/${quote}`;
  });
  out = out.replace(/href=(['"])\/#why-speego\1/gi, `href="${publicRouteDefinitions[lang === "vi" ? "#/about-us" : (lang === "es" ? "#/es/about-us" : "#/en/about-us")].path}"`);
  out = out.replace(/href=(['"])\/about-us\/?\1/gi, `href="${publicRouteDefinitions[lang === "vi" ? "#/about-us" : (lang === "es" ? "#/es/about-us" : "#/en/about-us")].path}"`);
  out = out.replace(/href=(['"])#consultation-form\1/gi, `href="${`/${lang}/contact/`}"`);
  out = out.replace(/href=(['"])#contact-form\1/gi, `href="${`/${lang}/contact/`}"`);
  return out;
}

function writeLocaleHomepages({ homepage, output, origin }) {
  const titles = {
    en: "SpeeGo Logistics | Global Sourcing, Shipping & Fulfillment",
    vi: "SpeeGo Logistics | Sourcing, Vận chuyển & Fulfillment",
    es: "SpeeGo Logistics | Sourcing, Envíos y Fulfillment"
  };
  for (const lang of ["en", "vi", "es"]) {
    let html = homepage;
    html = html.replace(/<html\b([^>]*)>/i, `<html lang="${lang}"$1>`);
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"/i, `<link rel="canonical" href="${origin}/${lang}/"`);
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${titles[lang]}</title>`);
    if (!/data-default-lang=/.test(html)) {
      html = html.replace(/<body\b([^>]*)>/i, `<body$1 data-default-lang="${lang}">`);
    } else {
      html = html.replace(/data-default-lang="[^"]*"/i, `data-default-lang="${lang}"`);
    }
    const alternate = ["en", "vi", "es"].map((code) =>
      `<link rel="alternate" hreflang="${code}" href="${origin}/${code}/">`
    ).join("\n  ");
    if (!html.includes(`hreflang="${lang}"`)) {
      html = html.replace(/<link rel="canonical"[^>]*>/i, (m) => `${m}\n  ${alternate}`);
    }
    html = html.replace(/(href|src)=(["'])(wp-content|wp-includes|images|assets)\//g, '$1=$2/$3/');
    if (!/<base\b/i.test(html)) {
      html = html.replace(/<head>/i, '<head>\n\t<base href="/">');
    }
    const outFile = path.join(output, lang, "index.html");
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, localizeKnownSlugs(html, lang), "utf8");
  }
}

function extractHomepageSection(homepage, sectionId) {
  const pattern = new RegExp(`<section\\b[^>]*\\bid=["']${sectionId}["'][^>]*>[\\s\\S]*?<\\/section>`, "i");
  const match = homepage.match(pattern);
  return match ? match[0] : "";
}

function writeAboutAndContactPages({ homepage, header, footer, origin, output, routeLookup, exploreRoot }) {
  const contactSection = extractHomepageSection(homepage, "consultation-form");
  const aboutFiles = {
    vi: path.join(exploreRoot, "pages/about/vi-about.html"),
    en: path.join(exploreRoot, "pages/about/en-about.html"),
    es: path.join(exploreRoot, "pages/about/es-about.html")
  };
  const pages = [
    {
      slug: "about-us",
      titles: {
        en: "About SpeeGo Logistics | Global Sourcing & Supply Chain Partner",
        vi: "Về chúng tôi - SpeeGo Logistics",
        es: "Acerca de SpeeGo Logistics"
      },
      descriptions: {
        en: "Learn why businesses trust SpeeGo for sourcing, international logistics, fulfillment, and import-export.",
        vi: "Tìm hiểu về SpeeGo Logistics — tầm nhìn, sứ mệnh, lịch sử và năng lực chuỗi cung ứng toàn cầu.",
        es: "Conozca SpeeGo Logistics: visión, misión, historia y capacidades de cadena de suministro global."
      },
      scripts: '<script src="/explore/js/about-page.js?v=about_click_slider_20260928"></script>'
    },
    {
      slug: "contact",
      section: contactSection,
      titles: {
        en: "Contact SpeeGo | Get a quote",
        vi: "Liên hệ SpeeGo | Nhận tư vấn báo giá",
        es: "Contacto SpeeGo | Solicitar cotización"
      },
      descriptions: {
        en: "Contact SpeeGo for sourcing, shipping, fulfillment, and customs support.",
        vi: "Liên hệ SpeeGo để được tư vấn sourcing, vận chuyển, fulfillment và thủ tục hải quan.",
        es: "Contacte a SpeeGo para sourcing, envíos, fulfillment y apoyo aduanero."
      },
      scripts: ""
    }
  ];

  for (const page of pages) {
    for (const lang of ["en", "vi", "es"]) {
      let section = page.section || "";
      if (page.slug === "about-us") {
        const aboutPath = aboutFiles[lang];
        if (!fs.existsSync(aboutPath)) continue;
        section = fs.readFileSync(aboutPath, "utf8")
          .replace(/<script\b[\s\S]*?<\/script>/gi, "")
          .replace(/(src|href)=(['"])(?!\/|#|[a-z]+:|tel:|mailto:)([^'"]+)\2/gi, "$1=$2/explore/$3$2");
        section = rewriteDiscoveryLinks(section, routeLookup, lang);
      }
      if (!section) continue;

      const routeHash = page.slug === "about-us"
        ? ({ en: "#/en/about-us", vi: "#/about-us", es: "#/es/about-us" })[lang]
        : ({ en: "#/en/contact", vi: "#/contact", es: "#/es/contact" })[lang];
      const urlPath = routeHash && publicRouteDefinitions[routeHash]
        ? publicRouteDefinitions[routeHash].path
        : `/${lang}/${page.slug}/`;
      const localizedHeader = rewriteDiscoveryLinks(
        header
          .replace(/(src|href)=(['"])(?!\/|#|[a-z]+:)([^'"]+)\2/gi, "$1=$2/$3$2")
          .replace(/href=(['"])#([^'"]*)\1/gi, 'href="/#$2"'),
        routeLookup,
        lang
      );
      const localizedFooter = rewriteDiscoveryLinks(
        footer
          .replace(/(src|href)=(['"])(?!\/|#|[a-z]+:)([^'"]+)\2/gi, "$1=$2/$3$2")
          .replace(/href=(['"])#([^'"]*)\1/gi, 'href="/#$2"'),
        routeLookup,
        lang
      );
      const alternateTags = ["en", "vi", "es"]
        .map((code) => {
          const hash = page.slug === "about-us"
            ? ({ en: "#/en/about-us", vi: "#/about-us", es: "#/es/about-us" })[code]
            : ({ en: "#/en/contact", vi: "#/contact", es: "#/es/contact" })[code];
          const localizedPath = hash && publicRouteDefinitions[hash] ? publicRouteDefinitions[hash].path : `/${code}/${page.slug}/`;
          return `<link rel="alternate" hreflang="${code}" href="${origin}${localizedPath}">`;
        })
        .join("\n    ");
      const html = `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.titles[lang])}</title>
  <meta name="description" content="${escapeHtml(page.descriptions[lang])}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${origin}${urlPath}">
  ${alternateTags}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SpeeGo Logistics">
  <meta property="og:title" content="${escapeHtml(page.titles[lang])}">
  <meta property="og:description" content="${escapeHtml(page.descriptions[lang])}">
  <meta property="og:url" content="${origin}${urlPath}">
  <link rel="icon" href="/wp-content/themes/logistica/images/favicon-speego.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600;1,700;1,800&display=swap">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/bootstrapb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/mainb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/styleb54d.css?ver=6.8.8">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/speego-custom.css?v=mobile_tracking_20260923">
  <link rel="stylesheet" href="/wp-content/themes/logistica/css/speego-process-tabs.css">
  <link rel="stylesheet" href="/explore/css/style.css?v=about_vision_fix_20260928">
</head>
<body class="home wp-theme-logistica elementor-default elementor-template-full-width speego-seo-page" data-seo-language="${lang}" data-default-lang="${lang}">
  <div id="page" class="hfeed site">
    ${localizedHeader}
    <main id="app-main">${section}</main>
    ${localizedFooter}
  </div>
  ${page.scripts || ""}
  <script>
    (function () {
      var localizedRoutes = ${JSON.stringify(Object.fromEntries(["en", "vi", "es"].map((code) => {
        const hash = page.slug === "about-us"
          ? ({ en: "#/en/about-us", vi: "#/about-us", es: "#/es/about-us" })[code]
          : ({ en: "#/en/contact", vi: "#/contact", es: "#/es/contact" })[code];
        const localizedPath = hash && publicRouteDefinitions[hash] ? publicRouteDefinitions[hash].path : `/${code}/${page.slug}/`;
        return [code, localizedPath];
      })))};
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
  <script src="/wp-content/themes/logistica/js/speego-main.js?v=seo_slugs_20260928"></script>
</body>
</html>`;
      const outFile = path.join(output, ...urlPath.replace(/^\//, "").split("/"), "index.html");
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, localizeKnownSlugs(html, lang), "utf8");
    }
  }
}

module.exports = { generate, toSeoUrlPath };
