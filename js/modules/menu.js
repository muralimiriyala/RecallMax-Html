const Menu = {
  $header: document.querySelector('.site-header'),
  $btn: document.querySelector('.humburger-btn'),
  $nav: document.querySelector('.header_right'),
  $links: document.querySelectorAll(
    'ul.main_menu > li.menu-item-has-children > a'
  ),
  init() {
    const _ = this;
    // const $siteHeight = header.clientHeight;
    if (!_.$header) return false;
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
      _.$nav.classList.toggle('open');
    };
    if (!_.$btn) return false;
    _.$btn.addEventListener('click', humburger);

    let menu = function (e) {
      e.preventDefault();
      const _$ = this;
      _$.classList.toggle('active');
      _.$links.forEach(($item) => {
        if ($item !== _$) {
          $item.classList.remove('active');
        }
      });
    };
    if (!_.$links) return false;
    _.$links.forEach(function ($link) {
      $link.addEventListener('click', menu);
    });
  },
};
export default Menu;
