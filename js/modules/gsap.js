import { gsap } from 'gsap';
import timelineStore from './timelineStore'; // Import the shared store

var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin;
gsap.registerPlugin(DrawSVGPlugin);

const customGsap = {
  init() {
    var $drawing = jQuery('.ui-drawing');

    $drawing.each(function (index) {
      var $self = jQuery(this);
      var $path = $self.find('path');

      // Ensure the path exists before creating a timeline
      if ($path.length) {
        var tl = gsap.timeline({ paused: true });

        tl.fromTo(
          $path[0],
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 1.5, ease: 'power1.out' }
        );

        const timelineId = 'timeline-' + index; // Create a unique timeline ID
        timelineStore[timelineId] = tl; // Store the timeline in the shared store
        $self.attr('data-timeline-id', timelineId); // Attach the timeline ID to the element
      } else {
        console.warn('No path found for drawing:', $self);
      }
    });
  },
};

export default customGsap;
