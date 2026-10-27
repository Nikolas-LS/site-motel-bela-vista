<script setup>
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import IconArrowUp from '~icons/solar/arrow-right-up-linear'
import IconClose from '~icons/solar/close-circle-linear'
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

// Foto ampliada ao clicar na imagem (null = fechado). Guarda a suíte, a posição e o carrossel do card.
const expanded = ref(null)

const expandedPhotos = computed(() => (expanded.value ? photosOf(expanded.value.suite) : []))

function openExpanded(suite, index, event) {
  expanded.value = { suite, index, track: event.currentTarget.parentElement }
}

function closeExpanded() {
  const { track, index } = expanded.value
  // O card volta mostrando a foto em que o usuário parou.
  track.scrollTo({ left: index * track.clientWidth, behavior: 'instant' })
  expanded.value = null
}

// Navega pela galeria ampliada; passa da última para a primeira e vice-versa.
function step(delta) {
  const total = expandedPhotos.value.length
  expanded.value.index = (expanded.value.index + delta + total) % total
}

const onKeydown = (event) => {
  if (event.key === 'Escape') closeExpanded()
  else if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
}

// Gesto de deslizar no celular.
let touchX = 0
const onTouchStart = (event) => {
  touchX = event.changedTouches[0].clientX
}
const onTouchEnd = (event) => {
  const dx = event.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 50 && expandedPhotos.value.length > 1) step(dx < 0 ? 1 : -1)
}

watch(
  () => Boolean(expanded.value),
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
  },
)
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})

function go(name, event, step) {
  const track = event.currentTarget.parentElement.querySelector('.suite-track')
  const last = track.scrollWidth - track.clientWidth
  // Na última foto, a seta "próxima" volta para a primeira.
  if (step > 0 && track.scrollLeft >= last - 1) {
    track.scrollTo({ left: 0, behavior: 'smooth' })
    return
  }
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
              tabindex="0"
              role="button"
              @click="openExpanded(suite, i, $event)"
              @keydown.enter="openExpanded(suite, i, $event)"
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
              class="suite-arrow next"
              type="button"
              :aria-label="(current[suite.name] ?? 0) < photosOf(suite).length - 1 ? 'Próxima foto' : 'Voltar à primeira foto'"
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
          <dl class="suite-prices">
            <div v-for="(item, i) in suite.prices" :key="item.label" class="suite-price" :style="{ '--i': i }">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
              <dd v-if="item.note" class="suite-note">*{{ item.note }}</dd>
            </div>
          </dl>
        </div>
        <div class="suite-foot">
          <a class="suite-link" :href="suiteLink(suite.name)" target="_blank" rel="noopener">
            Consultar <IconArrowUp class="icon" />
          </a>
        </div>
      </article>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="expanded"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          @click.self="closeExpanded"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <img
            :src="expandedPhotos[expanded.index]"
            :alt="`Suíte ${expanded.suite.name}, foto ${expanded.index + 1} (ilustrativa)`"
          />
          <button class="lightbox-close" type="button" aria-label="Fechar foto" @click="closeExpanded">
            <IconClose />
          </button>
          <template v-if="expandedPhotos.length > 1">
            <button class="lightbox-arrow prev" type="button" aria-label="Foto anterior" @click="step(-1)">
              <IconPrev />
            </button>
            <button class="lightbox-arrow next" type="button" aria-label="Próxima foto" @click="step(1)">
              <IconNext />
            </button>
            <div class="lightbox-count" aria-live="polite">
              {{ expanded.index + 1 }} / {{ expandedPhotos.length }}
            </div>
          </template>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* Mais respiro entre o rabisco e os cards */
.section-head {
  margin-bottom: 7rem;
}
@media (max-width: 720px) {
  .section-head {
    margin-bottom: 5.5rem;
  }
}

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
  padding: 1rem 1rem 1rem;
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
  aspect-ratio: 5 / 4;
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
  cursor: zoom-in;
}

/* ===== Foto ampliada ===== */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.88);
  cursor: zoom-out;
}
.lightbox img {
  /* limitado pela janela (100% não resolve dentro do grid) */
  max-width: min(calc(100vw - 4rem), 1400px);
  max-height: calc(100vh - 4rem);
  max-height: calc(100dvh - 4rem);
  border-radius: 12px;
  object-fit: contain;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: default;
}
.lightbox-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 1.75rem;
  cursor: pointer;
  transition: background 0.3s var(--ease-soft);
}
.lightbox-close:hover,
.lightbox-arrow:hover {
  background: var(--red);
}
.lightbox-arrow {
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  translate: 0 -50%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.3s var(--ease-soft);
}
.lightbox-arrow.prev { left: 1.25rem; }
.lightbox-arrow.next { right: 1.25rem; }
@media (max-width: 720px) {
  .lightbox-arrow {
    width: 2.1rem;
    height: 2.1rem;
    font-size: 1.15rem;
  }
  .lightbox-arrow.prev { left: 0.6rem; }
  .lightbox-arrow.next { right: 0.6rem; }
}
.lightbox-count {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  translate: -50% 0;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s var(--ease-soft);
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
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
  display: flex;
  flex-direction: column;
  container-type: inline-size;
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
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.8rem;
  padding: 0.7rem 0.6rem 0;
  border-top: 1px solid var(--hair);
}

/* ===== Valores ===== */
.suite-prices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  /* margin-top: auto empurra os preços para o rodapé; a sobra de altura fica acima deles */
  margin: auto 0 0;
  padding-top: 0.7rem;
}
/* Altura fixa: todas as caixas têm o mesmo tamanho, com ou sem o "*com hidro" */
.suite-price {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  height: 4.6rem;
  padding: 0 0.4rem;
  text-align: center;
  background: rgba(var(--halo), 0.3);
  border: 1px solid var(--hair);
  border-radius: 14px;
}
/* O pernoite é o destaque da linha */
.suite-price:nth-child(2) {
  border-color: color-mix(in srgb, var(--red) 55%, transparent);
}
.suite-price dt {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.85;
}
.suite-price dd {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.suite-price dd {
  white-space: nowrap;
}
.suite-price .suite-note {
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: var(--red);
}

/* PC: descrição em uma linha só (reticências se algum texto não couber) */
@media (min-width: 1101px) {
  .suite-body .body {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

/* Card estreito (celular): três linhas, rótulo à esquerda e valor à direita */
@container (max-width: 380px) {
  .suite-prices {
    grid-template-columns: 1fr;
    gap: 0.45rem;
  }
  .suite-price {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: auto;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    text-align: left;
  }
  .suite-price dt {
    font-size: 0.75rem;
  }
  .suite-price dt {
    order: 1;
  }
  /* "*com hidro" fica logo ao lado do rótulo, no meio da linha */
  .suite-price .suite-note {
    order: 2;
    flex: 1;
    font-size: 0.68rem;
    text-align: left;
  }
  .suite-price dd:not(.suite-note) {
    order: 3;
    font-size: 1.2rem;
    text-align: right;
  }
}

/* Os valores entram em sequência quando o card aparece */
.suite.visible .suite-price {
  animation: price-in 0.6s var(--ease-soft) calc(0.35s + var(--i) * 0.12s) backwards;
}
@keyframes price-in {
  from {
    opacity: 0;
    translate: 0 14px;
    scale: 0.88;
  }
}
@media (prefers-reduced-motion: reduce) {
  .suite.visible .suite-price {
    animation: none;
  }
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
