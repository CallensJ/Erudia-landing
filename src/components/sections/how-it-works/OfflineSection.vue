<!-- OfflineSection.vue — Mise en avant du mode hors ligne (PWA)
     - Fond surface (gris clair) — retour au clair après le sombre des Tips
     - Layout 2 colonnes desktop : texte gauche + cartes scénarios droite
     - Colonne texte : pill, titre, 2 paragraphes, 3 étapes de fonctionnement
     - Colonne visuelle : 4 cards scénarios avec badge de statut coloré
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

// ── Étapes de fonctionnement offline (réactives à la locale) ──
const offlineSteps = computed(() => [
  { icon: '📲', bg: 'rgba(102, 126, 234, 0.1)', title: t('howItWorks.offline.step1Title'), desc: t('howItWorks.offline.step1Desc') },
  { icon: '✈️', bg: 'rgba(76, 175, 80, 0.1)',   title: t('howItWorks.offline.step2Title'), desc: t('howItWorks.offline.step2Desc') },
  { icon: '🔄', bg: 'rgba(59, 130, 246, 0.1)',  title: t('howItWorks.offline.step3Title'), desc: t('howItWorks.offline.step3Desc') },
])

// ── Cartes scénarios (réactives à la locale) ──────────────────
const scenarios = computed(() => [
  { icon: '🏖️', title: t('howItWorks.offline.sc1Title'), desc: t('howItWorks.offline.sc1Desc'), status: 'ok',     statusLabel: t('howItWorks.offline.sc1Status') },
  { icon: '🚂', title: t('howItWorks.offline.sc2Title'), desc: t('howItWorks.offline.sc2Desc'), status: 'ok',     statusLabel: t('howItWorks.offline.sc2Status') },
  { icon: '🏕️', title: t('howItWorks.offline.sc3Title'), desc: t('howItWorks.offline.sc3Desc'), status: 'sync',   statusLabel: t('howItWorks.offline.sc3Status') },
  { icon: '✈️', title: t('howItWorks.offline.sc4Title'), desc: t('howItWorks.offline.sc4Desc'), status: 'cached', statusLabel: t('howItWorks.offline.sc4Status') },
])

// ── Reveal au scroll ──────────────────────────────────────────
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
    { threshold: 0.12 }
  )

  document.querySelectorAll('.offline-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="offline" aria-labelledby="offline-title">
    <div class="container">
      <div class="offline__inner">

        <!-- ── Colonne texte ── -->
        <div class="offline__text offline-reveal" data-delay="0">

          <div class="pill pill--primary label">{{ t('howItWorks.offline.pill') }}</div>

          <h2 id="offline-title" class="offline__heading">
            {{ t('howItWorks.offline.title') }}<br />
            <span class="offline__heading-accent">{{ t('howItWorks.offline.titleAccent') }}</span>
          </h2>

          <p class="offline__para">{{ t('howItWorks.offline.para1') }}</p>
          <p class="offline__para">{{ t('howItWorks.offline.para2') }}</p>

          <!-- 3 étapes de fonctionnement -->
          <div class="offline__steps">
            <div
              v-for="step in offlineSteps"
              :key="step.title"
              class="offline__step"
            >
              <div
                class="offline__step-icon"
                :style="{ background: step.bg }"
                aria-hidden="true"
              >
                {{ step.icon }}
              </div>
              <div class="offline__step-text">
                <div class="offline__step-title">{{ step.title }}</div>
                <div class="offline__step-desc">{{ step.desc }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- ── Colonne visuelle : scénarios ── -->
        <div class="offline__visual offline-reveal" data-delay="2">
          <div
            v-for="scenario in scenarios"
            :key="scenario.title"
            class="offline__card"
          >
            <div class="offline__card-icon" aria-hidden="true">{{ scenario.icon }}</div>
            <div class="offline__card-body">
              <div class="offline__card-title">{{ scenario.title }}</div>
              <div class="offline__card-desc">{{ scenario.desc }}</div>
            </div>
            <div
              class="offline__card-status"
              :class="`offline__card-status--${scenario.status}`"
            >
              {{ scenario.statusLabel }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.offline {
  background: var(--color-surface);
  padding: 80px 0;

  @include m.respond-to(md) { padding: 110px 0; }

  // ── Grille 2 colonnes ──
  &__inner {
    display: grid;
    gap: 56px;
    align-items: center;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 1fr;
      gap: 80px;
    }
  }

  // ── Colonne texte ──
  &__text {
    .pill { margin-bottom: 16px; }
  }

  &__heading {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.015em;
    color: var(--color-text);
    margin-top: 4px;
    margin-bottom: 20px;
  }

  // Mot accent en gradient primary
  &__heading-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__para {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin-bottom: 14px;
  }

  // ── Étapes de fonctionnement ──
  &__steps {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 28px;
  }

  &__step {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  &__step-icon {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  &__step-title {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--color-text);
    margin-bottom: 2px;
  }

  &__step-desc {
    font-size: 0.82rem;
    color: var(--color-text-secondary);
    line-height: 1.55;
  }

  // ── Colonne visuelle ──
  &__visual {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  // ── Carte scénario ──
  &__card {
    background: white;
    border-radius: var(--radius-lg);
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: var(--shadow-card);
    border: 1.5px solid var(--color-surface-dark);
    transition: transform var(--transition), border-color var(--transition);

    &:hover {
      transform: translateX(5px);
      border-color: var(--color-primary-light);
    }
  }

  &__card-icon {
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  &__card-body {
    flex: 1;
    min-width: 0;
  }

  &__card-title {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--color-text);
    margin-bottom: 2px;
  }

  &__card-desc {
    font-size: 0.78rem;
    color: var(--color-text-secondary);
    line-height: 1.45;
  }

  // ── Badge statut ──
  &__card-status {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    flex-shrink: 0;
    white-space: nowrap;

    &--ok {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
    }

    &--sync {
      background: rgba(59, 130, 246, 0.1);
      color: #2563eb;
    }

    &--cached {
      background: rgba(255, 152, 0, 0.1);
      color: #c05621;
    }
  }
}

// ── Reveal au scroll ─────────────────────────────────────────
.offline-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;

  // Délai via data-delay (0 = immédiat, 2 = 0.2s)
  &[data-delay='0'] { transition-delay: 0s; }
  &[data-delay='2'] { transition-delay: 0.2s; }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
