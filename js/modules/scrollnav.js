import 'sticksy';

export const scrollnav = {
  init() {
    const $links = $('.scroll-nav-text a.text-link');
    const $sticky = $('.sticky-widget');
    const headerHeight = $('header').outerHeight();

    if (!$links.length) return;

    // Sticksy init
    const stickyInstance = new Sticksy($sticky[0], {
      topSpacing: headerHeight,
      listen: false, // set to false to avoid Safari jerk
    });

    // Optional: update on resize
    $(window).on('resize', () => {
      stickyInstance.update();
    });

    $links.each(function () {
      const $link = $(this);
      $link.data('open', 'false');

      $link.on('click', function (e) {
        e.preventDefault();

        const $this = $(this);
        const $parentList = $this.closest('.scroll-nav-lists');
        const $target = $parentList.find('.scroll-nav-pos');

        const isOpen = $this.data('open') === 'true';

        // Close all
        $links.each(function () {
          const $el = $(this);
          const $list = $el.closest('.scroll-nav-lists');
          const $content = $list.find('.scroll-nav-pos');

          $el.removeClass('open').data('open', 'false');
          $content.removeClass('open').css('max-height', '0px');
        });

        if (!isOpen) {
          $this.addClass('open').data('open', 'true');
          $target
            .addClass('open')
            .css('max-height', $target[0].scrollHeight + 'px');
        }
      });
    });
  },
};
