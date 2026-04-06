<!-- CtaSection.vue — Section de conversion finale de la home page
     Fond gradient primary, 2 blobs décoratifs (blanc top-left, doré bottom-right).
     Fidèle à la maquette documentations/landing/maquettes/index.html #cta-final. -->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { useComingSoon } from '@/composables/useComingSoon'

const { t, localePath } = useLocale()
const { openModal } = useComingSoon()
</script>

<template>
  <section class="cta" aria-label="Appel à l'action">
    <!-- Blobs décoratifs positionnés via pseudo-éléments en SCSS -->
    <div class="cta__blob cta__blob--1" aria-hidden="true" />
    <div class="cta__blob cta__blob--2" aria-hidden="true" />

    <div class="container">
      <div class="cta__inner">

        <h2 class="cta__title heading-lg">{{ t('home.cta.title') }}</h2>

        <p class="cta__subline">{{ t('home.cta.subline') }}</p>

        <div class="cta__actions">
          <button
            type="button"
            class="btn cta__btn-primary"
            @click="openModal"
          >
            {{ t('home.cta.btnPrimary') }}
          </button>
          <RouterLink :to="localePath('/how-it-works')" class="btn cta__btn-ghost">
            {{ t('home.cta.btnSecondary') }}
          </RouterLink>
        </div>

        <p class="cta__reassure">{{ t('home.cta.reassure') }}</p>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.cta {
  background: var(--gradient-primary);
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 96px 0;

  // ── Blobs décoratifs ──────────────────────────────────────
  &__blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--1 {
      top: -80px;
      left: -80px;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%);
    }

    &--2 {
      bottom: -80px;
      right: -80px;
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.15), transparent 70%);
    }
  }

  // ── Contenu centré au-dessus des blobs ───────────────────
  &__inner {
    position: relative;
    z-index: 2;
  }

  &__title {
    color: white;
    margin-bottom: 12px;
  }

  &__subline {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1.05rem;
    margin-bottom: 36px;
  }

  // ── Boutons ───────────────────────────────────────────────
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    justify-content: center;
  }

  // Bouton blanc plein — CTA principal
  &__btn-primary {
    background: white;
    color: var(--color-primary-dark);
    font-weight: 800;

    &:hover {
      background: rgba(255, 255, 255, 0.92);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  }

  // Bouton ghost sur fond sombre
  &__btn-ghost {
    background: rgba(255, 255, 255, 0.12);
    color: white;
    border: 1.5px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  // ── Note rassurante ───────────────────────────────────────
  &__reassure {
    margin-top: 20px;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.55);
  }
}
</style>
