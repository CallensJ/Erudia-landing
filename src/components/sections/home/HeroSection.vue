<!-- HeroSection.vue — Section Hero de la home page
     - Fond sombre gradient (--gradient-hero)
     - Col gauche : tag animé, titre Sora, subline, 2 CTAs, proof items
     - Col droite : mockup téléphone + badges flottants
     - Étoiles générées dynamiquement (onMounted)
     - Layout 1 col mobile → 2 cols desktop (≥1024px) -->
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useComingSoon } from '@/composables/useComingSoon'

const { t, localePath } = useLocale()
const { openModal } = useComingSoon()

// Génération des étoiles en JS pour éviter le HTML statique répétitif
onMounted(() => {
  const container = document.getElementById('hero-stars')
  if (!container) return

  // 60 étoiles de tailles et durées aléatoires
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    const size = Math.random() * 3 + 1
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --d: ${2 + Math.random() * 4}s;
      --o: ${0.2 + Math.random() * 0.6};
    `
    container.appendChild(star)
  }
})

// Preuve sociale — réactive à la locale
const proofItems = computed(() => [
  { icon: '📡', label: t('home.hero.proofOffline') },
  { icon: '🔒', label: t('home.hero.proofCoppa') },
  { icon: '🌍', label: t('home.hero.proofBilingual') },
])
</script>

<template>
  <section class="hero" aria-label="Présentation Erudia">

    <!-- Étoiles animées -->
    <div class="hero__stars" id="hero-stars" aria-hidden="true"></div>

    <!-- Orbes gradient flou en arrière-plan -->
    <div class="hero__orb hero__orb--1" aria-hidden="true"></div>
    <div class="hero__orb hero__orb--2" aria-hidden="true"></div>
    <div class="hero__orb hero__orb--3" aria-hidden="true"></div>

    <div class="container">
      <div class="hero__content">

        <!-- ── Colonne texte ── -->
        <div class="hero__text">

          <!-- Titre H1 avec mot accent gradient or -->
          <h1 class="hero__title">
            {{ t('home.hero.title1') }}<br />
            <span class="hero__title-accent">{{ t('home.hero.title2') }}</span>
          </h1>

          <!-- Sous-titre -->
          <p class="hero__subline">{{ t('home.hero.subline') }}</p>

          <!-- CTAs -->
          <div class="hero__actions">
            <button
              type="button"
              class="btn btn--primary btn--lg"
              @click="openModal"
            >
              {{ t('home.hero.ctaPrimary') }}
            </button>
            <RouterLink :to="localePath('/how-it-works')" class="btn btn--ghost btn--lg">
              {{ t('home.hero.ctaSecondary') }}
            </RouterLink>
          </div>

          <!-- Preuve sociale -->
          <div class="hero__proof">
            <div
              v-for="item in proofItems"
              :key="item.label"
              class="hero__proof-item"
            >
              <span class="hero__proof-icon" aria-hidden="true">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- ── Colonne visuel (mockup téléphone) ── -->
        <div class="hero__visual" aria-hidden="true">
          <div class="hero__mockup-wrapper">

            <!-- Badges flottants autour du mockup -->
            <div class="hero__badge hero__badge--1">{{ t('home.hero.badge1') }}</div>
            <div class="hero__badge hero__badge--2">{{ t('home.hero.badge2') }}</div>

            <!-- Téléphone mockup -->
            <div class="hero__phone">
              <div class="hero__screen">

                <!-- Header app simulé -->
                <div class="hero__screen-header">
                  <div class="hero__screen-avatar">🦊</div>
                  <div class="hero__screen-score">
                    <div class="hero__screen-score-label">{{ t('home.hero.score') }}</div>
                    <span class="hero__screen-score-value">8 / 20</span>
                  </div>
                </div>

                <!-- Corps quiz simulé -->
                <div class="hero__screen-body">
                  <div class="hero__screen-counter">{{ t('home.hero.question') }}</div>
                  <div class="hero__screen-question">{{ t('home.hero.questionText') }}</div>

                  <div class="hero__screen-options">
                    <div class="hero__screen-option hero__screen-option--wrong">
                      <div class="hero__screen-letter">A</div>
                      <span>{{ t('home.hero.answerA') }}</span>
                    </div>
                    <div class="hero__screen-option hero__screen-option--correct">
                      <div class="hero__screen-letter">B</div>
                      <span>{{ t('home.hero.answerB') }}</span>
                    </div>
                    <div class="hero__screen-option">
                      <div class="hero__screen-letter">C</div>
                      <span>{{ t('home.hero.answerC') }}</span>
                    </div>
                    <div class="hero__screen-option">
                      <div class="hero__screen-letter">D</div>
                      <span>{{ t('home.hero.answerD') }}</span>
                    </div>
                  </div>

                  <!-- Barre de progression -->
                  <div class="hero__screen-progress">
                    <div class="hero__screen-progress-fill"></div>
                  </div>
                </div>

              </div>
            </div>
            <!-- Fin mockup phone -->

          </div>
        </div>
        <!-- Fin colonne visuel -->

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section hero ─────────────────────────────────────────────
.hero {
  background: var(--gradient-hero);
  min-height: 100svh;
  padding-top: calc(var(--header-h) + 48px);
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  // ── Étoiles ──
  &__stars {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  // Les étoiles sont injectées en JS — styles via :deep pour les éléments dynamiques
  :deep(.star) {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle var(--d, 3s) ease-in-out infinite;
    opacity: var(--o, 0.4);
  }

  // ── Orbes flous ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.35;
  }

  &__orb--1 {
    width: 500px;
    height: 500px;
    background: #667eea;
    top: -150px;
    right: -100px;
  }

  &__orb--2 {
    width: 400px;
    height: 400px;
    background: #764ba2;
    bottom: -100px;
    left: -100px;
  }

  &__orb--3 {
    width: 300px;
    height: 300px;
    background: #FFD700;
    top: 40%;
    left: 40%;
    opacity: 0.12;
  }

  // ── Grid contenu : 1 col mobile → 2 cols desktop ──
  &__content {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 48px;
    align-items: center;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 1fr;
      gap: 64px;
    }
  }

  // ── Colonne texte ──
  &__text {
    color: white;
    animation: fadeInDown 0.6s ease both;
  }

  // Tag "bientôt dispo"
  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    border-radius: var(--radius-full);
    padding: 8px 16px;
    font-size: 0.82rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 24px;
  }

  &__tag-dot {
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    flex-shrink: 0;
    animation: pulseDot 2s ease-in-out infinite;
  }

  // Titre H1
  &__title {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
    margin-bottom: 20px;
    animation: fadeInDown 0.6s 0.1s ease both;
  }

  // Mot "vraiment." en gradient or
  &__title-accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__subline {
    font-size: clamp(1rem, 2vw, 1.15rem);
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.75;
    margin-bottom: 36px;
    max-width: 520px;
    animation: fadeInDown 0.6s 0.2s ease both;
  }

  // CTAs
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    animation: fadeInDown 0.6s 0.3s ease both;
  }

  // Preuve sociale
  &__proof {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    margin-top: 32px;
    animation: fadeInDown 0.6s 0.4s ease both;
  }

  &__proof-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 600;
  }

  &__proof-icon {
    font-size: 1rem;
  }

  // ── Colonne visuelle ──
  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    animation: fadeInUp 0.8s 0.2s ease both;
  }

  &__mockup-wrapper {
    position: relative;
    width: 280px;
    max-width: 100%;

    @include m.respond-to(md) {
      width: 340px;
    }
  }

  // ── Badges flottants ──
  &__badge {
    position: absolute;
    background: white;
    border-radius: var(--radius-md);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: var(--shadow-lg);
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--color-text);
    white-space: nowrap;
    z-index: 10;

    &--1 {
      top: 20px;
      left: -30px;
      animation: float 3.5s 0.5s ease-in-out infinite;

      @include m.respond-to(md) {
        left: -30px;
      }
    }

    &--2 {
      bottom: 60px;
      left: -40px;
      animation: float 4.5s 1s ease-in-out infinite;

      // Masqué sur petits mobiles pour éviter le débordement
      display: none;

      @include m.respond-to(sm) {
        display: flex;
      }
    }

    &--3 {
      top: 50%;
      right: -24px;
      transform: translateY(-50%);
      animation: float 3.8s 0.2s ease-in-out infinite;

      @include m.respond-to(md) {
        right: -24px;
      }
    }
  }

  // ── Mockup téléphone ──
  &__phone {
    background: rgba(255, 255, 255, 0.06);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 32px;
    padding: 12px;
    backdrop-filter: blur(12px);
    box-shadow:
      0 32px 80px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  &__screen {
    background: linear-gradient(160deg, #1a1a2e, #16213e);
    border-radius: 22px;
    overflow: hidden;
    aspect-ratio: 9 / 16;
    max-height: 480px;
    display: flex;
    flex-direction: column;

    &-header {
      background: linear-gradient(135deg, #667eea, #764ba2);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-avatar {
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    &-score {
      text-align: right;
      color: white;

      &-label {
        font-size: 0.72rem;
        font-weight: 700;
      }

      &-value {
        display: block;
        font-size: 1.1rem;
        font-weight: 800;
        color: #FFD700;
      }
    }

    &-body {
      padding: 16px;
      flex: 1;
    }

    &-counter {
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }

    &-question {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 14px;
      color: white;
      font-size: 0.78rem;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 14px;
    }

    &-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-option {
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.06);
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      gap: 8px;

      &--correct {
        background: rgba(16, 185, 129, 0.2);
        border-color: #10B981;
        color: #6ee7b7;

        .hero__screen-letter {
          background: #10B981;
          color: white;
        }
      }

      &--wrong {
        background: rgba(239, 68, 68, 0.2);
        border-color: #EF4444;
        color: #fca5a5;

        .hero__screen-letter {
          background: #EF4444;
          color: white;
        }
      }
    }

    &-letter {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    &-progress {
      margin-top: 14px;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
    }

    &-progress-fill {
      height: 100%;
      width: 60%;
      background: var(--gradient-accent);
      border-radius: 2px;
    }
  }
}

// ── Animations ───────────────────────────────────────────────
@keyframes twinkle {
  0%, 100% { opacity: var(--o, 0.4); transform: scale(1); }
  50%       { opacity: calc(var(--o, 0.4) * 0.3); transform: scale(0.7); }
}

@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6); }
  50%       { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50%       { transform: translateY(-10px) rotate(2deg); }
}

// Badge --3 a son propre transform de base (translateY -50%)
.hero__badge--3 {
  &:not(:hover) {
    animation-name: floatMiddle;
  }
}

@keyframes floatMiddle {
  0%, 100% { transform: translateY(calc(-50% + 0px)) rotate(-2deg); }
  50%       { transform: translateY(calc(-50% - 10px)) rotate(2deg); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
