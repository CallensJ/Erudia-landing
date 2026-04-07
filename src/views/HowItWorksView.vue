<!-- HowItWorksView.vue — Page "Comment ça marche"
     Assemble les 6 sections dans l'ordre.
     L'état audience (child/parent) est géré ici et transmis aux sections concernées. -->
<script setup lang="ts">
import { ref } from 'vue'
import { useSeoHead } from '@/composables/useSeoHead'
import { useBreadcrumbJsonLd } from '@/composables/useJsonLd'
import HowItWorksHero from '@/components/sections/how-it-works/HowItWorksHero.vue'

// 6.5 BreadcrumbList (section 6 SEO checklist)
useBreadcrumbJsonLd({ label: { fr: 'Comment ça marche', en: 'How it works' }, path: '/how-it-works' })

useSeoHead({
  title: {
    fr: 'Comment ça marche – Erudia quiz éducatif enfants',
    en: 'How it works – Erudia educational quiz for kids',
  },
  description: {
    fr: 'Comment Erudia fonctionne : créez un profil, choisissez une catégorie et jouez même sans connexion. Conçu pour les enfants dès 6 ans.',
    en: 'How Erudia works: create a profile, pick a category and play even without internet. Designed for kids from age 6.',
  },
  path: '/how-it-works',
})
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
