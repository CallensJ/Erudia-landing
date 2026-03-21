<!-- PricingHero.vue — Section hero de la page Tarifs
     - Fond sombre gradient hero
     - Orbes décoratifs
     - Titre "Simple. Transparent. Sans surprise."
     - Billing toggle mensuel / annuel → émet 'billing-change' vers PricingView
     - Wave SVG de transition vers fond blanc -->
<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

// ── Toggle mensuel / annuel ────────────────────────────────────
// L'état est local mais émis vers PricingView pour être partagé avec PricingCards
const isAnnual = ref(false)

const emit = defineEmits<{
  'billing-change': [value: boolean]
}>()

function toggle() {
  isAnnual.value = !isAnnual.value
  emit('billing-change', isAnnual.value)
}
</script>

<template>
  <section class="pricing-hero" aria-label="Tarifs Erudia — introduction">

    <!-- Orbes flous -->
    <div class="pricing-hero__orb pricing-hero__orb--1" aria-hidden="true"></div>
    <div class="pricing-hero__orb pricing-hero__orb--2" aria-hidden="true"></div>

    <div class="container">
      <div class="pricing-hero__content">

        <!-- Pill étiquette -->
        <div class="pill pill--white label pricing-hero__pill">
          {{ t('pricing.hero.pill') }}
        </div>

        <!-- Titre -->
        <h1 class="pricing-hero__title">
          {{ t('pricing.hero.title') }}
        </h1>

        <!-- Sous-titre -->
        <p class="pricing-hero__subline">{{ t('pricing.hero.subline') }}</p>

        <!-- Toggle mensuel / annuel -->
        <div class="pricing-hero__billing" aria-label="Choix de la période de facturation">

          <span
            class="pricing-hero__billing-label"
            :class="{ 'pricing-hero__billing-label--active': !isAnnual }"
          >
            {{ t('pricing.hero.billingMonthly') }}
          </span>

          <!-- Switch accessible au clavier -->
          <button
            class="pricing-hero__switch"
            :class="{ 'pricing-hero__switch--annual': isAnnual }"
            role="switch"
            :aria-checked="isAnnual"
            aria-label="Basculer vers facturation annuelle"
            @click="toggle"
            @keydown.space.prevent="toggle"
            @keydown.enter.prevent="toggle"
          >
            <span class="pricing-hero__knob"></span>
          </button>

          <span
            class="pricing-hero__billing-label"
            :class="{ 'pricing-hero__billing-label--active': isAnnual }"
          >
            {{ t('pricing.hero.billingAnnual') }}
          </span>

          <!-- Badge "Économisez 33%" animé -->
          <Transition name="save-badge">
            <span v-if="isAnnual" class="pricing-hero__save-badge">
              {{ t('pricing.hero.billingSavings') }}
            </span>
          </Transition>

        </div>

      </div>
    </div>

    <!-- Wave de transition vers fond blanc -->
    <svg
      class="pricing-hero__wave"
      viewBox="0 0 1440 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M0 48H1440V12C1200 40 960 48 720 36C480 24 240 4 0 12V48Z" fill="#ffffff" />
    </svg>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section hero ──────────────────────────────────────────────
.pricing-hero {
  background: var(--gradient-hero);
  padding-top: calc(var(--header-h) + 72px);
  padding-bottom: 0;
  position: relative;
  overflow: hidden;
  text-align: center;

  // ── Orbes ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  &__orb--1 {
    width: 500px;
    height: 500px;
    background: #667eea;
    opacity: 0.2;
    top: -150px;
    right: -100px;
  }

  &__orb--2 {
    width: 400px;
    height: 400px;
    background: #FFD700;
    opacity: 0.07;
    bottom: 0;
    left: 0;
  }

  // ── Contenu ──
  &__content {
    position: relative;
    z-index: 2;
    color: white;
    padding-bottom: 64px;
  }

  &__pill {
    margin-bottom: 20px;
    display: inline-flex;
  }

  // ── Titre ──
  &__title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: white;
    margin-top: 14px;
    margin-bottom: 16px;
    animation: fadeInDown 0.6s ease both;
  }

  &__accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  // ── Sous-titre ──
  &__subline {
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.75;
    max-width: 520px;
    margin: 0 auto 40px;
    animation: fadeInDown 0.6s 0.1s ease both;
  }

  // ── Toggle billing ──
  &__billing {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    animation: fadeInDown 0.6s 0.2s ease both;
  }

  &__billing-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.5);
    transition: color var(--transition);

    &--active { color: white; }
  }

  // Switch toggle
  &__switch {
    width: 52px;
    height: 28px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    position: relative;
    cursor: pointer;
    transition: background var(--transition), border-color var(--transition);
    flex-shrink: 0;

    &--annual {
      background: var(--color-accent);
      border-color: var(--color-accent);

      .pricing-hero__knob { transform: translateX(24px); }
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 3px;
    }
  }

  &__knob {
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    transition: transform var(--transition);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  // Badge "Économisez"
  &__save-badge {
    background: var(--gradient-accent);
    color: #333;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 5px 14px;
    border-radius: var(--radius-full);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  // ── Wave ──
  &__wave {
    display: block;
    width: 100%;
    margin-top: 48px;
    line-height: 0;
    height: 48px;
  }
}

// ── Animation badge ──────────────────────────────────────────
.save-badge-enter-active,
.save-badge-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.save-badge-enter-from,
.save-badge-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

// ── Animation entrée ─────────────────────────────────────────
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
