import { ArrowRight, BadgeCheck, Building2, CheckCircle2, MapPin } from "lucide-react";
import { Link } from "wouter";
import { LazyImage } from "../../components/LazyImage";
import { Reveal } from "../../components/Reveal";
import { assets, credentials } from "../../data/company";
import { poleGeomatique, poleUrbanisme } from "../../data/expertise";
import { founder } from "../../data/founder";
import { useParallax } from "../../hooks/useParallax";

const poppins = { fontFamily: "'Poppins', sans-serif" };

export function DoubleExpertise() {
  const expertiseParallax = useParallax(0.2);

  return (
    <section className="py-20 lg:py-28 bg-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-[-10%] opacity-5 will-change-transform" ref={expertiseParallax}>
        <LazyImage src={assets.topoPattern} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Votre Partenaire</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={poppins}>
              Une double expertise{" "}
              <span className="text-[#00A86B]">unique</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Horizon Spatial est le seul bureau d'études ivoirien combinant l'urbanisme certifié
              et la géomatique avancée, pour des projets d'aménagement conformes, optimisés et innovants.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal delay={100} className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-full overflow-hidden">
              {/* Photo de groupe O.N.U.C.I. en arrière-plan */}
              <div className="relative h-36 overflow-hidden">
                <LazyImage src={assets.onuciCeremony} alt="Cérémonie O.N.U.C.I." className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1628]" />
              </div>
              {/* Portrait circulaire */}
              <div className="flex flex-col items-center text-center px-8 pb-8 -mt-14 relative z-10">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00A86B]/40 mb-5 shadow-xl shadow-black/30 ring-2 ring-white/10">
                  <LazyImage src={assets.founderPortrait} alt="Lavoisier Ousmane" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1" style={poppins}>{founder.fullName}</h3>
                <p className="text-[#00A86B] text-sm font-medium mb-4">{founder.shortRole}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {founder.bioShort}
                </p>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A86B]/10 border border-[#00A86B]/20 text-[#00A86B] text-xs font-medium"
                  title={credentials.onuciFull}
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {credentials.onuciLabel}
                </span>

                <Link
                  href="/a-propos"
                  aria-label="En savoir plus sur Lavoisier Ousmane, fondateur d'Horizon Spatial"
                  className="mt-6 group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-[#00A86B] hover:bg-[#009960] text-white text-sm font-semibold shadow-lg shadow-[#00A86B]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#00A86B]/30 hover:-translate-y-0.5"
                  style={poppins}
                >
                  Cliquer ICI pour en savoir Plus
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            <Reveal delay={200}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-[#0047AB]" />
                  <span className="text-[#0047AB] font-semibold text-xs uppercase tracking-wider" style={poppins}>Pôle Urbanisme</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-6" style={poppins}>Conformité & Conception</h3>
                <ul className="space-y-3">
                  {poleUrbanisme.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[#00A86B]" />
                  <span className="text-[#00A86B] font-semibold text-xs uppercase tracking-wider" style={poppins}>Pôle Géomatique</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-6" style={poppins}>Optimisation & Technologie</h3>
                <ul className="space-y-3">
                  {poleGeomatique.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
