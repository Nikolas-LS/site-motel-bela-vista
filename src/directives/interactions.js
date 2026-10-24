// Interações de ponteiro: só ativas com mouse (hover + pointer fino)
// e quando o usuário não pediu menos movimento.
const enabled = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// v-tilt / v-tilt="{ max: 6 }": inclina o elemento em 3D seguindo o mouse
// e expõe --mx/--my (posição do mouse em %) para o brilho "spotlight" no CSS.
export const tilt = {
  mounted(el, { value }) {
    if (!enabled()) return
    const max = value?.max ?? 8
    let raf = 0
    let ev
    const frame = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const px = (ev.clientX - r.left) / r.width
      const py = (ev.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 2 * max}deg) rotateY(${(px - 0.5) * 2 * max}deg)`
    }
    const move = (e) => { ev = e; if (!raf) raf = requestAnimationFrame(frame) }
    const enter = () => el.classList.add('is-tilting')
    const leave = () => {
      cancelAnimationFrame(raf); raf = 0
      el.classList.remove('is-tilting')
      el.style.transform = ''
    }
    el.classList.add('tilt')
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el._tilt = { enter, move, leave }
  },
  unmounted(el) {
    const t = el._tilt
    if (!t) return
    el.removeEventListener('pointerenter', t.enter)
    el.removeEventListener('pointermove', t.move)
    el.removeEventListener('pointerleave', t.leave)
  },
}

// v-magnetic / v-magnetic="0.3": o elemento é "puxado" na direção do mouse.
export const magnetic = {
  mounted(el, { value }) {
    if (!enabled()) return
    const s = value ?? 0.3
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--tx', `${(e.clientX - (r.left + r.width / 2)) * s}px`)
      el.style.setProperty('--ty', `${(e.clientY - (r.top + r.height / 2)) * s}px`)
    }
    const enter = () => el.classList.add('is-mag')
    const leave = () => {
      el.classList.remove('is-mag')
      el.style.setProperty('--tx', '0px')
      el.style.setProperty('--ty', '0px')
    }
    el.setAttribute('data-magnetic', '')
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el._mag = { enter, move, leave }
  },
  unmounted(el) {
    const m = el._mag
    if (!m) return
    el.removeEventListener('pointerenter', m.enter)
    el.removeEventListener('pointermove', m.move)
    el.removeEventListener('pointerleave', m.leave)
  },
}

// Ondulação (ripple) no clique de botões e links de ação.
const RIPPLE_SELECTOR = '.btn, .suite-link, .menu-btn, .whats-fab, .menu-panel .item, .menu-panel .get'
export function setupRipple() {
  document.addEventListener('click', (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = e.target.closest?.(RIPPLE_SELECTOR)
    if (!el) return
    const r = el.getBoundingClientRect()
    const size = Math.max(r.width, r.height) * 2
    const span = document.createElement('span')
    span.className = 'ripple'
    span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`
    el.appendChild(span)
    span.addEventListener('animationend', () => span.remove())
  })
}
