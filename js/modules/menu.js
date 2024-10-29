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
  $blackheader: document.querySelector(
    'body.category-resources, body.page-template-about, body.page-template-contact, body.error404'
  ),
  $whiteheader: document.querySelector('body.page-template-service-detail, body.single-post, body.page-template-team'),
  $site: document.querySelector('.site-main-cover'),
  $mainproducts: document.querySelector('ul.main_menu > li.nav-products > a'),
  $products: document.querySelectorAll('ul.main_menu > li.nav-products > ul > li.nav-sub-products > ul > li > a'),
  init() {
    const _ = this;
    if (!_.$header) return false;
    // if (!_.$mainproducts) return false;

    if(_.$mainproducts){
      _.$mainproducts.addEventListener('mouseover', function(e){
        _.$products[0].parentElement.classList.add('open');
      })
      _.$mainproducts.addEventListener('mouseleave', function(e){
        _.$products[0].parentElement.classList.remove('open');
      })
    }
  
    _.$products.forEach((ele)=>{
      ele.addEventListener("mouseover", function(e){
        _.$products.forEach((ele)=>{
          ele.parentElement.classList.remove("open");
        })
        e.target.parentElement.classList.add("open");
      })
      ele.addEventListener("mouseleave", function(e){
        e.target.parentElement.classList.remove("open");
      });
    })

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
          $item.parentElement.querySelector('ul.sub-menu').style.maxHeight = '0';
        }
      });

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
  },
};
export default Menu;
