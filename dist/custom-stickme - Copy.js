jQuery(window).on('load', function () {
  const $altStickme = jQuery('.ai-stickme');
  const $sections = jQuery('.ai-stick-section');
  const totalSections = $sections.length;
  console.log(totalSections, 'totalSections');

  // Arrow Scroll Down — OUTSIDE any stickOnScroll events
  jQuery('.ai-stickme-arrow.down').on('click', function (e) {
    e.preventDefault();

    let $currentSticky = jQuery('.ai-stick-section.onStick');

    // Fallback: If no onStick found, detect based on viewport
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
      if (nextIndex === totalSections) {
        jQuery('.ai-stickme-arrow.down').css({
          opacity: 0,
          visibility: 'hidden',
        });
      }
      const $nextSection = jQuery(`[data-section="${nextIndex}"]`);
      if ($nextSection.length) {
        jQuery('html, body').animate(
          {
            scrollTop: $nextSection.offset().top,
          },
          600,
          function () {
            // ✅ Force trigger onStick logic after scroll ends
            setTimeout(function () {
              $sections.each(function () {
                const $sec = jQuery(this);
                const rect = this.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                  jQuery('.ai-stick-section').removeClass(
                    'onStick prev-onStick'
                  );
                  $sec.addClass('onStick');
                  $sec.prevAll('.ai-stick-section').addClass('prev-onStick');
                  return false;
                }
              });
            }, 10);
          }
        );
      }
    }
  });
  jQuery('.ai-stickme-arrow.up').on('click', function (e) {
    e.preventDefault();
  });

  // enable downarrow starts here
  $('body').on('stickOnScroll:onStick', function (ev, $stickyEle) {
    // ev.target = element that was made sticky - same as $stickyEle
    const firstele = +ev.target.dataset.stickme;
    if (firstele === 1) {
      jQuery('.ai-stickme-arrow.down').css({
        opacity: 1,
        visibility: 'visible',
      });
    }
    if (firstele === totalSections) {
      jQuery('.ai-stickme-arrow.down').css({
        opacity: 0,
        visibility: 'hidden',
      });
    }
  });
  $('body').on('stickOnScroll:onUnStick', function (ev, $stickyEle) {
    // ev.target = element that had Sticky removed - same as $stickyEle
  });
  // enable downarrow ends here

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

    // Fix stacking
    $selfStick
      .parent()
      .css({ 'z-index': _i, position: 'relative' })
      .nextAll()
      .css({ position: 'relative', 'z-index': 50 });
  });
});
