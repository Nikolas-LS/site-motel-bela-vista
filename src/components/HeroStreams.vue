<script setup>
// Feixes de luz vermelhos que nascem num ponto à esquerda e abrem em leque para a direita.
// Canvas 2D: curvas de Bézier que ondulam devagar. Pausa fora da tela e com a aba oculta.
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)
const RED = '212, 32, 46'
const COUNT = 28

let ctx, w, h, dpr, raf = 0, running = false, visible = true
let obs
const lines = Array.from({ length: COUNT }, (_, i) => {
  const t = (i / (COUNT - 1)) * 2 - 1 // -1..1
  return {
    t,
    phase: Math.random() * Math.PI * 2,
    speed: 0.12 + Math.random() * 0.14,
    amp: 0.012 + Math.random() * 0.03,
    width: 0.7 + (1 - Math.abs(t)) * 2.2 * Math.random(),
    d: 0, v: 0, // deslocamento e velocidade da mola (reação ao mouse)
    alpha: 0.1 + (1 - Math.abs(t)) * 0.25 * (0.5 + Math.random() * 0.5),
  }
})

function resize() {
  const el = canvas.value
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.clientWidth
  h = el.clientHeight
  el.width = Math.round(w * dpr)
  el.height = Math.round(h * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function draw(now) {
  const time = now / 1000
  const lim = h * 0.18
  ctx.clearRect(0, 0, w, h)
  const ox = -w * 0.04
  const oy = h * 0.22

  // brilho do ponto de origem: núcleo branco, halo vermelho
  const r = Math.max(w, h) * 0.32
  const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r)
  g.addColorStop(0, 'rgba(255,255,255,0.95)')
  g.addColorStop(0.12, `rgba(${RED}, 0.4)`)
  g.addColorStop(0.45, `rgba(${RED}, 0.1)`)
  g.addColorStop(1, `rgba(${RED}, 0)`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, r * 1.2, h)

  // molas macias, acopladas aos vizinhos: o movimento se espalha como uma onda de tecido
  const prev = lines.map((l) => l.d)
  lines.forEach((l, i) => {
    const nb = ((prev[i - 1] ?? prev[i]) + (prev[i + 1] ?? prev[i])) / 2
    l.v += -0.005 * l.d + 0.035 * (nb - l.d)
    l.v *= 0.968
    l.d = Math.max(-lim, Math.min(lim, l.d + l.v))
  })

  ctx.lineCap = 'round'
  for (const l of lines) {
    const wob = Math.sin(time * l.speed * 2 + l.phase)
    const spread = h * 0.5 * l.t
    const ex = w * 1.05
    const ey = oy + spread * (1 + wob * 0.18) + h * l.amp * Math.sin(time * l.speed + l.phase * 2) * 2 + l.d * 0.8
    const c1x = w * 0.32, c1y = oy + spread * 0.04 + h * l.amp * wob + l.d * 0.5
    const c2x = w * 0.66, c2y = oy + spread * 0.42 + h * l.amp * Math.cos(time * l.speed + l.phase) + l.d

    ctx.beginPath()
    ctx.moveTo(ox, oy)
    ctx.bezierCurveTo(c1x, c1y, c2x, c2y, ex, ey)

    // halo largo + traço fino e nítido por cima
    ctx.strokeStyle = `rgba(${RED}, ${l.alpha * 0.18})`
    ctx.lineWidth = l.width * 7
    ctx.stroke()
    ctx.strokeStyle = `rgba(${RED}, ${l.alpha})`
    ctx.lineWidth = l.width
    ctx.stroke()
  }
}

// y aproximado de cada feixe na posição x (para saber quais ficam perto do mouse)
const lineY = (l, x) => h * 0.22 + h * 0.5 * l.t * Math.pow(Math.min(Math.max(x / w, 0), 1), 1.5)

let last = null
function local(e) {
  const r = canvas.value.getBoundingClientRect()
  return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientY >= r.top && e.clientY <= r.bottom && e.clientX >= r.left && e.clientX <= r.right }
}
function onMove(e) {
  const p = local(e)
  if (!p.inside) { last = null; return }
  if (last) {
    const vy = p.y - last.y
    const vx = Math.abs(p.x - last.x)
    const push = Math.max(-40, Math.min(40, vy + Math.sign(vy || 1) * vx * 0.15))
    for (const l of lines) {
      const dy = (p.y - lineY(l, p.x)) / (h * 0.24)
      l.v += push * Math.exp(-dy * dy) * 0.028
    }
  }
  last = p
}
function onDown(e) {
  const p = local(e)
  if (!p.inside) return
  for (const l of lines) {
    const dy = lineY(l, p.x) - p.y
    const dist = Math.abs(dy) / (h * 0.5)
    l.v += Math.sign(dy || 1) * h * 0.007 * Math.exp(-dist * dist) // empurra para fora, depois balança
  }
}

function loop(now) {
  if (!running) return
  draw(now)
  raf = requestAnimationFrame(loop)
}

function sync() {
  const should = visible && !document.hidden
  if (should && !running) { running = true; raf = requestAnimationFrame(loop) }
  else if (!should && running) { running = false; cancelAnimationFrame(raf) }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  draw(performance.now())
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  document.addEventListener('visibilitychange', sync)
  obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync() })
  obs.observe(canvas.value)
  sync()
})
onBeforeUnmount(() => {
  running = false
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  document.removeEventListener('visibilitychange', sync)
  obs?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" class="hero-streams" aria-hidden="true"></canvas>
</template>
