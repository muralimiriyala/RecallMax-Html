const customSlick = () => {
  const $ele = document.querySelectorAll('.culture-main');
  $ele.forEach(($culture) => {
    console.log($culture, 'culture');
    if (!$culture.classList.contains('slick-initialized')) {
      $culture.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow:
          '<div class="slick-arrow slick-prev flex flex-center radius-50"><span class="slick-arrows slick-prev-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
        nextArrow:
          '<div class="slick-arrow slick-next flex flex-center radius-50"><span class="slick-arrows slick-next-arrow fa-light fa-sharp fa-arrow-right"></span></div>',
        dots: true,
        speed: 1000,
        infinite: false,
        autoplay: false,
        variableWidth: true,
      });
    }
  });
};
export default customSlick;
