'use strict';

import selectBox from './lib/jquery.selectBox';
import Animations from './modules/animations';
import Scroll from './modules/scroll';
import Menu from './modules/menu';
// import scrollModule from './modules/pageScroll';
import customSlick from './modules/customSlick';
import filterCategory from './modules/filterCategory';
import uiAccordion from './modules/accordion';
import teamPage from './modules/team';
import searchFeild from './modules/search';
import tabFilter from './modules/tabs-filter';

document.addEventListener('DOMContentLoaded', function () {
  Animations.init();
  Menu.init();
  // scrollModule.init();
  customSlick.init();
  selectBox.init();
  filterCategory.init();
  uiAccordion.init();
  teamPage.init();
  searchFeild.init();
  tabFilter.init();
});

let scrolled = window.scrollY;
window.addEventListener('scroll', function () {
  scrolled = window.scrollY;
  Scroll.handle(scrolled);
  Animations.handle(scrolled, Scroll.direction);
});
