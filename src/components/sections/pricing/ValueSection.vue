<!-- ValueSection.vue — Justification de valeur + analogies de prix
     - Fond surface (gris clair)
     - 4 cards de valeur : 1 col → 2 cols → 4 cols
     - Chaque card : icône, titre, description, stat gradient
     - Analogy strip (fond sombre) : comparaison prix avec la vie quotidienne
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// ── Cards de valeur ────────────────────────────────────────────
// Ton parent-to-parent : ce que représente concrètement l'abonnement
const valueCards = [
  {
    icon: '🎮',
    title: 'Illimité dans le temps',
    desc: "Pas de sessions limitées, pas de questions épuisées. L'enfant joue autant qu'il veut, chaque jour. Le contenu se renouvelle avec les défis quotidiens.",
    stat: '∞ parties',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Toute la famille',
    desc: "Erudia+ couvre des profils enfants illimités. Frères, sœurs, cousins — un seul abonnement suffit pour tout le monde, sans supplément.",
    stat: '∞ profils',
  },
  {
    icon: '📡',
    title: 'Partout, toujours',
    desc: "Mode hors ligne inclus dès le plan gratuit — pas réservé au premium. Voitures, trains, campings : l'apprentissage ne s'arrête jamais.",
    stat: '0 coupure',
  },
  {
    icon: '🚫',
    title: 'Zéro publicité',
    desc: "Pas de pub, ni en gratuit ni en premium. Pas de tracking, pas de données enfants revendues. Erudia, c'est juste le jeu — rien d'autre.",
    stat: '0 pub',
  },
]

// ── Analogies de prix ──────────────────────────────────────────
// Mise en perspective du prix mensuel avec des achats courants
const analogies = [
  { emoji: '🍕', name: 'Une pizza',         price: '~8–12€',  duration: 'une soirée' },
  { emoji: '☕', name: 'Deux cafés',         price: '~5–6€',   duration: 'un matin' },
  { emoji: '📚', name: 'Un livre de poche', price: '~6–9€',   duration: 'quelques heures' },
  { emoji: '🎬', name: 'Un film en VOD',    price: '~4–6€',   duration: 'une fois' },
  { emoji: '🦉', name: 'Erudia+',           price: '4,99€',   duration: 'tout le mois ✨', isErudia: true },
]

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
    { threshold: 0.12 }
  )

  document.querySelectorAll('.value-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="value-section" aria-labelledby="value-title">
    <div class="container">

      <!-- En-tête ──────────────────────────────────── -->
      <div class="value-section__header value-reveal" data-delay="0">
        <div class="pill pill--primary label">💎 Ce que vous obtenez</div>
        <h2 id="value-title" class="value-section__heading">
          Un abonnement qui vaut vraiment le coup
        </h2>
        <p class="value-section__subline">
          Pas de fonctionnalités bridées. Pas de surprise.
          Juste du contenu qui grandit avec votre enfant.
        </p>
      </div>

      <!-- 4 cards de valeur ──────────────────────── -->
      <div class="value-section__grid">
        <article
          v-for="(card, index) in valueCards"
          :key="card.title"
          class="value-card value-reveal"
          :data-delay="index"
        >
          <div class="value-card__icon" aria-hidden="true">{{ card.icon }}</div>
          <h3 class="value-card__title">{{ card.title }}</h3>
          <p class="value-card__desc">{{ card.desc }}</p>
          <div class="value-card__stat" aria-label="Chiffre clé">{{ card.stat }}</div>
        </article>
      </div>

      <!-- Analogy strip ──────────────────────────── -->
      <div class="analogy-strip value-reveal" data-delay="0" aria-label="Comparaison de prix">
        <div class="analogy-strip__orb" aria-hidden="true"></div>

        <h3 class="analogy-strip__title">
          Un mois d'Erudia+, c'est moins cher que…
        </h3>
        <p class="analogy-strip__sub">
          Et ça dure tout le mois — pas juste le temps d'un goûter 😄
        </p>

        <div class="analogy-strip__items">
          <div
            v-for="item in analogies"
            :key="item.name"
            class="analogy-item"
            :class="{ 'analogy-item--erudia': item.isErudia }"
          >
            <div class="analogy-item__emoji" aria-hidden="true">{{ item.emoji }}</div>
            <div class="analogy-item__name">{{ item.name }}</div>
            <div class="analogy-item__price">{{ item.price }}</div>
            <div class="analogy-item__duration">{{ item.duration }}</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.value-section {
  background: var(--color-surface);
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
    margin-bottom: 12px;
    margin-top: 12px;
  }

  &__subline {
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    color: var(--color-text-secondary);
    line-height: 1.75;
    font-weight: 500;
    max-width: 560px;
    margin: 0 auto;
  }

  // ── Grille 4 cards ──
  &__grid {
    display: grid;
    gap: 20px;
    margin-bottom: 48px;

    @include m.respond-to(sm)  { grid-template-columns: repeat(2, 1fr); }
    @include m.respond-to(lg)  { grid-template-columns: repeat(4, 1fr); }
  }
}

// ── Value card ────────────────────────────────────────────────
.value-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  border: 1.5px solid var(--color-surface-dark);
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition),
    opacity 0.55s ease,
    translate 0.55s ease;

  // Reveal
  opacity: 0;
  translate: 0 24px;

  &.is-visible {
    opacity: 1;
    translate: 0 0;
  }

  @for $i from 0 through 3 {
    &[data-delay='#{$i}'] { transition-delay: #{$i * 0.08}s; }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary-light);
  }

  &__icon {
    font-size: 2rem;
    margin-bottom: 14px;
    display: block;
    transition: transform 0.3s ease;

    .value-card:hover & { transform: scale(1.15); }
  }

  &__title {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 0.84rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 14px;
  }

  // Stat en gradient primary
  &__stat {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

// ── Analogy strip (fond sombre) ───────────────────────────────
.analogy-strip {
  background: var(--gradient-hero);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  position: relative;
  overflow: hidden;
  text-align: center;

  // Reveal
  opacity: 0;
  translate: 0 24px;
  transition: opacity 0.6s ease 0.2s, translate 0.6s ease 0.2s;

  &.is-visible {
    opacity: 1;
    translate: 0 0;
  }

  // Orbe décoratif
  &__orb {
    position: absolute;
    top: -60px;
    right: -60px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent 70%);
    pointer-events: none;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 800;
    color: white;
    margin-bottom: 8px;
    position: relative;
    z-index: 2;
  }

  &__sub {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 32px;
    position: relative;
    z-index: 2;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    position: relative;
    z-index: 2;
  }
}

// ── Analogy item ──────────────────────────────────────────────
.analogy-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 130px;
  flex: 1;
  max-width: 175px;
  backdrop-filter: blur(8px);
  transition: all var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-3px);
  }

  // Item Erudia mis en avant (bordure + fond dorés)
  &--erudia {
    background: rgba(255, 215, 0, 0.15);
    border-color: rgba(255, 215, 0, 0.4);

    .analogy-item__price {
      background: var(--gradient-accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__emoji {
    font-size: 2rem;
  }

  &__name {
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.75);
    text-align: center;
  }

  &__price {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 800;
    color: white;
  }

  &__duration {
    font-size: 0.67rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    text-align: center;
  }
}

// ── Reveal ────────────────────────────────────────────────────
.value-reveal {
  opacity: 0;
  translate: 0 24px;
  transition: opacity 0.6s ease, translate 0.6s ease;

  &[data-delay='0'] { transition-delay: 0s; }
  &[data-delay='1'] { transition-delay: 0.08s; }
  &[data-delay='2'] { transition-delay: 0.16s; }
  &[data-delay='3'] { transition-delay: 0.24s; }

  &.is-visible {
    opacity: 1;
    translate: 0 0;
  }
}
</style>
