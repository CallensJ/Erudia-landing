// useCookieConsent.ts — Composable singleton pour la bannière cookie RGPD
// Partage l'état visible entre CookieConsent.vue et AppFooter.vue (lien "Gestion des cookies").
//
// Stockage : cookie first-party "erudia_consent" (max-age 13 mois)
// Format JSON : { consent_id, timestamp, policy_version, choices: { analytics }, source }
//
// Utilisation :
//   const { isVisible, openBanner, getConsent, hasConsented } = useCookieConsent()

import { ref, readonly } from 'vue'

// ── Types ──────────────────────────────────────────────────────────────────────
export interface ConsentRecord {
  consent_id:     string
  timestamp:      string
  policy_version: string
  choices: {
    analytics: boolean
  }
  source: 'landing'
}

// ── Constantes ─────────────────────────────────────────────────────────────────
const COOKIE_NAME     = 'erudia_consent'
const POLICY_VERSION  = 'v1.1'
const MAX_AGE_SECONDS = 34_164_000 // 13 mois

// ── Helpers cookie natifs ──────────────────────────────────────────────────────

/** Lit un cookie par son nom. Retourne null si absent. */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

/** Écrit un cookie first-party avec max-age de 13 mois, SameSite=Lax. */
function setCookie(name: string, value: string): void {
  if (typeof document === 'undefined') return
  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `max-age=${MAX_AGE_SECONDS}`,
    'path=/',
    'SameSite=Lax',
  ].join('; ')
}

/** Génère un UUID v4 simple (sans dépendance externe). */
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

// ── Singleton module-level ─────────────────────────────────────────────────────
const isVisible = ref(false)

// ── Composable ─────────────────────────────────────────────────────────────────
export function useCookieConsent() {

  /**
   * Lit le consentement stocké dans le cookie.
   * Retourne null si absent ou JSON invalide.
   */
  function getConsent(): ConsentRecord | null {
    const raw = getCookie(COOKIE_NAME)
    if (!raw) return null
    try {
      return JSON.parse(raw) as ConsentRecord
    } catch {
      return null
    }
  }

  /**
   * Vérifie si l'utilisateur a déjà fait un choix (accepté ou refusé).
   * Retourne false si le cookie est absent ou si la version de politique a changé.
   */
  function hasConsented(): boolean {
    const record = getConsent()
    return !!record && record.policy_version === POLICY_VERSION
  }

  /** Ouvre la bannière (ex: lien "Gestion des cookies" dans le footer). */
  function openBanner(): void {
    isVisible.value = true
  }

  /** Ferme la bannière sans enregistrer de choix (usage interne). */
  function closeBanner(): void {
    isVisible.value = false
  }

  /**
   * Enregistre le choix, met à jour gtag Consent Mode v2, ferme la bannière.
   * @param analytics - true = accepté, false = refusé
   */
  function saveChoice(analytics: boolean): void {
    const record: ConsentRecord = {
      consent_id:     uuidv4(),
      timestamp:      new Date().toISOString(),
      policy_version: POLICY_VERSION,
      choices:        { analytics },
      source:         'landing',
    }
    setCookie(COOKIE_NAME, JSON.stringify(record))

    // Mise à jour GA4 Consent Mode v2
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: 'denied', // jamais de pub
      })
    }

    closeBanner()
  }

  return {
    isVisible: readonly(isVisible),
    openBanner,
    closeBanner,
    saveChoice,
    getConsent,
    hasConsented,
  }
}
