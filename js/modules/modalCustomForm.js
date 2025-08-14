'use strict';
import $ from 'jquery';
const modalCustomForm = {
  $bodyForm: document.querySelector('body'),
  $centerCustomForm: document.querySelector('.modal-main-form .modal-center'),
  $eleCustomForm: [
    ...document.querySelectorAll('.modal-custom-btn'),
    ...document.querySelectorAll('a[href="#custom-form"]'),
  ],
  $windowCustomForm: document.querySelector('.modal-window-form'),
  $mainCustomForm: document.querySelector('.modal-main-form'),
  $closeForm: document.querySelector('.modal-main-form .modal-close'),
  init() {
    const _ = this;
    let modalCustomForm = (e) => {
      e.preventDefault();
      e.target.classList.toggle('open');
      if (_.$windowCustomForm) {
        let $overlayChart = $(_.$windowCustomForm);
        $overlayChart.fadeToggle(900);
        let $mainCustomForm = $(_.$mainCustomForm);
        $mainCustomForm.fadeToggle(800);
      }
    };
    _.$eleCustomForm.forEach((btnChart) => {
      btnChart.addEventListener('click', modalCustomForm);
    });

    // Open the modal if URL contains '#modal'
    if (
      window.location.href.includes('#custom-form') &&
      !window.location.href.includes('#modal')
    ) {
      const eleCustomForm = _.$eleCustomForm[0];
      if (eleCustomForm) eleCustomForm.click();
    }

    if (!_.$closeForm) return false;
    _.$closeForm.addEventListener('click', modalCustomForm);
    let modalCustomFormClose = function (e) {
      if (e.target.contains(_.$centerCustomForm)) {
        $(_.$windowCustomForm).fadeOut(800);
        $(_.$mainCustomForm).fadeOut(800);
      }
    };
    _.$bodyForm.addEventListener('click', modalCustomFormClose);
  },
};
export default modalCustomForm;
