const testimonialSlider = {
    $e: document.querySelectorAll('.testimonial-item'),
    init(){
        const $t = this;
        const slider = function(e){
           e.preventDefault();
            // console.log($t.$e)
        }
        $t.$e.forEach((ele)=>{
            ele.addEventListener('click', slider)
        })
    }
}
export default testimonialSlider;