<!-- ContentPhilosophySection.vue — Philosophie du contenu + catégories
     Visible quand l'onglet "Le contenu" est actif dans FeaturesView.
     - Layout 2 colonnes desktop
     - Gauche : pill, titre, 3 paragraphes, note callout, tableau curriculum
     - Droite : grille des 9 catégories (3 gratuites, 6 premium) -->
<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

interface CurriculumRow {
  level: string
  fr:    string
  en:    string
  chip:  'easy' | 'medium' | 'hard'
}

interface Category {
  icon:    string
  name:    string
  sub:     string
  color:   string
  premium: boolean
}

const { t, td } = useLocale()

const curriculum  = computed(() => td<CurriculumRow[]>('features.content.curriculum'))
const categories  = computed(() => td<Category[]>('features.content.categories'))
</script>

<template>
  <section class="content-philo section" aria-labelledby="content-philo-title">
    <div class="container">
      <div class="content-philo__inner">

        <!-- Colonne gauche : texte + tableau -->
        <div class="content-philo__text">
          <div class="pill pill--primary label content-philo__pill">
            {{ t('features.content.pill') }}
          </div>

          <h2 id="content-philo-title" class="content-philo__title">
            {{ t('features.content.title') }}
          </h2>

          <p class="content-philo__para">{{ t('features.content.p1') }}</p>
          <p class="content-philo__para">{{ t('features.content.p2') }}</p>
          <p class="content-philo__para">{{ t('features.content.p3') }}</p>

          <!-- Note callout -->
          <div class="content-philo__note">
            💡 <strong>{{ t('features.content.noteStrong') }}</strong>
            — {{ t('features.content.noteText') }}
          </div>

          <!-- Tableau curriculum -->
          <div class="content-philo__table-wrap">
            <table class="content-philo__table">
              <thead>
                <tr>
                  <th>{{ t('features.content.tableLevel') }}</th>
                  <th>{{ t('features.content.tableFr') }}</th>
                  <th>{{ t('features.content.tableEn') }}</th>
                  <th>{{ t('features.content.tableDiff') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in curriculum" :key="row.level">
                  <td>{{ row.level }}</td>
                  <td>{{ row.fr }}</td>
                  <td>{{ row.en }}</td>
                  <td>
                    <span class="content-philo__chip" :class="`content-philo__chip--${row.chip}`">
                      {{ row.level }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Colonne droite : catégories -->
        <div class="content-philo__cats">
          <div class="pill pill--primary label content-philo__cat-pill">
            {{ t('features.content.catPill') }}
          </div>

          <div class="content-philo__cat-grid">
            <div
              v-for="cat in categories"
              :key="cat.name"
              class="content-philo__cat-card"
              :style="{ '--cat-color': cat.color }"
            >
              <div class="content-philo__cat-dot" aria-hidden="true"></div>
              <span class="content-philo__cat-icon" aria-hidden="true">{{ cat.icon }}</span>
              <div class="content-philo__cat-info">
                <div class="content-philo__cat-name">{{ cat.name }}</div>
                <div class="content-philo__cat-sub">{{ cat.sub }}</div>
              </div>
              <span
                class="content-philo__cat-badge"
                :class="{ 'content-philo__cat-badge--premium': cat.premium }"
              >
                {{ cat.premium ? t('features.content.badgePremium') : t('features.content.badgeFree') }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.content-philo {
  background: var(--color-surface);

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
  &__text { flex: 1.1; }

  &__pill { margin-bottom: 16px; display: inline-flex; }

  &__title {
    font-family:    var(--font-display);
    font-size:      clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight:    700;
    line-height:    1.2;
    letter-spacing: -0.015em;
    color:          var(--color-text);
    margin:         14px 0 24px;
  }

  &__para {
    font-size:     0.9375rem;
    color:         var(--color-text-secondary);
    line-height:   1.75;
    margin-bottom: 14px;
  }

  // Note callout
  &__note {
    background:    rgba(102, 126, 234, 0.06);
    border-left:   4px solid var(--color-primary);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    padding:       16px 20px;
    margin-top:    8px;
    font-size:     0.875rem;
    color:         var(--color-text-secondary);
    line-height:   1.7;
  }

  // ── Tableau curriculum ─────────────────────────────────────
  &__table-wrap {
    margin-top:     32px;
    overflow-x:     auto;
    border-radius:  var(--radius-md);
    border:         1px solid var(--color-surface-dark);
  }

  &__table {
    width:           100%;
    border-collapse: collapse;
    font-size:       0.85rem;

    th {
      background:  var(--color-surface-dark);
      color:       var(--color-text-secondary);
      font-weight: 700;
      font-size:   0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding:     10px 16px;
      text-align:  left;
      white-space: nowrap;
    }

    td {
      padding:      12px 16px;
      color:        var(--color-text-secondary);
      border-top:   1px solid var(--color-surface-dark);
      white-space:  nowrap;
    }

    tr:hover td { background: rgba(102, 126, 234, 0.03); }
  }

  // Chips difficulté
  &__chip {
    display:       inline-block;
    padding:       3px 10px;
    border-radius: var(--radius-full);
    font-size:     0.72rem;
    font-weight:   700;

    &--easy   { background: rgba(76, 175, 80, 0.12);  color: #2e7d32; }
    &--medium { background: rgba(255, 152, 0, 0.12);  color: #e65100; }
    &--hard   { background: rgba(244, 67, 54, 0.12);  color: #b71c1c; }
  }

  // ── Catégories ─────────────────────────────────────────────
  &__cats { flex: 1; }

  &__cat-pill {
    margin-bottom: 20px;
    display:       inline-flex;
  }

  &__cat-grid {
    display:        flex;
    flex-direction: column;
    gap:            10px;
  }

  &__cat-card {
    display:       flex;
    align-items:   center;
    gap:           12px;
    background:    white;
    border:        1px solid var(--color-surface-dark);
    border-radius: var(--radius-md);
    padding:       12px 16px;
    position:      relative;
    overflow:      hidden;
    transition:    box-shadow var(--transition);

    &:hover { box-shadow: var(--shadow-sm); }
  }

  // Point de couleur
  &__cat-dot {
    position:      absolute;
    left:          0;
    top:           0;
    bottom:        0;
    width:         4px;
    background:    var(--cat-color);
    border-radius: 4px 0 0 4px;
  }

  &__cat-icon {
    font-size:   1.25rem;
    flex-shrink: 0;
    margin-left: 6px;
  }

  &__cat-info { flex: 1; min-width: 0; }

  &__cat-name {
    font-weight: 700;
    font-size:   0.875rem;
    color:       var(--color-text);
    white-space: nowrap;
    overflow:    hidden;
    text-overflow: ellipsis;
  }

  &__cat-sub {
    font-size:  0.75rem;
    color:      var(--color-text-light);
    margin-top: 2px;
  }

  &__cat-badge {
    font-size:     0.7rem;
    font-weight:   700;
    padding:       3px 8px;
    border-radius: var(--radius-full);
    flex-shrink:   0;
    background:    rgba(76, 175, 80, 0.12);
    color:         #2e7d32;

    &--premium {
      background: rgba(102, 126, 234, 0.12);
      color:      var(--color-primary-dark);
    }
  }
}
</style>
