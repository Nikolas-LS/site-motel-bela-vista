<script setup>
import { computed } from 'vue'

// Título que entra letra por letra (como o "split per letter" do Hanzo).
const props = defineProps({
  text: { type: String, required: true },
  delay: { type: Number, default: 0 }, // ms
})

const words = computed(() => {
  let offset = 0
  return props.text.split(' ').map((w) => {
    const item = { chars: [...w], offset }
    offset += item.chars.length
    return item
  })
})
</script>

<template>
  <span class="split" :aria-label="text" :style="{ '--d': `${delay}ms` }">
    <template v-for="(w, wi) in words" :key="wi">
      <span class="word" aria-hidden="true">
        <span v-for="(c, ci) in w.chars" :key="ci" class="char" :style="{ '--i': w.offset + ci }">{{ c }}</span>
      </span>{{ ' ' }}
    </template>
  </span>
</template>
