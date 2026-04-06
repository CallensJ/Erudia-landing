// Point d'entrée de l'application Vue
// Initialise Vue + Vue Router + @unhead/vue (SEO) + styles SCSS globaux
import { createApp } from 'vue'
import { createUnhead } from '@unhead/vue'
import App from './App.vue'
import router from './router'

// Import unique des styles globaux (reset, typography, buttons, containers)
import './styles/main.scss'

const app = createApp(App)
const head = createUnhead()

app.use(router).use(head).mount('#app')
