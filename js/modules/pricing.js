import $ from 'jquery';
class Pricing {
  constructor(selector) {
    this.eles = document.querySelectorAll(selector);
  }
  init() {
    if (this.eles.length === 0) return;
    this.eles.forEach((ele) => {
      ele.addEventListener('click', (e) => {
        e.preventDefault();
        this.eles.forEach((ele) => {
          ele.classList.remove('open');
          const checkbox = ele
            .querySelector('input[type="checkbox"]')
            .removeAttribute('checked');
          if (checkbox) {
            checkbox.removeAttribute('checked');
          }
        });
        const currentLabel = e.currentTarget;
        currentLabel.classList.toggle('open');
        const checkbox = currentLabel.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.setAttribute('checked', '');
        }
        document.querySelectorAll('.pricing-boxes-row').forEach((pricele) => {
          pricele.style.display = 'none';
        });
        $(document.querySelector('.pricing-boxes-row')).fadeIn(900);
      });
    });
  }
}
export const priceme = new Pricing('.pricing-form-field label');
