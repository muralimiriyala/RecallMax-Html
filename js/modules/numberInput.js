export const numberInput = function() {
  (function quantityProducts() {
      const quantityNum = document.querySelectorAll(".quantity-num");

      const quantityMinus = (e) => {
          e.preventDefault();
          const $input = e.target.parentElement.querySelector('input');
          let currentValue = parseInt($input.value, 10) || 0;
          if (currentValue > 1) {
              $input.value = currentValue - 1;
          }
      };

      const quantityPlus = (e) => {
          e.preventDefault();
          const $input = e.target.parentElement.querySelector('input');
          let currentValue = parseInt($input.value, 10) || 0;
          $input.value = currentValue + 1;
      };

      quantityNum.forEach(function($ele){
        if($ele.closest('.quantity-block')){
          const quantityArrowMinus = $ele.closest('.quantity-block').querySelector(".quantity-arrow-minus");
          const quantityArrowPlus = $ele.closest('.quantity-block').querySelector(".quantity-arrow-plus");
          quantityArrowMinus.addEventListener("click", quantityMinus.bind(this));
          quantityArrowPlus.addEventListener("click", quantityPlus.bind(this));
        }
      })
  })();
};
