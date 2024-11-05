export const numberInput = function() {
  (function quantityProducts() {
      const quantityNum = document.querySelectorAll(".quantity-num");

      const quantityMinus = (e, $ele) => {
          e.preventDefault();
          let currentValue = parseInt($ele.value, 10) || 0;
          if (currentValue > 1) {
              $ele.value = currentValue - 1;
          }
      };

      const quantityPlus = (e, $ele) => {
          e.preventDefault();
          let currentValue = parseInt($ele.value, 10) || 0;
          $ele.value = currentValue + 1;
      };

      quantityNum.forEach(function($ele){
        if($ele.closest('.quantity-block')){
          const quantityArrowMinus = $ele.closest('.quantity-block').querySelector(".quantity-arrow-minus");
          const quantityArrowPlus = $ele.closest('.quantity-block').querySelector(".quantity-arrow-plus");
          quantityArrowMinus.addEventListener("click", (e) => quantityMinus(e, $ele));
          quantityArrowPlus.addEventListener("click", (e) => quantityPlus(e, $ele));
        }
      })
  })();
};
