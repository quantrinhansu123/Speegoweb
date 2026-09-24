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
  let stickySourcingNav = null;
  let stickySourcingItems = [];

  function activeLanguage() {
    const lang = document.documentElement.lang;
    return lang === 'en' || lang === 'es' ? lang : 'vi';
  }

  function localizeCoreRoute(route) {
    const group = routeLookup[route];
    return group ? group[activeLanguage()] : route;
  }

  function scrollToSourcingSection(id) {
    const doc = frame.contentDocument;
    const section = doc && doc.getElementById(id);
    if (!section) return;

    const label = section.querySelector('.section-tag, .qc-section-tag') || section;
    const frameTop = frame.getBoundingClientRect().top;
    const header = document.getElementById('masthead');
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    const navHeight = stickySourcingNav ? stickySourcingNav.getBoundingClientRect().height : 66;
    const labelTop = window.scrollY + frameTop + label.getBoundingClientRect().top;
    const targetTop = labelTop - headerBottom - navHeight - 100;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  }

  function syncStickySourcingNav() {
    const doc = frame.contentDocument;
    const sourceNav = doc && doc.getElementById('sourcingSubnav');
    const isSourcing = /(?:^|\/)sourcing$/.test(frameRoute);

    if (!sourceNav || !isSourcing || !document.body.classList.contains('speego-explore-active')) {
      if (stickySourcingNav) stickySourcingNav.hidden = true;
      stickySourcingItems = [];
      return;
    }

    if (!stickySourcingNav) {
      stickySourcingNav = document.createElement('nav');
      stickySourcingNav.className = 'speego-host-sourcing-subnav';
      stickySourcingNav.setAttribute('aria-label', 'Sourcing sections');
      document.body.appendChild(stickySourcingNav);
    }

    const sourceItems = Array.from(sourceNav.querySelectorAll('.subnav-grid-item'));
    const signature = sourceItems.map(item => `${item.getAttribute('href')}|${item.textContent.trim()}`).join('~');
    if (stickySourcingNav.dataset.signature !== signature) {
      const grid = document.createElement('div');
      grid.className = 'speego-host-sourcing-subnav-grid';
      sourceItems.forEach(sourceItem => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = `speego-host-sourcing-subnav-item${sourceItem.classList.contains('subnav-grid-cta') ? ' is-cta' : ''}`;
        item.dataset.target = sourceItem.getAttribute('href').slice(1);
        item.textContent = sourceItem.textContent.trim();
        item.addEventListener('click', event => {
          event.stopPropagation();
          const id = item.dataset.target;
          if (id === 'contact-form') {
            window.location.hash = '#consultation-form';
          } else {
            scrollToSourcingSection(id);
          }
        }, true);
        grid.appendChild(item);
      });
      stickySourcingNav.replaceChildren(grid);
      stickySourcingNav.dataset.signature = signature;
      stickySourcingItems = Array.from(grid.querySelectorAll('.speego-host-sourcing-subnav-item'));
    }
    stickySourcingNav.hidden = false;
    updateStickySourcingNav();
  }

  function updateStickySourcingNav() {
    if (!stickySourcingNav) return;
    const doc = frame.contentDocument;
    const sourceNav = doc && doc.getElementById('sourcingSubnav');
    const frameRect = frame.getBoundingClientRect();
    const header = document.getElementById('masthead');
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    stickySourcingNav.style.top = `${Math.max(0, headerBottom)}px`;

    if (!sourceNav || !document.body.classList.contains('speego-explore-active')) {
      stickySourcingNav.hidden = true;
      return;
    }

    const sourceNavTop = frameRect.top + sourceNav.getBoundingClientRect().top;
    stickySourcingNav.hidden = sourceNavTop > headerBottom || frameRect.bottom <= headerBottom;
    if (stickySourcingNav.hidden) return;

    const navHeight = sourceNav.getBoundingClientRect().height || 60;
    // Keep the active state aligned with the section label after anchor clicks,
    // which intentionally leave 100px of breathing room below the sticky bar.
    const threshold = headerBottom + navHeight + 100;
    const pairs = stickySourcingItems
      .filter(item => !item.classList.contains('is-cta'))
      .map(item => ({ item, section: doc.getElementById(item.dataset.target) }))
      .filter(pair => pair.section);
    let current = pairs[0];
    pairs.forEach(pair => {
      const top = frameRect.top + pair.section.getBoundingClientRect().top;
      if (top <= threshold) current = pair;
    });
    stickySourcingItems.forEach(item => item.classList.toggle('active', Boolean(current && item === current.item)));
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
      if (stickySourcingNav) stickySourcingNav.hidden = true;
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
    if (link.closest('.speego-host-sourcing-subnav')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const id = link.getAttribute('href').slice(1);
      if (id === 'contact-form') {
        window.location.hash = '#consultation-form';
      } else {
        frame.contentWindow.postMessage({ type: 'speego:scroll-to', id }, window.location.origin);
      }
      return;
    }
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
      syncStickySourcingNav();
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
        syncStickySourcingNav();
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
  window.addEventListener('scroll', updateStickySourcingNav, { passive: true });
  window.addEventListener('resize', updateStickySourcingNav);
  const initialRoute = isExploreRoute(window.location.hash) ? window.location.hash : '#/knowledge';
  frame.src = '/explore/?embedded=1' + initialRoute;
  syncView();
})();
