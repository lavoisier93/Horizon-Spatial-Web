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
  Download,
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
  AlertCircle,
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
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── PARALLAX HOOK ──────────────────────────────
function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable parallax on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Only compute when section is near viewport
        if (rect.bottom < -200 || rect.top > windowH + 200) return;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowH / 2;
        const delta = (sectionCenter - viewportCenter) * speed;
        if (Math.abs(delta - offsetRef.current) > 0.5) {
          offsetRef.current = delta;
          el.style.transform = `translate3d(0, ${delta}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial position
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return ref;
}

// ─── LOADING SCREEN COMPONENT ───────────────
// Phase 1: Spinning diamonds (1.5s) → Phase 2: Logo pathReveal + pulse + progress bar (like HTML file)
function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [phase, setPhase] = useState<1 | 2>(1);

  useEffect(() => {
    // Phase 1 lasts 1.5s, then switch to Phase 2
    const t1 = setTimeout(() => setPhase(2), 1500);
    // Phase 2 logo animation ~3s, then fade-out
    const t2 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 800);
    }, 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050508]"
      style={{
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? "hidden" : "visible",
        transition: "opacity 0.8s ease, visibility 0.8s ease",
      }}
    >
      {/* Phase 1: Spinning Diamonds */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: phase === 1 ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      >
        <div className="relative w-[100px] h-[100px]">
          <div className="loader-diamond absolute top-0 left-[20px] w-[40px] h-[40px] border-[3px] border-[#0047AB]" />
          <div className="loader-diamond loader-diamond-2 absolute bottom-0 left-[40px] w-[40px] h-[40px] border-[3px] border-[#00A86B]" />
        </div>
      </div>

      {/* Phase 2: Logo SVG with pathReveal animation (exact reproduction of HTML file) */}
      <div
        className="loader-phase2"
        style={{
          opacity: phase === 2 ? 1 : 0,
          transition: "opacity 0.5s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.75rem",
        }}
      >
        {phase === 2 && (
          <>
            <svg
              className="loader-icon-svg"
              viewBox="0 0 237.4442 119.9429"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "220px", height: "auto" }}
            >
              <g transform="scale(3.2297424049981)">
                <path className="loader-path path-blue-1" fill="#0047ab" d="m8.605 18.568 9.961-9.963 9.963 9.963 4.302-4.302L18.566 0 0 18.568l18.566 18.567L28.99 26.709l10.428 10.428h4.52L31.25 24.451h.003l-4.302-4.305-8.385 8.383z" />
                <path className="loader-path path-blue-2" fill="#2b75b7" d="m37.133 18.566-4.304 4.303-4.302-4.303 4.304-4.303z" />
                <path className="loader-path path-blue-3" fill="#2b75b7" d="m61.897 18.566 1.575 1.576 1.575-1.576-1.575-1.574-1.575 1.574zm3.622 2.707 1.229 1.23 1.229-1.23-1.229-1.229-1.229 1.229zm2.936-7.502-2.238 2.238 2.238 2.238 2.238-2.238-2.238-2.238z" />
                <path className="loader-path path-green-1" fill="#00a86b" d="m62.604 15.508-1.464-1.463-.8.799-.953-.953.799-.801L47.096 0 36.671 10.424 26.246 0h-4.521l7.25 7.25 5.437 5.438 4.302 4.301 8.383-8.383 9.963 9.963-9.963 9.961-9.962-9.963-4.304 4.303 14.266 14.266L62.605 21.63l-3.061-3.061 3.06-3.061zm-6.383-.137 1.266-1.266 1.266 1.266-1.266 1.266-1.266-1.266zm4.125 6.738-1.34 1.34-1.34-1.34 1.34-1.34 1.34 1.34z" />
                <path className="loader-path path-green-2" fill="#00a86b" d="m62.053 25.938 2.555 2.557 2.556-2.557-2.556-2.555-2.555 2.555zm9.455-7.479-2.012 2.012 2.012 2.01 2.01-2.01-2.01-2.012zm-5.197-5.576-1.293-1.293-1.294 1.293 1.294 1.295 1.293-1.295z" />
              </g>
            </svg>

            {/* HORIZON SPATIAL text */}
            <div className="loader-hs-text">HORIZON SPATIAL</div>

            {/* Progress bar */}
            <div className="loader-progress-container">
              <div className="loader-progress-fill" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PARTICLE CANVAS COMPONENT ──────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{
    x: number; y: number; size: number;
    speedX: number; speedY: number;
    color: string; alpha: number;
  }[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Skip on mobile for performance
    if (window.innerWidth < 768) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking on the parent section (not canvas since pointer-events-none)
    const parent = canvas.parentElement;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Initialize 100 particles
    const PARTICLE_COUNT = 100;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_RADIUS = 120; // Repulsion radius around cursor
    const MOUSE_FORCE = 3; // Repulsion strength

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      color: Math.random() > 0.5 ? "#4D9FFF" : "#00E88F",
      alpha: Math.random() * 0.25 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      const mouse = mouseRef.current;

      // Update & draw particles
      for (const p of ps) {
        // Mouse repulsion effect
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE;
            p.speedX += (dx / dist) * force * 0.1;
            p.speedY += (dy / dist) * force * 0.1;
          }
        }

        // Apply friction to prevent infinite acceleration
        p.speedX *= 0.98;
        p.speedY *= 0.98;

        // Maintain minimum speed so particles keep moving
        const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
        if (speed < 0.3) {
          p.speedX += (Math.random() - 0.5) * 0.1;
          p.speedY += (Math.random() - 0.5) * 0.1;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      // Draw cursor glow + lines from cursor to nearby particles
      if (mouse.active) {
        // Pulsating glow effect around cursor
        const time = Date.now() * 0.003;
        const pulse = 0.5 + Math.sin(time) * 0.3; // oscillates 0.2 - 0.8
        const glowRadius = MOUSE_RADIUS * (0.6 + Math.sin(time * 0.7) * 0.15);

        // Outer glow ring
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(77, 159, 255, ${0.12 * pulse})`);
        gradient.addColorStop(0.4, `rgba(0, 232, 143, ${0.06 * pulse})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.fill();

        // Inner bright core
        const coreGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 8
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 * pulse})`);
        coreGradient.addColorStop(0.5, `rgba(77, 159, 255, ${0.2 * pulse})`);
        coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.globalAlpha = 1;
        ctx.fill();

        // Lines from cursor to nearby particles
        for (const p of ps) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS * 1.5) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = ((MOUSE_RADIUS * 1.5 - dist) / (MOUSE_RADIUS * 1.5)) * 0.25;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Connect nearby particles with lines (distance < 150px)
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = ps[i].color;
            ctx.globalAlpha = ((CONNECTION_DISTANCE - dist) / CONNECTION_DISTANCE) * 0.4;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[5] pointer-events-none" />;
}

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
const LOGO_WHITE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/gvCTmeZaVyxKdIeO.png";
const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-1_1772151147000_na1fn_aGVyby1jb3Zlcg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTFfMTc3MjE1MTE0NzAwMF9uYTFmbl9hR1Z5YnkxamIzWmxjZy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nB-0WTFlA1pfxWkXetc~YxW4cfaXwWCZDuchJvLCLsHq1zlPw-HEoUxCp9Imt1~Xg1S~hslfjw5OgqjJD02u55bHSHOfJC5kVrE5BN6KZ2n4Tiexlyka8sdMVC-ZlY0WnudnB~dt9NZ~8MvkBcsNYoZnVEFIV7g~PaCqprv-AbIxnWZQ8bp7td5r6py~vsZlSeE9I3xBnAuQWeslxidNoHYIA-AWLCVhekI-veYlSUDtSeTS1o8mcj6RcWfCBQnf9UecTVfgQwcHXO5s7ycboy9~Dakmy0g9h~6fvgYO4E0QY6QvwSYFb3MTXZs4S7XClcYbEb2iTubBNwUx~SRntQ__";
const DRONE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-2_1772151154000_na1fn_ZHJvbmUtc3VydmV5.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTJfMTc3MjE1MTE1NDAwMF9uYTFmbl9aSEp2Ym1VdGMzVnlkbVY1LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=X~Y1ltGRPTGMecfHiABxo6PTriOBxBMYCLgpl1gc2YmiilB13hFXpxh0bdx7aon2HqMHjexyItaDdTvEAYG7dxK681x8wLFesMVcwUR8SFzLHpnW9VyODj74rHF4C-8wQOjp282DEhXa~14E0IqshQcz4fNYtXi8-qrERx19y8-977ScVDqQmM98Wx0m5R1FE-tfQR5vbTH7~Fq6AZ1ijoo4P66ckzMVOj1ry0ik7Nh995qkJrIeu078U50A1~bDAF1kRqsVGJ8yfkeMmT06bkaOQVGYECBOcxl~uTleIoAkcW-UiP~IhZ1Tr3mJywx5bn-t3yxxR3pMGznQhNEIdQ__";
const OFFICE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-3_1772151169000_na1fn_dXJiYW5pc3Qtd29yaw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTNfMTc3MjE1MTE2OTAwMF9uYTFmbl9kWEppWVc1cGMzUXRkMjl5YXcuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v5CNvW6mplnS~2gM-~h5UnCNzJbQ~S~sMV0pHw8vQ7plgQ2pw6uDzvazPJTXbd03Qpzi2TFcE9rZvfyux1ZOOLEnW-VXfmcSSCZY-IlHuNsVlExlWGais7ZC7UA04w9fLfDeflx3t5LPt1Arqqb4SSDrgewreygT2xEX4b0CYP1yZpq~sMjkdDYy9wWYRmFvVH7IRsxnkL3O5SdAqomL2NtjuuRrqYvGYlWsGRW17i-4dxZYLvoqdtVKOpECESCJ~TEnQGMWv5N76o3lccICyCJmE600v6OpouQTn-tXI1yTyqleKJqVLqHb8cgnfH5AhGuWkirgW7a8L7SepG0MZA__";
const LEGAL_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-4_1772151146000_na1fn_bGVnYWwtY29tcGxpYW5jZQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTRfMTc3MjE1MTE0NjAwMF9uYTFmbl9iR1ZuWVd3dFkyOXRjR3hwWVc1alpRLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=LcxV98B9g1ksDwQCJGC2hI4YTcTXEZL4sU50AdzJJZEgwMJ~p7MBKxqTBIT2AFCKpms4bsXOaPVfISu7xH5n8QL6N7KqZhMm0kFgHcc3Ha9QO0EGfVRrOkJOCkfJ5VUxNMYH1kf7B7rH7F4oG8pM9idKt7mU9-4xPzgsKudp~du3I1VulDezAUz07scI3JNjsoSnQgQFg5uVmJCrlHx7bSjHX2cPX58ZymNmOcBPjRvkuqk4GIBCA-vCq0kSv95Vupj1sNCN84UHW0u6mi6S5F-rM2AxaBEBpjzRCRiSJHuBLbT~w-9xMYInOPhNlcOyB7rfd5y5DQCWwdDrfOqkpg__";
const TOPO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-5_1772151172000_na1fn_dG9wby1wYXR0ZXJu.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTVfMTc3MjE1MTE3MjAwMF9uYTFmbl9kRzl3Ynkxd1lYUjBaWEp1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gKwZ1k6Nc2~9wd663cVE51kJSwGyU50QQoDOho9psivHmrU9TCYLLFGJxyVWYSnOk7bZ3hlTI3iVfIPP4fa98FOWPRAx8a1swapmHB59NECN~fzl2oDYqlUAuobu719dB4CIv3tbKhuKcRwDNqp6c~5PaFN35~pus3b7CAIFFYOhClpFpCl~SDqj1KXUsYaA1Wujj7dSdo2tKkjsUSqkjC9rlMZAJ2XRJxzx5rTUPvkjYVNrowEVzuhq2tLKNxIdQ7IzUVcDAfWXCYDEBCW0CTcPVQDs22nmRK9-0fSg14E19UG7rOhQk7RUNgjJ2IAGjzhlb4i01m5Zj~rQ7FJTRw__";
const PLAN_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/yIyJWJSLuFtsFAez.png";
const LAVOISIER_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/wTZkjIfvofzfEdGe.png";
const LAVOISIER_ONUCI_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/txpCQkaXHRfFEpEb.jpg";
const LOGO_COLOR = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/iMiXhhfBFkffYFqG.png";
const WHATSAPP_NUMBER = "2250143430505";
const LINKEDIN_URL = "https://www.linkedin.com/company/horizon-spatial/?viewAsMember=true";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100091959134098&sk=about";

// Logos partenaires institutionnels
const LOGO_MCLU = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/rtgqWktgGTrElydU.png";
const LOGO_GEOMETRES = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/kTHTCWAldhRQrGUs.png";
const LOGO_BNETD = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/xbLNosfwBJlegNVB.jpg";
const LOGO_OACI = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/MfzGwWlTIFyWqLjI.jpg";
const LOGO_IGNFI = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/CfXlumoRUdVoCOaG.jpg";
const LOGO_AFOR = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/zSphuRsFWmQkEIeY.png";
const LOGO_GEOFIT = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/MISETdlKHwxopnBt.png";
const LOGO_DISTRICT = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/eCjjxsKqeNdNcKhJ.jpg";
const GALLERY_DRONE = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/ObYE2HNxqV6UNOr9igklvu-img-1_1772154316000_na1fn_Z2FsbGVyeS1kcm9uZS1sb3Rpc3NlbWVudA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94L09iWUUySE54cVY2VU5PcjlpZ2tsdnUtaW1nLTFfMTc3MjE1NDMxNjAwMF9uYTFmbl9aMkZzYkdWeWVTMWtjbTl1WlMxc2IzUnBjM05sYldWdWRBLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=K08ALPhID2S2hE2uVAcx5zrRCLmcFoGCtHLcZu24PQCRSSbar9ikNs5E0Y~g0hyxuho~PukDBI~yD5OecG1Xmxksv8kBnrdj-T1phWmJRJ7anmFttyAk7txAWXiatPsRzWutyG962nTzpiv78O5-b-ONClB-RT3r3zyQYTag8KYEu-fiC5SWSK3A0AQyPWUNi151Y3lFYhUOp4-xpQouVFql8fy2aB45B04Z4fGRzI8x0Mslh-Rnhry-lahtUsl-EqSkyVlZGH4RoU2iwUzjloaKYOyDDrvuv9PGORF9nSz0952qlBraRptYkkVKnHdjDA0x8hMh5~fv37Ow1I0FcA__";
const GALLERY_PLAN = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/ObYE2HNxqV6UNOr9igklvu-img-2_1772154312000_na1fn_Z2FsbGVyeS1wbGFuLWFwcHJvdXZl.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94L09iWUUySE54cVY2VU5PcjlpZ2tsdnUtaW1nLTJfMTc3MjE1NDMxMjAwMF9uYTFmbl9aMkZzYkdWeWVTMXdiR0Z1TFdGd2NISnZkWFpsLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PabrNXNEe90ud2lnzoW-RvDcgmDxns3gfXhytPh6Slf9J~mU4JLg-bgsF6ZrlJar-xp2wMVB0vQgaiQqBs31FPZQpIaQAJa1wxG2MFq9Dh7RT3uL355rL1riMBEzswXYOUpvMCkFhHxFrP-OyW1ZDMuRldMQ8XVAO1aewjAzlkpiYP0UdZfnr~arDhgAzKfl6L03bhZGO1guTAYk3yWxoHDbSi601eZoTOcmxmK8GE~OhXaEyMCCDCjnOq9w42wy~lvrcQKZp4EyibjFWODKS8E7sEg32SaTcgVz42fqsRFLSBuoDbNnABje1VGwcMFiQDWFpSbAXVNFaGGw-UZ2QA__";
const GALLERY_MAQUETTE = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/ObYE2HNxqV6UNOr9igklvu-img-3_1772154313000_na1fn_Z2FsbGVyeS1tYXF1ZXR0ZS0zZA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94L09iWUUySE54cVY2VU5PcjlpZ2tsdnUtaW1nLTNfMTc3MjE1NDMxMzAwMF9uYTFmbl9aMkZzYkdWeWVTMXRZWEYxWlhSMFpTMHpaQS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=A1v2b51etsVUcAVv1w1mojRiSO3mDSU9dU9F05wNY6jpmghZrke~MryI4lKjT3n9bcC2kW4~O8eTGmunGD5RJjJ7ZcDbJX-6WGB2rgUACiJN0o4XuWYvvVndhx2~A5yFHLDj2O2Si8trWe75oQ7xl9h6rkGRN33CwqlvWKeEd5XuwATyBxh~JVOkVJikVWdG9QeM5MZoFS04PQJtwqFSpwvNpag1VjU-e2ohvKX33SSTI8kImG3AuZdFV2xmJjJ1PTAEXDHCKEbJ0Py~1qXgK7Zlc8KYqzH8aF5Pcp~lxk3QNQPfeUzVAITj2Ejp7KNUdW3mGBDAhOIwokielcvdQg__";

const poppins = { fontFamily: "'Poppins', sans-serif" };

// GeoJSON data URLs (via storage proxy)
const CIV_OUTLINE_URL = "/manus-storage/civ_outline_d27819b9.geojson";
const CIV_REGIONS_URL = "/manus-storage/civ_regions_555b60a5.geojson";

// Intersection Observer hook for fade-in animations
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-element ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

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

// ─── LAZY IMAGE COMPONENT ──────────────────────────────
// Uses IntersectionObserver to only load images when they enter the viewport
// Shows a blurred placeholder until the image is loaded
function LazyImage({ src, alt, className = "", style, onClick }: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" } // Start loading 200px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      data-src={src}
      alt={alt}
      className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={style}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onClick={onClick}
    />
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

//// ─── PDF DOWNLOAD HANDLER ─────────────────────────
function handleDownloadPDF() {
  window.print();
}

// ─── ANIMATED COUNTER HOOK ──────────────────────
function useCountUp(target: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return { ref, count, suffix };
}

function AnimatedStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <div ref={ref}>
      <div className="text-3xl lg:text-4xl font-bold text-white" style={poppins}>
        {count}{suffix}
      </div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
}

// ─── NAVBAR COMPONENT ──────────────────────────
const navLinks = [
  { label: "Réglementation", href: "#reglementation" },
  { label: "Services", href: "#services" },
  { label: "Méthodologie", href: "#methodologie" },
  { label: "Références", href: "#references" },
  { label: "FAQ", href: "#faq" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Zones", href: "#zones" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ isDark, onToggleDark }: { isDark: boolean; onToggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 print:hidden ${
        scrolled
          ? `top-0 ${isDark ? "bg-[#0A1628]/95" : "bg-white/95"} backdrop-blur-lg shadow-lg ${isDark ? "shadow-black/20" : "shadow-black/5"} py-3`
          : "top-[40px] bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src={scrolled ? (isDark ? LOGO_WHITE : LOGO_COLOR) : LOGO_WHITE}
            alt="H-Spatial"
            className="h-10 transition-all duration-300"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? isDark ? "text-white/70 hover:text-white hover:bg-white/10" : "text-[#4A5568] hover:text-[#0047AB] hover:bg-[#0047AB]/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              style={poppins}
            >
              {link.label}
            </a>
          ))}
          <DarkModeToggle isDark={isDark} onToggle={onToggleDark} scrolled={scrolled} />
          <a
            href="#contact"
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? isDark ? "text-white/70 hover:text-white hover:bg-white/10" : "text-[#4A5568] hover:text-[#0047AB] hover:bg-[#0047AB]/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={poppins}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
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

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#0047AB] hover:bg-[#003580] text-white shadow-lg shadow-[#0047AB]/30 hover:shadow-xl flex items-center justify-center transition-all duration-500 print:hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronDown className="w-5 h-5 rotate-180" />
    </button>
  );
}

// ─── UTM TRACKING HELPER ──────────────────────
function addUtm(url: string, source: string, medium: string, campaign: string = "plaquette_amenageurs_2026") {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`;
}

function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const message = encodeURIComponent(
    "Bonjour H-Spatial, je suis intéressé(e) par vos services d'urbanisme pour mon projet de lotissement. Pouvez-vous me recontacter ?"
  );

  return (
    <a
      href={addUtm(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "whatsapp", "floating_button")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group print:hidden"
      aria-label="Contacter via WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        {/* Button */}
        <div className="relative w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 flex items-center justify-center transition-all duration-300 hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-[#0A1628] text-white text-xs font-medium px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl" style={poppins}>
            Discuter sur WhatsApp
            <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0A1628]" />
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── COOKIE CONSENT BANNER ───────────────────
function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hspatial_cookie_consent");
    if (!consent) {
      // Show banner after 2s delay so it doesn't compete with loading screen
      const timer = setTimeout(() => setVisible(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hspatial_cookie_consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("hspatial_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9000] print:hidden"
      style={{ animation: "slideUpCookie 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards" }}
    >
      <div className="bg-[#0A1628]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Icon + Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-[#0047AB]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-[#0047AB]" />
              </div>
              <div>
                <p className="text-white/90 text-sm font-medium leading-relaxed">
                  Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic.
                </p>
                <p className="text-white/40 text-xs mt-1">
                  En poursuivant, vous acceptez notre{" "}
                  <a href="/politique-de-confidentialite" className="text-[#0047AB] hover:text-[#0055CC] underline transition-colors">
                    politique de confidentialité
                  </a>{" "}
                  conformément au RGPD.
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-[#0047AB] hover:bg-[#0055CC] rounded-lg shadow-lg shadow-[#0047AB]/30 hover:shadow-xl hover:shadow-[#0047AB]/40 transition-all duration-300"
              >
                Accepter
              </button>
            </div>
          </div>
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

// ─── READING PROGRESS BAR ───────────────────────
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
      <div
        className="h-[3px] transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #0047AB 0%, #00A86B 100%)",
          boxShadow: progress > 0 ? "0 0 8px rgba(0, 168, 107, 0.4)" : "none",
        }}
      />
    </div>
  );
}

// ─── URGENCY BANNER COMPONENT ───────────────────
function UrgencyBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#B91C1C] text-white print:hidden">
      <div className="container mx-auto px-6 lg:px-12 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" />
          <p className="text-xs sm:text-sm font-medium truncate" style={poppins}>
            <span className="font-bold">Code de l'Urbanisme 2020</span>
            <span className="hidden sm:inline"> — Êtes-vous en conformité ? Tout lotissement sans urbaniste agréé est passible de sanctions pénales.</span>
            <span className="sm:hidden"> — Conformité obligatoire !</span>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <a
            href="#reglementation"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md text-xs font-semibold transition-colors"
            style={poppins}
          >
            En savoir plus
            <ArrowRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setVisible(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

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
function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    typeProjet: "",
    superficie: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Construct mailto link with form data
    const subject = encodeURIComponent(`Demande de devis - ${formData.typeProjet || "Projet de lotissement"}`);
    const body = encodeURIComponent(
      `Nom : ${formData.nom}\n` +
      `Email : ${formData.email}\n` +
      `Téléphone : ${formData.telephone}\n` +
      `Type de projet : ${formData.typeProjet}\n` +
      `Superficie estimée : ${formData.superficie}\n\n` +
      `Message :\n${formData.message}\n\n` +
      `---\nEnvoyé depuis la plaquette commerciale H-Spatial`
    );

    window.location.href = `mailto:contact@horizonspatial.ci?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-[#00A86B]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#00A86B]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3" style={poppins}>Demande envoyée !</h3>
        <p className="text-white/60 leading-relaxed mb-6">
          Votre client de messagerie s'est ouvert avec les informations pré-remplies.
          Envoyez l'email pour finaliser votre demande. Notre équipe vous répondra sous 24h.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ nom: "", email: "", telephone: "", typeProjet: "", superficie: "", message: "" }); }}
          className="text-[#00A86B] hover:text-white transition-colors text-sm font-medium"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[#00A86B]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white" style={poppins}>Demander un devis gratuit</h3>
          <p className="text-white/40 text-sm">Réponse sous 24h ouvrées</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Nom complet *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Email *</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Téléphone *</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              placeholder="+225 XX XX XX XX XX"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
            />
          </div>
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
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
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
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm resize-none"
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
  const [isDark, setIsDark] = useState(false);

  // Parallax refs for dark sections background images
  const heroParallax = useParallax(0.15);
  const expertiseParallax = useParallax(0.2);
  const methodoParallax = useParallax(0.2);
  const contactParallax = useParallax(0.15);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-white"}`}>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Urgency Banner */}
      <UrgencyBanner />

      {/* Fixed Navbar */}
      <Navbar isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* ===== SECTION 1: HERO / COVER ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div ref={heroParallax} className="absolute inset-[-15%] will-change-transform">
            <img src={HERO_IMG} alt="Vue aérienne d'un projet d'aménagement urbain" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/75 to-[#0047AB]/40" />
        </div>

        {/* Animated Perspective Grid */}
        <div className="hero-grid-bg" />

        {/* Floating Geometric Elements */}
        <div className="geo-element geo-diamond-1" />
        <div className="geo-element geo-diamond-2" />
        <div className="geo-element geo-diamond-3" />
        <div className="geo-element geo-diamond-4" />

        {/* Particle System */}
        <ParticleCanvas />

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

              <div className="flex flex-wrap gap-4 hero-fade" style={{ animationDelay: "0.9s" }}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A86B] hover:bg-[#009960] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#00A86B]/25 hover:shadow-xl hover:shadow-[#00A86B]/30"
                  style={poppins}
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all duration-300 print:hidden"
                  style={poppins}
                >
                  <Download className="w-5 h-5" />
                  Télécharger en PDF
                </button>
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hero-fade" style={{ animationDelay: "1.5s" }}>
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
                  <h3 className="text-xl font-bold text-white mb-1" style={poppins}>Lavoisier Ousmane</h3>
                  <p className="text-[#00A86B] text-sm font-medium mb-4">Urbaniste & Expert SIG</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Fondateur d'Horizon Spatial, urbaniste inscrit à l'O.N.U.C.I.
                    avec plus de 8 années d'expérience en aménagement du territoire et géomatique.
                  </p>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A86B]/10 border border-[#00A86B]/20 text-[#00A86B] text-xs font-medium">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Membre O.N.U.C.I.
                  </span>
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
                <div className="service-card-container h-full" style={{ minHeight: "320px" }}>
                  <div className="service-card-inner">
                    {/* FRONT FACE */}
                    <div className={`service-card-face service-card-front rounded-2xl p-8 border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E2E8F0]"}`}>
                      <AnimatedServiceIcon icon={service.icon} color={service.color} index={i} />
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-[#0047AB]/30" style={poppins}>0{i + 1}</span>
                        <div className="w-6 h-px bg-[#E2E8F0]" />
                      </div>
                      <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{service.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>{service.desc}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium" style={{ color: service.color }}>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Survoler pour les détails</span>
                      </div>
                    </div>
                    {/* BACK FACE */}
                    <div
                      className="service-card-face service-card-back rounded-2xl p-8 border"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}18, ${service.color}08)`,
                        borderColor: `${service.color}40`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.color}20` }}>
                          <service.icon className="w-5 h-5" style={{ color: service.color }} />
                        </div>
                        <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{service.title}</h3>
                      </div>

                      <div className="mb-4">
                        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-white/50" : "text-[#4A5568]"}`} style={poppins}>Livrables</div>
                        <div className="space-y-1.5">
                          {service.deliverables.map((d) => (
                            <div key={d} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: service.color }} />
                              <span className={`text-sm ${isDark ? "text-white/80" : "text-[#0A1628]"}`}>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className={`rounded-lg p-3 ${isDark ? "bg-white/5" : "bg-white/80"}`}>
                          <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? "text-white/40" : "text-[#4A5568]"}`} style={poppins}>Délai</div>
                          <div className={`text-sm font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{service.duration}</div>
                        </div>
                        <div className={`rounded-lg p-3 ${isDark ? "bg-white/5" : "bg-white/80"}`}>
                          <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? "text-white/40" : "text-[#4A5568]"}`} style={poppins}>Outils</div>
                          <div className={`text-sm font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{service.tools}</div>
                        </div>
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
                    <div className={`text-xs ${isDark ? "text-white/40" : "text-[#4A5568]"}`}>{t.company}</div>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  { src: LOGO_MCLU, name: "MCLU", desc: "Ministère de la Construction", url: "https://construction.gouv.ci" },
                  { src: LOGO_GEOMETRES, name: "OGE-CI", desc: "Ordre des Géomètres-Experts", url: "https://www.geometres-experts.ci" },
                  { src: LOGO_OACI, name: "OACI", desc: "Ordre des Architectes", url: "https://www.oaci.ci" },
                  { src: LOGO_BNETD, name: "BNETD", desc: "Bureau National d'Études", url: "https://www.bnetd.ci" },
                  { src: LOGO_DISTRICT, name: "District d'Abidjan", desc: "District Autonome", url: "https://www.abidjan.district.ci" },
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
                  { src: LAVOISIER_ONUCI_IMG, name: "O.N.U.C.I.", desc: "Ordre National des Urbanistes", url: "https://www.onuci.org" },
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
                  <a href="tel:+2250143430505" className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">+225 01 43 43 05 05</div>
                      <div className="text-white/40 text-sm">+225 27 22 25 60 38</div>
                    </div>
                  </a>
                  <a href={addUtm("mailto:contact@horizonspatial.ci", "plaquette", "email_button")} className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div className="text-white font-semibold">contact@horizonspatial.ci</div>
                  </a>
                  <a href={addUtm("https://www.horizonspatial.ci", "plaquette", "website_button")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div className="text-white font-semibold">www.horizonspatial.ci</div>
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

                {/* PDF Download button */}
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white/70 hover:text-white font-medium rounded-xl border border-white/10 transition-all duration-300 print:hidden"
                  style={poppins}
                >
                  <Download className="w-5 h-5" />
                  Télécharger cette plaquette en PDF
                </button>
              </div>
            </Reveal>

            {/* Right: Contact Form */}
            <Reveal delay={200}>
              <ContactForm />
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-16 text-center">
              <p className="text-white/30 text-sm italic" style={poppins}>
                « Voir plus loin, bâtir mieux »
              </p>
              <p className="text-white/20 text-xs mt-3">
                H-Spatial | Spatial Intelligence for Africa
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== COOKIE CONSENT BANNER ===== */}
      <CookieBanner />

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0A1628] pt-8 pb-6 border-t border-white/5">
        {/* Carrousel de logos partenaires */}
        <div className="mb-8 overflow-hidden">
          <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mb-4" style={poppins}>Nos partenaires institutionnels</p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A1628] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A1628] to-transparent z-10" />
            <div className="flex animate-[scroll_25s_linear_infinite] gap-12 items-center w-max">
              {[...Array(3)].map((_, setIdx) => (
                <div key={setIdx} className="flex gap-12 items-center">
                  {[
                    { src: LOGO_MCLU, name: "MCLU", url: "https://construction.gouv.ci" },
                    { src: LOGO_GEOMETRES, name: "OGE-CI", url: "https://www.geometres-experts.ci" },
                    { src: LOGO_OACI, name: "OACI", url: "https://www.oaci.ci" },
                    { src: LOGO_BNETD, name: "BNETD", url: "https://www.bnetd.ci" },
                    { src: LOGO_DISTRICT, name: "District", url: "https://www.abidjan.district.ci" },
                    { src: LOGO_IGNFI, name: "IGN FI", url: "https://www.ignfi.fr" },
                    { src: LOGO_GEOFIT, name: "GeoFIT", url: "https://www.geofit.fr" },
                    { src: LOGO_AFOR, name: "AFOR", url: "https://www.afor.ci" },
                  ].map((p, i) => (
                    <a
                      key={`${setIdx}-${i}`}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity shrink-0"
                      title={p.name}
                    >
                      <LazyImage src={p.src} alt={p.name} className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                      <span className="text-white/30 text-[8px]">{p.name}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={LOGO_WHITE} alt="H-Spatial" className="h-8" />
              <span className="text-white/30 text-sm">Bureau d'Études d'Urbaniste Agréé & Géomatique</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/20 text-xs">
                RCCM : CI-ABJ-03-2026-B13-00264 | Abidjan, Côte d'Ivoire
              </span>
              <a href="/politique-de-confidentialite" className="text-white/20 hover:text-white/50 text-xs underline transition-colors">
                Politique de confidentialité
              </a>
              <div className="flex gap-2">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#0077B5]/30 flex items-center justify-center transition-all" title="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5 text-white/40 hover:text-white" />
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#1877F2]/30 flex items-center justify-center transition-all" title="Facebook">
                  <Facebook className="w-3.5 h-3.5 text-white/40 hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
