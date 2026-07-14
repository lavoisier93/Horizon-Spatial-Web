import { useEffect, useState } from "react";
import { GoogleMapsIcon } from "../GoogleMapsIcon";
import { address } from "../../data/company";

const poppins = { fontFamily: "'Poppins', sans-serif" };

/**
 * Bouton flottant « Localisation » — même famille visuelle que les boutons
 * WhatsApp et Fondateur (pulse ring + tooltip), empilé au-dessus d'eux en bas
 * à droite (WhatsApp bottom-6, Fondateur bottom-24, Localisation bottom-40).
 * Ouvre la fiche Google Maps de l'entreprise dans un nouvel onglet.
 */
export function LocationButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={address.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-40 right-6 z-50 group print:hidden"
      aria-label="Voir la localisation d'Horizon Spatial sur Google Maps"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#4285F4] animate-ping opacity-20" />
        {/* Button — fond blanc pour faire ressortir l'épingle multicolore Google Maps */}
        <div className="relative w-14 h-14 rounded-full bg-white hover:bg-gray-50 border border-black/5 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 flex items-center justify-center transition-all duration-300 hover:scale-110">
          <GoogleMapsIcon className="w-8 h-8" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-[#0A1628] text-white text-xs font-medium px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl" style={poppins}>
            Nous localiser
            <div className="absolute top-full right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0A1628]" />
          </div>
        </div>
      </div>
    </a>
  );
}
