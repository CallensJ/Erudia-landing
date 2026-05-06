# Erudia — Landing Page

> Landing page marketing bilingue de **[Erudia](https://erudia.app/fr)** — plateforme éducative pour enfants 6–11 ans.  
> Conçue pour convertir les visiteurs en utilisateurs inscrits.

[![Live](https://img.shields.io/badge/Live-erudia.app-4FC08D?style=flat&logo=vercel&logoColor=white)](https://erudia.app/fr)
![Vue](https://img.shields.io/badge/Vue.js-67.6%25-4FC08D?style=flat&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-30.9%25-3178C6?style=flat&logo=typescript&logoColor=white)
![Commits](https://img.shields.io/github/commit-activity/t/CallensJ/Erudia-landing?label=commits&color=88CE02)

---

## 🚀 Stack

| Catégorie | Technologie |
|-----------|------------|
| Framework | Vue.js 3 (Composition API, `<script setup>`) |
| Langage | TypeScript |
| Build tool | Vite |
| Styling | SCSS |
| Emails | Resend (formulaire de contact + newsletter) |
| Déploiement | Vercel (Serverless functions) |

---

## 📁 Architecture

```
Erudia-landing/
├── src/
│   ├── components/     # Composants Vue (sections, UI)
│   ├── views/          # Pages de la landing
│   ├── locales/        # Fichiers i18n (FR / EN)
│   └── assets/         # Styles SCSS et assets
├── api/                # Serverless functions — Resend (contact + newsletter)
├── public/             # Assets statiques
├── .env.local.example  # Variables d'environnement (template)
└── vercel.json         # Configuration déploiement
```

---

## ✨ Features

- **Bilingue FR / EN** — i18n complet, switch de langue en temps réel
- **Formulaire de contact** — envoi d'emails via [Resend](https://resend.com)
- **Inscription newsletter** — gestion des abonnés via Resend
- **Sections** : hero · fonctionnalités · tarifs · FAQ · CTA
- **Responsive mobile-first**
- **Transitions Vue** — animations de page et d'entrée des sections
- **SEO optimisé** — balises meta dynamiques par langue

---

## ⚙️ Installation locale

```bash
git clone https://github.com/CallensJ/Erudia-landing.git
cd Erudia-landing
npm install
```

Copier le fichier d'environnement :

```bash
cp .env.local.example .env.local
```

Variables requises :

```env
RESEND_API_KEY=your_resend_api_key
```

Lancer le serveur de développement :

```bash
npm run dev
```

---

## 🔗 Projet lié

| Repo | Description |
|------|-------------|
| [quizzly](https://github.com/CallensJ/quizzly) | Application Erudia — Next.js + Stripe + Auth |

---

## 🌐 Live

[erudia.app/fr](https://erudia.app/fr)

---

> Développé par [Johan Callens](https://github.com/CallensJ) · [JohanWebStudio](https://johanwebstudio.fr)
