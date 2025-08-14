jQuery(window).on('load', function () {
  const $altStickme = jQuery('.ai-stickme');
  const $sections = jQuery('.ai-stick-section');
  const totalSections = $sections.length;

  // Update arrows visibility based on current section index
  function updateArrows(currentIndex) {
    const $upArrow = jQuery('.ai-stickme-arrow.up');
    const $downArrow = jQuery('.ai-stickme-arrow.down');

    if (currentIndex <= 1) {
      $upArrow.css({ opacity: 0, visibility: 'hidden' });
    } else {
      $upArrow.css({ opacity: 1, visibility: 'visible' });
    }

    if (currentIndex >= totalSections) {
      $downArrow.css({ opacity: 0, visibility: 'hidden' });
    } else {
      $downArrow.css({ opacity: 1, visibility: 'visible' });
    }
  }

  // Update sticky section classes after scroll or manual update
  function updateStickyStateAfterScroll() {
    let found = false;
    $sections.each(function () {
      const $sec = jQuery(this);
      const rect = this.getBoundingClientRect();

      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        found = true;
        jQuery('.ai-stick-section').removeClass('onStick prev-onStick');
        $sec.addClass('onStick');
        $sec.prevAll('.ai-stick-section').addClass('prev-onStick');

        const currentIndex = +$sec.attr('data-section');
        updateArrows(currentIndex);

        return false; // exit .each loop
      }
    });

    if (!found) {
      // fallback: closest section to viewport top
      let closestSection = null;
      let closestDistance = Infinity;

      $sections.each(function () {
        const rect = this.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestSection = jQuery(this);
        }
      });

      if (closestSection) {
        jQuery('.ai-stick-section').removeClass('onStick prev-onStick');
        closestSection.addClass('onStick');
        closestSection.prevAll('.ai-stick-section').addClass('prev-onStick');

        const currentIndex = +closestSection.attr('data-section');
        updateArrows(currentIndex);
      }
    }
  }

  // Scroll Down arrow click
  jQuery('.ai-stickme-arrow.down').on('click', function (e) {
    e.preventDefault();

    let $currentSticky = jQuery('.ai-stick-section.onStick');
    if (!$currentSticky.length) {
      // fallback: find first visible section near top
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
      const $nextSection = jQuery('[data-section="' + nextIndex + '"]');

      if ($nextSection.length) {
        jQuery('html, body').animate(
          { scrollTop: $nextSection.offset().top },
          600,
          function () {
            updateStickyStateAfterScroll(); // immediate update
          }
        );
      }
    }
  });

  // Scroll Up arrow click
  jQuery('.ai-stickme-arrow.up').on('click', function (e) {
    e.preventDefault();

    let $currentSticky = jQuery('.ai-stick-section.onStick');
    if (!$currentSticky.length) {
      // fallback: find first visible section near top
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
      const prevIndex = currentIndex - 1;
      const $prevSection = jQuery('[data-section="' + prevIndex + '"]');

      if ($prevSection.length) {
        jQuery('html, body').animate(
          { scrollTop: $prevSection.offset().top },
          600,
          function () {
            updateStickyStateAfterScroll(); // immediate update
          }
        );
      }
    }
  });

  // Listen to stickOnScroll plugin onStick event to update arrows
  jQuery('body').on('stickOnScroll:onStick', function (ev, $stickyEle) {
    const $section = $stickyEle.closest('.ai-stick-section');
    const sectionIndex = +$section.attr('data-section');
    updateArrows(sectionIndex);
  });

  // Initialize stickOnScroll plugin for each sticky element
  $altStickme.each(function (i) {
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

    // Set z-index and positioning for stacking order
    $selfStick
      .parent()
      .css({ 'z-index': i, position: 'relative' })
      .nextAll()
      .css({ position: 'relative', 'z-index': 50 });
  });

  // Scroll event to update arrows on manual scroll
  let scrollTimeout;
  jQuery(window).on('scroll', function () {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(function () {
      let $visibleSection = jQuery('.ai-stick-section')
        .filter(function () {
          const rect = this.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        })
        .first();

      if (!$visibleSection.length) {
        $visibleSection = jQuery('.ai-stick-section').first();
      }

      const index = +$visibleSection.attr('data-section');
      updateArrows(index);
    }, 100);
  });

  // Initial arrow visibility on page load
  setTimeout(function () {
    let $initialSection = jQuery('.ai-stick-section')
      .filter(function () {
        const rect = this.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      })
      .first();

    if (!$initialSection.length) {
      $initialSection = jQuery('.ai-stick-section').first();
    }

    const index = +$initialSection.attr('data-section');
    updateArrows(index);
  }, 200);
});
