import $ from 'jquery';
import 'slick-carousel';

const customSlick = () => {
  if($(window).innerWidth() <= 767) {
  const postAppend = $('.culture-main-appends');
  // const $ele = document.querySelectorAll('.culture-main');
  // $ele.forEach(($culture) => {
  //   console.log($culture, 'culture slick123');
  //   if ($(window).width() <= 767) {
  //     if (!$culture.classList.contains('slick-initialized')) {
  //       $culture.slick({
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: true,
  //         prevArrow:
  //           '<div class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
  //         nextArrow:
  //           '<div class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
  //         dots: false,
  //         speed: 1000,
  //         infinite: false,
  //         autoplay: false,
  //         variableWidth: true,
  //         appendArrows: postAppend,
  //         appendDots: postAppend,
  //       });
  //     }
  //   }
  // });

  $('.culture-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow:'<div class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-solid fa-chevron-left"></span></div>',
    nextArrow:'<div class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-regular fa-chevron-rightt"></span></div>',
    dots: false,
    speed: 1000,
    infinite: false,
    autoplay: false,
    variableWidth: true,
    appendArrows: postAppend,
    appendDots: postAppend,
  });
  }
};
export default customSlick;
