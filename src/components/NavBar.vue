<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import IconWhats from '~icons/solar/chat-round-dots-bold'
import logo from '../assets/logo.png'
import { navLinks, whatsappLink } from '../data/site'

const scrolled = ref(false)
const open = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 80 }
const toggle = () => {
  open.value = !open.value
  document.body.style.overflow = open.value ? 'hidden' : ''
}
const close = () => {
  open.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav class="nav" :class="{ scrolled }">
    <a class="nav-logo" href="#inicio" aria-label="Motel Bela Vista - início">
      <span class="nav-logo-badge"><img :src="logo" alt="" /></span>
      <span>BELA <span class="accent">VISTA</span></span>
    </a>
    <ul class="nav-links">
      <li v-for="l in navLinks" :key="l.href"><a :href="l.href">{{ l.label }}</a></li>
    </ul>
    <a class="nav-cta" :href="whatsappLink()" target="_blank" rel="noopener">
      <IconWhats class="icon" /> Fale conosco
    </a>
    <button class="nav-hamburger" :class="{ active: open }" aria-label="Abrir menu" :aria-expanded="open" @click="toggle">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-nav" :class="{ active: open }">
    <a v-for="l in navLinks" :key="l.href" :href="l.href" @click="close">{{ l.label }}</a>
    <a :href="whatsappLink()" target="_blank" rel="noopener" @click="close">WhatsApp</a>
  </div>
</template>
