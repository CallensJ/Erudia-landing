<!-- PricingView.vue — Page Tarifs
     Assemble les 6 sections. L'état isAnnual (toggle billing) est géré ici
     et transmis en prop aux sections qui en ont besoin (PricingCards). -->
<script setup lang="ts">
import { ref } from 'vue'
import { useSeoHead } from '@/composables/useSeoHead'
import { useBreadcrumbJsonLd } from '@/composables/useJsonLd'
import PricingHero from '@/components/sections/pricing/PricingHero.vue'

// 6.5 BreadcrumbList (section 6 SEO checklist)
useBreadcrumbJsonLd({ label: { fr: 'Tarifs', en: 'Pricing' }, path: '/pricing' })

useSeoHead({
  title: {
    fr: 'Tarifs – Erudia quiz éducatif | 4,99 €/mois',
    en: 'Pricing – Erudia educational quiz | €4.99/month',
  },
  description: {
    fr: 'Erudia est gratuit pour commencer. Passez Premium à 4,99 €/mois ou 39,99 €/an pour débloquer toutes les catégories et fonctionnalités.',
    en: 'Erudia is free to start. Go Premium at €4.99/month or €39.99/year to unlock all categories and features.',
  },
  path: '/pricing',
})
import PricingCards from '@/components/sections/pricing/PricingCards.vue'
import ValueSection from '@/components/sections/pricing/ValueSection.vue'
import FaqBillingSection from '@/components/sections/pricing/FaqBillingSection.vue'
import GuaranteeSection from '@/components/sections/pricing/GuaranteeSection.vue'
import PricingCtaSection from '@/components/sections/pricing/PricingCtaSection.vue'

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

    <!-- 6. CTA final -->
    <PricingCtaSection />
  </main>
</template>
