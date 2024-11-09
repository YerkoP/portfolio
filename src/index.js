import './style.css'
import './cursor'
import './md-content'
import chroma from "chroma-js"
import gsap from "gsap"

const generateGlowButtons = () => {
  document.querySelectorAll(".glow-button").forEach((button) => {
      let gradientElem = button.querySelector('.gradient');
      
      if(!gradientElem) {
          gradientElem = document.createElement("div");
          gradientElem.classList.add("gradient");

          button.appendChild(gradientElem);
      }

      button.addEventListener("pointermove", (e) => {
          const rect = button.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(button, {
              "--pointer-x": `${x}px`,
              "--pointer-y": `${y}px`,
              duration: 0.6,
          });

          gsap.to(button, {
              "--button-glow": chroma
              .mix(
                  getComputedStyle(button)
                  .getPropertyValue("--button-glow-start")
                  .trim(),
                  getComputedStyle(button).getPropertyValue("--button-glow-end").trim(),
                  x / rect.width
              )
              .hex(),
              duration: 0.2,
          });
      });
  });
}

;(function() {
  const expansionItems = Array.from(document.querySelectorAll('[data-expand]'))
  const gridItems = Array.from(document.querySelectorAll('.grid > div:not(.blog-link)'))
  const links = Array.from(document.querySelectorAll('a[href]'))
  const cursor = document.querySelector('yp-cursor')
  const navLinks = Array.from(document.querySelectorAll('[data-scrollto]'))

  for (const item of expansionItems.concat(links)) {
    item.addEventListener('mouseenter', () => cursor.addClass('expanded'))
    item.addEventListener('mouseleave', () => cursor.removeClass('expanded'))
  }

  for (const item of gridItems) {
    item.addEventListener('mouseenter', () => cursor.addClass('wide'))
    item.addEventListener('mouseleave', () => cursor.removeClass('wide'))
  }

  for(const navLink of navLinks) {
    const target = document.getElementById(navLink.dataset.scrollto)
    navLink.addEventListener('click', () => {
      target.scrollIntoView({behavior: 'smooth'})
    })
  }

  // for md-content
  document.addEventListener('md-link-mouseenter', () => {
    console.log('[doc] entering link')
    cursor.addClass('expanded')
  })
  document.addEventListener('md-link-mouseleave', () => {
    console.log('[doc] leaving link')
    cursor.removeClass('expanded')
  })

  generateGlowButtons()
})()

