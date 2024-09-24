const stickyHeader = {
  init() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    // const sitehHeight = header.clientHeight;
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      scroll > 0
        ? header.classList.add('sticky-header')
        : header.classList.remove('sticky-header');
    });
  },
};
export default stickyHeader;
