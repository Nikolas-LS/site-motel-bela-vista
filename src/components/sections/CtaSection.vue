<script setup>
import IconArrow from '~icons/solar/arrow-right-linear'
import { reservationLink } from '@/utils/whatsapp'
</script>

<template>
  <div class="cta-wrap">
    <section class="cta">
      <div v-reveal class="eyebrow">Reservas</div>
      <h2 v-reveal="1" class="h2">Pronto para uma noite <span class="tone">especial?</span></h2>
      <p v-reveal="2" class="body">Fale com a gente pelo WhatsApp e reserve a sua suíte com total discrição.</p>
      <a v-reveal="3" class="btn on-ink" :href="reservationLink()" target="_blank" rel="noopener">
        Chamar no WhatsApp <span class="btn-arrow"><IconArrow class="icon" /></span>
      </a>
    </section>
  </div>
</template>

<style scoped>
.cta-wrap {
  padding: 0 var(--pad);
}

.cta {
  position: relative;
  overflow: hidden;
  padding: 7rem 2rem;
  text-align: center;
  color: #fff;
  background: radial-gradient(circle at 50% 0%, #e0313f 0%, #8d0f1a 50%, #1a0003 100%);
  border: 8px solid var(--field);
  border-radius: 28px;
}
.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.08) 25%, transparent 32%),
    linear-gradient(105deg, transparent 60%, rgba(255, 255, 255, 0.06) 65%, transparent 72%);
}
.cta > * {
  position: relative;
}

.eyebrow {
  color: rgba(255, 255, 255, 0.65);
}
.eyebrow::before,
.eyebrow::after {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
}

.h2 {
  max-width: 760px;
  margin: 0 auto 1.25rem;
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  color: #fff;
}
.h2 .tone {
  color: rgba(255, 255, 255, 0.55);
}

p {
  max-width: 460px;
  margin: 0 auto 2.5rem;
  color: rgba(255, 255, 255, 0.75);
}

@media (max-width: 720px) {
  .cta {
    padding: 4.5rem 1.25rem;
  }
}
</style>
