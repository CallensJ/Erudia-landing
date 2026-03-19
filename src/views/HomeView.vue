<!-- HomeView.vue — Page d'accueil (route /)
     Assemble les sections de la home page.
     Pour l'instant : Hero uniquement. Les autres sections seront ajoutées itérativement. -->
<script setup lang="ts">
import HeroSection from '@/components/sections/home/HeroSection.vue'
import ProblemSection from '@/components/sections/home/ProblemSection.vue'
import FeaturesSection from '@/components/sections/home/FeaturesSection.vue'
</script>

<template>
  <main>
    <HeroSection />
    <ProblemSection />
    <FeaturesSection />
    <!-- Sections à venir : Testimonials, PricingTeaser, CtaSection, FaqMini -->
  </main>
</template>
