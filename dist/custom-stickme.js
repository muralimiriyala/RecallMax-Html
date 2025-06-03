jQuery(window).on('load', function () {
  const $altStickme = jQuery('.ai-stickme');

  $altStickme.each(function (_i) {
    const $selfStick = jQuery(this);
    const $section = $selfStick.parent();
    $section.css('height', $section.outerHeight());

    if ($selfStick) {
      $selfStick.stickOnScroll({
        topOffset: 0,
        bottomOffset: 0,
        footerElement: jQuery('.stat-testimonial-section'),
        setParentOnStick: true,
        viewport: window,
        onStick: function ($ele) {
          const $current = $ele.parent();
          jQuery('.ai-stick-section').removeClass('onStick prev-onStick');
          $current.addClass('onStick');
          $current.prevAll('.ai-stick-section').addClass('prev-onStick');
        },

        onUnStick: function ($ele) {
          const $current = $ele.parent();
          $current.removeClass('onStick');
          $current.prev('.ai-stick-section').removeClass('prev-onStick');
        },
      });

      $selfStick
        .parent()
        .css({ 'z-index': _i, position: 'relative' })
        .nextAll()
        .css({ position: 'relative', 'z-index': 50 });
    }
  });
});
