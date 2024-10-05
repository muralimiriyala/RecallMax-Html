const testimonialSlider = {
    $e: document.querySelectorAll('.testimonial-item'),
    init(){
        const $t = this;
        const slides = Array.from($t.$e);
        slides.at(0).classList.add('open')
        const slider = function(e){
           e.preventDefault();
            
        }
        $t.$e.forEach((ele)=>{
            ele.addEventListener('click', slider)
        })
    }
}
export default testimonialSlider;