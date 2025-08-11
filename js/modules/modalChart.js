'use strict';
import $ from 'jquery';
const modalChart = {
  $bodyChart: document.querySelector('body'),
  $centerChart: document.querySelector('.modal-main-chart .modal-center'),
  $eleChart: [
    ...document.querySelectorAll('.modal-chart-btn'),
    ...document.querySelectorAll('a[href="#chatai-modal-btn"]'),
  ],
  $windowChart: document.querySelector('.modal-window-chart'),
  $mainChart: document.querySelector('.modal-main-chart'),
  $closeChart: document.querySelector('.modal-main-chart .modal-close'),
  init() {
    const _ = this;
    let modalChart = (e) => {
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
      btnChart.addEventListener('click', modalChart);
    });

    // Open the modal if URL contains '#modal'
    if (
      window.location.href.includes('#chatai-modal-btn') &&
      !window.location.href.includes('#modal')
    ) {
      const eleChart = _.$eleChart[0];
      if (eleChart) eleChart.click();
    }

    if (!_.$closeChart) return false;
    _.$closeChart.addEventListener('click', modalChart);
    let modalChartClose = function (e) {
      if (e.target.contains(_.$centerChart)) {
        $(_.$windowChart).fadeOut(800);
        $(_.$mainChart).fadeOut(800);
      }
    };
    _.$bodyChart.addEventListener('click', modalChartClose);
  },
};
export default modalChart;
