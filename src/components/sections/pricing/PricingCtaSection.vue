<!-- PricingCtaSection.vue — CTA final de la page Tarifs
     - Fond gradient primary (clôture la page avec énergie)
     - Mascotte Nova animée (flottement CSS)
     - Titre + sous-titre + 2 CTAs (gratuit + premium)
     - Ligne de réassurance (garanties résumées)
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

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

  document.querySelectorAll('.pricing-cta-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="pricing-cta" aria-labelledby="pricing-cta-title">

    <!-- Orbes décoratifs -->
    <div class="pricing-cta__orb pricing-cta__orb--left"  aria-hidden="true"></div>
    <div class="pricing-cta__orb pricing-cta__orb--right" aria-hidden="true"></div>

    <div class="container">
      <div class="pricing-cta__inner pricing-cta-reveal">

        <!-- Mascotte Nova -->
        <div class="pricing-cta__mascot" aria-hidden="true">🦉</div>

        <!-- Titre -->
        <h2 id="pricing-cta-title" class="pricing-cta__title">
          Votre enfant mérite<br>
          <span class="pricing-cta__title-accent">le meilleur départ</span>
        </h2>

        <!-- Sous-titre -->
        <p class="pricing-cta__sub">
          Commencez gratuitement dès aujourd'hui — sans carte bancaire, sans engagement.
          <br class="pricing-cta__sub-break">
          Passez à Erudia+ quand vous êtes prêt.
        </p>

        <!-- Boutons -->
        <div class="pricing-cta__actions">
          <a
            href="https://app.erudia.app"
            class="pricing-cta__btn pricing-cta__btn--white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Essayer gratuitement
          </a>
          <a
            href="https://app.erudia.app"
            class="pricing-cta__btn pricing-cta__btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Démarrer Erudia+ — 4,99€/mois
          </a>
        </div>

        <!-- Réassurance -->
        <ul class="pricing-cta__reassurance" aria-label="Garanties">
          <li>
            <span aria-hidden="true">✓</span>
            7 jours d'essai gratuits
          </li>
          <li>
            <span aria-hidden="true">✓</span>
            Remboursement 14 jours
          </li>
          <li>
            <span aria-hidden="true">✓</span>
            Annulation en 2 clics
          </li>
          <li>
            <span aria-hidden="true">✓</span>
            Zéro publicité
          </li>
        </ul>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.pricing-cta {
  background: var(--gradient-primary);
  padding: 96px 0;
  position: relative;
  overflow: hidden;

  // ── Orbes décoratifs ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--left {
      bottom: -120px;
      left: -120px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
    }

    &--right {
      top: -80px;
      right: -80px;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.15), transparent 70%);
    }
  }

  // ── Contenu centré ──
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 2;
    max-width: 680px;
    margin: 0 auto;
  }
}

// ── Mascotte flottante ─────────────────────────────────────────
.pricing-cta__mascot {
  font-size: 4.5rem;
  margin-bottom: 24px;
  display: block;
  animation: mascot-float 3.5s ease-in-out infinite;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.2));
}

@keyframes mascot-float {
  0%, 100% { transform: translateY(0)    rotate(-3deg); }
  50%       { transform: translateY(-14px) rotate(3deg);  }
}

// ── Titre ─────────────────────────────────────────────────────
.pricing-cta__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 20px;

  // Accent doré
  &-accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

// ── Sous-titre ────────────────────────────────────────────────
.pricing-cta__sub {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.75;
  margin-bottom: 40px;

  // Le <br> disparaît sur mobile pour éviter les retours inattendus
  &-break {
    display: none;

    @include m.respond-to(md) { display: inline; }
  }
}

// ── Boutons ───────────────────────────────────────────────────
.pricing-cta__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  margin-bottom: 36px;

  @include m.respond-to(sm) {
    flex-direction: row;
    justify-content: center;
  }
}

.pricing-cta__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 32px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.97rem;
  transition: all var(--transition);
  white-space: nowrap;

  // Bouton blanc (CTA principal)
  &--white {
    background: white;
    color: var(--color-primary-dark);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
    }
  }

  // Bouton ghost (CTA secondaire)
  &--ghost {
    background: rgba(255, 255, 255, 0.12);
    color: white;
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(8px);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.55);
      transform: translateY(-2px);
    }
  }
}

// ── Liste réassurance ──────────────────────────────────────────
.pricing-cta__reassurance {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);

    span {
      color: #4ade80; // vert clair pour le ✓ sur fond violet
      font-weight: 800;
    }
  }
}

// ── Reveal ────────────────────────────────────────────────────
.pricing-cta-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
