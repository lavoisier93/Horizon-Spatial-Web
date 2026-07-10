export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: "Quels sont les délais moyens pour obtenir l'approbation d'un lotissement ?",
    a: "Le délai moyen est de 3 à 6 mois, selon la complexité du projet et la réactivité des services administratifs. Nous optimisons ce délai grâce à notre maîtrise du processus et nos relations avec les services compétents du Ministère.",
  },
  {
    q: "Quels documents dois-je fournir pour démarrer mon projet ?",
    a: "Vous devez fournir : le titre de propriété (ACD, certificat foncier ou lettre d'attribution), un plan de situation du terrain, et une note d'intention décrivant votre projet. Nous vous accompagnons pour constituer le reste du dossier.",
  },
  {
    q: "Combien coûte la conception d'un plan de lotissement ?",
    a: "Les honoraires dépendent de la superficie du terrain, du nombre de lots envisagés et de la complexité du projet. Nous proposons un devis gratuit et détaillé après une première analyse de votre projet. Nos tarifs sont compétitifs et transparents.",
  },
  {
    q: "Pourquoi est-il obligatoire de faire appel à un urbaniste agréé ?",
    a: "Le Code de l'Urbanisme de 2020 (Articles 60, 65 et 76) impose que tout projet de lotissement soit conçu par un urbaniste inscrit à l'O.N.U.C.I. Le non-respect expose à des sanctions pénales pouvant aller jusqu'à 2 ans d'emprisonnement et 50 millions FCFA d'amende.",
  },
  {
    q: "Intervenez-vous en dehors d'Abidjan ?",
    a: "Oui, nous intervenons sur l'ensemble du territoire ivoirien et dans la sous-région ouest-africaine (UEMOA/CEDEAO). Nos équipes se déplacent pour les levés topographiques et les visites de site, où que soit votre terrain.",
  },
  {
    q: "Quelle est la différence entre H-Spatial et un géomètre ?",
    a: "Un géomètre réalise les levés topographiques et le bornage. L'urbaniste conçoit le plan d'aménagement (découpage parcellaire, voiries, équipements). H-Spatial offre les deux compétences : urbanisme agréé O.N.U.C.I. ET géomatique avancée, pour un service intégré.",
  },
];
