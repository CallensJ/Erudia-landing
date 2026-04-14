<!-- FleSection.vue — Positionnement de la version EN comme préparation FLE
     - Fond surface (gris clair)
     - Layout : intro + pills features en haut, 3 cards en grille en bas
     - Citation du fondateur
     - Reveal au scroll -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

const features = computed(() => [
  t('about.fle.pillFeature1'),
  t('about.fle.pillFeature2'),
  t('about.fle.pillFeature3'),
  t('about.fle.pillFeature4'),
])

const cards = computed(() => [
  {
    emoji: '👨‍👩‍👧',
    title: t('about.fle.card1Title'),
    text:  t('about.fle.card1Text'),
  },
  {
    emoji: '🔄',
    title: t('about.fle.card2Title'),
    text:  t('about.fle.card2Text'),
  },
  {
    emoji: '🌍',
    title: t('about.fle.card3Title'),
    text:  t('about.fle.card3Text'),
  },
])

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
    { threshold: 0.1 }
  )
  document.querySelectorAll('.fle-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="fle-section" aria-labelledby="fle-title">
    <div class="container">

      <!-- En-tête -->
      <div class="fle-section__header fle-reveal">
        <div class="pill pill--primary label">{{ t('about.fle.pill') }}</div>
        <h2 id="fle-title" class="fle-section__title">{{ t('about.fle.title') }}</h2>
        <p class="fle-section__subline">{{ t('about.fle.subline') }}</p>
      </div>

      <!-- Grille principale : texte + citation -->
      <div class="fle-section__grid fle-reveal" data-delay="1">

        <!-- Texte -->
        <div class="fle-section__text-col">
          <p class="fle-section__para">{{ t('about.fle.p1') }}</p>
          <p class="fle-section__para">{{ t('about.fle.p2') }}</p>

          <!-- Pills caractéristiques -->
          <div class="fle-section__features" aria-label="Caractéristiques">
            <span
              v-for="feature in features"
              :key="feature"
              class="fle-feature-pill"
            >
              {{ feature }}
            </span>
          </div>
        </div>

        <!-- Citation fondateur -->
        <aside class="fle-section__quote-col" aria-label="Citation du fondateur">
          <div class="fle-quote">
            <div class="fle-quote__avatar" aria-hidden="true">
              <span>J</span>
            </div>
            <blockquote class="fle-quote__blockquote">
              <p>{{ t('about.fle.quote') }}</p>
              <footer>Johan — Fondateur d'Erudia</footer>
            </blockquote>
          </div>

          <!-- Badge drapeaux -->
          <div class="fle-flag-badge" aria-label="Bilingue franco-anglais">
            <span aria-hidden="true">🇵🇭 + 🇫🇷</span>
            <span>L'origine du projet</span>
          </div>
        </aside>

      </div>

      <!-- 3 cards -->
      <div class="fle-section__cards">
        <div
          v-for="(card, i) in cards"
          :key="card.title"
          class="fle-card fle-reveal"
          :data-delay="i + 2"
        >
          <div class="fle-card__emoji" aria-hidden="true">{{ card.emoji }}</div>
          <h3 class="fle-card__title">{{ card.title }}</h3>
          <p class="fle-card__text">{{ card.text }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ─────────────────────────────────────────────────
.fle-section {
  background: var(--color-surface);
  padding: 80px 0;

  @include m.respond-to(md) { padding: 110px 0; }

  // ── En-tête ──
  &__header {
    text-align: center;
    max-width: 660px;
    margin: 0 auto 56px;

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

  // ── Grille texte + citation ──
  &__grid {
    display: grid;
    gap: 48px;
    margin-bottom: 56px;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 1fr;
      gap: 56px;
      align-items: start;
    }
  }

  &__text-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__para {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin: 0;
  }

  &__features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  &__quote-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  // ── Cards ──
  &__cards {
    display: grid;
    gap: 20px;

    @include m.respond-to(md) { grid-template-columns: repeat(3, 1fr); }
  }
}

// ── Feature pill ─────────────────────────────────────────────
.fle-feature-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: white;
  border: 1.5px solid rgba(102, 126, 234, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-primary);
}

// ── Citation ──────────────────────────────────────────────────
.fle-quote {
  display: flex;
  gap: 16px;
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--color-surface-dark);
  box-shadow: var(--shadow-sm);

  &__avatar {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 900;
    font-size: 1.1rem;
    color: white;
    margin-top: 2px;
  }

  &__blockquote {
    margin: 0;

    p {
      font-size: 0.9rem;
      font-style: italic;
      color: var(--color-text);
      line-height: 1.7;
      margin-bottom: 10px;
    }

    footer {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--color-primary);
    }
  }
}

// ── Badge drapeaux ──────────────────────────────────────────
.fle-flag-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: white;
  border: 1.5px solid var(--color-surface-dark);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-secondary);
}

// ── Card ─────────────────────────────────────────────────────
.fle-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  border: 1px solid var(--color-surface-dark);
  transition: box-shadow var(--transition), transform var(--transition);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);
  }

  &__emoji {
    font-size: 2rem;
    margin-bottom: 16px;
    display: block;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 10px;
    line-height: 1.3;
  }

  &__text {
    font-size: 0.88rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin: 0;
  }
}

// ── Reveal ────────────────────────────────────────────────
.fle-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;

  &[data-delay='1'] { transition-delay: 0.1s; }
  &[data-delay='2'] { transition-delay: 0.15s; }
  &[data-delay='3'] { transition-delay: 0.25s; }
  &[data-delay='4'] { transition-delay: 0.35s; }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
