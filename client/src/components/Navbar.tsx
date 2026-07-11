import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "../contexts/ThemeContext";
import { assets, company } from "../data/company";

const poppins = { fontFamily: "'Poppins', sans-serif" };

type NavLink = { label: string; href: string; route?: boolean };

const navLinks: NavLink[] = [
  { label: "Accueil", href: "/", route: true },
  { label: "Services", href: "#services" },
  { label: "Méthodologie", href: "#methodologie" },
  { label: "Références", href: "#references" },
  { label: "Le fondateur", href: "/a-propos", route: true },
  { label: "Contact", href: "#contact" },
];

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

  // Ferme le menu mobile au clavier (Échap) — accessibilité.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

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
            src={scrolled ? (isDark ? assets.logoWhite : assets.logoColor) : assets.logoWhite}
            alt={company.shortName}
            width={292}
            height={197}
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
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? (isDark ? "text-white hover:bg-white/10" : "text-[#0A1628] hover:bg-gray-100") : "text-white hover:bg-white/10"
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu - animated */}
      <div
        id="mobile-menu"
        inert={!mobileOpen}
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
