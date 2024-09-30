const tabFilter = {
  $ele: document.querySelector('.tab-links-d'),
  init: function () {
    let _ = this;
    let tabFun = function (e) {
      e.preventDefault();
      this.classList.toggle('open');
    };
    _.$ele.addEventListener('click', tabFun);
  },
};
export default tabFilter;
