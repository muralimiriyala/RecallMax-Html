'use strict';
import $ from 'jquery';
const modalBookai = {
  $bodyChart: document.querySelector('body'),
  $centerChart: document.querySelector('.modal-main-bookai .modal-center'),
  $eleChart: [
    ...document.querySelectorAll('.modal-chart-btn'),
    ...document.querySelectorAll('a[href="#book-a-chartai"]'),
  ],
  $windowChart: document.querySelector('.modal-window-bookai'),
  $mainChart: document.querySelector('.modal-main-bookai'),
  $closeChart: document.querySelector('.modal-main-bookai .modal-close'),
  init() {
    const _ = this;

    let modalBookai = (e) => {
      e.preventDefault();
      e.target.classList.toggle('open');
      if (_.$windowChart) {
        let $overlayChart = $(_.$windowChart);
        $overlayChart.fadeToggle(900);
        let $mainChart = $(_.$mainChart);
        $mainChart.fadeToggle(800);
      }
    };
    _.$eleChart.forEach((btnChart) => {
      btnChart.addEventListener('click', modalBookai);
    });

    // Open the modal if URL contains '#modal'
    if (
      window.location.href.includes('#book-a-chartai') &&
      !window.location.href.includes('#modal') &&
      !window.location.href.includes('#chatai-modal-btn')
    ) {
      const eleChart = _.$eleChart[0];
      if (eleChart) eleChart.click();
    }

    if (!_.$closeChart) return false;
    _.$closeChart.addEventListener('click', modalBookai);
    let modalBookaiClose = function (e) {
      if (e.target.contains(_.$centerChart)) {
        $(_.$windowChart).fadeOut(800);
        $(_.$mainChart).fadeOut(800);
      }
    };
    _.$bodyChart.addEventListener('click', modalBookaiClose);
  },
};
export default modalBookai;
