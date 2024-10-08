import lerp from 'lerp'

class MouseParallax {
  constructor(el) {
    this.DOM = {}
    this.bounds = {}
    this.pos = {
      x: 0,
      y: 0
    }
    this.hover = false
    this.req = null

    this.DOM.el = el
    this.DOM.items = el.querySelectorAll('[data-mp-item]')

    this.bounds.el = this.DOM.el.getBoundingClientRect()
    this.bounds.items = Array.from(this.DOM.items).map(o => o.getBoundingClientRect())

    this.itemsProps = this.bounds.items.map(o => ({
      x: 0,
      y: 0,
      scale: 1
    }))

    this.lastItemsProps = this.itemsProps

    this.DOM.el.addEventListener('mouseenter', () => this.enter(), false)
    this.DOM.el.addEventListener('mouseleave', () => this.leave(), false)
    this.DOM.el.addEventListener('mousemove', event => this.move(event), false)

    this.render()
  }

  enter() {
    this.DOM.el.classList.add('hover')
  }

  leave() {
    this.DOM.el.classList.remove('hover')

    this.itemsProps = this.bounds.items.map(o => ({
      x: 0,
      y: 0,
      scale: 1
    }))
  }

  move(event) {
    this.bounds.el = this.DOM.el.getBoundingClientRect()
    this.bounds.items = Array.from(this.DOM.items).map(o => o.getBoundingClientRect())
    this.itemsProps = this.bounds.items.map((el, i) => {
      const scale = Number(this.DOM.items[i].getAttribute('data-mp-scale')) || 1
      const d = Number(this.DOM.items[i].getAttribute('data-mp-lerp')) || 0.1

      return {
        x: (event.clientX - el.x - el.width / 2) * d,
        y: (event.clientY - el.y - el.height / 2) * d,
        scale
      }
    })

    this.pos.x = event.clientX - this.bounds.el.width / 2
    this.pos.y = event.clientY - this.bounds.el.height / 2
  }

  render(timestamp) {
    this.req = requestAnimationFrame(timestamp => this.render(timestamp))

    this.lastItemsProps = this.itemsProps.map((o, i) => {
      const d = Number(this.DOM.items[i].getAttribute('data-mp-lerp')) || 0.1

      return {
        x: lerp(this.lastItemsProps[i].x, o.x, d).toFixed(2),
        y: lerp(this.lastItemsProps[i].y, o.y, d).toFixed(2),
        scale: lerp(this.lastItemsProps[i].scale, o.scale, d)
      }
    })

    this.DOM.items.forEach((el, i) => {
      el.style.transform = `translate3d(${this.lastItemsProps[i].x}px, ${this.lastItemsProps[i].y}px, 0) scale(${this.lastItemsProps[i].scale})`
    })
  }
}

export default MouseParallax
