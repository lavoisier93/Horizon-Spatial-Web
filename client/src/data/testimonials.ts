import { MapPinned, Ruler, TreePine } from "lucide-react";
import type { ElementType } from "react";

export interface ProjectReference {
  type: string;
  location: string;
  surface: string;
  lots: number;
  icon: ElementType;
  details: string;
}

export const references: ProjectReference[] = [
  {
    type: "Aménagement foncier",
    location: "Grand Abidjan",
    surface: "10 Ha",
    lots: 177,
    icon: MapPinned,
    details: "Aménagement complet avec espaces verts, groupes scolaires, aires de jeux et réseau viaire structuré.",
  },
  {
    type: "Lotissement résidentiel",
    location: "Région des Grands Ponts",
    surface: "25 Ha",
    lots: 312,
    icon: TreePine,
    details: "Projet intégrant zones résidentielles, commerciales et équipements publics. Cartographie drone et conception SIG complète.",
  },
  {
    type: "Regularisation urbaine",
    location: "Yamoussoukro",
    surface: "100 Ha",
    lots: +1300,
    icon: Ruler,
    details: "Régularisation foncière et redécoupage parcellaire conforme au SDU. Accompagnement jusqu'à l'approbation ministérielle.",
  },
];

export interface Testimonial {
  name: string;
  company: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Lago Rodolphe",
    company: "GBC Group — Abidjan",
    text: "Horizon Spatial nous a accompagnés de A à Z sur notre projet de lotissement. Leur double expertise urbanisme-géomatique a fait toute la différence. Dossier approuvé du premier coup.",
    rating: 5,
  },
  {
    name: "Alexis Kouamé",
    company: "NetGeo Topo — Abidjan",
    text: "La rigueur technique et la connaissance parfaite du cadre réglementaire ivoirien nous ont permis de gagner un temps considérable. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Promoteur privé (Anonyme)",
    company: "Abidjan",
    text: "Les maquettes 3D et les plans de vente fournis par H-Spatial ont accéléré la commercialisation de nos lots. Un partenaire de confiance.",
    rating: 5,
  },
];
