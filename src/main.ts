// Point d'entrée de l'application Vue
// Initialise Vue + Vue Router + styles SCSS globaux
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import unique des styles globaux (reset, typography, buttons, containers)
import './styles/main.scss'

createApp(App).use(router).mount('#app')
