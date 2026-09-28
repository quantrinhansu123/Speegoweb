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

  function initPageMotion(root) {
    initCtaBandMotion(root);
    initMethodsMotion(root);
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
