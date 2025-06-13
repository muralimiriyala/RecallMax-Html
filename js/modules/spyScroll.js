export const spyScroll = {
  $body: document.querySelector('body'),
  $header: document.querySelector('.site-header'),
  $section: document.querySelector('.scrolly-section'),
  $links: document.querySelectorAll('.scrolly-link'),
  $rows: document.querySelectorAll('.scrolly-row'),
  init() {
    const _ = this;
    if (!_.$links.length) return;
    _.$links[0].classList.add('current');
    const linksReveal = () => {
      // Remove current class from all links
      _.$links.forEach(($link) => $link.classList.remove('current'));

      // Loop through rows to find the one that is currently sticky
      _.$rows.forEach(($row, index) => {
        if ($row.classList.contains('scrolly-sticky')) {
          const $link = _.$links[index];
          if ($link) $link.classList.add('current');
        }
      });
    };

    window.addEventListener('scroll', () => {
      secReveals();
      linksReveal();
    });
    window.addEventListener('load', () => {
      secReveals();
      linksReveal();
    });

    // window.addEventListener('load', linksReveal);
    // window.addEventListener('scroll', linksReveal);

    const secReveals = () => {
      var reveals = _.$rows;
      reveals.forEach((ele, i) => {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 0;

        // Add or remove 'scrolly-sticky' class based on section visibility
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('scrolly-sticky');
        } else {
          reveals[i].classList.remove('scrolly-sticky');
        }
      });
    };
    window.addEventListener('scroll', secReveals);

    const stickyReveals = () => {
      if (!_.$section) return;
      const stickyTop = _.$section.offsetTop - _.$header.offsetHeight;
      const scrollTop = Math.ceil(window.scrollY);

      if (scrollTop >= stickyTop) {
        _.$section.classList.add('scrolly-intro');
        _.$body.classList.add('scrolly-body');
        _.$header.classList.add('scrolly-header');
      } else {
        _.$section.classList.remove('scrolly-intro');
        _.$body.classList.remove('scrolly-body');
        _.$header.classList.remove('scrolly-header');
      }

      // open header
      const totele = _.$section.offsetTop + _.$section.offsetHeight;
      if (scrollTop > totele) {
        _.$header.classList.remove('scrolly-header');
      }
    };
    window.addEventListener('scroll', stickyReveals);
  },
};
