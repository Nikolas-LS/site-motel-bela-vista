<script setup>
import { marquee } from '../data/site'
// A faixa é duplicada para o loop de -50% ficar contínuo.
</script>

<template>
  <div class="marquee-section" aria-hidden="true">
    <div class="marquee-track">
      <div v-for="n in 2" :key="n" class="marquee-item">
        <template v-for="item in marquee" :key="item">
          <span>{{ item }}</span><div class="dot"></div>
        </template>
      </div>
    </div>
  </div>
</template>
