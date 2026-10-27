import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, mkdirSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

// O site é uma página única no GitHub Pages: cada seção ganha uma cópia do index.html
// em sua pasta, para que /comodidades etc. abram com status 200.
const sectionPaths = ['sobre', 'suites', 'comodidades', 'localizacao']
const sectionPages = {
  name: 'section-pages',
  closeBundle() {
    for (const path of sectionPaths) {
      mkdirSync(`dist/${path}`, { recursive: true })
      copyFileSync('dist/index.html', `dist/${path}/index.html`)
    }
  },
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), Icons({ compiler: 'vue3' }), sectionPages],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
