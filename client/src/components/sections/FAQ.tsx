import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "../../components/Reveal";
import { faqItems } from "../../data/faq";

const poppins = { fontFamily: "'Poppins', sans-serif" };

function FAQSection({ isDark }: { isDark: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqItems.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 ${
              isDark
                ? `border-white/10 ${isOpen ? "bg-white/5" : "bg-white/[0.02] hover:bg-white/5"}`
                : `border-gray-200 ${isOpen ? "bg-[#0047AB]/5 border-[#0047AB]/20" : "bg-white hover:bg-gray-50"}`
            }`}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              className="w-full flex items-start gap-4 p-5 text-left"
            >
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isOpen
                  ? "bg-[#0047AB] text-white"
                  : isDark ? "bg-white/10 text-white/60" : "bg-[#0047AB]/10 text-[#0047AB]"
              }`}>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
              <span className={`font-semibold text-sm md:text-base leading-snug ${
                isDark ? "text-white" : "text-[#0A1628]"
              }`} style={poppins}>
                {item.q}
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              aria-hidden={!isOpen}
              className="faq-answer"
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className={`px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed ${
                isDark ? "text-white/60" : "text-[#4A5568]"
              }`}>
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQ({ isDark }: { isDark: boolean }) {
  return (
    <section id="faq" className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0F1D32]" : "bg-white"}`}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Questions Fréquentes</span>
              <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? "text-white" : "text-[#0A1628]"}`} style={poppins}>
              Vos <span className="text-[#0047AB]">questions</span>, nos réponses
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? "text-white/60" : "text-[#4A5568]"}`}>
              Retrouvez les réponses aux questions les plus fréquemment posées par les aménageurs fonciers et promoteurs immobiliers.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <FAQSection isDark={isDark} />
        </Reveal>
      </div>
    </section>
  );
}
