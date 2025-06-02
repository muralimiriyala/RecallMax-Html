jQuery(window).on('load', function () {
  const $altStickme = jQuery('.ai-stickme');
  $altStickme.each(function (index) {
    const $selfStick = jQuery(this);
    if ($selfStick) {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        $selfStick.stickOnScroll({
          topOffset: 0,
          bottomOffset: 0,
          footerElement: jQuery('.stat-testimonial-section'),
          setParentOnStick: true,
          setWidthOnStick: true,
          viewport: window,
        });
      } else {
        // below 1023 i need unstick here
      }
    }
    $selfStick
      .closest('.ai-stick-section')
      .css({ 'z-index': index, position: 'relative' })
      .nextAll()
      .css({ position: 'relative', 'z-index': 50 });
  });
});
