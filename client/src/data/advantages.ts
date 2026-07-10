import { Clock, Cuboid, FileCheck, Layers, Shield, Users } from "lucide-react";
import type { ElementType } from "react";

export interface AdvantageItem {
  icon: ElementType;
  title: string;
  desc: string;
  accent: string;
}

export const advantages: AdvantageItem[] = [
  { icon: Shield, title: "Conformité Légale Garantie", desc: "Urbaniste Agréé inscrit à l'O.N.U.C.I., seule habilitation reconnue par la loi pour concevoir vos lotissements.", accent: "#0047AB" },
  { icon: Layers, title: "Double Expertise Unique", desc: "Seul bureau ivoirien combinant urbanisme certifié ET géomatique avancée (SIG, drone, GPS de précision).", accent: "#00A86B" },
  { icon: Clock, title: "Gain de Temps", desc: "Processus rodé et outils numériques performants pour des délais de livraison optimisés.", accent: "#0047AB" },
  { icon: Users, title: "Accompagnement Complet", desc: "De l'étude préliminaire à l'approbation ministérielle, un interlocuteur unique pour votre projet.", accent: "#00A86B" },
  { icon: FileCheck, title: "Tarification Compétitive", desc: "Des honoraires justes et transparents, adaptés à la taille de votre projet. Devis gratuit.", accent: "#0047AB" },
  { icon: Cuboid, title: "Valeur Ajoutée Commerciale", desc: "Maquettes 3D, plans de vente professionnels et supports visuels pour accélérer vos ventes.", accent: "#00A86B" },
];
