<!-- HomeView.vue — Page d'accueil (route /)
     Assemble les sections de la home page dans l'ordre narratif :
     Hero → Problem → Features → Pedago → PricingTeaser → CTA → FaqMini -->
<script setup lang="ts">
import HeroSection from '@/components/sections/home/HeroSection.vue'
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
