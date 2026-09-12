/**
 * SpeeGo Logistics — Scroll Journey Process
 * Spec: speego-logistics-journey-process.md
 */
(function () {
  'use strict';

  const MOVER_ICONS = {
    package: 'fa-box',
    container: 'fa-cubes',
    ship: 'fa-ship',
    truck: 'fa-truck'
  };

  function moverIconForStep(step) {
    if (step <= 4) return MOVER_ICONS.package;
    if (step <= 6) return MOVER_ICONS.container;
    if (step === 7) return MOVER_ICONS.ship;
    return MOVER_ICONS.truck;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isMobileLayout() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function buildZigZagPath(nodes, svgEl) {
    if (!nodes.length || !svgEl) return '';

    const rect = svgEl.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return '';

    const pts = nodes.map((node) => {
      const r = node.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - rect.left,
        y: r.top + r.height / 2 - rect.top
      };
    });

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    return d;
  }

  function initJourney() {
    const section = document.getElementById('process-speego');
    const journey = section && section.querySelector('[data-journey]');
    if (!section || !journey) return;

    const svg = journey.querySelector('.speego-journey-route');
    const pathBase = svg && svg.querySelector('.route-base');
    const pathProgress = svg && svg.querySelector('.route-progress');
    const mover = journey.querySelector('.speego-journey-mover');
    const moverIcon = mover && mover.querySelector('i');
    const steps = Array.from(journey.querySelectorAll('.speego-journey-step'));
    const nodes = steps.map((s) => s.querySelector('.speego-journey-node')).filter(Boolean);

    let pathLength = 0;
    let ticking = false;

    function layoutRoute() {
      if (!svg || !pathBase || !pathProgress || isMobileLayout()) return;

      svg.setAttribute('viewBox', `0 0 ${journey.offsetWidth} ${journey.offsetHeight}`);
      svg.setAttribute('width', journey.offsetWidth);
      svg.setAttribute('height', journey.offsetHeight);

      const d = buildZigZagPath(nodes, svg);
      if (!d) return;

      pathBase.setAttribute('d', d);
      pathProgress.setAttribute('d', d);

      pathLength = pathProgress.getTotalLength();
      pathProgress.style.strokeDasharray = String(pathLength);
      pathProgress.style.strokeDashoffset = String(pathLength);

      if (prefersReducedMotion()) {
        pathProgress.style.strokeDashoffset = '0';
        pathProgress.style.strokeDasharray = 'none';
        pathBase.style.strokeDasharray = 'none';
      }
    }

    function setStepStates(progress) {
      const count = steps.length;
      const activeIndex = Math.min(
        count - 1,
        Math.max(0, Math.floor(progress * count + 0.001))
      );

      steps.forEach((step, i) => {
        step.classList.toggle('is-completed', i < activeIndex);
        step.classList.toggle('is-active', i === activeIndex);
      });

      if (moverIcon) {
        const icon = moverIconForStep(activeIndex + 1);
        moverIcon.className = `fas ${icon}`;
      }
    }

    function updateMover(progress) {
      if (!mover || !pathProgress || !pathLength || isMobileLayout()) {
        if (mover) mover.classList.remove('is-visible');
        return;
      }

      const clamped = Math.min(1, Math.max(0, progress));
      const point = pathProgress.getPointAtLength(pathLength * clamped);
      mover.style.left = `${point.x}px`;
      mover.style.top = `${point.y}px`;
      mover.classList.add('is-visible');
    }

    function updateFromScroll() {
      ticking = false;

      if (isMobileLayout()) {
        steps.forEach((step) => {
          const r = step.getBoundingClientRect();
          const mid = window.innerHeight * 0.55;
          const active = r.top < mid && r.bottom > mid * 0.35;
          const completed = r.bottom < mid;
          step.classList.toggle('is-active', active);
          step.classList.toggle('is-completed', completed && !active);
        });
        return;
      }

      const rect = journey.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH * 0.65;
      const end = viewH * 0.25;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      let progress = traveled / total;
      progress = Math.min(1, Math.max(0, progress));

      if (prefersReducedMotion()) {
        progress = 1;
        steps.forEach((step, i) => {
          step.classList.add(i === steps.length - 1 ? 'is-active' : 'is-completed');
          if (i !== steps.length - 1) step.classList.remove('is-active');
        });
        steps[steps.length - 1].classList.add('is-active');
      } else {
        setStepStates(progress);
      }

      if (pathProgress && pathLength) {
        if (prefersReducedMotion()) {
          pathProgress.style.strokeDashoffset = '0';
        } else {
          pathProgress.style.strokeDashoffset = String(pathLength * (1 - progress));
        }
      }

      updateMover(progress);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateFromScroll);
    }

    function onResize() {
      layoutRoute();
      updateFromScroll();
    }

    layoutRoute();
    updateFromScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Recalculate after images/fonts settle
    window.addEventListener('load', onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onResize).catch(function () {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJourney);
  } else {
    initJourney();
  }
})();
