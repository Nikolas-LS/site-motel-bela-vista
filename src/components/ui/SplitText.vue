<script setup>
import { computed } from 'vue'

// Título que entra letra por letra (cada letra sobe de dentro de uma "máscara").
const props = defineProps({
  text: { type: String, required: true },
  delay: { type: Number, default: 0 }, // ms
})

const words = computed(() => {
  let offset = 0
  return props.text.split(' ').map((word) => {
    const item = { chars: [...word], offset }
    offset += item.chars.length
    return item
  })
})
</script>

<template>
  <span class="split" :aria-label="text" :style="{ '--d': `${delay}ms` }">
    <template v-for="(word, wi) in words" :key="wi">
      <span class="word" aria-hidden="true">
        <span v-for="(char, ci) in word.chars" :key="ci" class="char" :style="{ '--i': word.offset + ci }">{{ char }}</span>
      </span>{{ ' ' }}
    </template>
  </span>
</template>

<style scoped>
.word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
}

.char {
  display: inline-block;
  transform: translateY(110%);
  animation: char-in 0.6s var(--ease-soft) forwards;
  animation-delay: calc(var(--d, 0ms) + var(--i) * 25ms);
}

@keyframes char-in {
  to { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .char {
    transform: none;
  }
}
</style>
