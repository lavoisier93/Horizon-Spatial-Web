import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "../../components/Reveal";
import { assets } from "../../data/company";
import { CITIES_DATA, CIV_OUTLINE_URL, CIV_REGIONS_URL, interventionZones } from "../../data/map";

const poppins = { fontFamily: "'Poppins', sans-serif" };

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
          ${city.isHQ ? '<div style="font-size:10px;color:#4A5568;margin-top:4px;">H-Spatial — Bureau d\'Études</div>' : ''}
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
