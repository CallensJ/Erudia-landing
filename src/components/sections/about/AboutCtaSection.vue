<!-- AboutCtaSection.vue — CTA finale de la page À propos
     - Fond gradient primary
     - Titre, sous-titre, 2 boutons (app + tarifs) -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import AppCtaLink from '@/components/ui/AppCtaLink.vue'

const { t, localePath } = useLocale()

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
  document.querySelectorAll('.about-cta-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="about-cta" aria-labelledby="about-cta-title">

    <div class="about-cta__orb about-cta__orb--left"  aria-hidden="true"></div>
    <div class="about-cta__orb about-cta__orb--right" aria-hidden="true"></div>

    <div class="container">
      <div class="about-cta__inner about-cta-reveal">

        <h2 id="about-cta-title" class="about-cta__title">{{ t('about.cta.title') }}</h2>
        <p class="about-cta__sub">{{ t('about.cta.subline') }}</p>

        <div class="about-cta__actions">
          <AppCtaLink class="about-cta__btn about-cta__btn--white">
            {{ t('about.cta.btnPrimary') }}
          </AppCtaLink>
          <RouterLink :to="localePath('/pricing')" class="about-cta__btn about-cta__btn--ghost">
            {{ t('about.cta.btnSecondary') }}
          </RouterLink>
        </div>

      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.about-cta {
  position: relative;
  background: var(--gradient-primary);
  padding: 80px 0;
  overflow: hidden;

  @include m.respond-to(md) { padding: 100px 0; }

  &__orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    filter: blur(60px);
    pointer-events: none;

    &--left  { top: -80px; left: -80px; }
    &--right { bottom: -80px; right: -80px; }
  }

  &__inner {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 900;
    color: white;
    line-height: 1.15;
    letter-spacing: -0.018em;
    margin: 0;
  }

  &__sub {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.65;
    margin: 0;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-top: 8px;
  }

  &__btn {
    padding: 14px 28px;
    border-radius: var(--radius-full);
    font-weight: 700;
    font-size: 0.95rem;
    font-family: inherit;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: all var(--transition);

    &--white {
      background: white;
      color: var(--color-primary-dark);

      &:hover {
        background: rgba(255, 255, 255, 0.92);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
    }

    &--ghost {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);

      &:hover {
        border-color: white;
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }
    }
  }
}

.about-cta-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
