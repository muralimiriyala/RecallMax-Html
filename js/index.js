'use strict';

import animations from './modules/animations';
import Scroll from './modules/scroll';
import stickyHeader from './modules/sticky';
import scrollModule from './modules/pagescroll';
import customSlick from './modules/custom-slick';
import selectBox from './modules/select';

document.addEventListener('DOMContentLoaded', function () {
  animations.init();
  stickyHeader.init();
  scrollModule();
  customSlick();
  selectBox.init();
});

window.addEventListener('scroll', function () {
  const scrolled = $(window).scrollTop();
  Scroll.handle(scrolled);
  animations.handle(scrolled, Scroll.direction);
});
