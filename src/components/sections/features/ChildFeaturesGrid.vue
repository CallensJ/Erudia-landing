<!-- ChildFeaturesGrid.vue — Grille des 6 fonctionnalités enfant
     Visible quand l'onglet "Pour l'enfant" est actif dans FeaturesView.
     - En-tête centré (pill, titre, sous-titre)
     - Grille 3 colonnes desktop / 2 tablette / 1 mobile
     - Chaque carte : gradient latéral, icône, titre, description, tag -->
<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

interface ChildCard {
  icon:  string
  title: string
  desc:  string
  tag:   string
}

const { t, td } = useLocale()

const cards = computed(() => td<ChildCard[]>('features.child.cards'))

// Gradients statiques alignés avec la maquette (design, hors locales)
const gradients = [
  'linear-gradient(90deg, #667eea, #764ba2)',
  'linear-gradient(90deg, #FFD700, #FFA500)',
  'linear-gradient(90deg, #10B981, #059669)',
  'linear-gradient(90deg, #EF4444, #DC2626)',
  'linear-gradient(90deg, #3B82F6, #2563EB)',
  'linear-gradient(90deg, #9C27B0, #7B1FA2)',
]
</script>

<template>
  <section class="child-grid section" aria-labelledby="child-feat-title">
    <div class="container">

      <!-- En-tête -->
      <div class="child-grid__header">
        <div class="pill pill--primary label">
          {{ t('features.child.pill') }}
        </div>
        <h2 id="child-feat-title" class="child-grid__title">
          {{ t('features.child.title') }}
        </h2>
        <p class="child-grid__subline">
          {{ t('features.child.subline') }}
        </p>
      </div>

      <!-- Grille de cartes -->
      <div class="child-grid__grid">
        <article
          v-for="(card, i) in cards"
          :key="card.title"
          class="child-grid__card"
          :style="{ '--card-gradient': gradients[i] }"
        >
          <div class="child-grid__icon" aria-hidden="true">{{ card.icon }}</div>
          <h3 class="child-grid__card-title">{{ card.title }}</h3>
          <p class="child-grid__card-desc">{{ card.desc }}</p>
          <span class="child-grid__tag">{{ card.tag }}</span>
        </article>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.child-grid {
  background: white;

  // ── En-tête ────────────────────────────────────────────────
  &__header {
    text-align:    center;
    margin-bottom: 56px;

    .pill { margin-bottom: 16px; }
  }

  &__title {
    font-family:    var(--font-display);
    font-size:      clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight:    700;
    line-height:    1.2;
    letter-spacing: -0.015em;
    color:          var(--color-text);
    margin-bottom:  12px;
  }

  &__subline {
    font-size:  clamp(0.95rem, 1.8vw, 1.05rem);
    color:      var(--color-text-secondary);
    max-width:  520px;
    margin:     0 auto;
    line-height: 1.65;
  }

  // ── Grille ─────────────────────────────────────────────────
  &__grid {
    display:               grid;
    grid-template-columns: 1fr;
    gap:                   24px;

    @include m.respond-to(md) { grid-template-columns: repeat(2, 1fr); }
    @include m.respond-to(lg) { grid-template-columns: repeat(3, 1fr); }
  }

  // ── Carte ──────────────────────────────────────────────────
  &__card {
    background:    var(--color-surface);
    border-radius: var(--radius-lg);
    padding:       32px 28px;
    position:      relative;
    overflow:      hidden;
    display:       flex;
    flex-direction: column;
    gap:           12px;
    transition:    transform var(--transition), box-shadow var(--transition);

    // Bande de couleur en haut de la carte
    &::before {
      content:       '';
      position:      absolute;
      top:           0;
      left:          0;
      right:         0;
      height:        4px;
      background:    var(--card-gradient);
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }

    &:hover {
      transform:   translateY(-4px);
      box-shadow:  var(--shadow-lg);
    }
  }

  &__icon {
    font-size: 2rem;
    line-height: 1;
  }

  &__card-title {
    font-family: var(--font-display);
    font-size:   1.05rem;
    font-weight: 700;
    color:       var(--color-text);
    line-height: 1.3;
  }

  &__card-desc {
    font-size:   0.875rem;
    color:       var(--color-text-secondary);
    line-height: 1.7;
    flex:        1;
  }

  &__tag {
    display:       inline-block;
    align-self:    flex-start;
    font-size:     0.72rem;
    font-weight:   700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color:         white;
    background:    var(--card-gradient);
    padding:       4px 10px;
    border-radius: var(--radius-full);
  }
}
</style>
