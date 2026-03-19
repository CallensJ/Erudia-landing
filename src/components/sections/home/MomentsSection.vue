<!-- MomentsSection.vue — Section aspirationnelle "Dans quelques semaines…"
     Layout éditorial : lignes horizontales séparées par des dividers — pas de cartes.
     Chaque moment : emoji + label à gauche, texte à droite.
     Ton : storyteller, parent-to-parent, chaleureux et honnête. -->

<script setup lang="ts">
const moments = [
  {
    icon: '🚙',
    scene: 'Dans la voiture',
    text: 'Votre enfant joue en silence depuis 20 minutes. Vous réalisez qu\'il ne s\'est pas plaint une seule fois du trajet.',
  },
  {
    icon: '🌙',
    scene: 'Le soir au lit',
    text: '"Papa, encore cinq questions ?" — et vous dites oui, parce que c\'est lui qui demande d\'apprendre.',
  },
  {
    icon: '☕',
    scene: 'Le dimanche matin',
    text: 'Vous jetez un œil au tableau de bord. Cette semaine : 4 jours de suite, un nouveau badge. Vous souriez.',
  },
  {
    icon: '✈️',
    scene: 'En vacances, sans réseau',
    text: 'L\'avion décolle, le téléphone passe en mode avion — et Erudia continue comme si de rien n\'était.',
  },
]
</script>

<template>
  <section class="moments section" aria-labelledby="moments-title">
    <div class="container">

      <!-- En-tête centré -->
      <div class="moments__header">
        <div class="pill pill--accent moments__pill">Dans quelques semaines…</div>
        <h2 id="moments-title" class="moments__title heading-lg">
          Ces petits moments qui changent tout
        </h2>
      </div>

      <!-- Liste éditoriale — pas de cartes, juste des lignes -->
      <ol class="moments__list" aria-label="Moments du quotidien">
        <li
          v-for="(item, index) in moments"
          :key="item.scene"
          class="moments__item"
        >
          <!-- Numéro -->
          <span class="moments__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>

          <!-- Icône + label -->
          <div class="moments__meta">
            <span class="moments__icon" aria-hidden="true">{{ item.icon }}</span>
            <span class="moments__scene">{{ item.scene }}</span>
          </div>

          <!-- Texte -->
          <p class="moments__text">{{ item.text }}</p>
        </li>
      </ol>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.moments {
  background: var(--color-bg);

  // ── En-tête ──────────────────────────────────────────────
  &__header {
    margin-bottom: 48px;
  }

  &__pill {
    margin-bottom: 16px;
  }

  &__title {
    color: var(--color-text);
    max-width: 520px;
  }

  // ── Liste éditoriale ─────────────────────────────────────
  // Layout 3 colonnes sur desktop : numéro | meta | texte
  // Séparateurs top sur chaque item — pas de fond, pas de border-box
  &__list {
    list-style: none;
    border-top: 1px solid var(--color-surface-dark);
  }

  &__item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px 24px;
    padding: 28px 0;
    border-bottom: 1px solid var(--color-surface-dark);
    align-items: center;

    @include m.respond-to(md) {
      // numéro | meta | texte
      grid-template-columns: 40px 200px 1fr;
      gap: 0 40px;
    }
  }

  // Numéro — gris très clair, décoratif
  &__number {
    font-family: var(--font-display);
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--color-surface-dark);
    letter-spacing: 0.05em;
    align-self: start;
    padding-top: 4px;

    // Masqué sur mobile — trop dense
    display: none;

    @include m.respond-to(md) {
      display: block;
    }
  }

  // Meta : icône + label
  &__meta {
    display: flex;
    align-items: center;
    gap: 12px;

    // Sur mobile : occupe toute la première ligne (span 2)
    grid-column: 1 / -1;

    @include m.respond-to(md) {
      grid-column: auto;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
  }

  &__icon {
    font-size: 1.6rem;
    line-height: 1;
    flex-shrink: 0;
  }

  &__scene {
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-primary);
  }

  // Texte — italic, doux
  &__text {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.75;
    font-style: italic;

    // Sur mobile : span toute la largeur sur la 2e ligne
    grid-column: 1 / -1;

    @include m.respond-to(md) {
      grid-column: auto;
    }
  }
}
</style>
