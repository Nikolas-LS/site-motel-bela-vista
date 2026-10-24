<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { canUsePointerEffects } from '@/utils/media'

// Cursor personalizado: ponto exato + anel que segue com atraso suave.
// Cresce sobre links/botões e encolhe ao clicar. Só aparece com mouse.
const FOLLOW_SPEED = 0.08
const INTERACTIVE = 'a, button, [data-cursor], input, select, textarea'

const visible = ref(false)
const hovering = ref(false)
const pressed = ref(false)
const ring = ref(null)
const dot = ref(null)

let targetX = 0
let targetY = 0
let ringX = 0
let ringY = 0
let frame = 0

const animateRing = () => {
  ringX += (targetX - ringX) * FOLLOW_SPEED
  ringY += (targetY - ringY) * FOLLOW_SPEED
  if (ring.value) ring.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
  frame = requestAnimationFrame(animateRing)
}

const onMove = (event) => {
  targetX = event.clientX
  targetY = event.clientY
  if (!visible.value) {
    ringX = targetX
    ringY = targetY
    visible.value = true
  }
  if (dot.value) dot.value.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
}
const onOver = (event) => {
  hovering.value = !!event.target.closest?.(INTERACTIVE)
}
const onLeaveWindow = () => {
  visible.value = false
}
const onPress = () => {
  pressed.value = true
}
const onRelease = () => {
  pressed.value = false
}

onMounted(() => {
  if (!canUsePointerEffects()) return
  const root = document.documentElement
  root.addEventListener('pointermove', onMove, { passive: true })
  root.addEventListener('pointerover', onOver, { passive: true })
  root.addEventListener('pointerleave', onLeaveWindow)
  window.addEventListener('pointerdown', onPress)
  window.addEventListener('pointerup', onRelease)
  frame = requestAnimationFrame(animateRing)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  const root = document.documentElement
  root.removeEventListener('pointermove', onMove)
  root.removeEventListener('pointerover', onOver)
  root.removeEventListener('pointerleave', onLeaveWindow)
  window.removeEventListener('pointerdown', onPress)
  window.removeEventListener('pointerup', onRelease)
})
</script>

<template>
  <div aria-hidden="true">
    <div ref="ring" class="cursor-ring" :class="{ on: visible, hover: hovering, down: pressed }"></div>
    <div ref="dot" class="cursor-dot" :class="{ on: visible, hover: hovering }"></div>
  </div>
</template>

<style scoped>
.cursor-ring,
.cursor-dot {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
}
.cursor-ring.on,
.cursor-dot.on {
  opacity: 1;
}

.cursor-ring {
  width: 38px;
  height: 38px;
  margin: -19px 0 0 -19px;
  border: 1.5px solid #fff;
  border-radius: 50%;
  mix-blend-mode: difference;
  transition:
    opacity 0.28s,
    width 0.45s var(--ease-soft),
    height 0.45s var(--ease-soft),
    margin 0.45s var(--ease-soft),
    background 0.34s,
    border-color 0.34s,
    scale 0.28s var(--ease-soft);
}
.cursor-ring.hover {
  width: 72px;
  height: 72px;
  margin: -36px 0 0 -36px;
  mix-blend-mode: normal;
  border-color: var(--red);
  background: rgba(212, 32, 46, 0.12);
}
.cursor-ring.down {
  scale: 0.75;
}

.cursor-dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--red);
  transition: opacity 0.28s, scale 0.28s var(--ease-soft);
}
.cursor-dot.hover {
  scale: 0;
}

/* Touch: sem cursor personalizado */
@media (hover: none) {
  .cursor-ring,
  .cursor-dot {
    display: none;
  }
}
</style>
