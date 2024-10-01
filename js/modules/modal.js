'use strict';
const modal = {
  $ele: document.querySelectorAll('.modal-btn'),
  $window: document.querySelector('.modal-window'),
  $main: document.querySelector('.modal-main'),
  $close: document.querySelector('.modal-close'),
  init() {
    const _ = this;
    let modal = (e) => {
      e.preventDefault();
      e.target.classList.toggle('open');
      let $overlay = $(_.$window);
      $overlay.fadeToggle(900);
      let $main = $(_.$main);
      $main.fadeToggle(800);
    };
    _.$ele.forEach((btn) => {
      btn.addEventListener('click', modal);
    });
    _.$close.addEventListener('click', modal);
  },
};
export default modal;
