<script setup>
import IconWhats from '~icons/solar/chat-round-dots-bold'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeStrip from './components/MarqueeStrip.vue'
import AboutSection from './components/AboutSection.vue'
import SuitesSection from './components/SuitesSection.vue'
import ComfortSection from './components/ComfortSection.vue'
import CtaSection from './components/CtaSection.vue'
import LocationSection from './components/LocationSection.vue'
import FooterSection from './components/FooterSection.vue'
import { whatsappLink } from './data/site'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <MarqueeStrip />
    <AboutSection />
    <SuitesSection />
    <ComfortSection />
    <CtaSection />
    <LocationSection />
  </main>
  <FooterSection />
  <a class="whats-fab" :href="whatsappLink()" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
    <IconWhats class="icon" />
  </a>
</template>
