'use strict';
import $ from 'jquery';
const modal = {
  $body: document.querySelector('body'),
  $center: document.querySelector('.modal-main .modal-center'),
  $ele: [
    ...document.querySelectorAll('.modal-btn'),
    ...document.querySelectorAll('a[href="#modal-btn"]'),
  ],
  $window: document.querySelector('.modal-window'),
  $main: document.querySelector('.modal-main'),
  $close: document.querySelector('.modal-main .modal-close'),
  init() {
    const _ = this;

    let modal = (e) => {
      e.preventDefault();
      e.target.classList.toggle('open');
      if (_.$window) {
        let $overlay = $(_.$window);
        $overlay.fadeToggle(900);
        let $main = $(_.$main);
        $main.fadeToggle(800);
      }
    };
    _.$ele.forEach((btn) => {
      btn.addEventListener('click', modal);
    });

    // Open the modal if URL contains '#modal'
    if (
      window.location.href.includes('#modal') &&
      !window.location.href.includes('#chatai-modal-btn')
    ) {
      const ele = _.$ele[0];
      if (ele) ele.click();
    }

    if (!_.$close) return false;
    _.$close.addEventListener('click', modal);
    let modalClose = function (e) {
      if (e.target.contains(_.$center)) {
        $(_.$window).fadeOut(800);
        $(_.$main).fadeOut(800);
      }
    };
    _.$body.addEventListener('click', modalClose);
  },
};
export default modal;
