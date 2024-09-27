const Menu = {
  $header: document.querySelector('.site-header'),
  $btn: document.querySelector('.humburger-btn'),
  $nav: document.querySelector('.header_right'),
  $links: document.querySelectorAll(
    'ul.main_menu > li.menu-item-has-children > a'
  ),
  $overlay: document.querySelector('.header-overlay'),
  init() {
    const _ = this;
    // const $siteHeight = header.clientHeight;
    if (!_.$header) return false;
    let userScroll = () => {
      const scroll = window.scrollY;
      scroll > 0
        ? _.$header.classList.add('sticky-header')
        : _.$header.classList.remove('sticky-header');
    };
    window.addEventListener('scroll', userScroll);
    window.addEventListener('load', userScroll);
    let humburger = function (e) {
      e.preventDefault();
      const _$ = this;
      _$.classList.toggle('open');
      _.$nav.classList.toggle('open');
      _.$overlay.classList.toggle('active');
    };
    if (!_.$btn) return false;
    _.$btn.addEventListener('click', humburger);

    let menu = function (e) {
      e.preventDefault();
      const _$ = this;
      _$.classList.toggle('active');
      _.$links.forEach(($item) => {
        if ($item !== _$) {
          $item.parentElement.querySelector('ul.sub-menu').style.maxHeight =
            '0';
          $item.classList.remove('active');
        }
      });
      let $submenu = _$.parentElement.querySelector('ul.sub-menu');
      console.log(
        $submenu.style.maxHeight && $submenu.style.maxHeight !== '0px'
      );
      $submenu.style.maxHeight && $submenu.style.maxHeight !== '0px'
        ? ($submenu.style.maxHeight = '0')
        : ($submenu.style.maxHeight = `${$submenu.scrollHeight}px`);
    };
    let onMouse = () => {
      _.$overlay.classList.add('open');
    };
    let offMouse = () => {
      _.$overlay.classList.remove('open');
    };
    if (!_.$links) return false;
    _.$links.forEach(function ($link) {
      $link.addEventListener('click', menu);
      $link.addEventListener('mouseover', onMouse);
      $link.addEventListener('mouseleave', offMouse);
    });
  },
};
export default Menu;
