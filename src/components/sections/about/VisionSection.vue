<!-- VisionSection.vue — §1.4 Vision éditoriale d'Erudia
     - Fond blanc
     - Layout : blockquote impact à gauche, texte + stats à droite
     - 3 stat cards animées au scroll
     - Reveal IntersectionObserver -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

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
  document.querySelectorAll('.vs-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="vision-section" aria-labelledby="vision-title">
    <div class="container">

      <!-- En-tête centré -->
      <div class="vision-section__header vs-reveal">
        <div class="pill pill--primary label">{{ t('about.vision.pill') }}</div>
        <h2 id="vision-title" class="vision-section__title">{{ t('about.vision.title') }}</h2>
        <p class="vision-section__subline">{{ t('about.vision.subline') }}</p>
      </div>

      <!-- Grille contenu -->
      <div class="vision-section__grid">

        <!-- Colonne gauche : blockquote impact -->
        <div class="vs-quote-col vs-reveal" data-delay="1">
          <blockquote class="vs-quote">
            <div class="vs-quote__mark" aria-hidden="true">"</div>
            <p class="vs-quote__text">{{ t('about.vision.blockquote') }}</p>
          </blockquote>

          <!-- Stats -->
          <div class="vs-stats">
            <div class="vs-stat">
              <div class="vs-stat__value">{{ t('about.vision.stat1Value') }}</div>
              <div class="vs-stat__label">{{ t('about.vision.stat1Label') }}</div>
            </div>
            <div class="vs-stat">
              <div class="vs-stat__value">{{ t('about.vision.stat2Value') }}</div>
              <div class="vs-stat__label">{{ t('about.vision.stat2Label') }}</div>
            </div>
            <div class="vs-stat">
              <div class="vs-stat__value">{{ t('about.vision.stat3Value') }}</div>
              <div class="vs-stat__label">{{ t('about.vision.stat3Label') }}</div>
            </div>
          </div>
        </div>

        <!-- Colonne droite : paragraphes + icônes -->
        <div class="vs-text-col vs-reveal" data-delay="2">

          <div class="vs-point">
            <div class="vs-point__icon" aria-hidden="true">📚</div>
            <div>
              <p class="vs-point__text">{{ t('about.vision.p1') }}</p>
            </div>
          </div>

          <div class="vs-point">
            <div class="vs-point__icon" aria-hidden="true">🧠</div>
            <div>
              <p class="vs-point__text">{{ t('about.vision.p2') }}</p>
            </div>
          </div>

          <!-- Label de différenciation -->
          <div class="vs-diff-label">
            <span class="vs-diff-label__icon" aria-hidden="true">✓</span>
            On exige de savoir — pas seulement de cliquer.
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ─────────────────────────────────────────────────
.vision-section {
  background: white;
  padding: 80px 0;

  @include m.respond-to(md) { padding: 110px 0; }

  // ── En-tête ──
  &__header {
    text-align: center;
    max-width: 640px;
    margin: 0 auto 64px;

    .pill { margin-bottom: 16px; }
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3.5vw, 2.5rem);
    font-weight: 900;
    color: var(--color-text);
    line-height: 1.15;
    letter-spacing: -0.018em;
    margin-bottom: 14px;
  }

  &__subline {
    font-size: 0.97rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
  }

  // ── Grille ──
  &__grid {
    display: grid;
    gap: 48px;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }
  }
}

// ── Blockquote ───────────────────────────────────────────────
.vs-quote-col {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.vs-quote {
  position: relative;
  background: linear-gradient(135deg, #f7f8ff 0%, #ede8ff 100%);
  border-radius: var(--radius-lg);
  padding: 40px 36px 36px;
  margin: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  &__mark {
    font-family: var(--font-display);
    font-size: 6rem;
    line-height: 0.5;
    color: var(--color-primary);
    opacity: 0.2;
    margin-bottom: 16px;
    display: block;
    font-weight: 900;
  }

  &__text {
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.55;
    font-style: italic;
    margin: 0;
  }
}

// ── Stats ──────────────────────────────────────────────────
.vs-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.vs-stat {
  text-align: center;
  padding: 20px 12px;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-surface-dark);

  &__value {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 900;
    color: var(--color-primary);
    line-height: 1;
    margin-bottom: 6px;

    @include m.respond-to(md) { font-size: 1.6rem; }
  }

  &__label {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--color-text-light);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1.3;
  }
}

// ── Colonne texte ─────────────────────────────────────────
.vs-text-col {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 4px;
}

.vs-point {
  display: flex;
  gap: 18px;
  align-items: flex-start;

  &__icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    background: var(--color-surface);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-surface-dark);
  }

  &__text {
    font-size: 0.94rem;
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin: 0;
    padding-top: 10px;
  }
}

// ── Label différenciation ─────────────────────────────────
.vs-diff-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.06));
  border: 1.5px solid rgba(102, 126, 234, 0.25);
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  line-height: 1.4;

  &__icon {
    font-size: 1rem;
    color: var(--color-secondary);
    font-style: normal;
  }
}

// ── Reveal ────────────────────────────────────────────────
.vs-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;

  &[data-delay='1'] { transition-delay: 0.1s; }
  &[data-delay='2'] { transition-delay: 0.22s; }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
