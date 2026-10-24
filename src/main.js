import { createApp } from 'vue'
import App from './App.vue'
import directives from './directives'
import { setupRipple } from './utils/ripple'
import { setupSmoothScroll } from './utils/smoothScroll'
import './assets/styles/main.css'

createApp(App).use(directives).mount('#app')

setupRipple()
setupSmoothScroll()
