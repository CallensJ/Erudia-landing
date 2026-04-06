<!-- TermsView.vue — Page CGU (Conditions Générales d'Utilisation)
     Délègue tout le rendu à LegalPage avec pageKey="terms" -->
<script setup lang="ts">
import { useSeoHead } from '@/composables/useSeoHead'
import LegalPage from '@/components/legal/LegalPage.vue'

useSeoHead({
  title: {
    fr: 'Conditions Générales d\'Utilisation – Erudia',
    en: 'Terms of Use – Erudia',
  },
  description: {
    fr: 'Conditions générales d\'utilisation d\'Erudia.',
    en: 'Erudia terms of use.',
  },
  path: '/legal/terms',
  noindex: true,
})
</script>

<template>
  <LegalPage page-key="terms" />
</template>
