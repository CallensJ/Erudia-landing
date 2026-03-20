<!-- FaqContent.vue — Section principale FAQ
     - Sidebar sticky : 8 catégories avec compteurs
     - Accordéon : un seul item ouvert à la fois, chevron animé
     - Filtrage par catégorie + recherche (searchQuery prop)
     - Surbrillance des termes recherchés (<mark>)
     - État vide avec illustration
     - 33 Q&R réparties en 7 catégories -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

// ── Props ──────────────────────────────────────────────────────
const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits<{
  (e: 'result-count', n: number): void
}>()

// ── Données : Catégories ───────────────────────────────────────
const categories: Category[] = [
  { id: 'all',       emoji: '🔍', label: 'Toutes les questions' },
  { id: 'safety',    emoji: '🔒', label: 'Sécurité & vie privée' },
  { id: 'content',   emoji: '📚', label: 'Contenu pédagogique' },
  { id: 'offline',   emoji: '📡', label: 'Mode hors ligne' },
  { id: 'account',   emoji: '👤', label: 'Compte & profil' },
  { id: 'parent',    emoji: '👨‍👩‍👧', label: 'Espace parent' },
  { id: 'billing',   emoji: '💳', label: 'Abonnement & paiement' },
  { id: 'technical', emoji: '⚙️', label: 'Technique' },
]

// ── Données : Q&R ─────────────────────────────────────────────
const items: FaqItem[] = [

  // ── Sécurité ──────────────────────────────────────────────
  {
    id: 'safety-1',
    category: 'safety',
    question: "Est-ce que l'app est sûre pour mon enfant ?",
    answer:   "Oui. Erudia ne collecte aucune donnée personnelle sur votre enfant — pas de nom réel, pas d'email, pas de photo. L'enfant joue avec un pseudonyme et un avatar choisis par lui. L'app est conçue dans le respect du RGPD et du standard COPPA (États-Unis). Aucune publicité, aucun tracker tiers.",
  },
  {
    id: 'safety-2',
    category: 'safety',
    question: "Erudia collecte-t-il des données sur mon enfant ?",
    answer:   "Non. Le profil enfant contient uniquement un pseudonyme, un avatar (image générée, pas une vraie photo), et les scores/badges en local. Aucun email enfant. L'email adulte n'est utilisé que dans l'espace parent, protégé par authentification Supabase.",
  },
  {
    id: 'safety-3',
    category: 'safety',
    question: "Y a-t-il des publicités dans l'app ?",
    answer:   "Aucune. Zéro pub, zéro tracker, zéro revente de données. Le modèle économique d'Erudia repose uniquement sur l'abonnement Erudia+ — pas sur la publicité.",
  },
  {
    id: 'safety-4',
    category: 'safety',
    question: "Mon enfant peut-il interagir avec d'autres utilisateurs ?",
    answer:   "Erudia propose un mode duel asynchrone (Erudia+) : votre enfant peut partager un code à 6 caractères avec un proche pour jouer les mêmes questions et comparer les scores. Il n'y a aucun chat, aucune messagerie, aucun réseau social. L'activation de ce mode nécessite la validation d'un parent depuis l'espace admin.",
  },

  // ── Contenu ────────────────────────────────────────────────
  {
    id: 'content-1',
    category: 'content',
    question: "Quelles matières sont couvertes ?",
    answer:   "En version gratuite : Sciences (300 questions), Histoire (500 questions), Héros (75 questions). Erudia+ ajoute Sport, Géographie, Culture et Art — soit 7 catégories au total. Toutes les questions sont disponibles en français et en anglais.",
  },
  {
    id: 'content-2',
    category: 'content',
    question: "Le contenu est-il adapté à l'âge de mon enfant ?",
    answer:   "L'interface est conçue pour les 6–11 ans : gros boutons, icônes, lisibilité maximale. Le contenu propose 3 niveaux (Facile, Moyen, Difficile) — le niveau Hard dépasse volontairement le primaire pour proposer un vrai défi sur le long terme.",
  },
  {
    id: 'content-3',
    category: 'content',
    question: "Les questions sont-elles alignées sur les programmes scolaires ?",
    answer:   "Oui. Les questions sont validées pédagogiquement sur les programmes français (CP → 6e) et le curriculum international (Grade 1 → 6). Le niveau Difficile couvre jusqu'en 4e pour offrir un challenge progressif.",
  },
  {
    id: 'content-4',
    category: 'content',
    question: "Combien de questions sont disponibles ?",
    answer:   "Plus de 800 questions au lancement, réparties sur 3 catégories gratuites en FR et EN. Le catalogue est enrichi régulièrement. Erudia+ ajoute plusieurs centaines de questions supplémentaires.",
  },
  {
    id: 'content-5',
    category: 'content',
    question: "Les questions sont-elles disponibles en anglais ?",
    answer:   "Oui, toutes les questions et l'interface complète sont disponibles en français et en anglais dès le lancement. Idéal pour les familles bilingues ou pour l'immersion linguistique.",
  },

  // ── Hors ligne ────────────────────────────────────────────
  {
    id: 'offline-1',
    category: 'offline',
    question: "Peut-on vraiment jouer sans internet ?",
    answer:   "Oui. Erudia est une PWA (Progressive Web App) qui met en cache les questions et l'interface dès la première visite. En mode avion, dans un tunnel ou en zone blanche — l'app fonctionne normalement.",
  },
  {
    id: 'offline-2',
    category: 'offline',
    question: "Comment installer l'app hors ligne ?",
    answer:   "Sur mobile iOS : ouvrez Erudia dans Safari → « Partager » → « Sur l'écran d'accueil ». Sur Android : Chrome → menu (⋮) → « Ajouter à l'écran d'accueil ». Sur desktop : Chrome affiche une icône d'installation dans la barre d'adresse. Après installation, l'app fonctionne comme une app native.",
  },
  {
    id: 'offline-3',
    category: 'offline',
    question: "Les scores sont-ils perdus si je joue hors ligne ?",
    answer:   "Non. Les scores et badges sont sauvegardés en local (localStorage). Dès que la connexion est rétablie, la synchronisation avec Supabase se fait automatiquement en arrière-plan — aucune action de votre part.",
  },
  {
    id: 'offline-4',
    category: 'offline',
    question: "Faut-il être connecté pour débloquer Erudia+ ?",
    answer:   "La connexion internet est nécessaire pour l'achat et la vérification du statut premium. Une fois Erudia+ activé, vous pouvez jouer hors ligne avec toutes les fonctionnalités débloquées.",
  },

  // ── Compte ────────────────────────────────────────────────
  {
    id: 'account-1',
    category: 'account',
    question: "Faut-il créer un compte pour jouer ?",
    answer:   "Non. Il suffit de choisir un pseudonyme et un avatar — pas d'email, pas de mot de passe pour l'enfant. Le profil est stocké localement et synchronisé en arrière-plan avec Supabase si vous êtes connecté.",
  },
  {
    id: 'account-2',
    category: 'account',
    question: "Peut-on avoir plusieurs profils enfants ?",
    answer:   "En version gratuite : 1 profil par appareil. Avec Erudia+ : nombre de profils illimité, idéal pour les familles avec plusieurs enfants ou pour jouer sur plusieurs appareils.",
  },
  {
    id: 'account-3',
    category: 'account',
    question: "Comment modifier l'avatar ou le pseudo de l'enfant ?",
    answer:   "Depuis l'écran Profil de l'enfant, un bouton d'édition permet de changer le pseudonyme et de choisir un nouvel avatar dans la galerie. Le changement est immédiat et sauvegardé localement.",
  },
  {
    id: 'account-4',
    category: 'account',
    question: "Que se passe-t-il si je change d'appareil ?",
    answer:   "Si la synchronisation Supabase est active (compte adulte créé), tous les scores, badges et le profil sont accessibles depuis n'importe quel appareil. Sans sync, les données restent sur l'appareil d'origine.",
  },

  // ── Espace parent ─────────────────────────────────────────
  {
    id: 'parent-1',
    category: 'parent',
    question: "Comment accéder à l'espace parent ?",
    answer:   "Un bouton discret « Espace parent » en bas de l'écran Profil permet d'accéder à l'admin. L'accès nécessite une authentification Supabase (email + mot de passe ou Google). Pas besoin de créer un compte parent séparé.",
  },
  {
    id: 'parent-2',
    category: 'parent',
    question: "Que puis-je voir dans l'espace parent ?",
    answer:   "Scores par catégorie, streaks, badges obtenus, nombre de parties jouées, objectif journalier et son statut. Avec Erudia+, accédez aussi aux graphiques de progression et aux recommandations pédagogiques.",
  },
  {
    id: 'parent-3',
    category: 'parent',
    question: "Puis-je recevoir des rapports par email ?",
    answer:   "Oui, avec Erudia+. Depuis l'espace admin, vous pouvez configurer l'envoi automatique hebdomadaire ou mensuel d'un rapport PDF, ou le télécharger/envoyer manuellement à tout moment.",
  },
  {
    id: 'parent-4',
    category: 'parent',
    question: "Comment définir un objectif journalier ?",
    answer:   "Dans l'espace admin, vous choisissez un objectif (ex : 20 bonnes réponses par jour). L'app suit cet objectif et peut envoyer une notification email en fin de journée si l'objectif n'est pas atteint.",
  },

  // ── Facturation ───────────────────────────────────────────
  {
    id: 'billing-1',
    category: 'billing',
    question: "L'abonnement se renouvelle-t-il automatiquement ?",
    answer:   "Oui, mensuel ou annuel selon votre choix. Un email de rappel est envoyé 7 jours avant le renouvellement. Vous pouvez annuler à tout moment — vous gardez l'accès Erudia+ jusqu'à la fin de la période payée.",
  },
  {
    id: 'billing-2',
    category: 'billing',
    question: "Comment annuler mon abonnement ?",
    answer:   "Dans l'espace admin → section Abonnement → bouton Annuler. L'annulation est instantanée, sans formulaire ni email. Vous conservez l'accès aux fonctionnalités premium jusqu'à la fin du cycle en cours.",
  },
  {
    id: 'billing-3',
    category: 'billing',
    question: "Puis-je obtenir un remboursement ?",
    answer:   "Oui, remboursement intégral dans les 14 jours suivant l'achat, sans condition. Envoyez l'email de confirmation de commande Stripe à support@erudia.app — traitement sous 5 jours ouvrés.",
  },
  {
    id: 'billing-4',
    category: 'billing',
    question: "Mes données de paiement sont-elles sécurisées ?",
    answer:   "Erudia utilise Stripe, leader mondial du paiement en ligne. Erudia ne stocke jamais vos coordonnées bancaires. Toutes les transactions sont chiffrées et conformes à la norme PCI DSS.",
  },

  // ── Technique ─────────────────────────────────────────────
  {
    id: 'technical-1',
    category: 'technical',
    question: "Sur quels appareils fonctionne Erudia ?",
    answer:   "Tous les navigateurs modernes (Chrome, Safari, Firefox, Edge), mobile iOS 14+, Android 8+, tablette, desktop. Erudia est une PWA — pas besoin de passer par l'App Store ou le Play Store.",
  },
  {
    id: 'technical-2',
    category: 'technical',
    question: "Quelle est la taille de l'app ?",
    answer:   "2 à 4 Mo de cache initial (questions + interface). Contrairement à une app native, l'espace de stockage est minimal et aucune installation via boutique n'est nécessaire.",
  },
  {
    id: 'technical-3',
    category: 'technical',
    question: "L'app fonctionne-t-elle sur iPhone/iPad ?",
    answer:   "Oui, Erudia est optimisée pour Safari iOS 14+. Pour la meilleure expérience, ajoutez l'app à votre écran d'accueil via Safari. Note : iOS a quelques limitations vs Android (notamment les notifications push).",
  },
  {
    id: 'technical-4',
    category: 'technical',
    question: "Mes données sont-elles hébergées en Europe ?",
    answer:   "Oui. Supabase est configuré sur la région Europe (Frankfurt). Vos données ne quittent pas l'Union européenne. Erudia est conforme au RGPD.",
  },
]

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
    ? items
    : items.filter((i) => i.category === activeCategory.value)

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
  for (const cat of categories.slice(1)) {
    const catItems = items.filter((i) => i.category === cat.id)
    if (catItems.length) groups.push({ cat, items: catItems })
  }
  return groups
})

// Compteur par catégorie dans la sidebar
function catCount(id: string): number {
  return id === 'all' ? items.length : items.filter((i) => i.category === id).length
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
              Aucune question ne correspond à votre recherche.<br>
              Essayez un autre terme ou
              <RouterLink to="/contact" class="faq-empty__link">contactez-nous</RouterLink>.
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
