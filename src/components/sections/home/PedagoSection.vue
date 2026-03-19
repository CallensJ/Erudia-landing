<!-- PedagoSection.vue — Section philosophie pédagogique
     Layout 2 colonnes desktop : texte + barres de niveau à gauche, stats cards à droite.
     Fond gradient sombre (cohérent avec HeroSection).
     Remplace MomentsSection — fidèle à la maquette documentations/landing/maquettes/index.html. -->

<script setup lang="ts">
// Niveaux de difficulté avec couleurs du design system
const levels = [
  {
    color: '#4CAF50',
    name: 'Facile — Notions fondamentales',
    desc: 'Programme primaire, accessible dès 6 ans',
    fill: 55,
  },
  {
    color: '#FF9800',
    name: 'Moyen — Approfondissement',
    desc: 'CM1–CM2, culture générale élargie',
    fill: 75,
  },
  {
    color: '#EF4444',
    name: 'Difficile — Niveau collège',
    desc: 'Culture internationale, programme 6e–4e',
    fill: 90,
  },
]

// Statistiques clés — 4 chiffres en grille 2×2
const stats = [
  {
    num: '800+',
    title: 'Questions validées',
    desc: 'Alignées sur les programmes FR et international, vérifiées pédagogiquement',
  },
  {
    num: '9',
    title: 'Catégories',
    desc: 'Sciences, Histoire, Héros, Géographie, Espace, Mythologie et plus',
  },
  {
    num: '3×',
    title: 'Niveaux de difficulté',
    desc: 'Easy → Medium → Hard pour progresser à son propre rythme',
  },
  {
    num: 'FR\nEN',
    title: 'Bilingue',
    desc: 'Questions et interface disponibles dans les deux langues dès le lancement',
  },
]
</script>

<template>
  <section class="pedago section" aria-labelledby="pedago-title">
    <!-- Blob décoratif haut-droite -->
    <div class="pedago__blob" aria-hidden="true" />

    <div class="container">
      <div class="pedago__inner">

        <!-- ── Colonne texte ─────────────────────────── -->
        <div class="pedago__text">
          <div class="pill pill--ghost pedago__pill">Philosophie pédagogique</div>

          <h2 id="pedago-title" class="pedago__title heading-lg">
            Conçu pour 6–11 ans.<br/>
            <span class="pedago__accent">Challengé jusqu'au collège.</span>
          </h2>

          <p class="pedago__p">
            L'interface d'Erudia est pensée pour les enfants : boutons larges, icônes expressives, mascotte Nova. Un enfant de 6 ans peut naviguer seul.
          </p>
          <p class="pedago__p">
            Mais le contenu des questions s'étend jusqu'au niveau collège. Ce n'est pas un accident — c'est un choix pédagogique assumé. Erudia vise à ce que votre enfant apprenne quelque chose à chaque partie, pas seulement confirmer ce qu'il sait déjà.
          </p>
          <p class="pedago__note">
            💡 Un score de 8/20 n'est pas un échec — c'est une invitation à grandir.
          </p>

          <!-- Barres de niveaux -->
          <div class="pedago__levels">
            <div
              v-for="level in levels"
              :key="level.name"
              class="pedago__level-bar"
            >
              <span
                class="pedago__level-dot"
                :style="{ background: level.color }"
                aria-hidden="true"
              />
              <div class="pedago__level-info">
                <div class="pedago__level-name">{{ level.name }}</div>
                <div class="pedago__level-desc">{{ level.desc }}</div>
              </div>
              <div class="pedago__level-track" aria-hidden="true">
                <div
                  class="pedago__level-fill"
                  :style="{ width: level.fill + '%', background: level.color }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- ── Colonne stats ─────────────────────────── -->
        <div class="pedago__cards">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="pedago__card"
          >
            <div class="pedago__num" style="white-space: pre-line">{{ stat.num }}</div>
            <h4 class="pedago__card-title">{{ stat.title }}</h4>
            <p class="pedago__card-desc">{{ stat.desc }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/variables' as v;
@use '@/styles/abstracts/mixins' as m;

.pedago {
  // Fond gradient sombre — cohérent avec le hero
  background: var(--gradient-hero);
  color: white;
  position: relative;
  overflow: hidden;

  // ── Blob décoratif ────────────────────────────────────────
  &__blob {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent 70%);
    pointer-events: none;
  }

  // ── Grille 2 colonnes desktop ─────────────────────────────
  &__inner {
    display: grid;
    gap: 48px;
    align-items: center;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 1fr;
    }
  }

  // ── Colonne texte ─────────────────────────────────────────
  &__pill {
    // Pill adaptée au fond sombre
    background: rgba(102, 126, 234, 0.25) !important;
    color: rgba(255, 255, 255, 0.85) !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
    margin-bottom: 20px;
  }

  &__title {
    color: white;
    margin-top: 0;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  // Accent gradient sur le second titre
  &__accent {
    background: linear-gradient(135deg, #ffd700, #ff9800);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__p {
    color: rgba(255, 255, 255, 0.72);
    font-size: 1rem;
    line-height: 1.75;
    margin-bottom: 12px;
  }

  &__note {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.88rem;
    line-height: 1.6;
    margin-bottom: 0;
    font-style: italic;
  }

  // ── Barres de niveaux ─────────────────────────────────────
  &__levels {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 28px;
  }

  &__level-bar {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    padding: 14px 18px;
  }

  &__level-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__level-info {
    flex: 1;
  }

  &__level-name {
    font-size: 0.82rem;
    font-weight: 700;
    color: white;
    margin-bottom: 2px;
  }

  &__level-desc {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.55);
  }

  &__level-track {
    width: 80px;
    height: 5px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 3px;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__level-fill {
    height: 100%;
    border-radius: 3px;
  }

  // ── Grille stats 2×2 ─────────────────────────────────────
  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &__card {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-lg);
    padding: 24px 20px;
    backdrop-filter: blur(8px);
  }

  // Nombre — gradient accent
  &__num {
    font-family: var(--font-display);
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffd700, #ff9800);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 6px;
    line-height: 1.2;
  }

  &__card-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: white;
    margin: 0 0 4px;
  }

  &__card-desc {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.55;
    margin: 0;
  }
}
</style>
