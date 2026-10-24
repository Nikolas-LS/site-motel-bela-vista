<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import IconArrow from '~icons/solar/arrow-right-linear'
import SplitText from './SplitText.vue'
import HeroStreams from './HeroStreams.vue'
import fachada from '../assets/fachada.jpg'
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
    <HeroStreams />
    <div class="pill status-tab"><i class="dot"></i> Aberto 24 horas - {{ site.address[1] }}</div>
    <h1 class="display">
      <SplitText text="Motel" :delay="100" /><br />
      <span class="accent"><em class="it"><SplitText text="Bela Vista" :delay="200" /></em></span>
    </h1>
    <p class="body hero-lead">
      Suítes aconchegantes, ambiente reservado e atendimento atencioso. Um refúgio pensado para você viver o seu melhor momento.
    </p>
    <div class="hero-actions">
      <a v-magnetic class="btn" :href="whatsappLink('Olá! Gostaria de fazer uma reserva no Motel Bela Vista.')" target="_blank" rel="noopener">
        Reservar agora <span class="btn-arrow"><IconArrow class="icon" /></span>
      </a>
      <a class="link" href="#suites">Conheça as suítes</a>
    </div>
    <figure v-tilt="{ max: 3 }" class="dark-frame hero-frame spot">
      <img ref="img" :src="fachada" alt="Fachada do Motel Bela Vista" fetchpriority="high" />
    </figure>
  </section>
</template>
