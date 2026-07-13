import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CookieBanner } from "./components/floating/CookieBanner";
import { FounderButton } from "./components/floating/FounderButton";
import { ReadingProgressBar } from "./components/floating/ReadingProgressBar";
import { ScrollToTopButton } from "./components/floating/ScrollToTop";
import { WhatsAppButton } from "./components/floating/WhatsAppButton";
import { Navbar } from "./components/Navbar";
import { SiteFooter } from "./components/sections/Footer";
import Home from "./pages/Home";

// Lazy-loaded pages (code splitting)
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 border-[3px] border-[#0047AB]/20 border-t-[#0047AB] rounded-full animate-spin"
          aria-hidden
        />
        <span className="text-sm text-[#4A5568]">Chargement…</span>
      </div>
    </div>
  );
}

/**
 * Routes sur lesquelles le « chrome marketing » (Navbar fixe, WhatsApp flottant,
 * Scroll-to-top, Reading progress bar, Cookie banner) doit être masqué.
 *
 * Le SiteFooter, lui, reste **toujours visible** — il porte les mentions
 * légales, le RCCM et les liens RGPD, indispensables sur toutes les pages.
 *
 * Pages chromeless :
 *   - /politique-de-confidentialite : page légale, l'utilisateur arrive pour
 *     LIRE la politique cookies → ne pas lui afficher le bandeau cookies
 *     pile sur cette page (issue d'audit #2).
 *   - /404 : page d'erreur transitoire, pas de CTA commercial.
 */
const CHROMELESS_ROUTES: readonly string[] = [
  "/politique-de-confidentialite",
  "/404",
];

function isChromelessRoute(pathname: string): boolean {
  return CHROMELESS_ROUTES.includes(pathname);
}

/**
 * Chrome partagé entre toutes les pages.
 * Le footer est mounté globalement ; le reste est conditionnel.
 */
function SiteChrome() {
  const [pathname] = useLocation();
  const chromeless = isChromelessRoute(pathname);
  return (
    <>
      {!chromeless && (
        <>
          <ReadingProgressBar />
          <Navbar />
          <WhatsAppButton />
          <FounderButton />
          <ScrollToTopButton />
          <CookieBanner />
        </>
      )}
      <SiteFooter />
    </>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/a-propos"} component={About} />
        <Route path={"/politique-de-confidentialite"} component={PrivacyPolicy} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0047AB] focus:text-white focus:font-semibold focus:shadow-lg"
          >
            Aller au contenu principal
          </a>
          <Toaster />
          <Router />
          <SiteChrome />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
