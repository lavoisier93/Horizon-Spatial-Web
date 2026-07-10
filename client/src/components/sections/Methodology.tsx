import { useEffect, useRef, useState } from "react";
import { LazyImage } from "../../components/LazyImage";
import { Reveal } from "../../components/Reveal";
import { steps } from "../../data/methodology";
import { useParallax } from "../../hooks/useParallax";

const poppins = { fontFamily: "'Poppins', sans-serif" };

// Image locale (rapatriement issue #14).
const DRONE_IMG = "/assets/images/drone-survey.webp";

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

export function Methodology() {
  const methodoParallax = useParallax(0.2);

  return (
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
  );
}
