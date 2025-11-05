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
      const formId = e.currentTarget.dataset.formId;
      if (!formId) return;
      const $window = $(`.modal-window-form[data-id="${formId}"]`);
      const $main = $(`.modal-main-form[id="${formId}"]`);

      if ($window.length && $main.length) {
        $window.fadeToggle(900);
        $main.fadeToggle(800);
      }
      /*-- Nov 4th 25 starts here --*/
      const tabformId =
        e.currentTarget.closest('.pricing-boxes-row')?.dataset.price;
      const $container1 = $('#monthly_pricing_plans');
      const $container2 = $('#one-year_commitment_plans');
      const $container3 = $('#two-year_commitment_plans');
      if (tabformId === 'monthly' && $container1.length > 0) {
        $container1
          .find(`.modal-window-form[data-book-id="${formId}"]`)
          .fadeToggle(900);
        $container1
          .find(`.modal-main-form[data-book-id="${formId}"]`)
          .fadeToggle(900);
      } else if (tabformId === '1-Year' && $container2.length > 0) {
        $container2
          .find(`.modal-window-form[data-book-id="${formId}"]`)
          .fadeToggle(900);
        $container2
          .find(`.modal-main-form[data-book-id="${formId}"]`)
          .fadeToggle(900);
      } else if (tabformId === '2-Years' && $container3.length > 0) {
        $container3
          .find(`.modal-window-form[data-book-id="${formId}"]`)
          .fadeToggle(900);
        $container3
          .find(`.modal-main-form[data-book-id="${formId}"]`)
          .fadeToggle(900);
      }
      const $contract_container1 = $('#contract_monthly_pricing_plans');
      const $contract_container2 = $('#contract_one-year_commitment_plans');
      const $contract_container3 = $('#contract_two-year_commitment_plans');
      const newFormId = formId.slice(-4);
      console.log(newFormId, 'murali');
      if (tabformId === 'monthly' && $contract_container1.length > 0) {
        $contract_container1
          .find(`.modal-window-form[data-contract-id="${newFormId}"]`)
          .fadeToggle(900);
        $contract_container1
          .find(`.modal-main-form[data-contract-id="${newFormId}"]`)
          .fadeToggle(900);
      } else if (tabformId === '1-Year' && $contract_container2.length > 0) {
        $contract_container2
          .find(`.modal-window-form[data-contract-id="${newFormId}"]`)
          .fadeToggle(900);
        $contract_container2
          .find(`.modal-main-form[data-contract-id="${newFormId}"]`)
          .fadeToggle(900);
      } else if (tabformId === '2-Years' && $contract_container3.length > 0) {
        $contract_container3
          .find(`.modal-window-form[data-contract-id="${newFormId}"]`)
          .fadeToggle(900);
        $contract_container3
          .find(`.modal-main-form[data-contract-id="${newFormId}"]`)
          .fadeToggle(900);
      }
      /*-- Nov 4th 25 ends here --*/
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
          $(`.modal-window-form[data-id="${formId}"]`).fadeOut(800);
          $(`.modal-main-form[id="${formId}"]`).fadeOut(800);
        }
        const bookCloseFormId =
          closeBtn.closest('.modal-main-form')?.dataset.bookId;
        if (bookCloseFormId) {
          $(`.modal-window-form[data-book-id="${bookCloseFormId}"]`).fadeOut(
            800
          );
          $(`.modal-main-form[data-book-id="${bookCloseFormId}"]`).fadeOut(800);
        }
        const contractCloseFormId =
          closeBtn.closest('.modal-main-form')?.dataset.contractId;
        if (contractCloseFormId) {
          $(
            `.modal-window-form[data-contract-id="${contractCloseFormId}"]`
          ).fadeOut(800);
          $(
            `.modal-main-form[data-contract-id="${contractCloseFormId}"]`
          ).fadeOut(800);
        }
      }
      // click outside center closes too
      if (e.target.classList.contains('modal-window-form')) {
        const formId = e.target.id;
        $(`.modal-window-form[data-id="${formId}"]`).fadeOut(800);
        $(`.modal-main-form[id="${formId}"]`).fadeOut(800);
      }
    });
  },
};
export default modalCustomForm;
