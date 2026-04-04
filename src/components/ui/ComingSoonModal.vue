<!-- ComingSoonModal.vue — Modal "Erudia arrive bientôt"
     Affichée quand l'utilisateur clique sur "Jouer" ou "S'abonner"
     avant le lancement officiel du 15 avril 2026.
     Backdrop sombre avec fermeture au clic ou Echap. -->
<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useComingSoon } from '@/composables/useComingSoon'
import { useLocale } from '@/composables/useLocale'

const { isOpen, closeModal } = useComingSoon()
const { locale } = useLocale()

// Compte à rebours jusqu'au 15 avril 2026
const launchDate = new Date('2026-04-15T00:00:00')

const daysLeft = computed(() => {
  const now = new Date()
  const diff = launchDate.getTime() - now.getTime()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

const launchDateFormatted = computed(() => {
  return launchDate.toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="csm-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="csm-title"
        @click.self="closeModal"
      >
        <div class="csm">

          <!-- Orbes décoratifs -->
          <div class="csm__orb csm__orb--1" aria-hidden="true"></div>
          <div class="csm__orb csm__orb--2" aria-hidden="true"></div>

          <!-- Bouton fermer -->
          <button class="csm__close" @click="closeModal" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Emoji mascotte provisoire -->
          <div class="csm__emoji" aria-hidden="true">🚀</div>

          <h2 id="csm-title" class="csm__title">
            {{ locale === 'fr' ? 'Erudia arrive bientôt !' : 'Erudia is coming soon!' }}
          </h2>

          <p class="csm__date">
            {{ locale === 'fr' ? 'Lancement le' : 'Launch on' }}
            <strong>{{ launchDateFormatted }}</strong>
          </p>

          <div class="csm__countdown" aria-label="Compte à rebours">
            <div class="csm__countdown-block">
              <span class="csm__countdown-number">{{ daysLeft }}</span>
              <span class="csm__countdown-label">{{ locale === 'fr' ? 'jours' : 'days' }}</span>
            </div>
          </div>

          <p class="csm__message">
            {{
              locale === 'fr'
                ? "L'application sera disponible très prochainement. En attendant, découvrez comment Erudia transforme l'apprentissage en aventure !"
                : "The app will be available very soon. In the meantime, discover how Erudia turns learning into an adventure!"
            }}
          </p>

          <button class="btn btn--primary csm__btn" @click="closeModal">
            {{ locale === 'fr' ? 'En savoir plus' : 'Learn more' }}
          </button>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/variables' as v;
@use '@/styles/abstracts/mixins' as m;

// ── Backdrop ─────────────────────────────────────────────────────────────────
.csm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 10, 30, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
.csm {
  position: relative;
  background: linear-gradient(135deg, #1a1a3e 0%, #2d1b69 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.5rem;
  padding: 3rem 2.5rem 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4);

  // ── Orbes décoratifs ──────────────────────────────────────────
  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;

    &--1 {
      width: 200px;
      height: 200px;
      background: rgba(102, 126, 234, 0.3);
      top: -60px;
      right: -60px;
    }

    &--2 {
      width: 150px;
      height: 150px;
      background: rgba(118, 75, 162, 0.25);
      bottom: -40px;
      left: -40px;
    }
  }

  // ── Bouton fermer ─────────────────────────────────────────────
  &__close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: 50%;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }
  }

  // ── Contenu ───────────────────────────────────────────────────
  &__emoji {
    font-size: 3.5rem;
    line-height: 1;
    margin-bottom: 1.25rem;
    display: block;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 800;
    color: white;
    margin: 0 0 0.75rem;
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__date {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
    margin: 0 0 1.75rem;

    strong {
      color: #FFD700;
      font-weight: 700;
    }
  }

  // ── Compte à rebours ──────────────────────────────────────────
  &__countdown {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1.75rem;
  }

  &__countdown-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1rem 2rem;
    min-width: 100px;
  }

  &__countdown-number {
    font-size: 3rem;
    font-weight: 900;
    color: white;
    line-height: 1;
    background: linear-gradient(135deg, v.$primary 0%, v.$primary-dark 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__countdown-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.25rem;
  }

  // ── Message ───────────────────────────────────────────────────
  &__message {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0 0 2rem;
  }

  // ── Bouton ────────────────────────────────────────────────────
  &__btn {
    width: 100%;
  }
}

// ── Transition ────────────────────────────────────────────────────────────────
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;

  .csm {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .csm {
    transform: scale(0.92) translateY(16px);
    opacity: 0;
  }
}
</style>
