<!-- FaqContactSection.vue — "Une question sans réponse ici ?"
     - Fond gradient-hero sombre
     - Layout 1fr / auto (texte à gauche, boutons à droite sur desktop)
     - Lien vers /contact + vers l'app
     - Reveal au scroll via IntersectionObserver -->
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
  document.querySelectorAll('.faq-contact-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="faq-contact" aria-labelledby="faq-contact-title">

    <div class="faq-contact__orb faq-contact__orb--1" aria-hidden="true"></div>
    <div class="faq-contact__orb faq-contact__orb--2" aria-hidden="true"></div>

    <div class="container">
      <div class="faq-contact__inner faq-contact-reveal">

        <div class="faq-contact__text">
          <h2 id="faq-contact-title" class="faq-contact__title">
            {{ t('faq.contact.title') }}
          </h2>
          <p class="faq-contact__desc">{{ t('faq.contact.subline') }}</p>
        </div>

        <div class="faq-contact__actions">
          <RouterLink :to="localePath('/contact')" class="faq-contact__btn faq-contact__btn--white">
            {{ t('faq.contact.cta') }}
          </RouterLink>
          <AppCtaLink class="faq-contact__btn faq-contact__btn--ghost">
            {{ t('faq.cta.btnPrimary') }}
          </AppCtaLink>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.faq-contact {
  background: var(--gradient-hero);
  padding: 72px 0;
  position: relative;
  overflow: hidden;

  &__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--1 {
      top: -80px;
      right: -80px;
      width: 360px;
      height: 360px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.2), transparent 70%);
      filter: blur(70px);
    }

    &--2 {
      bottom: -60px;
      left: 5%;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.07), transparent 70%);
      filter: blur(60px);
    }
  }

  &__inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 28px;
    align-items: flex-start;

    @include m.respond-to(md) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 48px;
    }
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    font-weight: 800;
    color: white;
    margin-bottom: 8px;
    letter-spacing: -0.015em;
  }

  &__desc {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.7;
    max-width: 440px;
  }

  &__actions {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.9rem;
    text-decoration: none;
    white-space: nowrap;
    transition: all var(--transition);

    &--white {
      background: white;
      color: var(--color-primary-dark);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);

      &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); }
    }

    &--ghost {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1.5px solid rgba(255, 255, 255, 0.3);

      &:hover { background: rgba(255, 255, 255, 0.18); }
    }
  }
}

.faq-contact-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible { opacity: 1; transform: translateY(0); }
}
</style>
