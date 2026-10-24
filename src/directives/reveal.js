// v-reveal: revela o elemento ao entrar na viewport (equivalente ao .reveal do design system).
// Uso: v-reveal ou v-reveal="2" (atraso em múltiplos de 100ms).
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )
    : null

export default {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.transitionDelay = `${value * 0.1}s`
    if (observer) observer.observe(el)
    else el.classList.add('visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
