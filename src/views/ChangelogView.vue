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

        <!-- ────────────── v1.3.1 ────────────── -->
        <article class="changelog__entry">
          <div class="changelog__version-badge">v1.3.1</div>
          <div class="changelog__date">
            {{ locale === 'fr' ? '10 mai 2026' : 'May 10, 2026' }}
          </div>

          <!-- Nouveautés -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🆕</span>
              {{ locale === 'fr' ? 'Nouveautés' : 'New features' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Trophées : barre de progression vers le prochain badge dans chaque groupe (catégories, parties jouées, streak, collectionneurs) — avec métrique adaptée (parties jouées, scores parfaits, jours consécutifs)</li>
              <li v-else>Trophies: progress bar toward the next badge in each group (categories, games played, streak, collectors) — with adapted metric (games played, perfect scores, consecutive days)</li>
            </ul>
          </section>

          <!-- Corrections -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🐛</span>
              {{ locale === 'fr' ? 'Corrections' : 'Bug fixes' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Synchronisation premium : le profil d'un second joueur n'est plus écrasé après reconnexion du parent</li>
              <li v-else>Premium sync: a second player's profile is no longer overwritten after the parent reconnects</li>

              <li v-if="locale === 'fr'">Synchronisation premium : un profil supprimé ne réapparaît plus après un rafraîchissement (F5)</li>
              <li v-else>Premium sync: a deleted profile no longer reappears after a page refresh (F5)</li>

              <li v-if="locale === 'fr'">Synchronisation premium : la réinitialisation de progression est désormais aussi appliquée côté serveur</li>
              <li v-else>Premium sync: progress reset is now also applied server-side</li>

              <li v-if="locale === 'fr'">Espace parent : un message de confirmation s'affiche après "Réinitialiser la progression"</li>
              <li v-else>Parent dashboard: a confirmation message now appears after "Reset progress"</li>

              <li v-if="locale === 'fr'">Modale "À propos" : le lien vers le changelog pointe désormais vers la version localisée (/fr/changelog ou /en/changelog)</li>
              <li v-else>About modal: the changelog link now points to the localized version (/fr/changelog or /en/changelog)</li>
            </ul>
          </section>
        </article>

        <!-- ────────────── v1.3.0 ────────────── -->
        <article class="changelog__entry">
          <div class="changelog__version-badge">v1.3.0</div>
          <div class="changelog__date">
            {{ locale === 'fr' ? '8 mai 2026' : 'May 8, 2026' }}
          </div>

          <!-- Nouveautés -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🆕</span>
              {{ locale === 'fr' ? 'Nouveautés' : 'New features' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Thèmes de couleur Garçon (bleu) et Fille (rose) — toggle depuis le profil enfant</li>
              <li v-else>Boy (blue) and Girl (pink) color themes — toggled from the child profile</li>
            </ul>
          </section>

          <!-- Améliorations -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">✨</span>
              {{ locale === 'fr' ? 'Améliorations' : 'Improvements' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Quiz : bouton "Suivant →" manuel après chaque réponse — avance automatique de secours à 4 s</li>
              <li v-else>Quiz: manual "Next →" button after each answer — fallback auto-advance at 4 s</li>

              <li v-if="locale === 'fr'">Accueil : catégories premium en accordéon (5 visibles, bouton "Voir plus")</li>
              <li v-else>Home: premium categories in an accordion (5 visible, "See more" button)</li>

              <li v-if="locale === 'fr'">Accueil : aide contextuelle sous "Jouer !" quand le bouton est désactivé</li>
              <li v-else>Home: contextual hint below "Play!" when the button is disabled</li>

              <li v-if="locale === 'fr'">Accueil : spinner animé + texte "Chargement…" et bouton "Réessayer" en cas d'erreur</li>
              <li v-else>Home: animated spinner + "Loading…" text and "Retry" button on error</li>

              <li v-if="locale === 'fr'">Onboarding : validation du pseudo en temps réel (min. 2 caractères, compteur X/20)</li>
              <li v-else>Onboarding: real-time username validation (min. 2 chars, X/20 counter)</li>

              <li v-if="locale === 'fr'">Navigation : état actif mis en évidence dans la barre latérale desktop</li>
              <li v-else>Navigation: active state highlighted in the desktop sidebar</li>

              <li v-if="locale === 'fr'">Navigation : le titre du joueur (Apprenti, Érudit, Sage…) s'affiche dans la langue choisie</li>
              <li v-else>Navigation: player title (Apprentice, Scholar, Sage…) now displayed in the chosen language</li>

              <li v-if="locale === 'fr'">Résultats : messages de fin adaptés au pourcentage de bonnes réponses</li>
              <li v-else>Results: end-of-game messages adapted to the percentage of correct answers</li>

              <li v-if="locale === 'fr'">Quiz & Résultats : emoji propre à chaque catégorie (🔬 Sciences, 📜 Histoire, 🌍 Géographie…)</li>
              <li v-else>Quiz & Results: unique emoji per category (🔬 Science, 📜 History, 🌍 Geography…)</li>

              <li v-if="locale === 'fr'">Survol des boutons plus prononcé (assombrissement) + effet de pression sur mobile</li>
              <li v-else>Stronger hover effect on buttons (darkening) + press feedback on mobile</li>
            </ul>
          </section>

          <!-- Corrections -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🐛</span>
              {{ locale === 'fr' ? 'Corrections' : 'Bug fixes' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Espace parent : suppression d'un profil enfant possible même s'il est le seul</li>
              <li v-else>Parent dashboard: child profile deletion now allowed even for the last remaining profile</li>

              <li v-if="locale === 'fr'">Objectifs de la semaine : les noms de catégories s'affichaient en clé brute (ex. stats.geographie) — corrigé</li>
              <li v-else>Weekly goals: category names were displaying as raw keys (e.g. stats.geographie) — fixed</li>

              <li v-if="locale === 'fr'">Bouton "Jouer" dans les recommandations : rendu du bord arrondi corrigé</li>
              <li v-else>Recommendations "Play" button: border-radius rendering corrected</li>

              <li v-if="locale === 'fr'">Barre latérale desktop : espacement augmenté entre "Accueil" et "Statistiques"</li>
              <li v-else>Desktop sidebar: increased spacing between "Home" and "Statistics" buttons</li>

              <li v-if="locale === 'fr'">Espace parent — Profils enfants : mise en page de l'icône corbeille et du bouton "Ajouter" reconstruite</li>
              <li v-else>Parent dashboard — Child profiles: trash icon and "Add" button layout rebuilt</li>
            </ul>
          </section>
        </article>

        <!-- ────────────── v1.2.0 ────────────── -->
        <article class="changelog__entry">
          <div class="changelog__version-badge">v1.2.0</div>
          <div class="changelog__date">
            {{ locale === 'fr' ? '27 avril 2026' : 'April 27, 2026' }}
          </div>

          <!-- Nouveautés -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🆕</span>
              {{ locale === 'fr' ? 'Nouveautés' : 'New features' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Bouton pour quitter un quiz en cours (confirmation avant sortie)</li>
              <li v-else>Button to exit an ongoing quiz (confirmation before leaving)</li>

              <li v-if="locale === 'fr'">Avancement automatique sur réponse incorrecte — le bouton "Suivant" disparaît</li>
              <li v-else>Auto-advance on incorrect answer — the "Next" button is gone</li>

              <li v-if="locale === 'fr'">Boutons Statistiques et Accueil déplacés dans la barre latérale desktop</li>
              <li v-else>Statistics and Home buttons moved to the desktop sidebar</li>

              <li v-if="locale === 'fr'">Modale de conversion Premium : cliquer sur une catégorie verrouillée ou "Changer de joueur" en mode gratuit affiche une modale présentant les avantages avant de rediriger vers l'abonnement</li>
              <li v-else>Premium conversion modal: clicking a locked category or "Switch player" in free mode shows a modal presenting the benefits before redirecting to the subscription page</li>

              <li v-if="locale === 'fr'">Suppression de profil enfant désormais réservée à l'espace parent</li>
              <li v-else>Child profile deletion is now restricted to the parent dashboard</li>

              <li v-if="locale === 'fr'">Changer de joueur depuis le profil limité aux abonnés Premium (1 profil en gratuit, 4 en Premium)</li>
              <li v-else>Switching players from the profile screen is now limited to Premium subscribers (1 profile free, 4 with Premium)</li>

              <li v-if="locale === 'fr'">600 nouvelles questions ajoutées pour la catégorie Géographie (version anglaise)</li>
              <li v-else>600 new questions added for the Geography category (English version)</li>

              <li v-if="locale === 'fr'">Paiement : activation de Google Pay, Amazon Pay et Cartes Bancaires</li>
              <li v-else>Payment: Google Pay, Amazon Pay and Cartes Bancaires enabled</li>
            </ul>
          </section>

          <!-- Corrections -->
          <section class="changelog__section">
            <h2 class="changelog__section-title">
              <span aria-hidden="true">🐛</span>
              {{ locale === 'fr' ? 'Corrections' : 'Bug fixes' }}
            </h2>
            <ul class="changelog__items">
              <li v-if="locale === 'fr'">Correction du bouton "Se déconnecter" dans l'espace parent</li>
              <li v-else>Fixed the "Sign out" button in the parent dashboard</li>

              <li v-if="locale === 'fr'">Mentions légales et CGU : nom de l'éditeur et email de contact corrigés</li>
              <li v-else>Legal notices and Terms: publisher name and contact email corrected</li>

              <li v-if="locale === 'fr'">Tarifs de l'abonnement mis à jour dans les CGU (1,99 €/mois ou 9,99 €/6 mois)</li>
              <li v-else>Subscription pricing updated in Terms (€1.99/month or €9.99/6 months)</li>
            </ul>
          </section>
        </article>

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
