/**
 * Page « Le Fondateur » — /a-propos
 * Présente Lavoisier Ousmane, fondateur d'HORIZON SPATIAL.
 *
 * Style : Geo-Corporate Luxe (cohérent avec Home.tsx)
 * Couleurs : #0047AB (primaire), #00A86B (secondaire), #0A1628 (sombre), #4A5568 (texte technique)
 * Polices  : Poppins (titres), Open Sans (corps)
 * Animations CSS uniquement, mobile-first, prefers-reduced-motion respecté.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  Facebook,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Quote,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { useCountUp } from "@/hooks/useCountUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { HeroParticles } from "@/components/HeroParticles";

import {
  founder,
  founderStats,
  skills,
  timeline,
  type Skill,
  type TimelineItem,
} from "@/data/founder";
import { buildWhatsAppUrl, company, credentials } from "@/data/company";

const poppins: React.CSSProperties = { fontFamily: "'Poppins', sans-serif" };

/* -------------------------------------------------------------------------- */
/* Hooks utilitaires                                                          */
/* -------------------------------------------------------------------------- */

/** Reveal-on-scroll basé sur IntersectionObserver. Renvoie true une fois. */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

// useCountUp factorisé dans hooks/useCountUp.ts (prefers-reduced-motion respecté).

/* -------------------------------------------------------------------------- */
/* Petits composants                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Accents skills — strictement limités aux 2 couleurs de marque H-Spatial
 * (#0047AB primaire, #00A86B secondaire). Pas d'indigo, pas de cyan.
 */
const ACCENT: Record<
  Skill["accent"],
  { ring: string; bar: string; chipBg: string; chipText: string }
> = {
  primary: {
    ring: "ring-[#0047AB]/15",
    bar: "bg-[#0047AB]",
    chipBg: "bg-[#0047AB]/10",
    chipText: "text-[#0047AB]",
  },
  secondary: {
    ring: "ring-[#00A86B]/20",
    bar: "bg-[#00A86B]",
    chipBg: "bg-[#00A86B]/10",
    chipText: "text-[#00A86B]",
  },
};

function FounderAvatar() {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className="w-44 h-44 sm:w-48 sm:h-48 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30 shadow-2xl"
        style={{
          ...poppins,
          background:
            "linear-gradient(135deg, #0047AB 0%, #1E3A5F 60%, #00A86B 100%)",
        }}
        aria-label={founder.photo.alt}
      >
        {founder.photo.fallbackInitials}
      </div>
    );
  }
  return (
    <div
      className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto"
      style={{ aspectRatio: "1 / 1" }}
    >
      <div className="absolute inset-0 rounded-full ring-4 ring-white/30 shadow-2xl overflow-hidden bg-[#0F2545]">
        <img
          src={founder.photo.src}
          alt={founder.photo.alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={192}
          height={192}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={() => setErrored(true)}
        />
      </div>
      <span
        className="absolute -bottom-1 -right-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00A86B] text-white text-xs font-semibold shadow-lg"
        style={poppins}
        title={credentials.onuciFull}
      >
        <Check className="w-3.5 h-3.5" />
        O.N.U.C.I.
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  isDark,
}: {
  eyebrow: string;
  title: string;
  isDark: boolean;
}) {
  return (
    <div className="mb-10">
      <span
        className="inline-block px-3 py-1 rounded-full bg-[#0047AB]/10 text-[#0047AB] text-xs font-semibold tracking-wider uppercase"
        style={poppins}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-3xl md:text-4xl font-bold ${
          isDark ? "text-white" : "text-[#0A1628]"
        }`}
        style={poppins}
      >
        {title}
      </h2>
      <div className="mt-4 h-1 w-16 rounded bg-[#00A86B]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <header
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A1628 0%, #0F2545 55%, #0047AB 100%)",
      }}
    >
      {/* Motif topographique discret */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Hero particles — uniquement dans la zone hero */}
      <HeroParticles className="z-[1]" />
      {/* Losanges flottants */}
      <div
        aria-hidden
        className="hidden md:block absolute top-16 right-8 w-40 h-40 border border-white/10"
        style={{ transform: "rotate(45deg)" }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute bottom-20 left-12 w-28 h-28 border border-[#00A86B]/30"
        style={{ transform: "rotate(45deg)" }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          {/* Lien « Retour à l'accueil » retiré : la Navbar globale (logo cliquable)
             remplit déjà ce rôle — supprime un doublon fonctionnel. */}
          <span
            className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-wider uppercase border border-white/15"
            style={poppins}
          >
            Le fondateur
          </span>

          <h1
            className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl"
            style={poppins}
          >
            Architecte de territoires durables en{" "}
            <span className="text-[#00A86B]">Afrique de l'Ouest</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl">
            <span className="font-semibold">{founder.fullName}</span>
            <span className="text-white/60"> · </span>
            Urbaniste-Géomaticien
            <span className="text-white/60"> · </span>
            Fondateur d'{company.brandName}
          </p>
          <p className="mt-3 text-base md:text-lg text-white/70 max-w-2xl">
            {founder.taglineCorporate}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#parcours"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#0047AB] font-semibold text-sm shadow-lg hover:bg-white/95 transition-all"
              style={poppins}
            >
              Découvrir le parcours
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00A86B] hover:bg-[#009960] text-white font-semibold text-sm shadow-lg transition-all"
              style={poppins}
            >
              Démarrer un projet
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function BioSection({ isDark }: { isDark: boolean }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <section
      id="bio"
      ref={ref}
      className={`py-20 md:py-28 ${isDark ? "bg-[#0A1628]" : "bg-white"}`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Colonne gauche : carte profil sticky */}
          <aside className="lg:col-span-1">
            <div
              className={`sticky top-28 rounded-2xl overflow-hidden ${
                isDark
                  ? "bg-[#0F2545] border border-white/10"
                  : "bg-[#0A1628] border border-[#0A1628]"
              } text-white shadow-xl`}
            >
              <div className="relative px-6 pt-10 pb-6 text-center">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, #0047AB 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <FounderAvatar />
                  <h3
                    className="mt-5 text-xl font-bold"
                    style={poppins}
                  >
                    {founder.shortName}
                  </h3>
                  <p className="mt-1 text-sm text-[#00A86B]">
                    {founder.shortRole}
                  </p>

                  <div className="mt-5 grid grid-cols-4 gap-2">
                    <a
                      href={`mailto:${founder.channels.emailPro}`}
                      aria-label="Envoyer un email à Horizon Spatial"
                      className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contacter Horizon Spatial via WhatsApp"
                      className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                    {founder.channels.linkedin && (
                      <a
                        href={founder.channels.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Page LinkedIn d'Horizon Spatial"
                        className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-white/10 hover:bg-white/20 transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {founder.channels.facebook && (
                      <a
                        href={founder.channels.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Page Facebook d'Horizon Spatial"
                        className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-white/10 hover:bg-white/20 transition-all"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <ProfileFact
                  icon={<GraduationCap className="w-4 h-4" />}
                  label="Formation"
                  value="Master Urbanisme · Mastère Géomatique · Executive Master Data"
                />
                <ProfileFact
                  icon={<Briefcase className="w-4 h-4" />}
                  label="Expérience"
                  value={`${founder.yearsOfExperience}+ années en aménagement, SIG et foncier`}
                />
                <ProfileFact
                  icon={<MapPin className="w-4 h-4" />}
                  label="Terrain"
                  value="Côte d'Ivoire, France, Maroc, Togo"
                />
                <ProfileFact
                  icon={<Award className="w-4 h-4" />}
                  label="Affiliation"
                  value={credentials.onuciLabel}
                />

                {founder.cvUrl ? (
                  <a
                    href={founder.cvUrl}
                    download
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#00A86B] hover:bg-[#009960] text-white text-sm font-semibold transition-all"
                    style={poppins}
                  >
                    <Download className="w-4 h-4" />
                    Télécharger le CV
                  </a>
                ) : null}
              </div>
            </div>
          </aside>

          {/* Colonne droite : bio prose */}
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Qui est-il ?"
              title="Un urbaniste-géomaticien au service des territoires africains"
              isDark={isDark}
            />
            <div
              className={`space-y-5 text-base md:text-lg leading-relaxed ${
                isDark ? "text-white/80" : "text-[#4A5568]"
              }`}
            >
              {founder.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Urbanisme",
                "Géomatique",
                "Sécurisation foncière",
                "Data Analytics",
                "Photogrammétrie drone",
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`${
                    isDark
                      ? "border-white/20 text-white/80"
                      : "border-[#0047AB]/20 text-[#0047AB]"
                  } font-medium`}
                  style={poppins}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <span className="mt-0.5 text-[#00A86B]">{icon}</span>
      <div>
        <div
          className="text-xs uppercase tracking-wider text-white/50 font-semibold"
          style={poppins}
        >
          {label}
        </div>
        <div className="text-sm text-white/90">{value}</div>
      </div>
    </div>
  );
}

function SkillsSection({ isDark }: { isDark: boolean }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="competences"
      ref={ref}
      className={`py-20 md:py-28 ${
        isDark ? "bg-[#0F2545]" : "bg-[#F7F9FC]"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Domaines d'expertise"
            title="Quatre pôles de compétences complémentaires"
            isDark={isDark}
          />
          <p
            className={`-mt-4 mb-10 text-base md:text-lg ${
              isDark ? "text-white/70" : "text-[#4A5568]"
            }`}
          >
            De la planification urbaine à la cartographie par drone, une boîte à
            outils pensée pour les enjeux territoriaux ouest-africains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((skill, idx) => {
            const open = openId === skill.id;
            const accent = ACCENT[skill.accent];
            const Icon = skill.icon;
            return (
              <Card
                key={skill.id}
                className={`group transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                } ${
                  isDark
                    ? "bg-[#0A1628] border-white/10 text-white"
                    : "bg-white border-slate-200"
                } hover:shadow-xl ring-1 ${accent.ring}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl ${accent.chipBg} ${accent.chipText} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`text-lg leading-none font-semibold ${
                          isDark ? "text-white" : "text-[#0A1628]"
                        }`}
                        style={poppins}
                      >
                        {skill.name}
                      </h3>
                      {/* Barre de progression — visuelle uniquement (aria-hidden).
                         Le pourcentage est annoncé une seule fois dans la
                         CardDescription, plus de triple redondance vocale. */}
                      <CardDescription
                        className={`mt-1 ${isDark ? "text-white/60" : ""}`}
                      >
                        Niveau de maîtrise — {skill.level}%
                      </CardDescription>
                      <div
                        aria-hidden
                        className={`mt-3 h-2 rounded-full overflow-hidden ${
                          isDark ? "bg-white/10" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${accent.bar} transition-[width] duration-1000 ease-out`}
                          style={{ width: visible ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`skill-${skill.id}-detail`}
                    aria-label={open ? "Réduire" : "Voir les outils"}
                    onClick={() => setOpenId(open ? null : skill.id)}
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isDark
                        ? "bg-white/5 hover:bg-white/15 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-[#0A1628]"
                    } ${open ? "rotate-180" : ""}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </CardHeader>

                <CardContent
                  id={`skill-${skill.id}-detail`}
                  className={`overflow-hidden transition-all duration-500 ${
                    open
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <p
                    className={`text-sm md:text-base ${
                      isDark ? "text-white/75" : "text-[#4A5568]"
                    }`}
                  >
                    {skill.description}
                  </p>
                  <div className="mt-4">
                    <div
                      className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                        isDark ? "text-white/60" : "text-[#0A1628]"
                      }`}
                      style={poppins}
                    >
                      Outils & techniques
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.tools.map((tool) => (
                        <span
                          key={tool}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${accent.chipBg} ${accent.chipText}`}
                        >
                          <Check className="w-3 h-3" />
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineSection({ isDark }: { isDark: boolean }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const [tab, setTab] = useState<string>(timeline[0].id);

  return (
    <section
      id="parcours"
      ref={ref}
      className={`py-20 md:py-28 ${isDark ? "bg-[#0A1628]" : "bg-white"}`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeading
          eyebrow="Parcours"
          title="Formation, expérience, réalisations & certifications"
          isDark={isDark}
        />

        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Tabs value={tab} onValueChange={setTab} className="gap-6">
            {/*
              Sur mobile : scroll horizontal (overflow-x-auto + flex-nowrap +
              shrink-0 sur les triggers) — beaucoup plus prévisible que le wrap
              à 2 lignes des labels longs. Un gradient à droite signale
              visuellement qu'il y a du contenu hors-écran (issue audit #20).
              Sur desktop (lg+) : wrap classique pour profiter de l'espace.
            */}
            <div className="relative">
              <div
                aria-hidden
                className={`pointer-events-none absolute right-0 top-0 bottom-0 w-10 lg:hidden bg-gradient-to-l ${
                  isDark ? "from-[#0A1628]" : "from-white"
                } to-transparent z-10`}
              />
              <div className="-mx-2 px-2 overflow-x-auto lg:overflow-visible scrollbar-hide">
                <TabsList
                  className={`inline-flex w-max lg:flex lg:flex-wrap lg:w-full h-auto p-1 gap-1 ${
                    isDark ? "bg-white/5" : "bg-slate-100"
                  }`}
                >
                {timeline.map((t) => {
                  const Icon = t.icon;
                  return (
                    <TabsTrigger
                      key={t.id}
                      value={t.id}
                      className="shrink-0 lg:flex-1 px-4 py-2 data-[state=active]:bg-[#0047AB] data-[state=active]:text-white"
                      style={poppins}
                    >
                      <Icon className="w-4 h-4" aria-hidden />
                      {t.label}
                    </TabsTrigger>
                  );
                })}
                </TabsList>
              </div>
            </div>

            {timeline.map((t) => (
              <TabsContent key={t.id} value={t.id} className="mt-6">
                <TimelineList items={t.items} isDark={isDark} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function TimelineList({
  items,
  isDark,
}: {
  items: readonly TimelineItem[];
  isDark: boolean;
}) {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className={`absolute left-4 top-0 bottom-0 w-px ${
          isDark ? "bg-white/15" : "bg-slate-200"
        }`}
      />
      <div className="space-y-6">
        {items.map((item, idx) => (
          <li
            key={`${item.year}-${idx}`}
            className="relative pl-12 list-none"
          >
            <span
              aria-hidden
              className="absolute left-0 top-2 w-8 h-8 rounded-full bg-[#0047AB] text-white flex items-center justify-center shadow-md ring-4 ring-[#0047AB]/10"
            >
              <Trophy className="w-3.5 h-3.5" aria-hidden />
            </span>
            <div
              className={`p-5 rounded-xl border-l-4 border-[#00A86B] ${
                isDark
                  ? "bg-[#0F2545] border-l-[#00A86B] text-white shadow-lg shadow-black/10"
                  : "bg-white text-[#0A1628] shadow-sm hover:shadow-md"
              } transition-shadow`}
            >
              <div
                className={`text-xs uppercase tracking-wider font-semibold ${
                  isDark ? "text-[#00A86B]" : "text-[#00A86B]"
                }`}
                style={poppins}
              >
                {item.year}
              </div>
              <h3
                className={`mt-1 text-lg font-bold ${
                  isDark ? "text-white" : "text-[#0A1628]"
                }`}
                style={poppins}
              >
                {item.title}
              </h3>
              <div
                className={`mt-1 text-sm font-medium ${
                  isDark ? "text-white/70" : "text-[#0047AB]"
                }`}
              >
                {item.institution}
              </div>
              <p
                className={`mt-2 text-sm md:text-base ${
                  isDark ? "text-white/70" : "text-[#4A5568]"
                }`}
              >
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </div>
    </ol>
  );
}

function StatCard({
  icon: Icon,
  end,
  suffix,
  label,
  start,
  isDark,
}: {
  icon: LucideIcon;
  end: number;
  suffix?: string;
  label: string;
  start: boolean;
  isDark: boolean;
}) {
  const value = useCountUp(end, start);
  // Sémantique : <h3> pour le label (le sujet du stat block), <p> pour la
  // valeur. Le rendu visuel inverse la hiérarchie via les classes.
  return (
    <article
      className={`rounded-2xl p-5 md:p-6 text-center transition-shadow duration-300 ${
        isDark
          ? "bg-[#0F2545] border border-white/10 hover:shadow-lg shadow-black/20"
          : "bg-white border border-slate-200 hover:shadow-lg hover:border-[#0047AB]/30"
      }`}
      aria-labelledby={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div
        className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${
          isDark ? "bg-[#0047AB]/20" : "bg-[#0047AB]/10"
        }`}
      >
        <Icon className="w-6 h-6 text-[#0047AB]" aria-hidden />
      </div>
      <p
        className={`mt-4 text-3xl md:text-5xl font-bold tabular-nums ${
          isDark ? "text-white" : "text-[#0047AB]"
        }`}
        style={poppins}
      >
        <span aria-hidden>
          {value}
          {suffix ?? ""}
        </span>
        <span className="sr-only">
          {end}
          {suffix ?? ""}
        </span>
      </p>
      <h3
        id={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
        className={`mt-2 text-xs md:text-sm font-medium ${
          isDark ? "text-white/70" : "text-[#4A5568]"
        }`}
        style={poppins}
      >
        {label}
      </h3>
    </article>
  );
}

function StatsSection({ isDark }: { isDark: boolean }) {
  const [ref, visible] = useReveal<HTMLDivElement>(0.3);
  // Section claire — rupture nette avec le CTA bleu en bas pour casser
  // la monotonie chromatique signalée à l'audit (issue #8).
  return (
    <section
      ref={ref}
      className={`relative py-20 md:py-24 ${
        isDark ? "bg-[#0A1628]" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full bg-[#0047AB]/10 text-[#0047AB] text-xs font-semibold tracking-wider uppercase"
            style={poppins}
          >
            En chiffres
          </span>
          <h2
            className={`mt-4 text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-[#0A1628]"
            }`}
            style={poppins}
          >
            Un parcours mesurable
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {founderStats.map((stat) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              end={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              start={visible}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ isDark }: { isDark: boolean }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  const items = [
    {
      initials: "PK",
      name: "Paul Kouamé",
      role: "Directeur de projet — Abidjan",
      quote:
        "Son accompagnement a été décisif dans la réalisation de notre plan de lotissement. Grâce à son expertise SIG, nous avons obtenu des cartes précises et exploitables.",
    },
    {
      initials: "MD",
      name: "Marie Diallo",
      role: "Responsable développement — Yamoussoukro",
      quote:
        "Sa compréhension du foncier et ses compétences techniques ont grandement facilité nos démarches de certification. Son professionnalisme est remarquable.",
    },
    {
      initials: "JT",
      name: "Jacques Touré",
      role: "Architecte urbaniste — San-Pédro",
      quote:
        "L'expertise en cartographie drone et en analyse spatiale a permis d'optimiser notre projet d'aménagement. Une collaboration fructueuse.",
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-20 md:py-24 ${
        isDark ? "bg-[#0F2545]" : "bg-[#F7F9FC]"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeading
          eyebrow="Recommandations"
          title="Ils ont fait confiance à son expertise"
          isDark={isDark}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t, idx) => (
            <article
              key={t.initials}
              className={`relative rounded-2xl p-6 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } ${
                isDark
                  ? "bg-[#0A1628] border border-white/10 text-white"
                  : "bg-white border border-slate-200 text-[#0A1628]"
              } shadow-sm hover:shadow-lg`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <Quote
                className="absolute top-5 right-5 w-7 h-7 text-[#00A86B]/40"
                aria-hidden
              />
              <div
                className="flex items-center gap-1 mb-3 text-[#00A86B]"
                aria-label="Note 5 sur 5"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    aria-hidden
                  />
                ))}
              </div>
              <p
                className={`italic text-sm md:text-base leading-relaxed ${
                  isDark ? "text-white/85" : "text-[#4A5568]"
                }`}
              >
                « {t.quote} »
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{
                    ...poppins,
                    background:
                      "linear-gradient(135deg, #0047AB 0%, #00A86B 100%)",
                  }}
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className={`font-semibold text-sm ${
                      isDark ? "text-white" : "text-[#0A1628]"
                    }`}
                    style={poppins}
                  >
                    {t.name}
                  </div>
                  <div
                    className={`text-xs ${
                      isDark ? "text-white/60" : "text-[#4A5568]"
                    }`}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-white"
          style={{
            background:
              "linear-gradient(120deg, #0047AB 0%, #003a8c 60%, #0A1628 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full border border-[#00A86B]/30"
          />
          <div className="relative max-w-2xl">
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={poppins}
            >
              Un projet d'urbanisme, de géomatique ou de sécurisation foncière ?
            </h2>
            <p className="mt-4 text-white/85 text-base md:text-lg">
              HORIZON SPATIAL accompagne collectivités, bureaux d'études,
              promoteurs et particuliers. Échangeons sur vos enjeux pour
              construire la solution la plus adaptée.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#0047AB] font-semibold text-sm shadow-lg hover:bg-white/95 transition-all"
                style={poppins}
              >
                Démarrer un projet
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${founder.channels.emailPro}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/30 hover:bg-white/10 text-white font-semibold text-sm transition-all"
                style={poppins}
              >
                <ExternalLink className="w-4 h-4" />
                Contact direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SEO injection                                                               */
/* -------------------------------------------------------------------------- */

function useSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    const pageTitle = `Le Fondateur — ${founder.fullName} | ${company.legalName}`;
    const pageDescription = `${founder.fullName}, fondateur d'${company.brandName} : urbaniste inscrit à l'O.N.U.C.I., expert en sécurisation foncière, SIG et solutions numériques territoriales en Côte d'Ivoire.`;
    const pageUrl = "https://www.horizonspatial.ci/a-propos";
    const ogImage = `https://www.horizonspatial.ci${founder.photo.src}`;

    document.title = pageTitle;

    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
      return el;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
      return el;
    };

    // Standard meta
    const desc = setMeta('meta[name="description"]', "name", "description", pageDescription);

    // Canonical
    const canonical = setLink("canonical", pageUrl);

    // Open Graph (Facebook, LinkedIn, WhatsApp share previews)
    const ogTitle = setMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    const ogDesc = setMeta('meta[property="og:description"]', "property", "og:description", pageDescription);
    const ogUrl = setMeta('meta[property="og:url"]', "property", "og:url", pageUrl);
    const ogType = setMeta('meta[property="og:type"]', "property", "og:type", "profile");
    const ogImg = setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    const ogSite = setMeta('meta[property="og:site_name"]', "property", "og:site_name", company.brandName);
    const ogLocale = setMeta('meta[property="og:locale"]', "property", "og:locale", "fr_CI");

    // Twitter card
    const twCard = setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    const twTitle = setMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    const twDesc = setMeta('meta[name="twitter:description"]', "name", "twitter:description", pageDescription);
    const twImg = setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // JSON-LD Person + ProfilePage
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: founder.fullName,
        jobTitle: founder.longRole,
        worksFor: {
          "@type": "Organization",
          name: company.legalName,
          url: "https://www.horizonspatial.ci",
        },
        email: `mailto:${founder.channels.emailPro}`,
        sameAs: [founder.channels.linkedin, founder.channels.facebook].filter(
          Boolean
        ),
      },
    });
    document.head.appendChild(ld);

    return () => {
      document.title = previousTitle;
      // On laisse les balises injectées en place : si l'utilisateur revient
      // sur Home, Home pourrait à terme injecter ses propres OG tags qui les
      // écraseront. Supprimer ici causerait un flash sans OG entre les routes.
      // Seuls les tags spécifiques à About sont retirés.
      desc.remove();
      canonical.remove();
      ogTitle.remove();
      ogDesc.remove();
      ogUrl.remove();
      ogType.remove();
      ogImg.remove();
      ogSite.remove();
      ogLocale.remove();
      twCard.remove();
      twTitle.remove();
      twDesc.remove();
      twImg.remove();
      ld.remove();
    };
  }, []);
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  useSeo();

  // Scroll to top à l'arrivée
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className={isDark ? "bg-[#0A1628] text-white" : "bg-white text-[#0A1628]"}>
      <HeroSection />
      <BioSection isDark={isDark} />
      <SkillsSection isDark={isDark} />
      <TimelineSection isDark={isDark} />
      <StatsSection isDark={isDark} />
      <TestimonialsSection isDark={isDark} />
      <CTASection />
      {/* SiteFooter rendu globalement par App.tsx → SiteChrome */}
    </main>
  );
}
