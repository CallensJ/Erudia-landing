// Router Vue — Routes de la landing Erudia
// Architecture : /:locale(fr|en)/* — sous-répertoires bilingues pour le SEO hreflang.
// La racine / redirige vers /${langue_stockée}/ (défaut : /fr/).
// Navigation guard : synchronise la locale de l'URL → useLocale singleton.
//
// MODE PRÉ-LANCEMENT : COMING_SOON_MODE = true
// Toutes les routes sont redirigées vers /coming-soon via un guard global.
// Désactiver ce flag après le lancement du 15 avril 2026.
import { createRouter, createWebHistory } from 'vue-router'
import { syncLocale, type Locale } from '@/composables/useLocale'

const COMING_SOON_MODE = true

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // ── Page en construction (pré-lancement) ─────────────────────────────────
    {
      path: '/coming-soon',
      name: 'coming-soon',
      component: () => import('@/views/ComingSoonView.vue'),
    },
    {
      // Redirige / vers la locale persistée ou /fr/ par défaut
      path: '/',
      redirect: () => {
        const stored =
          typeof localStorage !== 'undefined'
            ? (localStorage.getItem('erudia_lang') as Locale | null)
            : null
        return `/${stored ?? 'fr'}`
      },
    },
    {
      // Wrapper locale — toutes les pages sont enfants de /:locale
      path: '/:locale(fr|en)',
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'features',
          name: 'features',
          component: () => import('@/views/FeaturesView.vue'),
        },
        {
          path: 'how-it-works',
          name: 'how-it-works',
          component: () => import('@/views/HowItWorksView.vue'),
        },
        {
          path: 'pricing',
          name: 'pricing',
          component: () => import('@/views/PricingView.vue'),
        },
        {
          path: 'faq',
          name: 'faq',
          component: () => import('@/views/FaqView.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/ContactView.vue'),
        },
        {
          path: 'legal/privacy',
          name: 'privacy',
          component: () => import('@/views/legal/PrivacyView.vue'),
        },
        {
          path: 'legal/terms',
          name: 'terms',
          component: () => import('@/views/legal/TermsView.vue'),
        },
        {
          path: 'legal/mentions',
          name: 'mentions',
          component: () => import('@/views/legal/MentionsView.vue'),
        },
      ],
    },
  ],
})

// Guard global — mode pré-lancement
// Redirige toutes les routes vers /coming-soon sauf la page elle-même.
// Désactiver COMING_SOON_MODE après le lancement.
router.beforeEach((to) => {
  if (COMING_SOON_MODE && to.name !== 'coming-soon') {
    return { name: 'coming-soon' }
  }

  // Synchronise la locale de l'URL → singleton useLocale
  const localeParam = to.params.locale
  if (localeParam && typeof localeParam === 'string') {
    syncLocale(localeParam as Locale)
  }
})

export default router
