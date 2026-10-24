<script setup>
import TheFooter from '@/components/layout/TheFooter.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ComfortSection from '@/components/sections/ComfortSection.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import LocationSection from '@/components/sections/LocationSection.vue'
import MarqueeStrip from '@/components/sections/MarqueeStrip.vue'
import SuitesSection from '@/components/sections/SuitesSection.vue'
import CursorFollower from '@/components/ui/CursorFollower.vue'
</script>

<template>
  <CursorFollower />
  <TheHeader />
  <main>
    <HeroSection />
    <MarqueeStrip />
    <AboutSection />
    <SuitesSection />
    <ComfortSection />
    <CtaSection />
    <LocationSection />
  </main>
  <TheFooter />
</template>
