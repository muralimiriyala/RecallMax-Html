export const scrollnav = {
  $body: document.querySelector('body'),
  $header: document.querySelector('.site-header'),
  $section: document.querySelector('.scroll-nav-section'),
  $links: document.querySelectorAll('ul.scroll-nav-links li a'),
  $rows: document.querySelectorAll('.scroll-nav-lists'),
  init() {
    const _ = this;
    if (!_.$links.length) return;

    window.addEventListener('scroll', () => {
      secReveals();
    });
    window.addEventListener('load', () => {
      secReveals();
    });

    const secReveals = () => {
      var reveals = _.$rows;
      reveals.forEach((ele, i) => {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 0;

        // Add or remove 'scrolly-nav-sticky' class based on section visibility
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('scrolly-nav-sticky');
        } else {
          reveals[i].classList.remove('scrolly-nav-sticky');
        }
      });
    };
    window.addEventListener('scroll', secReveals);

    const stickyNavReveals = () => {
      if (!_.$section) return;
      const stickyTop = _.$section.offsetTop - _.$header.offsetHeight;
      const scrollTop = Math.ceil(window.scrollY);

      if (scrollTop >= stickyTop) {
        _.$section.classList.add('scrolly-intro');
        _.$body.classList.add('scrolly-body');
        // _.$header.classList.add('scrolly-header');
      } else {
        _.$section.classList.remove('scrolly-intro');
        _.$body.classList.remove('scrolly-body');
        // _.$header.classList.remove('scrolly-header');
      }

      // open header
      const totele = _.$section.offsetTop + _.$section.offsetHeight;
      if (scrollTop > totele) {
        // _.$header.classList.remove('scrolly-header');
      }
    };
    window.addEventListener('scroll', stickyNavReveals);
  },
};
