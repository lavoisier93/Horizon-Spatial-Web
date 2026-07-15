import { Clock, Cuboid, FileCheck, Layers, Shield, Users } from "lucide-react";
import type { ElementType } from "react";

export interface AdvantageItem {
  icon: ElementType;
  title: string;
  desc: string;
  accent: string;
}

export const advantages: AdvantageItem[] = [
  { icon: Shield, title: "Conformité légale garantie", desc: "Urbaniste Agréé inscrit au tableau de l'Ordre des Urbanistes, seule habilitation reconnue par la loi pour concevoir les projets de lotissements et opérations immobilières.", accent: "#0047AB" },
  { icon: Layers, title: "Double expertise intégrée", desc: "Urbanisme agréé et géomatique avancée (SIG, cartographie par drone, GPS de précision, géo-datavisualisation) réunis dans un même bureau d'études.", accent: "#00A86B" },
  { icon: Clock, title: "Gain de temps", desc: "Processus rodé et outils numériques performants pour des délais de livraison optimisés.", accent: "#0047AB" },
  { icon: Users, title: "Accompagnement complet", desc: "De l'étude préliminaire à l'approbation ministérielle, un interlocuteur unique pour votre projet.", accent: "#00A86B" },
  { icon: FileCheck, title: "Tarification compétitive", desc: "Des honoraires justes et transparents, adaptés à la taille de votre projet. Devis gratuit.", accent: "#0047AB" },
  { icon: Cuboid, title: "Valeur ajoutée commerciale", desc: "Maquettes 3D, plans de vente professionnels et supports visuels pour accélérer vos ventes.", accent: "#00A86B" },
];
