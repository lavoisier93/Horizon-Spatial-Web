import { CheckCircle2, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LazyImage } from "../../components/LazyImage";
import { Reveal } from "../../components/Reveal";
import { services } from "../../data/services";

const poppins = { fontFamily: "'Poppins', sans-serif" };

// Exemple de réalisation — image locale (rapatriement issue #14).
const PLAN_IMG = "/assets/images/plan-img.png";

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

export function ServicesGrid({ isDark }: { isDark: boolean }) {
  return (
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
              <div className={`rounded-2xl p-8 border h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${isDark ? "bg-white/5 border-white/10 hover:bg-white/[0.07]" : "bg-white border-[#E2E8F0] hover:shadow-lg hover:border-[#0047AB]/20"}`}>
                <AnimatedServiceIcon icon={service.icon} color={service.color} index={i} />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold" style={{ ...poppins, color: `${service.color}80` }}>0{i + 1}</span>
                  <div className={`w-6 h-px ${isDark ? "bg-white/15" : "bg-[#E2E8F0]"}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{service.title}</h3>
                <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-white/70" : "text-[#4A5568]"}`}>{service.desc}</p>

                <div className={`mt-auto pt-5 border-t ${isDark ? "border-white/10" : "border-[#E2E8F0]"}`}>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-white/60" : "text-[#4A5568]"}`} style={poppins}>Livrables</div>
                  <ul className="space-y-1.5 mb-4">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: service.color }} />
                        <span className={`text-sm ${isDark ? "text-white/80" : "text-[#0A1628]"}`}>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className={`text-[10px] uppercase tracking-wider mb-0.5 ${isDark ? "text-white/50" : "text-[#4A5568]/80"}`} style={poppins}>Délai</div>
                      <div className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-[#0A1628]"}`} style={poppins}>{service.duration}</div>
                    </div>
                    <div>
                      <div className={`text-[10px] uppercase tracking-wider mb-0.5 ${isDark ? "text-white/50" : "text-[#4A5568]/80"}`} style={poppins}>Outils</div>
                      <div className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-[#0A1628]"}`} style={poppins}>{service.tools}</div>
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
  );
}
