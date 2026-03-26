<!-- ParentFeaturesSection.vue — Fonctionnalités espace parent
     Visible quand l'onglet "Pour le parent" est actif dans FeaturesView.
     - En-tête centré (pill, titre, sous-titre)
     - Layout 2 colonnes desktop : liste d'items gauche, mockup admin droite
     - 6 items avec icône, titre, description, liste optionnelle
     - Mockup admin : stats, barres de progression, objectif journalier -->
<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

interface ParentItem {
  icon:  string
  title: string
  desc:  string
  list:  string[]
}

interface Mockup {
  title:      string
  sub:        string
  badge:      string
  stat1Label: string
  stat2Label: string
  stat3Label: string
  chartLabel: string
  goalText:   string
  goalSub:    string
  goalStatus: string
}

const { t, td } = useLocale()

const items  = computed(() => td<ParentItem[]>('features.parent.items'))
const mockup = computed(() => td<Mockup>('features.parent.mockup'))

// Données statiques du graphique mockup (design, hors locales)
const chartBars = [
  { label: 'Sciences', pct: 78, color: '#2196F3' },
  { label: 'Histoire',  pct: 55, color: '#795548' },
  { label: 'Héros',    pct: 90, color: '#E91E63' },
]
</script>

<template>
  <section class="parent-feat section" aria-labelledby="parent-feat-title">
    <div class="container">

      <!-- En-tête -->
      <div class="parent-feat__header">
        <div class="pill pill--primary label">
          {{ t('features.parent.pill') }}
        </div>
        <h2 id="parent-feat-title" class="parent-feat__title">
          {{ t('features.parent.title') }}
        </h2>
        <p class="parent-feat__subline">
          {{ t('features.parent.subline') }}
        </p>
      </div>

      <!-- Grille 2 colonnes -->
      <div class="parent-feat__layout">

        <!-- Liste d'items -->
        <div class="parent-feat__list">
          <div
            v-for="item in items"
            :key="item.title"
            class="parent-feat__item"
          >
            <div class="parent-feat__icon" aria-hidden="true">{{ item.icon }}</div>
            <div class="parent-feat__body">
              <h3 class="parent-feat__item-title">{{ item.title }}</h3>
              <p class="parent-feat__item-desc">{{ item.desc }}</p>
              <ul v-if="item.list.length" class="parent-feat__item-list">
                <li v-for="point in item.list" :key="point">{{ point }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Mockup admin -->
        <div class="parent-feat__mockup-wrap">
          <div class="parent-feat__mockup">

            <!-- Header mockup -->
            <div class="parent-feat__mockup-header">
              <div>
                <div class="parent-feat__mockup-title">{{ mockup.title }}</div>
                <div class="parent-feat__mockup-sub">{{ mockup.sub }}</div>
              </div>
              <span class="parent-feat__mockup-badge">{{ mockup.badge }}</span>
            </div>

            <!-- Stats -->
            <div class="parent-feat__stats">
              <div class="parent-feat__stat">
                <div class="parent-feat__stat-val">142</div>
                <div class="parent-feat__stat-label">{{ mockup.stat1Label }}</div>
              </div>
              <div class="parent-feat__stat">
                <div class="parent-feat__stat-val">8</div>
                <div class="parent-feat__stat-label">{{ mockup.stat2Label }}</div>
              </div>
              <div class="parent-feat__stat">
                <div class="parent-feat__stat-val">5🔥</div>
                <div class="parent-feat__stat-label">{{ mockup.stat3Label }}</div>
              </div>
            </div>

            <!-- Graphique barres -->
            <div class="parent-feat__chart">
              <div class="parent-feat__chart-label">{{ mockup.chartLabel }}</div>
              <div
                v-for="bar in chartBars"
                :key="bar.label"
                class="parent-feat__bar-row"
              >
                <span class="parent-feat__bar-cat">{{ bar.label }}</span>
                <div class="parent-feat__bar-track">
                  <div
                    class="parent-feat__bar-fill"
                    :style="{ width: bar.pct + '%', background: bar.color }"
                  ></div>
                </div>
                <span class="parent-feat__bar-pct">{{ bar.pct }}%</span>
              </div>
            </div>

            <!-- Objectif -->
            <div class="parent-feat__goal">
              <div>
                <div class="parent-feat__goal-text">{{ mockup.goalText }}</div>
                <div class="parent-feat__goal-sub">{{ mockup.goalSub }}</div>
              </div>
              <span class="parent-feat__goal-status">{{ mockup.goalStatus }}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.parent-feat {
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
    font-size:   clamp(0.95rem, 1.8vw, 1.05rem);
    color:       var(--color-text-secondary);
    max-width:   560px;
    margin:      0 auto;
    line-height: 1.65;
  }

  // ── Layout 2 colonnes ──────────────────────────────────────
  &__layout {
    display:        flex;
    flex-direction: column;
    gap:            48px;
    align-items:    flex-start;

    @include m.respond-to(lg) {
      flex-direction: row;
      gap:            64px;
    }
  }

  // ── Liste d'items ──────────────────────────────────────────
  &__list {
    flex:    1.1;
    display: flex;
    flex-direction: column;
    gap:     32px;
  }

  &__item {
    display: flex;
    gap:     16px;
  }

  &__icon {
    font-size:     1.5rem;
    flex-shrink:   0;
    width:         44px;
    height:        44px;
    display:       flex;
    align-items:   center;
    justify-content: center;
    background:    var(--color-surface);
    border-radius: var(--radius-md);
  }

  &__body { flex: 1; }

  &__item-title {
    font-family:   var(--font-display);
    font-size:     1rem;
    font-weight:   700;
    color:         var(--color-text);
    margin-bottom: 6px;
  }

  &__item-desc {
    font-size:     0.875rem;
    color:         var(--color-text-secondary);
    line-height:   1.7;
    margin-bottom: 8px;
  }

  &__item-list {
    display:        flex;
    flex-direction: column;
    gap:            4px;

    li {
      font-size:   0.8rem;
      color:       var(--color-text-secondary);
      padding-left: 14px;
      position:    relative;
      line-height: 1.5;

      &::before {
        content:  '✓';
        position: absolute;
        left:     0;
        color:    var(--color-primary);
        font-weight: 700;
      }
    }
  }

  // ── Mockup admin ───────────────────────────────────────────
  &__mockup-wrap {
    flex: 1;
    position: sticky;
    top: calc(var(--header-h) + 24px);
  }

  &__mockup {
    background:    white;
    border:        1px solid var(--color-surface-dark);
    border-radius: var(--radius-xl);
    box-shadow:    var(--shadow-lg);
    overflow:      hidden;
  }

  &__mockup-header {
    display:         flex;
    justify-content: space-between;
    align-items:     center;
    padding:         20px 24px;
    background:      var(--gradient-primary);
    color:           white;
  }

  &__mockup-title {
    font-family: var(--font-display);
    font-size:   0.9rem;
    font-weight: 700;
  }

  &__mockup-sub {
    font-size: 0.72rem;
    opacity:   0.7;
    margin-top: 2px;
  }

  &__mockup-badge {
    background:    rgba(255,255,255,.2);
    border:        1px solid rgba(255,255,255,.35);
    border-radius: var(--radius-full);
    font-size:     0.72rem;
    font-weight:   700;
    padding:       4px 10px;
    color:         white;
  }

  // Stats row
  &__stats {
    display:         flex;
    justify-content: space-around;
    padding:         20px 24px;
    border-bottom:   1px solid var(--color-surface);
  }

  &__stat {
    text-align: center;
  }

  &__stat-val {
    font-family: var(--font-display);
    font-size:   1.4rem;
    font-weight: 800;
    color:       var(--color-text);
  }

  &__stat-label {
    font-size: 0.72rem;
    color:     var(--color-text-light);
    margin-top: 2px;
  }

  // Graphique barres
  &__chart {
    padding: 20px 24px;
    border-bottom: 1px solid var(--color-surface);
  }

  &__chart-label {
    font-size:     0.75rem;
    color:         var(--color-text-secondary);
    font-weight:   600;
    margin-bottom: 14px;
  }

  &__bar-row {
    display:     flex;
    align-items: center;
    gap:         10px;
    margin-bottom: 10px;

    &:last-child { margin-bottom: 0; }
  }

  &__bar-cat {
    font-size:  0.72rem;
    color:      var(--color-text-secondary);
    width:      60px;
    flex-shrink: 0;
  }

  &__bar-track {
    flex:          1;
    height:        8px;
    background:    var(--color-surface);
    border-radius: var(--radius-full);
    overflow:      hidden;
  }

  &__bar-fill {
    height:        100%;
    border-radius: var(--radius-full);
    transition:    width 0.6s ease;
  }

  &__bar-pct {
    font-size:   0.72rem;
    font-weight: 700;
    color:       var(--color-text-secondary);
    width:       32px;
    text-align:  right;
    flex-shrink: 0;
  }

  // Objectif
  &__goal {
    display:         flex;
    align-items:     center;
    justify-content: space-between;
    padding:         16px 24px;
    gap:             12px;
  }

  &__goal-text {
    font-size:   0.8rem;
    font-weight: 600;
    color:       var(--color-text);
  }

  &__goal-sub {
    font-size:  0.72rem;
    color:      var(--color-text-light);
    margin-top: 2px;
  }

  &__goal-status {
    background:    rgba(16, 185, 129, 0.1);
    color:         #059669;
    border-radius: var(--radius-full);
    font-size:     0.75rem;
    font-weight:   700;
    padding:       5px 12px;
    white-space:   nowrap;
    flex-shrink:   0;
  }
}
</style>
