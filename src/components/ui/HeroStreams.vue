<script setup>
// Feixes de luz vermelhos que nascem num ponto à esquerda e abrem em leque para a direita.
// Canvas 2D: curvas de Bézier que ondulam devagar e reagem ao mouse (movimento e clique)
// como molas ligadas às vizinhas. Pausa fora da tela e com a aba oculta.
import { onBeforeUnmount, onMounted, ref } from 'vue'

const RED = '212, 32, 46'
const LINE_COUNT = 28
const ORIGIN_Y = 0.22 // altura do ponto de origem (fração da altura do canvas)
const SPRING = 0.005 // força que puxa cada feixe de volta ao repouso
const COUPLING = 0.035 // quanto cada feixe acompanha os vizinhos
const DAMPING = 0.968 // atrito: mais perto de 1 balança por mais tempo
const MAX_DISPLACEMENT = 0.18 // limite de deslocamento (fração da altura)

const canvas = ref(null)

let ctx
let width = 0
let height = 0
let frame = 0
let running = false
let inViewport = true
let observer
let lastPointer = null

const lines = Array.from({ length: LINE_COUNT }, (_, index) => {
  const t = (index / (LINE_COUNT - 1)) * 2 - 1 // -1 (topo) .. 1 (base)
  const centrality = 1 - Math.abs(t)
  return {
    t,
    phase: Math.random() * Math.PI * 2,
    speed: 0.12 + Math.random() * 0.14,
    amplitude: 0.012 + Math.random() * 0.03,
    width: 0.7 + centrality * 2.2 * Math.random(),
    alpha: 0.1 + centrality * 0.25 * (0.5 + Math.random() * 0.5),
    offset: 0, // deslocamento da mola
    velocity: 0, // velocidade da mola
  }
})

function resize() {
  const el = canvas.value
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  width = el.clientWidth
  height = el.clientHeight
  el.width = Math.round(width * ratio)
  el.height = Math.round(height * ratio)
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
}

function drawOriginGlow(originX, originY) {
  const radius = Math.max(width, height) * 0.32
  const glow = ctx.createRadialGradient(originX, originY, 0, originX, originY, radius)
  const core = getComputedStyle(document.documentElement).getPropertyValue('--glow-core')
  glow.addColorStop(0, `rgba(${core}, 0.95)`)
  glow.addColorStop(0.12, `rgba(${RED}, 0.4)`)
  glow.addColorStop(0.45, `rgba(${RED}, 0.1)`)
  glow.addColorStop(1, `rgba(${RED}, 0)`)
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, radius * 1.2, height)
}

// Avança as molas: cada feixe volta ao repouso e arrasta os vizinhos.
function stepSprings() {
  const limit = height * MAX_DISPLACEMENT
  const previous = lines.map((line) => line.offset)
  lines.forEach((line, i) => {
    const neighbors = ((previous[i - 1] ?? previous[i]) + (previous[i + 1] ?? previous[i])) / 2
    line.velocity += -SPRING * line.offset + COUPLING * (neighbors - line.offset)
    line.velocity *= DAMPING
    line.offset = Math.max(-limit, Math.min(limit, line.offset + line.velocity))
  })
}

function draw(now) {
  const time = now / 1000
  const originX = -width * 0.04
  const originY = height * ORIGIN_Y

  ctx.clearRect(0, 0, width, height)
  drawOriginGlow(originX, originY)
  stepSprings()

  ctx.lineCap = 'round'
  for (const line of lines) {
    const sway = Math.sin(time * line.speed * 2 + line.phase)
    const spread = height * 0.5 * line.t
    const drift = height * line.amplitude

    const endX = width * 1.05
    const endY = originY + spread * (1 + sway * 0.18) + drift * Math.sin(time * line.speed + line.phase * 2) * 2 + line.offset * 0.8
    const control1Y = originY + spread * 0.04 + drift * sway + line.offset * 0.5
    const control2Y = originY + spread * 0.42 + drift * Math.cos(time * line.speed + line.phase) + line.offset

    ctx.beginPath()
    ctx.moveTo(originX, originY)
    ctx.bezierCurveTo(width * 0.32, control1Y, width * 0.66, control2Y, endX, endY)

    // halo largo + traço fino e nítido por cima
    ctx.strokeStyle = `rgba(${RED}, ${line.alpha * 0.18})`
    ctx.lineWidth = line.width * 7
    ctx.stroke()
    ctx.strokeStyle = `rgba(${RED}, ${line.alpha})`
    ctx.lineWidth = line.width
    ctx.stroke()
  }
}

// ===== Interação com o ponteiro =====

// y aproximado de cada feixe na posição x (para saber quais ficam perto do mouse).
const lineYAt = (line, x) =>
  height * ORIGIN_Y + height * 0.5 * line.t * Math.pow(Math.min(Math.max(x / width, 0), 1), 1.5)

function toLocal(event) {
  const rect = canvas.value.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    inside:
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom,
  }
}

function onPointerMove(event) {
  const pointer = toLocal(event)
  if (!pointer.inside) {
    lastPointer = null
    return
  }
  if (lastPointer) {
    const dy = pointer.y - lastPointer.y
    const dx = Math.abs(pointer.x - lastPointer.x)
    const push = Math.max(-40, Math.min(40, dy + Math.sign(dy || 1) * dx * 0.15))
    for (const line of lines) {
      const distance = (pointer.y - lineYAt(line, pointer.x)) / (height * 0.24)
      line.velocity += push * Math.exp(-distance * distance) * 0.028
    }
  }
  lastPointer = pointer
}

// Clique: empurra os feixes próximos para longe do ponto clicado; eles voltam balançando.
function onPointerDown(event) {
  const pointer = toLocal(event)
  if (!pointer.inside) return
  for (const line of lines) {
    const dy = lineYAt(line, pointer.x) - pointer.y
    const distance = Math.abs(dy) / (height * 0.5)
    line.velocity += Math.sign(dy || 1) * height * 0.007 * Math.exp(-distance * distance)
  }
}

// ===== Ciclo de animação =====

function loop(now) {
  if (!running) return
  draw(now)
  frame = requestAnimationFrame(loop)
}

function syncRunning() {
  const shouldRun = inViewport && !document.hidden
  if (shouldRun && !running) {
    running = true
    frame = requestAnimationFrame(loop)
  } else if (!shouldRun && running) {
    running = false
    cancelAnimationFrame(frame)
  }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  draw(performance.now())

  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown, { passive: true })
  document.addEventListener('visibilitychange', syncRunning)

  observer = new IntersectionObserver(([entry]) => {
    inViewport = entry.isIntersecting
    syncRunning()
  })
  observer.observe(canvas.value)
  syncRunning()
})

onBeforeUnmount(() => {
  running = false
  cancelAnimationFrame(frame)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('visibilitychange', syncRunning)
  observer?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" class="hero-streams" aria-hidden="true"></canvas>
</template>

<style scoped>
.hero-streams {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
