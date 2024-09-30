const tabFilter = {
  $ele: document.querySelector('.tab-links-d'),
  $tablinks: document.querySelector('.tab-links-main'),
  init: function () {
    let _ = this;
    let tabFun = function (e) {
      e.preventDefault();
      this.classList.toggle('open');
      const $tabele = _.$tablinks;
      if ($tabele.dataset.id !== 'true') {
        $tabele.style.maxHeight = `${$tabele.scrollHeight}px`;
        $tabele.dataset.id = 'true';
      } else {
        $tabele.style.maxHeight = '';
        $tabele.dataset.id = 'false';
      }
    };
    if (!_.$ele) return;
    _.$ele.addEventListener('click', tabFun);
  },
};
export default tabFilter;
