<!-- FaqView.vue — Page FAQ
     Assemble les 4 sections :
     1. FaqHero          — hero sombre, titre, barre de recherche glassmorphisme
     2. FaqContent       — sidebar catégories + accordéon filtrable (33 Q&R)
     3. FaqContactSection — "Une question sans réponse ici ?" → /contact
     4. FaqCtaSection    — "Convaincu ? Lancez-vous." → app + tarifs

     Gestion d'état :
     - searchQuery : chaîne de recherche, propagée de FaqHero → FaqContent
     - resultCount : compte renvoyé par FaqContent → FaqHero (compteur live) -->
<script setup lang="ts">
import { ref } from 'vue'
import { useSeoHead } from '@/composables/useSeoHead'
import { useFaqPageJsonLd, useBreadcrumbJsonLd } from '@/composables/useJsonLd'
import FaqHero           from '@/components/sections/faq/FaqHero.vue'

// 6.4 FAQPage + 6.5 BreadcrumbList (section 6 SEO checklist)
useFaqPageJsonLd()
useBreadcrumbJsonLd({ label: { fr: 'FAQ', en: 'FAQ' }, path: '/faq' })

useSeoHead({
  title: {
    fr: 'Questions fréquentes – Erudia quiz éducatif enfants',
    en: 'FAQ – Erudia educational quiz for kids',
  },
  description: {
    fr: 'Toutes les réponses à vos questions sur Erudia : fonctionnement, abonnement, données enfants, mode hors ligne et support.',
    en: 'All your questions about Erudia answered: how it works, subscription, children\'s data, offline mode and support.',
  },
  path: '/faq',
})
import FaqContent        from '@/components/sections/faq/FaqContent.vue'
import FaqContactSection from '@/components/sections/faq/FaqContactSection.vue'
import FaqCtaSection     from '@/components/sections/faq/FaqCtaSection.vue'

const searchQuery  = ref('')
const resultCount  = ref<number | null>(null)

function onSearchChange(query: string) {
  searchQuery.value = query
  if (!query) resultCount.value = null
}

function onResultCount(n: number) {
  resultCount.value = n
}
</script>

<template>
  <main>
    <!-- 1. Hero + barre de recherche -->
    <FaqHero
      :result-count="resultCount"
      @search-change="onSearchChange"
    />

    <!-- 2. Sidebar catégories + accordéon -->
    <FaqContent
      :search-query="searchQuery"
      @result-count="onResultCount"
    />

    <!-- 3. Bloc "question sans réponse ?" → contact Johan -->
    <FaqContactSection />

    <!-- 4. CTA finale -->
    <FaqCtaSection />
  </main>
</template>
