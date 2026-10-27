<script setup>
import IconArrow from '~icons/solar/arrow-right-linear'
import IconClock from '~icons/solar/clock-circle-bold'
import IconPin from '~icons/solar/map-point-bold'
import IconPhone from '~icons/solar/phone-bold'
import fachada from '@/assets/images/fachada.jpg'
import { site } from '@/data/site'
</script>

<template>
  <section id="localizacao" class="section">
    <div class="location-grid">
      <div v-reveal class="glass contact-card">
        <div class="eyebrow left">Localização</div>
        <h2 class="h2 contact-title">Venha nos <span class="tone">visitar</span></h2>

        <div class="contact-item">
          <IconPin class="icon" />
          <div>
            <strong>Endereço</strong>
            <p v-for="line in site.address" :key="line">{{ line }}</p>
          </div>
        </div>
        <div class="contact-item">
          <IconPhone class="icon" />
          <div>
            <strong>Telefone / WhatsApp</strong>
            <a :href="`tel:+${site.phoneDigits}`">{{ site.phoneDisplay }}</a>
            <a :href="`tel:+${site.phone2Digits}`">{{ site.phone2Display }}</a>
          </div>
        </div>
        <div class="contact-item">
          <IconClock class="icon" />
          <div>
            <strong>Funcionamento</strong>
            <p>{{ site.hours }}</p>
          </div>
        </div>

        <a class="btn" :href="site.mapsLink" target="_blank" rel="noopener">
          Como chegar <span class="btn-arrow"><IconArrow class="icon" /></span>
        </a>
      </div>

      <div v-reveal="2" class="dark-frame map-frame">
        <iframe
          v-if="site.mapEmbedUrl"
          :src="site.mapEmbedUrl"
          title="Mapa do Motel Bela Vista"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <img v-else :src="fachada" alt="Fachada do Motel Bela Vista" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.location-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 4rem;
  align-items: center;
}

/* ===== Cartão de contato ===== */
.contact-card {
  padding: 2.5rem;
}
.contact-title {
  margin-bottom: 1.5rem;
}
.contact-card .btn {
  margin-top: 1.5rem;
}

.contact-item {
  display: flex;
  gap: 1.1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--hair);
  transition: translate 0.5s var(--ease-soft);
}
.contact-item:last-of-type {
  border-bottom: none;
}
.contact-item:hover {
  translate: 8px 0;
}

.contact-item .icon {
  margin-top: 0.2rem;
  font-size: 1.35rem;
  color: var(--red);
  transition: transform 0.56s var(--ease-soft);
}
.contact-item:hover .icon {
  transform: scale(1.3) rotate(-10deg);
}

.contact-item strong {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 400;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-2);
}
.contact-item p,
.contact-item a {
  font-size: 1.05rem;
  letter-spacing: -0.02em;
  line-height: 1.5;
}
.contact-item a {
  display: block;
  transition: color 0.34s var(--ease-soft), translate 0.45s var(--ease-soft);
}
.contact-item a:hover {
  color: var(--red);
  translate: 6px 0;
}

/* ===== Mapa ===== */
.map-frame {
  aspect-ratio: 4 / 3;
  rotate: 0.8deg;
}
.map-frame iframe,
.map-frame img {
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}

@media (max-width: 1100px) {
  .location-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}
@media (max-width: 720px) {
  .contact-card {
    padding: 1.75rem;
  }
}
</style>
