<!-- FaqBillingSection.vue — FAQ facturation (accordion)
     - Fond blanc
     - 6 questions/réponses sur la facturation, une seule ouverte à la fois
     - Accessible : aria-expanded, aria-controls, id sur les panneaux
     - Animation max-height CSS pour l'ouverture/fermeture
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ── Questions FAQ facturation ──────────────────────────────────
const faqs = [
  {
    id: 'faq-1',
    q: 'Puis-je changer de plan à tout moment ?',
    a: "Oui, à tout moment. Vous pouvez passer de Gratuit à Erudia+ ou annuler votre abonnement depuis votre espace admin. Le changement prend effet immédiatement ou à la fin du cycle de facturation selon le cas.",
  },
  {
    id: 'faq-2',
    q: 'Comment fonctionne la facturation ?',
    a: "Mensuelle ou annuelle selon votre choix, avec renouvellement automatique. Vous recevez un email de rappel 7 jours avant chaque renouvellement. Vous pouvez annuler à tout moment avant la date de renouvellement.",
  },
  {
    id: 'faq-3',
    q: 'Et si je ne suis pas satisfait ?',
    a: "Remboursement intégral dans les 14 jours suivant votre abonnement — sans question et sans formulaire compliqué. Envoyez simplement un email à support@erudia.app avec votre identifiant de commande Stripe.",
  },
  {
    id: 'faq-4',
    q: 'Une carte de crédit est-elle requise pour le plan gratuit ?',
    a: "Non, absolument pas. Le plan gratuit ne nécessite aucune donnée bancaire. Vous créez un profil enfant directement dans l'app sans aucun engagement.",
  },
  {
    id: 'faq-5',
    q: 'Le plan Erudia+ couvre combien d\'enfants ?',
    a: "Erudia+ permet des profils enfants illimités sous un même compte admin. Idéal pour les familles avec plusieurs enfants — un seul abonnement pour tous.",
  },
  {
    id: 'faq-6',
    q: 'Y a-t-il une période d\'essai pour Erudia+ ?',
    a: "Oui — 7 jours d'essai gratuits sur Erudia+, sans carte de crédit requise. À la fin de l'essai, vous choisissez de continuer ou non. Aucun prélèvement automatique sans votre accord explicite.",
  },
]

// ── Gestion de l'accordéon ─────────────────────────────────────
// Une seule question ouverte à la fois (null = toutes fermées)
const openId = ref<string | null>(null)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}

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
    { threshold: 0.1 }
  )

  document.querySelectorAll('.faq-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="faq-billing" aria-labelledby="faq-billing-title">
    <div class="container">

      <!-- En-tête -->
      <div class="faq-billing__header faq-reveal">
        <div class="pill pill--primary label">❓ FAQ Facturation</div>
        <h2 id="faq-billing-title" class="faq-billing__heading">
          Questions sur les tarifs
        </h2>
      </div>

      <!-- Accordéon -->
      <div class="faq-billing__list" role="list">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.id"
          class="faq-item faq-reveal"
          :class="{ 'faq-item--open': openId === faq.id }"
          :data-delay="index % 3"
          role="listitem"
        >
          <!-- Bouton question -->
          <button
            class="faq-item__question"
            :aria-expanded="openId === faq.id"
            :aria-controls="`panel-${faq.id}`"
            :id="`btn-${faq.id}`"
            @click="toggle(faq.id)"
          >
            <span>{{ faq.q }}</span>
            <div class="faq-item__chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>

          <!-- Panneau réponse (animation max-height via CSS) -->
          <div
            class="faq-item__answer"
            :id="`panel-${faq.id}`"
            :aria-labelledby="`btn-${faq.id}`"
            role="region"
          >
            <p class="faq-item__answer-text">{{ faq.a }}</p>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.faq-billing {
  background: white;
  padding: 80px 0;

  @include m.respond-to(md) { padding: 110px 0; }

  // ── En-tête ──
  &__header {
    text-align: center;
    margin-bottom: 56px;

    .pill { margin-bottom: 14px; }
  }

  &__heading {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.015em;
    margin-top: 12px;
  }

  // ── Liste ──
  &__list {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

// ── Item FAQ ──────────────────────────────────────────────────
.faq-item {
  background: white;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-surface-dark);
  overflow: hidden;
  transition:
    border-color var(--transition),
    opacity 0.5s ease,
    translate 0.5s ease;

  // Reveal
  opacity: 0;
  translate: 0 20px;

  &.is-visible {
    opacity: 1;
    translate: 0 0;
  }

  &[data-delay='0'] { transition-delay: 0s; }
  &[data-delay='1'] { transition-delay: 0.07s; }
  &[data-delay='2'] { transition-delay: 0.14s; }

  // Bordure primaire quand ouvert
  &--open {
    border-color: var(--color-primary-light);
  }

  // ── Bouton question ──
  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.95rem;
    text-align: left;
    color: var(--color-text);
    transition: color var(--transition);
    cursor: pointer;

    &:hover { color: var(--color-primary); }

    .faq-item--open & { color: var(--color-primary); }
  }

  // ── Chevron animé ──
  &__chevron {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--color-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--color-text-light);
    transition: background var(--transition), color var(--transition), transform var(--transition);

    .faq-item--open & {
      background: var(--color-primary);
      color: white;
      transform: rotate(180deg);
    }
  }

  // ── Panneau réponse ──
  // Animation via max-height : 0 → 400px selon l'état --open
  &__answer {
    max-height: 0;
    overflow: hidden;
    padding: 0 20px;
    transition: max-height 0.35s ease, padding 0.25s ease;

    .faq-item--open & {
      max-height: 400px;
      padding: 0 20px 18px;
    }
  }

  &__answer-text {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.75;
  }
}

// ── Reveal ────────────────────────────────────────────────────
.faq-reveal {
  opacity: 0;
  translate: 0 20px;
  transition: opacity 0.5s ease, translate 0.5s ease;

  &.is-visible {
    opacity: 1;
    translate: 0 0;
  }
}
</style>
