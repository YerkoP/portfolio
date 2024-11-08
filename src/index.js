import './style.css'
import './cursor'
import './md-content'

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
})()

