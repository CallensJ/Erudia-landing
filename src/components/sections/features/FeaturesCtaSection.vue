<!-- FeaturesCtaSection.vue — CTA finale de la page Fonctionnalités
     - Fond gradient-primary violet
     - Titre, sous-titre, 2 boutons (app + tarifs), ligne de réassurance
     - Orbes décoratifs, animation au scroll -->
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
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer?.unobserve(e.target)
        }
      })
    },
    { threshold: 0.2 }
  )
  document.querySelectorAll('.feat-cta-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="feat-cta" aria-labelledby="feat-cta-title">

    <div class="feat-cta__orb feat-cta__orb--left"  aria-hidden="true"></div>
    <div class="feat-cta__orb feat-cta__orb--right" aria-hidden="true"></div>

    <div class="container">
      <div class="feat-cta__inner feat-cta-reveal">

        <h2 id="feat-cta-title" class="feat-cta__title">
          {{ t('features.cta.title') }}
        </h2>
        <p class="feat-cta__sub">{{ t('features.cta.subline') }}</p>

        <div class="feat-cta__actions">
          <AppCtaLink class="feat-cta__btn feat-cta__btn--white">
            {{ t('features.cta.btnPrimary') }}
          </AppCtaLink>
          <RouterLink :to="localePath('/pricing')" class="feat-cta__btn feat-cta__btn--ghost">
            {{ t('features.cta.btnSecondary') }}
          </RouterLink>
        </div>

        <p class="feat-cta__reassure">{{ t('features.cta.reassure') }}</p>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.feat-cta {
  background: var(--gradient-primary);
  padding:    96px 0;
  position:   relative;
  overflow:   hidden;
  text-align: center;

  &__orb {
    position:      absolute;
    border-radius: 50%;
    pointer-events: none;

    &--left {
      bottom:     -100px;
      left:       -100px;
      width:      400px;
      height:     400px;
      background: radial-gradient(circle, rgba(255,255,255,.1), transparent 70%);
    }

    &--right {
      top:        -60px;
      right:      -60px;
      width:      300px;
      height:     300px;
      background: radial-gradient(circle, rgba(255,215,0,.15), transparent 70%);
    }
  }

  &__inner {
    position:  relative;
    z-index:   2;
    max-width: 600px;
    margin:    0 auto;
  }

  &__title {
    font-family:    var(--font-display);
    font-size:      clamp(1.8rem, 4.5vw, 2.8rem);
    font-weight:    800;
    color:          white;
    line-height:    1.15;
    letter-spacing: -0.02em;
    margin-bottom:  14px;
  }

  &__sub {
    font-size:     clamp(0.92rem, 2vw, 1.05rem);
    color:         rgba(255,255,255,.65);
    margin-bottom: 36px;
    line-height:   1.65;
  }

  &__actions {
    display:         flex;
    flex-direction:  column;
    align-items:     center;
    gap:             14px;
    margin-bottom:   24px;

    @include m.respond-to(sm) {
      flex-direction:  row;
      justify-content: center;
    }
  }

  &__btn {
    display:         inline-flex;
    align-items:     center;
    justify-content: center;
    padding:         14px 30px;
    border-radius:   var(--radius-full);
    font-family:     var(--font-body);
    font-weight:     700;
    font-size:       0.97rem;
    text-decoration: none;
    transition:      all var(--transition);

    &--white {
      background:  white;
      color:       var(--color-primary-dark);
      box-shadow:  0 6px 20px rgba(0,0,0,.18);

      &:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.25); }
    }

    &--ghost {
      background:  rgba(255,255,255,.12);
      color:       white;
      border:      1.5px solid rgba(255,255,255,.35);

      &:hover { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.55); }
    }
  }

  &__reassure {
    font-size:   0.82rem;
    color:       rgba(255,255,255,.55);
    font-weight: 600;
  }
}

.feat-cta-reveal {
  opacity:    0;
  transform:  translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.is-visible { opacity: 1; transform: translateY(0); }
}
</style>
