<!-- ProblemSection.vue — Section "Problème / Solution" de la home page
     Objectif : adresser les 3 pain points parents (frustration, addiction, offline)
     et montrer qu'Erudia y répond directement.
     Tone : parent-to-parent, rassurant.
     Background surface (#F7F8FC) — alterne avec le hero blanc. -->

<script setup lang="ts">
// Chaque item : un défi du quotidien parent + comment Erudia y répond naturellement
const problems = [
  {
    icon: '🚗',
    label: 'En route, en vacances…',
    problem: "Le trajet de 40 minutes, la semaine sans WiFi au chalet, la salle d'attente — autant de moments où l'on voudrait que l'apprentissage continue, naturellement.",
    solutionIcon: '📡',
    solution: "Erudia fonctionne sans connexion. On télécharge les contenus une fois, et c'est parti — peu importe où se trouve votre enfant.",
  },
  {
    icon: '💛',
    label: 'Garder le goût d\'apprendre',
    problem: "Maintenir la curiosité d'un enfant, c'est délicat. Trop facile, il s'ennuie. Trop difficile, il décroche. Le bon équilibre change selon les jours.",
    solutionIcon: '🎯',
    solution: "Trois niveaux de difficulté, des encouragements à chaque étape, et des défis quotidiens calibrés — pour que chaque session se termine sur une victoire.",
  },
  {
    icon: '🔍',
    label: 'Savoir où en est son enfant',
    problem: "On sent bien que notre enfant progresse — mais avoir une vision claire de ses points forts, de ce qu'il maîtrise vraiment, c'est souvent flou.",
    solutionIcon: '📊',
    solution: "Le tableau de bord parental d'Erudia donne une vue honnête et simple : scores par catégorie, régularité, badges obtenus. Pas de jargon, juste l'essentiel.",
  },
]
</script>

<template>
  <section class="problem section section--surface" aria-labelledby="problem-title">
    <div class="container">

      <!-- En-tête de section -->
      <div class="problem__header">
        <div class="pill pill--primary problem__pill">Conçu pour le quotidien</div>
        <h2 id="problem-title" class="problem__title heading-lg">
          Des situations que tout parent connaît
        </h2>
        <p class="problem__subline subline">
          Erudia est né de ces petits moments du quotidien — et de l'envie de les transformer en occasions d'apprendre.
        </p>
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
      <p class="problem__closing">
        Erudia a été pensé par des parents, pour des parents — et surtout pour les enfants.
      </p>

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
