<!-- BehindErudiaSection.vue — L'histoire derrière Erudia
     - Fond surface (gris clair)
     - Layout 2 colonnes : identité à gauche, histoire à droite
     - Gauche : photo fondateur, nom, rôle, 4 tags, lien studio
     - Droite : pill, titre "Une app de papa.", 2 §, citation, photo avec fille + caption overlay
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import founderImg  from '@/assets/johan-portrait.jpg'
import filleImg    from '@/assets/johan-fille.jpg'

const { t } = useLocale()

// ── Tags identité (réactifs à la locale) ───────────────────────
const tags = computed(() => [
  { emoji: '👨‍👧', label: t('contact.bio.tag1') },
  { emoji: '💻', label: t('contact.bio.tag2') },
  { emoji: '🎨', label: t('contact.bio.tag3') },
  { emoji: '🌞', label: t('contact.bio.tag4') },
])

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

  document.querySelectorAll('.be-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="behind-erudia" aria-labelledby="behind-erudia-title">
    <div class="container">

      <div class="behind-erudia__grid">

        <!-- ── Colonne gauche : Identité ── -->
        <aside class="be-identity be-reveal" data-delay="0" :aria-label="t('contact.bio.founderAlt')">

          <!-- Photo + flag -->
          <div class="be-identity__photo-wrap">
            <img
              :src="founderImg"
              :alt="t('contact.bio.founderAlt')"
              class="be-identity__photo"
              loading="lazy"
              width="120"
              height="120"
            />
            <div class="be-identity__flag" aria-hidden="true">🇫🇷</div>
          </div>

          <!-- Nom + rôle -->
          <div class="be-identity__name">Johan</div>
          <div class="be-identity__role">{{ t('contact.bio.role') }}</div>

          <!-- Tags -->
          <div class="be-identity__tags" aria-label="À propos de Johan">
            <span
              v-for="tag in tags"
              :key="tag.emoji"
              class="be-identity__tag"
            >
              <span aria-hidden="true">{{ tag.emoji }}</span>
              {{ tag.label }}
            </span>
          </div>

          <!-- Lien studio -->
          <a
            href="https://johanwebstudio.fr"
            class="be-identity__studio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Johanwebstudio.fr — studio freelance"
          >
            <div class="be-identity__studio-inner">
              <span class="be-identity__studio-icon" aria-hidden="true">🛠️</span>
              <div>
                <div class="be-identity__studio-label">{{ t('contact.bio.studioLabel') }}</div>
                <div class="be-identity__studio-url">johanwebstudio.fr</div>
              </div>
            </div>
            <span class="be-identity__studio-arrow" aria-hidden="true">→</span>
          </a>

        </aside>

        <!-- ── Colonne droite : Histoire ── -->
        <div class="be-story be-reveal" data-delay="1">

          <div class="pill pill--primary label">{{ t('contact.bio.pill') }}</div>

          <h2 id="behind-erudia-title" class="be-story__title">{{ t('contact.bio.title') }}</h2>

          <p class="be-story__text">{{ t('contact.bio.p1') }}</p>

          <!-- Citation -->
          <blockquote class="be-story__quote">
            <p>{{ t('contact.bio.quote') }}</p>
            <footer>{{ t('contact.bio.quoteAuthor') }}</footer>
          </blockquote>

          <!-- Photo avec fille + caption overlay -->
          <div class="be-story__photo-wrap" :aria-label="t('contact.bio.filleAlt')">
            <img
              :src="filleImg"
              :alt="t('contact.bio.filleAlt')"
              class="be-story__photo"
              width="400"
              height="400"
              loading="lazy"
            />
            <div class="be-story__photo-caption" aria-hidden="true">
              {{ t('contact.bio.photoCaption') }}
            </div>
          </div>

          <!-- eslint-disable vue/no-v-html -->
          <p class="be-story__text" v-html="t('contact.bio.p2')"></p>

        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.behind-erudia {
  background: var(--color-surface);
  padding: 80px 0;

  @include m.respond-to(md) { padding: 110px 0; }

  // ── Grille 2 colonnes ──
  &__grid {
    display: grid;
    gap: 48px;
    align-items: start;

    @include m.respond-to(lg) {
      grid-template-columns: 260px 1fr;
      gap: 64px;
    }
  }
}

// ── Identité (colonne gauche) ─────────────────────────────────
.be-identity {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @include m.respond-to(lg) {
    align-items: flex-start;
    text-align: left;
  }

  // ── Photo ──
  &__photo-wrap {
    position: relative;
    margin-bottom: 16px;
  }

  &__photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 3px solid white;
    box-shadow: var(--shadow-md);
    display: block;
  }

  &__flag {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.82rem;
    box-shadow: var(--shadow-sm);
  }

  // ── Nom / rôle ──
  &__name {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 4px;
  }

  &__role {
    font-size: 0.78rem;
    color: var(--color-text-secondary);
    font-weight: 600;
    margin-bottom: 16px;
    line-height: 1.5;
  }

  // ── Tags ──
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 20px;

    @include m.respond-to(lg) { justify-content: flex-start; }
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    background: white;
    border: 1.5px solid var(--color-surface-dark);
    border-radius: var(--radius-full);
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--color-text-secondary);
  }

  // ── Lien studio ──
  &__studio {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 14px 16px;
    background: white;
    border: 1.5px solid var(--color-surface-dark);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: border-color var(--transition), box-shadow var(--transition);

    &:hover {
      border-color: var(--color-primary-light);
      box-shadow: var(--shadow-sm);
    }
  }

  &__studio-inner {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__studio-icon {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
    background: var(--color-surface);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__studio-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--color-text-light);
    margin-bottom: 1px;
  }

  &__studio-url {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--color-primary);
  }

  &__studio-arrow {
    font-size: 1rem;
    color: var(--color-text-light);
    transition: transform var(--transition);

    .be-identity__studio:hover & { transform: translateX(4px); }
  }
}

// ── Histoire (colonne droite) ─────────────────────────────────
.be-story {

  .pill { margin-bottom: 16px; }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3.5vw, 2.25rem);
    font-weight: 800;
    color: var(--color-text);
    line-height: 1.2;
    letter-spacing: -0.015em;
    margin-bottom: 20px;
  }

  &__text {
    font-size: 0.93rem;
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin-bottom: 20px;

    a {
      color: var(--color-primary);
      font-weight: 700;
      text-decoration: none;

      &:hover { text-decoration: underline; }
    }
  }

  // ── Citation ──
  &__quote {
    background: white;
    border-left: 4px solid var(--color-primary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    padding: 18px 20px;
    margin: 0 0 24px;

    p {
      font-size: 0.95rem;
      font-style: italic;
      color: var(--color-text);
      line-height: 1.65;
      margin-bottom: 8px;
    }

    footer {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--color-primary);
    }
  }

  // ── Photo avec fille ──
  &__photo-wrap {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    margin-bottom: 24px;
    height: 24rem;

    @include m.respond-to(md) { height: 30rem; }
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  // Caption en overlay gradient
  &__photo-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 40px 18px 14px;
    background: linear-gradient(to top, rgba(10, 8, 30, 0.75), transparent);
    font-size: 0.82rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.4;
  }
}

// ── Reveal ────────────────────────────────────────────────────
.be-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;

  &[data-delay='1'] { transition-delay: 0.15s; }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
