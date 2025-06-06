const adsensebar = {
  $ele: document.querySelector('.header_bar_main'),
  $close: document.querySelector('.adsense_close'),
  $site: document.querySelector('.site-main-cover'),
  init() {
    const _ = this;

    if (!_.$ele) return false;
    // _.$ele.style.maxHeight = `${_.$ele.scrollHeight}px`;

    _.$ele.style.transition = 'all 0.6s linear';
    _.$close.addEventListener('click', function (e) {
      e.preventDefault();
      if (_.$ele.dataset.id !== 'true') {
        _.$ele.style.maxHeight = '0px';
        _.$ele.style.minHeight = '0px';
        _.$ele.style.overflow = 'hidden';
        _.$site.classList.remove('top-stickybar');
        _.$ele.dataset.id = 'true';
      } else {
        _.$ele.dataset.id = 'false';
      }
    });
  },
};
export default adsensebar;
