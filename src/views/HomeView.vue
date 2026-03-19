<!-- HomeView.vue — Page d'accueil (route /)
     Assemble les sections de la home page.
     Pour l'instant : Hero uniquement. Les autres sections seront ajoutées itérativement. -->
<script setup lang="ts">
import HeroSection from '@/components/sections/home/HeroSection.vue'
import ProblemSection from '@/components/sections/home/ProblemSection.vue'
import FeaturesSection from '@/components/sections/home/FeaturesSection.vue'
import MomentsSection from '@/components/sections/home/MomentsSection.vue'
import PricingTeaser from '@/components/sections/home/PricingTeaser.vue'
</script>

<template>
  <main>
    <HeroSection />
    <ProblemSection />
    <FeaturesSection />
    <MomentsSection />
    <PricingTeaser />
    <!-- Sections à venir : CtaSection, FaqMini -->
  </main>
</template>
