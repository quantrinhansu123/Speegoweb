/**
 * Fulfillment quicklinks → sticky right icon dock when scrolled past.
 */
(function () {
  'use strict';

  var cleanup = null;
  var compactCheckTimer = null;

  function iconsFor(card, index) {
    if (card.querySelector('.ff-quicklink-icon')) return;
    var svgs = [
      '<path d="M6 3h12a1 1 0 0 1 1 1v17l-3-2-4 2-4-2-3 2V4a1 1 0 0 1 1-1Z"/><path class="ff-icon-accent ff-icon-draw" pathLength="1" d="M14.5 8H11a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9.5M12 6v12"/>',
      '<g class="ff-icon-truck"><path d="M3 6h11v11H3V6Zm11 4h4l3 4v3h-7"/><path class="ff-icon-accent" d="M17 10v4h4"/><circle class="ff-icon-wheel" cx="6.5" cy="18" r="2"/><circle class="ff-icon-wheel" cx="17.5" cy="18" r="2"/></g><path class="ff-icon-accent ff-icon-road" d="M1 10h4M1 13h3"/>',
      '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><rect class="ff-icon-accent" x="8" y="6" width="8" height="3" rx=".5"/><g class="ff-icon-keys"><path d="M8 13h1m3 0h1m3 0h.01M8 17h1m3 0h1"/><path class="ff-icon-accent" d="M16 16v3"/></g>',
      '<path d="M12 2.5 20 6v5c0 5-3.5 8.5-8 10.5C7.5 19.5 4 16 4 11V6l8-3.5Z"/><path class="ff-icon-accent ff-icon-draw" pathLength="1" d="m8 12 2.5 2.5L16 9"/>',
      '<rect class="ff-icon-tile" x="3" y="3" width="7" height="10" rx="1.5"/><rect class="ff-icon-accent ff-icon-tile" x="14" y="3" width="7" height="6" rx="1.5"/><rect class="ff-icon-accent ff-icon-tile" x="3" y="17" width="7" height="4" rx="1.5"/><rect class="ff-icon-tile" x="14" y="13" width="7" height="8" rx="1.5"/>'
    ];
    var icon = document.createElement('span');
    icon.className = 'ff-quicklink-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" focusable="false">' +
      (svgs[index] || svgs[0]) +
      '</svg>';
    card.insertBefore(icon, card.firstChild);
  }

  function ensureCompactLabel(card) {
    if (card.querySelector('.ff-quicklink-compact-label')) return;
    var title = card.querySelector('.ff-quicklink-title');
    var label = document.createElement('span');
    label.className = 'ff-quicklink-compact-label';
    label.textContent = title ? title.textContent.trim() : '';
    label.setAttribute('aria-hidden', 'true');
    if (title) card.setAttribute('aria-label', title.textContent.trim());
    card.appendChild(label);
  }

  function initFulfillmentQuicklinkDock() {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = null;
    }

    var section =
      document.querySelector('.page-fulfillment .ff-quicklinks-section') ||
      document.querySelector('.ff-quicklinks-section');
    if (!section) return;

    var grid = section.querySelector('.ff-quicklinks-grid');
    if (!grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.ff-quicklink-card'));
    if (!cards.length) return;

    cards.forEach(function (card, index) {
      iconsFor(card, index);
      ensureCompactLabel(card);
      if (index === cards.length - 1) card.classList.add('ff-quicklink-card--hub');
    });

    var reservedHeight = 0;
    var ticking = false;
    var observer = null;

    function setCompact(on) {
      if (on) {
        if (!section.classList.contains('is-compact')) {
          reservedHeight = section.offsetHeight || reservedHeight;
          if (reservedHeight > 0) section.style.height = reservedHeight + 'px';
          section.classList.add('is-compact');
        }
      } else if (section.classList.contains('is-compact')) {
        section.classList.remove('is-compact');
        section.style.height = '';
      }
    }

    function updateByScroll() {
      var rect = section.getBoundingClientRect();
      var trigger = Math.min(window.innerHeight * 0.4, 320);
      // Activate when quicklinks section has scrolled past (or page jumped via hash)
      var passed = rect.bottom < trigger || window.scrollY > section.offsetTop + Math.max(reservedHeight, 80);
      setCompact(passed);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateByScroll);
      }
    }

    function onResize() {
      setCompact(false);
      reservedHeight = section.offsetHeight;
      updateByScroll();
    }

    function scheduleCompactChecks() {
      clearTimeout(compactCheckTimer);
      updateByScroll();
      // Hash deep-links scroll after paint — re-check a few times
      compactCheckTimer = setTimeout(function () {
        updateByScroll();
        requestAnimationFrame(updateByScroll);
        setTimeout(updateByScroll, 200);
        setTimeout(updateByScroll, 500);
      }, 0);
    }

    // Avoid duplicate sentinels from re-init
    var existingSentinel = section.parentNode && section.parentNode.querySelector('.ff-quicklinks-dock-sentinel');
    if (existingSentinel) existingSentinel.parentNode.removeChild(existingSentinel);

    var sentinel = document.createElement('div');
    sentinel.className = 'ff-quicklinks-dock-sentinel';
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'width:100%;height:1px;margin:0;padding:0;pointer-events:none;';
    section.insertAdjacentElement('afterend', sentinel);

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        function (entries) {
          var entry = entries[0];
          if (!entry) return;
          var shouldCompact = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          if (shouldCompact) setCompact(true);
          else updateByScroll();
        },
        { root: null, threshold: 0, rootMargin: '0px 0px 0px 0px' }
      );
      observer.observe(sentinel);
    }

    reservedHeight = section.offsetHeight;
    scheduleCompactChecks();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    cleanup = function () {
      clearTimeout(compactCheckTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (observer) observer.disconnect();
      if (sentinel && sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
      setCompact(false);
      section.style.height = '';
    };
  }

  window.initFulfillmentQuicklinkDock = initFulfillmentQuicklinkDock;

  function initWarehouseSwipe() {
    var scroller = document.getElementById('warehouseGallery');
    if (!scroller || scroller.dataset.swipeReady === '1') return;
    scroller.dataset.swipeReady = '1';

    var dragging = false;
    var startX = 0;
    var startScroll = 0;
    var moved = false;

    scroller.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch') return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startScroll = scroller.scrollLeft;
      scroller.classList.add('is-dragging');
      try { scroller.setPointerCapture(event.pointerId); } catch (_) {}
    });

    scroller.addEventListener('pointermove', function (event) {
      if (!dragging) return;
      var dx = event.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      scroller.scrollLeft = startScroll - dx;
    });

    function endDrag(event) {
      if (!dragging) return;
      dragging = false;
      scroller.classList.remove('is-dragging');
      try { scroller.releasePointerCapture(event.pointerId); } catch (_) {}
    }

    scroller.addEventListener('pointerup', endDrag);
    scroller.addEventListener('pointercancel', endDrag);
    scroller.addEventListener('click', function (event) {
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      }
    }, true);
  }

  function boot() {
    initFulfillmentQuicklinkDock();
    initWarehouseSwipe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener('load', function () {
    setTimeout(boot, 30);
  });

  // In-page hash jumps: refresh compact state without full teardown when possible
  window.addEventListener('hashchange', function () {
    setTimeout(function () {
      if (typeof window.initFulfillmentQuicklinkDock === 'function') {
        window.initFulfillmentQuicklinkDock();
      }
    }, 80);
  });
})();
