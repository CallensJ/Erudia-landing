<!-- AboutView.vue — Page À propos d'Erudia
     Assemble 5 sections :
     1. AboutHero         — hero sombre, titre percutant
     2. BehindErudiaSection — l'histoire de Johan + sa fille (déplacée depuis Contact)
     3. VisionSection     — §1.4 Vision éditoriale (pourquoi 500 questions)
     4. FleSection        — positionnement EN comme préparation culturelle française
     5. AboutCtaSection   — CTA finale -->
<script setup lang="ts">
import { useSeoHead } from '@/composables/useSeoHead'
import { useBreadcrumbJsonLd } from '@/composables/useJsonLd'
import AboutHero          from '@/components/sections/about/AboutHero.vue'
import BehindErudiaSection from '@/components/sections/contact/BehindErudiaSection.vue'
import VisionSection      from '@/components/sections/about/VisionSection.vue'
import FleSection         from '@/components/sections/about/FleSection.vue'
import AboutCtaSection    from '@/components/sections/about/AboutCtaSection.vue'

useBreadcrumbJsonLd({
  label: { fr: 'À propos', en: 'About' },
  path: '/about',
})

useSeoHead({
  title: {
    fr: 'À propos – Erudia, quiz éducatif pour enfants',
    en: 'About – Erudia educational quiz for kids',
  },
  description: {
    fr: "L'histoire d'Erudia : un papa développeur, une petite fille franco-philippine et la conviction qu'apprendre peut vraiment être fun. Découvrez la vision pédagogique derrière 20 catégories et 500+ questions.",
    en: "The story behind Erudia: a developer dad, a half-Filipino daughter, and the conviction that learning can truly be fun. Discover the editorial vision behind 20 categories and 500+ questions.",
  },
  path: '/about',
})
</script>

<template>
  <main>
    <!-- 1. Hero sombre -->
    <AboutHero />

    <!-- 2. L'histoire derrière Erudia (bio Johan + sa fille) -->
    <BehindErudiaSection />

    <!-- 3. Vision éditoriale — pourquoi cette densité de contenu -->
    <VisionSection />

    <!-- 4. Positionnement version EN comme outil FLE -->
    <FleSection />

    <!-- 5. CTA finale -->
    <AboutCtaSection />
  </main>
</template>
