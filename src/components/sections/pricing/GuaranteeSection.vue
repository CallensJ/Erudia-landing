<!-- GuaranteeSection.vue — Les 3 garanties Erudia
     - Fond sombre (--gradient-hero) : rupture visuelle avant le CTA
     - 3 items centrés en grille : 1 col → 3 cols desktop
     - Icône dans un cercle glassmorphisme, titre, description
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()

// ── Données des garanties (réactives à la locale) ──────────────
const guarantees = computed(() => [
  { icon: '🔒', title: t('pricing.guarantee.g1Title'), desc: t('pricing.guarantee.g1Desc') },
  { icon: '↩️', title: t('pricing.guarantee.g2Title'), desc: t('pricing.guarantee.g2Desc') },
  { icon: '🚫', title: t('pricing.guarantee.g3Title'), desc: t('pricing.guarantee.g3Desc') },
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
    { threshold: 0.15 }
  )

  document.querySelectorAll('.guarantee-item').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="guarantee" aria-label="Nos garanties">

    <!-- Orbe décoratif -->
    <div class="guarantee__orb" aria-hidden="true"></div>

    <div class="container">
      <div class="guarantee__grid">

        <div
          v-for="(item, index) in guarantees"
          :key="item.title"
          class="guarantee-item"
          :data-delay="index"
        >
          <!-- Icône dans cercle glassmorphisme -->
          <div class="guarantee-item__icon-wrap" aria-hidden="true">
            <span class="guarantee-item__icon">{{ item.icon }}</span>
          </div>

          <h3 class="guarantee-item__title">{{ item.title }}</h3>
          <p class="guarantee-item__desc">{{ item.desc }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.guarantee {
  background: var(--gradient-hero);
  padding: 72px 0;
  position: relative;
  overflow: hidden;

  // Orbe décoratif
  &__orb {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.25), transparent 70%);
    pointer-events: none;
  }

  // ── Grille ──
  &__grid {
    display: grid;
    gap: 32px;
    position: relative;
    z-index: 2;

    @include m.respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

// ── Item garantie ─────────────────────────────────────────────
.guarantee-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;

  // Reveal
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &[data-delay='0'] { transition-delay: 0s; }
  &[data-delay='1'] { transition-delay: 0.12s; }
  &[data-delay='2'] { transition-delay: 0.24s; }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  // Cercle icône glassmorphisme
  &__icon-wrap {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    flex-shrink: 0;
    transition: transform 0.3s ease, background 0.3s ease;

    .guarantee-item:hover & {
      transform: scale(1.1);
      background: rgba(255, 255, 255, 0.16);
    }
  }

  &__icon {
    font-size: 1.9rem;
    line-height: 1;
  }

  &__title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1rem;
    color: white;
    line-height: 1.3;
  }

  &__desc {
    font-size: 0.84rem;
    color: rgba(255, 255, 255, 0.62);
    line-height: 1.7;
    max-width: 240px;
  }
}
</style>
