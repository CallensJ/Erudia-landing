<!-- FaqHero.vue — Hero de la page FAQ
     - Fond sombre (gradient-hero)
     - Pill, titre avec accent doré sur "réponses", sous-titre
     - Barre de recherche glassmorphisme — émet l'input vers le parent
     - Compteur de résultats dynamique
     - Wave SVG de transition vers le blanc -->
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  resultCount: number | null
}>()

const emit = defineEmits<{
  (e: 'search-change', query: string): void
}>()

const query = ref('')
let debounceTimer: ReturnType<typeof setTimeout>

function onInput(e: Event) {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search-change', (e.target as HTMLInputElement).value.trim())
  }, 200)
}

function clearSearch() {
  query.value = ''
  emit('search-change', '')
}
</script>

<template>
  <section class="faq-hero" aria-labelledby="faq-hero-title">

    <div class="faq-hero__orb faq-hero__orb--1" aria-hidden="true"></div>
    <div class="faq-hero__orb faq-hero__orb--2" aria-hidden="true"></div>

    <div class="container">
      <div class="faq-hero__inner">

        <div class="pill pill--white label">FAQ</div>

        <h1 id="faq-hero-title" class="faq-hero__title">
          Vous avez des questions,<br>
          <span class="faq-hero__title-accent">on a les réponses.</span>
        </h1>

        <p class="faq-hero__sub">
          Sécurité, contenu, hors ligne, facturation — tout ce que vous voulez savoir sur Erudia.
        </p>

        <!-- Barre de recherche -->
        <div class="faq-search" role="search">
          <div class="faq-search__wrap">
            <span class="faq-search__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>

            <input
              v-model="query"
              type="search"
              class="faq-search__input"
              placeholder="Rechercher une question…"
              aria-label="Rechercher dans la FAQ"
              autocomplete="off"
              @input="onInput"
            />

            <!-- Compteur de résultats -->
            <Transition name="count-fade">
              <span
                v-if="query && resultCount !== null"
                class="faq-search__count"
                aria-live="polite"
                aria-atomic="true"
              >
                {{ resultCount }} résultat{{ resultCount !== 1 ? 's' : '' }}
              </span>
            </Transition>

            <!-- Effacer -->
            <button
              v-if="query"
              type="button"
              class="faq-search__clear"
              aria-label="Effacer la recherche"
              @click="clearSearch"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Wave de transition -->
    <div class="faq-hero__wave" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
      </svg>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.faq-hero {
  background: var(--gradient-hero);
  padding: 120px 0 0;
  position: relative;
  overflow: hidden;
  text-align: center;

  &__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--1 {
      top: -100px;
      right: -60px;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.18), transparent 70%);
      filter: blur(80px);
    }

    &--2 {
      bottom: 60px;
      left: -60px;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.07), transparent 70%);
      filter: blur(80px);
    }
  }

  &__inner {
    max-width: 720px;
    margin: 0 auto;
    padding-bottom: 64px;
    position: relative;
    z-index: 2;

    .pill { margin-bottom: 20px; }
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 5vw, 3.2rem);
    font-weight: 800;
    color: white;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 18px;

    &-accent {
      background: var(--gradient-accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__sub {
    font-size: clamp(0.92rem, 2vw, 1.05rem);
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.75;
    margin-bottom: 36px;
    font-weight: 500;
  }

  &__wave {
    position: relative;
    z-index: 2;
    line-height: 0;
    margin-bottom: -2px;

    svg {
      width: 100%;
      height: 80px;

      @include m.respond-to(md) { height: 100px; }
    }
  }
}

// ── Barre de recherche ────────────────────────────────────────
.faq-search {
  &__wrap {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    border-radius: var(--radius-full);
    backdrop-filter: blur(12px);
    padding: 0 16px 0 46px;
    transition: border-color var(--transition), background var(--transition);

    &:focus-within {
      border-color: rgba(255, 255, 255, 0.45);
      background: rgba(255, 255, 255, 0.14);
    }
  }

  &__icon {
    position: absolute;
    left: 16px;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    pointer-events: none;
  }

  &__input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 15px 0;
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: white;
    font-weight: 500;

    &::placeholder { color: rgba(255, 255, 255, 0.4); }

    // Masquer le bouton natif "clear" du navigateur
    &::-webkit-search-cancel-button { display: none; }
  }

  &__count {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.55);
    white-space: nowrap;
    padding: 0 8px;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: background var(--transition), color var(--transition);
    flex-shrink: 0;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      color: white;
    }
  }
}

// ── Transitions ───────────────────────────────────────────────
.count-fade-enter-active,
.count-fade-leave-active { transition: opacity 0.2s ease; }
.count-fade-enter-from,
.count-fade-leave-to     { opacity: 0; }
</style>
