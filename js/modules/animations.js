import imagesLoaded from 'imagesloaded';
import 'is-in-viewport';
import 'jquery.appear';
import progress from './progress';

imagesLoaded.makeJQueryPlugin($);
const $body = $('body');

const Animations = {
  init() {
    const _ = this;
    const dy = -$(window).height() / 4;

    $('[data-animation]:not(img), [data-animate]').each(function () {
      const $self = $(this);
      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const timeline = $self[0].tl;
  
      if ($self.is(':in-viewport')) {
        setTimeout(() => {
          if (animateType) {
            console.log("hhhhaha")
            _.animateRun($self, animateType);
          } else {
            $self.addClass('visible ' + animation);
         
            if(progress) progress.play();
      
            if (timeline) {
              timeline.play();
            }
          }
        }, delay);
      }
    });
    $body.imagesLoaded().progress(function (instance, image) {
      var $img = $(image.img);
      if ($img.data('animation')) {
        $img.appear(
          function () {
            var delay = $img.data('animation-delay');
            setTimeout(function () {
              $img.addClass($img.data('animation')).addClass('visible');
            }, delay);
          },
          { accY: dy }
        );
      }
    });
  },
  animateRun($el, type) {
    $el.addClass('visible');
    if(progress) progress.play();

    if (type === 'counter') {
      const $counter = $el[0];
      if ($counter.counter && $counter.counter.paused) $counter.counter.start();
    }
  },
  animateReset($el, type) {
    $el.removeClass('visible');
    if(progress) progress.reset();

    if (type === 'counter') {
      const $counter = $el[0];
      $counter.counter.reset();
    }
  },
  handle(scrolled, direction) {
    const _ = this;

    $('[data-animation]:not(img), [data-animate]').each(function () {
      const $self = $(this);
      const selfOffset = $self.offset().top;
      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const offset = $(window).height() * 0.95;
      if (
        direction === 'DOWN' &&
        scrolled >= selfOffset - offset &&
        !$self.hasClass('visible')
      ) {
        setTimeout(() => {
          if (animateType) _.animateRun($self, animateType);
          else $self.addClass('visible ' + animation);
        }, delay);
      } else if (
        direction === 'UP' &&
        $self.is(`:in-viewport(${-offset})`) &&
        !$self.hasClass('visible')
      ) {
        setTimeout(() => {
          if (animateType) {
            _.animateRun($self, animateType);
          }
          else {
            $self.addClass('visible ' + animation);
            if(progress) progress.reset();
          }
        }, delay);
      } else if (
        direction === 'UP' &&
        !$self.is(':in-viewport') &&
        $self.offset().top > scrolled &&
        $self.hasClass('visible')
      ) {
        if (animateType) {
          _.animateReset($self, animateType);
        }
        else {
          $self.removeClass('visible ' + animation);
          if(progress) progress.reset();
        }
      }
    });
  },
};
export default Animations;
