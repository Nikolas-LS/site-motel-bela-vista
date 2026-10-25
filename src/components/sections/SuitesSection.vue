<script setup>
import { reactive } from 'vue'
import IconArrowUp from '~icons/solar/arrow-right-up-linear'
import IconPrev from '~icons/solar/alt-arrow-left-linear'
import IconNext from '~icons/solar/alt-arrow-right-linear'
import { suites } from '@/data/suites'
import { suiteLink } from '@/utils/whatsapp'

// Foto atual de cada suíte com carrossel (a rolagem é feita por scroll-snap).
const current = reactive({})

const photosOf = (suite) => suite.images ?? [suite.image]

function onScroll(name, event) {
  const el = event.currentTarget
  current[name] = Math.round(el.scrollLeft / el.clientWidth)
}

function go(name, event, step) {
  const track = event.currentTarget.parentElement.querySelector('.suite-track')
  track.scrollBy({ left: step * track.clientWidth, behavior: 'smooth' })
}
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
          <div class="suite-track" @scroll.passive="onScroll(suite.name, $event)">
            <img
              v-for="(photo, i) in photosOf(suite)"
              :key="i"
              :src="photo"
              :alt="`Suíte ${suite.name}, foto ${i + 1} (ilustrativa)`"
              loading="lazy"
            />
          </div>
          <template v-if="photosOf(suite).length > 1">
            <button
              v-show="(current[suite.name] ?? 0) > 0"
              class="suite-arrow prev"
              type="button"
              aria-label="Foto anterior"
              @click="go(suite.name, $event, -1)"
            >
              <IconPrev />
            </button>
            <button
              v-show="(current[suite.name] ?? 0) < photosOf(suite).length - 1"
              class="suite-arrow next"
              type="button"
              aria-label="Próxima foto"
              @click="go(suite.name, $event, 1)"
            >
              <IconNext />
            </button>
            <div class="suite-dots" aria-hidden="true">
              <span
                v-for="(_, i) in photosOf(suite)"
                :key="i"
                :class="{ on: i === (current[suite.name] ?? 0) }"
              />
            </div>
          </template>
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
  box-shadow: 0 0 0 8px rgba(var(--halo), 0.65), 18px 30px 36px rgba(0, 0, 0, 0.16);
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
.suite-track {
  display: flex;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.suite-track::-webkit-scrollbar {
  display: none;
}
.suite-track img {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  scroll-snap-align: center;
}

.suite-arrow {
  position: absolute;
  top: 50%;
  width: 1.9rem;
  height: 1.9rem;
  display: grid;
  place-items: center;
  translate: 0 -50%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  color: var(--ink);
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s var(--ease-soft), color 0.3s var(--ease-soft), scale 0.3s var(--ease-soft);
}
.suite-arrow.prev { left: 0.6rem; }
.suite-arrow.next { right: 0.6rem; }
.suite-arrow:hover {
  background: var(--red);
  color: #fff;
}
.suite-arrow:active {
  scale: 0.9;
}

.suite-dots {
  position: absolute;
  bottom: 0.6rem;
  left: 50%;
  display: flex;
  gap: 0.35rem;
  translate: -50% 0;
  pointer-events: none;
}
.suite-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  transition: background 0.3s, scale 0.3s;
}
.suite-dots span.on {
  background: #fff;
  scale: 1.3;
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
  background: var(--btn-bg);
  color: var(--btn-fg);
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
