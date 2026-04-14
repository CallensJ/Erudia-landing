<!-- AboutHero.vue — Hero de la page À propos
     - Fond dégradé sombre (même tonalité que ContactHero)
     - Layout centré, titre percutant, wave SVG de sortie
     - Accent visuel : timeline/badges qui évoquent l'histoire du projet -->
<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { t } = useLocale()
</script>

<template>
  <section class="about-hero" aria-labelledby="about-hero-title">

    <!-- Orbes décoratifs -->
    <div class="about-hero__orb about-hero__orb--1" aria-hidden="true"></div>
    <div class="about-hero__orb about-hero__orb--2" aria-hidden="true"></div>
    <div class="about-hero__orb about-hero__orb--3" aria-hidden="true"></div>

    <div class="container">
      <div class="about-hero__inner">

        <!-- Pill -->
        <div class="pill pill--white label">{{ t('about.hero.pill') }}</div>

        <!-- Titre -->
        <h1 id="about-hero-title" class="about-hero__title">
          {{ t('about.hero.title') }}<br>
          <span class="about-hero__title-accent">{{ t('about.hero.titleAccent') }}</span>
        </h1>

        <!-- Sous-titre -->
        <p class="about-hero__sub">{{ t('about.hero.subline') }}</p>

        <!-- Badges décoratifs qui racontent l'histoire -->
        <div class="about-hero__badges" aria-hidden="true">
          <div class="about-hero__badge">
            <span class="about-hero__badge-emoji">👨‍👧</span>
            <span>Papa dev</span>
          </div>
          <div class="about-hero__badge about-hero__badge--accent">
            <span class="about-hero__badge-emoji">🇵🇭 → 🇫🇷</span>
            <span>Manila → France</span>
          </div>
          <div class="about-hero__badge">
            <span class="about-hero__badge-emoji">💡</span>
            <span>2024</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Wave de transition -->
    <div class="about-hero__wave" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-surface)" />
      </svg>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.about-hero {
  position: relative;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 100px 0 80px;
  overflow: hidden;
  text-align: center;

  @include m.respond-to(md) { padding: 130px 0 100px; }

  // ── Orbes ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;

    &--1 {
      width: 400px;
      height: 400px;
      background: rgba(102, 126, 234, 0.25);
      top: -100px;
      left: -80px;
    }

    &--2 {
      width: 320px;
      height: 320px;
      background: rgba(118, 75, 162, 0.2);
      bottom: -60px;
      right: -60px;
    }

    &--3 {
      width: 200px;
      height: 200px;
      background: rgba(255, 215, 0, 0.08);
      top: 40%;
      left: 55%;
    }
  }

  // ── Contenu ──
  &__inner {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  // ── Titre ──
  &__title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 900;
    color: white;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
  }

  &__title-accent {
    color: var(--color-accent);
    display: inline-block;
  }

  // ── Sous-titre ──
  &__sub {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.75;
    max-width: 560px;
    margin: 0;
  }

  // ── Badges ──
  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 8px;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--radius-full);
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(8px);

    &--accent {
      background: rgba(102, 126, 234, 0.3);
      border-color: rgba(102, 126, 234, 0.5);
      color: white;
    }
  }

  &__badge-emoji {
    font-size: 1rem;
  }

  // ── Wave ──
  &__wave {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    line-height: 0;

    svg {
      width: 100%;
      height: 80px;
      display: block;
    }
  }
}
</style>
