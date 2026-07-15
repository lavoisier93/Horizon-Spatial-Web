export interface PartnerLogo {
  src: string;
  name: string;
  desc: string;
  url: string;
}

export const institutionalPartners: PartnerLogo[] = [
  { src: "/assets/images/logo-mclu.png", name: "MCLU", desc: "Ministère de la Construction", url: "https://construction.gouv.ci" },
  { src: "/assets/images/logo-geometres.png", name: "OGE-CI", desc: "Ordre des Géomètres-Experts", url: "https://www.geometres-experts.ci" },
  { src: "/assets/images/logo-oaci.jpg", name: "OACI", desc: "Ordre des Architectes", url: "https://www.oaci.ci" },
  { src: "/assets/images/logo-bnetd.jpg", name: "BNETD", desc: "Bureau National d'Études", url: "https://www.bnetd.ci" },
  { src: "/assets/images/logo-district.jpg", name: "District d'Abidjan", desc: "District Autonome", url: "https://www.abidjan.district.ci" },
  { src: "/assets/images/logo-cnouci.png", name: "O.N.U.C.I.", desc: "Ordre National des Urbanistes", url: "https://www.onuci.org" },
];

export const technicalPartners: PartnerLogo[] = [
  { src: "/assets/images/logo-ignfi.jpg", name: "IGN FI", desc: "Ingénierie Géospatiale", url: "https://www.ignfi.fr" },
  { src: "/assets/images/logo-geofit.png", name: "GeoFIT", desc: "Géomatique & Topographie", url: "https://www.geofit.fr" },
  { src: "/assets/images/logo-afor.png", name: "AFOR", desc: "Agence Foncière Rurale", url: "https://www.afor.ci" },
  // TODO(CETIF) : confirmer la description et l'URL officielle.
  { src: "/assets/images/logo-cetif.jpg", name: "CETIF", desc: "Partenaire technique", url: "#" },
];
