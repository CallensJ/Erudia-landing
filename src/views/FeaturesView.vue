<!-- FeaturesView.vue — Page Fonctionnalités
     Sections :
     1. FeaturesHero    — hero + 3 onglets (enfant / parent / contenu)
     [à venir] ChildFeaturesGrid, NovaShowcase, ParentFeaturesSection,
               ContentPhilosophySection, ComparisonSection, FeaturesCtaSection

     activeTab : état partagé entre FeaturesHero et les sections ongletées -->
<script setup lang="ts">
import { ref } from 'vue'
import FeaturesHero from '@/components/sections/features/FeaturesHero.vue'

type Tab = 'child' | 'parent' | 'content'

const activeTab = ref<Tab>('child')
</script>

<template>
  <main>
    <FeaturesHero @tab-change="activeTab = $event" />
    <!-- sections suivantes ici -->
  </main>
</template>
