<!-- FeaturesSection.vue — Section "3 piliers" de la home page
     Présente les 3 fonctionnalités clés d'Erudia : offline, gamification, contrôle parental.
     Ton : storyteller, parent-to-parent, pédagogique et doux.
     Angle enfant : la carte gamification fait briller les yeux — badges, défis, contenu premium.
     Background blanc — alterne avec la ProblemSection (surface). -->

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t, localePath } = useLocale()

const features = computed(() => [
  {
    icon: '📡',
    tag: t('home.features.card1Tag'),
    title: t('home.features.card1Title'),
    description: t('home.features.card1Desc'),
    accent: 'blue',
    deco: '🚗',
  },
  {
    icon: '🏆',
    tag: t('home.features.card2Tag'),
    title: t('home.features.card2Title'),
    description: t('home.features.card2Desc'),
    accent: 'gold',
    deco: '🌟',
    highlight: true,
  },
  {
    icon: '🛡️',
    tag: t('home.features.card3Tag'),
    title: t('home.features.card3Title'),
    description: t('home.features.card3Desc'),
    accent: 'purple',
    deco: '📊',
  },
])
</script>

<template>
  <section class="features section" aria-labelledby="features-title">
    <div class="container">

      <!-- En-tête -->
      <div class="features__header">
        <div class="pill pill--primary features__pill">{{ t('home.features.pill') }}</div>
        <h2 id="features-title" class="features__title heading-lg">
          {{ t('home.features.title') }}
        </h2>
        <p class="features__subline subline">{{ t('home.features.subline') }}</p>
      </div>

      <!-- Grille 3 cartes -->
      <div class="features__grid">
        <article
          v-for="item in features"
          :key="item.title"
          class="features__card"
          :class="[
            `features__card--${item.accent}`,
            { 'features__card--highlight': item.highlight }
          ]"
        >
          <!-- Badge "highlight" pour la carte premium -->
          <div v-if="item.highlight" class="features__card-badge">
            {{ t('home.features.card2Badge') }}
          </div>

          <!-- Icône principale -->
          <div class="features__card-icon" aria-hidden="true">
            {{ item.icon }}
          </div>

          <!-- Tag -->
          <div class="features__card-tag">{{ item.tag }}</div>

          <!-- Titre -->
          <h3 class="features__card-title">{{ item.title }}</h3>

          <!-- Description -->
          <p class="features__card-desc">{{ item.description }}</p>

          <!-- Icône décorative de fond -->
          <div class="features__card-deco" aria-hidden="true">{{ item.deco }}</div>
        </article>
      </div>

      <!-- CTA secondaire -->
      <div class="features__cta">
        <RouterLink :to="localePath('/features')" class="btn btn--secondary">
          {{ t('home.features.cta') }}
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.features {
  background: var(--color-bg);

  // ── En-tête ──────────────────────────────────────────────
  &__header {
    text-align: center;
    margin-bottom: 56px;
  }

  &__pill {
    margin-bottom: 16px;
  }

  &__title {
    color: var(--color-text);
    margin-bottom: 16px;
  }

  &__subline {
    max-width: 480px;
    margin: 0 auto;
  }

  // ── Grille ───────────────────────────────────────────────
  &__grid {
    display: grid;
    gap: 24px;

    @include m.respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
      align-items: start;
    }
  }

  // ── Carte base ───────────────────────────────────────────
  &__card {
    position: relative;
    background: white;
    border-radius: var(--radius-xl);
    padding: 36px 28px 32px;
    border: 1.5px solid var(--color-surface-dark);
    overflow: hidden;
    transition: transform var(--transition), box-shadow var(--transition);

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    // ── Variantes de couleur d'accent ──
    &--blue  { --card-accent: #667eea; --card-accent-bg: rgba(102, 126, 234, 0.07); }
    &--gold  { --card-accent: #f59e0b; --card-accent-bg: rgba(245, 158, 11, 0.08); }
    &--purple{ --card-accent: #764ba2; --card-accent-bg: rgba(118, 75, 162, 0.07); }

    // ── Carte mise en avant (gamification / premium) ──
    // Légèrement plus grande visuellement + border gradient
    &--highlight {
      border-color: transparent;
      background:
        linear-gradient(white, white) padding-box,
        var(--gradient-primary) border-box;
      box-shadow: var(--shadow-md);

      @include m.respond-to(md) {
        // Légèrement surélevée sur desktop pour la faire ressortir
        margin-top: -12px;
        margin-bottom: -12px;
      }
    }
  }

  // Badge "Favori des enfants"
  &__card-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--gradient-accent);
    color: #7c5500;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 5px 12px;
    border-radius: var(--radius-full);
    white-space: nowrap;
  }

  // Icône principale
  &__card-icon {
    font-size: 2.6rem;
    line-height: 1;
    margin-bottom: 20px;
    width: 64px;
    height: 64px;
    background: var(--card-accent-bg);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // Tag catégorie
  &__card-tag {
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--card-accent);
    margin-bottom: 10px;
  }

  // Titre
  &__card-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 14px;
    line-height: 1.3;
  }

  // Description
  &__card-desc {
    font-size: 0.93rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  // Icône décorative de fond (très grande, transparente)
  &__card-deco {
    position: absolute;
    bottom: -10px;
    right: -5px;
    font-size: 5rem;
    opacity: 0.06;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  // ── CTA ──────────────────────────────────────────────────
  &__cta {
    text-align: center;
    margin-top: 48px;
  }
}
</style>
