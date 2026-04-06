<!-- HomeView.vue — Page d'accueil (route /)
     Assemble les sections de la home page dans l'ordre narratif :
     Hero → Problem → Features → Pedago → PricingTeaser → CTA → FaqMini -->
<script setup lang="ts">
import { useSeoHead } from '@/composables/useSeoHead'
import HeroSection from '@/components/sections/home/HeroSection.vue'

useSeoHead({
  title: {
    fr: 'Erudia – Quiz éducatif offline pour enfants 6-11 ans',
    en: 'Erudia – Educational quiz for kids 6-11, works offline',
  },
  description: {
    fr: 'Erudia combine apprentissage et gamification pour les enfants de 6 à 11 ans. Mode hors ligne, bilingue FR/EN, suivi parental intégré.',
    en: 'Erudia brings learning and fun together for kids aged 6 to 11. Offline mode, bilingual FR/EN, built-in parental dashboard.',
  },
  path: '/',
})
import ProblemSection from '@/components/sections/home/ProblemSection.vue'
import FeaturesSection from '@/components/sections/home/FeaturesSection.vue'
import PedagoSection from '@/components/sections/home/PedagoSection.vue'
import PricingTeaser from '@/components/sections/home/PricingTeaser.vue'
import CtaSection from '@/components/sections/home/CtaSection.vue'
import FaqMini from '@/components/sections/home/FaqMini.vue'
</script>

<template>
  <main>
    <HeroSection />
    <ProblemSection />
    <FeaturesSection />
    <PedagoSection />
    <PricingTeaser />
    <CtaSection />
    <FaqMini />
  </main>
</template>
