// useSeoHead.ts — Composable SEO pour la landing Erudia
// Gère dynamiquement : <title>, <meta description>, <meta robots>,
// <link canonical>, <meta author> et l'attribut lang sur <html>.
// Usage : useSeoHead({ title: { fr, en }, description: { fr, en }, path, noindex? })

import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useLocale } from './useLocale'

/** URL de base en production */
const BASE_URL = 'https://erudia.app'

interface BilingualString {
  fr: string
  en: string
}

interface SeoConfig {
  /** Titre de l'onglet — max 60 caractères par langue */
  title: BilingualString
  /** Meta description — max 155 caractères par langue */
  description: BilingualString
  /** Chemin absolu de la page (ex: '/', '/features') — utilisé pour le canonical */
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

  const canonical = `${BASE_URL}${config.path}`
  const robots = config.noindex ? 'noindex, nofollow' : 'index, follow'

  useHead({
    title,
    htmlAttrs: {
      // Met à jour <html lang="fr|en"> dynamiquement selon la locale active
      lang: computed(() => locale.value),
    },
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { name: 'author', content: 'Johan Callens – JohanWebStudio' },
    ],
    link: [
      // Canonical absolu — évite le duplicate content FR/EN
      { rel: 'canonical', href: canonical },
    ],
  })
}
