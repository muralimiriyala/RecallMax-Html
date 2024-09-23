import $ from 'jquery';
import 'slick-carousel';

const customSlick = () => {
  const $ele = $('.culture-main');
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
      }
    }
  });
};
export default customSlick;
