'use strict';

import selectBox from './lib/jquery.selectBox';
import Animations from './modules/animations';
import Scroll from './modules/scroll';
import Menu from './modules/menu';
import scrollModule from './modules/pageScroll';
import customSlick from './modules/customSlick';
import filterCategory from './modules/filterCategory';
import filterCategory from './modules/accordions';

document.addEventListener('DOMContentLoaded', function () {
  Animations.init();
  Menu.init();
  scrollModule.init();
  customSlick.init();
  selectBox.init();
  filterCategory.init();
  accordions.init();
});

let scrolled = window.scrollY;
window.addEventListener('scroll', function () {
  scrolled = window.scrollY;
  Scroll.handle(scrolled);
  Animations.handle(scrolled, Scroll.direction);
});
