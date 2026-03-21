// useLocale.ts — Composable i18n léger pour la landing Erudia
// Singleton module-level : le même ref `locale` est partagé entre TOUS les composants
// Usage :
//   const { t, td, locale, setLocale } = useLocale()
//   {{ t('nav.features') }}
//   const items = computed(() => td<FaqItem[]>('faq.items'))

import { ref, computed, readonly } from 'vue'
import { fr } from '@/locales/fr'
import { en } from '@/locales/en'

export type Locale = 'fr' | 'en'

// ── Singleton ─────────────────────────────────────────────────
// Persiste la préférence dans localStorage
const stored = typeof localStorage !== 'undefined'
  ? (localStorage.getItem('erudia_lang') as Locale | null)
  : null

const locale = ref<Locale>(stored ?? 'fr')

// ── Composable ────────────────────────────────────────────────
export function useLocale() {
  const messages = computed(() => locale.value === 'fr' ? fr : en)

  /**
   * Traduit une clé string pointée (ex: 'nav.features' → 'Fonctionnalités')
   * Retourne la clé elle-même si introuvable (failsafe visible en dev)
   */
  function t(key: string): string {
    const val = key.split('.').reduce((obj: unknown, k) => {
      if (obj && typeof obj === 'object') return (obj as Record<string, unknown>)[k]
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
      if (obj && typeof obj === 'object') return (obj as Record<string, unknown>)[k]
      return undefined
    }, messages.value as unknown)
    return val as T
  }

  /** Change la locale et persist dans localStorage */
  function setLocale(l: Locale) {
    locale.value = l
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('erudia_lang', l)
    }
  }

  return {
    locale: readonly(locale),
    t,
    td,
    setLocale,
  }
}
