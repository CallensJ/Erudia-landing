<!-- FaqMini.vue — FAQ minimaliste de la home page (3 questions clés)
     Layout éditorial avec accordéon léger — pas de cartes.
     Répond aux objections principales des parents avant la décision.
     CTA vers /faq pour ceux qui veulent aller plus loin. -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t, localePath } = useLocale()

const faqs = computed(() => [
  { q: t('home.faqMini.q1'), a: t('home.faqMini.a1') },
  { q: t('home.faqMini.q2'), a: t('home.faqMini.a2') },
  { q: t('home.faqMini.q3'), a: t('home.faqMini.a3') },
  { q: t('home.faqMini.q4'), a: t('home.faqMini.a4') },
])

// Index de la question ouverte (null = toutes fermées)
const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="faq-mini section section--surface" aria-labelledby="faq-mini-title">
    <div class="container">

      <div class="faq-mini__layout">

        <!-- Côté gauche : titre + CTA -->
        <div class="faq-mini__aside">
          <div class="pill pill--primary faq-mini__pill">{{ t('home.faqMini.pill') }}</div>
          <h2 id="faq-mini-title" class="faq-mini__title heading-lg">
            {{ t('home.faqMini.title') }}
          </h2>
          <p class="faq-mini__subline subline">{{ t('home.faqMini.subline') }}</p>
          <RouterLink :to="localePath('/faq')" class="btn btn--secondary faq-mini__cta">
            {{ t('home.faqMini.cta') }}
          </RouterLink>
        </div>

        <!-- Côté droit : accordéon -->
        <div class="faq-mini__accordion">
          <div
            v-for="(item, index) in faqs"
            :key="item.q"
            class="faq-mini__item"
            :class="{ 'faq-mini__item--open': openIndex === index }"
          >
            <button
              class="faq-mini__question"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggle(index)"
            >
              <span>{{ item.q }}</span>
              <!-- Icône +/− -->
              <span class="faq-mini__icon" aria-hidden="true">
                {{ openIndex === index ? '−' : '+' }}
              </span>
            </button>

            <div
              :id="`faq-answer-${index}`"
              class="faq-mini__answer"
              role="region"
            >
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.faq-mini {

  // ── Layout 2 colonnes sur desktop ────────────────────────
  &__layout {
    display: grid;
    gap: 48px;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 1.6fr;
      gap: 80px;
      align-items: start;
    }
  }

  // ── Aside gauche ─────────────────────────────────────────
  &__aside {
    @include m.respond-to(lg) {
      // Sticky pour rester visible pendant le scroll de l'accordéon
      position: sticky;
      top: calc(var(--header-h) + 32px);
    }
  }

  &__pill { margin-bottom: 16px; }

  &__title {
    color: var(--color-text);
    margin-bottom: 16px;
  }

  &__subline {
    margin-bottom: 32px;
  }

  &__cta {
    display: inline-flex;
  }

  // ── Accordéon ────────────────────────────────────────────
  &__accordion {
    border-top: 1px solid var(--color-surface-dark);
  }

  &__item {
    border-bottom: 1px solid var(--color-surface-dark);
  }

  // Bouton question
  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 22px 0;
    text-align: left;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
    transition: color var(--transition);

    &:hover {
      color: var(--color-primary);
    }
  }

  // Icône +/−
  &__icon {
    font-size: 1.4rem;
    font-weight: 300;
    color: var(--color-primary);
    flex-shrink: 0;
    line-height: 1;
    transition: transform var(--transition);
  }

  // Réponse — hauteur animée via grid trick (pas de JS pour la hauteur)
  &__answer {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
    overflow: hidden;

    p {
      overflow: hidden;
      font-size: 0.93rem;
      color: var(--color-text-secondary);
      line-height: 1.75;
      padding-bottom: 0;
      transition: padding-bottom 0.3s ease;
    }
  }

  // État ouvert
  &__item--open {
    .faq-mini__answer {
      grid-template-rows: 1fr;

      p {
        padding-bottom: 22px;
      }
    }

    .faq-mini__icon {
      transform: rotate(180deg);
    }
  }
}
</style>
