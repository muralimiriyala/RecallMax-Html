import scrollSpy from 'simple-scrollspy';
export const scrollnavline = {
  nav: document.querySelector('ul.scroll-nav-links'),
  init() {
    if (!this.nav) return;
    this.nav.children[0].querySelector('a').classList.add('active');
    const height = +document.querySelector('header').getBoundingClientRect()
      .height;
    scrollSpy(this.nav, {
      sectionClass: '.scroll-nav-lists',
      menuActiveTarget: '.active',
      offset: height + 0,
      smoothScroll: true,
      smoothScrollBehavior: function (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      },
    });
    // this.nav.addEventListener('click', function (e) {
    //   e.preventDefault();
    //   e.currentTarget.querySelectorAll('a').forEach((ele) => {
    //     ele.classList.remove('active');
    //   });
    //   if (e.target.tagName === 'A') {
    //     e.target.classList.toggle('active');
    //   }
    // });
  },
};
