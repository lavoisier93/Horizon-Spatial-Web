/**
 * H-Spatial Plaquette Commerciale - Aménageurs Fonciers
 * Design: "Geo-Corporate Luxe" — Corporate Premium Minimalism with geospatial touches
 * Colors: #0047AB (blue), #00A86B (green), #4A5568 (gray), #0A1628 (dark)
 * Fonts: Poppins (headings), Open Sans (body)
 * NO framer-motion — pure CSS animations for reliability
 * 
 * V2: + Formulaire de contact + Témoignages/Références + Bouton PDF
 */

import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Plane,
  FileCheck,
  Building2,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  Scale,
  Target,
  Clock,
  Users,
  BadgeCheck,
  Layers,
  PenTool,
  FolderCheck,
  Handshake,
  Cuboid,
  ArrowRight,
  Download,
  Send,
  Star,
  Quote,
  MapPinned,
  TreePine,
  Ruler,
  User,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// CDN URLs
const LOGO_WHITE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/gvCTmeZaVyxKdIeO.png";
const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-1_1772151147000_na1fn_aGVyby1jb3Zlcg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTFfMTc3MjE1MTE0NzAwMF9uYTFmbl9hR1Z5YnkxamIzWmxjZy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nB-0WTFlA1pfxWkXetc~YxW4cfaXwWCZDuchJvLCLsHq1zlPw-HEoUxCp9Imt1~Xg1S~hslfjw5OgqjJD02u55bHSHOfJC5kVrE5BN6KZ2n4Tiexlyka8sdMVC-ZlY0WnudnB~dt9NZ~8MvkBcsNYoZnVEFIV7g~PaCqprv-AbIxnWZQ8bp7td5r6py~vsZlSeE9I3xBnAuQWeslxidNoHYIA-AWLCVhekI-veYlSUDtSeTS1o8mcj6RcWfCBQnf9UecTVfgQwcHXO5s7ycboy9~Dakmy0g9h~6fvgYO4E0QY6QvwSYFb3MTXZs4S7XClcYbEb2iTubBNwUx~SRntQ__";
const DRONE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-2_1772151154000_na1fn_ZHJvbmUtc3VydmV5.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTJfMTc3MjE1MTE1NDAwMF9uYTFmbl9aSEp2Ym1VdGMzVnlkbVY1LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=X~Y1ltGRPTGMecfHiABxo6PTriOBxBMYCLgpl1gc2YmiilB13hFXpxh0bdx7aon2HqMHjexyItaDdTvEAYG7dxK681x8wLFesMVcwUR8SFzLHpnW9VyODj74rHF4C-8wQOjp282DEhXa~14E0IqshQcz4fNYtXi8-qrERx19y8-977ScVDqQmM98Wx0m5R1FE-tfQR5vbTH7~Fq6AZ1ijoo4P66ckzMVOj1ry0ik7Nh995qkJrIeu078U50A1~bDAF1kRqsVGJ8yfkeMmT06bkaOQVGYECBOcxl~uTleIoAkcW-UiP~IhZ1Tr3mJywx5bn-t3yxxR3pMGznQhNEIdQ__";
const OFFICE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-3_1772151169000_na1fn_dXJiYW5pc3Qtd29yaw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTNfMTc3MjE1MTE2OTAwMF9uYTFmbl9kWEppWVc1cGMzUXRkMjl5YXcuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v5CNvW6mplnS~2gM-~h5UnCNzJbQ~S~sMV0pHw8vQ7plgQ2pw6uDzvazPJTXbd03Qpzi2TFcE9rZvfyux1ZOOLEnW-VXfmcSSCZY-IlHuNsVlExlWGais7ZC7UA04w9fLfDeflx3t5LPt1Arqqb4SSDrgewreygT2xEX4b0CYP1yZpq~sMjkdDYy9wWYRmFvVH7IRsxnkL3O5SdAqomL2NtjuuRrqYvGYlWsGRW17i-4dxZYLvoqdtVKOpECESCJ~TEnQGMWv5N76o3lccICyCJmE600v6OpouQTn-tXI1yTyqleKJqVLqHb8cgnfH5AhGuWkirgW7a8L7SepG0MZA__";
const LEGAL_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-4_1772151146000_na1fn_bGVnYWwtY29tcGxpYW5jZQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTRfMTc3MjE1MTE0NjAwMF9uYTFmbl9iR1ZuWVd3dFkyOXRjR3hwWVc1alpRLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=LcxV98B9g1ksDwQCJGC2hI4YTcTXEZL4sU50AdzJJZEgwMJ~p7MBKxqTBIT2AFCKpms4bsXOaPVfISu7xH5n8QL6N7KqZhMm0kFgHcc3Ha9QO0EGfVRrOkJOCkfJ5VUxNMYH1kf7B7rH7F4oG8pM9idKt7mU9-4xPzgsKudp~du3I1VulDezAUz07scI3JNjsoSnQgQFg5uVmJCrlHx7bSjHX2cPX58ZymNmOcBPjRvkuqk4GIBCA-vCq0kSv95Vupj1sNCN84UHW0u6mi6S5F-rM2AxaBEBpjzRCRiSJHuBLbT~w-9xMYInOPhNlcOyB7rfd5y5DQCWwdDrfOqkpg__";
const TOPO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/4rsTkDsQIii0DgENQepfSU/sandbox/1TrO5oX90s8Qy1dr4Oqoy5-img-5_1772151172000_na1fn_dG9wby1wYXR0ZXJu.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNHJzVGtEc1FJaWkwRGdFTlFlcGZTVS9zYW5kYm94LzFUck81b1g5MHM4UXkxZHI0T3FveTUtaW1nLTVfMTc3MjE1MTE3MjAwMF9uYTFmbl9kRzl3Ynkxd1lYUjBaWEp1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gKwZ1k6Nc2~9wd663cVE51kJSwGyU50QQoDOho9psivHmrU9TCYLLFGJxyVWYSnOk7bZ3hlTI3iVfIPP4fa98FOWPRAx8a1swapmHB59NECN~fzl2oDYqlUAuobu719dB4CIv3tbKhuKcRwDNqp6c~5PaFN35~pus3b7CAIFFYOhClpFpCl~SDqj1KXUsYaA1Wujj7dSdo2tKkjsUSqkjC9rlMZAJ2XRJxzx5rTUPvkjYVNrowEVzuhq2tLKNxIdQ7IzUVcDAfWXCYDEBCW0CTcPVQDs22nmRK9-0fSg14E19UG7rOhQk7RUNgjJ2IAGjzhlb4i01m5Zj~rQ7FJTRw__";
const PLAN_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663216073427/yIyJWJSLuFtsFAez.png";
const LAVOISIER_IMG = "https://media.licdn.com/dms/image/v2/D4E03AQFHCcvtY87wFQ/profile-displayphoto-scale_400_400/B4EZqECF01KcAk-/0/1763151733801?e=1765411200&v=beta&t=hswoEAgTvAsRL6TJTvdm1aTcuhuF9_9cnXzg9PBy19M";

const poppins = { fontFamily: "'Poppins', sans-serif" };

// Intersection Observer hook for fade-in animations
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-element ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────
const articles = [
  { num: "Article 60", text: "Les lotissements sont conçus exclusivement par les urbanistes inscrits au tableau de l'O.N.U.C.I." },
  { num: "Article 65", text: "L'autorisation de lotir est conditionnée par la présentation d'un plan visé par un urbaniste agréé." },
  { num: "Article 76", text: "L'exercice illégal est passible de peines allant jusqu'à 2 ans d'emprisonnement et 50 000 000 FCFA d'amende." },
];

const risks = [
  "Refus d'approbation du lotissement par le Ministère",
  "Poursuites pénales pour exercice illégal",
  "Annulation rétroactive des titres fonciers",
  "Litiges fonciers coûteux avec les acquéreurs",
  "Atteinte grave à votre réputation professionnelle",
];

const services = [
  { icon: Target, title: "Étude de Faisabilité", desc: "Analyse du site, situation foncière, conformité avec les documents d'urbanisme (SDU, PUD), évaluation des contraintes techniques et réglementaires.", color: "#0047AB" },
  { icon: Plane, title: "Cartographie par Drone", desc: "Acquisition de données précises via photogrammétrie par drone : orthophotographies et Modèles Numériques de Terrain (MNT).", color: "#00A86B" },
  { icon: PenTool, title: "Conception du Plan", desc: "Découpage parcellaire optimisé, tracé des voiries, réservations pour équipements et espaces verts, conformité aux ratios réglementaires.", color: "#0047AB" },
  { icon: FolderCheck, title: "Dossier Technique", desc: "Préparation complète du dossier d'approbation : plans techniques (AutoCAD/QGIS), notice descriptive, programme de viabilisation.", color: "#00A86B" },
  { icon: Handshake, title: "Suivi d'Approbation", desc: "Accompagnement auprès du Ministère de la Construction. Gestion des échanges et corrections jusqu'à l'obtention de l'arrêté.", color: "#0047AB" },
  { icon: Cuboid, title: "Maquette 3D & Vente", desc: "Modélisation 3D du lotissement, visuels professionnels et plans de vente pour accélérer la commercialisation de vos lots.", color: "#00A86B" },
];

const steps = [
  { title: "Prise de Contact", desc: "Réunion de cadrage, analyse de vos besoins, visite du site, évaluation préliminaire de faisabilité." },
  { title: "Proposition Technique", desc: "Offre technique et financière détaillée, méthodologie, planning prévisionnel, équipe dédiée." },
  { title: "Analyse de Terrain", desc: "Acquisition et analyse des données géospatiales par photogrammétrie drone sur site." },
  { title: "Conception", desc: "Élaboration du plan de lotissement, calcul des surfaces et ratios réglementaires." },
  { title: "Validation Interne", desc: "Présentation du projet, ajustements selon vos retours, finalisation des plans techniques." },
  { title: "Dépôt du Dossier", desc: "Constitution et dépôt du dossier complet auprès du Ministère de la Construction." },
  { title: "Approbation", desc: "Suivi de la procédure, gestion des observations, obtention de l'arrêté d'approbation." },
];

const advantages = [
  { icon: Shield, title: "Conformité Légale Garantie", desc: "Urbaniste Agréé inscrit à l'O.N.U.C.I., seule habilitation reconnue par la loi pour concevoir vos lotissements.", accent: "#0047AB" },
  { icon: Layers, title: "Double Expertise Unique", desc: "Seul bureau ivoirien combinant urbanisme certifié ET géomatique avancée (SIG, drone, GPS de précision).", accent: "#00A86B" },
  { icon: Clock, title: "Gain de Temps", desc: "Processus rodé et outils numériques performants pour des délais de livraison optimisés.", accent: "#0047AB" },
  { icon: Users, title: "Accompagnement Complet", desc: "De l'étude préliminaire à l'approbation ministérielle, un interlocuteur unique pour votre projet.", accent: "#00A86B" },
  { icon: FileCheck, title: "Tarification Compétitive", desc: "Des honoraires justes et transparents, adaptés à la taille de votre projet. Devis gratuit.", accent: "#0047AB" },
  { icon: Cuboid, title: "Valeur Ajoutée Commerciale", desc: "Maquettes 3D, plans de vente professionnels et supports visuels pour accélérer vos ventes.", accent: "#00A86B" },
];

const poleUrbanisme = [
  "Plans de lotissement & aménagement foncier",
  "Documents d'urbanisme (SDU, PUD, PUd)",
  "Études de faisabilité",
  "Régularisation foncière",
  "Conformité réglementaire",
];

const poleGeomatique = [
  "Cartographie de précision par drone",
  "SIG et bases de données spatiales",
  "Modélisation 3D du terrain (MNT/MNS)",
  "Analyse spatiale avancée",
  "Applications WebSIG Foncier",
];

// ─── TÉMOIGNAGES / RÉFÉRENCES ─────────────────────────
const references = [
  {
    type: "Lotissement résidentiel",
    location: "Grand Abidjan",
    surface: "10 Ha",
    lots: 177,
    icon: MapPinned,
    details: "Aménagement complet avec espaces verts, groupes scolaires, aires de jeux et réseau viaire structuré. Arrêté d'approbation obtenu.",
  },
  {
    type: "Lotissement mixte",
    location: "Région des Grands Ponts",
    surface: "25 Ha",
    lots: 312,
    icon: TreePine,
    details: "Projet intégrant zones résidentielles, commerciales et équipements publics. Cartographie drone et conception SIG complète.",
  },
  {
    type: "Restructuration urbaine",
    location: "Abidjan Sud",
    surface: "5 Ha",
    lots: 89,
    icon: Ruler,
    details: "Régularisation foncière et redécoupage parcellaire conforme au PUD. Accompagnement jusqu'à l'approbation ministérielle.",
  },
];

const testimonials = [
  {
    name: "Directeur Général",
    company: "Groupe de Promotion Immobilière",
    text: "Horizon Spatial nous a accompagnés de A à Z sur notre projet de lotissement. Leur double expertise urbanisme-géomatique a fait toute la différence. Dossier approuvé du premier coup.",
    rating: 5,
  },
  {
    name: "Responsable Foncier",
    company: "Société d'Aménagement",
    text: "La rigueur technique et la connaissance parfaite du cadre réglementaire ivoirien nous ont permis de gagner un temps considérable. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Promoteur Immobilier",
    company: "Investisseur Privé",
    text: "Les maquettes 3D et les plans de vente fournis par H-Spatial ont accéléré la commercialisation de nos lots. Un partenaire de confiance.",
    rating: 5,
  },
];

// ─── PDF DOWNLOAD HANDLER ─────────────────────────────
function handleDownloadPDF() {
  // Print-optimized version of the page
  window.print();
}

// ─── CONTACT FORM COMPONENT ──────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    typeProjet: "",
    superficie: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Construct mailto link with form data
    const subject = encodeURIComponent(`Demande de devis - ${formData.typeProjet || "Projet de lotissement"}`);
    const body = encodeURIComponent(
      `Nom : ${formData.nom}\n` +
      `Email : ${formData.email}\n` +
      `Téléphone : ${formData.telephone}\n` +
      `Type de projet : ${formData.typeProjet}\n` +
      `Superficie estimée : ${formData.superficie}\n\n` +
      `Message :\n${formData.message}\n\n` +
      `---\nEnvoyé depuis la plaquette commerciale H-Spatial`
    );

    window.location.href = `mailto:contact@horizonspatial.ci?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-[#00A86B]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#00A86B]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3" style={poppins}>Demande envoyée !</h3>
        <p className="text-white/60 leading-relaxed mb-6">
          Votre client de messagerie s'est ouvert avec les informations pré-remplies.
          Envoyez l'email pour finaliser votre demande. Notre équipe vous répondra sous 24h.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ nom: "", email: "", telephone: "", typeProjet: "", superficie: "", message: "" }); }}
          className="text-[#00A86B] hover:text-white transition-colors text-sm font-medium"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[#00A86B]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white" style={poppins}>Demander un devis gratuit</h3>
          <p className="text-white/40 text-sm">Réponse sous 24h ouvrées</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Nom complet *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Email *</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Téléphone *</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              placeholder="+225 XX XX XX XX XX"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2 font-medium">Type de projet</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <select
              name="typeProjet"
              value={formData.typeProjet}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm appearance-none"
            >
              <option value="" className="bg-[#0A1628]">Sélectionner...</option>
              <option value="Lotissement résidentiel" className="bg-[#0A1628]">Lotissement résidentiel</option>
              <option value="Lotissement mixte" className="bg-[#0A1628]">Lotissement mixte</option>
              <option value="Lotissement commercial" className="bg-[#0A1628]">Lotissement commercial</option>
              <option value="Restructuration urbaine" className="bg-[#0A1628]">Restructuration urbaine</option>
              <option value="Régularisation foncière" className="bg-[#0A1628]">Régularisation foncière</option>
              <option value="Autre" className="bg-[#0A1628]">Autre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-white/60 text-sm mb-2 font-medium">Superficie estimée du terrain</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            name="superficie"
            value={formData.superficie}
            onChange={handleChange}
            placeholder="Ex : 5 hectares, 10 000 m²..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-white/60 text-sm mb-2 font-medium">Message / Description du projet</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Décrivez brièvement votre projet, sa localisation, vos attentes..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#00A86B]/50 focus:ring-1 focus:ring-[#00A86B]/30 outline-none transition-all text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00A86B] hover:bg-[#009960] disabled:opacity-60 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-[#00A86B]/30 hover:shadow-xl hover:shadow-[#00A86B]/40"
        style={poppins}
      >
        {sending ? (
          <>Envoi en cours...</>
        ) : (
          <>
            Envoyer ma demande
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}

// ─── COMPONENT ────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ===== SECTION 1: HERO / COVER ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Vue aérienne d'un projet d'aménagement urbain" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/75 to-[#0047AB]/40" />
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-3xl hero-content">
              <div className="mb-10 hero-fade" style={{ animationDelay: "0.1s" }}>
                <img src={LOGO_WHITE} alt="Horizon Spatial" className="h-16 lg:h-20" />
              </div>

              <div className="mb-6 hero-fade" style={{ animationDelay: "0.3s" }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <BadgeCheck className="w-4 h-4 text-[#00A86B]" />
                  Bureau d'Études d'Urbaniste Agréé O.N.U.C.I.
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 hero-fade"
                style={{ ...poppins, animationDelay: "0.5s" }}
              >
                Offre de Services{" "}
                <span className="text-[#00A86B]">Aménageurs Fonciers</span>{" "}
                & Promoteurs
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl hero-fade" style={{ animationDelay: "0.7s" }}>
                Conformité légale, expertise technique et accompagnement complet
                pour vos projets de lotissement en Côte d'Ivoire.
              </p>

              <div className="flex flex-wrap gap-4 hero-fade" style={{ animationDelay: "0.9s" }}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A86B] hover:bg-[#009960] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#00A86B]/25 hover:shadow-xl hover:shadow-[#00A86B]/30"
                  style={poppins}
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all duration-300 print:hidden"
                  style={poppins}
                >
                  <Download className="w-5 h-5" />
                  Télécharger en PDF
                </button>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg hero-fade" style={{ animationDelay: "1.1s" }}>
                {[
                  { value: "8+", label: "Années d'expérience" },
                  { value: "100%", label: "Conformité légale" },
                  { value: "2", label: "Pôles d'expertise" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl lg:text-4xl font-bold text-white" style={poppins}>{stat.value}</div>
                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hero-fade" style={{ animationDelay: "1.5s" }}>
          <span className="text-xs uppercase tracking-widest" style={poppins}>Défiler</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* ===== SECTION 2: CADRE RÉGLEMENTAIRE ===== */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url(${TOPO_IMG})`, backgroundSize: "cover" }} />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
                <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Cadre Réglementaire</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] leading-tight mb-6" style={poppins}>
                Pourquoi faire appel à un{" "}
                <span className="text-[#0047AB]">Urbaniste Agréé</span> ?
              </h2>
              <p className="text-lg text-[#4A5568] leading-relaxed">
                Depuis le Code de l'Urbanisme de 2020, tout projet de lotissement en Côte d'Ivoire
                doit être réalisé par un urbaniste inscrit à l'Ordre National des Urbanistes (O.N.U.C.I.).
                Le non-respect de cette obligation expose à des sanctions pénales lourdes.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal delay={100}>
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0047AB]/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-[#0047AB]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1628]" style={poppins}>Ce que dit la loi</h3>
                </div>
                <div className="space-y-4">
                  {articles.map((a) => (
                    <div key={a.num} className="bg-white rounded-xl p-5 border border-[#E2E8F0]">
                      <div className="text-sm font-bold text-[#0047AB] mb-2" style={poppins}>{a.num}</div>
                      <p className="text-sm text-[#4A5568] leading-relaxed">{a.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-6 h-full flex flex-col">
                <div className="bg-red-50 rounded-2xl p-8 border border-red-100 flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1628]" style={poppins}>Les risques concrets</h3>
                  </div>
                  <div className="space-y-3">
                    {risks.map((r) => (
                      <div key={r} className="flex items-start gap-3 bg-white/60 rounded-lg p-3 border border-red-100/50">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-red-600 text-xs font-bold">!</span>
                        </div>
                        <p className="text-sm text-[#4A5568]">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0047AB] rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#00A86B]" />
                    <h3 className="text-lg font-bold" style={poppins}>La Solution</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Horizon Spatial est un bureau d'études inscrit à l'O.N.U.C.I.
                    Nous garantissons la conformité légale complète de vos projets
                    de lotissement, de la conception à l'approbation.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: DOUBLE EXPERTISE ===== */}
      <section className="py-20 lg:py-28 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src={TOPO_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Votre Partenaire</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={poppins}>
                Une double expertise{" "}
                <span className="text-[#00A86B]">unique</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Horizon Spatial est le seul bureau d'études ivoirien combinant l'urbanisme certifié
                et la géomatique avancée, pour des projets d'aménagement conformes, optimisés et innovants.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10">
            <Reveal delay={100} className="lg:col-span-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00A86B]/30 mb-5">
                    <img src={LAVOISIER_IMG} alt="Lavoisier Ousmane" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1" style={poppins}>Lavoisier Ousmane</h3>
                  <p className="text-[#00A86B] text-sm font-medium mb-4">Urbaniste & Expert SIG</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Fondateur d'Horizon Spatial, urbaniste inscrit à l'O.N.U.C.I.
                    avec plus de 8 années d'expérience en aménagement du territoire et géomatique.
                  </p>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A86B]/10 border border-[#00A86B]/20 text-[#00A86B] text-xs font-medium">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Membre O.N.U.C.I.
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              <Reveal delay={200}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-[#0047AB]" />
                    <span className="text-[#0047AB] font-semibold text-xs uppercase tracking-wider" style={poppins}>Pôle Urbanisme</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-6" style={poppins}>Conformité & Conception</h3>
                  <ul className="space-y-3">
                    {poleUrbanisme.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-[#00A86B]" />
                    <span className="text-[#00A86B] font-semibold text-xs uppercase tracking-wider" style={poppins}>Pôle Géomatique</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-6" style={poppins}>Optimisation & Technologie</h3>
                  <ul className="space-y-3">
                    {poleGeomatique.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SERVICES ===== */}
      <section id="services" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
                <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Nos Services</span>
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] leading-tight mb-6" style={poppins}>
                Une offre complète pour les{" "}
                <span className="text-[#0047AB]">Aménageurs Fonciers</span>
              </h2>
              <p className="text-lg text-[#4A5568] leading-relaxed">
                De l'étude préliminaire à la délivrance de l'arrêté d'approbation,
                nous vous accompagnons à chaque étape de votre projet de lotissement.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] hover:border-[#0047AB]/20 hover:shadow-xl hover:shadow-[#0047AB]/5 transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${service.color}10` }}>
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-[#0047AB]/30" style={poppins}>0{i + 1}</span>
                    <div className="w-6 h-px bg-[#E2E8F0]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A1628] mb-3" style={poppins}>{service.title}</h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Plan de lotissement showcase */}
          <Reveal delay={200}>
            <div className="mt-16 bg-white rounded-2xl p-6 lg:p-10 border border-[#E2E8F0] shadow-sm">
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-[#0047AB]" />
                    <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Exemple de réalisation</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A1628] mb-4" style={poppins}>Plan de Lotissement</h3>
                  <p className="text-[#4A5568] leading-relaxed mb-6">
                    Aménagement d'un site de plus de 10 hectares comprenant 177 lots,
                    des espaces verts, des équipements publics (groupes scolaires,
                    aires de jeux, centres de préscolaire) et un réseau viaire structuré.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                      <div className="text-2xl font-bold text-[#0047AB]" style={poppins}>10 Ha</div>
                      <div className="text-xs text-[#4A5568] mt-1">Surface totale</div>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                      <div className="text-2xl font-bold text-[#00A86B]" style={poppins}>177</div>
                      <div className="text-xs text-[#4A5568] mt-1">Lots créés</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="rounded-xl overflow-hidden border border-[#E2E8F0] shadow-lg">
                    <img src={PLAN_IMG} alt="Plan de lotissement - Aménagement 10ha" className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SECTION 5: PROCESSUS ===== */}
      <section className="py-20 lg:py-28 bg-[#0047AB] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={DRONE_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0047AB]/90" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-white/40 rounded-full" />
                <span className="text-white/70 font-semibold text-sm uppercase tracking-wider" style={poppins}>Notre Méthodologie</span>
                <div className="w-10 h-1 bg-white/40 rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={poppins}>
                Un processus en{" "}
                <span className="text-[#00A86B]">7 étapes</span> claires
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Un accompagnement structuré et transparent pour garantir le succès
                de votre projet d'aménagement.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2"
                      style={{
                        backgroundColor: i === 6 ? "#00A86B" : "transparent",
                        borderColor: i === 6 ? "#00A86B" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      <span className="text-white font-bold text-sm" style={poppins}>0{i + 1}</span>
                    </div>
                    {i < 6 && <div className="w-px h-full min-h-[2rem] bg-white/10 my-2" />}
                  </div>
                  <div className="pb-4">
                    <h3 className="text-lg font-bold text-white mb-2" style={poppins}>{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: POURQUOI NOUS CHOISIR ===== */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${TOPO_IMG})`, backgroundSize: "cover" }} />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
                <span className="text-[#00A86B] font-semibold text-sm uppercase tracking-wider" style={poppins}>Nos Avantages</span>
                <div className="w-10 h-1 bg-[#00A86B] rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] leading-tight" style={poppins}>
                Pourquoi choisir{" "}
                <span className="text-[#0047AB]">H-Spatial</span> ?
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={i * 80}>
                <div className="text-center p-8 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: `${adv.accent}10` }}>
                    <adv.icon className="w-8 h-8" style={{ color: adv.accent }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A1628] mb-3" style={poppins}>{adv.title}</h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">{adv.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl shadow-[#0047AB]/10">
              <img src={OFFICE_IMG} alt="Bureau d'études Horizon Spatial" className="w-full h-64 lg:h-80 object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SECTION 7: TÉMOIGNAGES & RÉFÉRENCES (NEW) ===== */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
                <span className="text-[#0047AB] font-semibold text-sm uppercase tracking-wider" style={poppins}>Références & Témoignages</span>
                <div className="w-10 h-1 bg-[#0047AB] rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] leading-tight mb-6" style={poppins}>
                Ils nous font{" "}
                <span className="text-[#0047AB]">confiance</span>
              </h2>
              <p className="text-lg text-[#4A5568] leading-relaxed">
                Des projets réalisés avec succès et des partenaires satisfaits à travers la Côte d'Ivoire.
              </p>
            </div>
          </Reveal>

          {/* Références projets */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {references.map((ref, i) => (
              <Reveal key={ref.type} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl hover:shadow-[#0047AB]/5 transition-all duration-500 h-full">
                  <div className="bg-[#0047AB] p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <ref.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm" style={poppins}>{ref.type}</h3>
                        <p className="text-white/60 text-xs">{ref.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="bg-white/10 rounded-lg px-3 py-2">
                        <div className="text-white font-bold text-lg" style={poppins}>{ref.surface}</div>
                        <div className="text-white/50 text-xs">Surface</div>
                      </div>
                      <div className="bg-white/10 rounded-lg px-3 py-2">
                        <div className="text-[#00A86B] font-bold text-lg" style={poppins}>{ref.lots}</div>
                        <div className="text-white/50 text-xs">Lots</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#4A5568] leading-relaxed">{ref.details}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
                      <span className="text-xs text-[#00A86B] font-medium">Projet livré avec succès</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Témoignages */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.company} delay={i * 100 + 300}>
                <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] h-full relative">
                  <div className="absolute top-6 right-6">
                    <Quote className="w-8 h-8 text-[#0047AB]/10" />
                  </div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                  <div className="border-t border-[#E2E8F0] pt-4">
                    <div className="font-bold text-[#0A1628] text-sm" style={poppins}>{t.name}</div>
                    <div className="text-xs text-[#4A5568]">{t.company}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: CTA / CONTACT WITH FORM (UPDATED) ===== */}
      <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={LEGAL_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#0A1628]/90 to-[#0047AB]/80" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <Reveal>
              <div>
                <img src={LOGO_WHITE} alt="Horizon Spatial" className="h-16 mb-10" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={poppins}>
                  Prêt à sécuriser votre prochain{" "}
                  <span className="text-[#00A86B]">lotissement</span> ?
                </h2>

                <p className="text-lg text-white/70 leading-relaxed mb-10">
                  Contactez-nous dès aujourd'hui pour une étude de faisabilité
                  gratuite de votre projet. Notre équipe est à votre disposition.
                </p>

                <div className="space-y-4 mb-10">
                  <a href="tel:+2250143430505" className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">+225 01 43 43 05 05</div>
                      <div className="text-white/40 text-sm">+225 27 22 25 60 38</div>
                    </div>
                  </a>
                  <a href="mailto:contact@horizonspatial.ci" className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div className="text-white font-semibold">contact@horizonspatial.ci</div>
                  </a>
                  <a href="https://www.horizonspatial.ci" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#00A86B]" />
                    </div>
                    <div className="text-white font-semibold">www.horizonspatial.ci</div>
                  </a>
                </div>

                {/* PDF Download button */}
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white/70 hover:text-white font-medium rounded-xl border border-white/10 transition-all duration-300 print:hidden"
                  style={poppins}
                >
                  <Download className="w-5 h-5" />
                  Télécharger cette plaquette en PDF
                </button>
              </div>
            </Reveal>

            {/* Right: Contact Form */}
            <Reveal delay={200}>
              <ContactForm />
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-16 text-center">
              <p className="text-white/30 text-sm italic" style={poppins}>
                « Voir plus loin, bâtir mieux »
              </p>
              <p className="text-white/20 text-xs mt-3">
                H-Spatial | Spatial Intelligence for Africa
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0A1628] py-8 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={LOGO_WHITE} alt="H-Spatial" className="h-8" />
              <span className="text-white/30 text-sm">Bureau d'Études d'Urbaniste Agréé & Géomatique</span>
            </div>
            <div className="text-white/20 text-xs">
              RCCM : CI-ABJ-03-2026-B13-00264 | Abidjan, Côte d'Ivoire
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
