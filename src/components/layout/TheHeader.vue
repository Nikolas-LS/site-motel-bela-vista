<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import IconFacebook from '~icons/simple-icons/facebook'
import IconInstagram from '~icons/simple-icons/instagram'
import IconWhatsapp from '~icons/simple-icons/whatsapp'
import IconArrowUp from '~icons/solar/arrow-right-up-linear'
import IconMoon from '~icons/solar/moon-bold'
import IconSun from '~icons/solar/sun-bold'
import logo from '@/assets/images/logo.png'
import { navLinks } from '@/data/navigation'
import { useTheme } from '@/composables/useTheme'
import { site } from '@/data/site'
import { reservationLink, whatsappLink } from '@/utils/whatsapp'

const { theme, toggle: toggleTheme } = useTheme()
const isOpen = ref(false)
const menuRoot = ref(null)

const close = () => {
  isOpen.value = false
}
const closeOnOutsideClick = (event) => {
  if (isOpen.value && menuRoot.value && !menuRoot.value.contains(event.target)) close()
}
const closeOnEscape = (event) => {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', closeOnOutsideClick)
  document.addEventListener('keydown', closeOnEscape)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', closeOnOutsideClick)
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <header class="nav">
    <a v-magnetic="0.2" class="wordmark" href="#inicio" aria-label="Motel Bela Vista - início">
      <span class="wordmark-badge"><img :src="logo" alt="" /></span>
    </a>

    <div ref="menuRoot" class="menu-wrap">
      <button
        v-magnetic="0.25"
        class="theme-btn"
        type="button"
        :aria-label="theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'"
        :title="theme === 'dark' ? 'Tema claro' : 'Tema escuro'"
        @click="toggleTheme"
      >
        <IconSun v-if="theme === 'dark'" class="icon" />
        <IconMoon v-else class="icon" />
      </button>

      <button
        v-magnetic="0.25"
        class="menu-btn"
        :class="{ open: isOpen }"
        :aria-expanded="isOpen"
        aria-controls="menu-panel"
        @click="isOpen = !isOpen"
      >
        <span>{{ isOpen ? 'Fechar' : 'Menu' }}</span>
        <span class="menu-bars"><span></span><span></span></span>
      </button>

      <nav id="menu-panel" class="menu-panel" :class="{ open: isOpen }" aria-label="Principal">
        <a
          v-for="(link, index) in navLinks"
          :key="link.href"
          class="item"
          :style="{ '--n': index }"
          :href="link.href"
          @click="close"
        >
          <small>0{{ index + 1 }}</small>{{ link.label }}
        </a>
        <a class="get" :style="{ '--n': navLinks.length }" :href="reservationLink()" target="_blank" rel="noopener">
          Reservar pelo WhatsApp <IconArrowUp class="icon" />
        </a>
        <div class="menu-socials">
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><IconInstagram class="icon" /></a>
          <a :href="whatsappLink()" target="_blank" rel="noopener" aria-label="WhatsApp"><IconWhatsapp class="icon" /></a>
          <a :href="site.facebook" target="_blank" rel="noopener" aria-label="Facebook"><IconFacebook class="icon" /></a>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem var(--pad);
  pointer-events: none;
}
.nav > * {
  pointer-events: auto;
}

/* ===== Logo ===== */
.wordmark {
  display: inline-flex;
  align-items: center;
  background: var(--white);
  border-radius: 999px;
  padding: 0.45rem;
  box-shadow: 0 0 0 6px rgba(var(--halo), 0.4), 6px 8px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s var(--ease-soft), box-shadow 0.45s var(--ease-soft);
}
.wordmark:hover {
  box-shadow: 0 0 0 9px rgba(var(--halo), 0.6), 8px 12px 22px rgba(0, 0, 0, 0.16);
}
.wordmark-badge {
  position: relative;
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--hair);
  overflow: hidden;
}
.wordmark-badge img {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: 118%;
  max-width: none;
}

/* ===== Botão do menu ===== */
.menu-wrap {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

/* ===== Botão de tema (claro/escuro) ===== */
.theme-btn {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--white);
  color: var(--text);
  font-size: 1.15rem;
  box-shadow: 0 0 0 6px rgba(var(--halo), 0.4), 4px 6px 10px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.5s var(--ease-soft),
    scale 0.45s var(--ease-soft),
    background 0.39s var(--ease-soft),
    color 0.39s var(--ease-soft);
}
.theme-btn:hover {
  background: var(--red);
  color: #fff;
}
.theme-btn:active {
  scale: 0.94;
  transition-duration: 0.14s;
}
.menu-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--red);
  color: #fff;
  border-radius: 999px;
  padding: 0.75rem 1.25rem;
  font-size: 0.9375rem;
  box-shadow: 0 0 0 6px rgba(var(--halo), 0.4);
  transition:
    transform 0.5s var(--ease-soft),
    scale 0.45s var(--ease-soft),
    background 0.39s var(--ease-soft);
}
.menu-btn:hover {
  background: var(--red-hover);
}
.menu-btn.open,
.menu-btn.open:hover {
  background: var(--btn-bg);
  color: var(--btn-fg);
}
.menu-btn.open .menu-bars span {
  background: var(--btn-fg);
}
.menu-btn:active {
  scale: 0.94;
  transition-duration: 0.14s;
}

/* Ícone: as duas barras partem do centro exato, então o X fica simétrico */
.menu-bars {
  --gap: 4px;
  position: relative;
  width: 20px;
  height: 14px;
  flex-shrink: 0;
}
.menu-btn:hover .menu-bars {
  --gap: 5px;
}
.menu-bars span {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 2px;
  margin-top: -1px;
  border-radius: 2px;
  background: #fff;
  transform-origin: 50% 50%;
  transition: transform 0.35s var(--ease-soft);
}
.menu-bars span:nth-child(1) {
  transform: translateY(calc(var(--gap) * -1));
}
.menu-bars span:nth-child(2) {
  transform: translateY(var(--gap));
}
.menu-btn.open .menu-bars span:nth-child(1),
.menu-btn.open:hover .menu-bars span:nth-child(1) {
  transform: translateY(0) rotate(45deg);
}
.menu-btn.open .menu-bars span:nth-child(2),
.menu-btn.open:hover .menu-bars span:nth-child(2) {
  transform: translateY(0) rotate(-45deg);
}

/* ===== Painel do menu ===== */
.menu-panel {
  position: absolute;
  right: 0;
  top: calc(100% + 24px);
  width: min(320px, calc(100vw - 2.5rem));
  padding: 1.25rem;
  background: var(--white);
  border-radius: 16px;
  box-shadow: var(--ring), var(--shadow);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.97);
  transform-origin: top right;
  transition:
    opacity 0.25s var(--ease-soft),
    transform 0.32s var(--ease-soft),
    visibility 0.25s;
}
.menu-panel.open {
  opacity: 1;
  visibility: visible;
  transform: none;
}

/* Itens entram em sequência quando o painel abre */
.menu-panel .item,
.menu-panel .get {
  position: relative;
  overflow: hidden;
  opacity: 0;
  translate: 0 16px;
}
.menu-panel.open .item,
.menu-panel.open .get {
  animation: item-in 0.32s var(--ease-soft) both;
  animation-delay: calc(var(--n, 0) * 45ms + 60ms);
}
@keyframes item-in {
  from { opacity: 0; translate: 0 18px; }
  to { opacity: 1; translate: 0 0; }
}

.menu-panel .item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.7rem 0.25rem;
  font-size: 1.5rem;
  letter-spacing: -0.04em;
  border-bottom: 1px solid var(--hair);
  transition: color 0.34s var(--ease-soft), padding 0.45s var(--ease-soft);
}
.menu-panel .item small {
  font-size: 0.7rem;
  color: var(--text-2);
  letter-spacing: 0;
}
.menu-panel .item:hover {
  color: var(--red);
  padding-left: 0.75rem;
}
.menu-panel .item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 1px;
  width: 100%;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease-soft);
}
.menu-panel .item:hover::after {
  transform: scaleX(1);
}

.menu-panel .get {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  color: var(--red);
  font-size: 1rem;
}

.menu-socials {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
}
.menu-socials a {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--soft);
  color: var(--text-2);
  transition: all 0.45s var(--ease-soft);
}
.menu-socials a:hover {
  background: var(--red);
  color: #fff;
  translate: 0 -4px;
  rotate: -10deg;
}

@media (max-width: 720px) {
  .nav {
    padding: 1rem var(--pad);
  }
  .wordmark {
    padding: 0.35rem;
    box-shadow: 0 0 0 4px rgba(var(--halo), 0.4), 4px 6px 10px rgba(0, 0, 0, 0.1);
  }
  .wordmark-badge {
    width: 38px;
    height: 38px;
  }
  .menu-wrap {
    gap: 0.85rem;
  }
  .theme-btn {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1rem;
    box-shadow: 0 0 0 4px rgba(var(--halo), 0.4);
  }
  .menu-btn {
    gap: 0.5rem;
    padding: 0.5rem 0.95rem;
    font-size: 0.8125rem;
    box-shadow: 0 0 0 4px rgba(var(--halo), 0.4);
  }
  .menu-bars {
    --gap: 3px;
    width: 16px;
    height: 11px;
  }
  .menu-btn:hover .menu-bars {
    --gap: 4px;
  }
  .menu-panel {
    top: calc(100% + 22px);
    width: min(240px, calc(100vw - 2rem));
    padding: 0.85rem;
    border-radius: 14px;
  }
  .menu-panel .item {
    gap: 0.6rem;
    padding: 0.5rem 0.2rem;
    font-size: 1.1rem;
  }
  .menu-panel .item small {
    font-size: 0.6rem;
  }
  .menu-panel .get {
    margin-top: 0.75rem;
    font-size: 0.85rem;
  }
  .menu-socials {
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .menu-socials a {
    width: 32px;
    height: 32px;
  }
}
</style>
