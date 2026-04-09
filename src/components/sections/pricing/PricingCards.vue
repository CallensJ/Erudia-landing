<!-- PricingCards.vue — Les 2 cards de tarification (Gratuit vs Erudia+)
     - Reçoit isAnnual en prop depuis PricingView
     - Prix calculés en computed selon le mode de facturation
     - Card Erudia+ en avant-plan (gradient violet + scale légère + badge)
     - Features lists avec icône check (vert) ou tiret (grisé)
     - Note de réassurance Stripe en bas de section -->
<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import AppCtaLink from '@/components/ui/AppCtaLink.vue'
const { t } = useLocale()

const props = defineProps<{
  isAnnual: boolean
}>()

// ── Prix selon le mode de facturation ─────────────────────────
const premiumPrice = computed(() => props.isAnnual ? t('pricing.cards.premiumPriceA') : t('pricing.cards.premiumPriceM'))
const premiumPeriod = computed(() => props.isAnnual ? t('pricing.cards.premiumPeriodA') : t('pricing.cards.premiumPeriodM'))
const annualSavings = computed(() => props.isAnnual ? t('pricing.cards.premiumSavings') : null)

// ── Features plan gratuit (réactives à la locale) ─────────────
const freeFeatures = computed(() => [
  { text: t('pricing.cards.freeF1'),  yes: true },
  { text: t('pricing.cards.freeF2'),  yes: true },
  { text: t('pricing.cards.freeF3'),  yes: true },
  { text: t('pricing.cards.freeF4'),  yes: true },
  { text: t('pricing.cards.freeF5'),  yes: true },
  { text: t('pricing.cards.freeF6'),  yes: true },
  { text: t('pricing.cards.freeF7'),  yes: true },
  { text: t('pricing.cards.freeF8'),  yes: true },
  { text: t('pricing.cards.freeF9'),  yes: true },
  { text: t('pricing.cards.freeDis1'), yes: false },
  { text: t('pricing.cards.freeDis2'), yes: false },
])

// ── Features plan premium (réactives à la locale) ─────────────
const premiumFeatures = computed(() => [
  { text: t('pricing.cards.premiumF1') },
  { text: t('pricing.cards.premiumF2') },
  { text: t('pricing.cards.premiumF3') },
  { text: t('pricing.cards.premiumF4') },
  { text: t('pricing.cards.premiumF5') },
  { text: t('pricing.cards.premiumF6') },
  { text: t('pricing.cards.premiumF7') },
  { text: t('pricing.cards.premiumF8') },
  { text: t('pricing.cards.premiumF9') },
])
</script>

<template>
  <section class="pricing-cards" aria-labelledby="pricing-cards-title">
    <div class="container">

      <!-- Titre accessible masqué visuellement -->
      <h2 id="pricing-cards-title" class="sr-only">{{ t('pricing.cards.title') }}</h2>

      <div class="pricing-cards__grid">

        <!-- ── Plan Gratuit ── -->
        <article class="plan-card plan-card--free">

          <div class="plan-card__label">{{ t('pricing.cards.freeLabel') }}</div>

          <div class="plan-card__price-wrap">
            <span class="plan-card__price">{{ t('pricing.cards.freePrice') }}</span>
          </div>
          <div class="plan-card__period">{{ t('pricing.cards.freePeriod') }}</div>
          <div class="plan-card__annual-note">&nbsp;</div>

          <AppCtaLink class="plan-card__cta plan-card__cta--outline">
            {{ t('pricing.cards.freeCta') }}
          </AppCtaLink>
          <p class="plan-card__reassure">{{ t('pricing.cards.freeReassure') }}</p>

          <hr class="plan-card__divider" />
          <div class="plan-card__features-title">{{ t('pricing.cards.freeFeaturesTitle') }}</div>

          <ul class="plan-card__features" aria-label="Fonctionnalités du plan gratuit">
            <li
              v-for="feature in freeFeatures"
              :key="feature.text"
              class="plan-card__feature"
              :class="{ 'plan-card__feature--disabled': !feature.yes }"
            >
              <span
                class="plan-card__check"
                :class="feature.yes ? 'plan-card__check--yes' : 'plan-card__check--no'"
                aria-hidden="true"
              >
                {{ feature.yes ? '✓' : '—' }}
              </span>
              <span>{{ feature.text }}</span>
            </li>
          </ul>

        </article>

        <!-- ── Plan Erudia+ (highlighted) ── -->
        <article class="plan-card plan-card--premium" aria-label="Plan Erudia+ — recommandé">

          <!-- Badge "Le plus populaire" — masqué si vide -->
          <div v-if="t('pricing.cards.premiumBadge')" class="plan-card__popular-badge">{{ t('pricing.cards.premiumBadge') }}</div>

          <div class="plan-card__label plan-card__label--light">{{ t('pricing.cards.premiumLabel') }}</div>

          <div class="plan-card__price-wrap">
            <!-- Transition du prix lors du changement de période -->
            <Transition name="price-flip" mode="out-in">
              <span
                class="plan-card__price plan-card__price--white"
                :key="premiumPrice"
              >
                {{ premiumPrice }}
              </span>
            </Transition>
          </div>

          <div class="plan-card__period plan-card__period--light">
            {{ premiumPeriod }}
          </div>

          <!-- Note annuelle (économies) -->
          <Transition name="fade">
            <div
              v-if="annualSavings"
              class="plan-card__annual-note plan-card__annual-note--light"
            >
              {{ annualSavings }}
              <span class="plan-card__savings">{{ t('pricing.cards.premiumSavingsAmount') }}</span>
            </div>
            <div v-else class="plan-card__annual-note">&nbsp;</div>
          </Transition>

          <AppCtaLink class="plan-card__cta plan-card__cta--white">
            {{ t('pricing.cards.premiumCta') }}
          </AppCtaLink>
          <p class="plan-card__reassure plan-card__reassure--light">
            {{ t('pricing.cards.premiumReassure') }}
          </p>

          <hr class="plan-card__divider plan-card__divider--light" />
          <div class="plan-card__features-title plan-card__features-title--light">
            {{ t('pricing.cards.premiumFeaturesTitle') }}
          </div>

          <ul class="plan-card__features" aria-label="Fonctionnalités supplémentaires Erudia+">
            <li
              v-for="feature in premiumFeatures"
              :key="feature.text"
              class="plan-card__feature"
            >
              <span class="plan-card__check plan-card__check--yes-white" aria-hidden="true">✓</span>
              <span>{{ feature.text }}</span>
            </li>
          </ul>

        </article>

      </div>

      <!-- Bannière prix garanti à vie -->
      <div class="pricing-cards__guarantee" role="note">
        <span class="pricing-cards__guarantee-icon" aria-hidden="true">🔒</span>
        <div class="pricing-cards__guarantee-text">
          <strong>{{ t('pricing.cards.priceGuaranteeTitle') }}</strong>
          <span>{{ t('pricing.cards.priceGuaranteeBody') }}</span>
        </div>
      </div>

      <!-- Note Stripe en bas de section -->
      <p class="pricing-cards__stripe-note">{{ t('pricing.cards.stripe') }}</p>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.pricing-cards {
  padding: 72px 0 80px;
  background: white;

  // ── Grille 2 colonnes ──
  &__grid {
    display: grid;
    gap: 24px;
    max-width: 900px;
    margin: 0 auto;
    // Alignement haut pour que le badge "Le plus populaire" ne coupe pas
    align-items: start;

    @include m.respond-to(md) {
      grid-template-columns: 1fr 1fr;
      // On laisse la card premium se décaler légèrement vers le haut
      align-items: center;
    }
  }

  // ── Bannière prix garanti à vie ──
  &__guarantee {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    max-width: 640px;
    margin: 32px auto 0;
    padding: 18px 24px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.06) 0%, rgba(118, 75, 162, 0.06) 100%);
    border: 1.5px solid rgba(102, 126, 234, 0.25);
    border-radius: var(--radius-xl);
  }

  &__guarantee-icon {
    font-size: 1.4rem;
    flex-shrink: 0;
    margin-top: 1px;
  }

  &__guarantee-text {
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      font-size: 0.92rem;
      font-weight: 800;
      color: var(--color-primary-dark);
    }

    span {
      font-size: 0.84rem;
      color: var(--color-text-light);
      line-height: 1.55;
    }
  }

  // ── Note Stripe ──
  &__stripe-note {
    text-align: center;
    margin-top: 32px;
    font-size: 0.84rem;
    color: var(--color-text-light);
  }
}

// ── Card commune ──────────────────────────────────────────────
.plan-card {
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  border: 1.5px solid var(--color-surface-dark);
  background: white;
  position: relative;
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);

  // ── Plan Gratuit — hover ──
  &--free:hover {
    border-color: var(--color-primary-light);
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }

  // ── Plan Premium ──
  &--premium {
    background: var(--gradient-primary);
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-lg);
    // Légèrement agrandi pour le mettre en avant
    transform: scale(1.02);

    @include m.respond-to(md) { transform: scale(1.04); }

    // Pas de hover supplémentaire pour éviter le double effet
  }

  // ── Badge "Le plus populaire" ──
  &__popular-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--gradient-accent);
    color: #333;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 6px 18px;
    border-radius: var(--radius-full);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
    box-shadow: var(--shadow-sm);
  }

  // ── Étiquette plan ──
  &__label {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-light);
    margin-bottom: 10px;

    &--light { color: rgba(255, 255, 255, 0.65); }
  }

  // ── Prix ──
  &__price-wrap {
    margin-bottom: 4px;
    min-height: 3.2rem; // stabilise pendant la transition
  }

  &__price {
    display: inline-block;
    font-family: var(--font-display);
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 1;
    color: var(--color-text);

    &--white { color: white; }
  }

  &__period {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--color-text-light);
    margin-bottom: 4px;

    &--light { color: rgba(255, 255, 255, 0.6); }
  }

  // ── Note annuelle ──
  &__annual-note {
    font-size: 0.8rem;
    font-weight: 600;
    min-height: 20px;
    margin-bottom: 24px;
    color: var(--color-text-light);

    &--light { color: rgba(255, 255, 255, 0.7); }
  }

  &__savings {
    font-weight: 800;
    color: #FFD700;
    display: block;
    margin-top: 2px;
  }

  // ── CTA ──
  &__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px 24px;
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.95rem;
    transition: all var(--transition);
    text-align: center;

    &--outline {
      background: white;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);

      &:hover {
        background: var(--color-primary);
        color: white;
      }
    }

    &--white {
      background: white;
      color: var(--color-primary-dark);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }
    }
  }

  // ── Réassurance sous CTA ──
  &__reassure {
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-text-light);
    margin-top: 10px;
    margin-bottom: 0;

    &--light { color: rgba(255, 255, 255, 0.5); }
  }

  // ── Séparateur ──
  &__divider {
    height: 1px;
    background: var(--color-surface-dark);
    border: none;
    margin: 24px 0;

    &--light { background: rgba(255, 255, 255, 0.2); }
  }

  // ── Titre liste features ──
  &__features-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-light);
    margin-bottom: 16px;

    &--light { color: rgba(255, 255, 255, 0.55); }
  }

  // ── Liste features ──
  &__features {
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  &__feature {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--color-text);

    &--disabled {
      opacity: 0.38;
    }

    // Sur fond violet la couleur de texte est blanche
    .plan-card--premium & { color: white; }
  }

  // ── Icône check ──
  &__check {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 800;
    flex-shrink: 0;
    margin-top: 1px;

    &--yes {
      background: rgba(16, 185, 129, 0.12);
      color: #059669;
    }

    &--no {
      background: rgba(0, 0, 0, 0.05);
      color: var(--color-text-light);
    }

    // Sur fond violet, check blanc
    &--yes-white {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
}

// ── Classe utilitaire sr-only ─────────────────────────────────
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// ── Transitions prix ─────────────────────────────────────────
.price-flip-enter-active,
.price-flip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.price-flip-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.price-flip-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
