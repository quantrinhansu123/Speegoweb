/* The reference archive needs only its mobile menu; no copied plugin runtime. */
(function () {
  var toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('tabindex', '0');
  toggle.setAttribute('aria-label', 'Menu');
  toggle.setAttribute('aria-expanded', 'false');
  function openMenu(event) {
    event.preventDefault();
    var open = document.documentElement.classList.toggle('is-menu-toggled-on');
    document.getElementById('site-navigation').classList.toggle('is-active', open);
    document.getElementById('masthead').classList.toggle('is-active', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', openMenu);
  toggle.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') openMenu(event);
  });
})();
