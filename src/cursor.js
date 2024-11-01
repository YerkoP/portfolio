class Cursor extends HTMLElement {
  constructor() {
    super()
    const template = document
      .getElementById('cursor-template')
      .content
    const host = this.attachShadow({mode: 'open'})
      .appendChild(template.cloneNode(true))
    this.init()
  }

  init() {
    this.cursorWrapper = this.shadowRoot.querySelector('.cursor-wrapper');
    this.innerCursor = this.shadowRoot.querySelector('.custom-cursor__inner');
    this.outerCursor = this.shadowRoot.querySelector('.custom-cursor__outer');

    this.cursorWrapperBox = this.cursorWrapper.getBoundingClientRect();
    this.innerCursorBox = this.innerCursor.getBoundingClientRect();
    this.outerCursorBox = this.outerCursor.getBoundingClientRect();

    document.addEventListener('mousemove', e => {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
    });

    const render = () => {
      this.cursorWrapper.style.transform = `translate(${this.clientX}px, ${this.clientY}px)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  addClass(cssClass) {
    this.cursorWrapper.classList.add(cssClass)
  }

  removeClass(cssClass) {
    this.cursorWrapper.classList.remove(cssClass)
  }
}
customElements.define('yp-cursor', Cursor)
