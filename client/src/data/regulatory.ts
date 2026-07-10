export interface RegulatoryArticle {
  num: string;
  text: string;
}

export const articles: RegulatoryArticle[] = [
  { num: "Article 60", text: "Les lotissements sont conçus exclusivement par les urbanistes inscrits au tableau de l'O.N.U.C.I." },
  { num: "Article 65", text: "L'autorisation de lotir est conditionnée par la présentation d'un plan visé par un urbaniste agréé." },
  { num: "Article 76", text: "L'exercice illégal est passible de peines allant jusqu'à 2 ans d'emprisonnement et 50 000 000 FCFA d'amende." },
];

export const risks: string[] = [
  "Refus d'approbation du lotissement par le Ministère",
  "Poursuites pénales pour exercice illégal",
  "Annulation rétroactive des titres fonciers",
  "Litiges fonciers coûteux avec les acquéreurs",
  "Atteinte grave à votre réputation professionnelle",
];
