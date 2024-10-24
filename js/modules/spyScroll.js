const spyScroll = {
  $body: document.querySelector('body'),
  $header: document.querySelector('.site-header'),
  $section: document.querySelector('.scrolly-section'),
  $links: document.querySelectorAll('.scrolly-link'),
  $rows: document.querySelectorAll('.scrolly-row'),
  init() {
      const _ = this;

      const linksReveal = () => {
        const fromTop = Math.ceil(window.scrollY);
        const windowHeight = window.innerHeight;
    
        // Remove 'current' class from all links first
        _.$links.forEach(($link) => {
            $link.classList.remove('current');
        });
    
        // Check each link's section to determine when to add 'current'
        _.$links.forEach(($link, index) => {
            let section = document.querySelector($link.hash);
            if (section) {
                const sectTop = section.offsetTop;
                const sectBottom = sectTop + section.offsetHeight;
                const sectionHeight = section.offsetHeight;

                const isFullyInView = fromTop >= sectTop && fromTop < sectBottom;
                const isPartiallyInView = sectTop < (fromTop + windowHeight) && sectBottom >= fromTop;

                // Add 'current' class only when section is fully or partially in view
                if (isFullyInView || isPartiallyInView) {
                    $link.classList.add('current');
                }
            }
        });
      };
    
      window.addEventListener('load', linksReveal);
      window.addEventListener('scroll', linksReveal);

      // Stickiness logic for the sections
      const secReveals = () => {
          var reveals = _.$rows;
          reveals.forEach((ele, i) => {
              var windowHeight = window.innerHeight;
              var elementTop = reveals[i].getBoundingClientRect().top;
              var elementVisible = 0;

              // Add or remove 'scroll-sticky' class based on section visibility
              if (elementTop < windowHeight - elementVisible) {
                  reveals[i].classList.add('scroll-sticky');
              } else {
                  reveals[i].classList.remove('scroll-sticky');
              }
          });
      };
      window.addEventListener('scroll', secReveals);

      // Sticky reveal for the main scrolly-section
      const stickyReveals = () => {
          if (!_.$section) return;
          const stickyTop = _.$section.offsetTop - _.$header.offsetHeight;
          const scrollTop = Math.ceil(window.scrollY);
          const stickyRadius = Number(_.$section.getAttribute('data-radius'));
          const stickyTransition = Number(_.$section.getAttribute('data-speed'));

          if (scrollTop >= stickyTop) {
              _.$section.style.borderRadius = `0 0 ${stickyRadius}px ${stickyRadius}px`;
              _.$section.style.transition = '';
              _.$body.classList.add('scrolly-body');
              _.$header.style.opacity = '0';
              _.$header.style.transition = '';
          } else {
              _.$section.style.borderRadius = `${stickyRadius}px`;
              _.$section.style.transition = `all ${stickyTransition}ms ease`;
              _.$body.classList.remove('scrolly-body');
              _.$header.style.opacity = '1';
              _.$header.style.transition = `all ${stickyTransition}ms ease`;
          }
      };
      window.addEventListener('scroll', stickyReveals);
  }
}

export default spyScroll;
