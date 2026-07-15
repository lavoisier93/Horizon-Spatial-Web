import { AlertTriangle, ArrowRight, CheckCircle2, Scale } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { assets } from "../../data/company";
import { articles, risks } from "../../data/regulatory";

const poppins = { fontFamily: "'Poppins', sans-serif" };

export function RegulatoryFrame({ isDark }: { isDark: boolean }) {
  return (
    <section id="reglementation" className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0F1D32]" : "bg-white"}`}>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url(${assets.topoPattern})`, backgroundSize: "cover" }} />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
              <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Cadre Réglementaire</span>
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
              Pourquoi faire appel à un{" "}
              <span className="text-[#0047AB]">Urbaniste Agréé</span> ?
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
              Depuis la loi n° 2020-624 du 14 août 2020 instituant le Code de l'urbanisme et du
              domaine foncier urbain, tout projet de lotissement en Côte d'Ivoire doit être réalisé
              par un urbaniste inscrit à l'Ordre National des Urbanistes de Côte d'Ivoire (O.N.U.C.I.).
              Le non-respect de cette obligation expose à des sanctions pénales lourdes.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal delay={100}>
            <div className={`rounded-2xl p-8 border h-full ${isDark ? "bg-white/5 border-white/10" : "bg-[#F8FAFC] border-[#E2E8F0]"}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0047AB]/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-[#0047AB]" />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>Ce que dit la loi</h3>
              </div>
              <div className="space-y-4">
                {articles.map((a) => (
                  <div key={a.num} className={`rounded-xl p-5 border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E2E8F0]"}`}>
                    <div className="text-sm font-bold text-[#0047AB] mb-2" style={poppins}>{a.num}</div>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-6 h-full flex flex-col">
              <div className={`rounded-2xl p-8 border flex-1 ${isDark ? "bg-red-900/20 border-red-800/30" : "bg-red-50 border-red-100"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>Les risques concrets</h3>
                </div>
                <div className="space-y-3">
                  {risks.map((r) => (
                    <div key={r} className={`flex items-start gap-3 rounded-lg p-3 border ${isDark ? "bg-red-900/10 border-red-800/20" : "bg-white/60 border-red-100/50"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isDark ? "bg-red-900/30" : "bg-red-100"}`}>
                        <span className="text-red-600 text-xs font-bold">!</span>
                      </div>
                      <p className={`text-sm ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>{r}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0047AB] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#00A86B]" />
                  <h3 className="text-lg font-bold" style={poppins}>Votre garantie de conformité</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Horizon Spatial est un bureau d'études d'Urbanisme Agréé et de Géomatique.
                  Nous garantissons la conformité légale complète de vos projets
                  de lotissement, de la conception à l'approbation.
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00A86B] hover:bg-[#009960] text-[#0A1628] text-sm font-semibold transition-colors duration-300"
                  style={poppins}
                >
                  Vérifier la conformité de mon projet
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
