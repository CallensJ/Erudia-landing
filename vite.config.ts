// Configuration Vite pour la landing Erudia
// - Alias @ → src/ pour imports propres dans composants et SCSS
// - vite-plugin-sitemap : génère sitemap.xml bilingue (fr/en) au build
//   avec hreflang via i18n, lastmod et priorités par page (RoutesOptionMap)
// - fontPreloadPlugin : injecte <link rel="preload"> pour les fonts critiques après build
// - PostCSS font-display:optional : évite le FOUT et le CLS causé par le swap tardif des polices
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import sitemap from 'vite-plugin-sitemap'
import { fileURLToPath, URL } from 'node:url'

// Polices critiques (au-dessus de la ligne de flottaison) à précharger.
// Les autres polices bénéficient du font-display:optional et sont chargées passivement.
const CRITICAL_FONT_PATTERNS = [
  'nunito-latin-400-normal',
  'nunito-latin-700-normal',
  'sora-latin-800-normal',
]

function fontPreloadPlugin(): Plugin {
  return {
    name: 'font-preload',
    transformIndexHtml: {
      enforce: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return []
        return Object.keys(ctx.bundle)
          .filter(f => f.endsWith('.woff2') && CRITICAL_FONT_PATTERNS.some(p => f.includes(p)))
          .map(f => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `/${f}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head-prepend' as const,
          }))
      },
    },
  }
}

const BASE_URL = 'https://erudia.app'

// Pages avec leurs priorités (chemins sans préfixe langue)
const pages = [
  { path: '/',                   priority: 1.0 },
  { path: '/features',           priority: 0.9 },
  { path: '/how-it-works',       priority: 0.9 },
  { path: '/pricing',            priority: 0.9 },
  { path: '/faq',                priority: 0.8 },
  { path: '/contact',            priority: 0.8 },
  { path: '/about',              priority: 0.7 },
  { path: '/changelog',          priority: 0.6 },
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
  css: {
    postcss: {
      plugins: [
        // Remplace font-display:swap par optional sur toutes les @font-face (@fontsource).
        // swap provoque un CLS=1 car les polices arrivent après le rendu du footer.
        // optional = la police est utilisée uniquement si elle est déjà en cache ou charge
        // dans les ~100ms initiales → zéro layout shift garanti.
        {
          postcssPlugin: 'font-display-optional',
          Declaration(decl: { prop: string; value: string }) {
            if (decl.prop === 'font-display') decl.value = 'optional'
          },
        },
      ],
    },
  },
  plugins: [
    fontPreloadPlugin(),
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
