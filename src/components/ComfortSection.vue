<script setup>
import { icons } from './icons'
import { comforts } from '../data/site'
</script>

<template>
  <section id="comodidades" class="section comforts">
    <div class="section-head center">
      <div v-reveal class="eyebrow">Comodidades</div>
      <h2 v-reveal="1" class="h2">Tudo para o seu <span class="tone">bem-estar</span></h2>
    </div>
    <div class="comforts-grid">
      <div v-for="(c, i) in comforts" :key="c.title" v-reveal="i % 3" class="comfort">
        <div class="comfort-icon"><component :is="icons[c.icon]" class="icon" /></div>
        <h3 class="h3">{{ c.title }}</h3>
        <p class="body">{{ c.desc }}</p>
      </div>
    </div>
  </section>
</template>
