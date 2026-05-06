// fr.ts — Toutes les chaînes de l'interface en français
// Utilisé par useLocale() : t('clé.point') pour les strings, td<T>('clé') pour les tableaux

export const fr = {
  // ── Navigation ───────────────────────────────────────────────
  nav: {
    features: "Fonctionnalités",
    howItWorks: "Comment ça marche",
    pricing: "Tarifs",
    faq: "FAQ",
    contact: "Contact",
    about: "À propos",
    changelog: "Nouveautés",
    explorer: "Explorer",
    cta: "Jouer maintenant",
    menu: "Menu",
  },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    tagline:
      "Le quiz éducatif que les enfants aiment et les parents approuvent.",
    navTitle: "Application",
    legalTitle: "Légal",
    newsletter: {
      title: "Restez informés",
      description:
        "Nouveautés, conseils pédagogiques, mises à jour — sans spam.",
      placeholder: "votre@email.com",
      subscribe: "S'inscrire à la newsletter",
      success: "✓ Merci ! On vous tiendra au courant.",
      error: "Une erreur est survenue. Réessayez.",
      ariaInput: "Votre adresse email",
    },
    copyright:
      "© {year} Erudia — Conçu avec ❤️ pour les curieux de 6 à 11 ans.",
    badgeCoppa: " COPPA compliant",
    badgeOffline: " Offline-first",
    badgeLangs: " FR / EN",
    links: {
      mentions: "Mentions légales",
      privacy: "Politique de confidentialité",
      terms: "CGU",
    },
  },

  // ── Accueil ──────────────────────────────────────────────────
  home: {
    hero: {
      title1: "Le quiz éducatif offline,",
      title2: "que vos enfants vont adorer.",
      subline:
        "Erudia est le quiz éducatif conçu pour les enfants de 6 à 11 ans. Mode hors ligne, bilingue FR/EN, suivi parental intégré et sans publicité.",
      ctaPrimary: " Jouer maintenant",
      ctaSecondary: "Voir comment ça marche",
      proofOffline: "Mode hors ligne",
      proofCoppa: "COPPA compliant",
      proofBilingual: "FR / EN",
      proofFree: "100% gratuit",
      badge1: "🏆 Badge débloqué !",
      badge2: "🔥 Série de 5 jours",
      score: "Score",
      question: "Question 12 / 20",
      questionText:
        "Quel est l'organe qui pompe le sang dans le corps humain ?",
      answerA: "Le poumon",
      answerB: "Le cœur",
      answerC: "Le foie",
      answerD: "Le cerveau",
    },
    problem: {
      pill: "Conçu pour le quotidien",
      title: "Des situations que tout parent connaît",
      subline:
        "Erudia est né de ces petits moments du quotidien et de l'envie de les transformer en occasions d'apprendre.",
      item1Title: "En route, en vacances…",
      item1Problem:
        "Le trajet de 40 minutes la salle d'attente, autant de moments où l'on voudrait que l'apprentissage continue, naturellement.",
      item1Solution:
        "Erudia fonctionne sans connexion. Les contenus se téléchargent une fois, et c'est parti. Peu importe où se trouve votre enfant.",
      item2Title: "Garder le goût d'apprendre",
      item2Problem:
        "Maintenir la curiosité d'un enfant, c'est délicat. Trop facile, il s'ennuie. Trop difficile, il décroche. Le bon équilibre change selon les jours.",
      item2Solution:
        "Trois niveaux de difficulté, des encouragements à chaque étape, et des défis quotidiens calibrés pour que chaque session se termine sur une victoire.",
      item3Title: "Savoir où en est son enfant",
      item3Problem:
        "On sent bien que notre enfant progresse, mais avoir une vision claire de ses points forts, de ce qu'il maîtrise vraiment, c'est souvent flou.",
      item3Solution:
        "Le tableau de bord parental d'Erudia donne une vue honnête et simple : scores par catégorie, régularité, badges obtenus.",
      closing:
        "Erudia a été pensé par des parents, pour des parents et surtout pour les enfants.",
    },
    features: {
      pill: "Ce qui fait la différence",
      title: "Conçu pour s'intégrer dans votre vie",
      subline:
        "Pas une app de plus à gérer. Une habitude douce, qui grandit avec votre enfant.",
      card1Tag: "Disponible partout",
      card1Title: "Même sans WiFi",
      card1Desc:
        "Dans le train,en vacances Erudia fonctionne hors ligne. Toujours là, quand vous en avez besoin.",
      card2Tag: "Ils vont adorer",
      card2Title: "Apprendre en gagnant",
      card2Desc:
        "Badges, défis quotidiens, collections secrètes à débloquer… Chaque bonne réponse est une victoire. Et il y a encore plus à découvrir.",
      card2Badge: "✨ Favori des enfants",
      card3Tag: "Pour les parents",
      card3Title: "Vous restez aux commandes",
      card3Desc:
        "Votre compte parent vous donne accès au tableau de bord : scores par catégorie, régularité, objectifs — en un coup d'œil. L'enfant consulte aussi ses propres statistiques depuis son profil.",
      cta: "Voir toutes les fonctionnalités",
    },
    pedago: {
      pill: "Philosophie pédagogique",
      title: "Conçu pour 6–11 ans.",
      titleAccent: "Challengé jusqu'au collège.",
      p1: "L'interface d'Erudia est pensée pour les enfants : boutons larges, icônes expressives, mascotte Nova. Un enfant de 6 ans peut naviguer seul.",
      p2: "Mais le contenu des questions s'étend jusqu'au niveau collège. Ce n'est pas un accident, c'est un choix pédagogique assumé. Erudia vise à ce que votre enfant apprenne quelque chose à chaque partie, pas seulement confirmer ce qu'il sait déjà.",
      note: "💡 Un score de 8/20 n'est pas un échec, c'est une invitation à grandir.",
      level1Name: "Facile — Notions fondamentales",
      level1Desc: "Programme primaire, accessible dès 6 ans",
      level2Name: "Moyen — Approfondissement",
      level2Desc: "CM1–CM2, culture générale élargie",
      level3Name: "Difficile — Niveau collège",
      level3Desc: "Culture internationale, programme 6e–4e",
      stat1Num: "600+",
      stat1Title: "Questions / catégorie",
      stat1Desc: "Alignées sur les programmes scolaires",
      stat2Num: "21",
      stat2Title: "Catégories",
      stat2Desc:
        "Sciences, Histoire, Héros, Géographie, Espace, Mythologie et plus",
      stat3Num: "3×",
      stat3Title: "Niveaux de difficulté",
      stat3Desc: "Easy → Medium → Hard pour progresser à son propre rythme",
      stat4Num: "FR EN",
      stat4Title: "Bilingue",
      stat4Desc:
        "Questions et interface complètes en français et en anglais. La version anglaise suit une approche FLE alignée sur le CECRL (Cadre Européen Commun de Référence pour les Langues).",
    },
    pricingTeaser: {
      pill: "Tarifs",
      title: "Simple et transparent",
      subline:
        "Le plan gratuit est pleinement jouable. Le premium débloque davantage de contenu.",
      freeLabel: "Gratuit",
      freePrice: "0€",
      freePeriod: "Pour toujours",
      freeF1: "3 catégories de quiz",
      freeF2: "Badges & défi quotidien",
      freeF3: "Mode duel asynchrone",
      freeF4: "Mode hors ligne (PWA)",
      freeF5: "Bilingue FR / EN",
      freeF6: "1 profil enfant",
      freeCta: "Commencer gratuitement",
      premiumBadge: "",
      premiumLabel: "Erudia+",
      premiumPrice: "1,99€",
      premiumPeriod: "/ mois · ou 9,99€ / 6 mois (économisez 2€)",
      premiumF1: "Toutes les catégories (21)",
      premiumF2: "Avatars premium DiceBear",
      premiumF3: "Dashboard parent avancé",
      premiumF4: "Rapports PDF par email",
      premiumF5: "Profils enfants illimités",
      premiumF6: "Historique cloud illimité",
      premiumCta: "Passer à Erudia+",
      note: "Annulation à tout moment · Remboursement 14 jours",
      moreLink: "Voir le détail des plans →",
    },
    faqMini: {
      pill: "Questions fréquentes",
      title: "Vous avez des questions ?",
      subline: "On a essayé d'y répondre honnêtement.",
      cta: "Lire la FAQ complète",
      q1: "C'est sûr pour mes enfants ?",
      a1: "Aucune collecte de données personnelles, aucune publicité, conforme COPPA et RGPD. Erudia ne connaît ni le nom, ni l'âge réel, ni l'email de votre enfant. Juste un pseudo et un avatar.",
      q2: "Peut-on jouer sans internet ?",
      a2: "Oui — c'est même l'un des principes fondateurs d'Erudia. L'app fonctionne entièrement hors ligne une fois téléchargée. Les progrès se synchronisent automatiquement au retour de la connexion.",
      q3: "Comment je suis les progrès de mon enfant ?",
      a3: "Créez un compte parent gratuit pour accéder au tableau de bord parental : scores par catégorie, régularité, badges obtenus. Votre enfant peut aussi consulter ses propres statistiques depuis son profil.",
      q4: "La version gratuite est-elle vraiment complète ?",
      a4: "La version gratuite inclut 3 catégories (Sciences, Histoire, Héros), avec jusqu'à 100 questions par catégorie. Les badges, le mode hors ligne et le suivi parental sont disponibles pour tous. Erudia+ débloque les 18 catégories restantes, sans limite de questions.",
    },
    cta: {
      title: "Prêt à commencer l'aventure ?",
      subline:
        "Créez un profil enfant en 30 secondes. Votre compte parent vous attend.",
      btnPrimary: "Créer un profil enfant",
      btnSecondary: "Voir comment ça marche",
      reassure: "✓ Gratuit · ✓ Sans pub · ✓ COPPA compliant · ✓ Hors ligne",
    },
  },

  // ── Fonctionnalités ──────────────────────────────────────────
  features: {
    hero: {
      pill: "Fonctionnalités",
      title1: "Tout ce que le quiz Erudia",
      title2: "fait pour votre enfant",
      subline:
        "Explorez chaque fonctionnalité conçue pour l'enfant qui apprend, et pour le parent qui suit.",
      tabChild: "🎮 Pour l'enfant",
      tabParent: "👨‍👩‍👧 Pour le parent",
      tabContent: "📚 Le contenu",
    },
    cta: {
      title: "Convaincu ? Commençons.",
      subline: "Créez un profil en 30 secondes. Gratuit.",
      btnPrimary: "🚀 Créer un profil enfant",
      btnSecondary: "Voir les tarifs",
      reassure: "✓ Gratuit · ✓ Sans pub · ✓ COPPA · ✓ Hors ligne",
    },
    comparison: {
      pill: "Comparatif",
      title: "Erudia vs la concurrence",
      subline: "Ce que les autres ne proposent pas.",
      col0: "Fonctionnalité",
      rows: [
        {
          feature: "Mode offline / PWA",
          kahoot: "❌",
          quizizz: "❌",
          splash: "❌",
          erudia: "✅",
        },
        {
          feature: "Bilingue FR/EN",
          kahoot: "✅ (18 langues)",
          quizizz: "✅ (multi)",
          splash: "❌ (EN only)",
          erudia: "✅ (FR/EN)",
        },
        {
          feature: "Quiz multi-catégories",
          kahoot: "✅",
          quizizz: "✅",
          splash: "❌ (maths/lecture)",
          erudia: "✅",
        },
        {
          feature: "Mode parent intégré",
          kahoot: "❌ (séparé)",
          quizizz: "❌ (orienté classe)",
          splash: "✅ (dashboard)",
          erudia: "✅ (in-app)",
        },
        {
          feature: "Badges & gamification",
          kahoot: "✅",
          quizizz: "✅",
          splash: "⚠️ (basique)",
          erudia: "✅ (14 badges)",
        },
        {
          feature: "Défi quotidien",
          kahoot: "⚠️",
          quizizz: "⚠️",
          splash: "❌",
          erudia: "✅",
        },
        {
          feature: "Mode duel asynchrone",
          kahoot: "❌",
          quizizz: "❌",
          splash: "❌",
          erudia: "✅",
        },
        {
          feature: "Rapports PDF parents",
          kahoot: "⚠️ (payant)",
          quizizz: "❌",
          splash: "✅",
          erudia: "✅",
        },
        {
          feature: "Pricing transparent",
          kahoot: "❌",
          quizizz: "⚠️",
          splash: "❌",
          erudia: "✅",
        },
        {
          feature: "COPPA / RGPD",
          kahoot: "✅",
          quizizz: "✅",
          splash: "✅",
          erudia: "✅",
        },
        {
          feature: "Sans publicité",
          kahoot: "❌ (free)",
          quizizz: "❌",
          splash: "❌",
          erudia: "✅",
        },
      ],
    },
    content: {
      pill: "📚 Le contenu",
      title: "Des questions qui font vraiment apprendre",
      p1: "Erudia ne se contente pas de divertir. Chaque question est validée pédagogiquement, alignée sur les programmes scolaires français (CP→6e) et le curriculum international (Grade 1→Grade 6).",
      p2: "Le niveau Difficile monte jusqu'au programme de collège volontairement. Un enfant de 10 ans qui atteint 18/20 en Facile doit encore être challengé. Erudia grandit avec lui.",
      p3: "Les questions Difficile d'Erudia reflètent la réalité des programmes internationaux : culture mondiale, histoire avancée, sciences. Même un adulte peut être surpris.",
      noteStrong: "Un score de 8/20 en mode Difficile n'est pas un échec",
      noteText:
        "c'est une invitation à progresser. Erudia challenge pour faire grandir, pas pour décourager.",
      tableLevel: "Niveau",
      tableFr: "Programme FR",
      tableEn: "Programme EN",
      tableDiff: "Difficulté",
      curriculum: [
        {
          level: "Facile",
          fr: "CP → CE2",
          en: "Grade 1 → Grade 3",
          chip: "easy",
        },
        {
          level: "Moyen",
          fr: "CM1 → CM2",
          en: "Grade 4 → Grade 5",
          chip: "medium",
        },
        {
          level: "Difficile",
          fr: "6e → 4e",
          en: "Grade 6 → Grade 8",
          chip: "hard",
        },
      ],
      catPill: "Catégories de quiz",
      categories: [
        {
          icon: "🔬",
          name: "Sciences",
          sub: "300 questions FR + EN",
          color: "#2196F3",
          premium: false,
        },
        {
          icon: "📜",
          name: "Histoire",
          sub: "500 questions FR + EN",
          color: "#795548",
          premium: false,
        },
        {
          icon: "⚔️",
          name: "Héros & Aventures",
          sub: "75 questions (en croissance)",
          color: "#E91E63",
          premium: false,
        },
        {
          icon: "🌍",
          name: "Géographie",
          sub: "À venir",
          color: "#00BCD4",
          premium: true,
        },
        {
          icon: "🚀",
          name: "Espace & Astronomie",
          sub: "À venir",
          color: "#9C27B0",
          premium: true,
        },
        {
          icon: "🏛️",
          name: "Mythologie",
          sub: "À venir",
          color: "#FF5722",
          premium: true,
        },
        {
          icon: "➕",
          name: "Mathématiques",
          sub: "À venir",
          color: "#4CAF50",
          premium: true,
        },
        {
          icon: "🗳️",
          name: "Éducation Civique",
          sub: "À venir",
          color: "#607D8B",
          premium: true,
        },
        {
          icon: "🍳",
          name: "Cuisine",
          sub: "À venir",
          color: "#FF9800",
          premium: true,
        },
      ],
      badgeFree: "Gratuit",
      badgePremium: "Premium",
    },
    parent: {
      pill: "👨‍👩‍👧 Pour le parent",
      title: "Superviser sans surveiller",
      subline:
        "Le mode admin est intégré directement dans l'app enfant protégé par authentification, accessible en 2 clics.",
      items: [
        {
          icon: "🛡️",
          title: "Mode admin intégré",
          desc: "Accès protégé par Supabase Auth (email/password ou Google OAuth). Pas de compte parent séparé à créer le bouton admin est discret dans l'interface enfant.",
          list: [],
        },
        {
          icon: "📈",
          title: "Statistiques détaillées",
          desc: "Graphiques de progression par catégorie et difficulté, tendances dans le temps, points forts et axes d'amélioration identifiés automatiquement.",
          list: [
            "BarChart scores par catégorie",
            "PieChart répartition des sessions",
            "Évolution sur 7 / 30 jours",
          ],
        },
        {
          icon: "🎯",
          title: "Objectifs journaliers",
          desc: "Définissez des cibles personnalisées : nombre de bonnes réponses, catégories à travailler. Notification email automatique si l'objectif n'est pas atteint.",
          list: [],
        },
        {
          icon: "📄",
          title: "Rapports PDF par email",
          desc: "Export PDF de la progression avec graphiques. Envoi automatique hebdomadaire ou mensuel, ou manuel à tout moment depuis l'espace admin.",
          list: [
            "Planification hebdo / mensuelle",
            "Envoi manuel en un clic",
            "PDF avec graphiques inclus",
          ],
        },
        {
          icon: "🔄",
          title: "Sync cloud bidirectionnelle",
          desc: "Local-first : les données vivent dans le navigateur. Synchronisation automatique vers Supabase PostgreSQL. Consultez les stats depuis n'importe quel appareil.",
          list: [],
        },
        {
          icon: "🗑️",
          title: "Contrôle total du compte",
          desc: "Remise à zéro de la progression (scores, badges, historique) ou suppression complète du compte — les deux actions irréversibles sont protégées par double confirmation.",
          list: [],
        },
      ],
      mockup: {
        title: "Espace parent — Lucas 🦊",
        sub: "Mode admin · Connecté",
        badge: "Erudia+",
        stat1Label: "Questions",
        stat2Label: "Badges",
        stat3Label: "Série",
        chartLabel: "Scores par catégorie (cette semaine)",
        goalText: "Objectif : 20 bonnes réponses / jour",
        goalSub: "Aujourd'hui : 23 réponses correctes",
        goalStatus: "✓ Atteint",
      },
    },
    nova: {
      pill: "Mascotte Nova",
      title1: "Nova, votre guide",
      title2: "émotionnel",
      p1: "Nova est la mascotte hibou d'Erudia. Elle apparaît à chaque moment clé du parcours : onboarding, feedback après réponse, résultats, badges débloqués.",
      p2: "7 expressions SVG distinctes: joyeuse, concentrée, encourageante, fière, mauvaise réponse, streak, accueil. Nova ne juge jamais, elle accompagne.",
      p3: "Ses messages sont toujours bienveillants : après une mauvaise réponse, Nova montre la bonne réponse avec douceur. Après un badge, elle célèbre avec l'enfant.",
      expressions: [
        { emoji: "😊", label: "Joyeuse" },
        { emoji: "🎉", label: "En fête" },
        { emoji: "🤔", label: "Concentrée" },
        { emoji: "💪", label: "Encourageante" },
        { emoji: "🥇", label: "Fière" },
        { emoji: "😢", label: "Compatissante" },
        { emoji: "🔥", label: "Streak" },
        { emoji: "👋", label: "Accueil" },
      ],
      poses: [
        {
          label: "Joyeuse",
          emotion: "Réponse correcte",
          src: "/mascotte-correct.svg",
        },
        {
          label: "Concentrée",
          emotion: "Pendant le quiz",
          src: "/mascotte-idle.svg",
        },
        {
          label: "En fête",
          emotion: "Badge débloqué !",
          src: "/mascotte-streak.svg",
        },
        {
          label: "Encourageante",
          emotion: "Après une erreur",
          src: "/mascotte-encouragement.svg",
        },
      ],
    },
    convictions: {
      pill: "Nos convictions",
      title: "Pourquoi Erudia est construit comme ça",
      subline: "Chaque choix technique et pédagogique a une raison. Les voici.",
      why: "Pourquoi ce choix",
      items: [
        {
          number: "01",
          badge: "Technologie",
          color: "#667eea",
          title1: "Ça marche",
          title2: "sans internet",
          desc: "Un enfant apprend partout : en voiture, chez les grands-parents, dans un avion. On ne voulait pas qu'une mauvaise connexion soit un obstacle à l'apprentissage. Erudia est une PWA locale,les quiz se lancent en quelques secondes, même hors ligne. Les progrès se synchronisent automatiquement quand le réseau revient.",
          insightIcon: "📱",
          insightStrong: "Progressive Web App installable",
          insightText:
            "sur iOS, Android et desktop. Pas besoin de télécharger depuis un store. Une icône sur l'écran d'accueil, comme une vraie app.",
        },
        {
          number: "02",
          badge: "Pédagogie",
          color: "#4CAF50",
          title1: "Calé sur les",
          title2: "programmes scolaires",
          desc: "Les quiz Erudia ne sont pas générés au hasard. Chaque question est alignée sur les programmes officiels français (CP → 6e) et le curriculum international (Grade 1 → Grade 6). L'enfant révise ce qu'il voit en classe, avec un angle différent, plus ludique. Le niveau Difficile monte jusqu'au collège pour que l'app grandisse avec lui.",
          insightIcon: "📐",
          insightStrong: "",
          insightText:
            "Sciences, Histoire, Héros & Aventures disponibles dès maintenant. Maths, Géographie, Astronomie, Mythologie et Éducation Civique en préparation.",
        },
        {
          number: "03",
          badge: "Langue",
          color: "#FF9800",
          title1: "Français et anglais,",
          title2: "dès le premier jour",
          desc: "Beaucoup d'apps éducatives démarrent en anglais et ajoutent d'autres langues en option, souvent incomplètes. On a fait l'inverse : Erudia est nativement bilingue FR/EN. La version anglaise suit une approche FLE (Français Langue Étrangère) alignée sur le CECRL. Chaque session en anglais a une valeur pédagogique, pas juste une traduction.",
          insightIcon: "🌍",
          insightStrong: "Contenu anglais aligné sur le CECRL",
          insightText:
            "Un seul toggle dès l'onboarding ou depuis le profil. Pas de double compte, pas de réinstallation. L'immersion linguistique commence naturellement.",
        },
        {
          number: "04",
          badge: "Éthique",
          color: "#E91E63",
          title1: "Zéro publicité,",
          title2: "zéro distraction",
          desc: "Un enfant concentré sur ses quiz ne doit pas être interrompu par une bannière ou une vidéo. On refuse de monétiser l'attention des enfants. Erudia est financé uniquement par son abonnement premium — ce qui aligne nos intérêts sur la qualité de l'expérience, pas sur le volume de clics.",
          insightIcon: "🛡️",
          insightStrong: "Conforme RGPD et COPPA",
          insightText:
            "aucune donnée enfant revendue, aucun tracker tiers. La version gratuite est sans pub — pas un modèle freemium déguisé.",
        },
        {
          number: "05",
          badge: "Famille",
          color: "#764ba2",
          title1: "Le parent,",
          title2: "dans la même app",
          desc: "Beaucoup d'apps séparent l'espace enfant et l'espace parent — deux comptes, deux téléphones, deux mots de passe. On a choisi d'intégrer le mode admin directement dans l'app. Le parent accède aux stats, objectifs et rapports PDF en deux clics, depuis le même écran que l'enfant. Superviser sans surveiller.",
          insightIcon: "👨‍👩‍👧",
          insightStrong: "Accès protégé par authentification",
          insightText:
            "l'enfant ne peut pas accéder au mode admin. Rapports PDF envoyés automatiquement par email, chaque semaine ou chaque mois.",
        },
        {
          number: "06",
          badge: "Confiance",
          color: "#10B981",
          title1: "Un prix clair,",
          title2: "affiché sans détour",
          desc: 'On ne cache pas le prix derrière un "Contactez-nous" ou une page payante en trois étapes. Erudia a un modèle simple : une version gratuite honnête, et un abonnement premium avec tout dedans. Le prix est visible sur la page Tarifs, sans surprise à la caisse. On préfère gagner votre confiance plutôt que votre carte bancaire.',
          insightIcon: "💳",
          insightStrong: "Freemium sans manipulation",
          insightText:
            "pas de paywall caché après 3 questions, pas d'upsell agressif. Ce qui est gratuit est vraiment gratuit.",
        },
      ],
    },
    child: {
      pill: "🎮 Pour l'enfant",
      title: "Une expérience pensée pour eux",
      subline:
        "Interface intuitive, récompenses motivantes, challenge progressif.",
      cards: [
        {
          icon: "🎭",
          title: "Avatars DiceBear personnalisés",
          desc: "5 styles d'avatars (adventurer, fun-emoji, bottts, pixel-art, micah) avec des centaines de combinaisons. L'enfant choisit son identité visuelle dès l'onboarding — et peut la modifier à tout moment depuis le profil.",
          tag: "Onboarding",
        },
        {
          icon: "🏆",
          title: "14 badges à collectionner",
          desc: "Score parfait, premières parties, maîtrise d'une catégorie, difficulté maximale, série de jours consécutifs… Chaque badge est une reconnaissance d'un effort réel, visible dans le profil.",
          tag: "Gamification",
        },
        {
          icon: "📅",
          title: "Défi quotidien",
          desc: "Chaque jour, un quiz identique pour tous les joueurs (seed déterministe). Récompenses : XP, titres progressifs, Streak Shields pour protéger les séries. L'habitude se construit naturellement.",
          tag: "Rétention",
        },
        {
          icon: "⚔️",
          title: "Mode duel asynchrone",
          desc: "Un code à 6 caractères suffit pour défier un ami ou un parent. Chacun joue quand il veut, le scoring prend en compte le temps de réponse. Historique des 20 derniers défis visible dans l'app.",
          tag: "Social",
        },
        {
          icon: "📊",
          title: "Statistiques personnelles",
          desc: "BarChart et PieChart des scores par catégorie, barres de progression CSS, évolution dans le temps. L'enfant voit ses progrès concrets — pas de classement externe, privacy first.",
          tag: "Progression",
        },
        {
          icon: "🌍",
          title: "Bilingue FR / EN intégré",
          desc: "L'interface et les questions sont disponibles en français et en anglais. Le toggle est accessible dès l'onboarding et dans le profil — pour une immersion linguistique ludique et naturelle.",
          tag: "Multilingue",
        },
      ],
    },
  },

  // ── Comment ça marche ────────────────────────────────────────
  howItWorks: {
    hero: {
      pill: "✨ Comment ça marche",
      title: "Jouer sans connexion internet, simple comme bonjour.",
      subline:
        "Pas de compte email pour l'enfant, pas d'inscription interminable. Un pseudo, un avatar — et c'est parti pour apprendre en s'amusant.",
      switcherChild: "🎮 Parcours enfant",
      switcherParent: "👨‍👩‍👧 Parcours parent",
    },
    childSteps: {
      pill: "🎮 Parcours enfant",
      title: "5 étapes pour jouer",
      subline:
        "De l'ouverture de l'app au premier badge en moins de 5 minutes.",
      step1Label: "Étape 1",
      step1Title: "Créer son profil",
      step1Desc:
        "L'enfant choisit un pseudonyme fun et sélectionne son avatar parmi des dizaines de personnages DiceBear. En 30 secondes, il est prêt à jouer — sans email, sans mot de passe.",
      step1D1: "Pseudonyme unique (suggestions fun si pris)",
      step1D2: "5 styles d'avatars, des centaines de combinaisons",
      step1D3: "Aucune donnée personnelle collectée (COPPA)",
      step2Label: "Étape 2",
      step2Title: "Choisir sa catégorie & difficulté",
      step2Desc:
        "Sur l'écran Home, l'enfant choisit parmi les catégories disponibles et son niveau : Facile, Moyen ou Difficile. Le bouton Jouer s'active dès que les deux choix sont faits.",
      step2D1: "3 catégories gratuites : Sciences, Histoire, Héros",
      step2D2: "3 niveaux de difficulté",
      step2D3: "Bouton Jouer actif dès sélection complète",
      step3Label: "Étape 3",
      step3Title: "Jouer les 20 questions",
      step3Desc:
        "20 questions par partie, filtrées par catégorie et difficulté. Feedback immédiat après chaque réponse : vert pour correcte, rouge pour incorrecte avec la bonne réponse affichée. La mascotte Nova accompagne l'enfant tout au long.",
      step3D1: "20 questions par session",
      step3D2: "Feedback visuel immédiat (vert / rouge)",
      step3D3: "Nova affiche la bonne réponse après une erreur",
      step4Label: "Étape 4",
      step4Title: "Voir ses résultats & badges",
      step4Desc:
        "Score final affiché avec un message de Nova adapté à la performance. Un badge est attribué si le score atteint 4/20. Des confettis célèbrent chaque réussite — même les petites.",
      step4D1: "Score X / 20 avec message encourageant de Nova",
      step4D2: "Badge attribué dès 4 / 20 bonnes réponses",
      step4D3: "Confettis + célébration animée",
      step5Label: "Étape 5",
      step5Title: "Consulter son profil",
      step5Desc:
        "Le profil affiche l'avatar, le pseudo, les statistiques globales et les badges gagnés. Le défi quotidien et le mode duel sont accessibles depuis la navigation. Tout est sauvegardé localement — même hors ligne.",
      step5D1: "Avatar + pseudo + badges visibles en un coup d'œil",
      step5D2: "Statistiques détaillées par catégorie (Erudia+)",
      step5D3: "Défi quotidien & mode duel accessibles",
      mockOnboardingTitle: "Crée ton profil",
      mockOnboardingAvatar: "Choisis ton avatar",
      mockCategoryTitle: "Erudia",
      mockCategorySci: "Sciences",
      mockCategorySciCount: "300 questions",
      mockCategoryHist: "Histoire",
      mockCategoryHistCount: "500 questions",
      mockCategoryDiff: "Difficulté",
      mockDiffEasy: "Facile",
      mockDiffMedium: "Moyen",
      mockDiffHard: "Difficile",
      mockQuizCounter: "Question 9 / 20",
      mockQuizQuestion: "Quelle planète est la plus proche du Soleil ?",
      mockQuizA: "Vénus",
      mockQuizB: "Mercure ✓",
      mockQuizC: "La Terre",
      mockQuizD: "Mars",
      mockResultsTitle: "Résultats 🎉",
      mockResultsScore: "Excellent ! 🦉",
      mockResultsBadge: "Badge Explorateur Sciences !",
      mockResultsReplay: "Rejouer",
      mockResultsHome: "Accueil",
      mockProfileTitle: "Mon profil",
      mockProfileGames: "Parties",
      mockProfileAvg: "Moy.",
      mockProfileStreak: "Série",
    },
    parentJourney: {
      pill: "👨‍👩‍👧 Parcours parent",
      title: "3 étapes pour suivre",
      subline:
        "Pas de compte séparé. Le mode admin est intégré dans l'app accès en 2 clics, sécurisé par votre compte Supabase.",
      step1Num: "01",
      step1Title: "Accéder au mode admin",
      step1Desc:
        "Un bouton discret en bas du profil enfant. Un clic — une authentification Supabase (email ou Google) est requise. Pas besoin de créer un compte parent séparé.",
      step1D1: "Connexion email ou Google en un clic",
      step1D2: "PIN 4 chiffres pour les accès rapides suivants",
      step1D3: "Accessible en 2 clics depuis le profil enfant",
      step2Num: "02",
      step2Title: "Consulter les statistiques",
      step2Desc:
        "Graphiques de progression par catégorie, scores détaillés, série de jours consécutifs, badges gagnés. Définissez un objectif journalier et recevez un email si l'enfant ne l'atteint pas.",
      step2D1: "Graphiques par catégorie (Recharts)",
      step2D2: "Objectif journalier personnalisable",
      step2D3: "Alerte email si l'objectif n'est pas atteint",
      step3Num: "03",
      step3Title: "Recevoir des rapports PDF",
      step3Desc:
        "Planifiez un envoi hebdomadaire ou mensuel, ou déclenchez un envoi manuel à tout moment. Le rapport PDF inclut tous les graphiques et statistiques de progression.",
      step3D1: "Rapport PDF avec tous les graphiques",
      step3D2: "Envoi automatique hebdo ou mensuel",
      step3D3: "Déclenchement manuel à tout moment",
      note: "🔒 Vos données adultes et les données enfant sont strictement séparées. Aucune donnée personnelle enfant n'est transmise à des tiers.",
    },
    tips: {
      pill: "💡 Conseils",
      title: "Pour bien démarrer",
      subline:
        "Quatre habitudes simples pour que votre enfant tire le meilleur d'Erudia dès la première semaine.",
      tip1Title: "Commencez par Facile",
      tip1Desc:
        "Même les enfants qui se croient forts seront surpris. Construire la confiance en Facile avant de passer au Moyen — c'est la recette d'un apprentissage durable.",
      tip2Title: "Le défi quotidien d'abord",
      tip2Desc:
        "Faites-en une habitude du matin ou du soir. 20 questions = 5 minutes max. La régularité crée la progression — bien plus que les longues sessions.",
      tip3Title: "Défiez en famille",
      tip3Desc:
        "Le mode duel fonctionne entre enfant et parent. Un moyen ludique de jouer ensemble depuis des appareils séparés — et de montrer qu'apprendre, c'est fun à tout âge.",
      tip4Title: "Installez l'app en PWA",
      tip4Desc:
        "Sur mobile, utilisez « Ajouter à l'écran d'accueil » pour une expérience native — et le mode hors ligne garanti. Fonctionne aussi bien sur iOS que sur Android.",
    },
    offline: {
      pill: "📡 Mode hors ligne",
      title: "Ça marche partout.",
      titleAccent: "Vraiment partout.",
      para1:
        "Erudia est une PWA (Progressive Web App). Une fois visitée, l'app met en cache tout le nécessaire pour fonctionner sans connexion — questions, interface, sons.",
      para2:
        "Dans le métro, en voiture, à la montagne, chez des amis sans WiFi — les quiz fonctionnent toujours. Aucune frustration pour votre enfant, aucune interruption.",
      step1Title: "Première visite avec connexion",
      step1Desc:
        "L'app met en cache les questions et l'interface automatiquement.",
      step2Title: "Mode avion, pas de panique",
      step2Desc:
        "L'enfant joue normalement. Scores et badges sauvegardés localement.",
      step3Title: "Retour en ligne → synchronisation",
      step3Desc:
        "Les données se synchronisent automatiquement. Rien n'est perdu.",
      sc1Title: "À la plage",
      sc1Desc: "Pas de 4G, pas de WiFi — l'app tourne parfaitement",
      sc1Status: "✓ OK",
      sc2Title: "Dans le train",
      sc2Desc: "Tunnel ou zone blanche — le quiz continue sans interruption",
      sc2Status: "✓ OK",
      sc3Title: "En camping",
      sc3Desc: "Scores sauvegardés localement, synchronisés au retour",
      sc3Status: "⟳ Sync dès connexion",
      sc4Title: "Mode avion",
      sc4Desc: "Questions mises en cache — disponibles immédiatement",
      sc4Status: "📦 Mis en cache",
    },
    cta: {
      title: "Vous savez tout.",
      titleAccent: "Lancez-vous.",
      subline:
        "30 secondes pour créer un profil enfant. Juste un enfant qui apprend en s'amusant.",
      btnPrimary: "Créer un profil enfant",
      btnSecondary: "Voir les tarifs",
      reassure:
        "✓ Gratuit · ✓ Sans publicité · ✓ COPPA compliant · ✓ Hors ligne",
    },
  },

  // ── Tarifs ───────────────────────────────────────────────────
  pricing: {
    hero: {
      pill: "💳 Tarifs",
      title: "Un quiz éducatif sans publicité simple et transparent.",
      subline:
        "Un plan gratuit pleinement jouable. Un seul plan premium. Pas de niveaux cachés, pas de renouvellement surprise.",
      billingMonthly: "Mensuel",
      billingAnnual: "6 mois",
      billingSavings: "Économisez 1,95€",
    },
    cards: {
      title: "Nos plans tarifaires",
      freeLabel: "Gratuit",
      freePrice: "0€",
      freePeriod: "Pour toujours",
      freeCta: "Commencer gratuitement",
      freeReassure: "",
      freeFeaturesTitle: "Inclus dans le plan gratuit",
      freeF1: "3 catégories de quiz (Sciences, Histoire, Héros)",
      freeF2: "20 questions par session",
      freeF3: "Badges & système de récompenses complet",
      freeF4: "Défi quotidien (XP, titres, Streak Shields)",
      freeF5: "Mode hors ligne (PWA)",
      freeF6: "Bilingue FR / EN",
      freeF7: "1 profil enfant",
      freeF8: "Historique cloud : 10 dernières sessions",
      freeF9: "Contrôles parentaux basiques",
      freeDis1: "Catégories supplémentaires (6)",
      freeDis2: "Dashboard parent avancé",
      premiumBadge: "",
      premiumLabel: "Erudia+",
      premiumPriceM: "1,99€",
      premiumPriceA: "1,66€",
      premiumPeriodM: "/ mois",
      premiumPeriodA: "/ mois (facturé tous les 6 mois)",
      premiumSavings: "→ soit 9,99€ / 6 mois — économisez 1,95€",
      premiumSavingsAmount: "1,95€ économisés",
      premiumCta: "Passer à Erudia premium",
      premiumReassure: "Annulation à tout moment",
      premiumFeaturesTitle: "Tout du plan gratuit, plus :",
      premiumF1: "Toutes les catégories — 20 au total",
      premiumF2: "Packs thématiques exclusifs (Espace, Mythologie…)",
      premiumF3: "Avatars premium DiceBear (4 styles supplémentaires)",
      premiumF4: "Profils enfants illimités",
      premiumF5: "Historique cloud illimité",
      premiumF6: "Dashboard parent avancé (graphiques, tendances)",
      premiumF7: "Objectifs avancés par catégorie / semaine",
      premiumF8: "Rapports PDF — envoi hebdo / mensuel automatique",
      premiumF9: "Recommandations pédagogiques personnalisées",
      stripe:
        "🔒 Paiement sécurisé via Stripe · Remboursement intégral dans les 14 jours · Données hébergées en Europe",
      priceGuaranteeTitle: "Prix garanti à vie : 1,99 € / mois",
      priceGuaranteeBody:
        "Ce tarif est définitif. Peu importe les fonctionnalités que nous ajouterons dans les prochains mois, votre prix ne changera jamais.",
    },
    value: {
      pill: "💎 Ce que vous obtenez",
      title: "Un abonnement qui vaut vraiment le coup",
      subline:
        "Pas de fonctionnalités bridées. Pas de surprise. Juste du contenu qui grandit avec votre enfant.",
      c1Title: "Illimité dans le temps",
      c1Desc:
        "Pas de sessions limitées, pas de questions épuisées. L'enfant joue autant qu'il veut, chaque jour. Le contenu se renouvelle avec les défis quotidiens.",
      c1Stat: "∞ parties",
      c2Title: "Toute la famille",
      c2Desc:
        "Erudia+ couvre des profils enfants illimités. Frères, sœurs, cousins — un seul abonnement suffit pour tout le monde, sans supplément.",
      c2Stat: "∞ profils",
      c3Title: "Partout, toujours",
      c3Desc:
        "Mode hors ligne inclus dès le plan gratuit — pas réservé au premium. Voitures, trains, campings : l'apprentissage ne s'arrête jamais.",
      c3Stat: "0 coupure",
      c4Title: "Zéro publicité",
      c4Desc:
        "Pas de pub, ni en gratuit ni en premium. Pas de tracking, pas de données enfants revendues. Erudia, c'est juste le jeu — rien d'autre.",
      c4Stat: "0 pub",
      analogyTitle: "Un mois d'Erudia+, c'est moins cher que…",
      analogySub: "Et ça dure tout le mois — pas juste le temps d'un goûter 😄",
      pizzaLabel: "Une pizza",
      pizzaPrice: "~8–12€",
      pizzaDuration: "une soirée",
      coffeeLabel: "Deux cafés",
      coffeePrice: "~5–6€",
      coffeeDuration: "un matin",
      bookLabel: "Un livre de poche",
      bookPrice: "~6–9€",
      bookDuration: "quelques heures",
      movieLabel: "Un film en VOD",
      moviePrice: "~4–6€",
      movieDuration: "une fois",
      erudiaLabel: "Erudia+",
      erudiaPrice: "1,99€",
      erudiaDuration: "tout le mois ✨",
    },
    faqBilling: {
      pill: "❓ FAQ Facturation",
      title: "Questions sur les tarifs",
      q1: "Puis-je changer de plan à tout moment ?",
      a1: "Oui, à tout moment. Vous pouvez passer de Gratuit à Erudia+ ou annuler votre abonnement depuis votre espace admin. Le changement prend effet immédiatement ou à la fin du cycle de facturation selon le cas.",
      q2: "Comment fonctionne la facturation ?",
      a2: "Mensuelle ou annuelle selon votre choix, avec renouvellement automatique. Vous recevez un email de rappel 7 jours avant chaque renouvellement. Vous pouvez annuler à tout moment avant la date de renouvellement.",
      q3: "Et si je ne suis pas satisfait ?",
      a3: "Remboursement intégral dans les 14 jours suivant votre abonnement — sans question et sans formulaire compliqué. Envoyez simplement un email à contact@erudia.app avec votre identifiant de commande Stripe.",
      q4: "Une carte de crédit est-elle requise pour le plan gratuit ?",
      a4: "Non, absolument pas. Le plan gratuit ne nécessite aucune donnée bancaire. Vous créez un profil enfant directement dans l'app sans aucun engagement.",
      q5: "Le plan Erudia+ couvre combien d'enfants ?",
      a5: "Erudia+ permet des profils enfants illimités sous un même compte admin. Idéal pour les familles avec plusieurs enfants — un seul abonnement pour tous.",
      q6: "Y a-t-il une période d'essai pour Erudia+ ?",
      a6: "non",
    },
    guarantee: {
      g1Title: "Paiement sécurisé",
      g1Desc:
        "Stripe gère tous les paiements. Erudia ne stocke jamais vos données bancaires ni votre numéro de carte, ni votre RIB.",
      g2Title: "Remboursement 7 jours",
      g2Desc:
        "Pas satisfait dans les 7jours ? Remboursement intégral, sans question, sans formulaire compliqué. Un email suffit.",
      g3Title: "Annulation simple",
      g3Desc:
        "Annulez à tout moment depuis votre espace admin. Pas de formulaire, pas d'email à envoyer. Deux clics, c'est tout.",
    },
    cta: {
      title: "Votre enfant mérite",
      titleAccent: "le meilleur départ",
      sub: "Commencez gratuitement dès aujourd'hui sans engagement. Passez à Erudia+ quand vous êtes prêt.",
      btnPrimary: "Essayer gratuitement",
      btnSecondary: "Démarrer Erudia premium — 4,99€/mois",
      reassure1: "",
      reassure2: "Remboursement 14 jours",
      reassure3: "Annulation en 2 clics",
      reassure4: "Zéro publicité",
    },
  },

  // ── FAQ ──────────────────────────────────────────────────────
  faq: {
    hero: {
      pill: "❓ Aide & FAQ",
      title: "Questions sur Erudia,",
      titleAccent: "le quiz éducatif offline.",
      subline:
        "Toutes les réponses sur le fonctionnement, l'abonnement, la confidentialité des données et le mode hors ligne.",
      searchPlaceholder: "Rechercher une question…",
      resultCount: '{n} résultat(s) pour "{q}"',
      noResult: 'Aucun résultat pour "{q}"',
    },
    categories: [
      { id: "all", emoji: "🔍", label: "Toutes les questions" },
      { id: "safety", emoji: "🔒", label: "Sécurité & vie privée" },
      { id: "content", emoji: "📚", label: "Contenu pédagogique" },
      { id: "offline", emoji: "📡", label: "Mode hors ligne" },
      { id: "account", emoji: "👤", label: "Compte & profil" },
      { id: "parent", emoji: "👨‍👩‍👧", label: "Espace parent" },
      { id: "billing", emoji: "💳", label: "Abonnement & paiement" },
      { id: "technical", emoji: "⚙️", label: "Technique" },
    ],
    items: [
      {
        id: "safety-1",
        category: "safety",
        question: "Est-ce que l'app est sûre pour mon enfant ?",
        answer:
          "Oui. Erudia ne collecte aucune donnée personnelle sur votre enfant — pas de nom réel, pas d'email, pas de photo. L'enfant joue avec un pseudonyme et un avatar choisis par lui. L'app est conçue dans le respect du RGPD et du standard COPPA (États-Unis). Aucune publicité, aucun tracker tiers.",
      },
      {
        id: "safety-2",
        category: "safety",
        question: "Erudia collecte-t-il des données sur mon enfant ?",
        answer:
          "Non. Le profil enfant contient uniquement un pseudonyme, un avatar (image générée, pas une vraie photo), et les scores/badges en local. Aucun email enfant. L'email adulte n'est utilisé que dans l'espace parent, protégé par authentification Supabase.",
      },
      {
        id: "safety-3",
        category: "safety",
        question: "Y a-t-il des publicités dans l'app ?",
        answer:
          "Aucune. Zéro pub, zéro tracker, zéro revente de données. Le modèle économique d'Erudia repose uniquement sur l'abonnement Erudia+ — pas sur la publicité.",
      },
      {
        id: "safety-4",
        category: "safety",
        question: "Mon enfant peut-il interagir avec d'autres utilisateurs ?",
        answer:
          "Erudia propose un mode duel asynchrone (Erudia+) : votre enfant peut partager un code à 6 caractères avec un proche pour jouer les mêmes questions et comparer les scores. Il n'y a aucun chat, aucune messagerie, aucun réseau social. L'activation de ce mode nécessite la validation d'un parent depuis l'espace admin.",
      },
      {
        id: "content-1",
        category: "content",
        question: "Quelles matières sont couvertes ?",
        answer:
          "En version gratuite : Sciences (300 questions), Histoire (500 questions), Héros (75 questions). Erudia+ ajoute Sport, Géographie, Culture et Art — soit 7 catégories au total. Toutes les questions sont disponibles en français et en anglais.",
      },
      {
        id: "content-2",
        category: "content",
        question: "Le contenu est-il adapté à l'âge de mon enfant ?",
        answer:
          "L'interface est conçue pour les 6–11 ans : gros boutons, icônes, lisibilité maximale. Le contenu propose 3 niveaux (Facile, Moyen, Difficile) — le niveau Hard dépasse volontairement le primaire pour proposer un vrai défi sur le long terme.",
      },
      {
        id: "content-3",
        category: "content",
        question:
          "Les questions sont-elles alignées sur les programmes scolaires ?",
        answer:
          "Oui. Les questions sont validées pédagogiquement sur les programmes français (CP → 6e) et le curriculum international (Grade 1 → 6). Le niveau Difficile couvre jusqu'en 4e pour offrir un challenge progressif.",
      },
      {
        id: "content-4",
        category: "content",
        question: "Combien de questions sont disponibles ?",
        answer:
          "Plus de 800 questions au lancement, réparties sur 3 catégories gratuites en FR et EN. Le catalogue est enrichi régulièrement. Erudia+ ajoute plusieurs centaines de questions supplémentaires.",
      },
      {
        id: "content-5",
        category: "content",
        question: "Les questions sont-elles disponibles en anglais ?",
        answer:
          "Oui, toutes les questions et l'interface complète sont disponibles en français et en anglais dès le lancement. Idéal pour les familles bilingues ou pour l'immersion linguistique.",
      },
      {
        id: "offline-1",
        category: "offline",
        question: "Peut-on vraiment jouer sans internet ?",
        answer:
          "Oui. Erudia est une PWA (Progressive Web App) qui met en cache les questions et l'interface dès la première visite. En mode avion, dans un tunnel ou en zone blanche — l'app fonctionne normalement.",
      },
      {
        id: "offline-2",
        category: "offline",
        question: "Comment installer l'app hors ligne ?",
        answer:
          "Sur mobile iOS : ouvrez Erudia dans Safari → « Partager » → « Sur l'écran d'accueil ». Sur Android : Chrome → menu (⋮) → « Ajouter à l'écran d'accueil ». Sur desktop : Chrome affiche une icône d'installation dans la barre d'adresse. Après installation, l'app fonctionne comme une app native.",
      },
      {
        id: "offline-3",
        category: "offline",
        question: "Les scores sont-ils perdus si je joue hors ligne ?",
        answer:
          "Non. Les scores et badges sont sauvegardés en local (localStorage). Dès que la connexion est rétablie, la synchronisation avec Supabase se fait automatiquement en arrière-plan — aucune action de votre part.",
      },
      {
        id: "offline-4",
        category: "offline",
        question: "Faut-il être connecté pour débloquer Erudia+ ?",
        answer:
          "La connexion internet est nécessaire pour l'achat et la vérification du statut premium. Une fois Erudia+ activé, vous pouvez jouer hors ligne avec toutes les fonctionnalités débloquées.",
      },
      {
        id: "account-1",
        category: "account",
        question: "Faut-il créer un compte pour jouer ?",
        answer:
          "Non. Il suffit de choisir un pseudonyme et un avatar — pas d'email, pas de mot de passe pour l'enfant. Le profil est stocké localement et synchronisé en arrière-plan avec Supabase si vous êtes connecté.",
      },
      {
        id: "account-2",
        category: "account",
        question: "Peut-on avoir plusieurs profils enfants ?",
        answer:
          "En version gratuite : 1 profil par appareil. Avec Erudia+ : nombre de profils illimité, idéal pour les familles avec plusieurs enfants ou pour jouer sur plusieurs appareils.",
      },
      {
        id: "account-3",
        category: "account",
        question: "Comment modifier l'avatar ou le pseudo de l'enfant ?",
        answer:
          "Depuis l'écran Profil de l'enfant, un bouton d'édition permet de changer le pseudonyme et de choisir un nouvel avatar dans la galerie. Le changement est immédiat et sauvegardé localement.",
      },
      {
        id: "account-4",
        category: "account",
        question: "Que se passe-t-il si je change d'appareil ?",
        answer:
          "Si la synchronisation Supabase est active (compte adulte créé), tous les scores, badges et le profil sont accessibles depuis n'importe quel appareil. Sans sync, les données restent sur l'appareil d'origine.",
      },
      {
        id: "parent-1",
        category: "parent",
        question: "Comment accéder à l'espace parent ?",
        answer:
          "Un bouton discret « Espace parent » en bas de l'écran Profil permet d'accéder à l'admin. L'accès nécessite une authentification Supabase (email + mot de passe ou Google). Pas besoin de créer un compte parent séparé.",
      },
      {
        id: "parent-2",
        category: "parent",
        question: "Que puis-je voir dans l'espace parent ?",
        answer:
          "Scores par catégorie, streaks, badges obtenus, nombre de parties jouées, objectif journalier et son statut. Avec Erudia+, accédez aussi aux graphiques de progression et aux recommandations pédagogiques.",
      },
      {
        id: "parent-3",
        category: "parent",
        question: "Puis-je recevoir des rapports par email ?",
        answer:
          "Oui, avec Erudia+. Depuis l'espace admin, vous pouvez configurer l'envoi automatique hebdomadaire ou mensuel d'un rapport PDF, ou le télécharger/envoyer manuellement à tout moment.",
      },
      {
        id: "parent-4",
        category: "parent",
        question: "Comment définir un objectif journalier ?",
        answer:
          "Dans l'espace admin, vous choisissez un objectif (ex : 20 bonnes réponses par jour). L'app suit cet objectif et peut envoyer une notification email en fin de journée si l'objectif n'est pas atteint.",
      },
      {
        id: "billing-1",
        category: "billing",
        question: "L'abonnement se renouvelle-t-il automatiquement ?",
        answer:
          "Oui, mensuel ou annuel selon votre choix. Un email de rappel est envoyé 7 jours avant le renouvellement. Vous pouvez annuler à tout moment — vous gardez l'accès Erudia+ jusqu'à la fin de la période payée.",
      },
      {
        id: "billing-2",
        category: "billing",
        question: "Comment annuler mon abonnement ?",
        answer:
          "Dans l'espace admin → section Abonnement → bouton Annuler. L'annulation est instantanée, sans formulaire ni email. Vous conservez l'accès aux fonctionnalités premium jusqu'à la fin du cycle en cours.",
      },
      {
        id: "billing-3",
        category: "billing",
        question: "Puis-je obtenir un remboursement ?",
        answer:
          "Oui, remboursement intégral dans les 14 jours suivant l'achat, sans condition. Envoyez l'email de confirmation de commande Stripe à contact@erudia.app — traitement sous 5 jours ouvrés.",
      },
      {
        id: "billing-4",
        category: "billing",
        question: "Mes données de paiement sont-elles sécurisées ?",
        answer:
          "Erudia utilise Stripe, leader mondial du paiement en ligne. Erudia ne stocke jamais vos coordonnées bancaires. Toutes les transactions sont chiffrées et conformes à la norme PCI DSS.",
      },
      {
        id: "technical-1",
        category: "technical",
        question: "Sur quels appareils fonctionne Erudia ?",
        answer:
          "Tous les navigateurs modernes (Chrome, Safari, Firefox, Edge), mobile iOS 14+, Android 8+, tablette, desktop. Erudia est une PWA — pas besoin de passer par l'App Store ou le Play Store.",
      },
      {
        id: "technical-2",
        category: "technical",
        question: "Quelle est la taille de l'app ?",
        answer:
          "2 à 4 Mo de cache initial (questions + interface). Contrairement à une app native, l'espace de stockage est minimal et aucune installation via boutique n'est nécessaire.",
      },
      {
        id: "technical-3",
        category: "technical",
        question: "L'app fonctionne-t-elle sur iPhone/iPad ?",
        answer:
          "Oui, Erudia est optimisée pour Safari iOS 14+. Pour la meilleure expérience, ajoutez l'app à votre écran d'accueil via Safari. Note : iOS a quelques limitations vs Android (notamment les notifications push).",
      },
      {
        id: "technical-4",
        category: "technical",
        question: "Mes données sont-elles hébergées en Europe ?",
        answer:
          "Oui. Supabase est configuré sur la région Europe (Frankfurt). Vos données ne quittent pas l'Union européenne. Erudia est conforme au RGPD.",
      },
    ],
    empty: {
      noMatch: "Aucune question ne correspond à votre recherche.",
      tryOther: "Essayez un autre terme ou",
      contactLink: "contactez-nous",
    },
    contact: {
      title: "Vous ne trouvez pas ?",
      subline: "Johan répond personnellement à chaque message.",
      cta: "Écrire à Johan →",
    },
    cta: {
      title: "Prêt à essayer Erudia ?",
      subline: "Gratuit pour commencer. 30 secondes pour créer un profil.",
      btnPrimary: "Jouer gratuitement",
      btnSecondary: "Voir les tarifs",
      reassure: "✓ Gratuit · ✓ Sans pub · ✓ COPPA · ✓ Hors ligne",
    },
  },

  // ── Contact ──────────────────────────────────────────────────
  contact: {
    hero: {
      pill: "Contact",
      title: "Une question ?",
      titleAccent: "Je vous réponds.",
      subline:
        "C'est a moi qu vous parlez,  créateur, développeur et designer d'Erudia. Pas un bot, pas un formulaire automatique.",
      emailLabel: "Email",
      studioLabel: "Studio",
      locationLabel: "Localisation",
      locationValue: "Sud de la France 🌞",
      responseNote: "Je répond au plus vites en français ou en anglais.",
    },
    form: {
      heading: "Écrivez-moi",
      sub: "Je lis tout. Vraiment.",
      nameLabel: "Prénom *",
      namePh: "Marie",
      emailLabel: "Email *",
      emailPh: "marie@email.com",
      subjectLabel: "Sujet *",
      subjectDefault: "— Choisir un sujet —",
      messageLabel: "Message *",
      messagePh: "Bonjour Johan…",
      submit: "Envoyer le message ✈️",
      submitting: "Envoi en cours…",
      privacy:
        "Vos données ne sont utilisées que pour répondre à votre message. Aucune revente, aucun spam.",
      errorText: "Une erreur s'est produite. Écrivez directement à",
      errors: {
        nameRequired: "Le prénom est requis.",
        nameMin: "Le prénom doit contenir au moins 2 caractères.",
        emailRequired: "L'email est requis.",
        emailInvalid: "L'adresse email n'est pas valide.",
        subjectRequired: "Veuillez choisir un sujet.",
        messageRequired: "Le message est requis.",
        messageMin: "Le message doit contenir au moins 10 caractères.",
      },
      successTitle: "Message envoyé !",
      successText:
        "Merci — je vous réponds personnellement dans les 48h. À très vite !",
      successAgain: "Envoyer un autre message",
    },
    subjects: [
      { value: "", label: "— Choisir un sujet —" },
      { value: "bug", label: "🐞 Bug ou problème technique" },
      { value: "billing", label: "💳 Question sur l'abonnement" },
      { value: "account", label: "👤 Mon compte ou mon profil" },
      { value: "content", label: "📚 Contenu des questions" },
      { value: "partner", label: "🤝 Partenariat ou presse" },
      { value: "studio", label: "🛠️ Projet web / app (johanwebstudio.fr)" },
      { value: "other", label: "💬 Autre" },
    ],
    topicsHeading: "Sujets fréquents",
    directTitle: "Préférez l'email direct ?",
    directNote: "Même résultat — je lis tout.",
    bio: {
      pill: "Qui se cache derrière Erudia ?",
      title: "Une app de papa.",
      role: "Créateur d'Erudia · Dev freelance",
      tag1: "Papa",
      tag2: "Full-stack dev",
      tag3: "Designer",
      tag4: "Sud de France",
      studioLabel: "Studio freelance",
      p1: "Ma fille a grandi aux Philippines. Elle parle anglais et tagalog . Le français, c'est encore un peu flou pour elle. On vitNous vivons On vit entre deux cultures, deux langues, deux façons de voir le monde. Et quand j'ai essayé de lui faire découvrir l'histoire de France, la géo de l'Europe, les sciences… les apps que je trouvais étaient soit en anglais uniquement, soit coupées à la moindre absence de wifi, soit bourrées de pubs. Pas terrible pour une gamine de 6 ans.",
      quote:
        "\"Alors j'ai fait ce que font les devs quand ils trouvent pas ce qu'ils cherchent. J'ai développé une application.\"",
      quoteAuthor: "— Johan",
      p2: 'Erudia, c\'est ce projet-là. Commencé pour elle, fini pour vous aussi — enfin j\'espère. Je suis seul derrière\u00a0: le code, le design, les questions, le support. <a href="https://johanwebstudio.fr" target="_blank" rel="noopener noreferrer">Johanwebstudio</a>, c\'est mon studio freelance dans le sud de la France. Si vous avez un projet web ou app, vous savez où me trouver.',
      photoCaption: "On est comme ça, nous deux. 🇵🇭",
      founderAlt: "Johan, fondateur d'Erudia",
      filleAlt: "Johan et sa fille",
    },
    cta: {
      title: "Prêt à essayer Erudia ?",
      subline: "Gratuit pour commencer. 30 secondes pour créer un profil.",
      btnPrimary: "Essayer gratuitement",
      btnSecondary: "Voir les tarifs",
      reassure: "✓ Gratuit · ✓ Sans pub · ✓ COPPA · ✓ Hors ligne",
    },
  },

  // ── À propos ─────────────────────────────────────────────────
  about: {
    hero: {
      pill: "Notre histoire",
      title: "Une app née d'un",
      titleAccent: "besoin réel.",
      subline:
        "Erudia n'est pas né d'une étude de marché. Il est né d'un papa développeur, d'une petite fille philippine-française, et d'une question simple : pourquoi il n'existe pas une app comme ça ?",
    },
    vision: {
      pill: "Notre conviction pédagogique",
      title: "Pourquoi 500 questions par catégorie ?",
      subline:
        "La densité de contenu d'Erudia n'est pas un argument commercial. C'est une conviction.",
      blockquote:
        "Un enfant qui joue régulièrement doit finir par acquérir une vraie culture générale — pas une collection d'anecdotes.",
      p1: "C'est pourquoi chaque catégorie vise 500 à 800 questions : suffisamment pour qu'un enfant qui joue plusieurs fois par semaine ne revoie jamais les mêmes questions pendant des mois, et suffisamment pour couvrir en profondeur les thèmes du programme scolaire français (Cycles 2 et 3).",
      p2: "Le niveau de culture générale des enfants baisse. Les écrans passifs occupent le temps autrefois dédié à la lecture, aux jeux de société, aux encyclopédies. Erudia ne prétend pas résoudre ce problème seul — mais il se positionne explicitement comme un outil qui exige de savoir pour avancer, pas seulement de cliquer.",
      stat1Value: "500–800",
      stat1Label: "questions par catégorie",
      stat2Value: "20",
      stat2Label: "catégories thématiques",
      stat3Value: "Cycles 2 & 3",
      stat3Label: "programmes scolaires couverts",
    },
    fle: {
      pill: "Version anglophone",
      title: "La version EN n'est pas une traduction.",
      subline:
        "C'est un produit à part entière, conçu pour un profil bien précis.",
      p1: "La version anglaise d'Erudia a été pensée pour un enfant anglophone qui doit intégrer le référentiel culturel français — l'histoire de France, la géographie hexagonale, les institutions de la République — parce qu'il va vivre, étudier ou grandir en France.",
      p2: "Ce n'est pas du FLE au sens strict (apprendre la grammaire ou le vocabulaire). C'est une préparation au référentiel culturel et scolaire français, transmise dans la langue que l'enfant maîtrise déjà : l'anglais.",
      quote:
        "Cette vision est directement issue de l'expérience du fondateur : préparer sa propre fille à un retour en France après une enfance aux Philippines, en lui donnant les repères culturels et historiques qu'elle n'a pas pu acquérir naturellement.",
      pillFeature1: "Expliqué en anglais",
      pillFeature2: "Culture française",
      pillFeature3: "Programmes Cycles 2–3",
      pillFeature4: "Différenciateur fort",
      card1Title: "Conçu pour les familles bilingues",
      card1Text:
        "Enfants franco-étrangers, familles expatriées, enfants adoptés — Erudia EN leur donne les repères culturels français dans leur langue naturelle.",
      card2Title: "Pas une traduction, une adaptation",
      card2Text:
        "Chaque catégorie EN est calibrée sur ce que doit savoir un enfant qui arrive en France — depuis le point de vue de quelqu'un qui ne baigne pas encore dans cette culture.",
      card3Title: "Un différenciateur fort",
      card3Text:
        "Il n'existe pas d'outil équivalent sur le marché anglophone. Erudia se positionne comme la référence pour la préparation au référentiel scolaire français en anglais.",
    },
    cta: {
      title: "Vous aussi, essayez Erudia.",
      subline: "Gratuit pour commencer. Votre enfant joue en 30 secondes.",
      btnPrimary: "Jouer gratuitement",
      btnSecondary: "Voir les tarifs",
    },
  },

  // ── Légal ─────────────────────────────────────────────────────
  legal: {
    lastUpdated: "Dernière mise à jour : 26 mars 2026",
    backLink: "← Retour à l'accueil",

    mentions: {
      title: "Mentions légales",
      subtitle:
        "Informations légales obligatoires relatives au site erudia.app et à l'application app.erudia.app.",
      sections: [
        {
          heading: "Éditeur du site",
          paragraphs: [
            "Le site erudia.app et l'application app.erudia.app sont édités par Johan Callens, développeur freelance — Johanwebstudio, domicilié dans le sud de la France.",
            "Contact : contact@erudia.app",
          ],
        },
        {
          heading: "Directeur de la publication",
          paragraphs: ["Johan Callens — contact@erudia.app"],
        },
        {
          heading: "Hébergement",
          paragraphs: [
            "L'application est hébergée par Vercel Inc., 340 Pine Street Suite 603, San Francisco, CA 94104, États-Unis — vercel.com.",
            "La base de données et l'authentification sont assurées par Supabase Inc., infrastructure Europe (Frankfurt, Allemagne).",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des contenus présents sur Erudia (textes, visuels, questions, logo, mascotte Nova) sont la propriété exclusive de Johan Callens / Johanwebstudio, sauf mention contraire.",
            "Toute reproduction, distribution ou modification sans autorisation écrite préalable est strictement interdite.",
          ],
        },
        {
          heading: "Données personnelles",
          paragraphs: [
            "Erudia collecte uniquement l'adresse email des adultes dans le cadre de la gestion du compte et de l'abonnement. Aucune donnée nominale relative aux enfants n'est collectée.",
            "Pour en savoir plus, consultez notre Politique de confidentialité.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "La landing page erudia.app utilise Google Analytics 4 (GA4), un outil de mesure d'audience opéré par Google Ireland Ltd. Ce service dépose un cookie analytique uniquement après votre consentement explicite via la bannière affichée à votre première visite.",
            "Si vous refusez ou ignorez la bannière, aucun cookie analytique n'est déposé et GA4 n'est pas activé. Vous pouvez modifier votre choix à tout moment via le lien « Gestion des cookies » en bas de page.",
            "Cookies utilisés — _ga (Google Analytics, 13 mois) : distinguer les utilisateurs de manière anonyme. _ga_XXXXXXXX (Google Analytics, 13 mois) : maintenir l'état de session GA4. erudia_consent (first-party, 13 mois) : mémoriser votre choix de consentement.",
            "L'application app.erudia.app utilise uniquement des cookies de session strictement nécessaires au fonctionnement de l'authentification (Supabase Auth). Ces cookies sont exemptés de consentement.",
          ],
        },
      ],
    },

    privacy: {
      title: "Politique de confidentialité",
      subtitle:
        "Erudia s'engage à protéger la vie privée des utilisateurs, et en particulier celle des enfants. Cette politique détaille les données collectées et les droits des utilisateurs.",
      sections: [
        {
          heading: "Responsable du traitement",
          paragraphs: [
            "Johan Callens — Johanwebstudio — Sud de la France",
            "Contact DPO : contact@erudia.app",
          ],
        },
        {
          heading: "Données collectées",
          paragraphs: [
            "Données adultes (compte parent ou tuteur) : adresse email, historique de connexion, informations d'abonnement gérées via Stripe (aucun numéro de carte bancaire n'est stocké par Erudia).",
            "Données enfant : pseudonyme uniquement (choisi librement par l'adulte), progression de jeu (scores, badges, streaks). Aucun nom réel, aucun email enfant, aucune donnée permettant d'identifier l'enfant directement n'est collectée.",
          ],
        },
        {
          heading: "Finalité et base légale (RGPD)",
          paragraphs: [
            "Authentification et gestion du compte — base légale : exécution du contrat.",
            "Gestion de l'abonnement Erudia+ — base légale : exécution du contrat.",
            "Amélioration du service et statistiques agrégées — base légale : intérêt légitime.",
            "Aucune donnée n'est utilisée à des fins publicitaires ou revendue à des tiers.",
          ],
        },
        {
          heading: "Durée de conservation",
          paragraphs: [
            "Les données sont conservées pendant toute la durée du compte actif. En cas de suppression du compte, les données personnelles sont supprimées dans un délai de 30 jours.",
          ],
        },
        {
          heading: "Sous-traitants",
          paragraphs: [
            "Supabase Inc. — base de données et authentification — infrastructure Europe (Frankfurt, Allemagne).",
            "Vercel Inc. — hébergement de l'application — couvert par les clauses contractuelles types approuvées par la Commission européenne.",
            "Stripe Inc. — traitement des paiements — certifié PCI DSS niveau 1.",
          ],
        },
        {
          heading: "Vos droits (RGPD)",
          paragraphs: [
            "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : accès, rectification, suppression, portabilité, opposition et limitation du traitement.",
            "Pour exercer ces droits, contactez-nous à contact@erudia.app. Délai de réponse : 30 jours maximum. En cas de non-réponse, vous pouvez saisir la CNIL (cnil.fr).",
          ],
        },
        {
          heading: "Cookies et stockage local",
          paragraphs: [
            "La landing page erudia.app utilise Google Analytics 4 (base légale : consentement, Art. 6.1.a RGPD). GA4 n'est activé qu'après acceptation explicite via la bannière cookie. En cas de refus, aucun cookie tiers n'est déposé.",
            "Le cookie de consentement erudia_consent (first-party, 13 mois) enregistre votre choix : identifiant anonyme, date, version de la politique. Aucune donnée personnelle identifiable n'y figure.",
            "L'application app.erudia.app utilise un cookie de session Supabase Auth (strictement nécessaire, exempté de consentement selon la directive ePrivacy) et le stockage local du navigateur (localStorage, IndexedDB) pour la progression de jeu hors ligne et la préférence de langue.",
            "Aucun cookie publicitaire ou de profilage n'est utilisé sur aucun des deux périmètres.",
          ],
        },
      ],
    },

    terms: {
      title: "Conditions Générales d'Utilisation",
      subtitle:
        "En utilisant Erudia, vous acceptez les présentes conditions. Nous vous invitons à les lire attentivement.",
      sections: [
        {
          heading: "1. Objet et acceptation",
          paragraphs: [
            "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de l'application Erudia, accessible sur app.erudia.app, développée et éditée par Johan Callens — Johanwebstudio.",
            "En créant un profil ou en souscrivant à Erudia+, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.",
          ],
        },
        {
          heading: "2. Description du service",
          paragraphs: [
            "Erudia est une application web progressive (PWA) de quiz éducatif destinée aux enfants de 6 à 11 ans. Elle est accessible depuis tout navigateur moderne, sans installation obligatoire.",
            "Le service comprend deux niveaux : un accès gratuit incluant 3 catégories de questions, et un abonnement premium Erudia+ donnant accès à l'ensemble des catégories et fonctionnalités avancées.",
          ],
        },
        {
          heading: "3. Compte et accès",
          paragraphs: [
            "La création d'un profil enfant (pseudonyme + avatar) est libre et gratuite. La création d'un compte adulte (email + mot de passe ou connexion Google) est requise pour accéder à l'espace parent et souscrire à Erudia+.",
            "L'utilisateur est responsable de la confidentialité de ses identifiants. Toute utilisation frauduleuse du compte doit être signalée à contact@erudia.app.",
          ],
        },
        {
          heading: "4. Abonnement Erudia+",
          paragraphs: [
            "L'abonnement Erudia+ est disponible en formule mensuelle (1,99 €/mois) ou semestrielle (9,99 €/6 mois). Le paiement est traité de façon sécurisée par Stripe.",
            "L'abonnement se renouvelle automatiquement. Un email de rappel est envoyé 7 jours avant le renouvellement. L'utilisateur peut annuler à tout moment depuis l'espace admin — l'accès premium est maintenu jusqu'à la fin de la période payée.",
            "Erudia garantit un remboursement intégral dans les 14 jours suivant l'achat, sans condition. Demande à envoyer à contact@erudia.app avec la confirmation de commande Stripe.",
          ],
        },
        {
          heading: "5. Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des contenus d'Erudia (questions, textes, visuels, mascotte Nova, interface, code source) sont protégés par le droit d'auteur et la propriété intellectuelle, au bénéfice de Johan Callens / Johanwebstudio.",
            "Toute reproduction, modification, distribution ou exploitation commerciale non autorisée est interdite.",
          ],
        },
        {
          heading: "6. Limitation de responsabilité",
          paragraphs: [
            "Erudia est fourni \"en l'état\". Johanwebstudio s'efforce de maintenir le service disponible mais ne peut garantir une disponibilité permanente et sans interruption.",
            "Johanwebstudio ne saurait être tenu responsable d'une perte de données de progression stockée localement. Il est recommandé de créer un compte adulte pour activer la synchronisation et sécuriser la progression.",
          ],
        },
        {
          heading: "7. Résiliation",
          paragraphs: [
            "L'utilisateur peut supprimer son compte à tout moment depuis l'espace admin. La suppression entraîne la perte définitive du profil et de la progression. Les données personnelles sont effacées dans un délai de 30 jours.",
          ],
        },
        {
          heading: "8. Modification des CGU",
          paragraphs: [
            "Johan Callens se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont informés par email en cas de modification substantielle.",
            "La poursuite de l'utilisation du service après notification vaut acceptation des nouvelles CGU.",
          ],
        },
        {
          heading: "9. Loi applicable",
          paragraphs: [
            "Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents sont ceux du ressort du domicile de l'éditeur.",
            "Pour toute réclamation ou question : contact@erudia.app.",
          ],
        },
      ],
    },
  },
};
