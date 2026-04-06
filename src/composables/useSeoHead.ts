// useSeoHead.ts — Composable SEO pour la landing Erudia
// Gère dynamiquement : <title>, <meta description>, <meta robots>,
// <link canonical>, <meta author>, l'attribut lang sur <html>,
// Open Graph (og:*) et Twitter Cards (twitter:*).
// Usage : useSeoHead({ title: { fr, en }, description: { fr, en }, path, noindex? })

import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useLocale } from './useLocale'

/** URL de base en production */
const BASE_URL = 'https://erudia.app'

/**
 * Image OG partagée par toutes les pages (1200×630px).
 * ⚠️  À créer : public/og-image.png (Nova + logo Erudia sur fond violet)
 *     et placer dans quizzly-landing/public/og-image.png
 */
const OG_IMAGE = `${BASE_URL}/og-image.png`
const OG_IMAGE_WIDTH = '1200'
const OG_IMAGE_HEIGHT = '630'

interface BilingualString {
  fr: string
  en: string
}

interface SeoConfig {
  /** Titre de l'onglet — max 60 caractères par langue */
  title: BilingualString
  /** Meta description — max 155 caractères par langue */
  description: BilingualString
  /** Chemin absolu de la page (ex: '/', '/features') — utilisé pour le canonical et og:url */
  path: string
  /** Si true : robots noindex, nofollow (pages légales, etc.) */
  noindex?: boolean
}

export function useSeoHead(config: SeoConfig) {
  const { locale } = useLocale()

  const title = computed(() =>
    locale.value === 'fr' ? config.title.fr : config.title.en,
  )

  const description = computed(() =>
    locale.value === 'fr' ? config.description.fr : config.description.en,
  )

  // og:locale suit la locale active — format BCP 47 adapté au standard OG
  const ogLocale = computed(() =>
    locale.value === 'fr' ? 'fr_FR' : 'en_GB',
  )

  const canonical = `${BASE_URL}${config.path}`
  const robots = config.noindex ? 'noindex, nofollow' : 'index, follow'

  useHead({
    title,
    htmlAttrs: {
      // Met à jour <html lang="fr|en"> dynamiquement selon la locale active
      lang: computed(() => locale.value),
    },
    meta: [
      // ── Fondamentaux ──────────────────────────────────────────
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { name: 'author', content: 'Johan Callens – JohanWebStudio' },

      // ── Open Graph ────────────────────────────────────────────
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Erudia' },
      { property: 'og:url', content: canonical },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:locale', content: ogLocale },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: OG_IMAGE_WIDTH },
      { property: 'og:image:height', content: OG_IMAGE_HEIGHT },
      { property: 'og:image:type', content: 'image/png' },

      // ── Twitter Cards ─────────────────────────────────────────
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    link: [
      // Canonical absolu — évite le duplicate content FR/EN
      { rel: 'canonical', href: canonical },
    ],
  })
}
