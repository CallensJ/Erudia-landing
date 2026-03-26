<!-- ConvictionsSection.vue — Convictions pédagogiques et techniques d'Erudia
     Visible dans FeaturesView (toujours visible, avant ComparisonSection).
     - Fond surface (clair)
     - 6 items en liste : numéro, badge coloré, titre accent, description, callout insight
     - Animation reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

interface ConvictionItem {
  number:        string
  badge:         string
  color:         string
  title1:        string
  title2:        string
  desc:          string
  insightIcon:   string
  insightStrong: string
  insightText:   string
}

const { t, td } = useLocale()
const items = computed(() => td<ConvictionItem[]>('features.convictions.items'))

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer?.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  document.querySelectorAll('.conv-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="conv section section--surface" aria-labelledby="conv-title">

    <!-- Orbe décoratif -->
    <div class="conv__orb" aria-hidden="true"></div>

    <div class="container">

      <!-- Header -->
      <div class="section-header conv-reveal">
        <div class="pill pill--primary label">{{ t('features.convictions.pill') }}</div>
        <h2 id="conv-title" class="section-header__title">
          {{ t('features.convictions.title') }}
        </h2>
        <p class="section-header__sub">{{ t('features.convictions.subline') }}</p>
      </div>

      <!-- Liste des convictions -->
      <div class="conv__list">
        <div
          v-for="(item, i) in items"
          :key="item.number"
          class="conv__item conv-reveal"
          :class="`conv__item--delay-${i % 3}`"
        >
          <!-- Gauche : numéro + badge -->
          <div class="conv__left">
            <div class="conv__number" aria-hidden="true">{{ item.number }}</div>
            <div class="conv__badge" :style="`--badge-color: ${item.color}`">
              <span class="conv__badge-dot"></span>
              <span>{{ item.badge }}</span>
            </div>
          </div>

          <!-- Droite : contenu -->
          <div class="conv__right">
            <div class="conv__why">{{ t('features.convictions.why') }}</div>

            <h3 class="conv__title">
              {{ item.title1 }}
              <span class="conv__accent">{{ item.title2 }}</span>
            </h3>

            <p class="conv__desc">{{ item.desc }}</p>

            <div class="conv__insight" :style="`--insight-color: ${item.color}`">
              <span class="conv__insight-icon" aria-hidden="true">{{ item.insightIcon }}</span>
              <p class="conv__insight-text">
                <strong>{{ item.insightStrong }}</strong> — {{ item.insightText }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.conv {
  position: relative;
  overflow: hidden;

  // Orbe décoratif haut-droite
  &__orb {
    position:      absolute;
    top:           -120px;
    right:         -120px;
    width:         500px;
    height:        500px;
    border-radius: 50%;
    background:    radial-gradient(circle, rgba(102, 126, 234, 0.07), transparent 70%);
    pointer-events: none;
  }

  // ── Liste ──────────────────────────────────────────────────
  &__list {
    display:        flex;
    flex-direction: column;
  }

  &__item {
    display:       grid;
    gap:           24px;
    align-items:   start;
    padding:       48px 0;
    border-bottom: 1px solid var(--color-surface-dark);

    &:last-child { border-bottom: none; }

    @include m.respond-to(md) {
      grid-template-columns: 240px 1fr;
      gap:                   64px;
    }
  }

  // ── Gauche ─────────────────────────────────────────────────
  &__left {
    display:        flex;
    flex-direction: column;
    gap:            14px;
  }

  &__number {
    font-family:    var(--font-display);
    font-size:      4.5rem;
    font-weight:    800;
    line-height:    1;
    letter-spacing: -0.04em;
    background:     var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity:        0.18;
    user-select:    none;
    margin-bottom:  -8px;
  }

  &__badge {
    display:       inline-flex;
    align-items:   center;
    gap:           7px;
    padding:       7px 14px;
    border-radius: var(--radius-full);
    font-size:     0.75rem;
    font-weight:   700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background:    white;
    border:        1.5px solid var(--color-surface-dark);
    color:         var(--color-text-secondary);
    width:         fit-content;
    box-shadow:    var(--shadow-sm);
  }

  &__badge-dot {
    width:         8px;
    height:        8px;
    border-radius: 50%;
    background:    var(--badge-color, var(--color-primary));
    flex-shrink:   0;
  }

  // ── Droite ─────────────────────────────────────────────────
  &__right { padding-top: 4px; }

  &__why {
    display:        inline-flex;
    align-items:    center;
    gap:            6px;
    font-size:      0.7rem;
    font-weight:    700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color:          var(--color-primary);
    margin-bottom:  10px;

    &::before {
      content:       '';
      display:       inline-block;
      width:         20px;
      height:        2px;
      background:    var(--color-primary);
      border-radius: 1px;
    }
  }

  &__title {
    font-family:    var(--font-display);
    font-size:      clamp(1.3rem, 2.5vw, 1.75rem);
    font-weight:    800;
    line-height:    1.2;
    letter-spacing: -0.02em;
    color:          var(--color-text);
    margin-bottom:  14px;
  }

  &__accent {
    background:              var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip:         text;
  }

  &__desc {
    font-size:  0.97rem;
    color:      var(--color-text-secondary);
    line-height: 1.8;
    max-width:  620px;
  }

  &__insight {
    display:       flex;
    align-items:   flex-start;
    gap:           12px;
    margin-top:    20px;
    padding:       16px 20px;
    background:    white;
    border-radius: var(--radius-md);
    border-left:   3px solid var(--insight-color, var(--color-primary));
    box-shadow:    var(--shadow-sm);
  }

  &__insight-icon {
    font-size:  1.1rem;
    flex-shrink: 0;
    margin-top: 1px;
  }

  &__insight-text {
    font-size:  0.85rem;
    color:      var(--color-text-secondary);
    line-height: 1.65;

    strong {
      color:       var(--color-text);
      font-weight: 700;
    }
  }
}

// ── Animations reveal ──────────────────────────────────────
.conv-reveal {
  opacity:    0;
  transform:  translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;

  &.is-visible { opacity: 1; transform: translateY(0); }
}

.conv__item--delay-1 { transition-delay: 0.1s; }
.conv__item--delay-2 { transition-delay: 0.2s; }
</style>
