jQuery(window).on('load', function () {
  const $sections = jQuery('.ai-stick-section');
  const totalSections = $sections.length;

  let currentStickyIndex = null;

  const $upArrow = jQuery('.ai-stickme-arrow.up');
  const $downArrow = jQuery('.ai-stickme-arrow.down');

  function showArrows(index) {
    $upArrow.css({
      opacity: index > 1 ? 1 : 0,
      visibility: index > 1 ? 'visible' : 'hidden',
    });

    $downArrow.css({
      opacity: index < totalSections ? 1 : 0,
      visibility: index < totalSections ? 'visible' : 'hidden',
    });
  }

  function hideAllArrows() {
    $upArrow.css({ opacity: 0, visibility: 'hidden' });
    $downArrow.css({ opacity: 0, visibility: 'hidden' });
  }

  function findVisibleSection() {
    let visibleIndex = null;
    let minDist = Infinity;

    $sections.each(function () {
      const rect = this.getBoundingClientRect();
      const dist = Math.abs(rect.top);
      if (dist < minDist) {
        minDist = dist;
        visibleIndex = +jQuery(this).attr('data-section');
      }
    });

    return visibleIndex;
  }

  function forceStickyStateUpdate() {
    const visibleIndex = findVisibleSection();
    currentStickyIndex = visibleIndex;

    $sections.removeClass('onStick prev-onStick');

    const $current = jQuery('[data-section="' + visibleIndex + '"]');
    $current.addClass('onStick');
    $current.prevAll('.ai-stick-section').addClass('prev-onStick');

    const $lastSection = jQuery('[data-section="' + totalSections + '"]');
    const lastBottom = $lastSection[0].getBoundingClientRect().bottom;

    const allUnstuck = jQuery('.ai-stick-section.onStick').length === 0;

    if (allUnstuck && lastBottom < 0) {
      hideAllArrows();
    } else if (!visibleIndex || visibleIndex === 1) {
      hideAllArrows();
    } else {
      showArrows(visibleIndex);
    }
  }

  jQuery('.ai-stickme').each(function (i) {
    const $selfStick = jQuery(this);
    const $section = $selfStick.parent();
    $section.css('height', $section.outerHeight());

    $selfStick.stickOnScroll({
      topOffset: 0,
      bottomOffset: 0,
      footerElement: jQuery(this)
        .closest('section')
        .parent('.ai-tot-wrapper')
        .next(),
      setParentOnStick: true,

      onStick: function ($ele) {
        const $current = $ele.parent();
        currentStickyIndex = +$current.attr('data-section');

        $sections.removeClass('onStick prev-onStick');
        $current.addClass('onStick');
        $current.prevAll('.ai-stick-section').addClass('prev-onStick');

        showArrows(currentStickyIndex);
<<<<<<< HEAD
=======
        // hide up arrow more then tot length
        if (currentStickyIndex >= totalSections) {
          jQuery('.ai-stickme-arrow.up').css({
            opacity: 0,
            visibility: 'hidden',
          });
        }
>>>>>>> ed1e1bd8c02b07df9bff5bc350a4e50559a8b61b
      },

      onUnStick: function ($ele) {
        const $current = $ele.parent();
        $current.removeClass('onStick');
        $current.prev('.ai-stick-section').removeClass('prev-onStick');

        const visibleIndex = findVisibleSection();
        currentStickyIndex = visibleIndex;

        const $lastSection = jQuery('[data-section="' + totalSections + '"]');
        const lastBottom = $lastSection[0].getBoundingClientRect().bottom;
        const allUnstuck = jQuery('.ai-stick-section.onStick').length === 0;
<<<<<<< HEAD

=======
>>>>>>> ed1e1bd8c02b07df9bff5bc350a4e50559a8b61b
        if (allUnstuck && lastBottom < 0) {
          hideAllArrows();
        } else if (!visibleIndex || visibleIndex === 1) {
          hideAllArrows();
        } else {
          showArrows(visibleIndex);
        }
      },
    });

    $section.css({ position: 'relative', 'z-index': i });
    $section.nextAll().css({ position: 'relative', 'z-index': 50 });
  });

  // ↓↓↓ Arrow Click Handlers ↓↓↓
  $downArrow.on('click', function (e) {
    e.preventDefault();
    if (!currentStickyIndex) return;

    const nextIndex = currentStickyIndex + 1;
    const $nextSection = jQuery('[data-section="' + nextIndex + '"]');

    if ($nextSection.length) {
      jQuery('html, body').animate(
        { scrollTop: $nextSection.offset().top },
        600,
        function () {
          forceStickyStateUpdate();
        }
      );
    }
  });

  $upArrow.on('click', function (e) {
    e.preventDefault();
    if (!currentStickyIndex) return;

    const prevIndex = currentStickyIndex - 1;
    const $prevSection = jQuery('[data-section="' + prevIndex + '"]');

    if ($prevSection.length) {
      jQuery('html, body').animate(
        { scrollTop: $prevSection.offset().top },
        600,
        function () {
          forceStickyStateUpdate();
        }
      );
    }
  });
});
