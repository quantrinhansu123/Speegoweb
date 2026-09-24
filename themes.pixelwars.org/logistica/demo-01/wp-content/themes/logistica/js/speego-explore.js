(function () {
  'use strict';

  const ROUTE_BY_LANGUAGE = {
    '#/knowledge': { vi: '#/knowledge', en: '#/en/knowledge', es: '#/es/knowledge' },
    '#/sourcing': { vi: '#/sourcing', en: '#/en/sourcing', es: '#/es/sourcing' },
    '#/tuyen-van-chuyen': { vi: '#/tuyen-van-chuyen', en: '#/en/shipping-routes', es: '#/es/rutas-de-envio' },
    '#/fulfillment': { vi: '#/fulfillment', en: '#/en/fulfillment', es: '#/es/fulfillment' },
    '#/xuat-nhap-khau': { vi: '#/xuat-nhap-khau', en: '#/en/import-export', es: '#/es/import-export' }
  };

  const routeLookup = {};
  Object.values(ROUTE_BY_LANGUAGE).forEach(group => {
    Object.values(group).forEach(route => { routeLookup[route] = group; });
  });

  const frame = document.getElementById('speego-explore-frame');
  const panel = document.getElementById('speego-explore-panel');
  if (!frame || !panel) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  let frameReady = false;
  let frameRoute = '';
  let pendingRoute = '';
  let awaitingFrame = false;

  function activeLanguage() {
    const lang = document.documentElement.lang;
    return lang === 'en' || lang === 'es' ? lang : 'vi';
  }

  function localizeCoreRoute(route) {
    const group = routeLookup[route];
    return group ? group[activeLanguage()] : route;
  }

  function isExploreRoute(hash) {
    return hash.startsWith('#/');
  }

  function scrollToHomeAnchor(hash) {
    const id = hash && hash.startsWith('#') ? hash.slice(1) : '';
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  }

  function syncView() {
    const route = window.location.hash;
    if (!isExploreRoute(route)) {
      pendingRoute = '';
      awaitingFrame = false;
      document.body.classList.remove('speego-explore-active');
      panel.hidden = true;
      document.title = 'SpeeGo Logistics | Global Sourcing, QC & International Supply Chain';
      requestAnimationFrame(() => scrollToHomeAnchor(route));
      return;
    }

    pendingRoute = route;
    if (frameReady && frameRoute !== route) {
      awaitingFrame = true;
      frame.contentWindow.postMessage({ type: 'speego:navigate', route }, window.location.origin);
    }
    if (frameReady && frameRoute === route) showExplore();
  }

  function showExplore() {
    panel.hidden = false;
    document.body.classList.add('speego-explore-active');
    frame.contentWindow.postMessage({ type: 'speego:scroll-top' }, window.location.origin);
    document.querySelectorAll('#menu-main-menu .speego-nav-item').forEach(item => {
      const link = item.querySelector('a[href*="/explore/#/"]');
      const linkRoute = link && link.getAttribute('href').split('#')[1];
      item.classList.toggle('active', Boolean(linkRoute && routeLookup[linkRoute] === routeLookup[frameRoute]));
    });
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const match = href.match(/(?:^|\/)explore\/#(\/[^?]*)$/);
    if (match) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const route = localizeCoreRoute('#' + match[1]);
      if (window.location.hash === route) syncView();
      else window.location.hash = route;
      return;
    }
    if (document.body.classList.contains('speego-explore-active') && href.startsWith('#') && !href.startsWith('#/')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (window.location.hash === href) syncView();
      else window.location.hash = href;
    }
  }, true);

  document.querySelectorAll('.speego-lang-option, .speego-lang-pill').forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      if (frameReady && lang) {
        frame.contentWindow.postMessage({ type: 'speego:set-language', lang }, window.location.origin);
      }
    });
  });

  window.addEventListener('message', event => {
    if (event.origin !== window.location.origin || event.source !== frame.contentWindow || !event.data) return;
    if (event.data.type === 'speego:height') {
      const height = Number(event.data.height);
      if (Number.isFinite(height) && height > 0) frame.style.height = Math.ceil(height) + 'px';
    }
    if (event.data.type === 'speego:route') {
      frameReady = true;
      frameRoute = event.data.route;
      if (awaitingFrame && pendingRoute !== frameRoute) {
        frame.contentWindow.postMessage({ type: 'speego:navigate', route: pendingRoute }, window.location.origin);
        return;
      }
      awaitingFrame = false;
      if (document.body.classList.contains('speego-explore-active') && pendingRoute !== frameRoute) {
        pendingRoute = frameRoute;
        window.history.pushState(null, '', frameRoute);
      }
      if (pendingRoute && pendingRoute !== frameRoute) {
        awaitingFrame = true;
        frame.contentWindow.postMessage({ type: 'speego:navigate', route: pendingRoute }, window.location.origin);
        return;
      }
      if (pendingRoute) {
        document.title = event.data.title || document.title;
        showExplore();
      }
    }
    if (event.data.type === 'speego:open-contact') {
      window.location.hash = '#consultation-form';
    }
    if (event.data.type === 'speego:open-home') {
      window.location.hash = '#home';
    }
  });

  window.addEventListener('hashchange', syncView);
  const initialRoute = isExploreRoute(window.location.hash) ? window.location.hash : '#/knowledge';
  frame.src = '/explore/?embedded=1' + initialRoute;
  syncView();
})();
