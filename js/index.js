'use strict';

import animation from './modules/animation';
import stickyHeader from './modules/sticky';
import scrollModule from './modules/scroll';
import customSlick from './modules/custom-slick';
import selectBox from './modules/select';

document.addEventListener('DOMContentLoaded', function () {
  animation.init();
  stickyHeader.init();
  scrollModule();
  customSlick();
  selectBox.init();
});
