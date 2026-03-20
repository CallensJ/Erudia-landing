<!-- ContactView.vue — Page Contact
     Assemble les 4 sections :
     1. ContactHero       — hero sombre, titre + carte contact (email/studio/localisation)
     2. ContactFormSection — formulaire + sidebar topics cliquables
     3. BehindErudiaSection — l'histoire de l'app (bio Johan + photos)
     4. ContactCtaSection  — CTA finale (essayer / voir les tarifs) -->
<script setup lang="ts">
import ContactHero        from '@/components/sections/contact/ContactHero.vue'
import ContactFormSection from '@/components/sections/contact/ContactFormSection.vue'
import BehindErudiaSection from '@/components/sections/contact/BehindErudiaSection.vue'
import ContactCtaSection  from '@/components/sections/contact/ContactCtaSection.vue'
</script>

<template>
  <main>
    <!-- 1. Hero sombre + carte contact -->
    <ContactHero />

    <!-- 2. Formulaire + topics sidebar -->
    <ContactFormSection />

    <!-- 3. L'histoire derrière Erudia (bio + photos) -->
    <BehindErudiaSection />

    <!-- 4. CTA finale -->
    <ContactCtaSection />
  </main>
</template>
