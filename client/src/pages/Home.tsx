/**
 * H-Spatial Plaquette Commerciale - Aménageurs Fonciers
 * Design: "Geo-Corporate Luxe" — Corporate Premium Minimalism with geospatial touches
 * Colors: #0047AB (blue), #00A86B (green), #4A5568 (gray), #0A1628 (dark)
 * Fonts: Poppins (headings), Open Sans (body)
 * NO framer-motion — pure CSS animations for reliability
 * 
 * V2: + Formulaire de contact + Témoignages/Références + Bouton PDF
 * V3: + Navbar fixe + Compteurs animés + Bouton WhatsApp flottant
 * V4: + Bandeau d'urgence + Galerie photos projets + Menu hamburger animé
 * V5: + Mode sombre + Section FAQ + Animations de scroll
 * V6: + Section Partenaires Institutionnels (9 logos)
 * V7: + Lien Partenaires navbar + Carrousel logos footer + Liens cliquables sites officiels
 * V8: + Bouton retour en haut + Tracking UTM sur liens CTA
 * V9: + Carte interactive Côte d'Ivoire avec zones d'intervention
 * V10: + Carte Leaflet/OpenStreetMap avec GeoJSON réel du shapefile CI
 * V11: + Lazy loading images (IntersectionObserver + native) + Lazy carte Leaflet
 * V12: + Micro-animations scroll sur icônes services (entrée, pulse, wobble, float)
 * V13: + Micro-animations scroll sur étapes méthodologie (bounce, slide-in, line grow, glow)
 * V14: + Micro-animations scroll sur section avantages (flip-up, pop-in, float, ring pulse, hover tilt)
 * V15: + Barre de progression de lecture en haut de page (scroll indicator)
 * V16: + Lien Zones dans la navbar
 * V17: + Optimisation responsive carte Leaflet (hauteur adaptative, marqueurs mobile)
 * V18: + Animation d'entrée fondu progressif marqueurs et lignes Leaflet
 * V19: + Effet parallaxe subtil sur hero et sections sombres
 * V20: + Animation typewriter sur le titre du Hero
 * V21: + Effet flip 3D sur cartes de services avec détails (livrables, délai, outils)
 * V22: + Loading Screen (2 losanges tournants, fade-out 1.5s) + Système de particules Canvas Hero
 * V23: + Grille animée en perspective (grid-bg) dans le Hero
 * V24: + Éléments géométriques flottants (losanges) dans le Hero
 * V25: + Animation SVG progressive du logo dans le loading screen
 * V26: + Loading screen 2 phases : losanges tournants (1.5s) puis dessin SVG logo progressif
 * V27: + Vrai logo SVG H-Spatial (icon.svg) dans la Phase 2 du loading screen
 * V28: + Ancrage territorial (suppression Bingerville/Bassam/Jacqueville, ajout San-Pédro)
 *       + Opacité particules géométriques augmentée (0.08→0.18)
 *       + Loading screen Phase 2 = reproduction exacte du fichier HTML (pathReveal + pulse + progress)
 */

import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { address, assets, company, contact, credentials, social } from "../data/company";
import { useJsonLd } from "../hooks/useJsonLd";
import { usePageSeo } from "../hooks/usePageSeo";
import { LoadingScreen } from "../components/LoadingScreen";
import { Advantages } from "../components/sections/Advantages";
import { ContactSection } from "../components/sections/ContactForm";
import { DoubleExpertise } from "../components/sections/DoubleExpertise";
import { FAQ } from "../components/sections/FAQ";
import { Hero } from "../components/sections/Hero";
import { InteractiveMap } from "../components/sections/InteractiveMap";
import { Methodology } from "../components/sections/Methodology";
import { Partners } from "../components/sections/Partners";
import { RegulatoryFrame } from "../components/sections/RegulatoryFrame";
import { ServicesGrid } from "../components/sections/ServicesGrid";
import { Testimonials } from "../components/sections/Testimonials";

// ─── SEO ──────────────────────────────────────────────
const HOME_URL = "https://www.horizonspatial.ci/";
const HOME_TITLE = "H-Spatial | Bureau d'Études d'Urbaniste Agréé — Côte d'Ivoire";
const HOME_DESCRIPTION = "Horizon Spatial : urbaniste agréé O.N.U.C.I. spécialisé en lotissements, aménagement foncier, promotion immobilière,géomatique et cartographie par drone en Côte d'Ivoire. Conformité légale garantie, devis gratuit.";
const HOME_IMAGE = "https://www.horizonspatial.ci/assets/images/hero-cover.webp";

// ─── COMPONENT ────────────────────────────────────────
export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  usePageSeo({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: HOME_URL,
    image: HOME_IMAGE,
  });

  // JSON-LD Organization + LocalBusiness (adresse, horaires, contact) —
  // éligibilité rich snippets / Knowledge Panel Google.
  useJsonLd({
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: company.legalName,
    alternateName: company.shortName,
    legalName: company.legalName,
    slogan: company.slogan,
    description: company.description,
    url: "https://www.horizonspatial.ci",
    logo: `https://www.horizonspatial.ci${assets.logoColor}`,
    image: HOME_IMAGE,
    telephone: contact.phonePrimary.replace(/\s/g, ""),
    email: contact.emailPro,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.district,
      addressLocality: address.city,
      addressCountry: "CI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.geo.lat,
      longitude: address.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: [social.linkedin, social.facebook],
    areaServed: "CI",
    memberOf: {
      "@type": "Organization",
      name: credentials.onuciFull,
    },
  });

  // Lorsque l'utilisateur arrive depuis une autre page avec une ancre dans l'URL
  // (ex. `/a-propos` → clic « Contact » → `/#contact`), le navigateur tente de
  // scroller AVANT que React ait monté les sections — le scroll échoue.
  // On re-traite l'ancre après le mount, en respectant le scroll-padding-top
  // de la nav fixe.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    const timer = setTimeout(() => {
      let target: Element | null = null;
      try { target = document.querySelector(hash); } catch { /* hash malformé */ }
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main id="main-content" className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-white"}`}>
      {/* Loading Screen — uniquement sur l'accueil (première impression) */}
      <LoadingScreen />

      {/* Note : Navbar, ReadingProgressBar, WhatsAppButton,
         ScrollToTopButton et CookieBanner sont rendus au niveau App
         (cf. App.tsx → SiteChrome) — partagés entre toutes les pages. */}

      <Hero />

      <RegulatoryFrame isDark={isDark} />

      <DoubleExpertise />

      <ServicesGrid isDark={isDark} />

      <Methodology />

      <Advantages isDark={isDark} />

      <Testimonials isDark={isDark} />

      <InteractiveMap isDark={isDark} />

      <FAQ isDark={isDark} />

      <Partners isDark={isDark} />

      <ContactSection />

      {/* Note : Navbar, ReadingProgressBar, WhatsAppButton, ScrollToTopButton,
         CookieBanner ET SiteFooter sont rendus au niveau App
         (cf. App.tsx → SiteChrome) — partagés entre toutes les pages. */}
    </main>
  );
}

