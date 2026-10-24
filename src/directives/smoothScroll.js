// Rolagem suave entre seções: clique em links "#seção" desliza com easing em vez de pular.
const DURATION = 1400
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) // easeInOutCubic

let raf = 0

function scrollToY(target) {
  cancelAnimationFrame(raf)
  const start = window.scrollY
  const dist = target - start
  if (Math.abs(dist) < 2) return
  const t0 = performance.now()
  const step = (now) => {
    const p = Math.min((now - t0) / DURATION, 1)
    window.scrollTo(0, start + dist * ease(p))
    if (p < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

export function setupSmoothScroll() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href^="#"]')
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return
    const id = a.getAttribute('href').slice(1)
    const el = id ? document.getElementById(id) : document.documentElement
    if (!el) return
    e.preventDefault()
    const y = id ? el.getBoundingClientRect().top + window.scrollY : 0
    scrollToY(y)
    history.pushState(null, '', id ? `#${id}` : location.pathname)
  })
  // se o usuário rolar manualmente durante a animação, ela é interrompida
  for (const ev of ['wheel', 'touchstart', 'keydown']) {
    window.addEventListener(ev, () => cancelAnimationFrame(raf), { passive: true })
  }
}
