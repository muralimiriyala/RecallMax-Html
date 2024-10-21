import $ from 'jquery';
import 'slick-carousel';
const CompareSlick = {
    $ele: document.querySelectorAll(".compare-slider"),
    init(){
        const _ = this;
        _.$ele.forEach(($ele)=>{
           const $slider = $($ele);
           const compareAppend = $slider.closest('.compare-slider-main').children('.compare-appends');
           if(window.matchMedia('(max-width: 767px)').matches){
            $slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
                nextArrow: '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
                dots: true,
                speed: 1000,
                infinite: false,
                autoplay: false,
                appendArrows: compareAppend,
                appendDots: compareAppend,
              });
            }
        })
    }
}
export default CompareSlick;