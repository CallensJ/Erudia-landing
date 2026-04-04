<!-- ContactFormSection.vue — Formulaire de contact + sujets fréquents
     - Fond blanc
     - Layout 2 colonnes : form à gauche, topics sidebar à droite
     - Topics cliquables → auto-fill le select "Sujet"
     - Success state animé après envoi (simulation — backend à brancher)
     - Reveal au scroll via IntersectionObserver -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { z } from 'zod'
import { useLocale } from '@/composables/useLocale'

const { t, td } = useLocale()

// ── Types ──────────────────────────────────────────────────────
interface Subject { value: string; label: string }

// ── Schéma Zod — messages réactifs à la locale ─────────────────
// Le schéma est recréé à chaque appel pour refléter la langue active
function buildSchema() {
  return z.object({
    name:    z.string().min(1, t('contact.form.errors.nameRequired'))
                       .min(2, t('contact.form.errors.nameMin')),
    email:   z.string().min(1, t('contact.form.errors.emailRequired'))
                       .email(t('contact.form.errors.emailInvalid')),
    subject: z.string().min(1, t('contact.form.errors.subjectRequired')),
    message: z.string().min(1, t('contact.form.errors.messageRequired'))
                       .min(10, t('contact.form.errors.messageMin')),
  })
}

// ── État du formulaire ─────────────────────────────────────────
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors    = ref<Partial<Record<keyof typeof form.value, string>>>({})
const isSubmitting = ref(false)
const isSuccess    = ref(false)
const hasError     = ref(false)

// ── Sujets disponibles (réactifs à la locale) ──────────────────
const subjects = computed(() => td<Subject[]>('contact.subjects'))

// Topics affichés dans la sidebar (les 7 items sans le placeholder vide)
const topics = computed(() => subjects.value.slice(1))

// Clic sur un topic → auto-fill le select + efface l'erreur subject
function selectTopic(value: string) {
  form.value.subject = value
  delete errors.value.subject
}

// Validation d'un champ unique au blur
function validateField(field: keyof typeof form.value) {
  const schema = buildSchema()
  const result = schema.shape[field].safeParse(form.value[field])
  if (!result.success) {
    errors.value[field] = result.error.issues[0].message
  } else {
    delete errors.value[field]
  }
}

// Efface l'erreur d'un champ dès que l'utilisateur retape
function clearError(field: keyof typeof form.value) {
  delete errors.value[field]
}

// ── Soumission ─────────────────────────────────────────────────
// Simulation — à remplacer par un appel API (Resend / Formspree) en production
async function handleSubmit() {
  hasError.value = false
  errors.value   = {}

  // Validation complète Zod avant envoi
  const result = buildSchema().safeParse(form.value)
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof form.value
      if (!errors.value[field]) errors.value[field] = issue.message
    })
    return
  }

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

          <h2 id="contact-form-title" class="contact-form-col__heading">{{ t('contact.form.heading') }}</h2>
          <p class="contact-form-col__sub">{{ t('contact.form.sub') }}</p>

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
                <label for="cf-name" class="cf__label">{{ t('contact.form.nameLabel') }}</label>
                <input
                  id="cf-name"
                  v-model="form.name"
                  type="text"
                  class="cf__input"
                  :class="{ 'cf__input--error': errors.name }"
                  :placeholder="t('contact.form.namePh')"
                  autocomplete="given-name"
                  :aria-describedby="errors.name ? 'cf-name-error' : undefined"
                  @blur="validateField('name')"
                  @input="clearError('name')"
                />
                <p v-if="errors.name" id="cf-name-error" class="cf__field-error" role="alert">{{ errors.name }}</p>
              </div>

              <div class="cf__field">
                <label for="cf-email" class="cf__label">{{ t('contact.form.emailLabel') }}</label>
                <input
                  id="cf-email"
                  v-model="form.email"
                  type="email"
                  class="cf__input"
                  :class="{ 'cf__input--error': errors.email }"
                  :placeholder="t('contact.form.emailPh')"
                  autocomplete="email"
                  :aria-describedby="errors.email ? 'cf-email-error' : undefined"
                  @blur="validateField('email')"
                  @input="clearError('email')"
                />
                <p v-if="errors.email" id="cf-email-error" class="cf__field-error" role="alert">{{ errors.email }}</p>
              </div>
            </div>

            <!-- Sujet -->
            <div class="cf__field">
              <label for="cf-subject" class="cf__label">{{ t('contact.form.subjectLabel') }}</label>
              <div class="cf__select-wrap">
                <select
                  id="cf-subject"
                  v-model="form.subject"
                  class="cf__select"
                  :class="{ 'cf__select--error': errors.subject }"
                  :aria-describedby="errors.subject ? 'cf-subject-error' : undefined"
                  @blur="validateField('subject')"
                  @change="clearError('subject')"
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
              <p v-if="errors.subject" id="cf-subject-error" class="cf__field-error" role="alert">{{ errors.subject }}</p>
            </div>

            <!-- Message -->
            <div class="cf__field">
              <label for="cf-message" class="cf__label">{{ t('contact.form.messageLabel') }}</label>
              <textarea
                id="cf-message"
                v-model="form.message"
                class="cf__textarea"
                :class="{ 'cf__textarea--error': errors.message }"
                :placeholder="t('contact.form.messagePh')"
                rows="5"
                :aria-describedby="errors.message ? 'cf-message-error' : undefined"
                @blur="validateField('message')"
                @input="clearError('message')"
              ></textarea>
              <p v-if="errors.message" id="cf-message-error" class="cf__field-error" role="alert">{{ errors.message }}</p>
            </div>

            <!-- Erreur serveur -->
            <p v-if="hasError" class="cf__error" role="alert">
              {{ t('contact.form.errorText') }}
              <a href="mailto:contact@johanwebstudio.fr">contact@johanwebstudio.fr</a>.
            </p>

            <!-- Submit -->
            <button
              type="submit"
              class="cf__submit"
              :disabled="isSubmitting"
              :aria-busy="isSubmitting"
            >
              <span v-if="isSubmitting" class="cf__spinner" aria-hidden="true"></span>
              <span>{{ isSubmitting ? t('contact.form.submitting') : t('contact.form.submit') }}</span>
            </button>

            <!-- Note RGPD -->
            <p class="cf__privacy">{{ t('contact.form.privacy') }}</p>

          </form>

          <!-- Succès -->
          <Transition name="success-fade" appear>
            <div v-if="isSuccess" class="cf-success" role="alert" aria-live="polite">
              <div class="cf-success__icon" aria-hidden="true">✅</div>
              <h3 class="cf-success__title">{{ t('contact.form.successTitle') }}</h3>
              <p class="cf-success__text">{{ t('contact.form.successText') }}</p>
              <button class="cf-success__again" @click="isSuccess = false">
                {{ t('contact.form.successAgain') }}
              </button>
            </div>
          </Transition>

        </div>

        <!-- ── Colonne droite : Topics + email direct ── -->
        <aside class="contact-topics-col cf-reveal" data-delay="1" aria-label="Sujets fréquents">

          <div class="contact-topics">
            <div class="contact-topics__heading">{{ t('contact.topicsHeading') }}</div>

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
            <div class="contact-direct__title">{{ t('contact.directTitle') }}</div>
            <a href="mailto:contact@johanwebstudio.fr" class="contact-direct__email">
              contact@johanwebstudio.fr
            </a>
            <p class="contact-direct__note">{{ t('contact.directNote') }}</p>
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

  // État erreur sur les champs
  &__input--error,
  &__select--error,
  &__textarea--error {
    border-color: var(--color-error) !important;
    background: #fff5f5;

    &:focus {
      border-color: var(--color-error) !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12) !important;
    }
  }

  // Message d'erreur par champ
  &__field-error {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--color-error);
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 2px;

    &::before {
      content: '⚠';
      font-size: 0.72rem;
    }
  }

  // Erreur serveur globale
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
