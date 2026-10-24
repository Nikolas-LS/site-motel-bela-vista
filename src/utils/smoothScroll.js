// Rolagem suave entre seções: clique em links "#seção" desliza com easing em vez de pular.
const DURATION = 1400

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

let frame = 0

function scrollToY(target) {
  cancelAnimationFrame(frame)
  const start = window.scrollY
  const distance = target - start
  if (Math.abs(distance) < 2) return

  const startedAt = performance.now()
  const step = (now) => {
    const progress = Math.min((now - startedAt) / DURATION, 1)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))
    if (progress < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

export function setupSmoothScroll() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href^="#"]')
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return

    const id = link.getAttribute('href').slice(1)
    const target = id ? document.getElementById(id) : document.documentElement
    if (!target) return

    event.preventDefault()
    scrollToY(id ? target.getBoundingClientRect().top + window.scrollY : 0)
    history.pushState(null, '', id ? `#${id}` : location.pathname)
  })

  // Se a pessoa rolar manualmente durante a animação, ela é interrompida.
  for (const type of ['wheel', 'touchstart', 'keydown']) {
    window.addEventListener(type, () => cancelAnimationFrame(frame), { passive: true })
  }
}
