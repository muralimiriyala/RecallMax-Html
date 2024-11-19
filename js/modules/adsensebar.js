const adsensebar = {
  $ele: document.querySelector('.header_bar'),
  $close: document.querySelector('.header_bar_close'),
  init() {
    const _ = this;
    _.$ele.style.maxHeight = `${_.$ele.scrollHeight}px`;
    _.$ele.style.overflow = 'hidden';
    _.$ele.style.transition = 'all 0.8s linear';
    _.$close.addEventListener('click', function (e) {
      e.preventDefault();
      if (_.$ele.dataset.id !== 'true') {
        _.$ele.style.maxHeight = '0px';
        _.$ele.dataset.id = 'true';
      } else {
        _.$ele.dataset.id = 'false';
      }
    });
  },
};
export default adsensebar;
