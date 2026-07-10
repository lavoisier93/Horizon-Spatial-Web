/**
 * Page 404 — H-Spatial
 * Route /404 + fallback wouter (page introuvable).
 * Charte H-Spatial : #0047AB primaire, #00A86B accent, Poppins titres.
 */

import { Link } from "wouter";
import { ArrowLeft, MapPinOff } from "lucide-react";
import { company } from "@/data/company";

const poppins = { fontFamily: "'Poppins', sans-serif" };

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-lg w-full text-center">
        <div
          aria-hidden
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#0047AB]/10 mb-6"
        >
          <MapPinOff className="w-10 h-10 text-[#0047AB]" />
        </div>

        <p
          className="text-xs uppercase tracking-wider text-[#0047AB] font-semibold mb-3"
          style={poppins}
        >
          Erreur 404
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-[#0A1628] mb-4"
          style={poppins}
        >
          Page introuvable
        </h1>
        <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée. Revenez à
          l'accueil pour reprendre votre exploration des services
          d'{company.brandName}.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0047AB] hover:bg-[#003580] text-white font-semibold text-sm shadow-lg shadow-[#0047AB]/20 transition-all"
            style={poppins}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Retour à l'accueil
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#0047AB]/20 text-[#0047AB] hover:bg-[#0047AB]/5 font-semibold text-sm transition-all"
            style={poppins}
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
