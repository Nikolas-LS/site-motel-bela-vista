import { canUsePointerEffects } from '@/utils/media'

// v-tilt / v-tilt="{ max: 6 }": inclina o elemento em 3D seguindo o mouse.
export default {
  mounted(el, { value }) {
    if (!canUsePointerEffects()) return

    const max = value?.max ?? 8
    let frame = 0
    let lastEvent

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const px = (lastEvent.clientX - rect.left) / rect.width
      const py = (lastEvent.clientY - rect.top) / rect.height
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 2 * max}deg) rotateY(${(px - 0.5) * 2 * max}deg)`
    }
    const onMove = (event) => {
      lastEvent = event
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onEnter = () => el.classList.add('is-tilting')
    const onLeave = () => {
      cancelAnimationFrame(frame)
      frame = 0
      el.classList.remove('is-tilting')
      el.style.transform = ''
    }

    el.classList.add('tilt')
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el._tilt = { onEnter, onMove, onLeave }
  },
  unmounted(el) {
    const handlers = el._tilt
    if (!handlers) return
    el.removeEventListener('pointerenter', handlers.onEnter)
    el.removeEventListener('pointermove', handlers.onMove)
    el.removeEventListener('pointerleave', handlers.onLeave)
  },
}
