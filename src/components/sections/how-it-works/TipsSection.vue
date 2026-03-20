<!-- TipsSection.vue — Conseils pour bien démarrer
     - Fond sombre (--gradient-hero) : rupture visuelle entre les sections claires
     - 4 tips cards en glassmorphisme : 1 col → 2 cols → 4 cols
     - Orbe décoratif en arrière-plan
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// ── Données des conseils ───────────────────────────────────────
// Ton storyteller parent-to-parent : conseils pratiques, pas de jargon
const tips = [
  {
    icon: '🎯',
    title: 'Commencez par Facile',
    desc: "Même les enfants qui se croient forts seront surpris. Construire la confiance en Facile avant de passer au Moyen — c'est la recette d'un apprentissage durable.",
  },
  {
    icon: '📅',
    title: 'Le défi quotidien d\'abord',
    desc: "Faites-en une habitude du matin ou du soir. 20 questions = 5 minutes max. La régularité crée la progression — bien plus que les longues sessions.",
  },
  {
    icon: '⚔️',
    title: 'Défiez en famille',
    desc: "Le mode duel fonctionne entre enfant et parent. Un moyen ludique de jouer ensemble depuis des appareils séparés — et de montrer qu'apprendre, c'est fun à tout âge.",
  },
  {
    icon: '📲',
    title: 'Installez l\'app en PWA',
    desc: "Sur mobile, utilisez « Ajouter à l'écran d'accueil » pour une expérience native — et le mode hors ligne garanti. Fonctionne aussi bien sur iOS que sur Android.",
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
    { threshold: 0.12 }
  )

  document.querySelectorAll('.tip-card').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="tips" aria-labelledby="tips-title">

    <!-- Orbe décoratif -->
    <div class="tips__orb" aria-hidden="true"></div>

    <div class="container">
      <div class="tips__inner">

        <!-- En-tête -->
        <div class="tips__header">
          <div class="pill pill--white label">💡 Conseils</div>
          <h2 id="tips-title" class="tips__heading">
            Pour bien démarrer
          </h2>
          <p class="tips__subline">
            Quatre habitudes simples pour que votre enfant tire le meilleur d'Erudia dès la première semaine.
          </p>
        </div>

        <!-- Grille de tips -->
        <div class="tips__grid">
          <article
            v-for="(tip, index) in tips"
            :key="tip.title"
            class="tip-card"
            :data-index="index"
          >
            <div class="tip-card__icon" aria-hidden="true">{{ tip.icon }}</div>
            <h3 class="tip-card__title">{{ tip.title }}</h3>
            <p class="tip-card__desc">{{ tip.desc }}</p>
          </article>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section (fond sombre) ─────────────────────────────────────
.tips {
  background: var(--gradient-hero);
  padding: 80px 0;
  position: relative;
  overflow: hidden;

  @include m.respond-to(md) { padding: 100px 0; }

  // ── Orbe radial décoratif ──
  &__orb {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.25), transparent 70%);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    z-index: 2;
  }

  // ── En-tête ──
  &__header {
    text-align: center;
    margin-bottom: 56px;

    .pill { margin-bottom: 14px; }
  }

  &__heading {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.015em;
    color: white;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  &__subline {
    font-size: clamp(0.92rem, 1.6vw, 1rem);
    color: rgba(255, 255, 255, 0.58);
    line-height: 1.75;
    font-weight: 500;
    max-width: 520px;
    margin: 0 auto;
  }

  // ── Grille ──
  &__grid {
    display: grid;
    gap: 16px;

    @include m.respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include m.respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

// ── Tip card (glassmorphisme) ─────────────────────────────────
.tip-card {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition:
    background var(--transition),
    transform var(--transition),
    border-color var(--transition),
    opacity 0.55s ease,
    translate 0.55s ease;

  // Reveal animation
  opacity: 0;
  translate: 0 24px;

  &.is-visible {
    opacity: 1;
    translate: 0 0;
  }

  // Délais décalés
  &[data-index='0'] { transition-delay: 0s; }
  &[data-index='1'] { transition-delay: 0.08s; }
  &[data-index='2'] { transition-delay: 0.16s; }
  &[data-index='3'] { transition-delay: 0.24s; }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.22);
    transform: translateY(-4px);
  }

  // ── Icône ──
  &__icon {
    font-size: 2rem;
    margin-bottom: 14px;
    display: block;
    // Légère mise à l'échelle au hover de la card
    transition: transform 0.3s ease;

    .tip-card:hover & { transform: scale(1.15) rotate(-5deg); }
  }

  // ── Titre ──
  &__title {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  // ── Description ──
  &__desc {
    font-size: 0.83rem;
    color: rgba(255, 255, 255, 0.62);
    line-height: 1.7;
  }
}
</style>
