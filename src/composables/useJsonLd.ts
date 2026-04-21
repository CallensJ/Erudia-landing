// useJsonLd.ts — Composable pour injecter les schémas JSON-LD (Schema.org) via @unhead/vue
// Implémente la section 6 du SEO checklist Erudia :
// 6.1 WebSite · 6.2 Organization · 6.3 SoftwareApplication · 6.4 FAQPage · 6.5 BreadcrumbList
// Injection via <script type="application/ld+json"> dans le <head> de chaque page concernée.

import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useLocale } from './useLocale'

const BASE_URL = 'https://erudia.app'
const APP_URL  = 'https://app.erudia.app'

// ── 6.1 WebSite ──────────────────────────────────────────────────────────────

/**
 * Schéma WebSite avec SearchAction — active la sitelinks search box Google.
 * L'URL cible pointe vers la page FAQ bilingue FR (langue principale).
 * À injecter sur la page d'accueil uniquement.
 */
export function useWebSiteJsonLd() {
  useHead(
    computed(() => ({
      script: [
        {
          key: 'json-ld-website',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Erudia',
            url: BASE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/fr/faq?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        },
      ],
    })),
  )
}

// ── 6.2 Organization ─────────────────────────────────────────────────────────

/**
 * Schéma Organization — identité de JohanWebStudio / Erudia.
 * ⚠️  logo : créer /public/images/logo.png (512×512) avant le launch.
 * À injecter sur la page d'accueil.
 */
export function useOrganizationJsonLd() {
  useHead(
    computed(() => ({
      script: [
        {
          key: 'json-ld-organization',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'JohanWebStudio',
            url: BASE_URL,
            logo: `${BASE_URL}/images/logo.png`,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'contact@erudia.app',
            },
          }),
        },
      ],
    })),
  )
}

// ── 6.3 SoftwareApplication ──────────────────────────────────────────────────

/**
 * Schéma SoftwareApplication — Erudia comme app éducative PWA.
 * price: "0" = plan gratuit disponible (Offer représente le tier d'entrée).
 * À injecter sur la page d'accueil (ou /features).
 */
export function useSoftwareAppJsonLd() {
  useHead(
    computed(() => ({
      script: [
        {
          key: 'json-ld-software-app',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Erudia',
            url: APP_URL,
            operatingSystem: 'Web, iOS, Android (PWA)',
            applicationCategory: 'EducationalApplication',
            inLanguage: ['fr', 'en'],
            description:
              'Application de quiz éducatifs bilingue FR/EN pour enfants de 6 à 11 ans. Fonctionne hors ligne, sans publicité, conforme RGPD.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
              description: 'Version gratuite avec 3 catégories',
            },
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'student',
              audienceType: 'Enfants 6-11 ans',
            },
            publisher: {
              '@type': 'Organization',
              name: 'JohanWebStudio',
              url: BASE_URL,
            },
          }),
        },
      ],
    })),
  )
}

// ── 6.4 FAQPage ──────────────────────────────────────────────────────────────

/**
 * Schéma FAQPage — 10 questions-réponses clés (FR) pour le rich snippet Google.
 * Sélection basée sur les requêtes parentes les plus fréquentes :
 * sécurité enfant, contenu pédagogique, mode hors ligne, abonnement.
 * À injecter uniquement sur /faq.
 */
export function useFaqPageJsonLd() {
  useHead(
    computed(() => ({
      script: [
        {
          key: 'json-ld-faq',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "Est-ce que l'app est sûre pour mon enfant ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Oui. Erudia ne collecte aucune donnée personnelle sur votre enfant — pas de nom réel, pas d'email, pas de photo. L'enfant joue avec un pseudonyme et un avatar choisis par lui. L'app est conçue dans le respect du RGPD et du standard COPPA. Aucune publicité, aucun tracker tiers.",
                },
              },
              {
                '@type': 'Question',
                name: "Y a-t-il des publicités dans l'app ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Aucune. Zéro pub, zéro tracker, zéro revente de données. Le modèle économique d'Erudia repose uniquement sur l'abonnement Erudia+ — pas sur la publicité.",
                },
              },
              {
                '@type': 'Question',
                name: 'Quelles matières sont couvertes ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'En version gratuite : Sciences (300 questions), Histoire (500 questions), Héros (75 questions). Erudia+ ajoute Sport, Géographie, Culture et Art. Toutes les questions sont disponibles en français et en anglais.',
                },
              },
              {
                '@type': 'Question',
                name: "Le contenu est-il adapté à l'âge de mon enfant ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "L'interface est conçue pour les 6–11 ans : gros boutons, icônes, lisibilité maximale. Le contenu propose 3 niveaux (Facile, Moyen, Difficile) — le niveau Difficile dépasse volontairement le primaire pour proposer un vrai défi sur le long terme.",
                },
              },
              {
                '@type': 'Question',
                name: 'Peut-on vraiment jouer sans internet ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Oui. Erudia est une PWA (Progressive Web App) qui met en cache les questions et l'interface dès la première visite. En mode avion, dans un tunnel ou en zone blanche — l'app fonctionne normalement.",
                },
              },
              {
                '@type': 'Question',
                name: "Comment installer l'app hors ligne ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Sur mobile iOS : ouvrez Erudia dans Safari → « Partager » → « Sur l'écran d'accueil ». Sur Android : Chrome → menu → « Ajouter à l'écran d'accueil ». Après installation, l'app fonctionne comme une app native.",
                },
              },
              {
                '@type': 'Question',
                name: 'Faut-il créer un compte pour jouer ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Non. Il suffit de choisir un pseudonyme et un avatar — pas d'email, pas de mot de passe pour l'enfant. Le profil est stocké localement.",
                },
              },
              {
                '@type': 'Question',
                name: "L'abonnement se renouvelle-t-il automatiquement ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Oui, mensuel ou annuel selon votre choix. Un email de rappel est envoyé 7 jours avant le renouvellement. Vous pouvez annuler à tout moment — vous gardez l'accès Erudia+ jusqu'à la fin de la période payée.",
                },
              },
              {
                '@type': 'Question',
                name: 'Puis-je obtenir un remboursement ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Oui, remboursement intégral dans les 14 jours suivant l'achat, sans condition. Envoyez l'email de confirmation à support@erudia.app — traitement sous 5 jours ouvrés.",
                },
              },
              {
                '@type': 'Question',
                name: 'Mes données de paiement sont-elles sécurisées ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Erudia utilise Stripe, leader mondial du paiement en ligne. Erudia ne stocke jamais vos coordonnées bancaires. Toutes les transactions sont chiffrées et conformes à la norme PCI DSS.',
                },
              },
            ],
          }),
        },
      ],
    })),
  )
}

// ── 6.5 BreadcrumbList ───────────────────────────────────────────────────────

interface BreadcrumbPage {
  /** Libellé bilingue de la page courante */
  label: { fr: string; en: string }
  /** Chemin sans locale — ex: '/features' */
  path: string
}

/**
 * Schéma BreadcrumbList réactif — s'adapte à la locale active.
 * Structure : Erudia (home) › [page courante]
 * À injecter dans toutes les pages sauf la home.
 */
export function useBreadcrumbJsonLd(page: BreadcrumbPage) {
  const { locale } = useLocale()

  useHead(
    computed(() => ({
      script: [
        {
          key: 'json-ld-breadcrumb',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Erudia',
                item: `${BASE_URL}/${locale.value}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: locale.value === 'fr' ? page.label.fr : page.label.en,
                item: `${BASE_URL}/${locale.value}${page.path}`,
              },
            ],
          }),
        },
      ],
    })),
  )
}
