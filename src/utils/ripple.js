import { prefersReducedMotion } from '@/utils/media'

// Elementos que recebem a ondulação (ripple) no clique.
const RIPPLE_TARGETS = '.btn, .suite-link, .menu-btn, .menu-panel .item, .menu-panel .get'

export function setupRipple() {
  document.addEventListener('click', (event) => {
    if (prefersReducedMotion()) return

    const target = event.target.closest?.(RIPPLE_TARGETS)
    if (!target) return

    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - rect.left - size / 2}px;top:${event.clientY - rect.top - size / 2}px`
    target.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  })
}
