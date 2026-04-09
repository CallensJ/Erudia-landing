<!-- AppFooter.vue — Pied de page global
     4 colonnes desktop : marque | navigation | légal | newsletter
     Fond sombre cohérent avec le gradient hero.
     Global à toutes les pages via App.vue. -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { t, localePath, locale } = useLocale()
const { openBanner } = useCookieConsent()

const email = ref('')
const submitted = ref(false)

function handleNewsletter() {
  // TODO MVP 2 : brancher sur un service email (Mailchimp, Resend, etc.)
  if (email.value) {
    submitted.value = true
    email.value = ''
  }
}

const navLinks = computed(() => [
  { label: t('nav.features'),   to: localePath('/features') },
  { label: t('nav.howItWorks'), to: localePath('/how-it-works') },
  { label: t('nav.pricing'),    to: localePath('/pricing') },
  { label: t('nav.faq'),        to: localePath('/faq') },
  { label: t('nav.contact'),    to: localePath('/contact') },
])

const legalLinks = computed(() => [
  { label: t('footer.links.mentions'), to: localePath('/legal/mentions') },
  { label: t('footer.links.privacy'),  to: localePath('/legal/privacy') },
  { label: t('footer.links.terms'),    to: localePath('/legal/terms') },
])

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer" aria-label="Pied de page">
    <div class="container">

      <!-- Grille principale -->
      <div class="footer__grid">

        <!-- Colonne marque -->
        <div class="footer__brand">
          <RouterLink :to="localePath('/')" class="footer__logo">
            <div class="footer__logo-icon">🦉</div>
            <span>Erudia</span>
          </RouterLink>
          <p class="footer__tagline">{{ t('footer.tagline') }}</p>
          <!-- Réseaux sociaux -->
          <div class="footer__socials">
            <a
              href="https://facebook.com/erudia"
              class="footer__social"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Colonne navigation -->
        <nav class="footer__nav" aria-label="Navigation footer">
          <div class="footer__col-title">{{ t('footer.navTitle') }}</div>
          <ul class="footer__links">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink :to="link.to" class="footer__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Colonne légal -->
        <nav class="footer__legal-nav" aria-label="Liens légaux">
          <div class="footer__col-title">{{ t('footer.legalTitle') }}</div>
          <ul class="footer__links">
            <li v-for="link in legalLinks" :key="link.to">
              <RouterLink :to="link.to" class="footer__link">{{ link.label }}</RouterLink>
            </li>
            <li>
              <!-- Rouvre la bannière cookie sans rechargement de page -->
              <button class="footer__link footer__link--btn" @click="openBanner">
                {{ locale === 'fr' ? 'Gestion des cookies' : 'Cookie settings' }}
              </button>
            </li>
          </ul>
        </nav>

        <!-- Colonne newsletter -->
        <div class="footer__newsletter">
          <div class="footer__col-title">{{ t('footer.newsletter.title') }}</div>
          <p class="footer__newsletter-desc">{{ t('footer.newsletter.description') }}</p>

          <div v-if="!submitted" class="footer__newsletter-form">
            <input
              v-model="email"
              type="email"
              :placeholder="t('footer.newsletter.placeholder')"
              class="footer__newsletter-input"
              :aria-label="t('footer.newsletter.ariaInput')"
              @keyup.enter="handleNewsletter"
            />
            <button
              class="footer__newsletter-btn"
              @click="handleNewsletter"
              :aria-label="t('footer.newsletter.subscribe')"
            >
              →
            </button>
          </div>

          <p v-else class="footer__newsletter-success">{{ t('footer.newsletter.success') }}</p>
        </div>

      </div>

      <!-- Bas de footer -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          {{ t('footer.copyright').replace('{year}', String(currentYear)) }}
        </p>
        <div class="footer__badges">
          <span class="footer__badge">{{ t('footer.badgeCoppa') }}</span>
          <span class="footer__badge">{{ t('footer.badgeOffline') }}</span>
          <span class="footer__badge">{{ t('footer.badgeLangs') }}</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.footer {
  background: #0f0c29;
  color: rgba(255, 255, 255, 0.7);
  padding: 64px 0 32px;

  // ── Grille 4 colonnes ────────────────────────────────────
  &__grid {
    display: grid;
    gap: 40px;
    margin-bottom: 56px;

    @include m.respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include m.respond-to(lg) {
      grid-template-columns: 1.8fr 1fr 1fr 1.6fr;
      gap: 48px;
    }
  }

  // ── Marque ───────────────────────────────────────────────
  &__logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.3rem;
    color: white;
    text-decoration: none;
    margin-bottom: 16px;
  }

  &__logo-icon {
    width: 34px;
    height: 34px;
    background: var(--gradient-primary);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  &__tagline {
    font-size: 0.88rem;
    line-height: 1.65;
    margin-bottom: 20px;
    max-width: 260px;
  }

  &__socials {
    display: flex;
    gap: 10px;
  }

  &__social {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all var(--transition);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }
  }

  // ── Colonnes nav / légal ─────────────────────────────────
  &__col-title {
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: white;
    margin-bottom: 16px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
  }

  &__link {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color var(--transition);

    &:hover {
      color: white;
    }

    // Bouton stylé comme un lien (Gestion des cookies)
    &--btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
    }
  }

  // ── Newsletter ───────────────────────────────────────────
  &__newsletter-desc {
    font-size: 0.87rem;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  &__newsletter-form {
    display: flex;
    gap: 0;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-full);
    overflow: hidden;
    background: rgba(255, 255, 255, 0.06);
  }

  &__newsletter-input {
    flex: 1;
    padding: 11px 16px;
    background: transparent;
    border: none;
    color: white;
    font-family: var(--font-body);
    font-size: 0.87rem;
    outline: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.35);
    }
  }

  &__newsletter-btn {
    padding: 0 18px;
    background: var(--gradient-primary);
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    transition: opacity var(--transition);
    font-family: inherit;

    &:hover {
      opacity: 0.85;
    }
  }

  &__newsletter-success {
    font-size: 0.88rem;
    color: #4ade80;
    font-weight: 600;
  }

  // ── Bas de footer ────────────────────────────────────────
  &__bottom {
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include m.respond-to(md) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__copyright {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.35);
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__badge {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.06);
    padding: 4px 12px;
    border-radius: var(--radius-full);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
