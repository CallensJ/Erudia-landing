<!-- HowItWorksView.vue — Page "Comment ça marche"
     Assemble les 6 sections dans l'ordre.
     L'état audience (child/parent) est géré ici et transmis aux sections concernées. -->
<script setup lang="ts">
import { ref } from 'vue'
import HowItWorksHero from '@/components/sections/how-it-works/HowItWorksHero.vue'
import ChildStepsSection from '@/components/sections/how-it-works/ChildStepsSection.vue'
import ParentJourneySection from '@/components/sections/how-it-works/ParentJourneySection.vue'
import TipsSection from '@/components/sections/how-it-works/TipsSection.vue'
import OfflineSection from '@/components/sections/how-it-works/OfflineSection.vue'
import HowItWorksCtaSection from '@/components/sections/how-it-works/HowItWorksCtaSection.vue'

// Contrôle quel parcours est affiché (enfant ou parent)
// Piloté par le switcher dans HowItWorksHero via événement
const audience = ref<'child' | 'parent'>('child')
</script>

<template>
  <main>
    <!-- 1. Hero + switcher audience -->
    <HowItWorksHero @audience-change="audience = $event" />

    <!-- 2. Parcours enfant — 5 étapes en timeline -->
    <ChildStepsSection v-show="audience === 'child'" />

    <!-- 3. Parcours parent — 3 cards -->
    <ParentJourneySection v-show="audience === 'parent'" />

    <!-- 4. Conseils pour bien démarrer (commun aux deux audiences) -->
    <TipsSection />

    <!-- 5. Mode hors ligne PWA -->
    <OfflineSection />

    <!-- 6. CTA final -->
    <HowItWorksCtaSection />
  </main>
</template>
