import $ from 'jquery';
import 'slick-carousel';
// import 'slick-carousel/slick/slick.css';

const customSlick = {
  init() {
    const $cultureMain = $('.culture-main');
    function cultureinitSlider() {
      $cultureMain.each(function () {
        const $cultureSlider = $(this);
        const cultureAppend = $(this)
          .parent()
          .children('.culture-main-appends');
        if (window.matchMedia('(max-width: 767px)').matches) {
          if (!$cultureSlider.hasClass('slick-initialized')) {
            $cultureSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              prevArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
              nextArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
              dots: true,
              speed: 1000,
              infinite: false,
              autoplay: false,
              variableWidth: true,
              appendArrows: cultureAppend,
              appendDots: cultureAppend,
            });
          }
        }
      });
    }
    cultureinitSlider();
    function culturedestroySlider() {
      $cultureMain.each(function () {
        const $this = $(this);
        $(window).width() >= 768 && $this.hasClass('slick-initialized')
          ? $this.slick('unslick')
          : '';
      });
    }

    const $benefit = $('.benefit-lists');
    function benefitinitSlider() {
      $benefit.each(function () {
        const $benefitSlider = $(this);
        const benefitsAppend = $(this)
          .parent()
          .children('.benefit-lists-appends');
        if (window.matchMedia('(max-width: 767px)').matches) {
          if (!$benefitSlider.hasClass('slick-initialized')) {
            $benefitSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              prevArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
              nextArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
              dots: true,
              speed: 1000,
              infinite: false,
              autoplay: false,
              variableWidth: true,
              appendArrows: benefitsAppend,
              appendDots: benefitsAppend,
            });
          }
        }
      });
    }
    benefitinitSlider();
    function benefitdestroySlider() {
      $benefit.each(function () {
        const $this = $(this);
        $(window).width() >= 768 && $this.hasClass('slick-initialized')
          ? $this.slick('unslick')
          : '';
      });
    }

    const $features = $('.features-lists');
    function featuresinitSlider() {
      $features.each(function () {
        const $featuresSlider = $(this);
        const featuresAppend = $(this)
          .parent()
          .children('.features-lists-appends');
        if (window.matchMedia('(max-width: 767px)').matches) {
          if (!$featuresSlider.hasClass('slick-initialized')) {
            $featuresSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              prevArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
              nextArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
              dots: true,
              speed: 1000,
              infinite: false,
              autoplay: false,
              variableWidth: true,
              centerMode: true,
              // centerPadding:'80px',
              appendArrows: featuresAppend,
              appendDots: featuresAppend,
            });
          }
        }
      });
    }
    featuresinitSlider();
    function featuresdestroySlider() {
      $benefit.each(function () {
        const $this = $(this);
        $(window).width() >= 768 && $this.hasClass('slick-initialized')
          ? $this.slick('unslick')
          : '';
      });
    }

    window.onresize = function () {
      culturedestroySlider();
      cultureinitSlider();

      benefitdestroySlider();
      benefitinitSlider();

      featuresdestroySlider();
      featuresinitSlider();
    };
  },
};
export default customSlick;
