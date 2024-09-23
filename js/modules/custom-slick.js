import $ from 'jquery';
import 'slick-carousel';
// import 'slick-carousel/slick/slick.css';

const customSlick = () => {
  const $ele = $('.culture-main');
  function cultureMainSlider() {
    $ele.each(function () {
      const $cultureSlider = $(this);
      const postAppend = $(this).parent().children('.culture-main-appends');
      if (window.matchMedia('(max-width: 767px)').matches) {
        if (!$cultureSlider.hasClass('slick-initialized')) {
          $cultureSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow:
            '<div class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></div>',
          nextArrow:
            '<div class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></div>',
            dots: true,
            speed: 1000,
            infinite: false,
            autoplay: false,
            variableWidth: true,
            appendArrows: postAppend,
            appendDots: postAppend,
          });
        }
      }
    });
  }
  cultureMainSlider();
  function destroyCultureSlider() {
    $ele.each(function () {
      const $this = $(this);
      $(window).width() >= 768 && $this.hasClass('slick-initialized')
        ? $this.slick('unslick')
        : '';
    });
  }
  window.onresize = function () {
    destroyCultureSlider();
    cultureMainSlider();
  };


  function benefitlistsSlider() {
    const singleAppend = $(".benefit-lists-appends");
    if (window.matchMedia('(max-width: 767px)').matches) {
      if (!$(".benefit-lists").hasClass("slick-initialized")) {
        $(".benefit-lists").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow:
            '<div class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></div>',
          nextArrow:
            '<div class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></div>',
          dots: true,
          speed: 1500,
          infinite: true,
          autoplay: false,
          appendArrows: singleAppend,
          appendDots: singleAppend,
          responsive: [
            {
              breakpoint: 743,
              settings: {
                dots: true,
              },
            },
          ],
        });
      } 
  }else {
      if ($(".benefit-lists").hasClass("slick-initialized")) {
        $(".benefit-lists").slick("unslick");
      }
    }
  }
  benefitlistsSlider();

  
};
export default customSlick;
