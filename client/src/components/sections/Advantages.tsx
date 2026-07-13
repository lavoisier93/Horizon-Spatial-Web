import { useEffect, useRef, useState } from "react";
import { Reveal } from "../../components/Reveal";
import { advantages } from "../../data/advantages";
import { assets } from "../../data/company";
import { ProjectGallery } from "./ProjectsGallery";

const poppins = { fontFamily: "'Poppins', sans-serif" };

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

export function Advantages({ isDark }: { isDark: boolean }) {
  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0F1D32]" : "bg-white"}`}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${assets.topoPattern})`, backgroundSize: "cover" }} />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Nos Avantages</span>
              <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
              Pourquoi choisir{" "}
              <span className="text-[#0047AB]">H-Spatial</span> ?
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
              Six raisons concrètes de confier votre projet à un bureau d'études
              qui engage sa responsabilité d'urbaniste agréé.
            </p>
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
  );
}
