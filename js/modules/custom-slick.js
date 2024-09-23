import $ from 'jquery';
import 'slick-carousel';
// import 'slick-carousel/slick/slick.css';

const customSlick = () => {
  const $cultureMain = $('.culture-main');
  function cultureinitSlider() {
    $cultureMain.each(function () {
      const $cultureSlider = $(this);
      const postAppend = $(this).parent().children('.culture-main-appends');
      if (window.matchMedia('(max-width: 767px)').matches) {
        if (!$cultureSlider.hasClass('slick-initialized')) {
          $cultureSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow:
              '<div class="slick-arrow aria-disabled="false" tabindex="0" role="button" slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
            nextArrow:
              '<div class="slick-arrow aria-disabled="false" tabindex="0" role="button" slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
            dots: false,
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
              '<div class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-right"></span></div>',
            nextArrow:
              '<div class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-solid fa-chevron-right"></span></div>',
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

  window.onresize = function () {
    culturedestroySlider();
    cultureinitSlider();

    benefitdestroySlider();
    benefitinitSlider();
  };
};
export default customSlick;
