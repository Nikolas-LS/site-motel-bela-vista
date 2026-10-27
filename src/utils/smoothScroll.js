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

// Cada seção tem um caminho próprio (/suites, /comodidades...); "inicio" é a raiz "/".
const sectionOf = (pathname) => pathname.replace(/^\/|\/$/g, '') || 'inicio'
const yOf = (id) => (id === 'inicio' ? 0 : document.getElementById(id).getBoundingClientRect().top + window.scrollY)

export function setupSmoothScroll() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href^="/"]')
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return

    const url = new URL(link.href)
    const id = sectionOf(url.pathname)
    if (url.origin !== location.origin || !document.getElementById(id)) return

    event.preventDefault()
    scrollToY(yOf(id))
    history.pushState(null, '', url.pathname)
  })

  // Entrada direta em /comodidades e botão voltar/avançar levam à seção do caminho.
  window.addEventListener('popstate', () => {
    const id = sectionOf(location.pathname)
    if (document.getElementById(id)) scrollToY(yOf(id))
  })
  if (location.pathname !== '/') {
    window.addEventListener('load', () => window.scrollTo(0, yOf(sectionOf(location.pathname))), { once: true })
  }

  // Se a pessoa rolar manualmente durante a animação, ela é interrompida.
  for (const type of ['wheel', 'touchstart', 'keydown']) {
    window.addEventListener(type, () => cancelAnimationFrame(frame), { passive: true })
  }
}
