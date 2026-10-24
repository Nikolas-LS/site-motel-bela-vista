import { onBeforeUnmount, onMounted } from 'vue'

// Desloca o elemento verticalmente conforme a rolagem (parallax suave),
// só enquanto ele está perto do topo da página.
export function useParallax(elementRef, factor = 0.06) {
  let frame = 0

  const onScroll = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      const y = window.scrollY
      if (elementRef.value && y < window.innerHeight * 1.5) {
        elementRef.value.style.transform = `translateY(${y * factor}px)`
      }
    })
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
  })
}
