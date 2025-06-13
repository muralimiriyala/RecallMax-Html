jQuery(function () {
  const $el = jQuery('[data-vbg]');
  $el.youtube_background({
    'play-button': true,
    'mute-button': true,
    muted: true,
    volume: 1,
    lazyloading: true,
  });
  // const $playaudio = jQuery('.video-background-controls');
  // if ($playaudio) {
  //   let $audio = $playaudio.find('.mute-toggle');
  //   let $icon = $audio.find('i');
  //   $icon.removeClass('fa-volume-up').addClass('fa-volume-up');
  //   $audio.removeClass('muted');
  //   $audio.removeAttr('role');
  //   $audio.attr('aria-pressed', true);
  // }
});
