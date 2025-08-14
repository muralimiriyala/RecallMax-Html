export const dashboard = {
  eles: document.querySelectorAll('ul.ai-powered-menus li a'),
  init() {
    this.eles.forEach((ele) => {
      ele.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('ul.ai-powered-menus li ').forEach((ele) => {
          ele.classList.remove('open');
        });
        document
          .querySelectorAll('ul.ai-powered-menus li a')
          .forEach((link) => {
            link.classList.remove('active');
          });
        e.currentTarget.closest('li').classList.toggle('open');
        e.currentTarget.classList.toggle('active');
      });
    });
  },
};
