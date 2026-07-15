import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { loadUmami } from "../../lib/analytics";

// RGPD : conservation max 1 an (CNIL recommande 6-13 mois). Ce composant
// stocke un objet versionné, vérifie l'expiration à chaque visite, et
// re-déclenche les side-effects (Umami) si le consentement est encore valide.
const CONSENT_STORAGE_KEY = "hspatial_cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000;

type ConsentStatus = "accepted" | "declined";
type ConsentRecord = {
  status: ConsentStatus;
  timestamp: number;
  version: number;
};

function readConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    // Rétro-compat : ancienne version stockait juste une chaîne.
    if (raw === "accepted" || raw === "declined") {
      return { status: raw, timestamp: 0, version: 0 };
    }
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      parsed &&
      (parsed.status === "accepted" || parsed.status === "declined") &&
      typeof parsed.timestamp === "number" &&
      typeof parsed.version === "number"
    ) {
      return parsed as ConsentRecord;
    }
    return null;
  } catch {
    return null;
  }
}

function isConsentExpired(record: ConsentRecord): boolean {
  if (record.version < CONSENT_VERSION) return true;
  return Date.now() - record.timestamp > CONSENT_TTL_MS;
}

function writeConsent(status: ConsentStatus): void {
  try {
    const record: ConsentRecord = {
      status,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage indisponible (quota, mode privé Safari) — silencieux.
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const record = readConsent();
    if (!record || isConsentExpired(record)) {
      // Pas de consentement valide → afficher après un délai pour ne pas
      // entrer en conflit avec le loading screen.
      const timer = setTimeout(() => setVisible(true), 3500);
      return () => clearTimeout(timer);
    }
    // Consentement valide → re-déclencher Umami sur chaque visite si accepté.
    if (record.status === "accepted") {
      loadUmami();
    }
  }, []);

  const handleAccept = () => {
    writeConsent("accepted");
    loadUmami();
    setVisible(false);
  };

  const handleDecline = () => {
    writeConsent("declined");
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
                <p className="text-white/65 text-xs mt-1">
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
