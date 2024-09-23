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
            '<div class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
          nextArrow:
            '<div class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
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
};
export default customSlick;
