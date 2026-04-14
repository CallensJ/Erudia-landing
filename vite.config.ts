// Configuration Vite pour la landing Erudia
// - Alias @ → src/ pour imports propres dans composants et SCSS
// - vite-plugin-sitemap : génère sitemap.xml bilingue (fr/en) au build
//   avec hreflang via i18n, lastmod et priorités par page (RoutesOptionMap)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sitemap from 'vite-plugin-sitemap'
import { fileURLToPath, URL } from 'node:url'

const BASE_URL = 'https://erudia.app'

// Pages avec leurs priorités (chemins sans préfixe langue)
const pages = [
  { path: '/',                   priority: 1.0 },
  { path: '/features',           priority: 0.9 },
  { path: '/how-it-works',       priority: 0.9 },
  { path: '/pricing',            priority: 0.9 },
  { path: '/faq',                priority: 0.8 },
  { path: '/contact',            priority: 0.8 },
  { path: '/legal/privacy',      priority: 0.4 },
  { path: '/legal/terms',        priority: 0.4 },
  { path: '/legal/mentions',     priority: 0.4 },
]

// Maps par route pour priority et changefreq (RoutesOptionMap<T>)
const priorityMap: Record<string, number> = {}
const changefreqMap: Record<string, string> = {}
pages.forEach(({ path, priority }) => {
  priorityMap[path] = priority
  changefreqMap[path] = priority >= 0.9 ? 'weekly' : 'monthly'
})

export default defineConfig({
  plugins: [
    vue(),
    sitemap({
      hostname: BASE_URL,
      // Routes dynamiques (SPA — Vite ne peut pas les scanner automatiquement)
      dynamicRoutes: pages.map(({ path }) => path),
      // Hreflang fr/en auto-générés avec strategy 'prefix' (/fr/..., /en/...)
      i18n: {
        defaultLanguage: 'fr',
        languages: ['fr', 'en'],
        strategy: 'prefix',
      },
      priority: priorityMap,
      changefreq: changefreqMap,
      lastmod: new Date(),
    }),
  ],
  resolve: {
    alias: {
      // Alias @ → src/ disponible dans TS et dans les @use SCSS des SFCs Vue
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
