<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

// Texto que "acende" palavra por palavra conforme a rolagem (0.2 → 1).
const props = defineProps({ text: { type: String, required: true } })

const root = ref(null)
const progress = ref(0)
const words = computed(() => props.text.split(' '))
let raf = 0

const update = () => {
  raf = 0
  if (!root.value) return
  const r = root.value.getBoundingClientRect()
  const vh = window.innerHeight
  const p = (vh * 0.85 - r.top) / (r.height + vh * 0.3)
  progress.value = Math.min(Math.max(p, 0), 1)
}
const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { progress.value = 1; return }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <p ref="root" class="word-reveal">
    <template v-for="(w, i) in words" :key="i">
      <span class="w" :class="{ on: i < progress * words.length }">{{ w }}</span>{{ ' ' }}
    </template>
  </p>
</template>
