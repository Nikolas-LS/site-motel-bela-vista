<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '@/utils/media'

// Texto que "acende" palavra por palavra conforme a rolagem (opacidade 0.2 → 1).
const props = defineProps({ text: { type: String, required: true } })

const root = ref(null)
const progress = ref(0)
const words = computed(() => props.text.split(' '))
let frame = 0

const update = () => {
  frame = 0
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  const viewport = window.innerHeight
  const ratio = (viewport * 0.85 - rect.top) / (rect.height + viewport * 0.3)
  progress.value = Math.min(Math.max(ratio, 0), 1)
}
const requestUpdate = () => {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
  if (prefersReducedMotion()) {
    progress.value = 1
    return
  }
  update()
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestUpdate)
  window.removeEventListener('resize', requestUpdate)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <p ref="root">
    <template v-for="(word, index) in words" :key="index">
      <span class="word" :class="{ on: index < progress * words.length }">{{ word }}</span>{{ ' ' }}
    </template>
  </p>
</template>

<style scoped>
.word {
  opacity: 0.2;
  transition: opacity 0.42s var(--ease-soft);
}
.word.on {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .word {
    opacity: 1;
  }
}
</style>
