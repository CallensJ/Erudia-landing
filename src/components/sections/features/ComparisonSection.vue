<!-- ComparisonSection.vue — Tableau comparatif Erudia vs concurrents
     Toujours visible (hors onglets) en bas de la page Fonctionnalités.
     - En-tête centré (pill, titre, sous-titre)
     - Tableau scrollable : colonne Erudia mise en avant
     - ✅ vert, ❌ rouge, ⚠️ orange pour lisibilité rapide -->
<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

interface CompRow {
  feature: string
  kahoot:  string
  quizizz: string
  splash:  string
  erudia:  string
}

const { t, td } = useLocale()

const rows = computed(() => td<CompRow[]>('features.comparison.rows'))

function cellClass(value: string): string {
  if (value.startsWith('✅')) return 'comp__cell--yes'
  if (value.startsWith('❌')) return 'comp__cell--no'
  if (value.startsWith('⚠️')) return 'comp__cell--warn'
  return ''
}
</script>

<template>
  <section class="comp section section--surface" aria-labelledby="comp-title">
    <div class="container">

      <!-- En-tête -->
      <div class="comp__header">
        <div class="pill pill--primary label">
          {{ t('features.comparison.pill') }}
        </div>
        <h2 id="comp-title" class="comp__title">
          {{ t('features.comparison.title') }}
        </h2>
        <p class="comp__subline">{{ t('features.comparison.subline') }}</p>
      </div>

      <!-- Tableau -->
      <div class="comp__wrap">
        <table class="comp__table">
          <thead>
            <tr>
              <th class="comp__th-feat">{{ t('features.comparison.col0') }}</th>
              <th>Kahoot! Kids</th>
              <th>Quizizz</th>
              <th>SplashLearn</th>
              <th class="comp__th-erudia">Erudia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.feature">
              <td class="comp__feat-cell">{{ row.feature }}</td>
              <td :class="cellClass(row.kahoot)">{{ row.kahoot }}</td>
              <td :class="cellClass(row.quizizz)">{{ row.quizizz }}</td>
              <td :class="cellClass(row.splash)">{{ row.splash }}</td>
              <td class="comp__erudia-cell" :class="cellClass(row.erudia)">{{ row.erudia }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.comp {
  // ── En-tête ────────────────────────────────────────────────
  &__header {
    text-align:    center;
    margin-bottom: 48px;

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
    max-width:  480px;
    margin:     0 auto;
    line-height: 1.65;
  }

  // ── Tableau ────────────────────────────────────────────────
  &__wrap {
    overflow-x:    auto;
    border-radius: var(--radius-lg);
    border:        1px solid var(--color-surface-dark);
    box-shadow:    var(--shadow-sm);
  }

  &__table {
    width:           100%;
    border-collapse: collapse;
    font-size:       0.875rem;
    background:      white;

    th {
      padding:        12px 18px;
      font-family:    var(--font-display);
      font-size:      0.78rem;
      font-weight:    700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color:          var(--color-text-secondary);
      background:     var(--color-surface);
      white-space:    nowrap;
      text-align:     center;
    }

    td {
      padding:    13px 18px;
      border-top: 1px solid var(--color-surface);
      color:      var(--color-text-secondary);
      text-align: center;
      font-size:  0.82rem;
      white-space: nowrap;
    }

    tr:hover td { background: rgba(102, 126, 234, 0.025); }
  }

  // Colonne feature (gauche, alignée à gauche)
  &__th-feat,
  &__feat-cell {
    text-align: left !important;
    font-weight: 600;
    color:       var(--color-text) !important;
    min-width:   180px;
  }

  // Colonne Erudia (mise en avant)
  &__th-erudia {
    background:  rgba(102, 126, 234, 0.08) !important;
    color:       var(--color-primary-dark) !important;
  }

  &__erudia-cell {
    background:  rgba(102, 126, 234, 0.04);
    font-weight: 700;
  }

  // ── Couleurs cellules ──────────────────────────────────────
  &__cell--yes  { color: #16a34a; }
  &__cell--no   { color: #dc2626; }
  &__cell--warn { color: #d97706; }
}
</style>
