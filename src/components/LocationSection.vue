<script setup>
import IconPin from '~icons/solar/map-point-bold'
import IconPhone from '~icons/solar/phone-bold'
import IconClock from '~icons/solar/clock-circle-bold'
import IconArrow from '~icons/solar/arrow-right-linear'
import fachada from '../assets/fachada.png'
import { site } from '../data/site'
</script>

<template>
  <section id="localizacao" class="location">
    <div>
      <div v-reveal class="section-tag"><span class="section-tag-line"></span><span class="section-tag-text">Localização</span></div>
      <h2 v-reveal="1" class="section-title">VENHA NOS <span class="italic">visitar</span></h2>
      <div v-reveal="2" class="contact-item">
        <IconPin class="icon" />
        <div><strong>ENDEREÇO</strong><p v-for="l in site.address" :key="l">{{ l }}</p></div>
      </div>
      <div v-reveal="2" class="contact-item">
        <IconPhone class="icon" />
        <div><strong>TELEFONE / WHATSAPP</strong><a :href="`tel:+${site.phoneDigits}`">{{ site.phoneDisplay }}</a><br /><a :href="`tel:+${site.phone2Digits}`">{{ site.phone2Display }}</a></div>
      </div>
      <div v-reveal="3" class="contact-item">
        <IconClock class="icon" />
        <div><strong>FUNCIONAMENTO</strong><p>{{ site.hours }}</p></div>
      </div>
      <a v-reveal="3" class="btn-primary" :href="site.mapsLink" target="_blank" rel="noopener">
        <span>Como chegar</span><IconArrow class="icon" />
      </a>
    </div>
    <div v-reveal="2" class="map-frame">
      <iframe v-if="site.mapEmbedUrl" :src="site.mapEmbedUrl" title="Mapa do Motel Bela Vista" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <img v-else :src="fachada" alt="Fachada do Motel Bela Vista" loading="lazy" />
    </div>
  </section>
</template>
