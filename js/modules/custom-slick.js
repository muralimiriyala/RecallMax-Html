import $ from 'jquery';
import 'slick-carousel';

const customSlick = () => {
  const $ele = $('.culture-main');
<<<<<<< HEAD
  $ele.each(function () {
    const $cultureSlider = $(this);
    const postAppend = $(this).parent().children('.culture-main-appends');
    if ($(window).width() <= 767) {
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

  const $eles = $('.benefit-lists');
  $eles.each(function () {
    const $cultureSlider = $(this);
    const postAppend = $(this).parent().children('.benefit-lists-appends');
    if ($(window).width() <= 767) {
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
=======
  function initializeSlider() {
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
>>>>>>> 0fe50595c657736e17efd32cf00ed6f617892bd1
      }
    });
  }
  initializeSlider();
  function destroySlider() {
    $ele.each(function () {
      const $this = $(this);
      $(window).width() >= 768 && $this.hasClass('slick-initialized')
        ? $this.slick('unslick')
        : '';
    });
  }
  window.onresize = function () {
    destroySlider();
    initializeSlider();
  };
};
export default customSlick;
