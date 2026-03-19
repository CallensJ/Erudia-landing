<!-- CtaSection.vue — Section de conversion finale de la home page
     Fond sombre (gradient hero) — rupture visuelle après les sections blanches/surface.
     Ton : invitation douce, pas de pression. On donne envie, pas on force. -->

<script setup lang="ts">
// Pas de logique — section purement visuelle et éditoriale
</script>

<template>
  <section class="cta-section" aria-labelledby="cta-title">
    <div class="container">

      <div class="cta-section__inner">

        <!-- Orbe décoratif de fond -->
        <div class="cta-section__orb cta-section__orb--1" aria-hidden="true"></div>
        <div class="cta-section__orb cta-section__orb--2" aria-hidden="true"></div>

        <!-- Contenu -->
        <div class="cta-section__content">
          <div class="pill pill--ghost cta-section__pill">C'est parti ?</div>

          <h2 id="cta-title" class="cta-section__title heading-lg">
            Prêt à essayer ?
          </h2>

          <p class="cta-section__subline">
            Créez un profil en 30 secondes.<br />
            Pas de carte de crédit, pas de formulaire interminable.
          </p>

          <div class="cta-section__actions">
            <a
              href="https://app.erudia.app"
              class="btn btn--white"
              target="_blank"
              rel="noopener"
            >
              🚀 Jouer maintenant — c'est gratuit
            </a>
            <RouterLink to="/how-it-works" class="btn btn--ghost-white">
              Voir comment ça marche
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

.cta-section {
  background: var(--gradient-hero);
  padding: 96px 0;
  position: relative;
  overflow: hidden;

  // ── Orbes décoratifs — mêmes que le Hero pour la cohérence ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.25;

    &--1 {
      width: 400px;
      height: 400px;
      background: #667eea;
      top: -100px;
      right: -80px;
    }

    &--2 {
      width: 300px;
      height: 300px;
      background: #764ba2;
      bottom: -80px;
      left: -60px;
    }
  }

  // ── Inner centré ─────────────────────────────────────────
  &__inner {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  // ── Pill ─────────────────────────────────────────────────
  &__pill {
    margin-bottom: 20px;
  }

  // ── Titre ────────────────────────────────────────────────
  &__title {
    color: white;
    margin-bottom: 16px;
  }

  // ── Sous-titre ───────────────────────────────────────────
  &__subline {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.75;
    margin-bottom: 40px;
  }

  // ── Actions ──────────────────────────────────────────────
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
}

// ── Variantes de boutons spécifiques au fond sombre ──────
// Bouton blanc plein — CTA principal
.btn--white {
  background: white;
  color: var(--color-primary-dark);
  font-weight: 800;

  &:hover {
    background: rgba(255, 255, 255, 0.92);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
}

// Bouton ghost sur fond sombre
.btn--ghost-white {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
}

// Pill sur fond sombre
.pill--ghost {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
