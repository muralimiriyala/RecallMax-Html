class Innovation {
  constructor(selector) {
    this.ele = document.querySelector(selector);
    this.line = document.querySelector('.scroll-nav-line');
    this.items = this.ele
      ? Array.from(this.ele.querySelectorAll('.scroll-nav-lists'))
      : '';
    this.activeItem = null;
  }

  init() {
    if (!this.ele || !this.line || this.items.length === 0) return;

    this.items.forEach((item) => {
      console.log(this.line);
      this.line.style.transition = 'height 1s ease';
      this.observer.observe(item);
    });
  }

  updateActiveItem(entry) {
    const target = entry.target;

    // Determine scroll direction

    // Set new active
    this.activeItem = target;

    // Update line height
    const offsetTop = this.activeItem.offsetTop;
    const height = this.activeItem.offsetHeight;
    this.line.style.height = `${72}px`;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.updateActiveItem(entry);
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0.75,
    }
  );
}

export const innovation = new Innovation('.scroll-nav-right');
