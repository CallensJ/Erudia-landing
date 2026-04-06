<!-- LegalPage.vue — Composant générique pour les pages légales
     Reçoit la clé locale (ex: 'mentions', 'privacy', 'terms')
     et affiche hero + sections structurées depuis les locales.
     Utilisé par MentionsView, PrivacyView, TermsView. -->
<script setup lang="ts">
import { computed }    from 'vue'
import { useRouter }   from 'vue-router'
import { useLocale }   from '@/composables/useLocale'

// ── Types ──────────────────────────────────────────────────────
interface LegalSection {
  heading:    string
  paragraphs: string[]
}

interface LegalPage {
  title:    string
  subtitle: string
  sections: LegalSection[]
}

// ── Props ──────────────────────────────────────────────────────
const props = defineProps<{
  pageKey: 'mentions' | 'privacy' | 'terms'
}>()

// ── Locale ─────────────────────────────────────────────────────
const { t, td, localePath } = useLocale()

const page     = computed(() => td<LegalPage>(`legal.${props.pageKey}`))
const sections = computed(() => td<LegalSection[]>(`legal.${props.pageKey}.sections`))

// ── Navigation ─────────────────────────────────────────────────
const router = useRouter()
function goHome() { router.push(localePath('/')) }
</script>

<template>
  <main class="legal-page">
    <div class="header-spacer"></div>

    <!-- Hero -->
    <section class="legal-page__hero" aria-label="En-tête page légale">
      <div class="legal-page__orb legal-page__orb--1" aria-hidden="true"></div>
      <div class="legal-page__orb legal-page__orb--2" aria-hidden="true"></div>
      <div class="container">
        <button class="legal-page__back" @click="goHome">
          {{ t('legal.backLink') }}
        </button>
        <h1 class="legal-page__title">{{ page.title }}</h1>
        <p class="legal-page__subtitle">{{ page.subtitle }}</p>
        <p class="legal-page__updated">{{ t('legal.lastUpdated') }}</p>
      </div>
    </section>

    <!-- Contenu -->
    <section class="legal-page__content section" aria-label="Contenu légal">
      <div class="container">
        <div class="legal-page__body">
          <article
            v-for="section in sections"
            :key="section.heading"
            class="legal-page__section"
          >
            <h2 class="legal-page__section-heading">{{ section.heading }}</h2>
            <p
              v-for="(para, i) in section.paragraphs"
              :key="i"
              class="legal-page__para"
            >
              {{ para }}
            </p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/variables' as v;
@use '@/styles/abstracts/mixins'   as m;

// ── Hero ───────────────────────────────────────────────────────
.legal-page {
  &__hero {
    position:   relative;
    background: var(--gradient-hero);
    color:      white;
    padding:    64px 0 80px;
    overflow:   hidden;

    @include m.respond-to(md) { padding: 96px 0 112px; }
  }

  // Orbes décoratifs (cohérence avec les autres heroes)
  &__orb {
    position:      absolute;
    border-radius: 50%;
    filter:        blur(80px);
    opacity:       0.15;
    pointer-events: none;

    &--1 {
      width:  400px;
      height: 400px;
      top:    -100px;
      right:  -80px;
      background: var(--color-primary);
    }

    &--2 {
      width:  300px;
      height: 300px;
      bottom: -60px;
      left:   -60px;
      background: var(--color-primary-dark);
    }
  }

  // ── Back link ───────────────────────────────────────────────
  &__back {
    display:         inline-flex;
    align-items:     center;
    gap:             6px;
    background:      rgba(255,255,255,.12);
    border:          1px solid rgba(255,255,255,.2);
    border-radius:   8px;
    color:           rgba(255,255,255,.85);
    font-family:     var(--font-body);
    font-size:       0.875rem;
    padding:         8px 16px;
    cursor:          pointer;
    transition:      background 0.2s, color 0.2s;
    margin-bottom:   32px;

    &:hover {
      background: rgba(255,255,255,.2);
      color:      white;
    }
  }

  // ── Titre ───────────────────────────────────────────────────
  &__title {
    font-family:  var(--font-display);
    font-size:    clamp(2rem, 5vw, 3rem);
    font-weight:  800;
    line-height:  1.15;
    margin-bottom: 16px;
  }

  &__subtitle {
    font-size:    clamp(1rem, 2vw, 1.125rem);
    color:        rgba(255,255,255,.75);
    max-width:    640px;
    line-height:  1.6;
    margin-bottom: 20px;
  }

  &__updated {
    font-size:  0.8rem;
    color:      rgba(255,255,255,.45);
    font-style: italic;
  }

  // ── Contenu ─────────────────────────────────────────────────
  &__content {
    background: white;
  }

  &__body {
    max-width:    740px;
    margin:       0 auto;
    display:      flex;
    flex-direction: column;
    gap:          48px;
  }

  &__section {
    border-left:  3px solid var(--color-primary);
    padding-left: 24px;
  }

  &__section-heading {
    font-family:  var(--font-display);
    font-size:    clamp(1.1rem, 2.5vw, 1.25rem);
    font-weight:  700;
    color:        var(--color-text);
    margin-bottom: 16px;
  }

  &__para {
    font-size:    0.9375rem;
    color:        var(--color-text-secondary);
    line-height:  1.75;
    margin-bottom: 12px;

    &:last-child { margin-bottom: 0; }
  }
}
</style>
