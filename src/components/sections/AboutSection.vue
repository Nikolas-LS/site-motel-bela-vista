<script setup>
import WordReveal from '@/components/ui/WordReveal.vue'
import { useCountUp } from '@/composables/useCountUp'
import areaInterna from '@/assets/images/area-interna.jpg'
import logo from '@/assets/images/logo.png'
import { stats } from '@/data/stats'

// Contadores animados ao entrar na tela
const { root: statsRoot, display } = useCountUp(stats.map((stat) => stat.value))
</script>

<template>
  <section id="sobre" class="section">
    <div class="about-grid">
      <div>
        <div v-reveal class="eyebrow left">O Motel</div>
        <WordReveal
          class="lead"
          text="Um refúgio de conforto e discrição, pensado para quem valoriza privacidade e um atendimento que cuida de cada detalhe."
        />
        <p v-reveal="1" class="body">
          Nossas suítes combinam ambientes aconchegantes, decoração cuidadosa e estrutura completa para tornar cada momento especial.
          Do acesso reservado à limpeza impecável, tudo foi planejado para que você se sinta à vontade desde a chegada.
        </p>
      </div>

      <div v-reveal="2" class="about-visual">
        <div v-tilt="{ max: 4 }" class="dark-frame about-photo">
          <img :src="areaInterna" alt="Área interna e garagens do Motel Bela Vista" loading="lazy" />
        </div>
        <div class="card about-logo"><img :src="logo" alt="Logotipo Motel Bela Vista" /></div>
      </div>
    </div>

    <div ref="statsRoot" class="stats">
      <div v-for="(stat, index) in stats" :key="stat.label" v-reveal="index" v-tilt="{ max: 5 }" class="card card-motion stat">
        <div class="numeral">{{ display[index] }}<small>{{ stat.suffix }}</small></div>
        <div class="meta">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 5rem;
  align-items: center;
}

.lead {
  margin: 1rem 0 2rem;
  font-weight: 400;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.045em;
}
.body {
  max-width: 520px;
}

/* ===== Foto e logo ===== */
.about-visual {
  position: relative;
  width: 100%;
  max-width: 400px;
  justify-self: end;
  padding-bottom: 2.5rem;
}
.about-photo {
  aspect-ratio: 1 / 1;
  rotate: 2deg;
}
.about-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 55% 50%;
}
.about-logo {
  position: absolute;
  left: -2rem;
  bottom: 0;
  width: 120px;
  aspect-ratio: 1;
  padding: 0;
  overflow: hidden;
  rotate: -6deg;
}
/* centralizada pelo meio do cartão, independente do tamanho da imagem */
.about-logo img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  max-width: none;
  translate: -50% -50%;
}

/* ===== Números ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 5rem;
}
.stat {
  padding: 2rem 1.75rem;
}
.stat:nth-child(1) { rotate: -1.2deg; }
.stat:nth-child(2) { rotate: 0.8deg; }
.stat:nth-child(3) { rotate: -0.6deg; }
.stat:hover {
  rotate: 0deg;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.65), 16px 24px 30px rgba(0, 0, 0, 0.15);
}
.stat .numeral small {
  margin-left: 0.1em;
  font-size: 0.5em;
  color: var(--red);
  letter-spacing: -0.03em;
}
.stat .meta {
  margin-top: 0.75rem;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

@media (max-width: 1100px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
  .about-visual {
    max-width: 380px;
    margin: 0 auto;
    justify-self: center;
  }
}
@media (max-width: 720px) {
  .stats {
    grid-template-columns: 1fr;
    margin-top: 3rem;
  }
  .about-logo {
    left: -0.5rem;
    width: 80px;
  }
}
</style>
