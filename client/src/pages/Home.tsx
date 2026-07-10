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

import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Plane,
  FileCheck,
  Building2,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  Scale,
  Target,
  Clock,
  Users,
  BadgeCheck,
  Layers,
  PenTool,
  FolderCheck,
  Handshake,
  Cuboid,
  ArrowRight,
  Send,
  Star,
  Quote,
  MapPinned,
  TreePine,
  Ruler,
  User,
  MessageSquare,
  Briefcase,
  Menu,
  X,
  Camera,
  Eye,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  HelpCircle,
  Plus,
  Minus,
  Linkedin,
  Facebook,
  Navigation,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "wouter";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import { z } from "zod";
import { useTheme } from "../contexts/ThemeContext";
import { loadUmami } from "../lib/analytics";
import { useCountUp } from "../hooks/useCountUp";
import { HeroParticles } from "../components/HeroParticles";
import { LazyImage } from "../components/LazyImage";
import { LoadingScreen } from "../components/LoadingScreen";
import { Reveal } from "../components/Reveal";
import { useParallax } from "../hooks/useParallax";
import { addUtm } from "../lib/utm";
import {
  address,
  assets,
  buildMailtoUrl,
  buildWhatsAppUrl,
  company,
  contact,
  credentials,
  social,
} from "../data/company";
import { founder } from "../data/founder";

// ─── TYPEWRITER COMPONENT ──────────────────────
function TypewriterText({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 2500,
  className = "",
  style,
}: {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished typing, pause
        setIsPaused(true);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [displayText, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} style={style}>
      {displayText}
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}

// CDN URLs
// Logos & portraits — alimentés par client/src/data/company.ts (source unique).
const LOGO_WHITE = assets.logoWhite;
// Images locales (rapatriement issue #14 — finies les URLs Manus CDN signées
// qui expiraient le 31 décembre 2026). Sources : client/public/assets/images/
const HERO_IMG = "/assets/images/hero-cover.jpg";
const DRONE_IMG = "/assets/images/drone-survey.jpg";
const OFFICE_IMG = "/assets/images/urbanist-work.jpg";
const LEGAL_IMG = "/assets/images/legal-compliance.jpg";
const TOPO_IMG = "/assets/images/topo-pattern.png";
const PLAN_IMG = "/assets/images/plan-img.png";
const LAVOISIER_IMG = assets.founderPortrait;
const LAVOISIER_ONUCI_IMG = assets.onuciCeremony;
const LOGO_COLOR = assets.logoColor;
const WHATSAPP_NUMBER = contact.whatsappE164;
const LINKEDIN_URL = social.linkedin;
const FACEBOOK_URL = social.facebook;

// Logos partenaires institutionnels
const LOGO_MCLU = "/assets/images/logo-mclu.png";
const LOGO_GEOMETRES = "/assets/images/logo-geometres.png";
const LOGO_BNETD = "/assets/images/logo-bnetd.jpg";
const LOGO_OACI = "/assets/images/logo-oaci.jpg"
const LOGO_IGNFI = "/assets/images/logo-ignfi.jpg";
const LOGO_AFOR = "/assets/images/logo-afor.png";
const LOGO_GEOFIT = "/assets/images/logo-geofit.png";
const LOGO_DISTRICT = "/assets/images/logo-district.jpg";
const LOGO_CNOUCI = "/assets/images/logo-cnouci.png";
const LOGO_CETIF = "/assets/images/logo-cetif.jpg";
// Galerie réalisations — rapatriement local (issue #14)
const GALLERY_DRONE = "/assets/images/gallery-drone-lotissement.jpg";
const GALLERY_PLAN = "/assets/images/gallery-plan-approuve.jpg";
const GALLERY_MAQUETTE = "/assets/images/gallery-maquette-3d.jpg";

const poppins = { fontFamily: "'Poppins', sans-serif" };

// GeoJSON data URLs — fichiers locaux (source : geoBoundaries.org, CIV ADM0/ADM1)
const CIV_OUTLINE_URL = "/geo/civ-outline.geojson";
const CIV_REGIONS_URL = "/geo/civ-regions.geojson";

// ─── ANIMATED SERVICE ICON ────────────────────────────
// Scroll-triggered micro-animation: scale+rotate entrance, pulse ring, hover wobble, gentle float
function AnimatedServiceIcon({ icon: Icon, color, index }: { icon: React.ElementType; color: string; index: number }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={iconRef}
      className={`service-icon-wrapper w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative ${
        isVisible ? "service-icon-pulse" : ""
      }`}
      style={{ backgroundColor: `${color}10` }}
    >
      <div
        className={`service-icon-anim ${isVisible ? "icon-visible service-icon-float" : ""}`}
        data-delay={index}
        style={{ "--float-delay": `${index * 0.4}s` } as React.CSSProperties}
      >
        <Icon className="w-7 h-7 service-icon-svg" style={{ color }} />
      </div>
    </div>
  );
}

// ─── ANIMATED STEP COMPONENT ─────────────────────────────
// Scroll-triggered animation for methodology steps: circle bounce, content slide-in, line grow
function AnimatedStep({ item, index, isLast }: { item: { title: string; desc: string }; index: number; isLast: boolean }) {
  const stepRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = stepRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stepRef} className="flex gap-6 mb-8 last:mb-0 step-row-hover">
      <div className="flex flex-col items-center">
        <div
          className={`step-circle-anim w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 ${
            isVisible ? "step-visible" : ""
          } ${isLast && isVisible ? "step-circle-glow" : ""}`}
          data-step={index}
          style={{
            backgroundColor: isLast ? "#00A86B" : "transparent",
            borderColor: isLast ? "#00A86B" : "rgba(255,255,255,0.2)",
          }}
        >
          <span className="text-white font-bold text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>0{index + 1}</span>
        </div>
        {!isLast && (
          <div
            className={`step-line-anim w-px h-full min-h-[2rem] bg-white/10 my-2 ${isVisible ? "step-visible" : ""}`}
            data-step={index}
          />
        )}
      </div>
      <div
        className={`step-content-anim pb-4 ${isVisible ? "step-visible" : ""}`}
        data-step={index}
      >
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

// ─── ANIMATED ADVANTAGE CARD ─────────────────────────────
// Scroll-triggered animation for advantage cards: flip-up entrance, icon pop-in, float, ring pulse
function AnimatedAdvantageCard({ adv, index, isDark }: {
  adv: { icon: React.ElementType; title: string; desc: string; accent: string };
  index: number;
  isDark: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`adv-card-anim adv-card-hover text-center p-8 rounded-2xl border h-full ${
        isVisible ? "adv-visible" : ""
      } ${isDark ? "bg-white/5 border-white/10 hover:bg-white/[0.08]" : "bg-[#F8FAFC] border-[#E2E8F0] hover:shadow-lg"}`}
      data-adv={index}
    >
      <div
        className={`adv-icon-anim w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 ${
          isVisible ? "adv-visible adv-icon-ring-pulse" : ""
        }`}
        data-adv={index}
        style={{ backgroundColor: `${adv.accent}10`, "--ring-color": `${adv.accent}40` } as React.CSSProperties}
      >
        <div
          className={`${isVisible ? "adv-icon-float" : ""}`}
          data-adv={index}
        >
          <adv.icon className="w-8 h-8" style={{ color: adv.accent }} />
        </div>
      </div>
      <h3
        className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-[#0A1628]"}`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {adv.title}
      </h3>
      <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
        {adv.desc}
      </p>
    </div>
  );
}

// ─── LAZY LEAFLET MAP WRAPPER ──────────────────────────
// Only initializes the heavy Leaflet map when the section enters the viewport
function LazyLeafletMap({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "300px" } // Start loading 300px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <LeafletMap isDark={isDark} />
      ) : (
        <div
          className={`w-full rounded-xl flex items-center justify-center h-[300px] sm:h-[400px] lg:h-[500px] ${isDark ? "bg-[#0F1D32]" : "bg-gray-100"}`}
        >
          <div className="text-center">
            <MapPin className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-white/30" : "text-gray-300"}`} />
            <p className={`text-sm ${isDark ? "text-white/40" : "text-gray-400"}`} style={poppins}>Chargement de la carte...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────
const articles = [
  { num: "Article 60", text: "Les lotissements sont conçus exclusivement par les urbanistes inscrits au tableau de l'O.N.U.C.I." },
  { num: "Article 65", text: "L'autorisation de lotir est conditionnée par la présentation d'un plan visé par un urbaniste agréé." },
  { num: "Article 76", text: "L'exercice illégal est passible de peines allant jusqu'à 2 ans d'emprisonnement et 50 000 000 FCFA d'amende." },
];

const risks = [
  "Refus d'approbation du lotissement par le Ministère",
  "Poursuites pénales pour exercice illégal",
  "Annulation rétroactive des titres fonciers",
  "Litiges fonciers coûteux avec les acquéreurs",
  "Atteinte grave à votre réputation professionnelle",
];

const services = [
  {
    icon: Target, title: "Étude de Faisabilité",
    desc: "Analyse du site, situation foncière, conformité avec les documents d'urbanisme (SDU, PUD), évaluation des contraintes techniques et réglementaires.",
    color: "#0047AB",
    deliverables: ["Rapport de faisabilité", "Cartographie du site", "Note de conformité"],
    duration: "2 à 3 semaines",
    tools: "QGIS, AutoCAD, GPS",
  },
  {
    icon: Plane, title: "Cartographie par Drone",
    desc: "Acquisition de données précises via photogrammétrie par drone : orthophotographies et Modèles Numériques de Terrain (MNT).",
    color: "#00A86B",
    deliverables: ["Orthophoto HD", "MNT/MNS", "Nuage de points 3D"],
    duration: "1 à 2 semaines",
    tools: "DJI Phantom, Pix4D, Agisoft",
  },
  {
    icon: PenTool, title: "Conception du Plan",
    desc: "Découpage parcellaire optimisé, tracé des voiries, réservations pour équipements et espaces verts, conformité aux ratios réglementaires.",
    color: "#0047AB",
    deliverables: ["Plan de lotissement", "Tableau des surfaces", "Notice descriptive"],
    duration: "3 à 4 semaines",
    tools: "AutoCAD, QGIS, SketchUp",
  },
  {
    icon: FolderCheck, title: "Dossier Technique",
    desc: "Préparation complète du dossier d'approbation : plans techniques (AutoCAD/QGIS), notice descriptive, programme de viabilisation.",
    color: "#00A86B",
    deliverables: ["Dossier d'approbation", "Plans techniques", "Programme VRD"],
    duration: "2 à 3 semaines",
    tools: "AutoCAD, Word, Excel",
  },
  {
    icon: Handshake, title: "Suivi d'Approbation",
    desc: "Accompagnement auprès du Ministère de la Construction. Gestion des échanges et corrections jusqu'à l'obtention de l'arrêté.",
    color: "#0047AB",
    deliverables: ["Arrêté d'approbation", "PV de conformité", "Suivi administratif"],
    duration: "4 à 8 semaines",
    tools: "Suivi ministériel dédié",
  },
  {
    icon: Cuboid, title: "Maquette 3D & Vente",
    desc: "Modélisation 3D du lotissement, visuels professionnels et plans de vente pour accélérer la commercialisation de vos lots.",
    color: "#00A86B",
    deliverables: ["Maquette 3D interactive", "Visuels HD", "Plans de vente"],
    duration: "2 à 3 semaines",
    tools: "SketchUp, Lumion, Photoshop",
  },
];

const steps = [
  { title: "Prise de Contact", desc: "Réunion de cadrage, analyse de vos besoins, visite du site, évaluation préliminaire de faisabilité." },
  { title: "Proposition Technique", desc: "Offre technique et financière détaillée, méthodologie, planning prévisionnel, équipe dédiée." },
  { title: "Analyse de Terrain", desc: "Acquisition et analyse des données géospatiales par photogrammétrie drone sur site." },
  { title: "Conception", desc: "Élaboration du plan de lotissement, calcul des surfaces et ratios réglementaires." },
  { title: "Validation Interne", desc: "Présentation du projet, ajustements selon vos retours, finalisation des plans techniques." },
  { title: "Dépôt du Dossier", desc: "Constitution et dépôt du dossier complet auprès du Ministère de la Construction." },
  { title: "Approbation", desc: "Suivi de la procédure, gestion des observations, obtention de l'arrêté d'approbation." },
];

const advantages = [
  { icon: Shield, title: "Conformité Légale Garantie", desc: "Urbaniste Agréé inscrit à l'O.N.U.C.I., seule habilitation reconnue par la loi pour concevoir vos lotissements.", accent: "#0047AB" },
  { icon: Layers, title: "Double Expertise Unique", desc: "Seul bureau ivoirien combinant urbanisme certifié ET géomatique avancée (SIG, drone, GPS de précision).", accent: "#00A86B" },
  { icon: Clock, title: "Gain de Temps", desc: "Processus rodé et outils numériques performants pour des délais de livraison optimisés.", accent: "#0047AB" },
  { icon: Users, title: "Accompagnement Complet", desc: "De l'étude préliminaire à l'approbation ministérielle, un interlocuteur unique pour votre projet.", accent: "#00A86B" },
  { icon: FileCheck, title: "Tarification Compétitive", desc: "Des honoraires justes et transparents, adaptés à la taille de votre projet. Devis gratuit.", accent: "#0047AB" },
  { icon: Cuboid, title: "Valeur Ajoutée Commerciale", desc: "Maquettes 3D, plans de vente professionnels et supports visuels pour accélérer vos ventes.", accent: "#00A86B" },
];

const poleUrbanisme = [
  "Plans de lotissement & aménagement foncier",
  "Documents d'urbanisme (SDU, PUD, PUd)",
  "Études de faisabilité",
  "Régularisation foncière",
  "Conformité réglementaire",
];

const poleGeomatique = [
  "Cartographie de précision par drone",
  "SIG et bases de données spatiales",
  "Modélisation 3D du terrain (MNT/MNS)",
  "Analyse spatiale avancée",
  "Applications WebSIG Foncier",
];

// ─── TÉMOIGNAGES / RÉFÉRENCES ─────────────────────────
const references = [
  {
    type: "Lotissement résidentiel",
    location: "Grand Abidjan",
    surface: "10 Ha",
    lots: 177,
    icon: MapPinned,
    details: "Aménagement complet avec espaces verts, groupes scolaires, aires de jeux et réseau viaire structuré. Arrêté d'approbation obtenu.",
  },
  {
    type: "Lotissement mixte",
    location: "Région des Grands Ponts",
    surface: "25 Ha",
    lots: 312,
    icon: TreePine,
    details: "Projet intégrant zones résidentielles, commerciales et équipements publics. Cartographie drone et conception SIG complète.",
  },
  {
    type: "Restructuration urbaine",
    location: "Abidjan Sud",
    surface: "5 Ha",
    lots: 89,
    icon: Ruler,
    details: "Régularisation foncière et redécoupage parcellaire conforme au PUD. Accompagnement jusqu'à l'approbation ministérielle.",
  },
];

const testimonials = [
  {
    name: "Directeur Général",
    company: "Groupe de Promotion Immobilière",
    text: "Horizon Spatial nous a accompagnés de A à Z sur notre projet de lotissement. Leur double expertise urbanisme-géomatique a fait toute la différence. Dossier approuvé du premier coup.",
    rating: 5,
  },
  {
    name: "Responsable Foncier",
    company: "Société d'Aménagement",
    text: "La rigueur technique et la connaissance parfaite du cadre réglementaire ivoirien nous ont permis de gagner un temps considérable. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Promoteur Immobilier",
    company: "Investisseur Privé",
    text: "Les maquettes 3D et les plans de vente fournis par H-Spatial ont accéléré la commercialisation de nos lots. Un partenaire de confiance.",
    rating: 5,
  },
];

// ─── ANIMATED STAT (compteur visible-au-scroll) ─────────────────
// Utilise le hook partagé hooks/useCountUp.ts (prefers-reduced-motion respecté).
function AnimatedStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, visible, 2000);

  return (
    <div ref={ref}>
      <div className="text-3xl lg:text-4xl font-bold text-white" style={poppins}>
        <span aria-hidden>{count}{suffix}</span>
        <span className="sr-only">{value}{suffix}</span>
      </div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
}

// ─── NAVBAR COMPONENT ──────────────────────────
type NavLink = { label: string; href: string; route?: boolean };

const navLinks: NavLink[] = [
  { label: "Accueil", href: "/", route: true },
  { label: "Services", href: "#services" },
  { label: "Méthodologie", href: "#methodologie" },
  { label: "Références", href: "#references" },
  { label: "Le fondateur", href: "/a-propos", route: true },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const onToggleDark = toggleTheme ?? (() => {});
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [pathname] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: highlight the link of the section currently in viewport.
  // IMPORTANT: les liens de route (`route: true` ou href ne commençant pas par `#`)
  // ne sont JAMAIS passés à querySelector — un sélecteur CSS comme "/a-propos"
  // déclencherait une SyntaxError.
  useEffect(() => {
    // Le scroll spy n'a de sens que sur la page d'accueil (sections ancres).
    if (pathname !== "/") return;
    const sections = navLinks
      .filter((l) => !l.route && l.href.startsWith("#"))
      .map((l) => {
        try {
          return document.querySelector(l.href);
        } catch {
          // Garde-fou : un href malformé ne doit jamais casser l'observer.
          return null;
        }
      })
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  /**
   * Renvoie l'état actif d'un lien.
   * - "Accueil" (`/`) : actif uniquement sur la home **et** quand aucune
   *   section ancrée n'est dans le viewport (sinon « Services », « Contact »
   *   etc. prennent le relais grâce au scroll spy).
   * - Autre lien de route : actif si le pathname courant correspond.
   * - Lien d'ancre : actif si la section courante (scroll spy) correspond,
   *   uniquement quand on est sur la page d'accueil.
   */
  const isActive = (link: NavLink): boolean => {
    if (link.route) {
      if (link.href === "/") return pathname === "/" && activeSection === "";
      return pathname === link.href;
    }
    return pathname === "/" && activeSection === link.href;
  };

  /**
   * Résout le href affiché pour un lien d'ancre.
   * - Sur la page d'accueil : `#services` → scroll natif intra-page.
   * - Hors d'accueil (ex. /a-propos) : `/#services` → navigation vers
   *   l'accueil + ancre traitée nativement par le navigateur.
   * Les liens de route (`route: true`) sont retournés tels quels.
   */
  const resolveHref = (href: string): string => {
    if (!href.startsWith("#")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  /**
   * Sur la home, cliquer « Accueil » re-pointe vers `/` (même URL) — wouter ne
   * re-render rien. On intercepte pour scroller au top, comportement attendu.
   */
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden ${
        scrolled
          ? `${isDark ? "bg-[#0A1628]/95" : "bg-white/95"} backdrop-blur-lg shadow-lg ${isDark ? "shadow-black/20" : "shadow-black/5"} py-3`
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo — vraie navigation route (depuis /a-propos, ramène à /) */}
        <Link href="/" className="flex items-center gap-2" aria-label={`${company.shortName} — retour à l'accueil`}>
          <img
            src={scrolled ? (isDark ? LOGO_WHITE : LOGO_COLOR) : LOGO_WHITE}
            alt={company.shortName}
            className="h-10 transition-all duration-300"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link);
            const className = `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              scrolled
                ? active
                  ? isDark ? "text-white bg-white/10" : "text-[#0047AB] bg-[#0047AB]/10"
                  : isDark ? "text-white/70 hover:text-white hover:bg-white/10" : "text-[#4A5568] hover:text-[#0047AB] hover:bg-[#0047AB]/5"
                : active ? "text-white bg-white/15" : "text-white/80 hover:text-white hover:bg-white/10"
            }`;
            if (link.route) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === "/" ? handleHomeClick : undefined}
                  aria-current={active ? "page" : undefined}
                  className={className}
                  style={poppins}
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                aria-current={active ? "true" : undefined}
                className={className}
                style={poppins}
              >
                {link.label}
              </a>
            );
          })}
          <DarkModeToggle isDark={isDark} onToggle={onToggleDark} scrolled={scrolled} />
          <a
            href={resolveHref("#contact")}
            className="ml-2 px-5 py-2.5 bg-[#00A86B] hover:bg-[#009960] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#00A86B]/20"
            style={poppins}
          >
            Devis gratuit
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? (isDark ? "text-white hover:bg-white/10" : "text-[#0A1628] hover:bg-gray-100") : "text-white hover:bg-white/10"
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu - animated */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out border-t ${
          scrolled ? (isDark ? "bg-[#0A1628]/95 backdrop-blur-lg border-white/10" : "bg-white border-gray-100") : "bg-[#0A1628]/95 backdrop-blur-lg border-white/10"
        }`}
        style={{
          maxHeight: mobileOpen ? "400px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          borderTopWidth: mobileOpen ? "1px" : "0px",
        }}
      >
        <div className="container mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              const className = `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                scrolled
                  ? active
                    ? isDark ? "text-white bg-white/10" : "text-[#0047AB] bg-[#0047AB]/10"
                    : isDark ? "text-white/70 hover:text-white hover:bg-white/10" : "text-[#4A5568] hover:text-[#0047AB] hover:bg-[#0047AB]/5"
                  : active ? "text-white bg-white/15" : "text-white/80 hover:text-white hover:bg-white/10"
              }`;
              if (link.route) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "/") handleHomeClick(e);
                      setMobileOpen(false);
                    }}
                    aria-current={active ? "page" : undefined}
                    className={className}
                    style={poppins}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={className}
                  style={poppins}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={resolveHref("#contact")}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 bg-[#00A86B] hover:bg-[#009960] text-white text-sm font-semibold rounded-lg text-center mt-2"
              style={poppins}
            >
              Devis gratuit
            </a>
          </div>
        </div>
    </nav>
  );
}

// ─── WHATSAPP FLOATING BUTTON ───────────────────
// ─── SCROLL TO TOP BUTTON ──────────────────────
// ─── INTERACTIVE MAP - LEAFLET / OPENSTREETMAP ────────
const CITIES_DATA = [
  { name: "Abidjan", lat: 5.3600, lng: -4.0083, isHQ: true, desc: "Siège social" },
  { name: "San-Pédro", lat: 4.7485, lng: -6.6363, isHQ: false, desc: "Zone active" },
  { name: "Yamoussoukro", lat: 6.8276, lng: -5.2893, isHQ: false, desc: "Zone active" },
  { name: "Bouaké", lat: 7.6881, lng: -5.0305, isHQ: false, desc: "Zone active" },
  { name: "Korhogo", lat: 9.4580, lng: -5.6295, isHQ: false, desc: "Zone active" },
];

function LeafletMap({ isDark }: { isDark: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map centered on Côte d'Ivoire
    const isMobile = window.innerWidth < 640;
    const map = L.map(mapRef.current, {
      center: [7.54, -5.55],
      zoom: isMobile ? 5.5 : 6,
      zoomControl: !isMobile,
      scrollWheelZoom: false,
      attributionControl: true,
      dragging: true,
      touchZoom: true,
    });

    // Tile layer - use CartoDB for cleaner look
    const tileUrl = isDark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Load GeoJSON regions
    fetch(CIV_REGIONS_URL)
      .then(r => r.json())
      .then(data => {
        const regionsLayer = L.geoJSON(data, {
          style: () => ({
            color: isDark ? "#2a5a8c" : "#0047AB",
            weight: 1.5,
            fillColor: isDark ? "#1a3a5c" : "#0047AB",
            fillOpacity: isDark ? 0.15 : 0.08,
            dashArray: "",
          }),
          onEachFeature: (feature, layer) => {
            const name = feature.properties?.NAME_2 || feature.properties?.NAME_1 || "";
            layer.bindTooltip(name, {
              sticky: true,
              className: "leaflet-tooltip-custom",
              direction: "top",
            });
            layer.on({
              mouseover: (e: L.LeafletMouseEvent) => {
                const target = e.target;
                target.setStyle({
                  fillOpacity: isDark ? 0.35 : 0.2,
                  weight: 2.5,
                  color: "#00A86B",
                });
              },
              mouseout: (e: L.LeafletMouseEvent) => {
                regionsLayer.resetStyle(e.target);
              },
            });
          },
        }).addTo(map);
        layersRef.current.push(regionsLayer);
      })
      .catch(() => {});

    // Load outline for border emphasis
    fetch(CIV_OUTLINE_URL)
      .then(r => r.json())
      .then(data => {
        const outlineLayer = L.geoJSON(data, {
          style: () => ({
            color: isDark ? "#4a8abf" : "#0047AB",
            weight: 3,
            fillColor: "transparent",
            fillOpacity: 0,
          }),
        }).addTo(map);
        layersRef.current.push(outlineLayer);
      })
      .catch(() => {});

    // Custom icon for HQ
    const hqSize = isMobile ? 16 : 20;
    const hqIcon = L.divIcon({
      html: `<div class="leaflet-marker-fade" style="background:#0047AB;width:${hqSize}px;height:${hqSize}px;border-radius:50%;border:${isMobile ? 2 : 3}px solid white;box-shadow:0 0 12px rgba(0,71,171,0.6),0 0 24px rgba(0,71,171,0.3);opacity:0;transform:scale(0.3);transition:opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.34,1.56,0.64,1);"></div>`,
      className: "",
      iconSize: [hqSize, hqSize],
      iconAnchor: [hqSize / 2, hqSize / 2],
    });

    // Custom icon for zones
    const zoneSize = isMobile ? 10 : 14;
    const zoneIcon = L.divIcon({
      html: `<div class="leaflet-marker-fade" style="background:#00A86B;width:${zoneSize}px;height:${zoneSize}px;border-radius:50%;border:2px solid white;box-shadow:0 0 8px rgba(0,168,107,0.5);opacity:0;transform:scale(0.3);transition:opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.34,1.56,0.64,1);"></div>`,
      className: "",
      iconSize: [zoneSize, zoneSize],
      iconAnchor: [zoneSize / 2, zoneSize / 2],
    });

    // Add city markers with staggered fade-in
    CITIES_DATA.forEach((city, idx) => {
      const marker = L.marker([city.lat, city.lng], {
        icon: city.isHQ ? hqIcon : zoneIcon,
        opacity: 0, // start invisible (for tooltip container)
      }).addTo(map);

      const popupContent = `
        <div style="font-family:'Poppins',sans-serif;padding:4px 0;">
          <div style="font-weight:700;font-size:14px;color:#0A1628;margin-bottom:2px;">${city.name}</div>
          <div style="font-size:11px;color:${city.isHQ ? '#0047AB' : '#00A86B'};font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${city.desc}</div>
          ${city.isHQ ? '<div style="font-size:10px;color:#4A5568;margin-top:4px;">H-Spatial — Bureau d\'\u00c9tudes</div>' : ''}
        </div>
      `;
      marker.bindPopup(popupContent, { className: "leaflet-popup-custom" });

      // Tooltip with city name (permanent on desktop, hover-only on mobile)
      marker.bindTooltip(city.name, {
        permanent: !isMobile,
        direction: city.isHQ ? "right" : "top",
        offset: city.isHQ ? [14, 0] : [0, -10],
        className: "leaflet-label-custom leaflet-tooltip-fade",
      });

      // Staggered fade-in: HQ first (delay 400ms), then others with 150ms stagger
      const delay = city.isHQ ? 400 : 600 + idx * 150;
      setTimeout(() => {
        marker.setOpacity(1);
        const el = marker.getElement();
        if (el) {
          const dot = el.querySelector('.leaflet-marker-fade') as HTMLElement;
          if (dot) {
            dot.style.opacity = '1';
            dot.style.transform = 'scale(1)';
          }
        }
        // Also fade in the tooltip
        const tooltipEl = marker.getTooltip?.()?.getElement?.();
        if (tooltipEl) {
          tooltipEl.style.transition = 'opacity 0.5s ease-out';
          tooltipEl.style.opacity = '1';
        }
      }, delay);

      layersRef.current.push(marker);
    });

    // Draw dashed lines from HQ to other cities with staggered fade-in
    const hq = CITIES_DATA.find(c => c.isHQ)!;
    CITIES_DATA.filter(c => !c.isHQ).forEach((city, idx) => {
      const line = L.polyline(
        [[hq.lat, hq.lng], [city.lat, city.lng]],
        {
          color: "#00A86B",
          weight: isMobile ? 1 : 1.5,
          dashArray: isMobile ? "4 3" : "6 4",
          opacity: 0, // start invisible
        }
      ).addTo(map);

      // Staggered line fade-in: start after markers, 200ms stagger between lines
      const lineDelay = 800 + idx * 200;
      const targetOpacity = isMobile ? 0.3 : 0.4;
      const steps = 20;
      const stepDuration = 400 / steps;
      setTimeout(() => {
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const progress = step / steps;
          // Ease-out curve
          const eased = 1 - Math.pow(1 - progress, 3);
          line.setStyle({ opacity: eased * targetOpacity });
          if (step >= steps) clearInterval(interval);
        }, stepDuration);
      }, lineDelay);

      layersRef.current.push(line);
    });

    // Invalidate size after mount
    setTimeout(() => map.invalidateSize(), 100);
  }, [isDark]);

  useEffect(() => {
    // Cleanup previous map if theme changes
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      layersRef.current = [];
    }
    initMap();
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layersRef.current = [];
      }
    };
  }, [initMap]);

  return (
    <div className="relative">
      {/* Indicateur d'échelle géographique : Afrique → CEDEAO → Côte d'Ivoire */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047AB] opacity-40" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2C8 2 5 5 5 9c0 4 3 7 7 11 4-4 7-7 7-11 0-4-3-7-7-7z" opacity="0.3" />
          </svg>
          <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/30" : "text-[#4A5568]/50"}`} style={poppins}>Afrique</span>
        </div>
        <svg viewBox="0 0 8 8" className={`w-2 h-2 ${isDark ? "text-white/20" : "text-[#4A5568]/30"}`} fill="currentColor">
          <path d="M2 4l3-2v4z" />
        </svg>
        <div className="flex items-center gap-1.5">
          <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm border ${isDark ? "border-[#00A86B]/40" : "border-[#00A86B]/30"}`} style={{ background: isDark ? "rgba(0,168,107,0.1)" : "rgba(0,168,107,0.08)" }} />
          <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/40" : "text-[#4A5568]/60"}`} style={poppins}>CEDEAO</span>
        </div>
        <svg viewBox="0 0 8 8" className={`w-2 h-2 ${isDark ? "text-white/20" : "text-[#4A5568]/30"}`} fill="currentColor">
          <path d="M2 4l3-2v4z" />
        </svg>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm bg-[#0047AB]/20 border border-[#0047AB]/50" />
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/70" : "text-[#0A1628]/70"}`} style={poppins}>Côte d'Ivoire</span>
        </div>
      </div>

      <div
        ref={mapRef}
        className="w-full rounded-xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]"
      />

      {/* Légende + Indicateur marché */}
      <div className="mt-4 space-y-3">
        <div className={`flex flex-wrap items-center gap-3 sm:gap-6 justify-center text-[10px] sm:text-xs ${isDark ? "text-white/50" : "text-[#4A5568]"}`} style={poppins}>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#0047AB] border-2 border-white shadow-md" />
            <span>Siège social</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00A86B] border-2 border-white shadow-md" />
            <span>Zone d'intervention</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0 border-t-2 border-dashed border-[#00A86B] opacity-60" />
            <span>Liaison siège</span>
          </div>
        </div>
        {/* Marché cible */}
        <div className={`text-center text-[10px] sm:text-xs ${isDark ? "text-white/30" : "text-[#4A5568]/50"}`} style={poppins}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: isDark ? "rgba(0,71,171,0.1)" : "rgba(0,71,171,0.05)", border: `1px solid ${isDark ? "rgba(0,71,171,0.2)" : "rgba(0,71,171,0.1)"}` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" />
            Marché : Côte d'Ivoire & Afrique de l'Ouest (UEMOA/CEDEAO)
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY DATA ──────────────────────────────
const galleryItems = [
  {
    img: GALLERY_DRONE,
    title: "Vue aérienne par drone",
    desc: "Levé topographique et photogrammétrie par drone pour un lotissement résidentiel de 15 hectares",
    tag: "Photogrammétrie",
  },
  {
    img: GALLERY_PLAN,
    title: "Plan de lotissement approuvé",
    desc: "Plan d'aménagement détaillé avec tampons officiels, soumis au MCLU pour approbation",
    tag: "Urbanisme",
  },
  {
    img: GALLERY_MAQUETTE,
    title: "Maquette 3D du projet",
    desc: "Rendu 3D photoréaliste d'un projet de lotissement mixte avec équipements et espaces verts",
    tag: "Modélisation 3D",
  },
];

// ─── PROJECT GALLERY COMPONENT ──────────────────
function ProjectGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {galleryItems.map((item, i) => (
          <div
            key={item.title}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
              activeIdx === i ? "ring-2 ring-[#0047AB] shadow-xl shadow-[#0047AB]/10" : "hover:shadow-lg"
            }`}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => setLightbox(i)}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <LazyImage
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-2.5 py-1 bg-[#0047AB]/80 backdrop-blur-sm text-white text-xs font-medium rounded-md mb-3" style={poppins}>
                {item.tag}
              </span>
              <h4 className="text-white font-bold text-lg mb-1" style={poppins}>{item.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length); }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryItems.length); }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightbox].img}
              alt={galleryItems[lightbox].title}
              className="w-full rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h4 className="text-white font-bold text-xl" style={poppins}>{galleryItems[lightbox].title}</h4>
              <p className="text-white/60 text-sm mt-1">{galleryItems[lightbox].desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── FAQ DATA ────────────────────────────────
const faqItems = [
  {
    q: "Quels sont les délais moyens pour obtenir l'approbation d'un lotissement ?",
    a: "Le délai moyen est de 3 à 6 mois, selon la complexité du projet et la réactivité des services administratifs. Nous optimisons ce délai grâce à notre maîtrise du processus et nos relations avec les services compétents du Ministère.",
  },
  {
    q: "Quels documents dois-je fournir pour démarrer mon projet ?",
    a: "Vous devez fournir : le titre de propriété (ACD, certificat foncier ou lettre d'attribution), un plan de situation du terrain, et une note d'intention décrivant votre projet. Nous vous accompagnons pour constituer le reste du dossier.",
  },
  {
    q: "Combien coûte la conception d'un plan de lotissement ?",
    a: "Les honoraires dépendent de la superficie du terrain, du nombre de lots envisagés et de la complexité du projet. Nous proposons un devis gratuit et détaillé après une première analyse de votre projet. Nos tarifs sont compétitifs et transparents.",
  },
  {
    q: "Pourquoi est-il obligatoire de faire appel à un urbaniste agréé ?",
    a: "Le Code de l'Urbanisme de 2020 (Articles 60, 65 et 76) impose que tout projet de lotissement soit conçu par un urbaniste inscrit à l'O.N.U.C.I. Le non-respect expose à des sanctions pénales pouvant aller jusqu'à 2 ans d'emprisonnement et 50 millions FCFA d'amende.",
  },
  {
    q: "Intervenez-vous en dehors d'Abidjan ?",
    a: "Oui, nous intervenons sur l'ensemble du territoire ivoirien et dans la sous-région ouest-africaine (UEMOA/CEDEAO). Nos équipes se déplacent pour les levés topographiques et les visites de site, où que soit votre terrain.",
  },
  {
    q: "Quelle est la différence entre H-Spatial et un géomètre ?",
    a: "Un géomètre réalise les levés topographiques et le bornage. L'urbaniste conçoit le plan d'aménagement (découpage parcellaire, voiries, équipements). H-Spatial offre les deux compétences : urbanisme agréé O.N.U.C.I. ET géomatique avancée, pour un service intégré.",
  },
];

// ─── FAQ SECTION COMPONENT ────────────────────
function FAQSection({ isDark }: { isDark: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqItems.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 ${
              isDark
                ? `border-white/10 ${isOpen ? "bg-white/5" : "bg-white/[0.02] hover:bg-white/5"}`
                : `border-gray-200 ${isOpen ? "bg-[#0047AB]/5 border-[#0047AB]/20" : "bg-white hover:bg-gray-50"}`
            }`}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-start gap-4 p-5 text-left"
            >
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isOpen
                  ? "bg-[#0047AB] text-white"
                  : isDark ? "bg-white/10 text-white/60" : "bg-[#0047AB]/10 text-[#0047AB]"
              }`}>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
              <span className={`font-semibold text-sm md:text-base leading-snug ${
                isDark ? "text-white" : "text-[#0A1628]"
              }`} style={poppins}>
                {item.q}
              </span>
            </button>
            <div
              className="faq-answer"
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className={`px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed ${
                isDark ? "text-white/60" : "text-[#4A5568]"
              }`}>
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── DARK MODE TOGGLE COMPONENT ────────────────
function DarkModeToggle({ isDark, onToggle, scrolled }: { isDark: boolean; onToggle: () => void; scrolled: boolean }) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg transition-all duration-300 ${
        scrolled
          ? "text-[#4A5568] hover:text-[#0047AB] hover:bg-[#0047AB]/5"
          : "text-white/80 hover:text-white hover:bg-white/10"
      }`}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

// ─── CONTACT FORM COMPONENT ──────────────────────────
// Schéma de validation : un seul schéma utilisé côté client (et plus tard côté
// serveur si on bascule de Formspree à Express+Resend).
const contactSchema = z.object({
  nom: z.string().min(2, "Veuillez indiquer votre nom complet."),
  email: z.string().email("Email invalide."),
  telephone: z
    .string()
    .min(8, "Numéro de téléphone trop court.")
    .max(30, "Numéro de téléphone trop long."),
  typeProjet: z.string().optional().default(""),
  superficie: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

type ContactFormData = z.infer<typeof contactSchema>;

const INITIAL_CONTACT_FORM: ContactFormData = {
  nom: "",
  email: "",
  telephone: "",
  typeProjet: "",
  superficie: "",
  message: "",
};

/**
 * Endpoint Formspree (issue #15).
 * Définir VITE_FORMSPREE_ENDPOINT dans .env.local pour l'activer :
 *   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
 * Si la variable n'est pas définie, le formulaire bascule sur un mailto:
 * (rétro-compatibilité — pas de régression silencieuse).
 */
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as
  | string
  | undefined;

function ContactForm() {
  const [formData, setFormData] =
    useState<ContactFormData>(INITIAL_CONTACT_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const name = e.target.name as keyof ContactFormData;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    // Effacer l'erreur du champ dès qu'il est modifié.
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const fallbackToMailto = (data: ContactFormData) => {
    const subject = `Demande de devis - ${data.typeProjet || "Projet de lotissement"}`;
    const body =
      `Nom : ${data.nom}\n` +
      `Email : ${data.email}\n` +
      `Téléphone : ${data.telephone}\n` +
      `Type de projet : ${data.typeProjet}\n` +
      `Superficie estimée : ${data.superficie}\n\n` +
      `Message :\n${data.message}\n\n` +
      `---\nEnvoyé depuis la plaquette commerciale ${company.shortName}`;
    window.location.href = buildMailtoUrl({ subject, body });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot anti-spam : si rempli, on simule un succès silencieux.
    const formEl = e.currentTarget;
    const honeypot = (formEl.elements.namedItem("_gotcha") as HTMLInputElement | null)
      ?.value;
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    // Validation côté client (Zod).
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormData;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Vérifiez les champs en rouge avant d'envoyer.");
      return;
    }

    setSending(true);
    try {
      if (!FORMSPREE_ENDPOINT) {
        // Fallback : pas de backend configuré → ouvrir le client mail.
        fallbackToMailto(parsed.data);
        toast.info(
          "Backend non configuré : votre client de messagerie va s'ouvrir.",
        );
        setSubmitted(true);
        return;
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          _subject: `Demande de devis - ${parsed.data.typeProjet || "Projet de lotissement"}`,
          _origin: `${company.shortName} — formulaire site`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      toast.success(
        `Demande envoyée ! Notre équipe vous répond sous 24h ouvrées.`,
      );
      setSubmitted(true);
    } catch (err) {
      console.error("[ContactForm] Échec d'envoi :", err);
      toast.error(
        "Impossible d'envoyer la demande. Réessayez ou écrivez-nous directement à " +
          contact.emailPro,
      );
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-[#00A86B]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#00A86B]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3" style={poppins}>
          Demande envoyée !
        </h3>
        <p className="text-white/60 leading-relaxed mb-6">
          {FORMSPREE_ENDPOINT
            ? "Votre demande nous est parvenue. Notre équipe vous répondra sous 24h ouvrées."
            : "Votre client de messagerie s'est ouvert avec les informations pré-remplies. Envoyez l'email pour finaliser votre demande."}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData(INITIAL_CONTACT_FORM);
            setErrors({});
          }}
          className="text-[#00A86B] hover:text-white transition-colors text-sm font-medium"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  // Helpers de styling : ajoute une bordure rouge quand un champ est en erreur.
  const fieldClass = (fieldName: keyof ContactFormData) =>
    `w-full bg-white/5 border rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/50 focus:ring-1 outline-none transition-all text-sm ${
      errors[fieldName]
        ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30"
        : "border-white/10 focus:border-[#00A86B]/50 focus:ring-[#00A86B]/30"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-10"
    >
      {/* Honeypot anti-spam — caché aux humains, rempli par les bots. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[#00A86B]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white" style={poppins}>
            Demander un devis gratuit
          </h3>
          <p className="text-white/65 text-sm">Réponse sous 24h ouvrées</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="contact-nom" className="block text-white/60 text-sm mb-2 font-medium">
            Nom complet *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden />
            <input
              id="contact-nom"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom"
              autoComplete="name"
              aria-invalid={errors.nom ? "true" : undefined}
              aria-describedby={errors.nom ? "contact-nom-error" : undefined}
              className={fieldClass("nom")}
            />
          </div>
          {errors.nom && (
            <p id="contact-nom-error" className="mt-1.5 text-xs text-red-400">
              {errors.nom}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-white/60 text-sm mb-2 font-medium">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden />
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={fieldClass("email")}
            />
          </div>
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="contact-tel" className="block text-white/60 text-sm mb-2 font-medium">
            Téléphone *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden />
            <input
              id="contact-tel"
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              placeholder="+225 XX XX XX XX XX"
              autoComplete="tel"
              aria-invalid={errors.telephone ? "true" : undefined}
              aria-describedby={errors.telephone ? "contact-tel-error" : undefined}
              className={fieldClass("telephone")}
            />
          </div>
          {errors.telephone && (
            <p id="contact-tel-error" className="mt-1.5 text-xs text-red-400">
              {errors.telephone}
            </p>
          )}
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Type de projet</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <select
              name="typeProjet"
              value={formData.typeProjet}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm appearance-none"
            >
              <option value="" className="bg-[#0A1628]">Sélectionner...</option>
              <option value="Lotissement résidentiel" className="bg-[#0A1628]">Lotissement résidentiel</option>
              <option value="Lotissement mixte" className="bg-[#0A1628]">Lotissement mixte</option>
              <option value="Lotissement commercial" className="bg-[#0A1628]">Lotissement commercial</option>
              <option value="Restructuration urbaine" className="bg-[#0A1628]">Restructuration urbaine</option>
              <option value="Régularisation foncière" className="bg-[#0A1628]">Régularisation foncière</option>
              <option value="Autre" className="bg-[#0A1628]">Autre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-white/60 text-sm mb-2 font-medium">Superficie estimée du terrain</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            name="superficie"
            value={formData.superficie}
            onChange={handleChange}
            placeholder="Ex : 5 hectares, 10 000 m²..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/50 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-white/60 text-sm mb-2 font-medium">Message / Description du projet</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Décrivez brièvement votre projet, sa localisation, vos attentes..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/50 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00A86B] hover:bg-[#009960] disabled:opacity-60 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-[#00A86B]/30 hover:shadow-xl hover:shadow-[#00A86B]/40"
        style={poppins}
      >
        {sending ? (
          <>Envoi en cours...</>
        ) : (
          <>
            Envoyer ma demande
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}

// ─── COMPONENT ────────────────────────────────────────
export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Parallax refs for dark sections background images
  const heroParallax = useParallax(0.15);
  const expertiseParallax = useParallax(0.2);
  const methodoParallax = useParallax(0.2);
  const contactParallax = useParallax(0.15);

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
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-white"}`}>
      {/* Loading Screen — uniquement sur l'accueil (première impression) */}
      <LoadingScreen />

      {/* Note : Navbar, ReadingProgressBar, WhatsAppButton,
         ScrollToTopButton et CookieBanner sont rendus au niveau App
         (cf. App.tsx → SiteChrome) — partagés entre toutes les pages. */}

      {/* ===== SECTION 1: HERO / COVER ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div ref={heroParallax} className="absolute inset-[-15%] will-change-transform">
            <img src={HERO_IMG} alt="Vue aérienne d'un projet d'aménagement urbain" className="w-full h-full object-cover opacity-60" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/70 to-[#0047AB]/40" />
        </div>

        {/* Animated Perspective Grid */}
        <div className="hero-grid-bg" />

        {/* Hero particles — uniquement dans la zone hero */}
        <HeroParticles className="z-[2]" />

        {/* Floating Geometric Elements */}
        <div className="geo-element geo-diamond-1" />
        <div className="geo-element geo-diamond-2" />
        <div className="geo-element geo-diamond-3" />
        <div className="geo-element geo-diamond-4" />

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-3xl hero-content">
              <div className="mb-6 hero-fade" style={{ animationDelay: "0.3s" }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <BadgeCheck className="w-4 h-4 text-[#00A86B]" />
                  Bureau d'Études d'Urbaniste Agréé O.N.U.C.I.
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 hero-fade"
                style={{ ...poppins, animationDelay: "0.5s" }}
              >
                Offre de Services{" "}
                <TypewriterText
                  phrases={[
                    "Aménageurs Fonciers",
                    "Promoteurs Immobiliers",
                    "Opérateurs Fonciers",
                    "Collectivités Territoriales",
                  ]}
                  className="text-[#00A86B]"
                  typingSpeed={65}
                  deletingSpeed={35}
                  pauseDuration={2800}
                />
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl hero-fade" style={{ animationDelay: "0.7s" }}>
                Conformité légale, expertise technique et accompagnement complet
                pour vos projets de lotissement en Côte d'Ivoire.
              </p>

              <div className="flex flex-wrap items-center gap-6 hero-fade" style={{ animationDelay: "0.9s" }}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A86B] hover:bg-[#009960] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#00A86B]/25 hover:shadow-xl hover:shadow-[#00A86B]/30"
                  style={poppins}
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg hero-fade" style={{ animationDelay: "1.1s" }}>
                <AnimatedStat value={8} label="Années d'expérience" suffix="+" />
                <AnimatedStat value={100} label="Conformité légale" suffix="%" />
                <AnimatedStat value={2} label="Pôles d'expertise" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hero-fade z-[20]" style={{ animationDelay: "1.5s" }}>
          <span className="text-xs uppercase tracking-widest" style={poppins}>Défiler</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>


      </section>

      {/* ===== SECTION 2: CADRE RÉGLEMENTAIRE ===== */}
      <section id="reglementation" className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0F1D32]" : "bg-white"}`}>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url(${TOPO_IMG})`, backgroundSize: "cover" }} />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
                <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Cadre Réglementaire</span>
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Pourquoi faire appel à un{" "}
                <span className="text-[#0047AB]">Urbaniste Agréé</span> ?
              </h2>
              <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                Depuis le Code de l'Urbanisme de 2020, tout projet de lotissement en Côte d'Ivoire
                doit être réalisé par un urbaniste inscrit à l'Ordre National des Urbanistes (O.N.U.C.I.).
                Le non-respect de cette obligation expose à des sanctions pénales lourdes.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal delay={100}>
              <div className={`rounded-2xl p-8 border h-full ${isDark ? "bg-white/5 border-white/10" : "bg-[#F8FAFC] border-[#E2E8F0]"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0047AB]/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-[#0047AB]" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>Ce que dit la loi</h3>
                </div>
                <div className="space-y-4">
                  {articles.map((a) => (
                    <div key={a.num} className={`rounded-xl p-5 border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E2E8F0]"}`}>
                      <div className="text-sm font-bold text-[#0047AB] mb-2" style={poppins}>{a.num}</div>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>{a.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-6 h-full flex flex-col">
                <div className={`rounded-2xl p-8 border flex-1 ${isDark ? "bg-red-900/20 border-red-800/30" : "bg-red-50 border-red-100"}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>Les risques concrets</h3>
                  </div>
                  <div className="space-y-3">
                    {risks.map((r) => (
                      <div key={r} className={`flex items-start gap-3 rounded-lg p-3 border ${isDark ? "bg-red-900/10 border-red-800/20" : "bg-white/60 border-red-100/50"}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isDark ? "bg-red-900/30" : "bg-red-100"}`}>
                          <span className="text-red-600 text-xs font-bold">!</span>
                        </div>
                        <p className={`text-sm ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0047AB] rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#00A86B]" />
                    <h3 className="text-lg font-bold" style={poppins}>La Solution</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Horizon Spatial est un bureau d'études inscrit à l'O.N.U.C.I.
                    Nous garantissons la conformité légale complète de vos projets
                    de lotissement, de la conception à l'approbation.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: DOUBLE EXPERTISE ===== */}
      <section className="py-20 lg:py-28 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-[-10%] opacity-5 will-change-transform" ref={expertiseParallax}>
          <LazyImage src={TOPO_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Votre Partenaire</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={poppins}>
                Une double expertise{" "}
                <span className="text-[#00A86B]">unique</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Horizon Spatial est le seul bureau d'études ivoirien combinant l'urbanisme certifié
                et la géomatique avancée, pour des projets d'aménagement conformes, optimisés et innovants.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10">
            <Reveal delay={100} className="lg:col-span-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-full overflow-hidden">
                {/* Photo de groupe O.N.U.C.I. en arrière-plan */}
                <div className="relative h-36 overflow-hidden">
                  <LazyImage src={LAVOISIER_ONUCI_IMG} alt="Cérémonie O.N.U.C.I." className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1628]" />
                </div>
                {/* Portrait circulaire */}
                <div className="flex flex-col items-center text-center px-8 pb-8 -mt-14 relative z-10">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00A86B]/40 mb-5 shadow-xl shadow-black/30 ring-2 ring-white/10">
                    <LazyImage src={LAVOISIER_IMG} alt="Lavoisier Ousmane" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1" style={poppins}>{founder.fullName}</h3>
                  <p className="text-[#00A86B] text-sm font-medium mb-4">{founder.shortRole}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {founder.bioShort}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A86B]/10 border border-[#00A86B]/20 text-[#00A86B] text-xs font-medium"
                    title={credentials.onuciFull}
                  >
                    <BadgeCheck className="w-3.5 h-3.5" />
                    {credentials.onuciLabel}
                  </span>

                  <Link
                    href="/a-propos"
                    aria-label="En savoir plus sur Lavoisier Ousmane, fondateur d'Horizon Spatial"
                    className="mt-6 group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-[#00A86B] hover:bg-[#009960] text-white text-sm font-semibold shadow-lg shadow-[#00A86B]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#00A86B]/30 hover:-translate-y-0.5"
                    style={poppins}
                  >
                    Cliquer ICI pour en savoir Plus
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              <Reveal delay={200}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-[#0047AB]" />
                    <span className="text-[#0047AB] font-semibold text-xs uppercase tracking-wider" style={poppins}>Pôle Urbanisme</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-6" style={poppins}>Conformité & Conception</h3>
                  <ul className="space-y-3">
                    {poleUrbanisme.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-[#00A86B]" />
                    <span className="text-[#00A86B] font-semibold text-xs uppercase tracking-wider" style={poppins}>Pôle Géomatique</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-6" style={poppins}>Optimisation & Technologie</h3>
                  <ul className="space-y-3">
                    {poleGeomatique.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: NOS SERVICES ===== */}
      <section id="services" className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0F1D32]" : "bg-white"}`}>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
                <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Nos Services</span>
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Une offre complète pour les{" "}
                <span className="text-[#0047AB]">Aménageurs Fonciers</span>
              </h2>
              <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                De l'étude préliminaire à la délivrance de l'arrêté d'approbation,
                nous vous accompagnons à chaque étape de votre projet de lotissement.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 80}>
                <div className={`rounded-2xl p-8 border h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${isDark ? "bg-white/5 border-white/10 hover:bg-white/[0.07]" : "bg-white border-[#E2E8F0] hover:shadow-lg hover:border-[#0047AB]/20"}`}>
                  <AnimatedServiceIcon icon={service.icon} color={service.color} index={i} />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold" style={{ ...poppins, color: `${service.color}80` }}>0{i + 1}</span>
                    <div className={`w-6 h-px ${isDark ? "bg-white/15" : "bg-[#E2E8F0]"}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{service.title}</h3>
                  <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-white/70" : "text-[#4A5568]"}`}>{service.desc}</p>

                  <div className={`mt-auto pt-5 border-t ${isDark ? "border-white/10" : "border-[#E2E8F0]"}`}>
                    <div className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-white/60" : "text-[#4A5568]"}`} style={poppins}>Livrables</div>
                    <ul className="space-y-1.5 mb-4">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: service.color }} />
                          <span className={`text-sm ${isDark ? "text-white/80" : "text-[#0A1628]"}`}>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className={`text-[10px] uppercase tracking-wider mb-0.5 ${isDark ? "text-white/50" : "text-[#4A5568]/80"}`} style={poppins}>Délai</div>
                        <div className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-[#0A1628]"}`} style={poppins}>{service.duration}</div>
                      </div>
                      <div>
                        <div className={`text-[10px] uppercase tracking-wider mb-0.5 ${isDark ? "text-white/50" : "text-[#4A5568]/80"}`} style={poppins}>Outils</div>
                        <div className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-[#0A1628]"}`} style={poppins}>{service.tools}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Plan de lotissement showcase */}
          <Reveal delay={200}>
            <div className={`mt-16 rounded-2xl p-6 lg:p-10 border shadow-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E2E8F0]"}`}>
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-[#0047AB]" />
                    <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Exemple de réalisation</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>Plan de Lotissement</h3>
                  <p className={`leading-relaxed mb-6 ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                    Aménagement d'un site de plus de 10 hectares comprenant 177 lots,
                    des espaces verts, des équipements publics (groupes scolaires,
                    aires de jeux, centres de préscolaire) et un réseau viaire structuré.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`rounded-xl p-4 border ${isDark ? "bg-white/5 border-white/10" : "bg-[#F8FAFC] border-[#E2E8F0]"}`}>
                      <div className="text-2xl font-bold text-[#0047AB]" style={poppins}>10 Ha</div>
                      <div className={`text-xs mt-1 ${isDark ? "text-white/40" : "text-[#4A5568]"}`}>Surface totale</div>
                    </div>
                    <div className={`rounded-xl p-4 border ${isDark ? "bg-white/5 border-white/10" : "bg-[#F8FAFC] border-[#E2E8F0]"}`}>
                      <div className="text-2xl font-bold text-[#00A86B]" style={poppins}>177</div>
                      <div className={`text-xs mt-1 ${isDark ? "text-white/40" : "text-[#4A5568]"}`}>Lots créés</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? "border-white/10" : "border-[#E2E8F0]"}`}>
                    <LazyImage src={PLAN_IMG} alt="Plan de lotissement - Aménagement 10ha" className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SECTION 5: PROCESSUS ===== */}
      <section id="methodologie" className="py-20 lg:py-28 bg-[#0047AB] relative overflow-hidden">
        <div className="absolute inset-[-10%] opacity-10 will-change-transform" ref={methodoParallax}>
          <LazyImage src={DRONE_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0047AB]/90" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-white/40 rounded-full" />
                <span className="text-white/70 font-semibold text-sm uppercase tracking-wider" style={poppins}>Notre Méthodologie</span>
                <div className="w-10 h-1 bg-white/40 rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={poppins}>
                Un processus en{" "}
                <span className="text-[#00A86B]">7 étapes</span> claires
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Un accompagnement structuré et transparent pour garantir le succès
                de votre projet d'aménagement.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <AnimatedStep key={item.title} item={item} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: POURQUOI NOUS CHOISIR ===== */}
      <section className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0F1D32]" : "bg-white"}`}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${TOPO_IMG})`, backgroundSize: "cover" }} />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Nos Avantages</span>
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Pourquoi choisir{" "}
                <span className="text-[#0047AB]">H-Spatial</span> ?
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <AnimatedAdvantageCard key={adv.title} adv={adv} index={i} isDark={isDark} />
            ))}
          </div>

          {/* Galerie de projets */}
          <Reveal delay={200}>
            <div className="mt-20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Galerie de Projets</span>
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              </div>
              <h3 className={`text-2xl md:text-3xl font-bold text-center mb-10 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Nos réalisations en <span className="text-[#0047AB]">images</span>
              </h3>
              <ProjectGallery />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SECTION 7: TÉMOIGNAGES & RÉFÉRENCES (NEW) ===== */}
      <section id="references" className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-[#F8FAFC]"}`}>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
                <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Références & Témoignages</span>
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Ils nous font{" "}
                <span className="text-[#0047AB]">confiance</span>
              </h2>
              <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                Des projets réalisés avec succès et des partenaires satisfaits à travers la Côte d'Ivoire.
              </p>
            </div>
          </Reveal>

          {/* Références projets */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {references.map((ref, i) => (
              <Reveal key={ref.type} delay={i * 100}>
                <div className={`rounded-2xl border overflow-hidden transition-all duration-500 h-full ${isDark ? "bg-white/5 border-white/10 hover:bg-white/[0.08]" : "bg-white border-[#E2E8F0] hover:shadow-xl hover:shadow-[#0047AB]/5"}`}>
                  <div className="bg-[#0047AB] p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <ref.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm" style={poppins}>{ref.type}</h3>
                        <p className="text-white/60 text-xs">{ref.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="bg-white/10 rounded-lg px-3 py-2">
                        <div className="text-white font-bold text-lg" style={poppins}>{ref.surface}</div>
                        <div className="text-white/50 text-xs">Surface</div>
                      </div>
                      <div className="bg-white/10 rounded-lg px-3 py-2">
                        <div className="text-[#00A86B] font-bold text-lg" style={poppins}>{ref.lots}</div>
                        <div className="text-white/50 text-xs">Lots</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>{ref.details}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
                      <span className="text-xs text-[#00A86B] font-medium">Projet livré avec succès</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Témoignages */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.company} delay={i * 100 + 300}>
                <div className={`rounded-2xl p-8 border h-full relative ${isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E2E8F0]"}`}>
                  <div className="absolute top-6 right-6">
                    <Quote className="w-8 h-8 text-[#0047AB]/10" />
                  </div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 italic ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                    "{t.text}"
                  </p>
                  <div className={`border-t pt-4 ${isDark ? "border-white/10" : "border-[#E2E8F0]"}`}>
                    <div className={`font-bold text-sm ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{t.name}</div>
                    <div className={`text-xs ${isDark ? "text-white/65" : "text-[#4A5568]"}`}>{t.company}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7.4b: CARTE INTERACTIVE ZONES D'INTERVENTION ===== */}
      <section id="zones" className={`py-12 sm:py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-[#F0F4F8]"}`}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${TOPO_IMG})`, backgroundSize: "cover" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Navigation className="w-5 h-5 text-[#00A86B]" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Couverture Géographique</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>Notre Ancrage Territorial</h2>
              <p className={`text-base sm:text-lg ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>Basés en Côte d'Ivoire, nous intervenons sur l'ensemble du territoire national et à l'échelle de l'Afrique de l'Ouest (CEDEAO/UEMOA). Notre expertise couvre les principales zones de développement urbain du pays.</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Carte SVG interactive */}
              <div className={`relative rounded-2xl p-4 sm:p-6 lg:p-8 ${isDark ? "bg-[#0F1D32] border border-white/10" : "bg-white border border-gray-100 shadow-xl"}`}>
                <LazyLeafletMap isDark={isDark} />
              </div>

              {/* Liste des zones */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  { city: "Abidjan", type: "Siège social", desc: "District autonome — Lotissements résidentiels, mixtes et commerciaux", active: true },
                  { city: "San-Pédro", type: "Zone active", desc: "Pôle économique Sud-Ouest — Aménagements portuaires et résidentiels", active: true },
                  { city: "Yamoussoukro", type: "Zone active", desc: "Capitale politique — Projets d'urbanisation", active: true },
                  { city: "Bouaké", type: "Zone active", desc: "Deuxième ville — Restructuration et extension urbaine", active: true },
                  { city: "Korhogo", type: "Zone active", desc: "Pôle Nord — Développement urbain et foncier", active: true },
                ].map((zone, i) => (
                  <div key={i} className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${isDark ? "bg-[#0F1D32] border border-white/10 hover:border-[#00A86B]/30" : "bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00A86B]/30"}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${zone.active ? "bg-[#00A86B]/20" : "bg-[#0047AB]/20"}`}>
                      <MapPin className={`w-5 h-5 ${zone.active ? "text-[#00A86B]" : "text-[#0047AB]"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{zone.city}</h4>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${zone.city === "Abidjan" ? "bg-[#0047AB]/20 text-[#0047AB]" : "bg-[#00A86B]/20 text-[#00A86B]"}`}>{zone.type}</span>
                      </div>
                      <p className={`text-sm mt-1 ${isDark ? "text-white/50" : "text-[#4A5568]"}`}>{zone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SECTION 7.5: FAQ ===== */}
      <section id="faq" className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0F1D32]" : "bg-white"}`}>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Questions Fréquentes</span>
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Vos <span className="text-[#0047AB]">questions</span>, nos réponses
              </h2>
              <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                Retrouvez les réponses aux questions les plus fréquemment posées par les aménageurs fonciers et promoteurs immobiliers.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FAQSection isDark={isDark} />
          </Reveal>
        </div>
      </section>

      {/* ===== SECTION 7.6: PARTENAIRES INSTITUTIONNELS ===== */}
      <section id="partenaires" className={`py-20 lg:py-24 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-[#F8FAFC]"}`}>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url(${TOPO_IMG})`, backgroundSize: "cover" }} />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Écosystème</span>
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              </div>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Nos <span className="text-[#0047AB]">partenaires</span> institutionnels
              </h2>
              <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                H-Spatial évolue au sein d'un réseau solide d'institutions publiques et de partenaires techniques de référence en Côte d'Ivoire et à l'international.
              </p>
            </div>
          </Reveal>

          {/* Grille de logos - Institutions publiques */}
          <Reveal delay={100}>
            <div className="mb-12">
              <h3 className={`text-center text-sm font-semibold uppercase tracking-widest mb-8 ${isDark ? "text-white/40" : "text-[#4A5568]/60"}`} style={poppins}>Institutions & Ordres Professionnels</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { src: LOGO_MCLU, name: "MCLU", desc: "Ministère de la Construction", url: "https://construction.gouv.ci" },
                  { src: LOGO_GEOMETRES, name: "OGE-CI", desc: "Ordre des Géomètres-Experts", url: "https://www.geometres-experts.ci" },
                  { src: LOGO_OACI, name: "OACI", desc: "Ordre des Architectes", url: "https://www.oaci.ci" },
                  { src: LOGO_BNETD, name: "BNETD", desc: "Bureau National d'Études", url: "https://www.bnetd.ci" },
                  { src: LOGO_DISTRICT, name: "District d'Abidjan", desc: "District Autonome", url: "https://www.abidjan.district.ci" },
                  { src: LOGO_CNOUCI, name: "O.N.U.C.I.", desc: "Ordre National des Urbanistes", url: "https://www.onuci.org" },
                ].map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer no-underline ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        : "bg-white border-gray-200 hover:border-[#0047AB]/30 hover:shadow-[#0047AB]/10"
                    }`}
                  >
                    <div className="w-20 h-20 flex items-center justify-center mb-3 rounded-lg overflow-hidden">
                      <LazyImage src={p.src} alt={p.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className={`text-xs font-bold text-center ${isDark ? "text-white/80" : "text-[#0A1628]"}`} style={poppins}>{p.name}</span>
                    <span className={`text-[10px] text-center mt-0.5 ${isDark ? "text-white/40" : "text-[#4A5568]/70"}`}>{p.desc}</span>
                    <span className="text-[9px] text-[#0047AB] opacity-0 group-hover:opacity-100 transition-opacity mt-1">Visiter le site &rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Grille de logos - Partenaires techniques */}
          <Reveal delay={200}>
            <div>
              <h3 className={`text-center text-sm font-semibold uppercase tracking-widest mb-8 ${isDark ? "text-white/40" : "text-[#4A5568]/60"}`} style={poppins}>Partenaires Techniques & Fonciers</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { src: LOGO_IGNFI, name: "IGN FI", desc: "Ingénierie Géospatiale", url: "https://www.ignfi.fr" },
                  { src: LOGO_GEOFIT, name: "GeoFIT", desc: "Géomatique & Topographie", url: "https://www.geofit.fr" },
                  { src: LOGO_AFOR, name: "AFOR", desc: "Agence Foncière Rurale", url: "https://www.afor.ci" },
                  // TODO(CETIF) : confirmer la description et l'URL officielle.
                  { src: LOGO_CETIF, name: "CETIF", desc: "Partenaire technique", url: "#" },
                ].map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer no-underline ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        : "bg-white border-gray-200 hover:border-[#00A86B]/30 hover:shadow-[#00A86B]/10"
                    }`}
                  >
                    <div className="w-20 h-20 flex items-center justify-center mb-3 rounded-lg overflow-hidden">
                      <LazyImage src={p.src} alt={p.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className={`text-xs font-bold text-center ${isDark ? "text-white/80" : "text-[#0A1628]"}`} style={poppins}>{p.name}</span>
                    <span className={`text-[10px] text-center mt-0.5 ${isDark ? "text-white/40" : "text-[#4A5568]/70"}`}>{p.desc}</span>
                    <span className="text-[9px] text-[#00A86B] opacity-0 group-hover:opacity-100 transition-opacity mt-1">Visiter le site &rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Bandeau de confiance */}
          <Reveal delay={300}>
            <div className={`mt-16 text-center p-8 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
              <p className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
                Un réseau de <span className="text-[#0047AB] font-bold">9 partenaires</span> institutionnels et techniques
              </p>
              <p className={`text-sm ${isDark ? "text-white/50" : "text-[#4A5568]"}`}>
                H-Spatial collabore avec les acteurs majeurs du foncier, de l'urbanisme et de la géomatique en Côte d'Ivoire et en Afrique de l'Ouest.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SECTION 8: CTA / CONTACT WITH FORM (UPDATED) ===== */}
      <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div ref={contactParallax} className="absolute inset-[-15%] will-change-transform">
            <LazyImage src={LEGAL_IMG} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#0A1628]/90 to-[#0047AB]/80" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <Reveal>
              <div>
                <img src={LOGO_WHITE} alt="Horizon Spatial" className="h-16 mb-10" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={poppins}>
                  Prêt à sécuriser votre prochain{" "}
                  <span className="text-[#00A86B]">lotissement</span> ?
                </h2>

                <p className="text-lg text-white/70 leading-relaxed mb-10">
                  Contactez-nous dès aujourd'hui pour une étude de faisabilité
                  gratuite de votre projet. Notre équipe est à votre disposition.
                </p>

                <div className="space-y-4 mb-10">
                  <a href={`tel:${contact.phonePrimary.replace(/\s/g, "")}`} className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{contact.phonePrimary}</div>
                      {contact.phoneSecondary && (
                        <div className="text-white/65 text-sm">{contact.phoneSecondary}</div>
                      )}
                    </div>
                  </a>
                  <a href={addUtm(buildMailtoUrl(), "plaquette", "email_button")} className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div className="text-white font-semibold">{contact.emailPro}</div>
                  </a>
                  <a href={addUtm(contact.websiteUrl, "plaquette", "website_button")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div className="text-white font-semibold">{contact.websiteDisplay}</div>
                  </a>
                </div>

                {/* Réseaux sociaux */}
                <div className="flex gap-4 mt-2">
                  <a
                    href={addUtm(LINKEDIN_URL, "plaquette", "social_button")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 bg-[#0077B5]/20 backdrop-blur-sm rounded-xl border border-[#0077B5]/30 hover:bg-[#0077B5]/30 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-[#0077B5]" />
                    <span className="text-white font-medium text-sm">LinkedIn</span>
                  </a>
                  <a
                    href={addUtm(FACEBOOK_URL, "plaquette", "social_button")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 bg-[#1877F2]/20 backdrop-blur-sm rounded-xl border border-[#1877F2]/30 hover:bg-[#1877F2]/30 transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                    <span className="text-white font-medium text-sm">Facebook</span>
                  </a>
                </div>

              </div>
            </Reveal>

            {/* Right: Contact Form */}
            <Reveal delay={200}>
              <ContactForm />
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-16 text-center">
              <p className="text-white/60 text-sm italic" style={poppins}>
                « {company.slogan} »
              </p>
              <p className="text-white/50 text-xs mt-3">
                {company.internationalSignature}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Note : Navbar, ReadingProgressBar, WhatsAppButton, ScrollToTopButton,
         CookieBanner ET SiteFooter sont rendus au niveau App
         (cf. App.tsx → SiteChrome) — partagés entre toutes les pages. */}
    </div>
  );
}

/* ─── SITE FOOTER ─────────────────────────────────────────────────────────
 * Footer 4 colonnes partagé entre Home et About.
 * Issue #13 : Navigation / Services / Contact (+ horaires) / Légal.
 * Toutes les données viennent de company.ts — source unique.
 */
type FooterLink = { label: string; href: string };

const footerNavigation: readonly FooterLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Méthodologie", href: "/#methodologie" },
  { label: "Références", href: "/#references" },
  { label: "Le fondateur", href: "/a-propos" },
  { label: "Contact", href: "/#contact" },
];

const footerServices: readonly FooterLink[] = [
  { label: "Urbanisme & Aménagement", href: "/#services" },
  { label: "SIG & Cartographie", href: "/#services" },
  { label: "Sécurisation Foncière", href: "/#services" },
  { label: "Solutions Numériques", href: "/#services" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0A1628] text-white pt-14 pb-6 print:hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Bande identité */}
        <div className="mb-12 max-w-2xl">
          <img
            src={assets.logoWhite}
            alt={company.shortName}
            className="h-12 w-auto mb-4"
          />
          <p className="text-sm text-white/65 leading-relaxed">
            {company.description}
          </p>
          <p className="mt-3 text-xs italic text-white/50" style={poppins}>
            « {company.slogan} »
          </p>
        </div>

        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Colonne 1 : Navigation */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Navigation
            </h2>
            <ul className="space-y-2 text-sm">
              {footerNavigation.map((link) =>
                link.href.startsWith("/") && !link.href.includes("#") ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Colonne 2 : Services */}
          <nav aria-labelledby="footer-services-heading">
            <h2
              id="footer-services-heading"
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Services
            </h2>
            <ul className="space-y-2 text-sm">
              {footerServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne 3 : Contact */}
          <div>
            <h2
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Contact
            </h2>
            <address className="not-italic space-y-2 text-sm text-white/80">
              <p>{address.full}</p>
              <p>
                <a
                  href={`tel:${contact.phonePrimary.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.phonePrimary}
                </a>
              </p>
              {contact.phoneSecondary && (
                <p className="text-white/65">
                  <a
                    href={`tel:${contact.phoneSecondary.replace(/\s/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {contact.phoneSecondary}
                  </a>
                </p>
              )}
              <p>
                <a
                  href={`mailto:${contact.emailPro}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {contact.emailPro}
                </a>
              </p>
              <p>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </p>
            </address>
            <div
              className="mt-4 pt-4 border-t border-white/5 text-xs text-white/65 space-y-1"
              aria-label="Horaires d'ouverture"
            >
              <p
                className="text-[10px] uppercase tracking-wider text-white/45 font-semibold"
                style={poppins}
              >
                Horaires
              </p>
              {contact.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* Colonne 4 : Légal */}
          <div>
            <h2
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Légal
            </h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <span className="block text-[10px] uppercase tracking-wider text-white/45">
                  RCCM
                </span>
                <span>{company.rccm}</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-wider text-white/45">
                  Capital
                </span>
                <span>{company.capital}</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-wider text-white/45">
                  Affiliation
                </span>
                <span>{credentials.onuciFull}</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/politique-de-confidentialite"
                  className="text-white/70 hover:text-white underline transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <span>
            © {currentYear} {company.legalName} — Tous droits réservés
          </span>
          <span style={poppins} className="text-white/45">
            {company.internationalSignature}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${company.brandName} sur LinkedIn`}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0077B5]/30 flex items-center justify-center transition-all"
            >
              <Linkedin className="w-4 h-4" aria-hidden />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${company.brandName} sur Facebook`}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#1877F2]/30 flex items-center justify-center transition-all"
            >
              <Facebook className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
