import './style.css'
import './cursor'

;(function() {
  const expansionItems = document.querySelectorAll('[data-expand]')
  const cursor = document.querySelector('yp-cursor')

  for (const item of expansionItems) {
    item.addEventListener('mouseenter', () => cursor.addClass('expanded'))
    item.addEventListener('mouseleave', () => cursor.removeClass('expanded'))
  }
})()