const Menu = {
  $header: document.querySelector('.site-header'),
  $btn: document.querySelector('.humburger-btn'),
  $nav: document.querySelector('.header_right'),
  $links: document.querySelectorAll(
    'ul.main_menu > li.menu-item-has-children > a'
  ),
  $hoverlink: document.querySelectorAll(
    'ul.main_menu > li.menu-item-has-children'
  ),
  $overlay: document.querySelector('.header-overlay'),
  $moverlay: document.querySelector('.h-mob-overlay'),
  $blackheader: document.querySelector('body.page-template-contact'),
  $whiteheader: document.querySelector('body.page-template-about-team'),
  $site: document.querySelector('.site-main-cover'),
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
      _.$moverlay.classList.toggle('open');
    };
    if (!_.$btn) return false;
    _.$btn.addEventListener('click', humburger);

    let menu = function (e) {
      e.preventDefault();
      const _$ = this;
      _$.classList.toggle('active');
      _$.parentElement.classList.remove('sib');
      const $li = _$.parentElement;
      _.$links.forEach(($item) => {
        if ($item !== _$ && $item !== $li) {
          $item.parentElement.querySelector('ul.sub-menu').style.maxHeight =
            '0';
          $item.classList.remove('active');
          const $lis = _$.parentElement.parentElement.children;
          for (let lis of $lis) {
            lis.classList.toggle('sib');
          }
        }
      });
      $li.classList.remove('sib');
      let $submenu = _$.parentElement.querySelector('ul.sub-menu');
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
    _.$hoverlink.forEach(($hoverli) => {
      $hoverli.addEventListener('mouseover', onMouse);
      $hoverli.addEventListener('mouseleave', offMouse);
    });
    if (_.$blackheader) {
      _.$header.classList.add('black-header');
    }
    if (_.$whiteheader) {
      _.$header.classList.add('white-header');
      _.$site.classList.add('site-top');
    }
  },
};
export default Menu;
