export interface GalleryItem {
  img: string;
  title: string;
  desc: string;
  tag: string;
}

// Images locales (rapatriement issue #14).
const GALLERY_DRONE = "/assets/images/gallery-drone-lotissement.webp";
const GALLERY_PLAN = "/assets/images/gallery-plan-approuve.webp";
const GALLERY_MAQUETTE = "/assets/images/gallery-maquette-3d.webp";

export const galleryItems: GalleryItem[] = [
  {
    img: GALLERY_DRONE,
    title: "Vue aérienne par drone",
    desc: "Photogrammétrie par drone et Cartographie numérique pour un projet de developpement local",
    tag: "Photogrammétrie",
  },
  {
    img: GALLERY_PLAN,
    title: "Projets de lotissement",
    desc: "Plans d'aménagement détaillé, documents graphiques et rapports écrits",
    tag: "Urbanisme",
  },
  {
    img: GALLERY_MAQUETTE,
    title: "Maquette 3D du projet",
    desc: "Rendu 3D photoréaliste d'un projet d'opération immobilière",
    tag: "Modélisation 3D",
  },
];
