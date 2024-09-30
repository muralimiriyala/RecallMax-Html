import { gsap } from 'gsap';
import timelineStore from './timelineStore'; // Import the shared store

var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin;
var CountUp = CountUp || window.CountUp;

gsap.registerPlugin(DrawSVGPlugin);

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

const customGsap = {
  init() {
    const timelines = {};
    /// Bar Chart
    var $drawing = jQuery('.ui-drawing');

    $drawing.each(function (index) {
      var $self = jQuery(this);
      var $path = $self.find('path');
      if ($path) {
        var tl = gsap.timeline({
          paused: true,
        });

        tl.fromTo(
          $path[0],
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 1.5, ease: 'power1.out' }
        );

        $self[0].tl = tl;
        const timelineId = 'timeline-'.concat(index); // Use index here
        timelineStore[timelineId] = tl; // Store the timeline in the shared store
        $self.attr('data-timeline-id', timelineId); // Store the ID in the element
      }
    });
  },
};
export default customGsap;
