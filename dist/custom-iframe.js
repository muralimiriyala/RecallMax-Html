jQuery(function () {
  const $el = jQuery('[data-vbg]');

  $el.youtube_background({
    'play-button': true,
    'mute-button': true,
    muted: true,
    volume: 1,
  });
});
