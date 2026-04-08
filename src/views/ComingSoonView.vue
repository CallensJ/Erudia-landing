<!-- ComingSoonView.vue — Page "En construction" pleine page
     Affichée sur toutes les routes pendant la période pré-lancement.
     Reprend le design system dark-gradient de la landing (orbes, Nunito, tokens).
     Date cible : 15 avril 2026. -->
<script setup lang="ts">
import { computed } from 'vue'

const launchDate = new Date('2026-04-15T00:00:00')

const daysLeft = computed(() => {
  const now = new Date()
  const diff = launchDate.getTime() - now.getTime()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})
</script>

<template>
  <main class="cs" role="main" aria-label="Page en construction">

    <!-- Orbes décoratifs arrière-plan -->
    <div class="cs__orb cs__orb--1" aria-hidden="true"></div>
    <div class="cs__orb cs__orb--2" aria-hidden="true"></div>
    <div class="cs__orb cs__orb--3" aria-hidden="true"></div>

    <div class="cs__inner">

      <!-- Logo texte -->
      <p class="cs__logo" aria-label="Erudia">Erudia</p>

      <!-- Icône -->
      <div class="cs__icon" aria-hidden="true">🚀</div>

      <!-- Titre -->
      <h1 class="cs__title">En construction</h1>

      <!-- Compte à rebours -->
      <div class="cs__countdown" aria-label="Jours restants avant le lancement">
        <div class="cs__countdown-block">
          <span class="cs__countdown-number">{{ daysLeft }}</span>
          <span class="cs__countdown-label">jours</span>
        </div>
      </div>

      <!-- Date -->
      <p class="cs__date">
        Retour le <strong>15 avril 2026</strong>
      </p>

      <!-- Description -->
      <p class="cs__description">
        Erudia, l'application de quiz éducatif pour les enfants de 6 à 11 ans,
        arrive très bientôt. Apprentissage, gamification et aventure au programme.
      </p>

      <!-- Lien app -->
      <a
        href="https://app.erudia.app"
        class="cs__app-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Accéder à l'application →
      </a>

    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/variables' as v;

// ── Page pleine hauteur ───────────────────────────────────────────────────────
.cs {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0d0d1f 0%, #1a1040 50%, #0d0d1f 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 1.5rem;
  font-family: 'Nunito', sans-serif;

  // ── Orbes décoratifs ──────────────────────────────────────────
  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;

    &--1 {
      width: 500px;
      height: 500px;
      background: rgba(102, 126, 234, 0.18);
      top: -150px;
      right: -100px;
    }

    &--2 {
      width: 400px;
      height: 400px;
      background: rgba(118, 75, 162, 0.15);
      bottom: -120px;
      left: -80px;
    }

    &--3 {
      width: 300px;
      height: 300px;
      background: rgba(255, 215, 0, 0.06);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  // ── Contenu centré ────────────────────────────────────────────
  &__inner {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 520px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  // ── Logo ──────────────────────────────────────────────────────
  &__logo {
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0;
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.9;
  }

  // ── Icône ─────────────────────────────────────────────────────
  &__icon {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 0.25rem;
    animation: float 3s ease-in-out infinite;
  }

  // ── Titre ─────────────────────────────────────────────────────
  &__title {
    font-size: clamp(2rem, 6vw, 3.25rem);
    font-weight: 900;
    margin: 0;
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  // ── Compte à rebours ──────────────────────────────────────────
  &__countdown {
    display: flex;
    justify-content: center;
    margin: 0.25rem 0;
  }

  &__countdown-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.25rem;
    padding: 1.25rem 3rem;
  }

  &__countdown-number {
    font-size: 4rem;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, v.$primary 0%, v.$primary-dark 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__countdown-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.25rem;
  }

  // ── Date ──────────────────────────────────────────────────────
  &__date {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.55);
    margin: 0;

    strong {
      color: #FFD700;
      font-weight: 700;
    }
  }

  // ── Description ───────────────────────────────────────────────
  &__description {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    max-width: 400px;
  }

  // ── Lien app ──────────────────────────────────────────────────
  &__app-link {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.75rem 2rem;
    background: linear-gradient(135deg, v.$primary 0%, v.$primary-dark 100%);
    color: white;
    font-weight: 700;
    font-size: 0.95rem;
    border-radius: 999px;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;

    &:hover {
      opacity: 0.88;
      transform: translateY(-2px);
    }
  }
}

// ── Animation flottante ───────────────────────────────────────────────────────
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
</style>
