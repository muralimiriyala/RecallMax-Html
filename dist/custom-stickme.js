jQuery(window).on('load', function () {
  const $altStickme = jQuery('.ai-stickme');
  const $sections = jQuery('.ai-stick-section');
  const totalSections = $sections.length;

  // Arrow Scroll Down
  $('body').on('stickOnScroll:onStick', function (ev, $stickyEle) {
    // ev.target = element that was made sticky - same as $stickyEle

    jQuery('.ai-stickme-arrow.down').on('click', function (e) {
      e.preventDefault();

      let $currentSticky = jQuery('.ai-stick-section.onStick');

      // Fallback: If no onStick found, detect based on viewport position
      if (!$currentSticky.length) {
        $sections.each(function () {
          const rect = this.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            $currentSticky = jQuery(this);
            return false;
          }
        });
      }

      if ($currentSticky.length) {
        const currentIndex = +$currentSticky.attr('data-section');
        const nextIndex = currentIndex + 1;
        const $nextSection = jQuery(`[data-section="${nextIndex}"]`);

        if ($nextSection.length) {
          jQuery('html, body').animate(
            {
              scrollTop: $nextSection.offset().top,
            },
            600
          );
        }
      }
    });
  });

  // Init stickOnScroll
  $altStickme.each(function (_i) {
    const $selfStick = jQuery(this);
    const $section = $selfStick.parent();
    $section.css('height', $section.outerHeight());

    $selfStick.stickOnScroll({
      topOffset: 0,
      bottomOffset: 0,
      footerElement: jQuery('.stick-off-element'),
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

    // Fix stacking context
    $selfStick
      .parent()
      .css({ 'z-index': _i, position: 'relative' })
      .nextAll()
      .css({ position: 'relative', 'z-index': 50 });
  });
});
