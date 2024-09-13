// element scroll here based on id
const eleScroll = function (event) {
  event.preventDefault();
  let headerHeight = document.querySelector('header').clientHeight;
  const idName = event.target.getAttribute('href').substring(1);
  let targetDiv;
  /^\d/.test(idName)
    ? (targetDiv = document.querySelector(
        `#\\3${idName.charAt(0)} ${idName.slice(1)}`
      ))
    : (targetDiv = document.querySelector(`#${idName}`));
  if (!targetDiv) return;
  window.scroll({
    top: targetDiv.offsetTop - headerHeight,
    behavior: 'smooth',
  });
};
window.onscroll = function () {
  const scroll = parseInt(this.scrollY);
};
let atags = document.querySelectorAll('a[href]').forEach((atag) => {
  let href = atag.getAttribute('href');
  let length = href.length > 0;
  let substring = href.substring(1);
  if (href.includes(`#${substring}`) && length) {
    atag.addEventListener('click', function (e) {
      eleScroll(e);
    });
  }
});
const pageScroll = function () {};
