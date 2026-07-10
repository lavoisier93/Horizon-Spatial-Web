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
import { FAQ } from "../components/sections/FAQ";
import { Partners } from "../components/sections/Partners";
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

const poppins = { fontFamily: "'Poppins', sans-serif" };

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

      <FAQ isDark={isDark} />

      <Partners isDark={isDark} />

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

