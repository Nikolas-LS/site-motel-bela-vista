<script setup>
import CursorFollower from './components/CursorFollower.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeStrip from './components/MarqueeStrip.vue'
import AboutSection from './components/AboutSection.vue'
import SuitesSection from './components/SuitesSection.vue'
import ComfortSection from './components/ComfortSection.vue'
import CtaSection from './components/CtaSection.vue'
import LocationSection from './components/LocationSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <CursorFollower />
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
</template>
