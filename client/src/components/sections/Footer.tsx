import { Facebook, Linkedin } from "lucide-react";
import { Link } from "wouter";
import {
  address,
  assets,
  buildWhatsAppUrl,
  company,
  contact,
  credentials,
  social,
} from "../../data/company";

const poppins = { fontFamily: "'Poppins', sans-serif" };

/* ─── SITE FOOTER ─────────────────────────────────────────────────────────
 * Footer 4 colonnes partagé entre Home et About.
 * Issue #13 : Navigation / Services / Contact (+ horaires) / Légal.
 * Toutes les données viennent de company.ts — source unique.
 */
type FooterLink = { label: string; href: string };

const footerNavigation: readonly FooterLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Méthodologie", href: "/#methodologie" },
  { label: "Références", href: "/#references" },
  { label: "Le fondateur", href: "/a-propos" },
  { label: "Contact", href: "/#contact" },
];

const footerServices: readonly FooterLink[] = [
  { label: "Urbanisme & Aménagement", href: "/#services" },
  { label: "SIG & Cartographie", href: "/#services" },
  { label: "Sécurisation Foncière", href: "/#services" },
  { label: "Solutions Numériques", href: "/#services" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0A1628] text-white pt-14 pb-6 print:hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Bande identité */}
        <div className="mb-12 max-w-2xl">
          <img
            src={assets.logoWhite}
            alt={company.shortName}
            width={292}
            height={197}
            className="h-12 w-auto mb-4"
          />
          <p className="text-sm text-white/65 leading-relaxed">
            {company.description}
          </p>
          <p className="mt-3 text-xs italic text-white/50" style={poppins}>
            « {company.slogan} »
          </p>
        </div>

        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Colonne 1 : Navigation */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Navigation
            </h2>
            <ul className="space-y-2 text-sm">
              {footerNavigation.map((link) =>
                link.href.startsWith("/") && !link.href.includes("#") ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Colonne 2 : Services */}
          <nav aria-labelledby="footer-services-heading">
            <h2
              id="footer-services-heading"
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Services
            </h2>
            <ul className="space-y-2 text-sm">
              {footerServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne 3 : Contact */}
          <div>
            <h2
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Contact
            </h2>
            <address className="not-italic space-y-2 text-sm text-white/80">
              <p>{address.full}</p>
              <p>
                <a
                  href={`tel:${contact.phonePrimary.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.phonePrimary}
                </a>
              </p>
              {contact.phoneSecondary && (
                <p className="text-white/65">
                  <a
                    href={`tel:${contact.phoneSecondary.replace(/\s/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {contact.phoneSecondary}
                  </a>
                </p>
              )}
              <p>
                <a
                  href={`mailto:${contact.emailPro}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {contact.emailPro}
                </a>
              </p>
              <p>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </p>
            </address>
            <div
              className="mt-4 pt-4 border-t border-white/5 text-xs text-white/65 space-y-1"
              aria-label="Horaires d'ouverture"
            >
              <p
                className="text-[10px] uppercase tracking-wider text-white/45 font-semibold"
                style={poppins}
              >
                Horaires
              </p>
              {contact.hours.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* Colonne 4 : Légal */}
          <div>
            <h2
              className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-4"
              style={poppins}
            >
              Légal
            </h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <span className="block text-[10px] uppercase tracking-wider text-white/45">
                  RCCM
                </span>
                <span>{company.rccm}</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-wider text-white/45">
                  Capital
                </span>
                <span>{company.capital}</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-wider text-white/45">
                  Affiliation
                </span>
                <span>{credentials.onuciFull}</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/politique-de-confidentialite"
                  className="text-white/70 hover:text-white underline transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <span>
            © {currentYear} {company.legalName} — Tous droits réservés
          </span>
          <span style={poppins} className="text-white/45">
            {company.internationalSignature}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${company.brandName} sur LinkedIn`}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0077B5]/30 flex items-center justify-center transition-all"
            >
              <Linkedin className="w-4 h-4" aria-hidden />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${company.brandName} sur Facebook`}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#1877F2]/30 flex items-center justify-center transition-all"
            >
              <Facebook className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
