/**
 * Scroll-triggered motion: CTA band + shipping method cards
 */
(function () {
  'use strict';

  var observed = typeof WeakSet !== 'undefined' ? new WeakSet() : null;

  function observeSections(sections, dataAttr) {
    if (!sections || !sections.length) return;

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(sections, function (section) {
        section.classList.add('is-inview');
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    Array.prototype.forEach.call(sections, function (section) {
      if (observed && observed.has(section)) return;
      if (observed) observed.add(section);
      if (dataAttr) section.setAttribute(dataAttr, '');
      section.classList.remove('is-inview');
      io.observe(section);
    });
  }

  function collect(scope, selector) {
    if (!scope) return [];
    if (scope.querySelectorAll) {
      return scope.querySelectorAll(selector);
    }
    if (scope.classList && scope.matches && scope.matches(selector)) {
      return [scope];
    }
    return [];
  }

  function initCtaBandMotion(root) {
    var scope = root && root.querySelectorAll ? root : document;
    observeSections(collect(scope, '.cta-form-band-section'), 'data-cta-motion');
  }

  function initMethodsMotion(root) {
    var scope = root && root.querySelectorAll ? root : document;
    observeSections(collect(scope, '.page-shipping-routes .shipping-methods-section'), 'data-methods-motion');
  }

  function initKnowledgeCta(root) {
    var scope = root && root.querySelector ? root : document;
    var main = scope.querySelector ? scope.querySelector('main[data-nav="knowledge"]') : null;
    if (!main && scope.matches && scope.matches('main[data-nav="knowledge"]')) main = scope;
    if (!main) return;
    var form = main.querySelector('form.e-form-base');
    if (!form) return;
    var card = form.parentElement;
    var row = card && card.parentElement;
    var copy = card && card.previousElementSibling;
    if (!row || !copy) return;

    row.classList.add('speego-k-cta');
    card.classList.add('speego-k-cta-card');
    copy.classList.add('speego-k-cta-copy');
    var eyebrow = copy.children[0];
    var title = copy.querySelector('h2');
    var desc = copy.querySelector('p');
    var hot = null;
    var hotLinks = copy.querySelectorAll('a');
    for (var i = 0; i < hotLinks.length; i++) {
      if ((hotLinks[i].textContent || '').replace(/\s+/g, '').length) {
        hot = hotLinks[i];
        break;
      }
    }
    if (eyebrow) eyebrow.classList.add('speego-k-cta-tag');
    if (title) title.classList.add('speego-k-cta-title');
    if (desc) desc.classList.add('speego-k-cta-desc');
    if (hot) hot.classList.add('speego-k-cta-hotline');

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      row.classList.add('is-inview');
      return;
    }
    row.setAttribute('data-cta-motion', '');
    if (!('IntersectionObserver' in window)) {
      row.classList.add('is-inview');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        row.classList.add('is-inview');
        io.disconnect();
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
    io.observe(row);
  }

  function initPageMotion(root) {
    initCtaBandMotion(root);
    initMethodsMotion(root);
    initKnowledgeCta(root);
  }

  window.initCtaBandMotion = initCtaBandMotion;
  window.initMethodsMotion = initMethodsMotion;
  window.initPageMotion = initPageMotion;

  function boot() {
    initPageMotion(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener('hashchange', function () {
    setTimeout(boot, 120);
  });
})();
