<!-- FeaturesView.vue — Page Fonctionnalités
     Sections :
     1. FeaturesHero        — hero + 3 onglets (enfant / parent / contenu)
     2. ChildFeaturesGrid   — 6 cartes fonctionnalités enfant [tab: child]
     3. NovaShowcase           — mascotte Nova, 4 poses interactives [tab: child]
     4. ParentFeaturesSection     — 6 items + mockup admin [tab: parent]
     5. ContentPhilosophySection  — philosophie + tableau curriculum + 9 catégories [tab: content]
     6. ConvictionsSection        — 6 convictions techniques & pédagogiques (toujours visible)
     7. FeaturesCtaSection        — CTA finale (toujours visible)

     activeTab : état partagé entre FeaturesHero et les sections ongletées -->
<script setup lang="ts">
import { ref } from 'vue'
import { useSeoHead } from '@/composables/useSeoHead'
import { useBreadcrumbJsonLd } from '@/composables/useJsonLd'
import FeaturesHero      from '@/components/sections/features/FeaturesHero.vue'

// 6.5 BreadcrumbList (section 6 SEO checklist)
useBreadcrumbJsonLd({ label: { fr: 'Fonctionnalités', en: 'Features' }, path: '/features' })

useSeoHead({
  title: {
    fr: 'Fonctionnalités – Erudia, quiz éducatif enfants',
    en: 'Features – Erudia, educational quiz for kids',
  },
  description: {
    fr: 'Découvrez toutes les fonctionnalités d\'Erudia : quiz adaptatifs, mode hors ligne, avatars, badges, défis quotidiens et suivi parental.',
    en: 'Explore Erudia\'s features: adaptive quizzes, offline mode, avatars, badges, daily challenges and parental dashboard.',
  },
  path: '/features',
})
import ChildFeaturesGrid from '@/components/sections/features/ChildFeaturesGrid.vue'
import NovaShowcase           from '@/components/sections/features/NovaShowcase.vue'
import ParentFeaturesSection   from '@/components/sections/features/ParentFeaturesSection.vue'
import ContentPhilosophySection from '@/components/sections/features/ContentPhilosophySection.vue'
import ConvictionsSection      from '@/components/sections/features/ConvictionsSection.vue'
import FeaturesCtaSection      from '@/components/sections/features/FeaturesCtaSection.vue'

type Tab = 'child' | 'parent' | 'content'

const activeTab = ref<Tab>('child')
</script>

<template>
  <main>
    <FeaturesHero @tab-change="activeTab = $event" />

    <!-- Onglet : Pour l'enfant -->
    <div v-show="activeTab === 'child'">
      <ChildFeaturesGrid />
      <NovaShowcase />
    </div>

    <!-- Onglet : Pour le parent -->
    <div v-show="activeTab === 'parent'">
      <ParentFeaturesSection />
    </div>

    <!-- Onglet : Le contenu -->
    <div v-show="activeTab === 'content'">
      <ContentPhilosophySection />
    </div>

    <!-- Convictions — toujours visible -->
    <ConvictionsSection />

    <!-- CTA finale — toujours visible -->
    <FeaturesCtaSection />
  </main>
</template>
