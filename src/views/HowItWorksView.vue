<!-- HowItWorksView.vue — Page "Comment ça marche"
     Assemblage des 6 sections de la page.
     L'audience (child/parent) est gérée ici et passée aux sections concernées. -->
<script setup lang="ts">
import { ref } from 'vue'
import HowItWorksHero from '@/components/sections/how-it-works/HowItWorksHero.vue'

// Contrôle quel parcours est affiché (enfant ou parent)
// Piloté par le switcher dans HowItWorksHero via événement
const audience = ref<'child' | 'parent'>('child')
</script>

<template>
  <main>
    <HowItWorksHero @audience-change="audience = $event" />

    <!-- Sections à venir (section par section) -->
    <!-- <ChildStepsSection v-show="audience === 'child'" /> -->
    <!-- <ParentJourneySection v-show="audience === 'parent'" /> -->
    <!-- <TipsSection /> -->
    <!-- <OfflineSection /> -->
    <!-- <HowItWorksCtaSection /> -->
  </main>
</template>
