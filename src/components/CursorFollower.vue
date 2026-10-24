<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Cursor personalizado: ponto exato + anel que segue com atraso suave.
// Cresce sobre links/botões e encolhe ao clicar. Só aparece com mouse.
const on = ref(false)
const hover = ref(false)
const down = ref(false)
const ring = ref(null)
const dot = ref(null)

let tx = 0, ty = 0, rx = 0, ry = 0, raf = 0

const loop = () => {
  rx += (tx - rx) * 0.08
  ry += (ty - ry) * 0.08
  if (ring.value) ring.value.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
  raf = requestAnimationFrame(loop)
}
const move = (e) => {
  tx = e.clientX; ty = e.clientY
  if (!on.value) { rx = tx; ry = ty; on.value = true }
  if (dot.value) dot.value.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
}
const over = (e) => { hover.value = !!e.target.closest?.('a, button, [data-cursor], input, select, textarea') }
const leaveWindow = () => { on.value = false }
const press = () => { down.value = true }
const release = () => { down.value = false }

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return
  document.documentElement.addEventListener('pointermove', move, { passive: true })
  document.documentElement.addEventListener('pointerover', over, { passive: true })
  document.documentElement.addEventListener('pointerleave', leaveWindow)
  window.addEventListener('pointerdown', press)
  window.addEventListener('pointerup', release)
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  document.documentElement.removeEventListener('pointermove', move)
  document.documentElement.removeEventListener('pointerover', over)
  document.documentElement.removeEventListener('pointerleave', leaveWindow)
  window.removeEventListener('pointerdown', press)
  window.removeEventListener('pointerup', release)
})
</script>

<template>
  <div aria-hidden="true">
    <div ref="ring" class="cursor-ring" :class="{ on, hover, down }"></div>
    <div ref="dot" class="cursor-dot" :class="{ on, hover }"></div>
  </div>
</template>
