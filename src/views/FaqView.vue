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
import FaqHero           from '@/components/sections/faq/FaqHero.vue'
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
