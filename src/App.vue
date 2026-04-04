<!-- App.vue — Composant racine
     Structure : Header fixe + RouterView (pages)
     Le header est global à toutes les pages. -->
<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ComingSoonModal from '@/components/ui/ComingSoonModal.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <ComingSoonModal />
</template>
