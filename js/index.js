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

let scrolled = window.scrollY;
window.addEventListener('scroll', function () {
  scrolled = window.scrollY;
  Scroll.handle(scrolled);
  animations.handle(scrolled, Scroll.direction);
});
