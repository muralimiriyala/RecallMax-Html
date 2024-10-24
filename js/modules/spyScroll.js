const spyScroll = {
  $body: document.querySelector('body'),
  $header: document.querySelector('.site-header'),
  $section: document.querySelector('.scrolly-section'),
  $links: document.querySelectorAll('.scrolly-link'),
  $rows: document.querySelectorAll('.scrolly-row'),
  init() {
      const _ = this;
      if(!_.$links) return;
      _.$links[0].classList.add('current');
      const linksReveal = () => {
        const fromTop = Math.ceil(window.scrollY);
        const windowHeight = window.innerHeight;

        // _.$links.forEach(($link) => {
        //     $link.classList.remove('current');
        // });

        _.$links.forEach(($link, index) => {
            let section = document.querySelector($link.hash);
            if (section) {
                const sectTop = section.offsetTop;
                const sectBottom = sectTop + section.offsetHeight;
                const sectionHeight = section.offsetHeight;

                const isFullyInView = fromTop >= sectTop && fromTop < sectBottom;
                const isPartiallyInView = sectTop < (fromTop + windowHeight) && sectBottom >= fromTop;

                // Add 'current' class only when section is fully or partially in view
                // if (isFullyInView || isPartiallyInView) {
                //     $link.classList.add('current');
                // }
            }
        });
      };
    
      window.addEventListener('load', linksReveal);
      window.addEventListener('scroll', linksReveal);

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
          const stickyRadius = Number(_.$section.getAttribute('data-radius'));
          const stickyTransition = Number(_.$section.getAttribute('data-speed'));

          if (scrollTop >= stickyTop) {
            _.$section.classList.add('scrolly-intro');
            _.$body.classList.add('scrolly-body');
            _.$header.style.opacity = '0';
            _.$header.style.transition = '';
          } else {
            _.$section.classList.remove('scrolly-intro');
            _.$body.classList.remove('scrolly-body');
            _.$header.style.opacity = '1';
            _.$header.style.transition = `all 0.5s ease`;
          }
      };
      window.addEventListener('scroll', stickyReveals);
  }
}

export default spyScroll;
