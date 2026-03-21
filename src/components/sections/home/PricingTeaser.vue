<!-- PricingTeaser.vue — Section tarifs home page
     2 cartes côte à côte : Gratuit + Erudia+ (highlighted, fond gradient).
     Fidèle à la maquette documentations/landing/maquettes/index.html.
     Max-width 800px centré, fond surface légèrement gris. -->

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

const freePlan = computed(() => ({
  label: t('home.pricingTeaser.freeLabel'),
  price: t('home.pricingTeaser.freePrice'),
  sub:   t('home.pricingTeaser.freePeriod'),
  features: [
    t('home.pricingTeaser.freeF1'),
    t('home.pricingTeaser.freeF2'),
    t('home.pricingTeaser.freeF3'),
    t('home.pricingTeaser.freeF4'),
    t('home.pricingTeaser.freeF5'),
    t('home.pricingTeaser.freeF6'),
  ],
  cta:  t('home.pricingTeaser.freeCta'),
  href: 'https://app.erudia.app',
}))

const premiumPlan = computed(() => ({
  badge: t('home.pricingTeaser.premiumBadge'),
  label: t('home.pricingTeaser.premiumLabel'),
  price: t('home.pricingTeaser.premiumPrice'),
  sub:   t('home.pricingTeaser.premiumPeriod'),
  features: [
    t('home.pricingTeaser.premiumF1'),
    t('home.pricingTeaser.premiumF2'),
    t('home.pricingTeaser.premiumF3'),
    t('home.pricingTeaser.premiumF4'),
    t('home.pricingTeaser.premiumF5'),
    t('home.pricingTeaser.premiumF6'),
  ],
  cta:  t('home.pricingTeaser.premiumCta'),
  href: 'https://app.erudia.app',
}))
</script>

<template>
  <section class="pricing section section--surface" aria-labelledby="pricing-title">
    <div class="container">

      <!-- En-tête centré -->
      <div class="pricing__header">
        <div class="pill pill--primary pricing__pill">{{ t('home.pricingTeaser.pill') }}</div>
        <h2 id="pricing-title" class="heading-lg pricing__title">{{ t('home.pricingTeaser.title') }}</h2>
        <p class="pricing__subline">{{ t('home.pricingTeaser.subline') }}</p>
      </div>

      <!-- Grille 2 cartes -->
      <div class="pricing__grid">

        <!-- Carte gratuit -->
        <div class="pricing__card">
          <div class="pricing__plan-label">{{ freePlan.label }}</div>
          <div class="pricing__price">{{ freePlan.price }}</div>
          <div class="pricing__price-sub">{{ freePlan.sub }}</div>
          <ul class="pricing__features">
            <li v-for="f in freePlan.features" :key="f" class="pricing__feature">
              <span class="pricing__check" aria-hidden="true">✓</span>
              <span>{{ f }}</span>
            </li>
          </ul>
          <a :href="freePlan.href" class="btn btn-secondary pricing__cta" target="_blank" rel="noopener">
            {{ freePlan.cta }}
          </a>
        </div>

        <!-- Carte premium (highlighted) -->
        <div class="pricing__card pricing__card--highlighted">
          <div class="pricing__badge">{{ premiumPlan.badge }}</div>
          <div class="pricing__plan-label">{{ premiumPlan.label }}</div>
          <div class="pricing__price">{{ premiumPlan.price }}</div>
          <div class="pricing__price-sub">{{ premiumPlan.sub }}</div>
          <ul class="pricing__features">
            <li v-for="f in premiumPlan.features" :key="f" class="pricing__feature">
              <span class="pricing__check" aria-hidden="true">✓</span>
              <span>{{ f }}</span>
            </li>
          </ul>
          <a :href="premiumPlan.href" class="btn btn-primary pricing__cta" target="_blank" rel="noopener">
            {{ premiumPlan.cta }}
          </a>
        </div>

      </div>

      <!-- Note rassurante -->
      <p class="pricing__note">{{ t('home.pricingTeaser.note') }}</p>

      <!-- CTA vers page tarifs complète -->
      <div class="pricing__more">
        <RouterLink to="/pricing" class="pricing__ghost-btn">
          {{ t('home.pricingTeaser.moreLink') }}
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.pricing {
  // ── En-tête ───────────────────────────────────────────────
  &__header {
    text-align: center;
    margin-bottom: 48px;
  }

  &__pill {
    margin-bottom: 16px;
  }

  &__title {
    margin-bottom: 12px;
  }

  &__subline {
    font-size: 1rem;
    color: var(--color-text-secondary);
    max-width: 480px;
    margin: 0 auto;
  }

  // ── Grille 2 colonnes centrée ─────────────────────────────
  &__grid {
    display: grid;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;

    @include m.respond-to(sm) {
      grid-template-columns: 1fr 1fr;
    }
  }

  // ── Cartes ───────────────────────────────────────────────
  &__card {
    border-radius: var(--radius-xl);
    padding: 36px 28px;
    border: 1.5px solid var(--color-surface-dark);
    background: white;
    transition: all var(--transition);

    &:hover:not(&--highlighted) {
      border-color: var(--color-primary-light);
      box-shadow: var(--shadow-md);
    }

    // Carte premium — fond gradient violet
    &--highlighted {
      background: var(--gradient-primary);
      color: white;
      border-color: transparent;
      box-shadow: var(--shadow-lg);
      position: relative;

      .pricing__plan-label {
        color: rgba(255, 255, 255, 0.65);
      }

      .pricing__price-sub {
        color: rgba(255, 255, 255, 0.6);
      }

      // Icône check adaptée au fond sombre
      .pricing__check {
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }
    }
  }

  // ── Badge "Le plus populaire" ─────────────────────────────
  &__badge {
    display: inline-block;
    background: var(--color-accent);
    color: #333;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: var(--radius-full);
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  // ── Étiquette plan ────────────────────────────────────────
  &__plan-label {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-light);
    margin-bottom: 8px;
  }

  // ── Prix ──────────────────────────────────────────────────
  &__price {
    font-family: var(--font-display);
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 4px;
  }

  &__price-sub {
    font-size: 0.82rem;
    color: var(--color-text-light);
    margin-bottom: 24px;
  }

  // ── Features ─────────────────────────────────────────────
  &__features {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;
    list-style: none;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.88rem;
    font-weight: 500;
  }

  // Icône check circulaire
  &__check {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 800;
    flex-shrink: 0;
    background: rgba(16, 185, 129, 0.12);
    color: #059669;
  }

  // CTA pleine largeur
  &__cta {
    width: 100%;
    text-align: center;
    display: block;
  }

  // ── Note + CTA bas ────────────────────────────────────────
  &__note {
    text-align: center;
    margin-top: 28px;
    font-size: 0.85rem;
    color: var(--color-text-light);
  }

  &__more {
    text-align: center;
    margin-top: 24px;
  }

  &__ghost-btn {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-decoration: none;
    border: 1.5px solid var(--color-surface-dark);
    padding: 10px 24px;
    border-radius: var(--radius-full);
    display: inline-block;
    transition: all var(--transition);

    &:hover {
      background: var(--color-surface-dark);
      color: var(--color-text);
    }
  }
}
</style>
