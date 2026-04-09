<!-- CookieConsent.vue — Bannière cookie RGPD/CNIL conforme
     Bloque GA4 tant que l'utilisateur n'a pas fait son choix.
     - Stockage : cookie first-party "erudia_consent" (13 mois), format JSON
     - GA4 Consent Mode v2 : gtag('consent','update') sur acceptation/refus
     - Ré-ouvrable depuis le footer via useCookieConsent().openBanner()
     - FR/EN via useLocale(). Pas de bouton "Fermer" sans choix (exigence CNIL). -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { locale, localePath } = useLocale()
const { isVisible, saveChoice, hasConsented, openBanner } = useCookieConsent()

onMounted(() => {
  if (!hasConsented()) openBanner()
})

const copy = {
  fr: {
    text:   'Nous utilisons Google Analytics pour mesurer l\'audience de ce site. Aucun cookie n\'est déposé sans votre accord.',
    link:   'En savoir plus',
    accept: 'Accepter',
    reject: 'Refuser',
  },
  en: {
    text:   'We use Google Analytics to measure traffic on this site. No cookies are set without your consent.',
    link:   'Learn more',
    accept: 'Accept',
    reject: 'Decline',
  },
}
</script>

<template>
  <Teleport to="body">
    <Transition name="cookie-banner">
      <div
        v-if="isVisible"
        class="cookie"
        role="region"
        aria-label="Consentement cookies"
        aria-live="polite"
      >
        <p class="cookie__text">
          {{ copy[locale].text }}
          <RouterLink
            :to="localePath('/legal/mentions')"
            class="cookie__link"
          >{{ copy[locale].link }}</RouterLink>.
        </p>

        <div class="cookie__actions">
          <!-- Refuser en premier = même visibilité que Accepter (exigence CNIL) -->
          <button
            class="cookie__btn cookie__btn--reject"
            @click="saveChoice(false)"
          >
            {{ copy[locale].reject }}
          </button>
          <button
            class="cookie__btn cookie__btn--accept"
            @click="saveChoice(true)"
          >
            {{ copy[locale].accept }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/variables' as v;
@use '@/styles/abstracts/mixins' as m;

.cookie {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;

  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;

  background: rgba(18, 18, 42, 0.97);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.45);

  max-width: min(calc(100vw - 2rem), 720px);
  width: 100%;

  @media (min-width: v.$bp-md) {
    flex-wrap: nowrap;
    padding: 1rem 1.5rem;
  }

  // ── Texte ──────────────────────────────────────────────────────
  &__text {
    flex: 1;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.5;
    margin: 0;
  }

  &__link {
    color: v.$primary-light;
    text-decoration: underline;
    text-underline-offset: 2px;
    white-space: nowrap;

    &:hover {
      color: white;
    }
  }

  // ── Boutons — même taille, même visibilité (CNIL) ───────────────
  &__actions {
    display: flex;
    gap: 0.625rem;
    flex-shrink: 0;
  }

  &__btn {
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.1rem;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s;
    white-space: nowrap;
    min-width: 80px;  // même largeur minimale pour l'équivalence visuelle

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &--reject {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.15);

      &:hover {
        background: rgba(255, 255, 255, 0.16);
        color: white;
      }
    }

    &--accept {
      background: linear-gradient(135deg, v.$primary 0%, v.$primary-dark 100%);
      color: white;

      &:hover {
        opacity: 0.88;
      }
    }
  }
}

// ── Transition slide-up ────────────────────────────────────────────────────────
.cookie-banner-enter-active {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cookie-banner-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cookie-banner-enter-from,
.cookie-banner-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(1.25rem);
}
</style>
