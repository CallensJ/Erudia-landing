<!-- HowItWorksHero.vue — Section hero de la page "Comment ça marche"
     - Fond sombre gradient hero
     - Orbes flous en arrière-plan
     - Titre + subline
     - Audience switcher (enfant / parent) → émet 'audience-change' vers HowItWorksView
     - Wave SVG de transition vers fond blanc -->
<script setup lang="ts">
import { ref } from 'vue'

// audience contrôle quel parcours est affiché en dessous
const audience = ref<'child' | 'parent'>('child')

const emit = defineEmits<{
  'audience-change': [value: 'child' | 'parent']
}>()

function setAudience(value: 'child' | 'parent') {
  audience.value = value
  emit('audience-change', value)
}
</script>

<template>
  <section class="hiw-hero" aria-label="Comment ça marche — introduction">

    <!-- Orbes gradient flou -->
    <div class="hiw-hero__orb hiw-hero__orb--1" aria-hidden="true"></div>
    <div class="hiw-hero__orb hiw-hero__orb--2" aria-hidden="true"></div>

    <div class="container">
      <div class="hiw-hero__content">

        <!-- Pill étiquette -->
        <div class="pill pill--white label hiw-hero__pill">
          ✨ Comment ça marche
        </div>

        <!-- Titre principal -->
        <h1 class="hiw-hero__title">
          Prêt en <span class="hiw-hero__accent">30 secondes.</span><br />
          Simple comme bonjour.
        </h1>

        <!-- Sous-titre ton parent-to-parent -->
        <p class="hiw-hero__subline">
          Pas de compte email pour l'enfant, pas d'inscription interminable.<br />
          Un pseudo, un avatar — et c'est parti pour apprendre en s'amusant.
        </p>

        <!-- Audience switcher : enfant / parent -->
        <div class="hiw-hero__switcher" role="group" aria-label="Choisir le parcours">
          <button
            class="hiw-hero__aud-btn"
            :class="{ 'hiw-hero__aud-btn--active': audience === 'child' }"
            @click="setAudience('child')"
            :aria-pressed="audience === 'child'"
          >
            🎮 Parcours enfant
          </button>
          <button
            class="hiw-hero__aud-btn"
            :class="{ 'hiw-hero__aud-btn--active': audience === 'parent' }"
            @click="setAudience('parent')"
            :aria-pressed="audience === 'parent'"
          >
            👨‍👩‍👧 Parcours parent
          </button>
        </div>

      </div>
    </div>

    <!-- Wave de transition vers fond blanc -->
    <svg
      class="hiw-hero__wave"
      viewBox="0 0 1440 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M0 48H1440V12C1200 40 960 48 720 36C480 24 240 4 0 12V48Z" fill="#ffffff" />
    </svg>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section hero ──────────────────────────────────────────────
.hiw-hero {
  background: var(--gradient-hero);
  padding-top: calc(var(--header-h) + 72px);
  padding-bottom: 0;
  position: relative;
  overflow: hidden;

  // ── Orbes flous ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  &__orb--1 {
    width: 500px;
    height: 500px;
    background: #667eea;
    opacity: 0.2;
    top: -150px;
    right: -100px;
  }

  &__orb--2 {
    width: 350px;
    height: 350px;
    background: #FFD700;
    opacity: 0.08;
    bottom: 0;
    left: 5%;
  }

  // ── Contenu centré ──
  &__content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding-bottom: 64px;
  }

  // Pill étiquette
  &__pill {
    margin-bottom: 20px;
    display: inline-flex;
  }

  // Titre H1
  &__title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: white;
    margin-bottom: 20px;
    animation: fadeInDown 0.6s ease both;
  }

  // Mot accent en gradient or
  &__accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  // Sous-titre
  &__subline {
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.75;
    max-width: 560px;
    margin: 0 auto 40px;
    animation: fadeInDown 0.6s 0.1s ease both;
  }

  // ── Switcher audience ──
  &__switcher {
    display: inline-flex;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--radius-full);
    padding: 5px;
    gap: 4px;
    backdrop-filter: blur(12px);
    animation: fadeInDown 0.6s 0.2s ease both;
  }

  &__aud-btn {
    padding: 10px 22px;
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.6);
    transition: all var(--transition);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;

    &--active {
      background: white;
      color: var(--color-primary-dark);
      box-shadow: var(--shadow-md);
    }

    &:hover:not(&--active) {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  // ── Wave de transition ──
  &__wave {
    display: block;
    width: 100%;
    margin-top: 48px;
    line-height: 0;
    height: 48px;
  }
}

// ── Animations ───────────────────────────────────────────────
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
