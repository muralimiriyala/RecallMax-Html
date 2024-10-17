import { cssNumber } from "jquery";

const tabFilter = {
  $ele: document.querySelectorAll('.tab-links-d'),
  $tabs: document.querySelectorAll(`.tab-links-main`),
  init: function () {
    let _ = this;
    let tabFun = function (e) {
      e.preventDefault();
      let $target = e.target;
      _.$ele.forEach((ele)=>{
        if(ele !== $target){
          ele.classList.remove('open')
        }
      })
      if($target.tagName==="SPAN") $target = e.target.parentElement;
      if($target.tagName==="svg") $target = e.target.parentElement.parentElement;
    
      const tabName = $target.getAttribute("data-name");
      const $tabele = document.querySelector(`.tab-links-main[data-value=${tabName}]`);
      if ($tabele.length < 0) return;
      _.$tabs.forEach((tab)=>{
        if(tab !== $tabele){
          $target.classList.remove('open');
          tab.style.maxHeight = '';
          tab.dataset.id = 'false';
        }
      })
      if ($tabele && $tabele.dataset.id !== 'true') {
        $target.classList.toggle('open');
        $tabele.style.maxHeight = `${$tabele.scrollHeight}px`;
        $tabele.dataset.id = 'true';
      } else {
        $target.classList.remove('open');
        $tabele.style.maxHeight = '';
        $tabele.dataset.id = 'false';
      }
    };
    if (!_.$ele.length < 0) return;
    _.$ele.forEach(($ele)=>{
      $ele.addEventListener('click', tabFun);
    })
  },
};
export default tabFilter;