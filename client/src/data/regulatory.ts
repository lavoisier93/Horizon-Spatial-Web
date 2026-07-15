export interface RegulatoryArticle {
  num: string;
  text: string;
}

export const articles: RegulatoryArticle[] = [
  { num: "Article 61", text: "Les opérations d'urbanisme sont initiées conformément aux prescriptions du schéma directeur d'urbanisme, des plans d'urbanisme directeur, des schémas de structure et des plans d'urbanisme de détail." },
  { num: "Article 76", text: "Les projets d'aménagement sont dressés par un urbaniste agréé et inscrit à l'Ordre national des urbanistes de Côte d'Ivoire." },
  { num: "Article 282", text: "L'exercice illégal est passible de peines allant jusqu'à 2 ans d'emprisonnement et 20 000 000 FCFA d'amende." },
];

export const risks: string[] = [
  "Refus d'approbation du lotissement par le Ministère",
  "Poursuites pénales pour exercice illégal",
  "Annulation rétroactive des titres fonciers",
  "Litiges fonciers coûteux avec les acquéreurs",
  "Atteinte grave à votre réputation professionnelle",
];
