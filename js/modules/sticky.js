const stickyHeader = () => {
  const header = document.querySelector('.site-header');
  // const sitehHeight = header.clientHeight;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    scroll > 0
      ? header.classList.add('sticky-header')
      : header.classList.remove('sticky-header');
  });
};
export default stickyHeader;
