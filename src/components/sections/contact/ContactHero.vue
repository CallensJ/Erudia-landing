<!-- ContactHero.vue — Hero de la page Contact
     - Layout 2 colonnes sur desktop : titre à gauche, carte contact à droite
     - Carte contact glassmorphisme : email, studio, localisation + délai réponse
     - Wave SVG de transition vers le fond blanc -->
<template>
  <section class="contact-hero" aria-labelledby="contact-hero-title">

    <!-- Orbes décoratifs -->
    <div class="contact-hero__orb contact-hero__orb--1" aria-hidden="true"></div>
    <div class="contact-hero__orb contact-hero__orb--2" aria-hidden="true"></div>

    <div class="container">
      <div class="contact-hero__grid">

        <!-- Colonne gauche : titre + sous-titre -->
        <div class="contact-hero__content">
          <div class="pill pill--white label">Contact</div>

          <h1 id="contact-hero-title" class="contact-hero__title">
            Une question ?<br>
            <span class="contact-hero__title-accent">Je vous réponds.</span>
          </h1>

          <p class="contact-hero__sub">
            Vous parlez directement à Johan — créateur, développeur et designer d'Erudia.
            Pas un bot, pas un formulaire automatique.
          </p>
        </div>

        <!-- Colonne droite : carte contact -->
        <div class="contact-hero__card" aria-label="Coordonnées de contact">

          <div class="contact-method">
            <span class="contact-method__icon" aria-hidden="true">📧</span>
            <div class="contact-method__body">
              <div class="contact-method__label">Email</div>
              <a href="mailto:contact@johanwebstudio.fr" class="contact-method__value">
                contact@johanwebstudio.fr
              </a>
            </div>
          </div>

          <div class="contact-method">
            <span class="contact-method__icon" aria-hidden="true">🛠️</span>
            <div class="contact-method__body">
              <div class="contact-method__label">Studio</div>
              <a
                href="https://johanwebstudio.fr"
                class="contact-method__value"
                target="_blank"
                rel="noopener noreferrer"
              >
                johanwebstudio.fr
              </a>
            </div>
          </div>

          <div class="contact-method">
            <span class="contact-method__icon" aria-hidden="true">🌞</span>
            <div class="contact-method__body">
              <div class="contact-method__label">Localisation</div>
              <div class="contact-method__value">Sud de la France</div>
            </div>
          </div>

          <p class="contact-hero__card-note">
            Je réponds en moins de 48h — en français ou en anglais.
          </p>

        </div>

      </div>
    </div>

    <!-- Wave de transition -->
    <div class="contact-hero__wave" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
      </svg>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.contact-hero {
  background: var(--gradient-hero);
  padding: 120px 0 0;
  position: relative;
  overflow: hidden;

  // ── Orbes ──
  &__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--1 {
      top: -120px;
      right: -80px;
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.2), transparent 70%);
      filter: blur(80px);
    }

    &--2 {
      bottom: 0;
      left: 10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.07), transparent 70%);
      filter: blur(80px);
    }
  }

  // ── Grille 2 colonnes ──
  &__grid {
    display: grid;
    gap: 40px;
    align-items: center;
    padding-bottom: 64px;
    position: relative;
    z-index: 2;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 360px;
      gap: 64px;
    }
  }

  // ── Contenu texte ──
  &__content {
    .pill { margin-bottom: 20px; }
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 800;
    color: white;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 20px;

    &-accent {
      background: var(--gradient-accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__sub {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.75;
    font-weight: 500;
    max-width: 480px;
  }

  // ── Carte contact (glassmorphisme) ──
  &__card {
    background: rgba(255, 255, 255, 0.07);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-xl);
    padding: 28px 24px;
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__card-note {
    margin-top: 20px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.45);
    font-style: italic;
    line-height: 1.6;
  }

  // ── Wave ──
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

// ── Méthode de contact (ligne) ─────────────────────────────────
.contact-method {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;

  // Séparateur entre items
  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__icon {
    font-size: 1.3rem;
    width: 38px;
    height: 38px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.45);
    margin-bottom: 2px;
  }

  &__value {
    font-size: 0.88rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
    transition: color var(--transition);

    &:hover { color: var(--color-accent); }
  }
}
</style>
