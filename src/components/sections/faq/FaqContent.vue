<!-- FaqContent.vue — Section principale FAQ
     - Sidebar sticky : 8 catégories avec compteurs
     - Accordéon : un seul item ouvert à la fois, chevron animé
     - Filtrage par catégorie + recherche (searchQuery prop)
     - Surbrillance des termes recherchés (<mark>)
     - État vide avec illustration
     - 33 Q&R réparties en 7 catégories -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'

// ── Types ──────────────────────────────────────────────────────
interface FaqItem {
  id:       string
  category: string
  question: string
  answer:   string
}

interface Category {
  id:    string
  emoji: string
  label: string
}

// ── Locale ─────────────────────────────────────────────────────
const { t, td } = useLocale()

// ── Props ──────────────────────────────────────────────────────
const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits<{
  (e: 'result-count', n: number): void
}>()

// ── Données réactives (locale) ─────────────────────────────────
const categories = computed(() => td<Category[]>('faq.categories'))
const items      = computed(() => td<FaqItem[]>('faq.items'))

// ── État ───────────────────────────────────────────────────────
const activeCategory = ref<string>('all')
const openId         = ref<string | null>(null)

// Quand recherche active → forcer "all"
watch(() => props.searchQuery, (q) => {
  if (q) activeCategory.value = 'all'
})

// Sélectionner une catégorie → reset accordion
function setCategory(id: string) {
  activeCategory.value = id
  openId.value = null
}

function toggleItem(id: string) {
  openId.value = openId.value === id ? null : id
}

// ── Filtrage ──────────────────────────────────────────────────
const filteredItems = computed<FaqItem[]>(() => {
  let list = activeCategory.value === 'all'
    ? items.value
    : items.value.filter((i) => i.category === activeCategory.value)

  const q = props.searchQuery.toLowerCase()
  if (q) {
    list = list.filter(
      (i) =>
        i.question.toLowerCase().includes(q) ||
        i.answer.toLowerCase().includes(q)
    )
    emit('result-count', list.length)
  }

  return list
})

// Grouper par catégorie pour la vue "all" sans recherche
const groupedItems = computed(() => {
  if (activeCategory.value !== 'all' || props.searchQuery) return null

  const groups: { cat: Category; items: FaqItem[] }[] = []
  for (const cat of categories.value.slice(1)) {
    const catItems = items.value.filter((i) => i.category === cat.id)
    if (catItems.length) groups.push({ cat, items: catItems })
  }
  return groups
})

// Compteur par catégorie dans la sidebar
function catCount(id: string): number {
  return id === 'all' ? items.value.length : items.value.filter((i) => i.category === id).length
}

// ── Surbrillance ──────────────────────────────────────────────
// Sûr car le contenu est hardcodé (pas d'input utilisateur injecté dans le HTML)
function highlight(text: string): string {
  const q = props.searchQuery.trim()
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(
    new RegExp(`(${escaped})`, 'gi'),
    '<mark>$1</mark>'
  )
}
</script>

<template>
  <section class="faq-main" aria-label="Questions fréquentes">
    <div class="container">
      <div class="faq-main__grid">

        <!-- ── Sidebar : Catégories ── -->
        <aside class="faq-sidebar" aria-label="Catégories de questions">
          <nav class="faq-nav" role="navigation">
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="faq-nav__item"
              :class="{ 'faq-nav__item--active': activeCategory === cat.id }"
              type="button"
              :aria-current="activeCategory === cat.id ? 'true' : undefined"
              @click="setCategory(cat.id)"
            >
              <span class="faq-nav__emoji" aria-hidden="true">{{ cat.emoji }}</span>
              <span class="faq-nav__label">{{ cat.label }}</span>
              <span class="faq-nav__count">{{ catCount(cat.id) }}</span>
            </button>
          </nav>
        </aside>

        <!-- ── Contenu : Accordéon ── -->
        <div class="faq-content" role="main">

          <!-- Vue "all" sans recherche : groupes par catégorie -->
          <template v-if="groupedItems">
            <div
              v-for="group in groupedItems"
              :key="group.cat.id"
              class="faq-group"
            >
              <!-- En-tête de groupe -->
              <div class="faq-group__header" aria-hidden="true">
                <span class="faq-group__icon">{{ group.cat.emoji }}</span>
                <span class="faq-group__name">{{ group.cat.label }}</span>
              </div>

              <!-- Items du groupe -->
              <div class="faq-list">
                <div
                  v-for="item in group.items"
                  :key="item.id"
                  class="faq-item"
                  :class="{ 'faq-item--open': openId === item.id }"
                >
                  <button
                    :id="`faq-q-${item.id}`"
                    class="faq-item__trigger"
                    type="button"
                    :aria-expanded="openId === item.id"
                    :aria-controls="`faq-a-${item.id}`"
                    @click="toggleItem(item.id)"
                  >
                    <span class="faq-item__question">{{ item.question }}</span>
                    <span class="faq-item__chevron" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                  </button>

                  <div
                    :id="`faq-a-${item.id}`"
                    class="faq-item__answer"
                    role="region"
                    :aria-labelledby="`faq-q-${item.id}`"
                  >
                    <p class="faq-item__text">{{ item.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Vue filtrée (catégorie spécifique ou recherche) -->
          <template v-else-if="filteredItems.length">
            <div class="faq-list">
              <div
                v-for="item in filteredItems"
                :key="item.id"
                class="faq-item"
                :class="{ 'faq-item--open': openId === item.id }"
              >
                <button
                  :id="`faq-q-${item.id}`"
                  class="faq-item__trigger"
                  type="button"
                  :aria-expanded="openId === item.id"
                  :aria-controls="`faq-a-${item.id}`"
                  @click="toggleItem(item.id)"
                >
                  <!-- eslint-disable vue/no-v-html -->
                  <span class="faq-item__question" v-html="highlight(item.question)"></span>
                  <span class="faq-item__chevron" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </span>
                </button>

                <div
                  :id="`faq-a-${item.id}`"
                  class="faq-item__answer"
                  role="region"
                  :aria-labelledby="`faq-q-${item.id}`"
                >
                  <!-- eslint-disable vue/no-v-html -->
                  <p class="faq-item__text" v-html="highlight(item.answer)"></p>
                </div>
              </div>
            </div>
          </template>

          <!-- État vide (recherche sans résultat) -->
          <div v-else class="faq-empty" role="alert" aria-live="polite">
            <div class="faq-empty__icon" aria-hidden="true">🤔</div>
            <p class="faq-empty__text">
              {{ t('faq.empty.noMatch') }}<br>
              {{ t('faq.empty.tryOther') }}
              <RouterLink to="/contact" class="faq-empty__link">{{ t('faq.empty.contactLink') }}</RouterLink>.
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/abstracts/mixins' as m;

// ── Section ───────────────────────────────────────────────────
.faq-main {
  background: white;
  padding: 64px 0 80px;

  @include m.respond-to(md) { padding: 80px 0 100px; }

  &__grid {
    display: grid;
    gap: 48px;
    align-items: start;

    @include m.respond-to(lg) {
      grid-template-columns: 240px 1fr;
      gap: 56px;
    }
  }
}

// ── Sidebar ───────────────────────────────────────────────────
.faq-sidebar {
  @include m.respond-to(lg) {
    position: sticky;
    top: calc(var(--header-h, 72px) + 24px);
  }
}

.faq-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @include m.respond-to(lg) {
    flex-direction: column;
    gap: 4px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: var(--radius-md);
    border: none;
    background: transparent;
    font-family: var(--font-body);
    font-size: 0.87rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: background var(--transition), color var(--transition);

    &:hover { background: var(--color-surface); }

    &--active {
      background: rgba(102, 126, 234, 0.1);
      color: var(--color-primary);

      .faq-nav__count {
        background: var(--color-primary);
        color: white;
      }
    }
  }

  &__emoji { font-size: 1rem; flex-shrink: 0; }

  &__label { flex: 1; }

  &__count {
    font-size: 0.7rem;
    font-weight: 700;
    background: var(--color-surface-dark);
    color: var(--color-text-light);
    padding: 2px 7px;
    border-radius: var(--radius-full);
    min-width: 22px;
    text-align: center;
    transition: background var(--transition), color var(--transition);
  }
}

// ── Groupes ───────────────────────────────────────────────────
.faq-group {
  margin-bottom: 48px;

  &:last-child { margin-bottom: 0; }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--color-surface-dark);
  }

  &__icon { font-size: 1.1rem; }

  &__name {
    font-family: var(--font-display);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-light);
  }
}

// ── Liste FAQ ─────────────────────────────────────────────────
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

// ── Item accordéon ────────────────────────────────────────────
.faq-item {
  border: 1.5px solid var(--color-surface-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition), box-shadow var(--transition);

  &--open {
    border-color: var(--color-primary-light);
    box-shadow: var(--shadow-sm);

    .faq-item__chevron {
      transform: rotate(180deg);
      color: var(--color-primary);
    }

    .faq-item__trigger { background: rgba(102, 126, 234, 0.04); }
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    padding: 16px 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background var(--transition);

    &:hover { background: var(--color-surface); }
  }

  &__question {
    font-family: var(--font-body);
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.5;
    flex: 1;
  }

  &__chevron {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--color-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-light);
    transition: transform 0.25s ease, color var(--transition), background var(--transition);

    .faq-item--open & {
      background: rgba(102, 126, 234, 0.12);
      color: var(--color-primary);
    }
  }

  // Réponse (ouverte/fermée via max-height)
  &__answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;

    .faq-item--open & { max-height: 500px; }
  }

  &__text {
    padding: 0 18px 18px;
    font-size: 0.88rem;
    color: var(--color-text-secondary);
    line-height: 1.8;
  }
}

// ── Surbrillance recherche ─────────────────────────────────────
:deep(mark) {
  background: rgba(255, 215, 0, 0.35);
  color: inherit;
  border-radius: 3px;
  padding: 0 2px;
}

// ── État vide ─────────────────────────────────────────────────
.faq-empty {
  text-align: center;
  padding: 56px 20px;

  &__icon { font-size: 2.5rem; margin-bottom: 16px; }

  &__text {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.75;
  }

  &__link {
    color: var(--color-primary);
    font-weight: 700;
    text-decoration: underline;
  }
}
</style>
