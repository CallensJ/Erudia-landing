<!-- ChangelogView.vue — Historique des versions d'Erudia
     Mise à jour manuelle à chaque déploiement.
     Accessible depuis le menu de navigation et la modale "À propos" de l'app. -->
<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import { useSeoHead } from '@/composables/useSeoHead'
import { useBreadcrumbJsonLd } from '@/composables/useJsonLd'

const { locale } = useLocale()

useSeoHead({
  title: {
    fr: 'Nouveautés – Erudia',
    en: "What's new – Erudia",
  },
  description: {
    fr: "Toutes les nouveautés, corrections et améliorations d'Erudia, version par version.",
    en: 'All updates, fixes, and improvements to Erudia, version by version.',
  },
  path: '/changelog',
})

useBreadcrumbJsonLd({
  label: { fr: 'Nouveautés', en: "What's new" },
  path: '/changelog',
})
</script>

<template>
  <main class="changelog">
    <div class="container">

      <!-- ── En-tête ── -->
      <header class="changelog__hero">
        <div class="changelog__hero-icon" aria-hidden="true">🚀</div>
        <h1 class="changelog__hero-title">
          {{ locale === 'fr' ? 'Nouveautés' : "What's new" }}
        </h1>
        <p class="changelog__hero-sub">
          {{
            locale === 'fr'
              ? "Toutes les mises à jour d'Erudia, version par version."
              : 'All Erudia updates, version by version.'
          }}
        </p>
      </header>

      <!-- ── Liste des versions ── -->
      <div class="changelog__list">

        <!-- ────────────── v1.0.1 ────────────── -->
        <article class="changelog__entry">
          <div class="changelog__version-badge">v1.0.1</div>
          <div class="changelog__date">
            {{ locale === 'fr' ? '20 avril 2026' : 'April 20, 2026' }}
          </div>

          <!-- Nouveautés -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🆕</span>
              {{ locale === 'fr' ? 'Nouveautés' : 'New features' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">600 questions Éducation Civique en français</li>
              <li v-else>600 Civics questions in French</li>

              <li v-if="locale === 'fr'">600 questions Éducation Civique en anglais</li>
              <li v-else>600 Civics questions in English</li>
            </ul>
          </section>

          <!-- Corrections -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🐛</span>
              {{ locale === 'fr' ? 'Corrections' : 'Bug fixes' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Correction de l'affichage des badges déjà obtenus comme nouveaux lors de parties suivantes</li>
              <li v-else>Fixed already-earned badges incorrectly showing as new in subsequent games</li>

              <li v-if="locale === 'fr'">Ajout de liens "Voir mes badges" et "Retour à l'accueil" dans la notification de badge débloqué</li>
              <li v-else>Added "See my badges" and "Back to home" links in the badge unlock notification</li>

              <li v-if="locale === 'fr'">Rapport de progression PDF à nouveau disponible dans l'espace parent</li>
              <li v-else>PDF progress report restored in the parent area</li>

              <li v-if="locale === 'fr'">Correction de l'icône d'édition d'avatar (forme circulaire)</li>
              <li v-else>Fixed avatar edit icon shape (now correctly circular)</li>

              <li v-if="locale === 'fr'">Correction du bouton de fermeture de la modale badges (forme circulaire)</li>
              <li v-else>Fixed badge modal close button shape (now correctly circular)</li>
            </ul>
          </section>
        </article>

        <!-- ────────────── v1.0.0 ────────────── -->
        <article class="changelog__entry">
          <div class="changelog__version-badge">v1.0.0</div>
          <div class="changelog__date">
            {{ locale === 'fr' ? '15 avril 2026' : 'April 15, 2026' }}
          </div>

          <!-- Nouveautés -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🆕</span>
              {{ locale === 'fr' ? 'Nouveautés' : 'New features' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Lancement officiel Erudia</li>
              <li v-else>Official Erudia launch</li>

              <li v-if="locale === 'fr'">20 catégories de quiz (3 gratuites, 17 premium)</li>
              <li v-else>20 quiz categories (3 free, 17 premium)</li>

              <li v-if="locale === 'fr'">Mode Premium via Stripe (1,99&nbsp;€/mois — 9,99&nbsp;€/6 mois)</li>
              <li v-else>Premium mode via Stripe (€1.99/month — €9.99/6 months)</li>

              <li v-if="locale === 'fr'">Synchronisation cross-device pour les abonnés Premium</li>
              <li v-else>Cross-device sync for Premium subscribers</li>

              <li v-if="locale === 'fr'">130 badges débloquables</li>
              <li v-else>130 unlockable badges</li>

              <li v-if="locale === 'fr'">Défi quotidien avec streak et XP</li>
              <li v-else>Daily challenge with streak and XP</li>

              <li v-if="locale === 'fr'">Rapport de progression PDF</li>
              <li v-else>PDF progress report</li>

              <li v-if="locale === 'fr'">Mode hors-ligne (PWA)</li>
              <li v-else>Offline mode (PWA)</li>

              <li v-if="locale === 'fr'">Bilingue FR / EN</li>
              <li v-else>Bilingual FR / EN</li>
            </ul>
          </section>

          <!-- Corrections -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🐛</span>
              {{ locale === 'fr' ? 'Corrections' : 'Bug fixes' }}
            </h2>
            <p class="changelog__empty">
              {{
                locale === 'fr'
                  ? 'Aucune pour v1.0.0 — première version.'
                  : 'None for v1.0.0 — first release.'
              }}
            </p>
          </section>
        </article>

      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.changelog {
  padding: 80px 0 100px;
  min-height: 60vh;

  // ── Hero ──────────────────────────────────────────────────
  &__hero {
    text-align: center;
    padding: 48px 0 56px;
  }

  &__hero-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  &__hero-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 900;
    color: var(--color-text);
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }

  &__hero-sub {
    font-size: 1rem;
    color: var(--color-text-secondary);
    max-width: 440px;
    margin: 0 auto;
    line-height: 1.7;
  }

  // ── Liste des versions ────────────────────────────────────
  &__list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 680px;
    margin: 0 auto;
  }

  // ── Entrée de version ─────────────────────────────────────
  &__entry {
    background: white;
    border-radius: var(--radius-xl);
    border: 1.5px solid var(--color-surface-dark);
    padding: 32px;
    box-shadow: var(--shadow-sm);
  }

  &__version-badge {
    display: inline-block;
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 900;
    color: var(--color-primary-dark);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
    border: 1.5px solid rgba(102, 126, 234, 0.25);
    border-radius: var(--radius-full);
    padding: 4px 16px;
    margin-bottom: 6px;
  }

  &__date {
    font-size: 0.82rem;
    color: var(--color-text-light);
    font-weight: 600;
    margin-bottom: 24px;
  }

  // ── Sections (Nouveautés / Corrections) ──────────────────
  &__section {
    & + & { margin-top: 24px; }
  }

  &__section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 12px;
  }

  // ── Liste d'items ─────────────────────────────────────────
  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      line-height: 1.6;

      &::before {
        content: '—';
        color: var(--color-primary);
        font-weight: 700;
        flex-shrink: 0;
        margin-top: 1px;
      }
    }
  }

  &__empty {
    font-size: 0.88rem;
    color: var(--color-text-light);
    font-style: italic;
  }
}
</style>
