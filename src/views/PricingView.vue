<!-- PricingView.vue — Page Tarifs
     Assemble les 6 sections. L'état isAnnual (toggle billing) est géré ici
     et transmis en prop aux sections qui en ont besoin (PricingCards). -->
<script setup lang="ts">
import { ref } from 'vue'
import PricingHero from '@/components/sections/pricing/PricingHero.vue'
import PricingCards from '@/components/sections/pricing/PricingCards.vue'
import ValueSection from '@/components/sections/pricing/ValueSection.vue'
import FaqBillingSection from '@/components/sections/pricing/FaqBillingSection.vue'
import GuaranteeSection from '@/components/sections/pricing/GuaranteeSection.vue'

// État du toggle mensuel/annuel — partagé entre PricingHero et PricingCards
const isAnnual = ref(false)
</script>

<template>
  <main>
    <!-- 1. Hero + billing toggle -->
    <PricingHero @billing-change="isAnnual = $event" />

    <!-- 2. Cards Gratuit vs Erudia+ -->
    <PricingCards :is-annual="isAnnual" />

    <!-- 3. Justification de valeur + analogies -->
    <ValueSection />

    <!-- 4. FAQ facturation -->
    <FaqBillingSection />

    <!-- 5. Garanties (fond sombre — rupture visuelle avant CTA) -->
    <GuaranteeSection />

    <!-- Sections à venir section par section -->
  </main>
</template>
