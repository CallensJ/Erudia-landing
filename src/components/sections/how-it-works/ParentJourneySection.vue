<!-- ParentJourneySection.vue — Parcours parent en 3 étapes
     - Fond surface (gris clair) pour contraster avec la section enfant (blanc)
     - 3 cards en grille : 1 col mobile → 3 cols desktop
     - Chaque card : barre colorée top, numéro gradient or, icône, titre, description + liste détaillée
     - Mini mockup "admin screen" sur la première card (desktop)
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// ── Données des étapes parent ──────────────────────────────────
const steps = [
  {
    num: '01',
    icon: '🛡️',
    barColor: 'linear-gradient(90deg, #667eea, #764ba2)',
    title: 'Accéder au mode admin',
    desc: "Un bouton discret en bas du profil enfant. Un clic — une authentification Supabase (email ou Google) est requise. Pas de compte parent séparé à créer au préalable.",
    details: [
      'Connexion email ou Google en un clic',
      'PIN 4 chiffres pour les accès rapides suivants',
      'Accessible en 2 clics depuis le profil enfant',
    ],
  },
  {
    num: '02',
    icon: '📊',
    barColor: 'linear-gradient(90deg, #4CAF50, #45a049)',
    title: 'Consulter les statistiques',
    desc: "Graphiques de progression par catégorie, scores détaillés, série de jours consécutifs, badges gagnés. Définissez un objectif journalier et recevez un email si l'enfant ne l'atteint pas.",
    details: [
      'Graphiques par catégorie (Recharts)',
      'Objectif journalier personnalisable',
      'Alerte email si l\'objectif n\'est pas atteint',
    ],
  },
  {
    num: '03',
    icon: '📄',
    barColor: 'linear-gradient(90deg, #FF9800, #F57C00)',
    title: 'Recevoir des rapports PDF',
    desc: "Planifiez un envoi hebdomadaire ou mensuel, ou déclenchez un envoi manuel à tout moment. Le rapport PDF inclut tous les graphiques et statistiques de progression.",
    details: [
      'Rapport PDF avec tous les graphiques',
      'Envoi automatique hebdo ou mensuel',
      'Déclenchement manuel à tout moment',
    ],
  },
]

// ── Reveal au scroll ──────────────────────────────────────────
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

  document.querySelectorAll('.parent-card').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="parent-journey" aria-labelledby="parent-journey-title">
    <div class="container">

      <!-- En-tête -->
      <div class="parent-journey__header">
        <div class="pill pill--primary label">👨‍👩‍👧 Parcours parent</div>
        <h2 id="parent-journey-title" class="parent-journey__heading">
          3 étapes pour suivre
        </h2>
        <p class="parent-journey__subline">
          Pas de compte séparé. Le mode admin est intégré dans l'app —
          accès en 2 clics, sécurisé par votre compte Supabase.
        </p>
      </div>

      <!-- Grille de 3 cards -->
      <div class="parent-journey__grid">
        <article
          v-for="(step, index) in steps"
          :key="step.num"
          class="parent-card"
          :data-index="index"
          :style="{ '--bar-color': step.barColor }"
        >
          <!-- Barre colorée en haut (via ::before) -->

          <!-- Numéro en gradient or -->
          <div class="parent-card__num">{{ step.num }}</div>

          <!-- Icône -->
          <div class="parent-card__icon" aria-hidden="true">{{ step.icon }}</div>

          <!-- Contenu -->
          <h3 class="parent-card__title">{{ step.title }}</h3>
          <p class="parent-card__desc">{{ step.desc }}</p>

          <!-- Détails -->
          <ul class="parent-card__details" aria-label="Points clés">
            <li
              v-for="detail in step.details"
              :key="detail"
              class="parent-card__detail-item"
            >
              <svg
                class="parent-card__check"
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle cx="7" cy="7" r="7" fill="currentColor" opacity="0.12" />
                <path d="M4 7l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ detail }}
            </li>
          </ul>

        </article>
      </div>

      <!-- Note rassurante en bas -->
      <p class="parent-journey__note" aria-label="Note de confidentialité">
        🔒 Vos données adultes et les données enfant sont strictement séparées.
        Aucune donnée personnelle enfant n'est transmise à des tiers.
      </p>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.parent-journey {
  background: var(--color-surface);
  padding: 80px 0;

  @include m.respond-to(md) { padding: 110px 0; }

  // ── En-tête ──
  &__header {
    text-align: center;
    margin-bottom: 64px;

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
    max-width: 580px;
    margin: 0 auto;
  }

  // ── Grille ──
  &__grid {
    display: grid;
    gap: 20px;

    @include m.respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // ── Note de bas de section ──
  &__note {
    text-align: center;
    margin-top: 48px;
    font-size: 0.82rem;
    color: var(--color-text-light);
    font-weight: 600;
  }
}

// ── Card ──────────────────────────────────────────────────────
.parent-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  border: 1.5px solid var(--color-surface-dark);
  position: relative;
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);

  // Reveal animation
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  // Délais décalés par index
  &[data-index='0'] { transition-delay: 0s; }
  &[data-index='1'] { transition-delay: 0.1s; }
  &[data-index='2'] { transition-delay: 0.2s; }

  // Barre colorée en haut via custom property
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--bar-color, var(--gradient-primary));
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: transparent;
  }

  // Surcharge : pas d'animation hover si reveal pas encore déclenché
  &:not(.is-visible):hover {
    transform: translateY(0);
  }

  // ── Numéro gradient or ──
  &__num {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 800;
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 4px;
    line-height: 1;
  }

  // ── Icône ──
  &__icon {
    font-size: 1.8rem;
    margin-bottom: 14px;
    display: block;
  }

  // ── Titre ──
  &__title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 10px;
    line-height: 1.3;
  }

  // ── Description ──
  &__desc {
    font-size: 0.88rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 18px;
  }

  // ── Liste de détails ──
  &__details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__detail-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--color-text-secondary);
    font-weight: 600;
    line-height: 1.4;
  }

  // ── Icône check SVG ──
  &__check {
    flex-shrink: 0;
    margin-top: 1px;
    // Couleur héritée de la barre : utilise la couleur primaire par défaut
    color: var(--color-primary);

    .parent-card[data-index='1'] & { color: #4CAF50; }
    .parent-card[data-index='2'] & { color: #FF9800; }
  }
}
</style>
