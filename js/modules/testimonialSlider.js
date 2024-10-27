import $ from 'jquery';

const testimonialSlider = {
    $ele: document.querySelectorAll('.testimonial-list'),
    $mele: document.querySelectorAll('.testimonial-mobile'),
    init() {
        const _ = this;

        const slides = Array.from(_.$ele);
        const mslides = Array.from(_.$mele);
        slides.length > 0 ? slides.at(0).classList.add('slide-open') : '';
        mslides.length > 0 ? mslides.at(0).classList.add('slide-open') : '';

        const slider = function (e) {
            e.preventDefault();
            const target = e.currentTarget;

            slides.length > 0 ? slides.at(0).classList.add('slide-open') : '';
    
            // Reset all slides
            slides.length > 0 && slides.forEach((slide) => {
                slide.classList.remove('slide-open');
            });

            // Activate the clicked slide
            target.classList.add('slide-open');
            
            mslides.length > 0 && mslides.forEach((slide) => {
                slide.classList.remove('slide-open');
                $(slide).hide();
            });
            const attr = target.getAttribute('data-slide');
            const txt = document.querySelector('.testimonial-mobile[data-text="'+ attr +'"]');
            txt.classList.add('slide-open')
            $(txt).fadeIn('800');
       
        };
        _.$ele.forEach((ele)=>{
            ele.addEventListener('click', slider)
        })

    }
};

export default testimonialSlider;
