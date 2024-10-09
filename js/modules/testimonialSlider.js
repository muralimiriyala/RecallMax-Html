import $ from 'jquery';

const testimonialSlider = {
    $e: document.querySelectorAll('.testimonial-item'),
    $m: document.querySelectorAll('.testimonial-mobile'),
    init() {
        const $t = this;
        const media = window.matchMedia('(min-width: 1280px)');
  
        const slides = Array.from($t.$e);

        const mslides = Array.from($t.$m);
        mslides.length > 0 ? mslides.at(0).classList.add('open') : '';

        const userWidth = 168;
        const currentWidth = 620;

        const slider = function (e) {
            e.preventDefault();
            const target = e.currentTarget;

            slides.length > 0 ? slides.at(0).classList.add('open') : '';
    
            // Reset all slides
            slides.length > 0 && slides.forEach((slide) => {
                slide.classList.remove('open');
                slide.style.flex = `1`;
            });

            // Activate the clicked slide
            target.classList.add('open');
            target.style.flex = `0 0 ${currentWidth}px`;
        };

        const mobileSlider = function (e) {
            if(!e){
                return false;
            }
            e.preventDefault();

            const slides = Array.from($t.$e);
            slides.length > 0 ? slides.at(0).classList.add('open') : '';

            
            slides.forEach((slide) => {
                slide.classList.remove('open');
                slide.removeAttribute('style')
            });


            if(e.currentTarget){
                e.currentTarget.classList.add('open')
            }
            
            mslides.forEach((slide)=> {
                $(slide).hide();
            });

            const attr = e.currentTarget.getAttribute('data-slide');
            const txt = document.querySelector('.testimonial-mobile[data-text="'+ attr +'"]');
      
            const $txt = $(txt)
            $(txt).fadeIn('800');

            

        };

        const setupEventListeners = (isDesktop) => {
            slides.forEach((ele) => {
                if (isDesktop) {
                    ele.removeEventListener('click', mobileSlider);
                    ele.addEventListener('click', slider);
                } else {
                    ele.removeEventListener('click', slider);
                    ele.addEventListener('click', mobileSlider);
                    mobileSlider();
                }
            });
               // If switching to mobile, add resize event listener
               if (!isDesktop) {
                window.addEventListener('resize', mobileSlider);
            } else {
                // Remove resize event listener if switching to desktop
                window.removeEventListener('resize', mobileSlider);
            }
        };

        // Initial setup
        setupEventListeners(media.matches);

        // Listen for media query changes
        media.addEventListener('change', (e) => {
            setupEventListeners(e.matches);
        });
    }
};

export default testimonialSlider;
