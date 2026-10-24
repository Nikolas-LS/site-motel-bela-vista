<script setup>
import { icons } from './icons'
import { comforts } from '../data/site'
</script>

<template>
  <section id="comodidades" class="comforts">
    <div class="comforts-header center">
      <div v-reveal class="section-tag"><span class="section-tag-line"></span><span class="section-tag-text">Comodidades</span><span class="section-tag-line"></span></div>
      <h2 v-reveal="1" class="section-title">TUDO PARA O SEU <span class="italic">bem-estar</span></h2>
    </div>
    <div class="comforts-grid">
      <div v-for="(c, i) in comforts" :key="c.title" v-reveal="i % 3" class="comfort">
        <div class="comfort-icon"><component :is="icons[c.icon]" class="icon" /></div>
        <div>
          <h3>{{ c.title }}</h3>
          <p>{{ c.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
