/* WordPress owns public URLs. Keep the demo's hash router out of navigation. */
(function () {
  'use strict';

  const routes = window.SPEEGO_PUBLIC_ROUTES || {};
  const home = new URL(window.SPEEGO_WP_HOME || '/', window.location.origin);
  const basePath = home.pathname.replace(/\/$/, '');
  const homeRoutes = { vi: '#/home', en: '#/en/home', es: '#/es/inicio' };
  const currentRoute = window.speegoInitialRoute || '#/home';
  const currentLang = currentRoute.startsWith('#/en/') ? 'en'
    : currentRoute.startsWith('#/es/') ? 'es' : 'vi';

  function publicUrl(key) {
    return Object.prototype.hasOwnProperty.call(routes, key) ? routes[key] : '';
  }

  function homeUrl() {
    return publicUrl(homeRoutes[currentLang]) || new URL(currentLang + '/', home).href;
  }

  function pathWithoutBase(path) {
    return basePath && path.startsWith(basePath + '/') ? path.slice(basePath.length) : path;
  }

  // Old theme links can put a second route after a page URL, for example
  // /vi/xuat-nhap-khau/#/es/import-export. The route after # is authoritative.
  function canonicalUrl(raw) {
    if (raw && raw.startsWith('#') && !raw.startsWith('#/')) return '';
    if (!raw || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw)) {
      try {
        const absolute = new URL(raw, window.location.href);
        if (absolute.origin !== window.location.origin) return '';
      } catch (_) { return ''; }
    }
    if (publicUrl(raw)) return publicUrl(raw);

    let url;
    try { url = new URL(raw, window.location.href); } catch (_) { return ''; }
    if (url.origin !== window.location.origin) return '';
    if (url.hash.startsWith('#/') && publicUrl(url.hash)) return publicUrl(url.hash);
    if (url.hash === '#home') return homeUrl();

    const path = pathWithoutBase(url.pathname);
    if (path === '/contact/index.html') {
      return publicUrl({ vi: '#/contact', en: '#/en/contact', es: '#/es/contact' }[currentLang]);
    }
    if (path === '/' && url.hash) return homeUrl();
    const destination = publicUrl(path) || publicUrl(path.replace(/\/$/, ''));
    if (destination) return destination;
    return '';
  }

  // Normalize both bookmarked hashes and hashes set later by legacy widgets.
  function normalizeHashRoute() {
    const hash = window.location.hash;
    if (!hash.startsWith('#/') && hash !== '#home') return;
    const target = hash === '#home' ? homeUrl() : publicUrl(hash);
    if (!target) return;
    const current = window.location.href.split('#')[0];
    if (target === current) {
      window.history.replaceState(null, '', current);
    } else {
      window.location.replace(target);
    }
  }
  normalizeHashRoute();
  window.addEventListener('hashchange', normalizeHashRoute);

  // The Vercel header collapses its contact bar after scrolling.
  function syncHeaderScroll() {
    const scrolled = window.scrollY > 12;
    if (document.body) document.body.classList.toggle('is-header-scrolled', scrolled);
    const header = document.getElementById('masthead');
    if (header) header.classList.toggle('is-scrolled', scrolled);
  }
  window.addEventListener('scroll', syncHeaderScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', syncHeaderScroll);
  window.addEventListener('load', syncHeaderScroll);

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const languageOption = event.target.closest('.speego-lang-option, .speego-lang-pill');
    if (languageOption) {
      const lang = languageOption.getAttribute('data-lang');
      if (!homeRoutes[lang]) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (lang === currentLang) return;
      if (window.SPEEGO_POST_ALTERNATES) {
        const knowledgeRoutes = { vi: '#/knowledge', en: '#/en/knowledge', es: '#/es/knowledge' };
        window.location.assign(window.SPEEGO_POST_ALTERNATES[lang] || publicUrl(knowledgeRoutes[lang]));
        return;
      }
      const counterpart = typeof window.speegoCounterpartRoute === 'function'
        ? window.speegoCounterpartRoute(currentRoute, lang) : homeRoutes[lang];
      window.location.assign(publicUrl(counterpart) || publicUrl(homeRoutes[lang]));
      return;
    }

    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const href = link.getAttribute('href');
    if (!href || href === '#' || /^(?:mailto:|tel:|javascript:)/i.test(href)) return;
    try {
      const anchorUrl = new URL(href, window.location.href);
      if (anchorUrl.origin === window.location.origin && anchorUrl.hash && !anchorUrl.hash.startsWith('#/')
          && anchorUrl.hash !== '#home') {
        const anchorId = decodeURIComponent(anchorUrl.hash.slice(1));
        if (anchorUrl.pathname === window.location.pathname) {
          const element = document.getElementById(anchorId);
          if (element) {
            event.preventDefault();
            event.stopImmediatePropagation();
            window.history.pushState(null, '', anchorUrl.pathname + anchorUrl.search + anchorUrl.hash);
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        } else {
          sessionStorage.setItem('speegoScrollTo', anchorId);
        }
      }
    } catch (_) {}
    if (/^\/#(?!\/)/.test(href) && href !== '/#home') {
      try { sessionStorage.setItem('speegoScrollTo', href.slice(2)); } catch (_) {}
    }

    const section = link.getAttribute('data-section');
    const pageRoute = link.getAttribute('data-page-route');
    if (section && pageRoute) {
      const sectionRoutes = {
        home: homeRoutes,
        sourcing: { vi: '#/sourcing', en: '#/en/sourcing', es: '#/es/sourcing' },
        fulfillment: { vi: '#/fulfillment', en: '#/en/fulfillment', es: '#/es/fulfillment' }
      };
      const target = publicUrl((sectionRoutes[pageRoute] || homeRoutes)[currentLang]);
      if (target) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (new URL(target).pathname === window.location.pathname) {
          const element = document.getElementById(section);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          try { sessionStorage.setItem('speegoScrollTo', section); } catch (_) {}
          window.location.assign(target);
        }
        return;
      }
    }

    let target = href === '/' || href === '/index.html' || href === '#home'
      ? homeUrl() : canonicalUrl(href);
    if (!target && /^#(?:contact-form|consultation-form|services-speego|process-speego|why-speego|news-speego)$/.test(href)) {
      const sectionId = href.slice(1);
      const element = document.getElementById(sectionId);
      if (element) return;
      try { sessionStorage.setItem('speegoScrollTo', sectionId); } catch (_) {}
      target = homeUrl();
    }
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(target);
  }, true);
})();
