import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { useState } from "react";
import { LazyImage } from "../../components/LazyImage";
import { galleryItems } from "../../data/gallery";

const poppins = { fontFamily: "'Poppins', sans-serif" };

export function ProjectGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {galleryItems.map((item, i) => (
          <div
            key={item.title}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
              activeIdx === i ? "ring-2 ring-[#0047AB] shadow-xl shadow-[#0047AB]/10" : "hover:shadow-lg"
            }`}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => setLightbox(i)}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <LazyImage
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-2.5 py-1 bg-[#0047AB]/80 backdrop-blur-sm text-white text-xs font-medium rounded-md mb-3" style={poppins}>
                {item.tag}
              </span>
              <h4 className="text-white font-bold text-lg mb-1" style={poppins}>{item.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length); }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryItems.length); }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightbox].img}
              alt={galleryItems[lightbox].title}
              className="w-full rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h4 className="text-white font-bold text-xl" style={poppins}>{galleryItems[lightbox].title}</h4>
              <p className="text-white/60 text-sm mt-1">{galleryItems[lightbox].desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
