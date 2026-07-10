export interface GalleryItem {
  img: string;
  title: string;
  desc: string;
  tag: string;
}

// Images locales (rapatriement issue #14).
const GALLERY_DRONE = "/assets/images/gallery-drone-lotissement.jpg";
const GALLERY_PLAN = "/assets/images/gallery-plan-approuve.jpg";
const GALLERY_MAQUETTE = "/assets/images/gallery-maquette-3d.jpg";

export const galleryItems: GalleryItem[] = [
  {
    img: GALLERY_DRONE,
    title: "Vue aérienne par drone",
    desc: "Levé topographique et photogrammétrie par drone pour un lotissement résidentiel de 15 hectares",
    tag: "Photogrammétrie",
  },
  {
    img: GALLERY_PLAN,
    title: "Plan de lotissement approuvé",
    desc: "Plan d'aménagement détaillé avec tampons officiels, soumis au MCLU pour approbation",
    tag: "Urbanisme",
  },
  {
    img: GALLERY_MAQUETTE,
    title: "Maquette 3D du projet",
    desc: "Rendu 3D photoréaliste d'un projet de lotissement mixte avec équipements et espaces verts",
    tag: "Modélisation 3D",
  },
];
