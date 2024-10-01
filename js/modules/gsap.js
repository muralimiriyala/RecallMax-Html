import { gsap } from 'gsap';

// Register the plugin
gsap.registerPlugin(DrawSVGPlugin);

const customGsap = {
  $drawing: document.querySelectorAll('.ui-drawing'),
  init() {
    const _ = this;
    _.$drawing.forEach(function (ele) {
      const $self = ele;
      const $path = $self.querySelectorAll('path');
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        $path,
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 1.5, ease: 'power1.out' }
      );
      $self.tl = tl;
    });
  },
};
export default customGsap;
