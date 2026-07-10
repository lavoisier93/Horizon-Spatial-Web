import { Cuboid, FolderCheck, Handshake, PenTool, Plane, Target } from "lucide-react";
import type { ElementType } from "react";

export interface ServiceItem {
  icon: ElementType;
  title: string;
  desc: string;
  color: string;
  deliverables: string[];
  duration: string;
  tools: string;
}

export const services: ServiceItem[] = [
  {
    icon: Target, title: "Étude de Faisabilité",
    desc: "Analyse du site, situation foncière, conformité avec les documents d'urbanisme (SDU, PUD), évaluation des contraintes techniques et réglementaires.",
    color: "#0047AB",
    deliverables: ["Rapport de faisabilité", "Cartographie du site", "Note de conformité"],
    duration: "2 à 3 semaines",
    tools: "QGIS, AutoCAD, GPS",
  },
  {
    icon: Plane, title: "Cartographie par Drone",
    desc: "Acquisition de données précises via photogrammétrie par drone : orthophotographies et Modèles Numériques de Terrain (MNT).",
    color: "#00A86B",
    deliverables: ["Orthophoto HD", "MNT/MNS", "Nuage de points 3D"],
    duration: "1 à 2 semaines",
    tools: "DJI Phantom, Pix4D, Agisoft",
  },
  {
    icon: PenTool, title: "Conception du Plan",
    desc: "Découpage parcellaire optimisé, tracé des voiries, réservations pour équipements et espaces verts, conformité aux ratios réglementaires.",
    color: "#0047AB",
    deliverables: ["Plan de lotissement", "Tableau des surfaces", "Notice descriptive"],
    duration: "3 à 4 semaines",
    tools: "AutoCAD, QGIS, SketchUp",
  },
  {
    icon: FolderCheck, title: "Dossier Technique",
    desc: "Préparation complète du dossier d'approbation : plans techniques (AutoCAD/QGIS), notice descriptive, programme de viabilisation.",
    color: "#00A86B",
    deliverables: ["Dossier d'approbation", "Plans techniques", "Programme VRD"],
    duration: "2 à 3 semaines",
    tools: "AutoCAD, Word, Excel",
  },
  {
    icon: Handshake, title: "Suivi d'Approbation",
    desc: "Accompagnement auprès du Ministère de la Construction. Gestion des échanges et corrections jusqu'à l'obtention de l'arrêté.",
    color: "#0047AB",
    deliverables: ["Arrêté d'approbation", "PV de conformité", "Suivi administratif"],
    duration: "4 à 8 semaines",
    tools: "Suivi ministériel dédié",
  },
  {
    icon: Cuboid, title: "Maquette 3D & Vente",
    desc: "Modélisation 3D du lotissement, visuels professionnels et plans de vente pour accélérer la commercialisation de vos lots.",
    color: "#00A86B",
    deliverables: ["Maquette 3D interactive", "Visuels HD", "Plans de vente"],
    duration: "2 à 3 semaines",
    tools: "SketchUp, Lumion, Photoshop",
  },
];
