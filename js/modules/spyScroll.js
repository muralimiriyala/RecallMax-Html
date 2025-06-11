import scrollSpy from 'simple-scrollspy';
import jumpTo from 'jump.js';
import 'sticksy';

export const spyScroll = {
  nav: document.querySelector('ul.scrolly-links'),
  stickele: document.querySelector('.scrolly-sidebar'),
  init() {
    if (!this.nav) return;
    const height = +document.querySelector('header').getBoundingClientRect()
      .height;

    scrollSpy(this.nav, {
      sectionClass: '.scrolly-row',
      menuActiveTarget: 'a',
      offset: 200,
      smoothScroll: true,
    });

    new Sticksy(this.stickele, {
      topSpacing: 150,
      listen: true,
    });

    // Handle click scroll (no manual active class!)
    this.nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        e.preventDefault();

        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          jumpTo(targetElement, {
            duration: 2000,
            offset: -150,
          });
        }
      }
    });
  },
};
