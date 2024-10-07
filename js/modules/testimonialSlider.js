const testimonialSlider = {
    $e: document.querySelectorAll('.testimonial-item'),
    init(){
        const $t = this;
        const media = window.matchMedia('(min-width: 768px)');
        const slides = Array.from($t.$e);
        slides.at(0).classList.add('open');

        const slider = function(e){
            e.preventDefault();

            const userWidth = 168;
            const currentWidth = 556;
            const target = e.currentTarget;
            slides.forEach((slide)=>{
                slide.classList.remove('open')
                slide.style.flex = `0 0 ${userWidth}px`
            })
            target.classList.add('open');
            target.style.flex =  `0 0 ${currentWidth}px`       
        }
        const mobileSlider = function(e){

        };
  
        if(media.matches){
            
            $t.$e.forEach((ele)=>{
                ele.addEventListener('click', slider)
                ele.addEventListener('change', slider)
                ele.removeEventListener('click', mobileSlider)
                ele.removeEventListener('change', mobileSlider)
            })
        }
        else{
            $t.$e.forEach((ele)=>{
                ele.addEventListener('click', mobileSlider)
                ele.addEventListener('change', mobileSlider)
                ele.addEventListener('click', slider)
                ele.addEventListener('change', slider)
            })
        }
        
    }
}
export default testimonialSlider;