import 'sticksy';

export const scrollnav = {
  eles: document.querySelectorAll('.scroll-nav-text a.text-link'),
  stickele: document.querySelector('.sticky-widget'),
  nav: document.querySelector('ul.scroll-nav-links'),
  init() {
    const __ = this;
    if (!__.eles.length && !__.nav) return;

    this.nav.children[0].querySelector('a').classList.add('active');
    this.nav.addEventListener('click', function (e) {
      e.preventDefault();
      e.currentTarget.querySelectorAll('a').forEach((ele) => {
        ele.classList.remove('active');
      });
      if (e.target.tagName === 'A') {
        e.target.classList.toggle('active');
      }
    });

    const height = +document.querySelector('header').getBoundingClientRect()
      .height;

    const eventHandler = (e) => {
      e.preventDefault();

      const myele = e.currentTarget;
      const parentList = myele.closest('.scroll-nav-lists');
      const target = parentList.querySelector('.scroll-nav-pos');

      const isCurrentlyOpen = myele.dataset.open === 'true';
      // Close all
      __.eles.forEach((ele) => {
        const list = ele.closest('.scroll-nav-lists');
        const content = list.querySelector('.scroll-nav-pos');

        ele.classList.remove('open');
        ele.dataset.open = 'false';
        content.classList.remove('open');
        content.style.maxHeight = '0px';
      });

      if (!isCurrentlyOpen) {
        // Open the clicked one
        myele.classList.add('open');
        myele.dataset.open = 'true';
        target.classList.add('open');
        target.style.maxHeight = `${target.scrollHeight}px`;
      }
    };

    __.eles.forEach((ele) => {
      ele.dataset.open = 'false'; // Ensure consistent starting state
      ele.addEventListener('click', eventHandler);
    });

    new Sticksy(this.stickele, {
      topSpacing: height,
      listen: true,
    });
  },
};
