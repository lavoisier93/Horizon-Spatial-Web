import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { assets } from "../../data/company";
import { founder } from "../../data/founder";

const poppins = { fontFamily: "'Poppins', sans-serif" };

/**
 * Bouton flottant circulaire avec la photo du fondateur — même famille
 * visuelle que le bouton WhatsApp (pulse ring + tooltip), positionné juste
 * au-dessus de lui en bas à droite. Lien vers la page /a-propos.
 *
 * Masqué sur /a-propos (inutile de pointer vers la page courante).
 */
export function FounderButton() {
  const [visible, setVisible] = useState(false);
  const [pathname] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || pathname === "/a-propos") return null;

  return (
    <Link
      href="/a-propos"
      className="fixed bottom-24 right-6 z-50 group print:hidden"
      aria-label={`Découvrir le parcours de ${founder.fullName}, fondateur d'Horizon Spatial`}
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#00A86B] animate-ping opacity-20" />
        {/* Photo circulaire */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-[3px] border-[#00A86B] shadow-xl shadow-[#00A86B]/30 hover:shadow-2xl hover:shadow-[#00A86B]/40 transition-all duration-300 hover:scale-110 bg-[#0A1628]">
          <img
            src={assets.founderPortrait}
            alt=""
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-[#0A1628] text-white text-xs font-medium px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl" style={poppins}>
            Rencontrer le fondateur
            <div className="absolute top-full right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0A1628]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
