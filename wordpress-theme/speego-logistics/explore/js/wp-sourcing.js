/* Interactions for the imported Sourcing widget, including Elementor preview. */
(function () {
  function bind() {
    var header = document.getElementById('masthead');
    var menu = document.getElementById('mobileMenuOpen');
    if (document.body.classList.contains('speego-elementor-page') && header && menu && !menu.dataset.speegoBound) {
      menu.dataset.speegoBound = '1';
      function closeMenu() {
        header.classList.remove('is-menu-open');
        menu.setAttribute('aria-expanded', 'false');
      }
      menu.addEventListener('click', function () {
        menu.setAttribute('aria-expanded', String(header.classList.toggle('is-menu-open')));
      });
      header.querySelectorAll('.speego-nav-menu a').forEach(function (link) { link.addEventListener('click', closeMenu); });
      document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
    }
    document.querySelectorAll('.page-sourcing').forEach(function (page) {
      page.querySelectorAll('.faq-item').forEach(function (item) {
        var button = item.querySelector('.faq-question-btn');
        if (!button || button.dataset.speegoBound) return;
        button.dataset.speegoBound = '1';
        button.setAttribute('aria-expanded', String(item.classList.contains('active')));
        button.addEventListener('click', function () {
          var open = !item.classList.contains('active');
          page.querySelectorAll('.faq-item').forEach(function (other) {
            other.classList.toggle('active', other === item && open);
            var toggle = other.querySelector('.faq-question-btn');
            if (toggle) toggle.setAttribute('aria-expanded', String(other === item && open));
          });
        });
      });
      var track = page.querySelector('#prodSliderTrack');
      if (track && !track.dataset.speegoBound) {
        track.dataset.speegoBound = '1';
        var current = 0;
        var dots = page.querySelectorAll('.ff-slider-dots .ff-dot');
        var total = Math.max(1, dots.length);
        function slide(index) {
          current = (index + total) % total;
          track.style.transform = 'translateX(-' + current * 100 + '%)';
          dots.forEach(function (dot, i) { dot.classList.toggle('active', i === current); });
        }
        page.querySelectorAll('.prod-arrow-btn').forEach(function (button, i) {
          button.removeAttribute('onclick');
          button.addEventListener('click', function () { slide(current + (i ? 1 : -1)); });
        });
        dots.forEach(function (dot, i) {
          dot.removeAttribute('onclick');
          dot.addEventListener('click', function () { slide(i); });
        });
      }
      page.querySelectorAll('.consult-form').forEach(function (form) {
        if (form.dataset.speegoBound) return;
        form.dataset.speegoBound = '1';
        form.removeAttribute('onsubmit');
        form.addEventListener('submit', function (event) {
          event.preventDefault();
          var fields = new FormData(form);
          var subject = 'SpeeGo inquiry — ' + (fields.get('fullName') || '');
          var body = 'Full name: ' + (fields.get('fullName') || '') + '\nEmail: ' + (fields.get('email') || '')
            + '\nPhone: ' + (fields.get('phone') || '') + '\n\nMessage:\n' + (fields.get('message') || '');
          window.location.href = 'mailto:info@speegologistic.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
  window.addEventListener('elementor/frontend/init', function () {
    if (window.elementorFrontend) window.elementorFrontend.hooks.addAction('frontend/element_ready/text-editor.default', bind);
  });
}());
