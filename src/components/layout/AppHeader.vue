<!-- AppHeader.vue — Navbar globale de la landing Erudia
     - Fixed, glassmorphism, shadow au scroll
     - Desktop (≥768px) : liens nav + toggle langue + CTA
     - Mobile (<768px) : hamburger + menu slide-down
     - Pas de vue-i18n pour l'instant — textes FR en dur, EN à brancher -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

// État menu mobile
const isMenuOpen = ref(false);

// Ombre au scroll
const isScrolled = ref(false);

// Langue active (UI only pour l'instant)
const lang = ref<"fr" | "en">("fr");

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
    isMenuOpen.value = false;
}

function setLang(l: "fr" | "en") {
    lang.value = l;
}

function handleScroll() {
    isScrolled.value = window.scrollY > 10;
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});

// Liens de navigation
const navLinks = [
    { label: "Fonctionnalités", to: "/features" },
    { label: "Comment ça marche", to: "/how-it-works" },
    { label: "Tarifs", to: "/pricing" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
];
</script>

<template>
    <header class="header" :class="{ 'header--scrolled': isScrolled }">
        <div class="container">
            <div class="header__inner">
                <!-- Logo -->
                <RouterLink to="/" class="header__logo" @click="closeMenu">
                    <div class="header__logo-icon">🦉</div>
                    <span>Erudia</span>
                </RouterLink>

                <!-- Nav desktop -->
                <nav class="header__nav" aria-label="Navigation principale">
                    <RouterLink
                        v-for="link in navLinks"
                        :key="link.to"
                        :to="link.to"
                        class="header__nav-link"
                        :class="{
                            'header__nav-link--active': route.path === link.to,
                        }"
                    >
                        {{ link.label }}
                    </RouterLink>
                </nav>

                <!-- Droite : langue + CTA + hamburger -->
                <div class="header__right">
                    <!-- Toggle langue -->
                    <div class="header__lang" role="group" aria-label="Langue">
                        <button
                            class="header__lang-btn"
                            :class="{
                                'header__lang-btn--active': lang === 'fr',
                            }"
                            @click="setLang('fr')"
                        >
                            FR
                        </button>
                        <button
                            class="header__lang-btn"
                            :class="{
                                'header__lang-btn--active': lang === 'en',
                            }"
                            @click="setLang('en')"
                        >
                            EN
                        </button>
                    </div>

                    <!-- CTA desktop -->
                    <a
                        href="https://app.erudia.app"
                        class="btn btn--primary btn--sm header__cta"
                        target="_blank"
                        rel="noopener"
                    >
                        Jouer maintenant
                    </a>

                    <!-- Hamburger mobile -->
                    <button
                        class="header__hamburger"
                        :class="{ 'header__hamburger--open': isMenuOpen }"
                        @click="toggleMenu"
                        aria-label="Menu"
                        :aria-expanded="isMenuOpen"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Menu mobile — en dehors du header pour le positionnement -->
    <nav
        class="mobile-menu"
        :class="{ 'mobile-menu--open': isMenuOpen }"
        aria-label="Menu mobile"
    >
        <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-menu__link"
            @click="closeMenu"
        >
            {{ link.label }}
        </RouterLink>
        <a
            href="https://app.erudia.app"
            class="btn btn--primary mobile-menu__cta"
            target="_blank"
            rel="noopener"
            @click="closeMenu"
        >
            Jouer maintenant
        </a>
    </nav>
</template>

<style lang="scss" scoped>
@use "@/styles/abstracts/mixins" as m;

// ── Header ──────────────────────────────────────────────────
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: var(--header-h);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(102, 126, 234, 0.1);
    transition: box-shadow var(--transition);
    // display:flex sur le header pour que .container hérite la hauteur complète
    display: flex;
    align-items: stretch;

    // Le container doit s'étirer pour que header__inner puisse se centrer
    .container {
        display: flex;
        align-items: center;
        width: 100%;
    }

    &--scrolled {
        box-shadow: var(--shadow-md);
    }

    &__inner {
        display: flex;
        align-items: center;
        width: 100%;
    }

    // Logo — flex: 1 pour occuper la moitié gauche et pousser le nav au centre
    &__logo {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 1.4rem;
        color: var(--color-primary-dark);
        text-decoration: none;
    }

    &__logo-icon {
        width: 36px;
        height: 36px;
        background: var(--gradient-primary);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        flex-shrink: 0;
    }

    // Nav desktop — masquée sur mobile
    &__nav {
        display: none;
        align-items: center;
        gap: 4px;

        @include m.respond-to(md) {
            display: flex;
        }
    }

    &__nav-link {
        padding: 8px 14px;
        border-radius: var(--radius-sm);
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--color-text-secondary);
        transition: all var(--transition);
        text-decoration: none;

        &:hover,
        &--active {
            color: var(--color-primary);
            background: rgba(102, 126, 234, 0.08);
        }
    }

    // Partie droite — flex: 1 pour occuper la moitié droite, contenu aligné à droite
    &__right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
    }

    // Toggle langue
    &__lang {
        display: flex;
        align-items: center;
        background: var(--color-surface);
        border-radius: var(--radius-full);
        padding: 3px;
        gap: 2px;
    }

    &__lang-btn {
        padding: 5px 12px;
        border-radius: var(--radius-full);
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--color-text-light);
        transition: all var(--transition);
        cursor: pointer;
        border: none;
        background: none;
        font-family: inherit;

        &--active {
            background: white;
            color: var(--color-primary);
            box-shadow: var(--shadow-sm);
        }
    }

    // CTA — masqué sur mobile
    &__cta {
        display: none;

        @include m.respond-to(md) {
            display: inline-flex;
        }
    }

    // Hamburger — visible uniquement sur mobile
    &__hamburger {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 8px;
        border-radius: var(--radius-sm);
        cursor: pointer;
        border: none;
        background: none;

        @include m.respond-to(md) {
            display: none;
        }

        span {
            display: block;
            width: 22px;
            height: 2px;
            background: var(--color-text);
            border-radius: 2px;
            transition: all var(--transition);
        }

        // Animation croix
        &--open {
            span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            span:nth-child(2) {
                opacity: 0;
            }
            span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    }
}

// ── Menu mobile ──────────────────────────────────────────────
.mobile-menu {
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    background: white;
    padding: 24px 20px;
    border-bottom: 1px solid var(--color-surface-dark);
    box-shadow: var(--shadow-md);
    z-index: 999;

    // Masqué par défaut avec slide up
    transform: translateY(-110%);
    opacity: 0;
    pointer-events: none;
    transition:
        transform 0.3s ease,
        opacity 0.3s ease;

    &--open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }

    // Masqué sur desktop
    @include m.respond-to(md) {
        display: none;
    }

    &__link {
        display: block;
        padding: 14px 0;
        font-weight: 600;
        font-size: 1rem;
        color: var(--color-text-secondary);
        border-bottom: 1px solid var(--color-surface);
        text-decoration: none;
        transition: color var(--transition);

        &:last-of-type {
            border-bottom: none;
        }

        &:hover {
            color: var(--color-primary);
        }
    }

    &__cta {
        margin-top: 20px;
        width: 100%;
        justify-content: center;
    }
}
</style>
