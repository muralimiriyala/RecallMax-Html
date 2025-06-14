const Menu = {
  $adsense: document.querySelector('.header_bar_main'),
  $header: document.querySelector('.site-header'),
  $sticky_mobile_btn: document.querySelector('.sticky_mobile_btn'),
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
  $blackheader: document.querySelector(
    ' body.category, body.page-template-about, body.page-template-contact, body.error404'
  ),
  $whiteheader: document.querySelector(
    'body.page-template-services-detail, body.single-post, body.page-template-team'
  ),
  $site: document.querySelector('.site-main-cover'),
  $mainproducts: document.querySelector(
    'ul.main_menu > li.nav-products:not(.current-page-ancestor) > a'
  ),
  $mainproductsSub: document.querySelector(
    'ul.main_menu > li.nav-products:not(.current-page-ancestor)'
  ),
  $mainproductsHover: document.querySelector(
    'ul.main_menu > li.nav-products:hover:not(.current-page-ancestor) > a'
  ),
  $products: document.querySelectorAll(
    'ul.main_menu > li.nav-products > ul > li.nav-sub-products > ul > li > a'
  ),
  $productsLi: document.querySelectorAll(
    'ul.main_menu > li.nav-products > ul > li.nav-sub-products > ul > li.current_page_item'
  ),
  init() {
    const _ = this;
    if (!_.$header) return false;

    if (_.$mainproducts && !_.$productsLi.length > 0) {
      _.$products[0].parentElement.classList.add('open');
    }

    _.$products.forEach((ele) => {
      // On mouseenter
      ele.addEventListener('mouseenter', function (e) {
        _.$productsLi.forEach((li) => li.classList.remove('current_page_item'));
        _.$products.forEach((ele) =>
          ele.parentElement.classList.remove('open')
        );
        e.target.parentElement.classList.add('open');
      });
    });

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
      this.classList.toggle('open');
      _.$nav.classList.toggle('open');
      _.$moverlay.classList.toggle('open');
    };
    if (!_.$btn) return false;
    _.$btn.addEventListener('click', humburger);

    let menufun = function (e) {
      e.preventDefault();
      const _$ = this;
      _$.classList.toggle('active');
      const $li = _$.parentElement;

      const siblings = Array.from($li.parentElement.children);
      siblings.forEach(($item) => {
        if ($item !== $li) {
          $item.classList.remove('active');
          $item.classList.toggle('sib');
        }
      });
      $li.classList.remove('sib');

      _.$links.forEach(($item) => {
        if ($item !== _$ && $item !== $li) {
          $item.parentElement.querySelector('ul.sub-menu').style.maxHeight =
            '0';
        }
      });

      let $submenu = _$.parentElement.querySelector('ul.sub-menu');
      if ($submenu.style.maxHeight && $submenu.style.maxHeight !== '0px') {
        $submenu.style.maxHeight = '0';
        $submenu.style.overflow = 'hidden';
      } else {
        // $submenu.style.maxHeight = `${$submenu.scrollHeight}px`
        $submenu.style.maxHeight = `${400}px`;
        $submenu.style.overflow = `auto`;
      }
    };

    let onMouse = () => {
      _.$overlay.classList.add('open');
    };
    let offMouse = () => {
      _.$overlay.classList.remove('open');
    };
    if (!_.$links) return false;

    _.$links.forEach(function ($link) {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        $link.addEventListener('click', menufun);
      }
      $link.addEventListener('mouseover', onMouse);
      $link.addEventListener('mouseleave', offMouse);
    });

    _.$hoverlink.forEach(($hoverli) => {
      $hoverli.addEventListener('mouseover', onMouse);
      $hoverli.addEventListener('mouseleave', offMouse);
    });

    if (_.$blackheader) {
      _.$header.classList.add('black-header');
      _.$site.classList.add('site-black-top');
    }
    if (_.$whiteheader) {
      _.$header.classList.add('white-header');
      _.$site.classList.add('site-white-top');
    }

    let offHeight = _.$site.offsetTop;
    let staticScroll = 100;
    let mobscroll = offHeight + staticScroll;
    let mobScroll = () => {
      if (!_.$sticky_mobile_btn) return;
      const scroll = window.scrollY;
      if (scroll > mobscroll) {
        $(_.$sticky_mobile_btn.closest('.site-footer')).css({
          position: 'relative',
          zIndex: '700',
        });
        $(_.$sticky_mobile_btn).fadeIn(900);
      } else {
        $(_.$sticky_mobile_btn).fadeOut(900);
      }
    };
    window.addEventListener('scroll', mobScroll);
    window.addEventListener('load', mobScroll);

    if (!_.$adsense) return false;
    if (_.$adsense) {
      _.$site.classList.add('top-stickybar');
    } else {
      _.$site.classList.remove('top-stickybar');
    }
  },
};
export default Menu;
