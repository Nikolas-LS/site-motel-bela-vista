import { canUsePointerEffects } from '@/utils/media'

// v-magnetic / v-magnetic="0.3": o elemento é "puxado" na direção do mouse.
export default {
  mounted(el, { value }) {
    if (!canUsePointerEffects()) return

    const strength = value ?? 0.3

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--tx', `${(event.clientX - (rect.left + rect.width / 2)) * strength}px`)
      el.style.setProperty('--ty', `${(event.clientY - (rect.top + rect.height / 2)) * strength}px`)
    }
    const onEnter = () => el.classList.add('is-mag')
    const onLeave = () => {
      el.classList.remove('is-mag')
      el.style.setProperty('--tx', '0px')
      el.style.setProperty('--ty', '0px')
    }

    el.setAttribute('data-magnetic', '')
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el._magnetic = { onEnter, onMove, onLeave }
  },
  unmounted(el) {
    const handlers = el._magnetic
    if (!handlers) return
    el.removeEventListener('pointerenter', handlers.onEnter)
    el.removeEventListener('pointermove', handlers.onMove)
    el.removeEventListener('pointerleave', handlers.onLeave)
  },
}
