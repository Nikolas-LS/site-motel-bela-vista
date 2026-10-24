<script setup>
import { marquee } from '../data/site'
// A faixa é duplicada para o loop de -50% ficar contínuo.
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <div v-for="n in 2" :key="n" class="ticker-item">
        <template v-for="item in marquee" :key="item"><span>{{ item }}</span><i></i></template>
      </div>
    </div>
  </div>
</template>
