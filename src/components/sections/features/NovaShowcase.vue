<!-- NovaShowcase.vue — Section mascotte Nova
     Visible dans l'onglet "Pour l'enfant" de FeaturesView.
     - Layout 2 colonnes desktop (texte gauche, grille poses droite)
     - Gauche : pill, titre accent, 3 paragraphes, 8 pills d'expressions
     - Droite : 4 cartes pose cliquables avec image SVG, label, contexte d'utilisation -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale }     from '@/composables/useLocale'

interface Expression {
  emoji: string
  label: string
}

interface NovaPose {
  label:   string
  emotion: string
  src:     string
}

const { t, td } = useLocale()

const expressions = computed(() => td<Expression[]>('features.nova.expressions'))
const poses        = computed(() => td<NovaPose[]>('features.nova.poses'))

const activeIndex = ref(0)
</script>

<template>
  <section class="nova section section--surface" aria-labelledby="nova-title">
    <div class="container">
      <div class="nova__inner">

        <!-- Texte gauche -->
        <div class="nova__text">
          <div class="pill pill--primary label nova__pill">
            {{ t('features.nova.pill') }}
          </div>

          <h2 id="nova-title" class="nova__title">
            {{ t('features.nova.title1') }}<br/>
            <span class="nova__accent">{{ t('features.nova.title2') }}</span>
          </h2>

          <p class="nova__para">{{ t('features.nova.p1') }}</p>
          <p class="nova__para">{{ t('features.nova.p2') }}</p>
          <p class="nova__para">{{ t('features.nova.p3') }}</p>

          <!-- Pills d'expressions -->
          <div class="nova__expressions" aria-label="Expressions de Nova">
            <span
              v-for="expr in expressions"
              :key="expr.label"
              class="nova__expr-pill"
            >
              {{ expr.emoji }} {{ expr.label }}
            </span>
          </div>
        </div>

        <!-- Grille poses droite -->
        <div class="nova__poses" role="list" aria-label="Poses de Nova">
          <button
            v-for="(pose, i) in poses"
            :key="pose.label"
            class="nova__pose-card"
            :class="{ 'nova__pose-card--active': activeIndex === i }"
            role="listitem"
            :aria-pressed="activeIndex === i"
            @click="activeIndex = i"
          >
            <img
              :src="pose.src"
              :alt="`Nova — ${pose.label}`"
              class="nova__pose-img"
              loading="lazy"
            />
            <div class="nova__pose-label">{{ pose.label }}</div>
            <div class="nova__pose-emotion">{{ pose.emotion }}</div>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.nova {
  // ── Layout 2 colonnes ──────────────────────────────────────
  &__inner {
    display:        flex;
    flex-direction: column;
    gap:            56px;

    @include m.respond-to(lg) {
      flex-direction: row;
      align-items:    flex-start;
      gap:            72px;
    }
  }

  // ── Colonne texte ──────────────────────────────────────────
  &__text {
    flex: 1.1;
  }

  &__pill {
    margin-bottom: 16px;
    display: inline-flex;
  }

  &__title {
    font-family:    var(--font-display);
    font-size:      clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight:    700;
    line-height:    1.2;
    letter-spacing: -0.015em;
    color:          var(--color-text);
    margin-bottom:  24px;
  }

  &__accent {
    background:              var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip:         text;
  }

  &__para {
    font-size:     0.9375rem;
    color:         var(--color-text-secondary);
    line-height:   1.75;
    margin-bottom: 14px;

    &:last-of-type { margin-bottom: 28px; }
  }

  // ── Pills expressions ──────────────────────────────────────
  &__expressions {
    display:   flex;
    flex-wrap: wrap;
    gap:       8px;
  }

  &__expr-pill {
    display:       inline-flex;
    align-items:   center;
    gap:           5px;
    background:    white;
    border:        1px solid var(--color-surface-dark);
    border-radius: var(--radius-full);
    font-size:     0.8rem;
    font-weight:   600;
    color:         var(--color-text-secondary);
    padding:       5px 12px;
  }

  // ── Grille poses ───────────────────────────────────────────
  &__poses {
    flex:                  1;
    display:               grid;
    grid-template-columns: repeat(2, 1fr);
    gap:                   16px;
    align-self:            center;
  }

  &__pose-card {
    background:    white;
    border:        2px solid var(--color-surface-dark);
    border-radius: var(--radius-lg);
    padding:       20px 16px;
    display:       flex;
    flex-direction: column;
    align-items:   center;
    gap:           10px;
    cursor:        pointer;
    transition:    all var(--transition);
    text-align:    center;

    &:hover {
      border-color: var(--color-primary-light);
      box-shadow:   var(--shadow-sm);
    }

    &--active {
      border-color: var(--color-primary);
      background:   rgba(102, 126, 234, 0.04);
      box-shadow:   var(--shadow-md);
    }
  }

  &__pose-img {
    width:  80px;
    height: 80px;
    object-fit: contain;
  }

  &__pose-label {
    font-family: var(--font-display);
    font-size:   0.875rem;
    font-weight: 700;
    color:       var(--color-text);
  }

  &__pose-emotion {
    font-size:  0.75rem;
    color:      var(--color-text-light);
    line-height: 1.4;
  }
}
</style>
