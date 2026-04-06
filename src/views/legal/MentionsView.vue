<!-- MentionsView.vue — Page Mentions légales
     Délègue tout le rendu à LegalPage avec pageKey="mentions" -->
<script setup lang="ts">
import { useSeoHead } from '@/composables/useSeoHead'
import LegalPage from '@/components/legal/LegalPage.vue'

useSeoHead({
  title: {
    fr: 'Mentions légales – Erudia',
    en: 'Legal Notice – Erudia',
  },
  description: {
    fr: 'Mentions légales d\'Erudia — éditeur, hébergement et informations légales.',
    en: 'Erudia legal notice — publisher, hosting and legal information.',
  },
  path: '/legal/mentions',
  noindex: true,
})
</script>

<template>
  <LegalPage page-key="mentions" />
</template>
