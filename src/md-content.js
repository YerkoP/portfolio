import markdownit from 'markdown-it'
const md = markdownit({
  break: true
})

class MdContent extends HTMLElement {
  constructor() {
    super()
    const template = document
      .getElementById('md-content-template')
      .content
    const host = this.attachShadow({mode: 'open'})
      .appendChild(template.cloneNode(true))
    this.init()
  }

  init() {
    this.containerElement = this.shadowRoot.querySelector('.content')
    const slot = this.shadowRoot.querySelector('slot')
    let ready = false
    slot.addEventListener('slotchange', e => {
      if (ready) {
        return
      }
      const innerText = slot.assignedNodes()[0].textContent
      if (innerText) {
        const rendered = md.render(innerText.trim())
        this.containerElement.innerHTML = rendered
        slot.remove()

        ready = true
      }
    })

    // observe for shadowRoot
    const observer = new MutationObserver(() => {
      // custom events
      const mouseEnterEvent = new CustomEvent('md-link-mouseenter', { bubbles: true })
      const mouseLeaveEvent = new CustomEvent('md-link-mouseleave', { bubbles: true })
      this.containerElement.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('mouseenter', () => {
          console.log('entering on link')
          this.dispatchEvent(mouseEnterEvent)
        })
        a.addEventListener('mouseleave', () => {
          console.log('leaving link')
          this.dispatchEvent(mouseLeaveEvent)
        })
      })
    });
    observer.observe(this.containerElement, {
      subtree: true,
      childList: true,
    });
  }
}

customElements.define('md-content', MdContent)
