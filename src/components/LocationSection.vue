<script setup>
import IconPin from '~icons/solar/map-point-bold'
import IconPhone from '~icons/solar/phone-bold'
import IconClock from '~icons/solar/clock-circle-bold'
import IconArrow from '~icons/solar/arrow-right-linear'
import fachada from '../assets/fachada.png'
import { site } from '../data/site'
</script>

<template>
  <section id="localizacao" class="section location">
    <div class="location-grid">
      <div v-reveal class="glass contact-card">
        <div class="eyebrow left">Localização</div>
        <h2 class="h2" style="margin-bottom: 1.5rem">Venha nos <span class="tone">visitar</span></h2>
        <div class="contact-item">
          <IconPin class="icon" />
          <div><strong>Endereço</strong><p v-for="l in site.address" :key="l">{{ l }}</p></div>
        </div>
        <div class="contact-item">
          <IconPhone class="icon" />
          <div>
            <strong>Telefone / WhatsApp</strong>
            <a :href="`tel:+${site.phoneDigits}`">{{ site.phoneDisplay }}</a>
            <a :href="`tel:+${site.phone2Digits}`">{{ site.phone2Display }}</a>
          </div>
        </div>
        <div class="contact-item">
          <IconClock class="icon" />
          <div><strong>Funcionamento</strong><p>{{ site.hours }}</p></div>
        </div>
        <a class="btn" :href="site.mapsLink" target="_blank" rel="noopener">
          Como chegar <span class="btn-arrow"><IconArrow class="icon" /></span>
        </a>
      </div>
      <div v-reveal="2" class="dark-frame map-frame">
        <iframe v-if="site.mapEmbedUrl" :src="site.mapEmbedUrl" title="Mapa do Motel Bela Vista" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <img v-else :src="fachada" alt="Fachada do Motel Bela Vista" loading="lazy" />
      </div>
    </div>
  </section>
</template>
