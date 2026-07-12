# Audit de contenu rédactionnel — Horizon Spatial Web

> Analyse du contenu front-end section par section (page d'accueil).
> Objectif : améliorer la clarté, la crédibilité et la conversion, sans toucher au design.
> Date : 12 juillet 2026

---

## Constats transversaux (à corriger partout)

**1. Affirmations invérifiables et juridiquement risquées.**
« Seul bureau ivoirien combinant urbanisme certifié ET géomatique avancée » apparaît deux fois (DoubleExpertise, Advantages). Une affirmation d'exclusivité invérifiable relève de la publicité trompeuse et est attaquable par un concurrent. Reformuler : « Une double expertise rare en Côte d'Ivoire : urbanisme agréé O.N.U.C.I. et géomatique avancée réunis dans un même bureau d'études. »

**2. Incohérence sur l'offre gratuite.**
Le Hero promet un « devis gratuit », la section Contact promet une « étude de faisabilité gratuite » — or l'étude de faisabilité est un service payant listé plus haut (2 à 3 semaines de travail). Harmoniser partout sur : « premier échange et devis gratuits ».

**3. Casse anglaise sur les titres.**
« Étude de Faisabilité », « Conformité Légale Garantie », « Prise de Contact »… En français, seule la première lettre prend la majuscule : « Étude de faisabilité », « Conformité légale garantie ».

**4. Cible flottante.**
Le Hero s'adresse à 4 audiences (aménageurs, promoteurs, opérateurs, collectivités) mais tout le reste du site ne parle qu'aux aménageurs fonciers. Soit assumer la cible unique, soit élargir les titres de sections (voir ServicesGrid).

**5. CTA intermédiaires absents.**
Entre le Hero et le formulaire final (~10 sections), aucun rappel à l'action. Ajouter un mini-CTA après RegulatoryFrame, Methodology et FAQ.

---

## Section par section

### 1. Hero

| Élément | Actuel | Problème | Proposition |
|---|---|---|---|
| H1 | « Offre de Services *Aménageurs Fonciers* » (typewriter) | Titre de plaquette commerciale, pas de site web. Grammaticalement bancal (préposition manquante : « Offre de Services Promoteurs Immobiliers »). Ne vend aucun bénéfice. | « Votre lotissement **approuvé**, en toute conformité » avec typewriter sur le bénéfice : *approuvé / sécurisé / valorisé / commercialisé*. Ou : « Des lotissements conformes pour les *[cibles]* » si on garde les audiences. |
| Sous-titre | « Conformité légale, expertise technique et accompagnement complet… » | Liste d'attributs génériques, aucun différenciateur. | « De l'étude de faisabilité à l'arrêté d'approbation ministériel : un urbaniste agréé O.N.U.C.I. et la puissance de la géomatique au service de votre projet. » |
| Stats | 8+ ans / 100 % conformité / 2 pôles | « 100 % conformité légale » est invérifiable ; « 2 pôles d'expertise » est un fait interne, pas une preuve. | Remplacer par des preuves clients : hectares aménagés, lots conçus, arrêtés obtenus (données réelles à fournir). Ex. : « 40+ Ha aménagés · 570+ lots conçus · 8+ années d'expérience ». |
| CTA | « Demander un devis gratuit » | Bon. | Garder. |

### 2. RegulatoryFrame (Cadre réglementaire)

Section la plus forte du site (problème → risque → solution). Améliorations :

- **Citer la loi précisément** : « le Code de l'Urbanisme de 2020 » → « la Loi n° 2020-624 du 14 août 2020 portant Code de l'urbanisme et du domaine foncier urbain ». La précision juridique renforce l'autorité (vérifier la référence exacte avant publication).
- **La carte bleue « La Solution » n'a pas de CTA.** C'est le moment de plus forte tension émotionnelle de la page. Ajouter un bouton « Vérifier la conformité de mon projet → #contact ».
- Titre « La Solution » → « Votre garantie de conformité » (plus orienté client).

### 3. DoubleExpertise

- **Bouton « Cliquer ICI pour en savoir Plus »** : anti-pattern majeur (accessibilité, SEO, casse incohérente). → « Découvrir le parcours du fondateur ».
- **Claim « le seul bureau d'études ivoirien »** : voir constat transversal n° 1.
- **Kicker « Votre Partenaire »** ne correspond pas au contenu (expertise + fondateur). → « Qui sommes-nous » ou « Notre expertise ».
- **`data/expertise.ts` : « SDU, PUD, PUd »** — coquille, « PUd » devrait être « PUDé » (plan d'urbanisme de détail, cf. CLAUDE.md).
- La bio courte du fondateur est bonne (agrément + expérience). Ajouter éventuellement une phrase « signature » à la 1re personne pour humaniser : « Chaque parcelle que nous dessinons engage notre responsabilité d'urbaniste. »

### 4. ServicesGrid

- **Titre « Une offre complète pour les Aménageurs Fonciers »** : exclut promoteurs et collectivités ciblés par le Hero. → « Une offre complète, de l'étude à la vente » ou « …pour vos projets fonciers ».
- Les descriptions sont techniques et solides ; livrables + délais + outils = excellent (rare sur ce marché). Deux ajustements :
  - « Suivi d'Approbation » : « Gestion des échanges et corrections jusqu'à l'obtention de l'arrêté » — ajouter le bénéfice : « …pour que vous n'ayez jamais à courir derrière l'administration. »
  - « Maquette 3D & Vente » : préciser le bénéfice mesurable si possible (« des lots qui se vendent plus vite et plus cher »).
- Casse française sur les 6 titres (constat n° 3).

### 5. Methodology

- « Un processus en 7 étapes claires » : bon. **Ajouter la durée totale indicative** pour ancrer l'attente : « …de la prise de contact à l'arrêté d'approbation, en 3 à 6 mois en moyenne » (cohérent avec la FAQ).
- **« Validation Interne »** est ambigu — interne à qui ? → « Validation avec vous » ou « Revue et ajustements client ».
- Optionnel : passer les titres d'étapes en verbes d'action (« Cadrer votre besoin », « Analyser le terrain », « Concevoir le plan »…) pour dynamiser.

### 6. Advantages

- **Seule section sans paragraphe d'introduction** sous le H2. En ajouter un : « Six raisons concrètes de confier votre projet à un bureau d'études qui engage sa responsabilité d'urbaniste agréé. »
- « Gain de Temps » : « délais de livraison optimisés » est creux. Chiffrer : « Des dossiers complets du premier coup : moins d'allers-retours avec le Ministère, des semaines gagnées sur l'approbation. »
- « Double Expertise Unique » : reformuler le « seul bureau » (constat n° 1).
- Icône `FileCheck` sur « Tarification Compétitive » : incohérente — préférer une icône monétaire/balance.

### 7. Testimonials (Références & Témoignages)

**Point faible n° 1 du site en crédibilité.**

- Témoignages 100 % anonymes (« Directeur Général, Groupe de Promotion Immobilière ») + trois notes 5/5 : l'effet est inverse de celui recherché — cela ressemble à des témoignages fabriqués.
- Options par ordre de préférence :
  1. Obtenir l'autorisation d'afficher noms réels + entreprises (même un seul vrai témoignage nommé vaut mieux que trois anonymes) ;
  2. Semi-anonymiser avec substance : « M. K., DG d'un groupe immobilier, Abidjan — projet 177 lots, arrêté obtenu en 4 mois » ;
  3. Convertir la section en **mini études de cas** (problème → intervention → résultat chiffré), format déjà amorcé par les 3 références projets qui, elles, sont excellentes (surfaces, lots, statut d'approbation).
- Supprimer ou varier les notes 5 étoiles si elles ne proviennent pas d'avis vérifiables (Google Business).

### 8. InteractiveMap (Ancrage territorial)

- Texte correct. Renforcer avec du concret : nommer les villes/régions d'intervention effectives (Abidjan, San-Pédro, Bouaké…) dans le paragraphe, pas seulement sur la carte — bon pour le SEO local aussi.
- « Notre expertise couvre les principales zones de développement urbain du pays » : ajouter une preuve (« là où se concentrent 80 % des opérations de lotissement » — à sourcer, sinon supprimer).

### 9. FAQ

Meilleur contenu rédactionnel du site : réponses précises, chiffrées, sourcées (articles de loi). Améliorations :

- **Ajouter 3-4 questions à fort potentiel SEO** : « Qu'est-ce qu'un ACD et comment l'obtenir ? », « Un terrain villageois peut-il être loti ? », « La cartographie par drone est-elle réglementée en Côte d'Ivoire ? », « Combien de lots puis-je créer sur X hectares ? ».
- **Ajouter un CTA de clôture** sous l'accordéon : « Une autre question ? Écrivez-nous, réponse sous 24 h ouvrées. »
- Titre « Vos questions, nos réponses » : correct mais convenu. Alternative : « Tout ce qu'il faut savoir avant de lotir ».

### 10. Partners

- Kicker « Écosystème » : jargon corporate. → « Ils travaillent avec nous » ou « Réseau institutionnel ».
- **Prudence juridique** : afficher des logos de ministères/agences sous le titre « Nos partenaires institutionnels » peut suggérer un partenariat officiel inexistant. Si ce sont des institutions *avec lesquelles* H-Spatial travaille (dépôt de dossiers, agrément), préciser : « Institutions et administrations avec lesquelles nous collaborons au quotidien ». Ne garder « partenaires » que pour les vrais partenariats formalisés.

### 11. ContactSection

- **« Prêt à sécuriser votre prochain lotissement ? »** : excellent titre, garder.
- **« étude de faisabilité gratuite »** : contradiction avec l'offre payante (constat n° 2). → « Contactez-nous dès aujourd'hui : premier échange et devis gratuits, sans engagement. »
- « Notre équipe est à votre disposition » : formule creuse. → « Réponse garantie sous 24 h ouvrées » (si tenable — un engagement de délai convertit mieux que la politesse).
- Formulaire : labels et placeholders bien pensés (superficie, type de projet). Ajouter éventuellement un champ « Localisation du terrain » séparé du message — c'est la première question qu'un urbaniste pose.

### 12. ProjectsGallery

- Descriptions concrètes et bonnes (« 15 hectares », « tampons officiels, soumis au MCLU »). RAS sur le fond.
- Avec 3 items seulement, la section est un peu maigre pour s'appeler « galerie » — l'enrichir au fil des projets ou la fusionner avec les références de Testimonials en attendant.

---

## Priorités recommandées

1. **Corriger les incohérences risquées** (« seul bureau », « étude de faisabilité gratuite », logos « partenaires » institutionnels) — risque juridique et crédibilité.
2. **Réécrire le H1 du Hero** — première impression, premier facteur SEO.
3. **Crédibiliser les témoignages** — noms réels ou études de cas.
4. **Corriger le bouton « Cliquer ICI »** et les casses anglaises — rapide, gros gain de professionnalisme.
5. **Ajouter les CTA intermédiaires** et les questions FAQ SEO.

Toute donnée chiffrée ajoutée (hectares, lots, délais) doit être réelle et vérifiable — règle n° 12 de CLAUDE.md.

---

HORIZON SPATIAL — Bureau d'Études Urbanisme & Géomatique
