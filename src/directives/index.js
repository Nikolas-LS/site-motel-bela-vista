import magnetic from './magnetic'
import reveal from './reveal'
import tilt from './tilt'

// Plugin que registra as diretivas globais: v-reveal, v-tilt e v-magnetic.
export default {
  install(app) {
    app.directive('reveal', reveal)
    app.directive('tilt', tilt)
    app.directive('magnetic', magnetic)
  },
}
