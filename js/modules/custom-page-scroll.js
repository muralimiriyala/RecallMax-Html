// element scroll here based on id
const eleScroll = function (event) {
  event.preventDefault();
  let headerHeight = document.querySelector('header').clientHeight;
  const idName = event.target.getAttribute('href').substring(1);
  let targetDiv = document.querySelector(`#${idName}`);
  window.scroll({
    top: targetDiv.offsetTop - headerHeight,
    behavior: 'smooth',
  });
};
window.onscroll = function () {
  const scroll = parseInt(this.scrollY);
};

let atags = document.querySelectorAll('a[href]');
for (let atag of atags) {
  let href = atag.getAttribute('href');
  if (href.includes('#')) {
    atag.addEventListener('click', function (e) {
      eleScroll(e);
    });
  }
}
const pageScroll = function () {};
