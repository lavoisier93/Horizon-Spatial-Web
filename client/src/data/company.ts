/**
 * HORIZON SPATIAL — Source unique de vérité (entreprise).
 *
 * Toute donnée corporate (nom, slogan, contact, RCCM, social, logos) doit
 * être lue depuis ce fichier. Aucune chaîne en dur dans les composants.
 *
 * Si une valeur change ici, elle se propage à tout le site.
 */

export interface CompanyInfo {
  legalName: string;
  brandName: string;
  shortName: string;
  legalForm: string;
  capital: string;
  rccm: string;
  slogan: string;
  internationalSignature: string;
  tagline: string;
  description: string;
}

export interface CompanyContact {
  emailPro: string;
  /** Numéro principal au format affichage. */
  phonePrimary: string;
  /** Numéro secondaire au format affichage. */
  phoneSecondary?: string;
  /** WhatsApp au format international sans `+`, prêt pour wa.me. */
  whatsappE164: string;
  websiteUrl: string;
  websiteDisplay: string;
  /** Horaires d'ouverture en français. */
  hours: readonly string[];
}

export interface CompanyAddress {
  district: string;
  city: string;
  country: string;
  full: string;
  geo: { lat: number; lng: number };
}

export interface CompanySocial {
  linkedin: string;
  facebook: string;
}

export interface CompanyAssets {
  /** Logo monochrome blanc (sur fonds sombres). */
  logoWhite: string;
  /** Logo couleur (sur fonds clairs). */
  logoColor: string;
  /** Portrait du fondateur. */
  founderPortrait: string;
  /** Photo de groupe O.N.U.C.I. */
  onuciCeremony: string;
  /** Motif topographique utilisé en filigrane de fond sur plusieurs sections. */
  topoPattern: string;
}

/* -------------------------------------------------------------------------- */
/* IDENTITÉ                                                                   */
/* -------------------------------------------------------------------------- */

export const company: CompanyInfo = {
  legalName: "HORIZON SPATIAL",
  brandName: "HORIZON SPATIAL",
  shortName: "H-SPATIAL",
  legalForm: "SARL",
  capital: "1 000 000 FCFA",
  rccm: "CI-ABJ-03-2026-B13-00264",
  slogan: "Voir plus loin, bâtir mieux",
  internationalSignature: "H-SPATIAL | Spatial Intelligence for Africa",
  tagline: "Bureau d'Études d'Urbaniste Agréé & Géomatique",
  description:
    "Bureau d'études ivoirien combinant urbanisme et géomatique avancée, pour des projets d'aménagement conformes, optimisés et innovants.",
};

/* -------------------------------------------------------------------------- */
/* CONTACT                                                                    */
/* -------------------------------------------------------------------------- */

export const contact: CompanyContact = {
  emailPro: "contact@horizonspatial.ci",
  phonePrimary: "+225 01 43 43 05 05",
  phoneSecondary: "+225 27 22 25 60 38",
  whatsappE164: "2250143430505",
  websiteUrl: "https://www.horizonspatial.ci",
  websiteDisplay: "www.horizonspatial.ci",
  hours: ["Lun – Ven : 8h – 18h", "Sam : 9h – 13h"],
};

/* -------------------------------------------------------------------------- */
/* ADRESSE                                                                    */
/* -------------------------------------------------------------------------- */

export const address: CompanyAddress = {
  district: "Cocody — Angré CHU, face Base CIE",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  full: "Abidjan — Cocody Angré CHU, Côte d'Ivoire",
  // Coordonnées approximatives Cocody Angré
  geo: { lat: 5.3795, lng: -3.9802 },
};

/* -------------------------------------------------------------------------- */
/* RÉSEAUX SOCIAUX                                                            */
/* -------------------------------------------------------------------------- */

export const social: CompanySocial = {
  // URLs publiques canoniques — pas de paramètres parasites
  // (`?viewAsMember=true` ou `&sk=about` cassent l'expérience d'un visiteur).
  linkedin: "https://www.linkedin.com/company/horizon-spatial/",
  facebook: "https://www.facebook.com/profile.php?id=100091959134098",
};

/* -------------------------------------------------------------------------- */
/* ASSETS (logos et photos)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Assets media — chemins locaux dans `client/public/assets/images/`.
 * Tous les logos et photos sont désormais en local (plus aucune dépendance CDN tiers).
 */
export const assets: CompanyAssets = {
  logoWhite: "/assets/images/logo-white.svg",
  logoColor: "/assets/images/logo-color.svg",
  founderPortrait: "/assets/images/lavoisier.jpg",
  onuciCeremony: "/assets/images/onuci-ceremony.webp",
  topoPattern: "/assets/images/topo-pattern.webp",
};

/* -------------------------------------------------------------------------- */
/* AGRÉMENTS / AFFILIATIONS                                                   */
/* -------------------------------------------------------------------------- */

export const credentials = {
  onuciLabel: "Membre du Conseil O.N.U.C.I.",
  onuciFull: "Ordre National des Urbanistes de Côte d'Ivoire",
} as const;

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

/** Construit un lien wa.me prêt à l'emploi avec un message optionnel. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${contact.whatsappE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Construit un lien mailto: avec un sujet/corps optionnels. */
export function buildMailtoUrl(opts?: {
  subject?: string;
  body?: string;
}): string {
  const params = new URLSearchParams();
  if (opts?.subject) params.set("subject", opts.subject);
  if (opts?.body) params.set("body", opts.body);
  const qs = params.toString();
  return `mailto:${contact.emailPro}${qs ? `?${qs}` : ""}`;
}
