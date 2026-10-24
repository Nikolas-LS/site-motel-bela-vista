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
        <p class="body">Privacidade, conforto e discrição em cada detalhe. Seja bem-vindo ao Motel Bela Vista.</p>
        <div class="footer-socials">
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><IconInsta class="icon" /></a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" aria-label="WhatsApp"><IconWhats class="icon" /></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navegação</h4>
        <ul><li v-for="l in navLinks" :key="l.href"><a :href="l.href">{{ l.label }}</a></li></ul>
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <ul>
          <li v-for="l in site.address" :key="l"><span>{{ l }}</span></li>
          <li><a :href="`tel:+${site.phoneDigits}`">{{ site.phoneDisplay }}</a></li>
          <li><a :href="`tel:+${site.phone2Digits}`">{{ site.phone2Display }}</a></li>
          <li><span>{{ site.hours }}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {{ year }} Motel Bela Vista. Todos os direitos reservados.</p>
      <span class="age-note">+18</span>
    </div>
  </footer>
</template>
