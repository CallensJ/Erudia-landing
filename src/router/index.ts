// Router Vue — Routes de la landing Erudia
// Architecture : /:locale(fr|en)/* — sous-répertoires bilingues pour le SEO hreflang.
// La racine / redirige vers /${langue_stockée}/ (défaut : /fr/).
// Navigation guard : synchronise la locale de l'URL → useLocale singleton.
import { createRouter, createWebHistory } from 'vue-router'
import { syncLocale, type Locale } from '@/composables/useLocale'
import { useAnalytics } from '@/composables/useAnalytics'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
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
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
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

// Synchronise la locale de l'URL → singleton useLocale
// Permet à un lien direct /en/features de basculer la locale sans action utilisateur
router.beforeEach((to) => {
  const localeParam = to.params.locale
  if (localeParam && typeof localeParam === 'string') {
    syncLocale(localeParam as Locale)
  }
})

// Envoie un page_view GA4 à chaque navigation
router.afterEach((to) => {
  const { trackPageView } = useAnalytics()
  // nextTick simulé via setTimeout(0) : document.title est mis à jour par useSeoHead
  setTimeout(() => trackPageView(to.fullPath), 0)
})

export default router
