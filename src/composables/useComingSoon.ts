// useComingSoon.ts — Composable singleton pour la modal "Arrive bientôt"
// Exposé globalement : toute la landing peut ouvrir la modal sans prop drilling.
import { ref } from 'vue'

const isOpen = ref(false)

export function useComingSoon() {
  function openModal() {
    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
  }

  return { isOpen, openModal, closeModal }
}
