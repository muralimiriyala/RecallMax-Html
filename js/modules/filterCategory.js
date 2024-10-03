const filterCategory = {
  $eles: document.querySelectorAll('ul.filter-category li a'),
  $filterData: document.querySelectorAll('.filter-doc-row'),
  $ftrbtn: document.querySelector('.filter-doc-btn'),
  $ftrlinks: document.querySelector('.filter-category-links'),
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
    let ftrMobile = (e) => {
      e.preventDefault();
      e.target.classList.toggle('open');
      const ele = _.$ftrlinks;
      if (ele.dataset.id !== 'true') {
        ele.style.maxHeight = `${ele.scrollHeight}px`;
        ele.dataset.id = 'true';
      } else {
        ele.style.maxHeight = `0px`;
        ele.dataset.id = 'false';
      }
    };
    let media = window.matchMedia('(max-width: 767px)');
    let ftrResize = (e) => {
      e.preventDefault();
      let ulfilter = e.target.parentElement.parentElement.parentElement;
      if (e.target && media.matches) {
        let text = e.target.textContent;
        _.$ftrbtn.querySelector('span').textContent = text;
        ulfilter.style.maxHeight = `0px`;
        ulfilter.dataset.id = 'false';
      } else {
        ulfilter.removeAttribute('style');
      }
    };
    _.$eles.forEach(($ele) => {
      $ele.addEventListener('click', ftrResize);
      $ele.addEventListener('change', ftrResize);
    });
    if(_.$ftrbtn){
      _.$ftrbtn.addEventListener('click', ftrMobile);
    }
  },
};
export default filterCategory;
