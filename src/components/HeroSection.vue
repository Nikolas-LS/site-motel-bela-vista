<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import IconArrow from '~icons/solar/arrow-right-linear'
import fachada from '../assets/fachada.png'
import { whatsappLink } from '../data/site'

const img = ref(null)
let raf = 0

// Parallax suave na imagem do hero (como no design system)
const onScroll = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const y = window.scrollY
    if (img.value && y < window.innerHeight) {
      img.value.style.transform = `translateY(${y * 0.15}px)`
    }
  })
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-content">
      <div class="hero-tag">
        <span class="hero-tag-line"></span>
        <span class="hero-tag-text">Privacidade · Conforto · Discrição</span>
      </div>
      <h1 class="hero-title">
        <span>MOTEL</span>
        <span class="title-red">BELA VISTA</span>
        <span class="title-gold">momentos inesquecíveis a dois</span>
      </h1>
      <p class="hero-desc">
        Suítes aconchegantes, ambiente reservado e atendimento atencioso. Um refúgio pensado para você viver o seu melhor momento.
      </p>
      <div class="hero-actions">
        <a class="btn-primary" :href="whatsappLink('Olá! Gostaria de fazer uma reserva no Motel Bela Vista.')" target="_blank" rel="noopener">
          <span>Reservar agora</span><IconArrow class="icon" />
        </a>
        <a class="btn-outline" href="#suites"><span>Conheça as suítes</span><IconArrow class="icon" /></a>
      </div>
    </div>
    <div class="hero-image">
      <img ref="img" :src="fachada" alt="Fachada do Motel Bela Vista" fetchpriority="high" />
      <div class="hero-badge"><div><strong>24H</strong><span>ABERTO</span></div></div>
    </div>
  </section>
</template>
