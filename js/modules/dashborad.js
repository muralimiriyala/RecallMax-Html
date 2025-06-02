export const dashboard = {
  eles: document.querySelectorAll('ul.ai-powered-menus li a'),
  init() {
    this.eles.forEach((ele) => {
      ele.addEventListener('click', function (e) {
        e.preventDefault();
        e.currentTarget.classList.add('active');
      });
    });
  },
};
