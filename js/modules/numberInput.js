export const numberInput = function(){
    (function quantityProducts() {
        const $quantityArrowMinus = $(".quantity-arrow-minus");
        const $quantityArrowPlus = $(".quantity-arrow-plus");
        const $quantityNum = $(".quantity-num");
    
        let quantityMinus = (e) =>{
          e.preventDefault();
          if ($quantityNum.val() > 1) {
            $quantityNum.val(+$quantityNum.val() - 1);
          }
        }
        
        let quantityPlus = (e) =>{
          e.preventDefault();
          $quantityNum.val(+$quantityNum.val() + 1);
        }

        $quantityArrowMinus.on("click", quantityMinus);
        $quantityArrowPlus.on("click", quantityPlus);
  
    })();
}