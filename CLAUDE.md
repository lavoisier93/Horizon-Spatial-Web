# CLAUDE.md — Briefing Claude Code pour Horizon Spatial Web

> Ce fichier est le **contexte officiel** que Claude Code doit lire avant toute intervention sur ce dépôt. Il contient l'identité de l'entreprise, l'état du code, les priorités d'amélioration et les règles de travail.

---

## 1. Qui est le client ?

**HORIZON SPATIAL (H-Spatial)** — bureau d'études en urbanisme, aménagement, géomatique et foncier basé à Abidjan-Cocody Angré CHU, Côte d'Ivoire.

- **Forme** : SARL, capital 1 000 000 FCFA, membre O.N.U.C.I.
- **Slogan** : « Voir plus loin, bâtir mieux »
- **Signature internationale** : *H-Spatial | Spatial Intelligence for Africa*
- **Vision** : Devenir le leader ouest-africain de l'intelligence territoriale.
- **Cibles** : aménageurs fonciers, promoteurs immobiliers, collectivités, ministères (MUDG, MCLU, AGEROUTE, AGEF, AFOR), bailleurs (BM, BAD, AFD, UE, BID).
- **Site web** : www.horizonspatial.ci · contact@horizonspatial.ci

### Charte graphique (à respecter strictement)

| Élément | Valeur |
|---|---|
| Bleu Professionnel (principal) | `#0047AB` |
| Vert Durabilité (secondaire) | `#00A86B` |
| Gris Technique | `#4A5568` |
| Bleu Nuit (sections sombres) | `#0A1628` |
| Police titres | **Poppins** (Bold/SemiBold) |
| Police corps | **Open Sans** Regular |
| Police technique | Source Sans Pro |

Direction artistique retenue : **« Geo-Corporate Luxe »** — Corporate Premium Minimalism avec touches géospatiales subtiles (motifs topographiques, icônes pin/grille/satellite, micro-animations data-driven). Voir `ideas.md` à la racine.

---

## 2. Stack technique

- **Framework** : React 19 + TypeScript + Vite 7
- **Routing** : `wouter` (patché — voir `patches/wouter@3.7.1.patch`)
- **Styles** : Tailwind CSS v4 (via `@tailwindcss/vite`) + variables OKLCH dans `client/src/index.css` + `tw-animate-css`
- **UI kit** : shadcn/ui (Radix UI primitives) dans `client/src/components/ui/`
- **Icônes** : `lucide-react`
- **Animations** : CSS pures principalement + `framer-motion` disponible
- **Carte** : `leaflet` + GeoJSON Côte d'Ivoire
- **Formulaires** : `react-hook-form` + `zod`
- **Toasts** : `sonner`
- **Charts** : `recharts`
- **Serveur** : Express minimal (`server/index.ts`) qui sert le build statique
- **Package manager** : **pnpm** (obligatoire — `pnpm-lock.yaml` présent)
- **Routes actuelles** : `/`, `/politique-de-confidentialite`, `/404`

### Commandes
```bash
pnpm install
pnpm dev        # Vite dev server
pnpm build      # Build client + bundle serveur Express
pnpm start      # Lance le serveur de production
pnpm check      # Type-check TS (tsc --noEmit)
pnpm format     # Prettier
```

---

## 3. État actuel du code — observations

Ce qu'il faut savoir avant de modifier quoi que ce soit :

1. **`client/src/pages/Home.tsx` fait ~3 080 lignes** et a été itéré jusqu'à la **V28** (historique en commentaire en tête de fichier). Tout y vit : Hero, Loading Screen, Navbar, Services, Méthodologie, Avantages, Carte Leaflet, Galerie, Témoignages, FAQ, Partenaires, Footer, Bouton WhatsApp, Bouton retour-en-haut, Particules Canvas, etc. **C'est la dette technique principale.**
2. Le fichier `ideas.md` documente la direction artistique « Geo-Corporate Luxe ». Le respecter en cas d'évolution visuelle.
3. Le `ThemeProvider` est en mode `switchable` avec `defaultTheme="light"` — le mode sombre est déjà câblé.
4. Le serveur Express ne sert que des fichiers statiques + un fallback SPA. Pas d'API actuellement (le formulaire de contact n'a probablement pas de backend connecté).
5. `client/public/__manus__/debug-collector.js` est un résidu d'un ancien outil — à auditer/supprimer.
6. Patch `wouter` appliqué via pnpm — ne pas casser cette configuration.

---

## 4. Mission — Priorités d'amélioration

Travaille **par lots prioritaires**, en proposant un plan avant chaque lot et en attendant validation. **N'essaie pas de tout faire d'un coup.**

### LOT 1 — Refactoring `Home.tsx` (priorité absolue)
Découper `Home.tsx` en composants atomiques dans `client/src/components/sections/` :

```
sections/
  ├── LoadingScreen.tsx
  ├── Navbar.tsx
  ├── Hero.tsx
  ├── ServicesGrid.tsx
  ├── Methodology.tsx
  ├── Advantages.tsx
  ├── InteractiveMap.tsx       (Leaflet — lazy loaded)
  ├── ProjectsGallery.tsx
  ├── Testimonials.tsx
  ├── FAQ.tsx
  ├── Partners.tsx
  ├── ContactForm.tsx
  ├── Footer.tsx
  └── floating/
        ├── WhatsAppButton.tsx
        ├── ScrollToTop.tsx
        └── ReadingProgress.tsx
```

Règles :
- Extraire les **données** (services, méthodologie, témoignages, FAQ, partenaires…) dans `client/src/data/*.ts` avec des types stricts.
- Extraire les **hooks** custom dans `client/src/hooks/` (ex. `useScrollProgress`, `useIntersectionAnimation`, `useTypewriter`, `useCountUp`, `useParticlesCanvas`).
- Garder les noms de classes Tailwind et l'identité visuelle **strictement identiques** à l'existant — ce refactor est **iso-fonctionnel et iso-visuel**. Pas de relooking dans ce lot.
- Lazy-loader la carte Leaflet (`React.lazy` + `Suspense`).
- Vérifier `pnpm check` (zéro erreur TS) et `pnpm build` après chaque commit.

### LOT 2 — Performance & Core Web Vitals
- Audit Lighthouse (mobile + desktop) — viser ≥ 90 sur Performance, Accessibility, Best Practices, SEO.
- Préchargement des fonts Google (Poppins, Open Sans) avec `display=swap`.
- Compression et formats modernes pour les images (WebP/AVIF, `loading="lazy"`, dimensions explicites pour éviter le CLS).
- Code splitting des pages (`React.lazy` sur `PrivacyPolicy`).
- Inspecter le bundle (`vite-bundle-visualizer` ou équivalent) et écarter les dépendances non utilisées.
- Tester le LCP du Hero (souvent le coupable n°1).

### LOT 3 — SEO & métadonnées
- `<title>`, `<meta name="description">`, Open Graph, Twitter Card, canonical, hreflang `fr-CI`.
- Schema.org JSON-LD : `Organization` + `LocalBusiness` (adresse Cocody Angré CHU, GPS, horaires, téléphone, slogan).
- `sitemap.xml` et `robots.txt` dans `client/public/`.
- Balises `lang="fr"` sur `<html>`.
- Titres `<h1>` / `<h2>` cohérents et uniques par section.

### LOT 4 — Accessibilité (WCAG 2.1 AA)
- Contraste suffisant (auditer le `#0047AB` sur fond clair et l'inverse).
- `alt` sur toutes les images (descriptions métier, pas génériques).
- Focus visibles sur tous les éléments interactifs.
- Navigation clavier complète (menu mobile, FAQ accordéon, carrousel).
- `aria-label` sur les boutons icône (WhatsApp, retour-en-haut, hamburger, mode sombre).
- Respecter `prefers-reduced-motion` pour les animations (particules, parallaxe, typewriter).

### LOT 5 — Backend formulaire de contact
Aujourd'hui le formulaire est probablement décoratif. Choisir une option :
- **Option A (rapide)** : Formspree / Web3Forms / Formspark — pas de backend.
- **Option B (intégrée)** : route `POST /api/contact` dans `server/index.ts` qui envoie un email via SMTP (nodemailer) ou un service (Resend, Brevo).
- Validation `zod` côté client ET serveur. Honeypot + rate limiting basique.
- Confirmation visuelle via `sonner`.

### LOT 6 — Contenu & crédibilité
- Page **Références / Réalisations** dédiée (extraire la galerie en route `/realisations` avec détail par projet).
- Page **À propos** (équipe, agréments O.N.U.C.I., engagement RSE).
- Page **Services** par pôle (Urbanisme, Géomatique) avec fiches détaillées.
- Blog / Actualités (optionnel, si MDX accepté).
- Statistiques chiffrées vérifiables (toujours sourcer : INS, BNETD, Banque Mondiale).

### LOT 7 — Analytics & conformité RGPD/loi ivoirienne
- Bandeau cookies conforme (consent management) — Plausible ou Umami plutôt que GA pour réduire le besoin de consentement.
- Mettre à jour `PrivacyPolicy.tsx` pour refléter les outils réellement utilisés.
- Mention légale ARTCI (Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire) dans le footer.

---

## 5. Règles de travail pour Claude Code

1. **Toujours lire `ideas.md`** avant un changement visuel.
2. **Ne jamais altérer la charte graphique** sans demande explicite. Bleu `#0047AB`, vert `#00A86B`, polices Poppins/Open Sans.
3. **Travailler par petits commits atomiques** avec des messages clairs en français : `refactor(home): extraire Hero dans sections/Hero.tsx`.
4. **Avant chaque modification importante** : présenter un plan, attendre validation du dev.
5. **Après chaque modification** : lancer `pnpm check` puis `pnpm build`. Ne jamais livrer un code qui casse le build.
6. **TypeScript strict** : aucun `any` implicite, props typées, données externes validées avec `zod`.
7. **Pas de framer-motion sur le lot refactor** : conserver l'existant en CSS. Framer-motion peut être réintroduit ponctuellement, jamais globalement.
8. **Mobile-first** : chaque section doit être testée à 360 px de largeur avant validation.
9. **Pas d'emoji dans le code, dans l'UI ou dans les commits.**
10. **Signature des contenus produits** :
    - Formel : `HORIZON SPATIAL — Bureau d'Études Urbanisme & Géomatique`
    - Informel : `H-Spatial — Voir plus loin, bâtir mieux`
11. **Localisation** : tout le contenu visible est en **français** (avec terminologie urbanisme/géomatique correcte). L'anglais est réservé aux balises techniques et à la signature internationale.
12. **Données réelles uniquement** : pas de Lorem Ipsum, pas de chiffres inventés. Si une donnée manque, demander.
13. **Ne pas toucher** à `patches/wouter@3.7.1.patch` ni au `pnpm-lock.yaml` sans raison.
14. **Supprimer** `client/public/__manus__/` après validation.

---

## 6. Comment démarrer une session avec Claude Code

Copie/colle ce prompt initial dans Cursor :

```
Lis CLAUDE.md à la racine du dépôt avant tout. Une fois lu, propose-moi un plan détaillé pour le LOT 1 (refactoring de Home.tsx en composants de sections). N'écris aucun code tant que je n'ai pas validé le plan. Liste : (a) la nouvelle arborescence /components/sections, (b) l'ordre d'extraction des composants, (c) les hooks et fichiers de données à créer, (d) les vérifications (pnpm check, pnpm build) entre chaque étape, (e) une estimation du nombre de commits.
```

Ensuite, pour chaque lot suivant : `Passons au LOT N. Propose-moi le plan.`

---

## 7. Ressources de référence dans le projet

- `ideas.md` — direction artistique
- `client/src/index.css` — variables OKLCH + tokens Tailwind v4
- `client/src/contexts/ThemeContext.tsx` — gestion du dark mode
- `client/src/components/ui/` — primitives shadcn/ui réutilisables
- `shared/const.ts` — constantes partagées
- `components.json` — config shadcn/ui

---

**HORIZON SPATIAL**
Bureau d'Études Urbanisme & Géomatique
www.horizonspatial.ci · contact@horizonspatial.ci
*Voir plus loin, bâtir mieux.*
