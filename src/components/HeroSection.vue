<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import IconArrow from '~icons/solar/arrow-right-linear'
import SplitText from './SplitText.vue'
import fachada from '../assets/fachada.png'
import { site, whatsappLink } from '../data/site'

const img = ref(null)
let raf = 0

// Parallax suave na foto da fachada
const onScroll = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const y = window.scrollY
    if (img.value && y < window.innerHeight * 1.5) img.value.style.transform = `translateY(${y * 0.06}px)`
  })
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section id="inicio" class="hero">
    <div class="pill status-tab"><i class="dot"></i> Aberto 24 horas — {{ site.address[1] }}</div>
    <h1 class="display">
      <SplitText text="Motel" :delay="500" /><br />
      <span class="accent"><SplitText text="Bela Vista" :delay="650" /></span>
    </h1>
    <p class="body hero-lead">
      Suítes aconchegantes, ambiente reservado e atendimento atencioso. Um refúgio pensado para você viver o seu melhor momento.
    </p>
    <div class="hero-actions">
      <a class="btn" :href="whatsappLink('Olá! Gostaria de fazer uma reserva no Motel Bela Vista.')" target="_blank" rel="noopener">
        Reservar agora <span class="btn-arrow"><IconArrow class="icon" /></span>
      </a>
      <a class="link" href="#suites">Conheça as suítes</a>
    </div>
    <figure class="dark-frame hero-frame">
      <img ref="img" :src="fachada" alt="Fachada do Motel Bela Vista" fetchpriority="high" />
      <div class="hero-chips">
        <span class="pill">Privacidade</span><span class="pill">Conforto</span><span class="pill">Discrição</span>
      </div>
      <div class="hero-stamp"><div><strong>24H</strong><span>ABERTO</span></div></div>
    </figure>
  </section>
</template>
