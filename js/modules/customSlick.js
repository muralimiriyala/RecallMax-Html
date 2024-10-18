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
              dotsClass: 'slick-dots culture-slick-dots',
              customPaging: function (slider, i) {
                var slideNumber = i + 1,
                  totalSlides = slider.slideCount;
                return (
                  '<a class="culture-dot" role="button" title="' +
                  slideNumber +
                  ' of ' +
                  totalSlides +
                  '"><span class="string">' +
                  slideNumber +
                  '<span class="culture-slash">/</span>' +
                  totalSlides +
                  '</span></a>'
                );
              },
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
              dotsClass: 'slick-dots benefit-slick-dots',
              customPaging: function (slider, i) {
                var slideNumber = i + 1,
                  totalSlides = slider.slideCount;
                return (
                  '<a class="benefit-dot" role="button" title="' +
                  slideNumber +
                  ' of ' +
                  totalSlides +
                  '"><span class="string">' +
                  slideNumber +
                  '<span class="benefit-slash">/</span>' +
                  totalSlides +
                  '</span></a>'
                );
              },
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

    const $accreditation = $('.accreditation-row');
    function accreditationinitSlider() {
      $accreditation.each(function () {
        const $accreditationSlider = $(this);
        const accreditationAppend = $(this)
          .parent()
          .children('.accreditation-appends');
        if (window.matchMedia('(max-width: 767px)').matches) {
          if (!$accreditationSlider.hasClass('slick-initialized')) {
            $accreditationSlider.slick({
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
              appendArrows: accreditationAppend,
              appendDots: accreditationAppend,
              adaptiveHeight: true,
              dotsClass: 'slick-dots accreditation-slick-dots',
              customPaging: function (slider, i) {
                var slideNumber = i + 1,
                  totalSlides = slider.slideCount;
                return (
                  '<a class="accreditation-dot" role="button" title="' +
                  slideNumber +
                  ' of ' +
                  totalSlides +
                  '"><span class="string">' +
                  slideNumber +
                  '<span class="accreditation-slash">/</span>' +
                  totalSlides +
                  '</span></a>'
                );
              },
            });
          }
        }
      });
    }
    accreditationinitSlider();
    function accreditationdestroySlider() {
      $accreditation.each(function () {
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
              appendArrows: featuresAppend,
              appendDots: featuresAppend,
              dotsClass: 'slick-dots ftr-slick-dots',
              customPaging: function (slider, i) {
                var slideNumber = i + 1,
                  totalSlides = slider.slideCount;
                return (
                  '<a class="ftr-dot" role="button" title="' +
                  slideNumber +
                  ' of ' +
                  totalSlides +
                  '"><span class="string">' +
                  slideNumber +
                  '<span class="ftr-slash">/</span>' +
                  totalSlides +
                  '</span></a>'
                );
              },
            });
          }
        }
      });
    }
    featuresinitSlider();
    function featuresdestroySlider() {
      $features.each(function () {
        const $this = $(this);
        $(window).width() >= 768 && $this.hasClass('slick-initialized')
          ? $this.slick('unslick')
          : '';
      });
    }

    const $comparison = $('.comparison-rows');
    const comparisonSlider = () =>{
      $comparison.each(function () {
        const $comparisonSlider = $(this);
        if (window.matchMedia('(max-width: 767px)').matches) {
          if (!$comparisonSlider.hasClass('slick-initialized')) {
            $comparisonSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              prevArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></button>',
              nextArrow:
                '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></button>',
              dots: false,
              speed: 1000,
              infinite: false,
              autoplay: false,
            });
          }
        }
      });
    }
    comparisonSlider();

    window.onresize = function () {
      culturedestroySlider();
      cultureinitSlider();

      benefitdestroySlider();
      benefitinitSlider();

      featuresdestroySlider();
      featuresinitSlider();

      accreditationdestroySlider();
      accreditationinitSlider();
      comparisonSlider();

    };
  },
};
export default customSlick;
