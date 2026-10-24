// v-reveal: revela o elemento ao entrar na viewport.
//   v-reveal            -> fade + subida
//   v-reveal="2"        -> com atraso (múltiplos de 100ms)
//   v-reveal.draw       -> desenha o traço de um <svg> (rabiscos)
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target
            el.classList.add('visible')
            observer.unobserve(el)
            // remove o atraso depois da entrada para não atrasar o hover
            if (el.style.transitionDelay) setTimeout(() => (el.style.transitionDelay = ''), 900)
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )
    : null

export default {
  mounted(el, { value, modifiers }) {
    el.classList.add(modifiers.draw ? 'draw' : 'reveal')
    if (value) el.style.transitionDelay = `${value * 0.07}s`
    if (observer) observer.observe(el)
    else el.classList.add('visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
