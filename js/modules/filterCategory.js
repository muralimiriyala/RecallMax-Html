const filterCategory = {
  $eles: document.querySelectorAll('ul.filter-category li a'),
  $filterData: document.querySelectorAll('.filter-doc-row'),
  init() {
    const _ = this;
    if (_.$eles.length > 0) {
      _.$eles[0].parentElement.classList.add('tab-open');
      _.$filterData[0].style.display = 'block';
    }

    _.$eles.forEach(($ele) => {
      $ele.addEventListener('click', function (e) {
        e.preventDefault();
        _.$eles.forEach(($ele) => {
          $ele.parentElement.classList.remove('tab-open');
        });
        const $this = this;
        $this.parentElement.classList.add('tab-open');
        const $attrName = $this.getAttribute('data-name');
        _.$filterData.forEach(($data) => {
          $($data).hide();
        });
        const $target = document.querySelector(
          `.filter-doc-row[data-value="${$attrName}"]`
        );
        $($target).fadeIn(600);
      });
    });
  },
};
export default filterCategory;
