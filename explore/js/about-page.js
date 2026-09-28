/* About Us page — native SpeeGo homepage typography & motion */
(function () {
  function initIntroSlider(root) {
    var slider = root.querySelector('[data-about-slider]');
    if (!slider || slider.dataset.sliderBound === '1') return;

    var slidesWrap = slider.querySelector('.about-intro-slides');
    if (!slidesWrap) return;

    var slides = Array.prototype.slice.call(slidesWrap.querySelectorAll('[data-about-slide]'));
    if (slides.length < 2) return;

    slider.dataset.sliderBound = '1';
    slider.classList.add('is-clickable');
    slider.setAttribute('role', 'button');
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('title', 'Click to view next photo');

    slides.forEach(function (img, i) {
      img.classList.toggle('is-active', i === 0);
    });

    var dotsWrap = slider.querySelector('[data-about-dots]');
    if (!dotsWrap) {
      dotsWrap = document.createElement('div');
      dotsWrap.className = 'about-intro-dots';
      dotsWrap.setAttribute('data-about-dots', '');
      dotsWrap.setAttribute('role', 'tablist');
      dotsWrap.setAttribute('aria-label', 'Team photos');
      slider.appendChild(dotsWrap);
    }
    dotsWrap.innerHTML = '';
    slides.forEach(function (_img, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'about-intro-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Photo ' + (i + 1));
      dot.addEventListener('click', function (e) {
        e.stopPropagation();
        showSlide(i);
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('.about-intro-dot'));

    var slideIndex = 0;

    function showSlide(next) {
      slideIndex = ((next % slides.length) + slides.length) % slides.length;
      slides.forEach(function (img, i) {
        img.classList.toggle('is-active', i === slideIndex);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === slideIndex);
      });
    }

    function nextSlide() {
      showSlide(slideIndex + 1);
    }

    slider.addEventListener('click', function (e) {
      if (e.target.closest('[data-about-dots]')) return;
      nextSlide();
    });

    slider.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showSlide(slideIndex - 1);
      }
    });
  }

  function initAboutPage(root) {
    if (!root) return;

    initIntroSlider(root);

    if (root.dataset.aboutReady === '1') return;
    root.dataset.aboutReady = '1';

    // Scroll reveal
    var reveals = root.querySelectorAll('.about-reveal');
    if ('IntersectionObserver' in window) {
      var revealIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach(function (el) { revealIo.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // Counters
    var stats = root.querySelector('#aboutStats');
    var counters = root.querySelectorAll('.about-counter');
    var counted = false;

    function animateCounters() {
      if (counted) return;
      counted = true;
      counters.forEach(function (el) {
        var target = parseFloat(String(el.getAttribute('data-target') || '0').replace(/,/g, '')) || 0;
        var start = 0;
        var duration = 1800;
        var t0 = null;
        function tick(ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.floor(start + (target - start) * eased);
          el.textContent = val.toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString('en-US');
        }
        requestAnimationFrame(tick);
      });
    }

    if (stats && 'IntersectionObserver' in window) {
      var statsIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              statsIo.disconnect();
            }
          });
        },
        { threshold: 0.35 }
      );
      statsIo.observe(stats);
    } else {
      animateCounters();
    }

    // Gallery lightbox
    var lightbox = root.querySelector('#aboutLightbox');
    var lightboxImg = root.querySelector('#aboutLightboxImg');
    var closeBtn = root.querySelector('.about-lightbox-close');

    function openLightbox(src, alt) {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.hidden = true;
      if (lightboxImg) lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    root.querySelectorAll('.about-gallery-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-full') || (btn.querySelector('img') && btn.querySelector('img').src);
        var alt = (btn.querySelector('img') && btn.querySelector('img').alt) || '';
        if (src) openLightbox(src, alt);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function boot() {
    var root = document.querySelector('.page-about');
    if (root && root.isConnected) initAboutPage(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.initAboutPage = function () {
    var root = document.querySelector('.page-about');
    if (root) {
      delete root.dataset.aboutReady;
      var slider = root.querySelector('[data-about-slider]');
      if (slider) delete slider.dataset.sliderBound;
      initAboutPage(root);
    }
  };

  window.addEventListener('hashchange', function () {
    setTimeout(boot, 80);
  });
})();
