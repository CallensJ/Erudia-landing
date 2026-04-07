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

// Génère les entrées de sitemap avec hreflang pour chaque page
const sitemapRoutes = pages.map(({ path, priority }) => {
  const frUrl = `${BASE_URL}/fr${path ? `/${path}` : ''}`
  const enUrl = `${BASE_URL}/en${path ? `/${path}` : ''}`
  return {
    url: frUrl,
    lastmod: TODAY,
    priority,
    changefreq: priority >= 0.9 ? 'weekly' : 'monthly',
    links: [
      { lang: 'fr',        url: frUrl },
      { lang: 'en',        url: enUrl },
      { lang: 'x-default', url: frUrl },
    ],
  }
})

// Ajoute les versions EN (pointant vers les mêmes hreflang)
pages.forEach(({ path, priority }) => {
  const frUrl = `${BASE_URL}/fr${path ? `/${path}` : ''}`
  const enUrl = `${BASE_URL}/en${path ? `/${path}` : ''}`
  sitemapRoutes.push({
    url: enUrl,
    lastmod: TODAY,
    priority,
    changefreq: priority >= 0.9 ? 'weekly' : 'monthly',
    links: [
      { lang: 'fr',        url: frUrl },
      { lang: 'en',        url: enUrl },
      { lang: 'x-default', url: frUrl },
    ],
  })
})

export default defineConfig({
  plugins: [
    vue(),
    sitemap({
      hostname: BASE_URL,
      routes: sitemapRoutes,
    }),
  ],
  resolve: {
    alias: {
      // Alias @ → src/ disponible dans TS et dans les @use SCSS des SFCs Vue
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
