<script setup>
import { ref } from 'vue'
import IconArrow from '~icons/solar/arrow-right-linear'
import HeroStreams from '@/components/ui/HeroStreams.vue'
import SplitText from '@/components/ui/SplitText.vue'
import { useParallax } from '@/composables/useParallax'
import fachada from '@/assets/images/fachada.jpg'
import { site } from '@/data/site'
import { reservationLink } from '@/utils/whatsapp'

// Parallax suave na foto da fachada
const photo = ref(null)
useParallax(photo)
</script>

<template>
  <section id="inicio" class="hero">
    <HeroStreams />

    <div class="pill status-tab"><i class="dot"></i> Aberto 24 horas - {{ site.address[1] }}</div>

    <h1 class="display">
      <SplitText text="Motel" :delay="100" /><br />
      <span class="accent"><em class="italic"><SplitText text="Bela Vista" :delay="200" /></em></span>
    </h1>

    <p class="body hero-lead">
      Suítes aconchegantes, ambiente reservado e atendimento atencioso. Um refúgio pensado para você viver o seu melhor momento.
    </p>

    <div class="hero-actions">
      <a v-magnetic class="btn" :href="reservationLink()" target="_blank" rel="noopener">
        Reservar agora <span class="btn-arrow"><IconArrow class="icon" /></span>
      </a>
      <a class="link" href="#suites">Conheça as suítes</a>
    </div>

    <figure v-tilt="{ max: 3 }" class="dark-frame hero-frame">
      <img ref="photo" :src="fachada" alt="Fachada do Motel Bela Vista" fetchpriority="high" />
    </figure>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9rem var(--pad) 5rem;
  text-align: center;
}

/* ===== Entrada em sequência ===== */
.status-tab {
  margin-bottom: 2rem;
  opacity: 0;
  animation: fade-up 0.5s var(--ease-soft) 0.05s forwards;
}
.hero-lead {
  max-width: 520px;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: fade-up 0.55s var(--ease-soft) 0.55s forwards;
}
.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 4.5rem;
  opacity: 0;
  animation: fade-up 0.55s var(--ease-soft) 0.65s forwards;
}
.hero-frame {
  width: 100%;
  max-width: 1100px;
  aspect-ratio: 16 / 9;
  rotate: -0.6deg;
  opacity: 0;
  animation: fade-up 0.7s var(--ease-soft) 0.75s forwards;
}
@keyframes fade-up {
  from { opacity: 0; translate: 0 30px; }
  to { opacity: 1; translate: 0 0; }
}

/* ===== Status ===== */
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 0 3px rgba(12, 179, 0, 0.2);
  animation: blink 1.4s ease-in-out infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 3px rgba(12, 179, 0, 0.25); }
  50% { opacity: 0.25; box-shadow: 0 0 0 9px rgba(12, 179, 0, 0); }
}

/* ===== Título ===== */
.display {
  margin-bottom: 1.75rem;
}
.accent {
  color: var(--red);
}
.italic {
  font-style: italic;
}
.italic :deep(.word) {
  padding-inline: 0.1em;
  margin-inline: -0.1em;
}

/* ===== Foto ===== */
.hero-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 30% 55%;
  scale: 1.08;
  will-change: transform;
}
.hero-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.28), transparent 25%, transparent 65%, rgba(0, 0, 0, 0.35));
}

@media (max-width: 720px) {
  .hero {
    padding-top: 7.5rem;
  }
  .hero-actions {
    gap: 1.25rem;
    margin-bottom: 3rem;
  }
  .hero-frame {
    aspect-ratio: 4 / 5;
  }
}
</style>
