// Point d'entrée de l'application Vue
// Initialise Vue + Vue Router + @unhead/vue (SEO) + styles SCSS globaux
import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'

// Auto-hébergement des fonts — élimine la requête externe vers Google Fonts
// et garantit font-display:swap sans dépendre d'un CDN tiers.
// Sora : poids utilisés dans le design (titres/display)
import '@fontsource/sora/400.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/sora/800.css'
// Nunito : poids utilisés dans le design (corps de texte)
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/500.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'

// Import unique des styles globaux (reset, typography, buttons, containers)
import './styles/main.scss'

const app = createApp(App)
const head = createHead()

app.use(router).use(head).mount('#app')
