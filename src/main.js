import { createApp } from 'vue'
import './style.css'
import './interactions.css'
import App from './App.vue'
import reveal from './directives/reveal'
import { tilt, magnetic, setupRipple } from './directives/interactions'
import { setupSmoothScroll } from './directives/smoothScroll'

createApp(App).directive('reveal', reveal).directive('tilt', tilt).directive('magnetic', magnetic).mount('#app')
setupRipple()
setupSmoothScroll()
