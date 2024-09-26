const Menu = {
  $header: document.querySelector('.site-header'),
  $btn: document.querySelector('.humburger-btn'),
  init() {
    const _ = this;
    // const $siteHeight = header.clientHeight;
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      scroll > 0
        ? _.$header.classList.add('sticky-header')
        : _.$header.classList.remove('sticky-header');
    });
    let humburger = function (e) {
      e.preventDefault();
      const _$ = this;
      _$.classList.toggle('open');
    };
    _.$btn.addEventListener('click', humburger);
  },
};
export default Menu;
