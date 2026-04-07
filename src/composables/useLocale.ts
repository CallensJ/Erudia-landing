// useLocale.ts — Composable i18n léger pour la landing Erudia
// Singleton module-level : le même ref `locale` est partagé entre TOUS les composants.
//
// Avec le routing bilingue /:locale(fr|en), la locale est lue depuis l'URL
// via le navigation guard du router (qui appelle syncLocale).
//
// Usage :
//   const { t, td, locale, setLocale, localePath } = useLocale()
//   {{ t('nav.features') }}
//   const items = computed(() => td<FaqItem[]>('faq.items'))
//   <RouterLink :to="localePath('/features')">

import { ref, computed, readonly } from 'vue'
import { useRouter } from 'vue-router'
import { fr } from '@/locales/fr'
import { en } from '@/locales/en'

export type Locale = 'fr' | 'en'

// ── Singleton ─────────────────────────────────────────────────
// Source de vérité : URL (via syncLocale depuis le router guard)
// Fallback initial : localStorage → 'fr'
const stored =
  typeof localStorage !== 'undefined'
    ? (localStorage.getItem('erudia_lang') as Locale | null)
    : null

const locale = ref<Locale>(stored ?? 'fr')

/**
 * Appelé par le navigation guard du router pour synchroniser la locale
 * depuis les params d'URL (/:locale) → singleton.
 * Met à jour localStorage afin de persister la préférence.
 */
export function syncLocale(l: Locale) {
  locale.value = l
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('erudia_lang', l)
  }
}

// ── Composable ────────────────────────────────────────────────
export function useLocale() {
  // useRouter() doit être appelé ici (contexte setup), pas dans setLocale
  const router = useRouter()
  const messages = computed(() => (locale.value === 'fr' ? fr : en))

  /**
   * Traduit une clé string pointée (ex: 'nav.features' → 'Fonctionnalités')
   * Retourne la clé elle-même si introuvable (failsafe visible en dev)
   */
  function t(key: string): string {
    const val = key.split('.').reduce((obj: unknown, k) => {
      if (obj && typeof obj === 'object')
        return (obj as Record<string, unknown>)[k]
      return undefined
    }, messages.value as unknown)
    return typeof val === 'string' ? val : key
  }

  /**
   * Récupère une donnée typée (tableau, objet) depuis les locales
   * Utilisé pour les tableaux (FAQ items, catégories, sujets contact…)
   */
  function td<T>(key: string): T {
    const val = key.split('.').reduce((obj: unknown, k) => {
      if (obj && typeof obj === 'object')
        return (obj as Record<string, unknown>)[k]
      return undefined
    }, messages.value as unknown)
    return val as T
  }

  /**
   * Construit un chemin localisé.
   * localePath('/features') → '/fr/features'
   * localePath('/')         → '/fr'
   * Utiliser pour tous les RouterLink internes.
   */
  function localePath(path: string): string {
    const clean = path === '/' ? '' : path
    return `/${locale.value}${clean}`
  }

  /**
   * Change la locale, persiste dans localStorage et navigue vers
   * l'équivalent de la page courante dans la nouvelle langue.
   * Doit être appelé depuis un composant (contexte setup requis pour useRouter).
   */
  function setLocale(l: Locale) {
    const currentPath = router.currentRoute.value.path
    // Remplace le préfixe de locale dans l'URL courante
    const newPath = currentPath.replace(/^\/(fr|en)/, `/${l}`)
    syncLocale(l)
    router.replace(newPath)
  }

  return {
    locale: readonly(locale),
    t,
    td,
    localePath,
    setLocale,
  }
}
