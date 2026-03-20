<!-- HowItWorksCtaSection.vue — Section CTA finale de la page "Comment ça marche"
     - Fond gradient primary (violet → violet foncé)
     - Orbes décoratifs pour la profondeur
     - Titre percutant, subline rassurante, 2 CTAs, ligne de réassurance
     - Animation d'entrée au scroll -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

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
    { threshold: 0.2 }
  )

  const el = document.querySelector('.hiw-cta__inner')
  if (el) observer.observe(el)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="hiw-cta" aria-labelledby="hiw-cta-title">

    <!-- Orbes décoratifs -->
    <div class="hiw-cta__orb hiw-cta__orb--1" aria-hidden="true"></div>
    <div class="hiw-cta__orb hiw-cta__orb--2" aria-hidden="true"></div>

    <div class="container">
      <div class="hiw-cta__inner">

        <!-- Emoji mascotte -->
        <div class="hiw-cta__mascot" aria-hidden="true">🦉</div>

        <!-- Titre -->
        <h2 id="hiw-cta-title" class="hiw-cta__title">
          Vous savez tout.<br />
          <span class="hiw-cta__title-accent">Lancez-vous.</span>
        </h2>

        <!-- Sous-titre -->
        <p class="hiw-cta__subline">
          30 secondes pour créer un profil. Pas de carte de crédit.<br />
          Pas de compte parent compliqué. Juste un enfant qui apprend en s'amusant.
        </p>

        <!-- CTAs -->
        <div class="hiw-cta__actions">
          <a
            href="https://app.erudia.app"
            class="hiw-cta__btn hiw-cta__btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Créer un profil enfant
          </a>
          <RouterLink to="/pricing" class="hiw-cta__btn hiw-cta__btn--ghost">
            Voir les tarifs
          </RouterLink>
        </div>

        <!-- Ligne de réassurance -->
        <p class="hiw-cta__reassure">
          <span>✓ Gratuit</span>
          <span aria-hidden="true">·</span>
          <span>✓ Sans publicité</span>
          <span aria-hidden="true">·</span>
          <span>✓ COPPA compliant</span>
          <span aria-hidden="true">·</span>
          <span>✓ Hors ligne</span>
        </p>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section CTA ───────────────────────────────────────────────
.hiw-cta {
  background: var(--gradient-primary);
  text-align: center;
  padding: 96px 0;
  position: relative;
  overflow: hidden;

  // ── Orbes décoratifs ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  &__orb--1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
    top: -80px;
    left: -80px;
  }

  &__orb--2 {
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.15), transparent 70%);
    bottom: -80px;
    right: -80px;
  }

  // ── Contenu ──
  &__inner {
    position: relative;
    z-index: 2;
    max-width: 640px;
    margin: 0 auto;

    // Reveal animation
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;

    &.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // ── Mascotte ──
  &__mascot {
    font-size: 3rem;
    margin-bottom: 16px;
    display: block;
    animation: float 4s ease-in-out infinite;
  }

  // ── Titre ──
  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: white;
    margin-bottom: 16px;
  }

  // Accent doré sur "Lancez-vous."
  &__title-accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  // ── Sous-titre ──
  &__subline {
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.75;
    margin-bottom: 40px;
  }

  // ── Boutons ──
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
    margin-bottom: 28px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 32px;
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 1rem;
    transition: all var(--transition);
    white-space: nowrap;
    cursor: pointer;

    // Bouton blanc (principal)
    &--primary {
      background: white;
      color: var(--color-primary-dark);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
      }
    }

    // Bouton ghost (secondaire)
    &--ghost {
      background: rgba(255, 255, 255, 0.12);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);

      &:hover {
        background: rgba(255, 255, 255, 0.22);
        border-color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  // ── Ligne de réassurance ──
  &__reassure {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px 12px;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
  }
}

// ── Animation flottante mascotte ─────────────────────────────
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
</style>
