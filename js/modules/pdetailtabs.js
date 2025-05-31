import $, { noConflict } from 'jquery';
import 'slick-carousel';

const pdetailtabs = {
  $ele: document.querySelector('ul.pdetail-ui-links'),
  $links: document.querySelectorAll('ul.pdetail-ui-links > li > a'),
  $slide: document.querySelector('.pdetail-ui-tabs'),

  progressIntervals: [],

  init() {
    const _ = this;
    if (!_.$slide || _.$ele || _.$links.length === 0) return;
    const $fortab = $(_.$slide);
    const $duration = Number(_.$slide.getAttribute('data-duration')) || 2000;

    if (!$fortab) return;
    $fortab.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: $duration,
      focusOnSelect: true,
    });

    _.$links[0]?.classList.add('ui-open');
    _.$links.forEach(($link, index) => {
      $link.addEventListener('click', function (e) {
        e.preventDefault();
        const slideno = parseInt(this.getAttribute('data-name').slice(-1));
        $fortab.slick('slickGoTo', slideno);
        _.resetAndAnimateProgressBar($link, $duration, index);
        _.removeActiveClass();
        this.classList.add('ui-open');
      });
    });

    $fortab.on(
      'beforeChange',
      function (event, slick, currentSlide, nextSlide) {
        _.removeActiveClass();
        const activeLink = _.$links[nextSlide];
        activeLink.classList.add('ui-open');
        _.resetAndAnimateProgressBar(activeLink, $duration, nextSlide);
      }
    );

    _.resetAndAnimateProgressBar(_.$links[0], $duration, 0);
  },

  removeActiveClass() {
    this.$links.forEach(($link) => {
      const $progress = $link?.querySelector('.ui-active-state');
      $link?.classList.remove('ui-open');
      $progress.style.transition = 'none';
      $progress.style.width = '0%';
      setTimeout(() => {
        $progress.style.transition = '';
      }, 50);
    });
  },

  resetAndAnimateProgressBar($link, duration, index) {
    const _ = this;
    const $progress = $link?.querySelector('.ui-active-state');
    if (_.progressIntervals[index]) {
      clearInterval(_.progressIntervals[index]);
      _.progressIntervals[index] = null;
    }
    $progress.style.transition = 'none';
    $progress.style.width = '0%';
    setTimeout(() => {
      $progress.style.transition = `width ${duration}ms linear`;
      $progress.style.width = '100%';
    }, 50);
  },
  updateProgressBar($progress, percentage) {
    if ($progress) {
      $progress.style.width = `${percentage}%`;
    }
  },
};

export default pdetailtabs;
