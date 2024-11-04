const filterCategory = {
  $links: document.querySelectorAll('ul.filter-category li a'),
  $eles: document.querySelectorAll('ul.filter-category li:not(:first-child) a'),
  $filterData: document.querySelectorAll('.filter-doc-row'),
  $ftrbtn: document.querySelector('.filter-doc-btn'),
  $ftrlinks: document.querySelectorAll('.filter-category-links'),
  init() {
    const _ = this;
    if (_.$links.length > 0) {
      _.$links[0].parentElement.classList.add('tab-open');
      // _.$filterData[0].style.display = 'block';
    }

    _.$eles.forEach(($ele, $index) => {
      $ele.addEventListener('click', function (e) {
        // e.preventDefault();
        _.$links.forEach(($link) => {
          $link.parentElement.classList.remove('tab-open');
        });
        _.$eles.forEach(($ele) => {
          $ele.parentElement.classList.remove('tab-open');
        });
        const $this = this;
        $this.parentElement.classList.add('tab-open');
        // const $attrName = $this.getAttribute('data-name');
        // _.$filterData.forEach(($data) => {
        //   $($data).hide();
        // });
        // const $target = document.querySelector(
        //   `.filter-doc-row[data-value="${$attrName}"]`
        // );
        // $($target).fadeIn(600);
      });
    });

     

    let media = window.matchMedia('(max-width: 767px)');
    let ftrResize = (e) => {
      // e.preventDefault();
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


    let ftrMobile = function (e) {
      e.preventDefault();
      console.log('Button clicked:', e.target); // Debugging line
    
      e.target.classList.toggle('open');
      const ele = document.querySelector('.filter-category-links');
      console.log('Element toggled:', ele); // Debugging line
    
      if (ele.dataset.open !== 'true') {
        _.$ftrlinks.forEach((item) => {
          if (item !== ele) {
            item.dataset.open = 'false';
            const itemContent = item.querySelector('.filter-category-links');
            if (itemContent) {
              itemContent.style.maxHeight = '';
            }
          }
        });
        // Open the clicked one
        ele.dataset.open = 'true';
        ele.style.maxHeight = `${ele.scrollHeight}px`;
      } else {
        ele.dataset.open = 'false';
        ele.style.maxHeight = `0px`;
      }
    };    
    if(_.$ftrbtn){
      _.$ftrbtn.addEventListener('click', ftrMobile);
    }
  },
};
export default filterCategory;

