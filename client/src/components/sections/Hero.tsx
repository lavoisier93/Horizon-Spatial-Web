import { ArrowRight, BadgeCheck, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../../hooks/useCountUp";
import { useParallax } from "../../hooks/useParallax";

const poppins = { fontFamily: "'Poppins', sans-serif" };

// Image locale (rapatriement issue #14 — finies les URLs Manus CDN signées
// qui expiraient le 31 décembre 2026). Source : client/public/assets/images/
const HERO_IMG = "/assets/images/hero-cover.webp";

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
    // Respecte la préférence système "mouvement réduit" : affiche la première
    // phrase sans animation plutôt que de faire défiler/effacer en boucle.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(phrases[0]);
      return;
    }

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

export function Hero() {
  const heroParallax = useParallax(0.15);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div ref={heroParallax} className="absolute inset-[-15%] will-change-transform">
          <img
            src={HERO_IMG}
            alt="Vue aérienne d'un projet d'aménagement urbain"
            width={2400}
            height={1341}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/70 to-[#0047AB]/40" />
      </div>

      {/* Grille perspective — watermark topographique subtil (DA « Geo-Corporate
         Luxe »). Particules Canvas et losanges flottants retirés : ils relevaient
         de la piste « Terrain Intelligence » écartée (cf. ideas.md), et
         surchargeaient le mouvement (règle UX excessive-motion). */}
      <div className="hero-grid-bg" />

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

            <div className="flex flex-wrap items-center gap-4 hero-fade" style={{ animationDelay: "0.9s" }}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A86B] hover:bg-[#009960] text-[#0A1628] font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#00A86B]/25 hover:shadow-xl hover:shadow-[#00A86B]/30"
                style={poppins}
              >
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold rounded-lg transition-all duration-300"
                style={poppins}
              >
                Découvrir nos services
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
  );
}
