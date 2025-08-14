import scrollSpy from 'simple-scrollspy';
import jumpTo from 'jump.js';

export const scrollnavline = {
  nav: document.querySelector('ul.scroll-nav-links'),
  init() {
    if (!this.nav) return;
    const height = +document.querySelector('header').getBoundingClientRect()
      .height;

    scrollSpy(this.nav, {
      sectionClass: '.scroll-nav-lists',
      menuActiveTarget: 'a',
      offset: 200,
      smoothScroll: true,
    });

    // Handle click scroll (no manual active class!)
    this.nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        e.preventDefault();

        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          jumpTo(targetElement, {
            duration: 1000,
            offset: -height,
          });
        }
      }
    });
  },
};
