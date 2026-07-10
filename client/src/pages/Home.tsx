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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { z } from "zod";
import { useTheme } from "../contexts/ThemeContext";
import { loadUmami } from "../lib/analytics";
import { useCountUp } from "../hooks/useCountUp";
import { HeroParticles } from "../components/HeroParticles";
import { LazyImage } from "../components/LazyImage";
import { LoadingScreen } from "../components/LoadingScreen";
import { InteractiveMap } from "../components/sections/InteractiveMap";
import { Testimonials } from "../components/sections/Testimonials";
import { Advantages } from "../components/sections/Advantages";
import { Methodology } from "../components/sections/Methodology";
import { Hero } from "../components/sections/Hero";
import { DoubleExpertise } from "../components/sections/DoubleExpertise";
import { RegulatoryFrame } from "../components/sections/RegulatoryFrame";
import { ServicesGrid } from "../components/sections/ServicesGrid";
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

// CDN URLs
// Logos & portraits — alimentés par client/src/data/company.ts (source unique).
const LOGO_WHITE = assets.logoWhite;
// Images locales (rapatriement issue #14 — finies les URLs Manus CDN signées
// qui expiraient le 31 décembre 2026). Sources : client/public/assets/images/
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
const poppins = { fontFamily: "'Poppins', sans-serif" };

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

      <Hero />

      <RegulatoryFrame isDark={isDark} />

      <DoubleExpertise />

      <ServicesGrid isDark={isDark} />

      <Methodology />

      <Advantages isDark={isDark} />

      <Testimonials isDark={isDark} />

      <InteractiveMap isDark={isDark} />

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

