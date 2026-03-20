<!-- ContactFormSection.vue — Formulaire de contact + sujets fréquents
     - Fond blanc
     - Layout 2 colonnes : form à gauche, topics sidebar à droite
     - Topics cliquables → auto-fill le select "Sujet"
     - Success state animé après envoi (simulation — backend à brancher)
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ── État du formulaire ─────────────────────────────────────────
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const isSuccess    = ref(false)
const hasError     = ref(false)

// ── Sujets disponibles ─────────────────────────────────────────
const subjects = [
  { value: '',         label: '— Choisir un sujet —' },
  { value: 'bug',      label: '🐞 Bug ou problème technique' },
  { value: 'billing',  label: '💳 Question sur l\'abonnement' },
  { value: 'account',  label: '👤 Mon compte ou mon profil' },
  { value: 'content',  label: '📚 Contenu des questions' },
  { value: 'partner',  label: '🤝 Partenariat ou presse' },
  { value: 'studio',   label: '🛠️ Projet web / app (johanwebstudio.fr)' },
  { value: 'other',    label: '💬 Autre' },
]

// Topics affichés dans la sidebar (les 7 items sans le placeholder vide)
const topics = subjects.slice(1)

// Clic sur un topic → auto-fill le select
function selectTopic(value: string) {
  form.value.subject = value
}

// ── Soumission ─────────────────────────────────────────────────
// Simulation — à remplacer par un appel API (Resend / Formspree) en production
async function handleSubmit() {
  hasError.value     = false
  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    isSuccess.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch {
    hasError.value = true
  } finally {
    isSubmitting.value = false
  }
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
    { threshold: 0.08 }
  )

  document.querySelectorAll('.cf-reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section class="contact-form-section" aria-labelledby="contact-form-title">
    <div class="container">

      <div class="contact-form-section__grid">

        <!-- ── Colonne gauche : Formulaire ── -->
        <div class="contact-form-col cf-reveal" data-delay="0">

          <h2 id="contact-form-title" class="contact-form-col__heading">Écrivez-moi</h2>
          <p class="contact-form-col__sub">Je lis tout. Vraiment.</p>

          <!-- Formulaire -->
          <form
            v-if="!isSuccess"
            class="cf"
            novalidate
            @submit.prevent="handleSubmit"
            aria-label="Formulaire de contact"
          >

            <!-- Prénom + Email (2 colonnes sur md+) -->
            <div class="cf__row">
              <div class="cf__field">
                <label for="cf-name" class="cf__label">Prénom *</label>
                <input
                  id="cf-name"
                  v-model="form.name"
                  type="text"
                  class="cf__input"
                  placeholder="Marie"
                  required
                  autocomplete="given-name"
                />
              </div>

              <div class="cf__field">
                <label for="cf-email" class="cf__label">Email *</label>
                <input
                  id="cf-email"
                  v-model="form.email"
                  type="email"
                  class="cf__input"
                  placeholder="marie@email.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <!-- Sujet -->
            <div class="cf__field">
              <label for="cf-subject" class="cf__label">Sujet *</label>
              <div class="cf__select-wrap">
                <select
                  id="cf-subject"
                  v-model="form.subject"
                  class="cf__select"
                  required
                >
                  <option
                    v-for="opt in subjects"
                    :key="opt.value"
                    :value="opt.value"
                    :disabled="opt.value === ''"
                  >
                    {{ opt.label }}
                  </option>
                </select>
                <div class="cf__select-chevron" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div class="cf__field">
              <label for="cf-message" class="cf__label">Message *</label>
              <textarea
                id="cf-message"
                v-model="form.message"
                class="cf__textarea"
                placeholder="Bonjour Johan…"
                rows="5"
                required
              ></textarea>
            </div>

            <!-- Erreur -->
            <p v-if="hasError" class="cf__error" role="alert">
              Une erreur s'est produite. Écrivez directement à
              <a href="mailto:contact@johanwebstudio.fr">contact@johanwebstudio.fr</a>.
            </p>

            <!-- Submit -->
            <button
              type="submit"
              class="cf__submit"
              :disabled="isSubmitting || !form.name || !form.email || !form.subject || !form.message"
              :aria-busy="isSubmitting"
            >
              <span v-if="isSubmitting" class="cf__spinner" aria-hidden="true"></span>
              <span>{{ isSubmitting ? 'Envoi en cours…' : 'Envoyer le message ✈️' }}</span>
            </button>

            <!-- Note RGPD -->
            <p class="cf__privacy">
              Vos données ne sont utilisées que pour répondre à votre message.
              Aucune revente, aucun spam.
            </p>

          </form>

          <!-- Succès -->
          <Transition name="success-fade" appear>
            <div v-if="isSuccess" class="cf-success" role="alert" aria-live="polite">
              <div class="cf-success__icon" aria-hidden="true">✅</div>
              <h3 class="cf-success__title">Message envoyé !</h3>
              <p class="cf-success__text">
                Merci — je vous réponds personnellement dans les 48h. À très vite !
              </p>
              <button class="cf-success__again" @click="isSuccess = false">
                Envoyer un autre message
              </button>
            </div>
          </Transition>

        </div>

        <!-- ── Colonne droite : Topics + email direct ── -->
        <aside class="contact-topics-col cf-reveal" data-delay="1" aria-label="Sujets fréquents">

          <div class="contact-topics">
            <div class="contact-topics__heading">Sujets fréquents</div>

            <ul class="contact-topics__list" role="list">
              <li
                v-for="topic in topics"
                :key="topic.value"
                class="contact-topic"
                :class="{ 'contact-topic--active': form.subject === topic.value }"
                role="listitem"
              >
                <button
                  class="contact-topic__btn"
                  type="button"
                  :aria-pressed="form.subject === topic.value"
                  @click="selectTopic(topic.value)"
                >
                  {{ topic.label }}
                </button>
              </li>
            </ul>
          </div>

          <!-- Email direct -->
          <div class="contact-direct">
            <div class="contact-direct__title">Préférez l'email direct ?</div>
            <a href="mailto:contact@johanwebstudio.fr" class="contact-direct__email">
              contact@johanwebstudio.fr
            </a>
            <p class="contact-direct__note">Même résultat — je lis tout.</p>
          </div>

        </aside>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.contact-form-section {
  background: white;
  padding: 72px 0 80px;

  // ── Grille 2 colonnes ──
  &__grid {
    display: grid;
    gap: 48px;
    align-items: start;

    @include m.respond-to(lg) {
      grid-template-columns: 1fr 300px;
      gap: 60px;
    }
  }
}

// ── Colonne form ───────────────────────────────────────────────
.contact-form-col {
  &__heading {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    color: var(--color-text);
    letter-spacing: -0.015em;
    margin-bottom: 6px;
  }

  &__sub {
    font-size: 0.9rem;
    color: var(--color-text-light);
    margin-bottom: 28px;
    font-style: italic;
  }
}

// ── Formulaire ────────────────────────────────────────────────
.cf {
  display: flex;
  flex-direction: column;
  gap: 18px;

  &__row {
    display: grid;
    gap: 16px;

    @include m.respond-to(sm) { grid-template-columns: 1fr 1fr; }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__label {
    font-size: 0.83rem;
    font-weight: 700;
    color: var(--color-text);
  }

  // Styles partagés
  &__input,
  &__select,
  &__textarea {
    width: 100%;
    padding: 12px 15px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--color-surface-dark);
    background: var(--color-surface);
    font-family: var(--font-body);
    font-size: 0.93rem;
    color: var(--color-text);
    transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
    appearance: none;

    &::placeholder { color: var(--color-text-light); }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.13);
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 130px;
    line-height: 1.65;
  }

  &__select-wrap { position: relative; }

  &__select {
    padding-right: 40px;
    cursor: pointer;

    option[disabled] { color: var(--color-text-light); }
  }

  &__select-chevron {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-light);
    pointer-events: none;
  }

  &__error {
    font-size: 0.84rem;
    color: var(--color-error);

    a { color: var(--color-primary); text-decoration: underline; }
  }

  &__submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 14px 28px;
    border-radius: var(--radius-full);
    background: var(--gradient-primary);
    color: white;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.97rem;
    cursor: pointer;
    transition: all var(--transition);
    box-shadow: var(--shadow-md);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  &__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.35);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  &__privacy {
    font-size: 0.76rem;
    color: var(--color-text-light);
    line-height: 1.6;
    text-align: center;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// ── Succès ────────────────────────────────────────────────────
.cf-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 32px;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--color-surface-dark);

  &__icon  { font-size: 3rem; margin-bottom: 16px; }

  &__title {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 10px;
  }

  &__text {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.75;
    margin-bottom: 24px;
    max-width: 320px;
  }

  &__again {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: underline;
    cursor: pointer;

    &:hover { opacity: 0.7; }
  }
}

.success-fade-enter-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.success-fade-enter-from   { opacity: 0; transform: translateY(12px); }

// ── Topics sidebar ────────────────────────────────────────────
.contact-topics {
  margin-bottom: 20px;

  &__heading {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-light);
    margin-bottom: 12px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.contact-topic {
  &__btn {
    width: 100%;
    text-align: left;
    padding: 11px 14px;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    border: 1.5px solid var(--color-surface-dark);
    font-family: var(--font-body);
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: border-color var(--transition), color var(--transition), background var(--transition);

    &:hover {
      border-color: var(--color-primary-light);
      color: var(--color-primary);
      background: white;
    }
  }

  // Topic sélectionné
  &--active .contact-topic__btn {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: rgba(102, 126, 234, 0.06);
  }
}

// ── Email direct ──────────────────────────────────────────────
.contact-direct {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-surface-dark);
  padding: 16px;

  &__title {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 6px;
  }

  &__email {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
    margin-bottom: 4px;

    &:hover { text-decoration: underline; }
  }

  &__note {
    font-size: 0.75rem;
    color: var(--color-text-light);
    font-style: italic;
  }
}

// ── Reveal ────────────────────────────────────────────────────
.cf-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &[data-delay='1'] { transition-delay: 0.14s; }

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
