import { LazyImage } from "../../components/LazyImage";
import { Reveal } from "../../components/Reveal";
import { assets } from "../../data/company";
import { institutionalPartners, technicalPartners } from "../../data/partners";

const poppins = { fontFamily: "'Poppins', sans-serif" };

export function Partners({ isDark }: { isDark: boolean }) {
  return (
    <section id="partenaires" className={`py-20 lg:py-24 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0A1628]" : "bg-[#F8FAFC]"}`}>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url(${assets.topoPattern})`, backgroundSize: "cover" }} />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Écosystème</span>
              <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
              Nos <span className="text-[#0047AB]">partenaires</span> institutionnels
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
              H-Spatial évolue au sein d'un réseau solide d'institutions publiques et de partenaires techniques de référence en Côte d'Ivoire et à l'international.
            </p>
          </div>
        </Reveal>

        {/* Grille de logos - Institutions publiques */}
        <Reveal delay={100}>
          <div className="mb-12">
            <h3 className={`text-center text-sm font-semibold uppercase tracking-widest mb-8 ${isDark ? "text-white/40" : "text-[#4A5568]/60"}`} style={poppins}>Institutions & Ordres Professionnels</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {institutionalPartners.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer no-underline ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      : "bg-white border-gray-200 hover:border-[#0047AB]/30 hover:shadow-[#0047AB]/10"
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center mb-3 rounded-lg overflow-hidden">
                    <LazyImage src={p.src} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className={`text-xs font-bold text-center ${isDark ? "text-white/80" : "text-[#0A1628]"}`} style={poppins}>{p.name}</span>
                  <span className={`text-[10px] text-center mt-0.5 ${isDark ? "text-white/40" : "text-[#4A5568]/70"}`}>{p.desc}</span>
                  <span className="text-[9px] text-[#0047AB] opacity-0 group-hover:opacity-100 transition-opacity mt-1">Visiter le site &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Grille de logos - Partenaires techniques */}
        <Reveal delay={200}>
          <div>
            <h3 className={`text-center text-sm font-semibold uppercase tracking-widest mb-8 ${isDark ? "text-white/40" : "text-[#4A5568]/60"}`} style={poppins}>Partenaires Techniques & Fonciers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technicalPartners.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer no-underline ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      : "bg-white border-gray-200 hover:border-[#00A86B]/30 hover:shadow-[#00A86B]/10"
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center mb-3 rounded-lg overflow-hidden">
                    <LazyImage src={p.src} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className={`text-xs font-bold text-center ${isDark ? "text-white/80" : "text-[#0A1628]"}`} style={poppins}>{p.name}</span>
                  <span className={`text-[10px] text-center mt-0.5 ${isDark ? "text-white/40" : "text-[#4A5568]/70"}`}>{p.desc}</span>
                  <span className="text-[9px] text-[#00A86B] opacity-0 group-hover:opacity-100 transition-opacity mt-1">Visiter le site &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Bandeau de confiance */}
        <Reveal delay={300}>
          <div className={`mt-16 text-center p-8 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}>
            <p className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
              Un réseau de <span className="text-[#0047AB] font-bold">9 partenaires</span> institutionnels et techniques
            </p>
            <p className={`text-sm ${isDark ? "text-white/50" : "text-[#4A5568]"}`}>
              H-Spatial collabore avec les acteurs majeurs du foncier, de l'urbanisme et de la géomatique en Côte d'Ivoire et en Afrique de l'Ouest.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
