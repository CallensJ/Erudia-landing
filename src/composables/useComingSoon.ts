// useComingSoon.ts — Composable singleton pour la modal "Arrive bientôt"
// Exposé globalement : toute la landing peut ouvrir la modal sans prop drilling.
// Intègre le tracking GA4 cta_click à l'ouverture de la modal.
import { ref } from 'vue'
import { useAnalytics } from '@/composables/useAnalytics'

const isOpen = ref(false)

export function useComingSoon() {
  const { trackCtaClick } = useAnalytics()

  /**
   * @param label  Identifiant du bouton CTA (ex: 'hero_primary', 'pricing_cta').
   *               Par défaut : 'cta' générique.
   */
  function openModal(label = 'cta') {
    trackCtaClick(label)
    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
  }

  return { isOpen, openModal, closeModal }
}
