<!-- PrivacyView.vue — Page Politique de confidentialité
     Délègue tout le rendu à LegalPage avec pageKey="privacy" -->
<script setup lang="ts">
import { useSeoHead } from '@/composables/useSeoHead'
import LegalPage from '@/components/legal/LegalPage.vue'

useSeoHead({
  title: {
    fr: 'Politique de confidentialité – Erudia',
    en: 'Privacy Policy – Erudia',
  },
  description: {
    fr: 'Politique de confidentialité d\'Erudia — traitement des données, conformité COPPA et RGPD.',
    en: 'Erudia privacy policy — data handling, COPPA and GDPR compliance.',
  },
  path: '/legal/privacy',
  noindex: true,
})
</script>

<template>
  <LegalPage page-key="privacy" />
</template>
