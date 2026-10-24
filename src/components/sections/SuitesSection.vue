<script setup>
import IconArrowUp from '~icons/solar/arrow-right-up-linear'
import { suites } from '@/data/suites'
import { suiteLink } from '@/utils/whatsapp'
</script>

<template>
  <section id="suites" class="section">
    <div class="section-head center">
      <div v-reveal class="eyebrow">Nossas suítes</div>
      <h2 v-reveal="1" class="h2">Escolha o seu <span class="tone">cenário</span><br />ideal</h2>
      <svg v-reveal.draw class="scribble" viewBox="0 0 380 22" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M4 14 C 60 4, 120 20, 190 11 S 320 6, 376 13" />
      </svg>
    </div>

    <div class="suites-grid">
      <article
        v-for="(suite, index) in suites"
        :key="suite.name"
        v-reveal="index % 3"
        v-tilt="{ max: 6 }"
        class="card card-motion suite"
      >
        <div class="suite-photo">
          <img :src="suite.image" :alt="`Suíte ${suite.name} (foto ilustrativa)`" loading="lazy" />
        </div>
        <div class="suite-body">
          <h3 class="h3 suite-name"><component :is="suite.icon" class="icon" />{{ suite.name }}</h3>
          <p class="body">{{ suite.desc }}</p>
        </div>
        <div class="suite-foot">
          <span class="suite-price">{{ suite.price }}</span>
          <a class="suite-link" :href="suiteLink(suite.name)" target="_blank" rel="noopener">
            Consultar <IconArrowUp class="icon" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* ===== Rabisco sob o título ===== */
.scribble {
  position: absolute;
  left: 50%;
  bottom: -1.6rem;
  width: min(380px, 70%);
  height: 22px;
  translate: -50% 0;
  overflow: visible;
  pointer-events: none;
  fill: none;
  stroke: var(--red);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ===== Grade: 3 cards em cima e 2 centralizados embaixo ===== */
.suites-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2.25rem 2rem;
}

.suite {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1.5rem;
  rotate: var(--r, 0deg);
}
.suite:nth-child(1) { --r: -1.4deg; }
.suite:nth-child(2) { --r: 0.9deg; }
.suite:nth-child(3) { --r: -0.7deg; }
.suite:nth-child(4) { --r: 1.2deg; grid-column: 2 / span 2; }
.suite:nth-child(5) { --r: -1deg; grid-column: 4 / span 2; }

.suite:hover {
  rotate: 0deg;
  translate: 0 -10px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.65), 18px 30px 36px rgba(0, 0, 0, 0.16);
}
/* v-reveal: entra de baixo; depois de visível, o hover volta a controlar o translate */
.suite.reveal {
  translate: 0 72px;
}
.suite.reveal.visible {
  translate: 0 0;
}
.suite.reveal.visible:hover {
  translate: 0 -10px;
}

/* ===== Conteúdo do card ===== */
.suite-photo {
  position: relative;
  aspect-ratio: 4 / 3;
  margin-bottom: 1.4rem;
  border-radius: 10px;
  overflow: hidden;
}
.suite-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.suite-body {
  flex: 1;
  padding: 0 0.6rem;
}
.suite-name {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}
.suite-name .icon {
  color: var(--red);
  font-size: 1.25rem;
  transition: transform 0.54s var(--ease-soft);
}
.suite:hover .suite-name .icon {
  transform: scale(1.35) rotate(-12deg);
}

.suite-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  padding: 1.1rem 0.6rem 0;
  border-top: 1px solid var(--hair);
}
.suite-price {
  font-size: 1.15rem;
  letter-spacing: -0.03em;
  transition: color 0.4s var(--ease-soft);
}
.suite:hover .suite-price {
  color: var(--red);
}

.suite-link {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: var(--ink);
  color: #fff;
  border-radius: 999px;
  font-size: 0.8125rem;
  transition: background 0.37s var(--ease-soft), scale 0.4s var(--ease-soft);
}
.suite-link:hover {
  background: var(--red);
}
.suite-link:active {
  scale: 0.94;
  transition-duration: 0.14s;
}
.suite-link .icon {
  transition: transform 0.45s var(--ease-soft);
}
.suite-link:hover .icon {
  transform: translate(4px, -4px);
}

@media (max-width: 1100px) {
  .suites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .suite,
  .suite:nth-child(4),
  .suite:nth-child(5) {
    grid-column: auto;
  }
  .suite:nth-child(5) {
    grid-column: 1 / -1;
    max-width: 50%;
    justify-self: center;
  }
}
@media (max-width: 720px) {
  .suites-grid {
    grid-template-columns: 1fr;
  }
  .suite:nth-child(5) {
    max-width: none;
  }
}
</style>
