import reveal from './reveal'

// Plugin que registra as diretivas globais: v-reveal.
export default {
  install(app) {
    app.directive('reveal', reveal)
  },
}
