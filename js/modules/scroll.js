const $body = $('body')

const Scroll = {
  scrolled: 0,
  lastPos: 0,
  direction: 'DOWN',
  handle(scrolled) {
    const _ = this
    _.scrolled = scrolled

    if (_.scrolled < _.lastScrollPos) {
      _.direction = 'UP'
      $body.addClass('scrolling-up')
      $body.removeClass('scrolling-down')
    } else {
      _.direction = 'DOWN'
      $body.addClass('scrolling-down')
      $body.removeClass('scrolling-up')
    }

    if (_.scrolled === 0) {
      $body.removeClass('scrolling-up')
      $body.removeClass('scrolling-down')
    }

    if (_.scrolled > $(window).height()) {
      $body.addClass('viewport-scrolled')
    } else {
      $body.removeClass('viewport-scrolled')
    }

    if (_.scrolled > 10) {
      $body.addClass('scrolled')
    } else {
      $body.removeClass('scrolled')
    }

    _.lastScrollPos = _.scrolled <= 0 ? 0 : _.scrolled
  }
}

export default Scroll
