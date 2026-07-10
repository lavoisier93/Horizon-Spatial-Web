import { MapPin, Navigation } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Reveal } from "../../components/Reveal";
import { assets } from "../../data/company";
import { interventionZones } from "../../data/map";

const poppins = { fontFamily: "'Poppins', sans-serif" };

// Leaflet (~150 Ko) n'est chargé en réseau que lorsque cette section entre
// dans le viewport — code-splitting réel via React.lazy, pas seulement un
// délai d'initialisation à l'exécution.
const LeafletMap = lazy(() => import("./LeafletMapCore"));

function MapPlaceholder({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`w-full rounded-xl flex items-center justify-center h-[300px] sm:h-[400px] lg:h-[500px] ${isDark ? "bg-[#0F1D32]" : "bg-gray-100"}`}
    >
      <div className="text-center">
        <MapPin className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-white/30" : "text-gray-300"}`} />
        <p className={`text-sm ${isDark ? "text-white/40" : "text-gray-400"}`} style={poppins}>Chargement de la carte...</p>
      </div>
    </div>
  );
}

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
        <Suspense fallback={<MapPlaceholder isDark={isDark} />}>
          <LeafletMap isDark={isDark} />
        </Suspense>
      ) : (
        <MapPlaceholder isDark={isDark} />
      )}
    </div>
  );
}

export function InteractiveMap({ isDark }: { isDark: boolean }) {
  return (
    <section id="zones" className={`py-12 sm:py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-[#F0F4F8]"}`}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${assets.topoPattern})`, backgroundSize: "cover" }} />
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
              {interventionZones.map((zone, i) => (
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
  );
}
