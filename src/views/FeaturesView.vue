<!-- FeaturesView.vue — Page Fonctionnalités
     Sections :
     1. FeaturesHero        — hero + 3 onglets (enfant / parent / contenu)
     2. ChildFeaturesGrid   — 6 cartes fonctionnalités enfant [tab: child]
     3. NovaShowcase           — mascotte Nova, 4 poses interactives [tab: child]
     4. ParentFeaturesSection  — 6 items + mockup admin [tab: parent]
     [à venir] ContentPhilosophySection, ComparisonSection, FeaturesCtaSection
               ContentPhilosophySection, ComparisonSection, FeaturesCtaSection

     activeTab : état partagé entre FeaturesHero et les sections ongletées -->
<script setup lang="ts">
import { ref } from 'vue'
import FeaturesHero      from '@/components/sections/features/FeaturesHero.vue'
import ChildFeaturesGrid from '@/components/sections/features/ChildFeaturesGrid.vue'
import NovaShowcase           from '@/components/sections/features/NovaShowcase.vue'
import ParentFeaturesSection from '@/components/sections/features/ParentFeaturesSection.vue'

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

    <!-- [à venir] onglet contenu, comparatif, CTA -->
  </main>
</template>
