<!-- FaqCtaSection.vue — CTA finale de la page FAQ
     - Fond gradient-primary violet
     - "Convaincu ? Lancez-vous."
     - 2 boutons : app + tarifs
     - Ligne de réassurance
     - Orbes décoratifs -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer?.unobserve(e.target)
        }
      })
    },
    { threshold: 0.2 }
  )
  document.querySelectorAll('.faq-cta-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="faq-cta" aria-labelledby="faq-cta-title">

    <div class="faq-cta__orb faq-cta__orb--left"  aria-hidden="true"></div>
    <div class="faq-cta__orb faq-cta__orb--right" aria-hidden="true"></div>

    <div class="container">
      <div class="faq-cta__inner faq-cta-reveal">

        <h2 id="faq-cta-title" class="faq-cta__title">
          Convaincu ? Lancez-vous.
        </h2>
        <p class="faq-cta__sub">
          Gratuit pour commencer. 30 secondes pour créer un profil enfant.
        </p>

        <div class="faq-cta__actions">
          <a
            href="https://app.erudia.app"
            class="faq-cta__btn faq-cta__btn--white"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Commencer gratuitement
          </a>
          <RouterLink to="/pricing" class="faq-cta__btn faq-cta__btn--ghost">
            Voir les tarifs
          </RouterLink>
        </div>

        <p class="faq-cta__reassure" aria-label="Garanties">
          ✓ Gratuit &nbsp;·&nbsp; ✓ Sans pub &nbsp;·&nbsp; ✓ COPPA &nbsp;·&nbsp; ✓ Hors ligne
        </p>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.faq-cta {
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
    font-size: clamp(0.92rem, 2vw, 1.05rem);
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 36px;
    line-height: 1.65;
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
    text-decoration: none;
    transition: all var(--transition);

    &--white {
      background: white;
      color: var(--color-primary-dark);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);

      &:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25); }
    }

    &--ghost {
      background: rgba(255, 255, 255, 0.12);
      color: white;
      border: 1.5px solid rgba(255, 255, 255, 0.35);

      &:hover { background: rgba(255, 255, 255, 0.2); border-color: rgba(255, 255, 255, 0.55); }
    }
  }

  &__reassure {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 600;
  }
}

.faq-cta-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.is-visible { opacity: 1; transform: translateY(0); }
}
</style>
