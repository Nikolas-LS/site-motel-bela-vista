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
  padding: 0.65rem 0;
  overflow: hidden;
  background: var(--ink-2);
  border-radius: 16px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.25), var(--shadow);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee 20s linear infinite;
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
  color: #fff;
  font-size: 0.95rem;
  letter-spacing: -0.02em;
}
.ticker-item i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--red);
}
</style>
