export interface MethodologyStep {
  title: string;
  desc: string;
}

export const steps: MethodologyStep[] = [
  { title: "Prise de contact", desc: "Réunion de cadrage, analyse de vos besoins, visite du site, évaluation préliminaire de faisabilité." },
  { title: "Proposition technique", desc: "Offre technique et financière détaillée, méthodologie, planning prévisionnel, équipe dédiée." },
  { title: "Analyse de terrain", desc: "Acquisition et analyse des données géospatiales par photogrammétrie drone sur site." },
  { title: "Conception", desc: "Élaboration du plan de lotissement, calcul des surfaces et ratios réglementaires." },
  { title: "Validation avec vous", desc: "Présentation du projet, ajustements selon vos retours, finalisation des plans techniques." },
  { title: "Dépôt du dossier", desc: "Constitution et dépôt du dossier complet auprès du Ministère de la Construction." },
  { title: "Approbation", desc: "Suivi de la procédure, gestion des observations, obtention de l'arrêté d'approbation." },
];
