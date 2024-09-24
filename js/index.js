'use strict';

import Animations from './modules/animations';
import Scroll from './modules/scroll';
import stickyHeader from './modules/stickyHeader';
import scrollModule from './modules/pageScroll';
import customSlick from './modules/customSlick';
import selectBox from './modules/selectbox';

document.addEventListener('DOMContentLoaded', function () {
  Animations.init();
  stickyHeader.init();
  scrollModule.init();
  customSlick.init();
  selectBox.init();
});

let scrolled = window.scrollY;
window.addEventListener('scroll', function () {
  scrolled = window.scrollY;
  Scroll.handle(scrolled);
  Animations.handle(scrolled, Scroll.direction);
});
