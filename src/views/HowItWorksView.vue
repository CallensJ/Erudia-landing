<!-- HowItWorksView.vue — Page "Comment ça marche"
     Assemblage des 6 sections de la page.
     L'audience (child/parent) est gérée ici et passée aux sections concernées. -->
<script setup lang="ts">
import { ref } from 'vue'
import HowItWorksHero from '@/components/sections/how-it-works/HowItWorksHero.vue'
import ChildStepsSection from '@/components/sections/how-it-works/ChildStepsSection.vue'
import ParentJourneySection from '@/components/sections/how-it-works/ParentJourneySection.vue'

// Contrôle quel parcours est affiché (enfant ou parent)
// Piloté par le switcher dans HowItWorksHero via événement
const audience = ref<'child' | 'parent'>('child')
</script>

<template>
  <main>
    <HowItWorksHero @audience-change="audience = $event" />

    <!-- Section 2 : parcours enfant (visible quand audience = child) -->
    <ChildStepsSection v-show="audience === 'child'" />

    <!-- Section 3 : parcours parent (visible quand audience = parent) -->
    <ParentJourneySection v-show="audience === 'parent'" />

    <!-- Sections à venir (section par section) -->
    <!-- <TipsSection /> -->
    <!-- <OfflineSection /> -->
    <!-- <HowItWorksCtaSection /> -->
  </main>
</template>
