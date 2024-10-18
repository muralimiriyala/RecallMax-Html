import $ from 'jquery';
import 'slick-carousel';
// import 'slick-carousel/slick/slick.css';

const exploreSlick = {
  init() {
    const $exploreMain = $('.explore-main');
    function exploreSlider() {
      $exploreMain.each(function () {
        const $this = $(this);
        const exploreSlide = $this.children().length;
        const $explorAppend = $('.explore-appends');
        if (window.matchMedia('(max-width: 1439px)').matches) {
          if (!$this.hasClass('slick-initialized')) {
            $this.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              prevArrow:'<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
              nextArrow: '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
              dots: true,
              speed: 1000,
              infinite: false,
              autoplay: false,
              variableWidth: true,
              appendArrows: $explorAppend,
              appendDots: $explorAppend,
            });
          }
        }
       else {
        if (exploreSlide >= 5 && !$this.hasClass('slick-initialized')) {
          $this.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow:'<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
            nextArrow: '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
            dots: true,
            speed: 1000,
            infinite: false,
            autoplay: false,
            variableWidth: true,
            appendArrows: $explorAppend,
            appendDots: $explorAppend,
          });
        }
      }

      });
    }
    exploreSlider();

    window.onresize = function () {
      exploreSlider();
    };
  },
};
export default exploreSlick;



  
  
  
  
  
  
  
  
  
  
  