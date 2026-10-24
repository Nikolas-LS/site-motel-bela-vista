<script setup>
import IconFacebook from '~icons/simple-icons/facebook'
import IconInstagram from '~icons/simple-icons/instagram'
import IconWhatsapp from '~icons/simple-icons/whatsapp'
import logo from '@/assets/images/logo.png'
import { navLinks } from '@/data/navigation'
import { site } from '@/data/site'
import { whatsappLink } from '@/utils/whatsapp'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div>
        <div class="footer-logo"><img :src="logo" alt="Motel Bela Vista" /></div>
        <p class="body">Privacidade, conforto e discrição em cada detalhe. Seja bem-vindo ao Motel Bela Vista.</p>
        <div class="footer-socials">
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><IconInstagram class="icon" /></a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" aria-label="WhatsApp"><IconWhatsapp class="icon" /></a>
          <a :href="site.facebook" target="_blank" rel="noopener" aria-label="Facebook"><IconFacebook class="icon" /></a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Navegação</h4>
        <ul>
          <li v-for="link in navLinks" :key="link.href"><a :href="link.href">{{ link.label }}</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contato</h4>
        <ul>
          <li v-for="line in site.address" :key="line"><span>{{ line }}</span></li>
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

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  margin-top: 8rem;
  padding: 5rem var(--pad) 2rem;
  color: #fff;
  background: radial-gradient(circle at 50% 0%, #2e2e2e 0%, #000 70%);
  border: 8px solid var(--field);
  border-bottom: none;
  border-radius: 28px 28px 0 0;
}
.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(105deg, transparent 15%, rgba(255, 255, 255, 0.05) 19%, transparent 26%),
    linear-gradient(105deg, transparent 70%, rgba(255, 255, 255, 0.05) 74%, transparent 80%);
}
.footer > * {
  position: relative;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-logo {
  position: relative;
  width: 96px;
  aspect-ratio: 1;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);
  transition: scale 0.56s var(--ease-soft), rotate 0.67s var(--ease-soft);
}
.footer-logo:hover {
  scale: 1.1;
  rotate: -10deg;
}
.footer-logo img {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: 118%;
  max-width: none;
}

.footer .body {
  color: rgba(255, 255, 255, 0.55);
  max-width: 320px;
  margin-bottom: 1.75rem;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
}
.footer-socials a {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.55);
  font-size: 1.15rem;
  transition: all 0.45s var(--ease-soft);
}
.footer-socials a:hover {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
  translate: 0 -5px;
  rotate: -10deg;
}

.footer-col h4 {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 1.35rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1.25rem;
}
.footer-col li {
  margin-bottom: 0.7rem;
}
.footer-col a,
.footer-col span {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  transition: color 0.34s var(--ease-soft);
}
.footer-col a {
  display: inline-block;
  transition: color 0.34s var(--ease-soft), translate 0.45s var(--ease-soft);
}
.footer-col a:hover {
  color: var(--red);
  translate: 8px 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}
.age-note {
  border: 1px solid var(--red);
  color: var(--red);
  border-radius: 999px;
  padding: 0.15rem 0.7rem;
}

@media (max-width: 1100px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 720px) {
  .footer {
    margin-top: 5rem;
  }
  .footer-top {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
