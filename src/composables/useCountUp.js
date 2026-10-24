import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '@/utils/media'

// Anima números de 0 até o valor final quando o elemento `root` entra na tela.
// Retorna o `root` (ref do elemento observado) e `display` (valores atuais).
export function useCountUp(values, { duration = 1500, threshold = 0.4 } = {}) {
  const root = ref(null)
  const display = ref(values.map(() => 0))
  let observer

  const animate = () => {
    const startedAt = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      display.value = values.map((value) => Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      display.value = [...values]
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        animate()
        observer.disconnect()
      },
      { threshold },
    )
    observer.observe(root.value)
  })
  onBeforeUnmount(() => observer?.disconnect())

  return { root, display }
}
