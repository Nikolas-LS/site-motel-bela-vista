<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import IconInsta from '~icons/simple-icons/instagram'
import IconWhats from '~icons/simple-icons/whatsapp'
import IconFace from '~icons/simple-icons/facebook'
import IconArrow from '~icons/solar/arrow-right-up-linear'
import logo from '../assets/logo.png'
import { navLinks, site, whatsappLink } from '../data/site'

const open = ref(false)
const wrap = ref(null)

const close = () => { open.value = false }
const onDocClick = (e) => { if (open.value && wrap.value && !wrap.value.contains(e.target)) close() }
const onKey = (e) => { if (e.key === 'Escape') close() }

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="nav">
    <a v-magnetic="0.2" class="wordmark" href="#inicio" aria-label="Motel Bela Vista - início">
      <span class="wordmark-badge"><img :src="logo" alt="" /></span>
    </a>
    <div ref="wrap" class="menu-wrap">
      <button v-magnetic="0.25" class="menu-btn" :class="{ open }" :aria-expanded="open" aria-controls="menu-panel" @click="open = !open">
        <span>{{ open ? 'Fechar' : 'Menu' }}</span>
        <span class="menu-bars"><span></span><span></span></span>
      </button>
      <nav id="menu-panel" class="menu-panel" :class="{ open }" aria-label="Principal">
        <a v-for="(l, i) in navLinks" :key="l.href" class="item" :style="{ '--n': i }" :href="l.href" @click="close">
          <small>0{{ i + 1 }}</small>{{ l.label }}
        </a>
        <a class="get" :style="{ '--n': navLinks.length }" :href="whatsappLink('Olá! Gostaria de fazer uma reserva no Motel Bela Vista.')" target="_blank" rel="noopener">
          Reservar pelo WhatsApp <IconArrow class="icon" />
        </a>
        <div class="menu-socials">
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><IconInsta class="icon" /></a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" aria-label="WhatsApp"><IconWhats class="icon" /></a>
          <a :href="site.facebook" target="_blank" rel="noopener" aria-label="Facebook"><IconFace class="icon" /></a>
        </div>
      </nav>
    </div>
  </header>
</template>
