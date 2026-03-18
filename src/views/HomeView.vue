<!-- HomeView.vue — Page d'accueil (route /)
     Assemble les sections de la home page.
     Pour l'instant : Hero uniquement. Les autres sections seront ajoutées itérativement. -->
<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
</script>

<template>
  <main>
    <HeroSection />
    <!-- Sections à venir : Problem, Features, Pedagogie, Testimonials, Pricing, FAQ, CTA -->
  </main>
</template>
