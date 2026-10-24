<script setup>
import IconInsta from '~icons/solar/camera-bold'
import IconWhats from '~icons/solar/chat-round-dots-bold'
import logo from '../assets/logo.png'
import { navLinks, site, whatsappLink } from '../data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div>
        <div class="footer-logo"><img :src="logo" alt="Motel Bela Vista" /></div>
        <p class="footer-brand-desc">Privacidade, conforto e discrição em cada detalhe. Seja bem-vindo ao Motel Bela Vista.</p>
        <div class="footer-socials">
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><IconInsta class="icon" /></a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" aria-label="WhatsApp"><IconWhats class="icon" /></a>
        </div>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">NAVEGAÇÃO</div>
        <ul><li v-for="l in navLinks" :key="l.href"><a :href="l.href">{{ l.label }}</a></li></ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">CONTATO</div>
        <ul>
          <li v-for="l in site.address" :key="l"><span style="font-size:.85rem;color:var(--gray)">{{ l }}</span></li>
          <li><a :href="`tel:+${site.phoneDigits}`">{{ site.phoneDisplay }}</a></li>
          <li><a :href="`tel:+${site.phone2Digits}`">{{ site.phone2Display }}</a></li>
          <li><span style="font-size:.85rem;color:var(--gray)">{{ site.hours }}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {{ year }} MOTEL BELA VISTA. TODOS OS DIREITOS RESERVADOS.</p>
      <span class="age-note">+18</span>
    </div>
  </footer>
</template>
