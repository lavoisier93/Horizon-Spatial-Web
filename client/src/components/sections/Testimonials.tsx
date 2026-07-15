import { CheckCircle2, Quote, Star } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { references, testimonials } from "../../data/testimonials";

const poppins = { fontFamily: "'Poppins', sans-serif" };

export function Testimonials({ isDark }: { isDark: boolean }) {
  return (
    <section id="references" className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-[#F8FAFC]"}`}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
              <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Références & Témoignages</span>
              <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
              Ils nous font{" "}
              <span className="text-[#0047AB]">confiance</span>
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
              Des projets réalisés avec succès et des partenaires satisfaits à travers la Côte d'Ivoire.
            </p>
          </div>
        </Reveal>

        {/* Références projets */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {references.map((ref, i) => (
            <Reveal key={ref.type} delay={i * 100}>
              <div className={`rounded-2xl border overflow-hidden transition-all duration-500 h-full ${isDark ? "bg-white/5 border-white/10 hover:bg-white/[0.08]" : "bg-white border-[#E2E8F0] hover:shadow-xl hover:shadow-[#0047AB]/5"}`}>
                <div className="bg-[#0047AB] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <ref.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm" style={poppins}>{ref.type}</h3>
                      <p className="text-white/60 text-xs">{ref.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <div className="text-white font-bold text-lg" style={poppins}>{ref.surface}</div>
                      <div className="text-white/50 text-xs">Surface</div>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-2">
                      <div className="text-[#00A86B] font-bold text-lg" style={poppins}>{ref.lots}</div>
                      <div className="text-white/50 text-xs">Lots</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>{ref.details}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
                    <span className="text-xs text-[#00A86B] font-medium">Projet livré avec succès</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Témoignages */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.company} delay={i * 100 + 300}>
              <div className={`rounded-2xl p-8 border h-full relative ${isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E2E8F0]"}`}>
                <div className="absolute top-6 right-6">
                  <Quote className="w-8 h-8 text-[#0047AB]/10" />
                </div>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-6 italic ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
                  "{t.text}"
                </p>
                <div className={`border-t pt-4 ${isDark ? "border-white/10" : "border-[#E2E8F0]"}`}>
                  <div className={`font-bold text-sm ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>{t.name}</div>
                  <div className={`text-xs ${isDark ? "text-white/65" : "text-[#4A5568]"}`}>{t.company}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
