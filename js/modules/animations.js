import imagesLoaded from 'imagesloaded';
import 'is-in-viewport';
import 'jquery.appear';
import svgprogress from './progress';

imagesLoaded.makeJQueryPlugin($);
const $body = $('body');

const Animations = {
  init() {
    const _ = this;
    const dy = -$(window).height() / 4;

    // Iterate through all elements with data-animation or data-animate attributes
    $('[data-animation]:not(img), [data-animate]').each(function () {
      const $self = $(this);
      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const timeline = $self[0].tl; // Timeline associated with the element

      // If element is already in the viewport on page load
      if ($self.is(':in-viewport')) {
        setTimeout(() => {
          if (animateType) {
            _.animateRun($self, animateType, timeline);
          } else {
            $self.addClass('visible ' + (animation ? animation : ''));
            if (timeline) {
              timeline.restart().play(); // Restart timeline on load
            }
            // if (svgprogress) svgprogress.reset();
          }
        }, delay);
      } else {
        // Reset timeline if element is not in the viewport
        if (timeline) {
          timeline.progress(0).pause(); // Reset and pause timeline
        }
        // if (svgprogress) svgprogress.reset();
      }
    });

    // Handle animations when images are loaded
    $body.imagesLoaded().progress(function (instance, image) {
      const $img = $(image.img);
      if ($img.data('animation')) {
        $img.appear(
          function () {
            const delay = $img.data('animation-delay');
            setTimeout(function () {
              $img.addClass($img.data('animation')).addClass('visible');
            }, delay);
          },
          { accY: dy }
        );
      }
    });
  },

  // Run animation and timeline when the element is visible
  animateRun($el, type, timeline) {
    $el.addClass('visible');
    if (timeline) {
      timeline.restart().play(); // Restart and play timeline when visible
    }
    if (svgprogress) svgprogress.play();

    if (type === 'counter') {
      const $counter = $el[0];
      if ($counter.counter && $counter.counter.paused) {
        $counter.counter.start();
      }
    }
  },

  // Reset animation and timeline when the element leaves the viewport
  animateReset($el, type, timeline) {
    $el.removeClass('visible');
    if (timeline) {
      timeline.pause(0); // Pause and reset timeline when not visible
    }
    // if (svgprogress) svgprogress.reset();


    // Uncomment if needed for progress or counter elements
    // if (progress) progress.reset();
    // if (type === 'counter') {
    //   const $counter = $el[0];
    //   $counter.counter.reset();
    // }
  },

  // Handle scroll events to trigger animations
  handle(scrolled, direction) {
    const _ = this;

    $('[data-animation]:not(img), [data-animate]').each(function () {
      const $self = $(this);
      const selfOffset = $self.offset().top;
      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const offset = $(window).height() * 0.95; // Adjust threshold to control animation start point
      const timeline = $self[0].tl;

      if (
        direction === 'DOWN' &&
        scrolled >= selfOffset - offset &&
        !$self.hasClass('visible')
      ) {
        // Animate element when scrolling down into viewport
        setTimeout(() => {
          if (animateType) {
            _.animateRun($self, animateType, timeline);
          } else {
            $self.addClass('visible ' + (animation ? animation : ''));
            if (timeline) {
              timeline.restart().play(); // Restart and play timeline when visible
            }
          }
        }, delay);
      } else if (
        direction === 'UP' &&
        $self.is(`:in-viewport(${-offset})`) &&
        !$self.hasClass('visible')
      ) {
        // Animate element when scrolling up into viewport
        setTimeout(() => {
          if (animateType) {
            _.animateRun($self, animateType, timeline);
          } else {
            $self.addClass('visible ' + (animation ? animation : ''));
            if (timeline) {
              timeline.restart().play(); // Restart and play timeline when visible
            }
    // if (svgprogress) svgprogress.play();

          }
        }, delay);
      } else if (
        direction === 'UP' &&
        !$self.is(':in-viewport') &&
        $self.offset().top > scrolled &&
        $self.hasClass('visible')
      ) {
        // Reset animation when element leaves the viewport
        if (animateType) {
          _.animateReset($self, animateType, timeline);
        } else {
          $self.removeClass('visible ' + (animation ? animation : ''));
          if (timeline) {
            timeline.pause(0); // Pause and reset timeline when out of view
          }
    // if (svgprogress) svgprogress.reset();

        }
      }
    });
  },
};

export default Animations;
