<script setup>
import { comforts } from '@/data/comforts'
</script>

<template>
  <section id="comodidades" class="section">
    <div class="section-head center">
      <div v-reveal class="eyebrow">Comodidades</div>
      <h2 v-reveal="1" class="h2">Tudo para o seu <span class="tone">bem-estar</span></h2>
    </div>

    <div class="comforts-grid">
      <div v-for="(comfort, index) in comforts" :key="comfort.title" v-reveal="index % 3" class="comfort">
        <div class="comfort-icon"><component :is="comfort.icon" class="icon" /></div>
        <h3 class="h3">{{ comfort.title }}</h3>
        <p class="body">{{ comfort.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comforts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem 3.5rem;
}

.comfort {
  position: relative;
  padding-bottom: 1.75rem;
}
/* Entrada ao rolar */
.comfort.reveal {
  transition: opacity 0.4s var(--ease-soft), translate 0.45s var(--ease-soft);
}

/* Divisor cinza e linha vermelha que cresce no hover */
.comfort::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--divider), transparent);
}
.comfort::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 1px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.44s var(--ease-soft);
}
.comfort:hover::before {
  transform: scaleX(1);
}

.comfort-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 1.25rem;
  border-radius: 50%;
  background: var(--white);
  color: var(--red);
  font-size: 1.4rem;
  box-shadow: 0 0 0 5px rgba(var(--halo), 0.5), 5px 7px 10px rgba(0, 0, 0, 0.08);
  transition:
    background 0.27s var(--ease-soft),
    color 0.27s var(--ease-soft),
    rotate 0.34s var(--ease-soft),
    scale 0.34s var(--ease-soft);
}
.comfort:hover .comfort-icon {
  background: var(--red);
  color: #fff;
  rotate: 12deg;
  scale: 1.14;
}

.comfort h3 {
  margin-bottom: 0.5rem;
  transition: color 0.23s var(--ease-soft), translate 0.3s var(--ease-soft);
}
.comfort:hover h3 {
  color: var(--red);
  translate: 8px 0;
}

@media (max-width: 1100px) {
  .comforts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 720px) {
  .comforts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
