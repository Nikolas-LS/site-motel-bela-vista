<script setup>
import IconArrow from '~icons/solar/arrow-right-linear'
import { whatsappLink } from '../data/site'
</script>

<template>
  <div class="cta-wrap">
    <section class="cta">
      <div v-reveal class="eyebrow">Reservas</div>
      <h2 v-reveal="1" class="h2">Pronto para uma noite <span class="tone">especial?</span></h2>
      <p v-reveal="2" class="body">Fale com a gente pelo WhatsApp e reserve a sua suíte com total discrição.</p>
      <a v-reveal="3" class="btn on-ink" :href="whatsappLink('Olá! Gostaria de fazer uma reserva no Motel Bela Vista.')" target="_blank" rel="noopener">
        Chamar no WhatsApp <span class="btn-arrow"><IconArrow class="icon" /></span>
      </a>
    </section>
  </div>
</template>
