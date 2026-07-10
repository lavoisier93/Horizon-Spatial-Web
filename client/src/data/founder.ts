/**
 * Données du fondateur d'HORIZON SPATIAL.
 *
 * Source unique pour Home (carte fondateur) et page /a-propos.
 * Réutilise `company.ts` pour tout ce qui est corporate (email pro, WhatsApp,
 * réseaux sociaux, photo). Le fondateur n'a PAS de coordonnées personnelles
 * publiques distinctes — le canal officiel est celui d'Horizon Spatial.
 */

import type { LucideIcon } from "lucide-react";
import {
  Award,
  Briefcase,
  Building2,
  CalendarClock,
  Database,
  Globe,
  GraduationCap,
  MapPin,
  PenTool,
  Shield,
  Trophy,
  Users, 
} from "lucide-react";

import { assets, contact, social } from "./company";

export interface FounderProfile {
  fullName: string;
  shortName: string;
  /** Rôle court (cohérent avec la carte d'accueil). */
  shortRole: string;
  /** Rôle complet pour le hero de la page À propos. */
  longRole: string;
  taglineCorporate: string;
  /** Bio paragraphes — ton corporate, 3e personne. */
  bio: readonly string[];
  /** Bio courte (1-2 phrases) — réutilisée sur la carte d'accueil. */
  bioShort: string;
  yearsOfExperience: number;
  photo: {
    src: string;
    alt: string;
    fallbackInitials: string;
  };
  /** Canaux officiels — tous corporate. */
  channels: {
    emailPro: string;
    whatsappE164: string;
    linkedin: string;
    facebook: string;
  };
  cvUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  description: string;
  tools: readonly string[];
  icon: LucideIcon;
  /** Accent couleur — limité aux 2 couleurs de marque (charte H-Spatial). */
  accent: "primary" | "secondary";
}

export interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface TimelineTab {
  id: "education" | "experience" | "achievements" | "certifications";
  label: string;
  icon: LucideIcon;
  items: readonly TimelineItem[];
}

export interface KeyStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

/* -------------------------------------------------------------------------- */
/* PROFIL                                                                     */
/* -------------------------------------------------------------------------- */

const YEARS_OF_EXPERIENCE = 8;

export const founder: FounderProfile = {
  fullName: "Lavoisier Ousmane",
  shortName: "Lavoisier Ousmane",
  shortRole: "Urbaniste & Expert SIG",
  longRole: "Urbaniste-Géomaticien — Fondateur d'Horizon Spatial",
  taglineCorporate:
    "Expert en sécurisation foncière, planification urbaine et solutions numériques territoriales.",
  bio: [
    "Lavoisier Ousmane est le fondateur d'Horizon Spatial. Urbaniste Agréé et Géomaticien, il est titulaire de plusieurs diplômes de niveau Master en Urbanisme, Géomatique et Analyse de Données obtenus au Togo, en France et au Maroc.",
    `Depuis plus de ${YEARS_OF_EXPERIENCE} années, il accompagne collectivités territoriales, bureaux d'études, investisseurs et organisations de développement dans la conception, la planification et la mise en œuvre de projets territoriaux. Il intervient également auprès des promoteurs et des particuliers pour leurs opérations de lotissement et de sécurisation foncière.`,
    "Son approche allie rigueur scientifique, analyse spatiale et connaissance approfondie du contexte ouest-africain, pour proposer des stratégies territoriales durables, ancrées dans les réalités locales et alignées sur les meilleures pratiques internationales.",
  ],
  bioShort: `Fondateur d'Horizon Spatial, Urbaniste Agréé inscrit au Tableau National de l'Ordre des Urbanistes de Côte d'Ivoire avec plus de ${YEARS_OF_EXPERIENCE} années d'expérience en aménagement du territoire et géomatique.`,
  yearsOfExperience: YEARS_OF_EXPERIENCE,
  photo: {
    src: assets.founderPortrait,
    alt: "Lavoisier Ousmane, fondateur d'Horizon Spatial",
    fallbackInitials: "LO",
  },
  channels: {
    emailPro: contact.emailPro,
    whatsappE164: contact.whatsappE164,
    linkedin: social.linkedin,
    facebook: social.facebook,
  },
  // TODO(cv) : déposer le CV dans `client/public/assets/cv-lavoisier-ousmane.pdf`
  // puis remplacer cette ligne par `cvUrl: "/assets/cv-lavoisier-ousmane.pdf"`.
  // Tant que `cvUrl` est `undefined`, le bouton « Télécharger le CV » est masqué.
  cvUrl: "/assets/cv-lavoisier-ousmane.pdf",
};

/* -------------------------------------------------------------------------- */
/* COMPÉTENCES                                                                */
/* -------------------------------------------------------------------------- */

export const skills: readonly Skill[] = [
  {
    id: "urbanisme",
    name: "Urbanisme & Aménagement",
    level: 90,
    description:
      "Planification urbaine, conception de projets d'aménagement et pilotage d'opérations territoriales durables.",
    tools: [
      "SDU / PUD / PUd / PSDL",
      "Plans de lotissement",
      "Études d'impact",
      "Schémas directeurs",
    ],
    icon: PenTool,
    accent: "primary",
  },
  {
    id: "geomatique",
    name: "SIG & Cartographie",
    level: 95,
    description:
      "Maîtrise avancée des systèmes d'information géographique, télédétection et cartographie numérique multi-échelle.",
    tools: ["ArcGIS", "QGIS", "PostGIS", "Drone Deploy", "Leaflet"],
    icon: Database,
    accent: "secondary",
  },
  {
    id: "foncier",
    name: "Sécurisation Foncière",
    level: 85,
    description:
      "Audit, montage de dossiers et stratégie foncière pour sécuriser les droits et valoriser le patrimoine.",
    tools: [
      "Certification foncière",
      "Cadastre",
      "Titres fonciers",
      "Audits fonciers",
    ],
    icon: Shield,
    accent: "primary",
  },
  {
    id: "numerique",
    name: "Solutions Numériques",
    level: 80,
    description:
      "Conception d'outils numériques pour la gestion de données spatiales, l'automatisation et la prise de décision.",
    tools: ["Python", "SQL", "JavaScript", "ETL", "Automatisation"],
    icon: Globe,
    accent: "secondary",
  },
];

/* -------------------------------------------------------------------------- */
/* PARCOURS                                                                   */
/* -------------------------------------------------------------------------- */

const education: readonly TimelineItem[] = [
  {
    year: "2022 – 2023",
    title: "Master en Urbanisme & Aménagement",
    institution: "École d'Urbanisme de Paris (EUP) — France",
    description: "Spécialisation en Maîtrise d'Ouvrage des Projets Urbains.",
  },
  {
    year: "2020 – 2021",
    title: "Mastère Spécialisé en Géomatique",
    institution:
      "AgroParisTech — Maison de la Télédétection, Montpellier — France",
    description:
      "Systèmes d'Informations Localisées pour l'Aménagement des Territoires (SILAT).",
  },
  {
    year: "2012 – 2017",
    title: "Master en Planification & Gestion Urbaine",
    institution:
      "EAMAU — École Africaine des Métiers de l'Architecture et de l'Urbanisme, Lomé — Togo",
    description:
      "Planification urbaine, aménagement du territoire et développement durable.",
  },
  {
    year: "2010 – 2011",
    title: "Baccalauréat Scientifique (Série C)",
    institution:
      "Lycée Moderne de Yopougon Andokoi, Abidjan — Côte d'Ivoire",
    description: "Mathématiques, physique et chimie.",
  },
];

const experience: readonly TimelineItem[] = [
  {
    year: "2025 – Présent",
    title: "Fondateur & Consultant Principal",
    institution: "Horizon Spatial (H-SPATIAL)",
    description:
      "Direction des missions d'urbanisme, de géomatique et de sécurisation foncière pour collectivités, bureaux d'études et investisseurs.",
  },
  {
    year: "2021 – 2024",
    title: "Directeur des Opérations",
    institution: "IGN FI",
    description:
      "Pilotage de projets de Sécurisation foncière Rurale en Côte d'Ivoire.",
  },
  {
    year: "2017 – 2020",
    title: "Chargé de Projets Urbains",
    institution: "3AU - Agence Africaine d'Aménagement et d'Urbanisme",
    description:
      "Pilotage de projets et opérations d'aménagement urbain.",
  },
  {
    year: "2013 – 2014",
    title: "Assistant Technique",
    institution: "Ministère en charge de l'Urbanisme",
    description:
      "Appui aux projets de planification territoriale et de modernisation du cadastre.",
  },
];

const achievements: readonly TimelineItem[] = [
  {
    year: "2023",
    title: "Cartographie drone — +500 hectares",
    institution: "Projet d'aménagement urbain, Abidjan, Yamoussoukro, Toumodi, Adzopé et autres",
    description:
      "Cartographie de haute précision par photogrammétrie aérienne pour des opérations d'aménagement de grande envergure.",
  }

];

const certifications: readonly TimelineItem[] = [
  {
    year: "2025",
    title: "Télépilote professionel de Drone / RPAS",
    institution: "CI Drone Academy",
    description:
      "Certification validant les compétences fondamentales sur l'utilisation de drones en Côte d'Ivoire.",
  },
  {
    year: "2018",
    title: "QGIS Avancé",
    institution: "Coursera",
    description:
      "Maîtrise des fonctions avancées de QGIS pour la cartographie et la gestion de données géospatiales.",
  }

];

export const timeline: readonly TimelineTab[] = [
  { id: "education", label: "Formation", icon: GraduationCap, items: education },
  { id: "experience", label: "Expérience", icon: Briefcase, items: experience },
  {
    id: "achievements",
    label: "Réalisations",
    icon: Trophy,
    items: achievements,
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    items: certifications,
  },
];

/* -------------------------------------------------------------------------- */
/* STATISTIQUES                                                               */
/* -------------------------------------------------------------------------- */

export const founderStats: readonly KeyStat[] = [
  {
    id: "projects",
    value: 25,
    suffix: "+",
    label: "Projets réalisés",
    icon: Building2,
  },
  {
    id: "clients",
    value: 15,
    suffix: "+",
    label: "Clients accompagnés",
    icon: Users,
  },
  {
    id: "years",
    value: YEARS_OF_EXPERIENCE,
    suffix: "+",
    label: "Années d'expérience",
    icon: CalendarClock,
  },
  {
    id: "cities",
    value: +15,
    label: "Villes couvertes en Côte d'Ivoire",
    icon: MapPin,
  },
];
