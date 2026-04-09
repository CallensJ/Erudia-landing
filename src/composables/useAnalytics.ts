// useAnalytics.ts — Wrapper GA4 centralisé pour la landing Erudia
// Expose trackPageView, trackCtaClick, trackFormSubmit.
// Vérifie la présence de gtag avant chaque appel (évite les erreurs si bloqueur pub).

declare function gtag(...args: unknown[]): void

function safeGtag(...args: Parameters<typeof gtag>) {
  if (typeof gtag !== 'undefined') {
    gtag(...args)
  }
}

export function useAnalytics() {
  /**
   * Envoie un page_view avec le titre et l'URL courants.
   * À appeler dans router.afterEach().
   */
  function trackPageView(path: string, title?: string) {
    safeGtag('event', 'page_view', {
      page_path: path,
      page_title: title ?? document.title,
    })
  }

  /**
   * Déclenché quand l'utilisateur clique sur un CTA.
   * @param label  Identifiant du bouton (ex: 'hero_primary', 'pricing_cta')
   * @param source Page ou section d'origine (ex: '/fr', '/fr/pricing')
   */
  function trackCtaClick(label: string, source?: string) {
    safeGtag('event', 'cta_click', {
      cta_label: label,
      page_source: source ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
    })
  }

  /**
   * Déclenché après la soumission réussie d'un formulaire.
   * @param formId  Identifiant du formulaire (ex: 'contact')
   */
  function trackFormSubmit(formId: string) {
    safeGtag('event', 'form_submit', {
      form_id: formId,
      page_source: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  }

  return { trackPageView, trackCtaClick, trackFormSubmit }
}
