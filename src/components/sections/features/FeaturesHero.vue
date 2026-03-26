<!-- FeaturesHero.vue — Hero de la page Fonctionnalités
     - Fond sombre gradient hero + orbes
     - Pill, titre avec accent doré, sous-titre
     - 3 onglets (Pour l'enfant / Pour le parent / Le contenu)
       → émet 'tab-change' vers FeaturesView
     - Wave SVG de transition vers fond blanc -->
<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'

type Tab = 'child' | 'parent' | 'content'

const { t } = useLocale()

const activeTab = ref<Tab>('child')

const emit = defineEmits<{
  'tab-change': [value: Tab]
}>()

function setTab(tab: Tab) {
  activeTab.value = tab
  emit('tab-change', tab)
}
</script>

<template>
  <section class="feat-hero" aria-label="Fonctionnalités Erudia — introduction">

    <!-- Orbes flous -->
    <div class="feat-hero__orb feat-hero__orb--1" aria-hidden="true"></div>
    <div class="feat-hero__orb feat-hero__orb--2" aria-hidden="true"></div>

    <div class="container">
      <div class="feat-hero__content">

        <!-- Pill -->
        <div class="pill pill--white label feat-hero__pill">
          {{ t('features.hero.pill') }}
        </div>

        <!-- Titre -->
        <h1 class="feat-hero__title">
          {{ t('features.hero.title1') }}<br/>
          <span class="feat-hero__accent">{{ t('features.hero.title2') }}</span>
        </h1>

        <!-- Sous-titre -->
        <p class="feat-hero__subline">
          {{ t('features.hero.subline') }}
        </p>

        <!-- Onglets -->
        <div class="feat-hero__tabs" role="tablist" aria-label="Choisir une vue">
          <button
            class="feat-hero__tab"
            :class="{ 'feat-hero__tab--active': activeTab === 'child' }"
            role="tab"
            :aria-selected="activeTab === 'child'"
            @click="setTab('child')"
          >
            {{ t('features.hero.tabChild') }}
          </button>
          <button
            class="feat-hero__tab"
            :class="{ 'feat-hero__tab--active': activeTab === 'parent' }"
            role="tab"
            :aria-selected="activeTab === 'parent'"
            @click="setTab('parent')"
          >
            {{ t('features.hero.tabParent') }}
          </button>
          <button
            class="feat-hero__tab"
            :class="{ 'feat-hero__tab--active': activeTab === 'content' }"
            role="tab"
            :aria-selected="activeTab === 'content'"
            @click="setTab('content')"
          >
            {{ t('features.hero.tabContent') }}
          </button>
        </div>

      </div>
    </div>

    <!-- Wave de transition vers fond blanc -->
    <svg
      class="feat-hero__wave"
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

.feat-hero {
  background:    var(--gradient-hero);
  padding-top:   calc(var(--header-h) + 72px);
  padding-bottom: 0;
  position:      relative;
  overflow:      hidden;

  // ── Orbes ──────────────────────────────────────────────────
  &__orb {
    position:      absolute;
    border-radius: 50%;
    filter:        blur(80px);
    pointer-events: none;
  }

  &__orb--1 {
    width:      500px;
    height:     500px;
    background: var(--color-primary);
    opacity:    0.2;
    top:       -150px;
    right:     -100px;
  }

  &__orb--2 {
    width:      350px;
    height:     350px;
    background: #FFD700;
    opacity:    0.08;
    bottom:     0;
    left:       5%;
  }

  // ── Contenu ────────────────────────────────────────────────
  &__content {
    position:   relative;
    z-index:    2;
    text-align: center;
    color:      white;
    padding-bottom: 64px;
  }

  &__pill {
    margin-bottom: 20px;
    display:       inline-flex;
  }

  &__title {
    font-family:    var(--font-display);
    font-size:      clamp(2rem, 5vw, 3.5rem);
    font-weight:    800;
    line-height:    1.15;
    letter-spacing: -0.02em;
    color:          white;
    margin-bottom:  20px;
    animation:      fadeInDown 0.6s ease both;
  }

  &__accent {
    background:              var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip:         text;
  }

  &__subline {
    font-size:     clamp(0.95rem, 1.8vw, 1.1rem);
    color:         rgba(255, 255, 255, 0.68);
    line-height:   1.75;
    max-width:     560px;
    margin:        0 auto 40px;
    animation:     fadeInDown 0.6s 0.1s ease both;
  }

  // ── Onglets ────────────────────────────────────────────────
  &__tabs {
    display:         inline-flex;
    background:      rgba(255, 255, 255, 0.08);
    border:          1px solid rgba(255, 255, 255, 0.18);
    border-radius:   var(--radius-full);
    padding:         5px;
    gap:             4px;
    backdrop-filter: blur(12px);
    animation:       fadeInDown 0.6s 0.2s ease both;
    flex-wrap:       wrap;
    justify-content: center;
  }

  &__tab {
    padding:       10px 20px;
    border-radius: var(--radius-full);
    font-family:   var(--font-body);
    font-weight:   700;
    font-size:     0.875rem;
    color:         rgba(255, 255, 255, 0.6);
    transition:    all var(--transition);
    cursor:        pointer;

    &--active {
      background:  white;
      color:       var(--color-primary-dark);
      box-shadow:  var(--shadow-md);
    }

    &:hover:not(&--active) {
      color:       white;
      background:  rgba(255, 255, 255, 0.1);
    }
  }

  // ── Wave ───────────────────────────────────────────────────
  &__wave {
    display:    block;
    width:      100%;
    margin-top: 48px;
    height:     48px;
  }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
