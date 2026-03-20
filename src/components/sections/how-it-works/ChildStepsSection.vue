<!-- ChildStepsSection.vue — Parcours enfant en 5 étapes
     - Timeline verticale avec ligne de connexion
     - Alternance gauche/droite sur desktop (≥1024px)
     - Chaque étape : numéro coloré, label, titre, description, détails, mockup écran
     - Reveal au scroll via IntersectionObserver
     - Mockups inline Vue (pas de v-html) pour la sécurité -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// ── Données des étapes (contenu statique FR uniquement pour MVP landing) ──
// Note : tranche d'âge supprimée de l'app (MVP 4) — pas mentionnée dans les détails
const steps = [
  {
    num: '1',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    colorFlat: '#667eea',
    label: 'Étape 1',
    title: 'Créer son profil',
    desc: "L'enfant choisit un pseudonyme fun et sélectionne son avatar parmi des dizaines de personnages DiceBear. En 30 secondes, il est prêt à jouer — sans email, sans mot de passe.",
    details: [
      'Pseudonyme unique (suggestions fun si pris)',
      '5 styles d\'avatars, des centaines de combinaisons',
      'Aucune donnée personnelle collectée (COPPA)',
    ],
    visual: 'onboarding',
  },
  {
    num: '2',
    gradient: 'linear-gradient(135deg, #4CAF50, #45a049)',
    colorFlat: '#4CAF50',
    label: 'Étape 2',
    title: 'Choisir sa catégorie & difficulté',
    desc: "Sur l'écran Home, l'enfant choisit parmi les catégories disponibles et son niveau : Facile, Moyen ou Difficile. Le bouton Jouer s'active dès que les deux choix sont faits.",
    details: [
      '3 catégories gratuites : Sciences, Histoire, Héros',
      '3 niveaux de difficulté',
      'Bouton Jouer actif dès sélection complète',
    ],
    visual: 'category',
  },
  {
    num: '3',
    gradient: 'linear-gradient(135deg, #FF9800, #F57C00)',
    colorFlat: '#FF9800',
    label: 'Étape 3',
    title: 'Jouer les 20 questions',
    desc: '20 questions par partie, filtrées par catégorie et difficulté. Feedback immédiat après chaque réponse : vert pour correcte, rouge pour incorrecte avec la bonne réponse affichée. La mascotte Nova accompagne l\'enfant tout au long.',
    details: [
      '20 questions par session',
      'Feedback visuel immédiat (vert / rouge)',
      'Nova affiche la bonne réponse après une erreur',
    ],
    visual: 'quiz',
  },
  {
    num: '4',
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
    colorFlat: '#b8860b',
    label: 'Étape 4',
    title: 'Voir ses résultats & badges',
    desc: 'Score final affiché avec un message de Nova adapté à la performance. Un badge est attribué si le score atteint 4/20. Des confettis célèbrent chaque réussite — même les petites.',
    details: [
      'Score X / 20 avec message encourageant de Nova',
      'Badge attribué dès 4 / 20 bonnes réponses',
      'Confettis + célébration animée',
    ],
    visual: 'results',
  },
  {
    num: '5',
    gradient: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
    colorFlat: '#9C27B0',
    label: 'Étape 5',
    title: 'Consulter son profil',
    desc: 'Le profil affiche l\'avatar, le pseudo, les statistiques globales et les badges gagnés. Le défi quotidien et le mode duel sont accessibles depuis la navigation. Tout est sauvegardé localement — même hors ligne.',
    details: [
      'Avatar + pseudo + badges visibles en un coup d\'œil',
      'Statistiques détaillées par catégorie (Erudia+)',
      'Défi quotidien & mode duel accessibles',
    ],
    visual: 'profile',
  },
]

// ── Reveal au scroll (IntersectionObserver) ──
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  document.querySelectorAll('.child-step').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="child-steps" aria-labelledby="child-steps-title">
    <div class="container">

      <!-- En-tête de section -->
      <div class="child-steps__header">
        <div class="pill pill--primary label">🎮 Parcours enfant</div>
        <h2 id="child-steps-title" class="child-steps__heading">
          5 étapes pour jouer
        </h2>
        <p class="child-steps__subline">
          De l'ouverture de l'app au premier badge — en moins de 5 minutes.
        </p>
      </div>

      <!-- Timeline -->
      <div class="child-steps__timeline">

        <article
          v-for="(step, index) in steps"
          :key="step.num"
          class="child-step"
          :data-index="index"
        >

          <!-- Numéro (centre sur desktop) -->
          <div class="child-step__num-wrap">
            <div
              class="child-step__num"
              :style="{ background: step.gradient }"
              :aria-label="`Étape ${step.num}`"
            >
              {{ step.num }}
            </div>
          </div>

          <!-- Texte -->
          <div class="child-step__text">
            <div
              class="child-step__label"
              :style="{ color: step.colorFlat }"
            >
              {{ step.label }}
            </div>
            <h3 class="child-step__title">{{ step.title }}</h3>
            <p class="child-step__desc">{{ step.desc }}</p>
            <ul class="child-step__details" aria-label="Points clés">
              <li
                v-for="detail in step.details"
                :key="detail"
                class="child-step__detail-item"
              >
                <span
                  class="child-step__dot"
                  :style="{ background: step.colorFlat }"
                  aria-hidden="true"
                ></span>
                {{ detail }}
              </li>
            </ul>
          </div>

          <!-- Mockup écran (visible desktop uniquement) -->
          <div class="child-step__visual" aria-hidden="true">
            <div
              class="child-step__screen"
              :style="{ '--step-gradient': step.gradient }"
            >

              <!-- ── Onboarding ── -->
              <template v-if="step.visual === 'onboarding'">
                <div class="mock-header" :style="{ background: step.gradient }">
                  <div class="mock-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="mock-title-bar">Crée ton profil</div>
                </div>
                <div class="mock-body">
                  <div class="mock-input mock-input--filled">🦊 Lucas</div>
                  <div class="mock-avatar-label">Choisis ton avatar</div>
                  <div class="mock-avatar-grid">
                    <div class="mock-avatar mock-avatar--selected">🦊</div>
                    <div class="mock-avatar">🐨</div>
                    <div class="mock-avatar">🦁</div>
                    <div class="mock-avatar">🐸</div>
                    <div class="mock-avatar">🦋</div>
                    <div class="mock-avatar">🐙</div>
                    <div class="mock-avatar">🦄</div>
                    <div class="mock-avatar">🐲</div>
                  </div>
                </div>
              </template>

              <!-- ── Catégorie ── -->
              <template v-else-if="step.visual === 'category'">
                <div class="mock-header" :style="{ background: step.gradient }">
                  <div class="mock-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="mock-title-bar">Erudia</div>
                </div>
                <div class="mock-body">
                  <div class="mock-cat mock-cat--selected">
                    <span class="mock-cat-icon">🔬</span>
                    <div>
                      <div class="mock-cat-name">Sciences</div>
                      <div class="mock-cat-count">300 questions</div>
                    </div>
                  </div>
                  <div class="mock-cat">
                    <span class="mock-cat-icon">📜</span>
                    <div>
                      <div class="mock-cat-name">Histoire</div>
                      <div class="mock-cat-count">500 questions</div>
                    </div>
                  </div>
                  <div class="mock-diff-label">Difficulté</div>
                  <div class="mock-diff-row">
                    <div class="mock-diff mock-diff--easy-active">Facile</div>
                    <div class="mock-diff">Moyen</div>
                    <div class="mock-diff">Difficile</div>
                  </div>
                </div>
              </template>

              <!-- ── Quiz ── -->
              <template v-else-if="step.visual === 'quiz'">
                <div class="mock-header" :style="{ background: step.gradient }">
                  <div class="mock-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="mock-title-bar">Question 9 / 20</div>
                </div>
                <div class="mock-body">
                  <div class="mock-progress">
                    <div class="mock-progress-fill" style="width: 45%"></div>
                  </div>
                  <div class="mock-question">
                    Quelle planète est la plus proche du Soleil ?
                  </div>
                  <div class="mock-option mock-option--wrong">
                    <div class="mock-letter">A</div>Vénus
                  </div>
                  <div class="mock-option mock-option--correct">
                    <div class="mock-letter">B</div>Mercure ✓
                  </div>
                  <div class="mock-option">
                    <div class="mock-letter">C</div>La Terre
                  </div>
                  <div class="mock-option">
                    <div class="mock-letter">D</div>Mars
                  </div>
                </div>
              </template>

              <!-- ── Résultats ── -->
              <template v-else-if="step.visual === 'results'">
                <div class="mock-header" :style="{ background: step.gradient }">
                  <div class="mock-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="mock-title-bar" style="color: #333">Résultats 🎉</div>
                </div>
                <div class="mock-body">
                  <div class="mock-results-score">
                    <div class="mock-score-circle">
                      <div class="mock-score-num">14</div>
                      <div class="mock-score-denom">/ 20</div>
                    </div>
                    <div class="mock-score-label">Excellent ! 🦉</div>
                  </div>
                  <div class="mock-badge-earned">
                    <span class="mock-badge-icon">🏆</span>
                    <span class="mock-badge-text">Badge Explorateur Sciences !</span>
                  </div>
                  <div class="mock-result-actions">
                    <div class="mock-result-btn mock-result-btn--primary">Rejouer</div>
                    <div class="mock-result-btn">Accueil</div>
                  </div>
                </div>
              </template>

              <!-- ── Profil ── -->
              <template v-else-if="step.visual === 'profile'">
                <div class="mock-header" :style="{ background: step.gradient }">
                  <div class="mock-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="mock-title-bar">Mon profil</div>
                </div>
                <div class="mock-body">
                  <div class="mock-profile-header">
                    <div class="mock-profile-avatar">🦊</div>
                    <div class="mock-profile-pseudo">Lucas</div>
                  </div>
                  <div class="mock-stats-row">
                    <div class="mock-stat">
                      <div class="mock-stat-val">47</div>
                      <div class="mock-stat-label">Parties</div>
                    </div>
                    <div class="mock-stat">
                      <div class="mock-stat-val">68%</div>
                      <div class="mock-stat-label">Moy.</div>
                    </div>
                    <div class="mock-stat">
                      <div class="mock-stat-val">5🔥</div>
                      <div class="mock-stat-label">Série</div>
                    </div>
                  </div>
                  <div class="mock-badges-row">
                    <div class="mock-badge-circle" style="background: linear-gradient(135deg,#FFD700,#FFA500)">🏆</div>
                    <div class="mock-badge-circle" style="background: linear-gradient(135deg,#4CAF50,#45a049)">⭐</div>
                    <div class="mock-badge-circle" style="background: linear-gradient(135deg,#667eea,#764ba2)">🔬</div>
                    <div class="mock-badge-circle mock-badge-circle--locked">🔒</div>
                    <div class="mock-badge-circle mock-badge-circle--locked">🔒</div>
                  </div>
                </div>
              </template>

            </div>
          </div>
          <!-- Fin mockup -->

        </article>
      </div>
      <!-- Fin timeline -->

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.child-steps {
  padding: 80px 0;
  background: white;

  @include m.respond-to(md) { padding: 110px 0; }

  // ── En-tête ──
  &__header {
    text-align: center;
    margin-bottom: 72px;

    .pill { margin-bottom: 14px; }
  }

  &__heading {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.015em;
    margin-bottom: 12px;
  }

  &__subline {
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    color: var(--color-text-secondary);
    line-height: 1.75;
    font-weight: 500;
  }

  // ── Timeline wrapper ──
  &__timeline {
    position: relative;
    display: flex;
    flex-direction: column;

    // Ligne verticale de connexion
    &::before {
      content: '';
      position: absolute;
      left: 27px; // centré sur le cercle numéro (mobile)
      top: 48px;
      bottom: 48px;
      width: 2px;
      background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-dark));
      opacity: 0.15;
      border-radius: 2px;

      @include m.respond-to(lg) {
        // Centré sur la colonne du milieu
        left: 50%;
        transform: translateX(-50%);
        top: 60px;
        bottom: 60px;
      }
    }
  }
}

// ── Étape ────────────────────────────────────────────────────
.child-step {
  display: grid;
  // Mobile : colonne numéro (60px) + texte
  grid-template-columns: 60px 1fr;
  grid-template-areas: 'num text';
  gap: 24px;
  padding-bottom: 52px;
  position: relative;
  align-items: start;

  // Reveal animation
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  // Délais décalés par index
  @for $i from 0 through 4 {
    &[data-index='#{$i}'] { transition-delay: #{$i * 0.08}s; }
  }

  // Desktop : grille 3 colonnes (texte | num | visuel)
  @include m.respond-to(lg) {
    grid-template-columns: 1fr 80px 1fr;
    grid-template-areas: 'text num visual';
    gap: 0;
    padding-bottom: 72px;
    align-items: start;

    // Étapes paires : inverser texte et visuel
    &:nth-child(even) {
      grid-template-areas: 'visual num text';
    }
  }

  // ── Colonne numéro ──
  &__num-wrap {
    grid-area: num;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  &__num {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.3rem;
    color: white;
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
    flex-shrink: 0;
    transition: transform 0.3s ease;

    .child-step:hover & { transform: scale(1.1); }
  }

  // ── Colonne texte ──
  &__text {
    grid-area: text;
    padding-top: 8px;

    @include m.respond-to(lg) {
      padding: 0 48px;

      // Étapes impaires : texte à droite → aligné à droite
      .child-step:nth-child(odd) & {
        text-align: right;
        padding-right: 56px;
        padding-left: 0;
      }

      // Étapes paires : texte à gauche
      .child-step:nth-child(even) & {
        text-align: left;
        padding-left: 56px;
        padding-right: 0;
      }
    }
  }

  &__label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 6px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 2vw, 1.3rem);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 10px;
    line-height: 1.3;
  }

  &__desc {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.75;
    margin-bottom: 14px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--color-text-secondary);
    font-weight: 600;

    // Sur desktop, les étapes impaires ont les items inversés (point à droite)
    @include m.respond-to(lg) {
      .child-step:nth-child(odd) & {
        flex-direction: row-reverse;
      }
    }
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  // ── Colonne visuel (mockup) — desktop uniquement ──
  &__visual {
    grid-area: visual;
    display: none;

    @include m.respond-to(lg) {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
  }

  &__screen {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    border: 1.5px solid var(--color-surface-dark);
    width: 240px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    .child-step:hover & {
      transform: translateY(-4px) rotate(1deg);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    }

    // Étapes paires : rotation inverse
    .child-step:nth-child(even):hover & {
      transform: translateY(-4px) rotate(-1deg);
    }
  }
}

// ── Éléments communs des mockups ─────────────────────────────
.mock {

  // En-tête coloré
  &-header {
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &-dots {
    display: flex;
    gap: 4px;

    span {
      display: block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
    }
  }

  &-title-bar {
    font-size: 0.72rem;
    font-weight: 700;
    color: white;
    opacity: 0.9;
  }

  &-body {
    padding: 14px;
  }

  // ── Onboarding ──
  &-input {
    background: var(--color-surface);
    border-radius: var(--radius-sm);
    padding: 10px 12px;
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    margin-bottom: 10px;
    border: 1.5px solid var(--color-surface-dark);

    &--filled {
      border-color: var(--color-primary);
      color: var(--color-text);
      font-weight: 600;
    }
  }

  &-avatar-label {
    font-size: 0.63rem;
    font-weight: 700;
    color: var(--color-text-light);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }

  &-avatar-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  &-avatar {
    aspect-ratio: 1;
    border-radius: 8px;
    background: var(--color-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border: 2px solid transparent;

    &--selected {
      border-color: var(--color-primary);
      background: rgba(102, 126, 234, 0.08);
    }
  }

  // ── Catégorie ──
  &-cat {
    border-radius: var(--radius-md);
    padding: 10px 12px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1.5px solid var(--color-surface-dark);
    background: white;

    &--selected {
      border-color: var(--color-primary);
      background: rgba(102, 126, 234, 0.06);
    }
  }

  &-cat-icon { font-size: 1.2rem; }
  &-cat-name { font-size: 0.75rem; font-weight: 700; color: var(--color-text); }
  &-cat-count { font-size: 0.62rem; color: var(--color-text-light); }

  &-diff-label {
    font-size: 0.63rem;
    font-weight: 700;
    color: var(--color-text-light);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 10px 0 6px;
  }

  &-diff-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }

  &-diff {
    padding: 7px 4px;
    border-radius: var(--radius-sm);
    font-size: 0.62rem;
    font-weight: 700;
    text-align: center;
    border: 1.5px solid var(--color-surface-dark);
    color: var(--color-text-secondary);

    &--easy-active {
      border-color: #4CAF50;
      background: rgba(76, 175, 80, 0.1);
      color: #2e7d32;
    }
  }

  // ── Quiz ──
  &-progress {
    height: 4px;
    background: var(--color-surface);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 12px;
  }

  &-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: var(--gradient-accent);
  }

  &-question {
    background: var(--color-surface);
    border-radius: var(--radius-md);
    padding: 10px;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.5;
    margin-bottom: 10px;
  }

  &-option {
    padding: 8px 10px;
    border-radius: var(--radius-sm);
    font-size: 0.68rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 7px;
    border: 1.5px solid var(--color-surface-dark);
    margin-bottom: 5px;
    color: var(--color-text-secondary);

    &--correct {
      border-color: #4CAF50;
      background: rgba(76, 175, 80, 0.08);
      color: #2e7d32;

      .mock-letter { background: #4CAF50; color: white; }
    }

    &--wrong {
      border-color: #EF4444;
      background: rgba(239, 68, 68, 0.08);
      color: #c62828;

      .mock-letter { background: #EF4444; color: white; }
    }
  }

  &-letter {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: var(--color-surface-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.58rem;
    font-weight: 800;
    flex-shrink: 0;
  }

  // ── Résultats ──
  &-results-score {
    text-align: center;
    padding: 16px 0 12px;
  }

  &-score-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--gradient-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    box-shadow: var(--shadow-md);
  }

  &-score-num {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 800;
    color: white;
    line-height: 1;
  }

  &-score-denom {
    font-size: 0.58rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
  }

  &-score-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--color-text);
  }

  &-badge-earned {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border-radius: var(--radius-md);
    padding: 8px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  &-badge-icon { font-size: 1.1rem; }
  &-badge-text { font-size: 0.68rem; font-weight: 700; color: #333; }

  &-result-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  &-result-btn {
    padding: 8px;
    border-radius: var(--radius-sm);
    font-size: 0.65rem;
    font-weight: 700;
    text-align: center;
    border: 1.5px solid var(--color-surface-dark);
    color: var(--color-text-secondary);

    &--primary {
      background: var(--gradient-primary);
      color: white;
      border-color: transparent;
    }
  }

  // ── Profil ──
  &-profile-header {
    text-align: center;
    padding: 14px 0 10px;
  }

  &-profile-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin: 0 auto 6px;
    box-shadow: var(--shadow-sm);
  }

  &-profile-pseudo {
    font-family: var(--font-display);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--color-text);
  }

  &-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin: 10px 0;
  }

  &-stat {
    background: var(--color-surface);
    border-radius: var(--radius-sm);
    padding: 7px 4px;
    text-align: center;
  }

  &-stat-val {
    font-family: var(--font-display);
    font-size: 0.88rem;
    font-weight: 800;
    color: var(--color-primary);
  }

  &-stat-label {
    font-size: 0.55rem;
    color: var(--color-text-light);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &-badges-row {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 4px;
  }

  &-badge-circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    box-shadow: var(--shadow-sm);

    &--locked {
      background: var(--color-surface);
      opacity: 0.4;
      filter: grayscale(1);
    }
  }
}
</style>
