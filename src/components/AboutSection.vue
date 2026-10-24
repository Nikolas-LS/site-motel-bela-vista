<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import WordReveal from './WordReveal.vue'
import fachada from '../assets/fachada.jpg'
import logo from '../assets/logo.png'
import { stats } from '../data/site'

// Contadores animados ao entrar na tela
const root = ref(null)
const display = ref(stats.map(() => 0))
let io

const animate = () => {
  const start = performance.now()
  const dur = 1500
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    display.value = stats.map((s) => Math.round(Number(s.value) * eased))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = stats.map((s) => Number(s.value))
    return
  }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { animate(); io.disconnect() }
  }, { threshold: 0.4 })
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="sobre" class="section about">
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
        <div v-tilt="{ max: 4 }" class="dark-frame about-photo spot"><img :src="fachada" alt="Fachada do Motel Bela Vista" loading="lazy" /></div>
        <div class="card about-logo"><img :src="logo" alt="Logotipo Motel Bela Vista" /></div>
      </div>
    </div>
    <div ref="root" class="stats">
      <div v-for="(s, i) in stats" :key="s.label" v-reveal="i" v-tilt="{ max: 5 }" class="card stat spot">
        <div class="numeral">{{ display[i] }}<small>{{ s.suffix }}</small></div>
        <div class="meta">{{ s.label }}</div>
      </div>
    </div>
  </section>
</template>
