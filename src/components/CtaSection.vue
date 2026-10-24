<script setup>
import IconArrow from '~icons/solar/arrow-right-linear'
import { whatsappLink } from '../data/site'
</script>

<template>
  <section class="cta">
    <div class="cta-bg-text" aria-hidden="true">BELA VISTA</div>
    <div class="cta-inner center">
      <div v-reveal class="section-tag"><span class="section-tag-line"></span><span class="section-tag-text">Reservas</span><span class="section-tag-line"></span></div>
      <h2 v-reveal="1" class="section-title">PRONTO PARA UMA NOITE <span class="italic" style="color: var(--gold-light)">especial?</span></h2>
      <p v-reveal="2">Fale com a gente pelo WhatsApp e reserve a sua suíte com total discrição.</p>
      <a v-reveal="3" class="btn-primary" :href="whatsappLink('Olá! Gostaria de fazer uma reserva no Motel Bela Vista.')" target="_blank" rel="noopener">
        <span>Chamar no WhatsApp</span><IconArrow class="icon" />
      </a>
    </div>
  </section>
</template>
