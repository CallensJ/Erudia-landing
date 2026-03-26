<!-- FeaturesView.vue — Page Fonctionnalités
     Sections :
     1. FeaturesHero        — hero + 3 onglets (enfant / parent / contenu)
     2. ChildFeaturesGrid   — 6 cartes fonctionnalités enfant [tab: child]
     [à venir] NovaShowcase, ParentFeaturesSection,
               ContentPhilosophySection, ComparisonSection, FeaturesCtaSection

     activeTab : état partagé entre FeaturesHero et les sections ongletées -->
<script setup lang="ts">
import { ref } from 'vue'
import FeaturesHero      from '@/components/sections/features/FeaturesHero.vue'
import ChildFeaturesGrid from '@/components/sections/features/ChildFeaturesGrid.vue'

type Tab = 'child' | 'parent' | 'content'

const activeTab = ref<Tab>('child')
</script>

<template>
  <main>
    <FeaturesHero @tab-change="activeTab = $event" />

    <!-- Onglet : Pour l'enfant -->
    <div v-show="activeTab === 'child'">
      <ChildFeaturesGrid />
    </div>

    <!-- [à venir] onglet parent, onglet contenu, comparatif, CTA -->
  </main>
</template>
