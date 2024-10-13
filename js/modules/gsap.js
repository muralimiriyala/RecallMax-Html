import { gsap } from 'gsap';
var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin;
var CountUp = CountUp || window.CountUp;

gsap.registerPlugin(DrawSVGPlugin);

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

const customGsap = {
  $drawing: document.querySelectorAll('.ui-tick'),
  init() {
    const _ = this;
    _.$drawing.forEach(function (ele) {
      const $self = ele;
      const $path = $self.querySelectorAll('path');
      const $tickpath = $path[1];
      const $finalpath = $path[2];
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        $path,
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 1.5, ease: 'power1.out',
          // onStart: function() {
          //   gsap.to($tickpath, { opacity: 1, duration: 0.5 });
          //   gsap.to($finalpath, { opacity: 0, duration: 0.5 });
          // },
          onComplete: function() {
            gsap.to($tickpath, { opacity: 0, duration: 0.5 });
            gsap.to($finalpath, { opacity: 1, duration: 0.5 });
          },
        }
      );
      $self.tl = tl;
    });
  },
};
export default customGsap;
