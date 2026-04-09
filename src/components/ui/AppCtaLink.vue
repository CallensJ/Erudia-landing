<!-- AppCtaLink.vue — Lien CTA centralisé vers l'application Erudia
     Utilisé par tous les boutons "Jouer" / "Essayer" de la landing.
     Pour changer l'URL de destination, modifier uniquement APP_URL ici. -->
<script setup lang="ts">
const APP_URL = 'https://app.erudia.app'
</script>

<template>
  <a
    :href="APP_URL"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>
