<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import fachada from '../assets/fachada.png'
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
  if (!('IntersectionObserver' in window)) { display.value = stats.map((s) => Number(s.value)); return }
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { animate(); io.disconnect() }
  }, { threshold: 0.5 })
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="sobre" class="about">
    <div v-reveal class="about-images">
      <div class="about-frame"></div>
      <img class="about-img-main" :src="fachada" alt="Fachada do Motel Bela Vista" loading="lazy" />
      <div class="about-logo"><img :src="logo" alt="Logotipo Motel Bela Vista" /></div>
      <div class="about-accent">BV</div>
    </div>
    <div class="about-content">
      <div v-reveal class="section-tag"><span class="section-tag-line"></span><span class="section-tag-text">O Motel</span></div>
      <h2 v-reveal="1" class="section-title">UM REFÚGIO DE<br />CONFORTO E<br /><span class="italic">discrição.</span></h2>
      <p v-reveal="2" class="about-text">
        O Motel Bela Vista foi pensado para quem valoriza privacidade, conforto e um atendimento que cuida de cada detalhe.
        Nossas suítes combinam ambientes aconchegantes, decoração cuidadosa e estrutura completa para tornar cada momento especial.
      </p>
      <p v-reveal="3" class="about-text">
        Do acesso reservado à limpeza impecável, tudo foi planejado para que você se sinta à vontade desde a chegada.
      </p>
      <div ref="root" v-reveal="4" class="about-stats">
        <div v-for="(s, i) in stats" :key="s.label">
          <div class="stat-number">{{ display[i] }}{{ s.suffix }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
