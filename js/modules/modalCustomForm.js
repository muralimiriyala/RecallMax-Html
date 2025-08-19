'use strict';
import $ from 'jquery';

const modalCustomForm = {
  $bodyForm: document.querySelector('body'),
  $eleCustomForm: [
    ...document.querySelectorAll('.modal-custom-btn'),
    ...document.querySelectorAll('a[href="#custom-form"]'),
  ],

  init() {
    const _ = this;
    let toggleModal = (e) => {
      e.preventDefault();
      alert('tete');
      const formId = e.currentTarget.dataset.formId;
      console.log(formId, 'formIn');
      if (!formId) return;

      const $window = $(`.modal-window-form[data-id="${formId}"]`);
      const $main = $(`.modal-main-form[id="${formId}"]`);

      if ($window.length && $main.length) {
        $window.fadeToggle(900);
        $main.fadeToggle(800);
      }
    };

    _.$eleCustomForm.forEach((btn) => {
      btn.addEventListener('click', toggleModal);
    });

    // auto open if URL contains #custom-form
    if (window.location.href.includes('#custom-form')) {
      const eleCustomForm = _.$eleCustomForm[0];
      if (eleCustomForm) eleCustomForm.click();
    }

    // delegate close
    _.$bodyForm.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.modal-close');
      if (closeBtn) {
        const formId = closeBtn.closest('.modal-main-form')?.id;
        if (formId) {
          $(`.modal-window-form[id="${formId}"]`).fadeOut(800);
          $(`.modal-main-form[id="${formId}"]`).fadeOut(800);
        }
      }
      // click outside center closes too
      if (e.target.classList.contains('modal-window-form')) {
        const formId = e.target.id;
        $(`.modal-window-form[id="${formId}"]`).fadeOut(800);
        $(`.modal-main-form[id="${formId}"]`).fadeOut(800);
      }
    });
  },
};

export default modalCustomForm;
