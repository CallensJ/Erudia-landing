<!-- PricingTeaser.vue — Aperçu tarifaire de la home page
     Deux plans : Free (toujours gratuit) + Erudia+ (premium).
     Objectif : transparence immédiate, curiosité pour le premium.
     Le détail complet est sur /pricing — ici on reste concis.
     Angle enfant : le premium = plus de catégories, plus de badges, plus d'aventures. -->

<script setup lang="ts">
const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: 'pour toujours',
    description: 'Pour découvrir Erudia et s\'y installer tranquillement.',
    features: [
      '3 catégories : Sciences, Histoire, Héros',
      'Badges & profil enfant complet',
      'Mode hors ligne',
      'Tableau de bord parental',
      'FR / EN',
    ],
    cta: 'Commencer gratuitement',
    ctaLink: 'https://app.erudia.app',
    ctaExternal: true,
    highlight: false,
  },
  {
    name: 'Erudia+',
    price: '4,99€',
    period: 'par mois',
    pricingAlt: 'ou 39,99€ / an',
    description: 'Pour les enfants qui veulent aller plus loin — et les parents qui les accompagnent.',
    features: [
      'Toutes les catégories disponibles',
      'Avatars & badges exclusifs ✨',
      'Défis spéciaux & collections secrètes',
      'Rapports de progression par email',
      'Multi-profils (jusqu\'à 3 enfants)',
    ],
    cta: 'Voir le détail',
    ctaLink: '/pricing',
    ctaExternal: false,
    highlight: true,
  },
]
</script>

<template>
  <section class="pricing-teaser section" aria-labelledby="pricing-teaser-title">
    <div class="container">

      <!-- En-tête -->
      <div class="pricing-teaser__header">
        <div class="pill pill--primary pricing-teaser__pill">Tarifs</div>
        <h2 id="pricing-teaser-title" class="pricing-teaser__title heading-lg">
          Simple et transparent
        </h2>
        <p class="pricing-teaser__subline subline">
          Le plan gratuit est complet. Le premium, c'est pour ceux qui veulent explorer davantage.
        </p>
      </div>

      <!-- Plans -->
      <div class="pricing-teaser__grid">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-teaser__card"
          :class="{ 'pricing-teaser__card--highlight': plan.highlight }"
        >
          <!-- Badge populaire -->
          <div v-if="plan.highlight" class="pricing-teaser__badge">
            ⭐ Le plus choisi
          </div>

          <!-- Nom du plan -->
          <div class="pricing-teaser__plan-name">{{ plan.name }}</div>

          <!-- Prix -->
          <div class="pricing-teaser__price">
            <span class="pricing-teaser__price-amount">{{ plan.price }}</span>
            <span class="pricing-teaser__price-period">{{ plan.period }}</span>
          </div>
          <div v-if="plan.pricingAlt" class="pricing-teaser__price-alt">
            {{ plan.pricingAlt }}
          </div>

          <!-- Description -->
          <p class="pricing-teaser__desc">{{ plan.description }}</p>

          <div class="pricing-teaser__divider"></div>

          <!-- Features -->
          <ul class="pricing-teaser__features">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="pricing-teaser__feature"
            >
              {{ feature }}
            </li>
          </ul>

          <!-- CTA -->
          <a
            v-if="plan.ctaExternal"
            :href="plan.ctaLink"
            class="btn pricing-teaser__cta"
            :class="plan.highlight ? 'btn--primary' : 'btn--secondary'"
            target="_blank"
            rel="noopener"
          >
            {{ plan.cta }}
          </a>
          <RouterLink
            v-else
            :to="plan.ctaLink"
            class="btn pricing-teaser__cta"
            :class="plan.highlight ? 'btn--primary' : 'btn--secondary'"
          >
            {{ plan.cta }}
          </RouterLink>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.pricing-teaser {
  background: var(--color-bg);

  // ── En-tête ──────────────────────────────────────────────
  &__header {
    text-align: center;
    margin-bottom: 56px;
  }

  &__pill { margin-bottom: 16px; }

  &__title {
    color: var(--color-text);
    margin-bottom: 16px;
  }

  &__subline {
    max-width: 460px;
    margin: 0 auto;
  }

  // ── Grille 2 plans ────────────────────────────────────────
  &__grid {
    display: grid;
    gap: 24px;
    max-width: 720px;
    margin: 0 auto;

    @include m.respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
      align-items: start;
    }
  }

  // ── Carte ─────────────────────────────────────────────────
  &__card {
    position: relative;
    background: white;
    border-radius: var(--radius-xl);
    padding: 36px 28px 32px;
    border: 1.5px solid var(--color-surface-dark);

    // Plan premium — border gradient + légèrement surélevé
    &--highlight {
      border-color: transparent;
      background:
        linear-gradient(white, white) padding-box,
        var(--gradient-primary) border-box;
      box-shadow: var(--shadow-md);

      @include m.respond-to(md) {
        margin-top: -12px;
        margin-bottom: -12px;
      }
    }
  }

  // Badge "Le plus choisi"
  &__badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--gradient-primary);
    color: white;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 5px 16px;
    border-radius: var(--radius-full);
    white-space: nowrap;
  }

  // Nom du plan
  &__plan-name {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1rem;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
  }

  // Prix
  &__price {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 4px;
  }

  &__price-amount {
    font-family: var(--font-display);
    font-size: 2.6rem;
    font-weight: 800;
    color: var(--color-text);
    line-height: 1;
  }

  &__price-period {
    font-size: 0.9rem;
    color: var(--color-text-light);
    font-weight: 600;
  }

  &__price-alt {
    font-size: 0.8rem;
    color: var(--color-text-light);
    margin-bottom: 16px;
  }

  // Description
  &__desc {
    font-size: 0.88rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-top: 12px;
  }

  // Séparateur
  &__divider {
    height: 1px;
    background: var(--color-surface-dark);
    margin: 20px 0;
  }

  // Liste features
  &__features {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;
  }

  &__feature {
    font-size: 0.88rem;
    color: var(--color-text);
    font-weight: 600;
    padding-left: 22px;
    position: relative;
    line-height: 1.5;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--color-primary);
      font-weight: 800;
    }
  }

  // CTA
  &__cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
