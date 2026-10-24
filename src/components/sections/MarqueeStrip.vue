<script setup>
import { marquee } from '@/data/marquee'
// A faixa é renderizada duas vezes para o loop de -50% ficar contínuo.
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <div v-for="copy in 2" :key="copy" class="ticker-item">
        <template v-for="phrase in marquee" :key="phrase"><span>{{ phrase }}</span><i></i></template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  margin: 0 var(--pad);
  padding: 1.1rem 0;
  overflow: hidden;
  background: var(--ink-2);
  border-radius: 999px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.25), var(--shadow);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee 20s linear infinite;
}
.ticker:hover .ticker-track {
  animation-play-state: paused;
}
@keyframes marquee {
  to { transform: translateX(-50%); }
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  padding-right: 1.75rem;
  white-space: nowrap;
}
.ticker-item span {
  display: inline-block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  letter-spacing: -0.02em;
  transition: color 0.39s var(--ease-soft), transform 0.45s var(--ease-soft);
}
.ticker-item span:hover {
  color: #fff;
  transform: translateY(-3px);
}
.ticker-item i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--red);
}

@media (max-width: 720px) {
  .ticker {
    border-radius: 40px;
  }
}
</style>
