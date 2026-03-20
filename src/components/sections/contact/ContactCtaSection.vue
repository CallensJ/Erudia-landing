<!-- ContactCtaSection.vue — CTA finale de la page Contact
     - Fond gradient primary
     - Titre, sous-titre, 2 boutons (app + tarifs), ligne de réassurance
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

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

  document.querySelectorAll('.contact-cta-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="contact-cta" aria-labelledby="contact-cta-title">

    <div class="contact-cta__orb contact-cta__orb--left"  aria-hidden="true"></div>
    <div class="contact-cta__orb contact-cta__orb--right" aria-hidden="true"></div>

    <div class="container">
      <div class="contact-cta__inner contact-cta-reveal">

        <h2 id="contact-cta-title" class="contact-cta__title">
          Prêt à essayer Erudia ?
        </h2>
        <p class="contact-cta__sub">
          Gratuit pour commencer. 30 secondes pour créer un profil.
        </p>

        <div class="contact-cta__actions">
          <a
            href="https://app.erudia.app"
            class="contact-cta__btn contact-cta__btn--white"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Essayer gratuitement
          </a>
          <RouterLink to="/pricing" class="contact-cta__btn contact-cta__btn--ghost">
            Voir les tarifs
          </RouterLink>
        </div>

        <p class="contact-cta__reassure" aria-label="Garanties">
          ✓ Gratuit &nbsp;·&nbsp; ✓ Sans pub &nbsp;·&nbsp; ✓ COPPA &nbsp;·&nbsp; ✓ Hors ligne
        </p>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.contact-cta {
  background: var(--gradient-primary);
  padding: 96px 0;
  position: relative;
  overflow: hidden;
  text-align: center;

  &__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--left {
      bottom: -100px;
      left: -100px;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
    }

    &--right {
      top: -60px;
      right: -60px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.15), transparent 70%);
    }
  }

  &__inner {
    position: relative;
    z-index: 2;
    max-width: 600px;
    margin: 0 auto;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4.5vw, 2.8rem);
    font-weight: 800;
    color: white;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
  }

  &__sub {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    color: rgba(255, 255, 255, 0.68);
    margin-bottom: 36px;
    line-height: 1.6;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;

    @include m.respond-to(sm) {
      flex-direction: row;
      justify-content: center;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 30px;
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.97rem;
    transition: all var(--transition);
    text-decoration: none;

    &--white {
      background: white;
      color: var(--color-primary-dark);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
      }
    }

    &--ghost {
      background: rgba(255, 255, 255, 0.12);
      color: white;
      border: 1.5px solid rgba(255, 255, 255, 0.35);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.55);
      }
    }
  }

  &__reassure {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 600;
  }
}

.contact-cta-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
