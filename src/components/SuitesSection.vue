<script setup>
import IconUp from '~icons/solar/arrow-right-up-linear'
import { icons } from './icons'
import { suites, whatsappLink } from '../data/site'
import { suiteImages } from '../data/suiteImages'
</script>

<template>
  <section id="suites" class="suites">
    <div class="suites-header">
      <div>
        <div v-reveal class="section-tag"><span class="section-tag-line"></span><span class="section-tag-text">Nossas suítes</span></div>
        <h2 v-reveal="1" class="section-title">ESCOLHA O SEU<br /><span class="italic">cenário</span> IDEAL</h2>
      </div>
      <p v-reveal="2" class="suites-header-right">
        Cada suíte tem personalidade própria. Consulte disponibilidade e valores diretamente com a nossa equipe.
      </p>
    </div>
    <div class="suites-grid">
      <article v-for="(s, i) in suites" :key="s.name" v-reveal="i" class="suite-card">
        <div class="suite-photo">
          <img :src="suiteImages[s.image]" :alt="`Suíte ${s.name} (foto ilustrativa)`" loading="lazy" />
          <span class="suite-tag">{{ s.tag }}</span>
        </div>
        <div class="suite-body">
          <component :is="icons[s.icon]" class="icon suite-icon" />
          <h3 class="suite-name">{{ s.name }}</h3>
          <p class="suite-desc">{{ s.desc }}</p>
        </div>
        <div class="suite-foot">
          <span class="suite-price">{{ s.price }}</span>
          <a class="suite-link" :href="whatsappLink(`Olá! Gostaria de saber mais sobre a ${s.name}.`)" target="_blank" rel="noopener">
            Consultar <IconUp class="icon" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
