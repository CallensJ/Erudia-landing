<!-- ProblemSection.vue — Section "Problème / Solution" de la home page
     Objectif : adresser les 3 pain points parents (frustration, addiction, offline)
     et montrer qu'Erudia y répond directement.
     Tone : parent-to-parent, rassurant.
     Background surface (#F7F8FC) — alterne avec le hero blanc. -->

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

// Chaque item : un défi du quotidien parent + comment Erudia y répond naturellement
const problems = computed(() => [
  {
    icon: '🚗',
    label: t('home.problem.item1Title'),
    problem: t('home.problem.item1Problem'),
    solutionIcon: '📡',
    solution: t('home.problem.item1Solution'),
  },
  {
    icon: '💛',
    label: t('home.problem.item2Title'),
    problem: t('home.problem.item2Problem'),
    solutionIcon: '🎯',
    solution: t('home.problem.item2Solution'),
  },
  {
    icon: '🔍',
    label: t('home.problem.item3Title'),
    problem: t('home.problem.item3Problem'),
    solutionIcon: '📊',
    solution: t('home.problem.item3Solution'),
  },
])
</script>

<template>
  <section class="problem section section--surface" aria-labelledby="problem-title">
    <div class="container">

      <!-- En-tête de section -->
      <div class="problem__header">
        <div class="pill pill--primary problem__pill">{{ t('home.problem.pill') }}</div>
        <h2 id="problem-title" class="problem__title heading-lg">
          {{ t('home.problem.title') }}
        </h2>
        <p class="problem__subline subline">{{ t('home.problem.subline') }}</p>
      </div>

      <!-- Grille 3 cartes -->
      <div class="problem__grid">
        <article
          v-for="item in problems"
          :key="item.label"
          class="problem__card"
        >
          <!-- Partie problème -->
          <div class="problem__pain">
            <div class="problem__pain-icon" aria-hidden="true">{{ item.icon }}</div>
            <div class="problem__pain-label">{{ item.label }}</div>
            <p class="problem__pain-text">{{ item.problem }}</p>
          </div>

          <!-- Séparateur visuel avec flèche -->
          <div class="problem__arrow" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v14M10 17l-4-4M10 17l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <!-- Partie solution Erudia -->
          <div class="problem__solution">
            <div class="problem__solution-icon" aria-hidden="true">{{ item.solutionIcon }}</div>
            <p class="problem__solution-text">{{ item.solution }}</p>
          </div>
        </article>
      </div>

      <!-- Accroche finale -->
      <p class="problem__closing">{{ t('home.problem.closing') }}</p>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.problem {

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

  // Le <br> du titre n'est visible qu'au-delà de md pour éviter coupure bizarre sur mobile
  &__br {
    display: none;

    @include m.respond-to(md) {
      display: inline;
    }
  }

  &__subline {
    max-width: 480px;
    margin: 0 auto;
  }

  // ── Grille cartes ─────────────────────────────────────────
  &__grid {
    display: grid;
    gap: 24px;

    @include m.respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // ── Carte ─────────────────────────────────────────────────
  &__card {
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition), box-shadow var(--transition);

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
  }

  // ── Partie problème (fond légèrement rosé) ────────────────
  &__pain {
    padding: 28px 24px 20px;
    // Fond très légèrement chaud pour signifier le problème sans être agressif
    background: #fdf6f6;
    border-bottom: 1px solid #f5e8e8;
  }

  &__pain-icon {
    font-size: 2rem;
    margin-bottom: 10px;
    line-height: 1;
  }

  &__pain-label {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.95rem;
    color: #c0392b;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.75rem;
  }

  &__pain-text {
    font-size: 0.92rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  // ── Flèche de transition ───────────────────────────────────
  &__arrow {
    display: flex;
    justify-content: center;
    padding: 12px 0;
    background: white;
    color: var(--color-primary);
    opacity: 0.5;
  }

  // ── Partie solution (fond gradient subtil) ────────────────
  &__solution {
    padding: 20px 24px 28px;
    background: linear-gradient(160deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.08));
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__solution-icon {
    font-size: 1.6rem;
    line-height: 1;
  }

  &__solution-text {
    font-size: 0.92rem;
    color: var(--color-text);
    line-height: 1.65;
    font-weight: 600;
  }

  // ── Accroche finale ───────────────────────────────────────
  &__closing {
    text-align: center;
    margin-top: 56px;
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    font-weight: 700;
    color: var(--color-text);

    // Accent gradient sur le texte
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>
