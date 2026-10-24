<script setup>
import IconUp from '~icons/solar/arrow-right-up-linear'
import { icons } from './icons'
import { suites, whatsappLink } from '../data/site'
import { suiteImages } from '../data/suiteImages'
</script>

<template>
  <section id="suites" class="section suites">
    <div class="section-head suites-head center">
      <div v-reveal class="eyebrow">Nossas suítes</div>
      <h2 v-reveal="1" class="h2">Escolha o seu <span class="tone">cenário</span><br />ideal</h2>
      <svg v-reveal.draw class="scribble" viewBox="0 0 380 22" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M4 14 C 60 4, 120 20, 190 11 S 320 6, 376 13" />
      </svg>
    </div>
    <div class="suites-grid">
      <article v-for="(s, i) in suites" :key="s.name" v-reveal="i % 3" v-tilt="{ max: 6 }" class="card suite spot">
        <div class="suite-photo">
          <img :src="suiteImages[s.image]" :alt="`Suíte ${s.name} (foto ilustrativa)`" loading="lazy" />
        </div>
        <div class="suite-body">
          <h3 class="h3 suite-name"><component :is="icons[s.icon]" class="icon" />{{ s.name }}</h3>
          <p class="body">{{ s.desc }}</p>
        </div>
        <div class="suite-foot">
          <span class="suite-price">{{ s.price }}</span>
          <a class="suite-link" :href="whatsappLink(`Olá! Gostaria de saber mais sobre a suíte ${s.name}.`)" target="_blank" rel="noopener">
            Consultar <IconUp class="icon" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
