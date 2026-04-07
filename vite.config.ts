// Configuration Vite pour la landing Erudia
// - Alias @ → src/ pour imports propres dans composants et SCSS
// - vite-plugin-sitemap : génère sitemap.xml bilingue (fr/en) au build
//   avec hreflang <xhtml:link>, lastmod et priorités par page
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sitemap from 'vite-plugin-sitemap'
import { fileURLToPath, URL } from 'node:url'

const BASE_URL = 'https://erudia.app'
const TODAY = new Date().toISOString().split('T')[0]

// Pages avec leurs priorités (partagées entre fr et en)
const pages = [
  { path: '',               priority: 1.0 },
  { path: 'features',       priority: 0.9 },
  { path: 'how-it-works',   priority: 0.9 },
  { path: 'pricing',        priority: 0.9 },
  { path: 'faq',            priority: 0.8 },
  { path: 'contact',        priority: 0.8 },
  { path: 'legal/privacy',  priority: 0.4 },
  { path: 'legal/terms',    priority: 0.4 },
  { path: 'legal/mentions', priority: 0.4 },
]

// Routes dynamiques explicites pour les deux langues
const dynamicRoutes = pages.flatMap(({ path }) => [
  `/fr${path ? `/${path}` : ''}`,
  `/en${path ? `/${path}` : ''}`,
])

// RoutesOptionMap : route → valeur (pour priority et changefreq)
const priorityMap: Record<string, number> = {}
const changefreqMap: Record<string, string> = {}
pages.forEach(({ path, priority }) => {
  const frPath = `/fr${path ? `/${path}` : ''}`
  const enPath = `/en${path ? `/${path}` : ''}`
  const freq = priority >= 0.9 ? 'weekly' : 'monthly'
  priorityMap[frPath] = priority
  priorityMap[enPath] = priority
  changefreqMap[frPath] = freq
  changefreqMap[enPath] = freq
})

export default defineConfig({
  plugins: [
    vue(),
    sitemap({
      hostname: BASE_URL,
      dynamicRoutes,
      priority: priorityMap,
      changefreq: changefreqMap,
      lastmod: new Date(TODAY),
      // i18n : génère les balises hreflang automatiquement (strategy prefix = /fr/ /en/)
      i18n: {
        defaultLanguage: 'fr',
        languages: ['fr', 'en'],
        strategy: 'prefix',
      },
    }),
  ],
  resolve: {
    alias: {
      // Alias @ → src/ disponible dans TS et dans les @use SCSS des SFCs Vue
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
