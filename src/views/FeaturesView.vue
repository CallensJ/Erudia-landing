<!-- FeaturesView.vue — Page Fonctionnalités
     Sections :
     1. FeaturesHero        — hero + 3 onglets (enfant / parent / contenu)
     2. ChildFeaturesGrid   — 6 cartes fonctionnalités enfant [tab: child]
     3. NovaShowcase           — mascotte Nova, 4 poses interactives [tab: child]
     4. ParentFeaturesSection     — 6 items + mockup admin [tab: parent]
     5. ContentPhilosophySection  — philosophie + tableau curriculum + 9 catégories [tab: content]
     6. ComparisonSection         — tableau Erudia vs concurrents (toujours visible)
     7. FeaturesCtaSection        — CTA finale (toujours visible)

     activeTab : état partagé entre FeaturesHero et les sections ongletées -->
<script setup lang="ts">
import { ref } from 'vue'
import FeaturesHero      from '@/components/sections/features/FeaturesHero.vue'
import ChildFeaturesGrid from '@/components/sections/features/ChildFeaturesGrid.vue'
import NovaShowcase           from '@/components/sections/features/NovaShowcase.vue'
import ParentFeaturesSection   from '@/components/sections/features/ParentFeaturesSection.vue'
import ContentPhilosophySection from '@/components/sections/features/ContentPhilosophySection.vue'
import ComparisonSection        from '@/components/sections/features/ComparisonSection.vue'
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

    <!-- Comparatif — toujours visible -->
    <ComparisonSection />

    <!-- CTA finale — toujours visible -->
    <FeaturesCtaSection />
  </main>
</template>
