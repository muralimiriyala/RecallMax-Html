export const numberInput = function(){
    (function quantityProducts() {
        var $quantityArrowMinus = $(".quantity-arrow-minus");
        var $quantityArrowPlus = $(".quantity-arrow-plus");
        var $quantityNum = $(".quantity-num");
    
        $quantityArrowMinus.on("click", quantityMinus);
        $quantityArrowPlus.on("click", quantityPlus);
    
        function quantityMinus(e) {
          e.preventDefault();
          if ($quantityNum.val() > 1) {
            $quantityNum.val(+$quantityNum.val() - 1);
          }
        }
        
        function quantityPlus(e) {
          e.preventDefault();
          $quantityNum.val(+$quantityNum.val() + 1);
        }
    })();
}