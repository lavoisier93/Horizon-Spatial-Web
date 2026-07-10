/**
 * Page Politique de Confidentialité — H-Spatial
 * Conforme RGPD et loi ivoirienne sur la protection des données personnelles
 */

import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";
import { Link } from "wouter";
import { usePageSeo } from "@/hooks/usePageSeo";

const poppins = { fontFamily: "'Poppins', 'Montserrat', sans-serif" };

export default function PrivacyPolicy() {
  usePageSeo({
    title: "Politique de Confidentialité | H-Spatial",
    description: "HORIZON SPATIAL s'engage à protéger vos données personnelles conformément au RGPD et à la législation ivoirienne en vigueur.",
    url: "https://www.horizonspatial.ci/politique-de-confidentialite",
    image: "https://www.horizonspatial.ci/assets/images/hero-cover.webp",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-[#0A1628] py-6 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors no-underline">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium" style={poppins}>Retour à l'accueil</span>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#0047AB]" />
              <span className="text-white/50 text-xs font-medium uppercase tracking-wider" style={poppins}>RGPD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047AB]/10 border border-[#0047AB]/20 mb-6">
            <Lock className="w-4 h-4 text-[#0047AB]" />
            <span className="text-[#0047AB] text-xs font-semibold uppercase tracking-wider" style={poppins}>Protection des données</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4" style={poppins}>
            Politique de Confidentialité
          </h1>
          <p className="text-[#4A5568] text-lg max-w-2xl mx-auto">
            HORIZON SPATIAL s'engage à protéger vos données personnelles conformément au RGPD et à la législation ivoirienne en vigueur.
          </p>
          <p className="text-[#4A5568]/50 text-sm mt-4">
            Dernière mise à jour : Mai 2026
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <Section
            icon={<UserCheck className="w-5 h-5 text-[#0047AB]" />}
            title="1. Responsable du traitement"
          >
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4 shadow-sm">
              <p className="font-bold text-[#0A1628]">HORIZON SPATIAL (H-Spatial)</p>
              <p className="text-[#4A5568] mt-1">Bureau d'Études d'Urbaniste Agréé & Géomatique</p>
              <p className="text-[#4A5568] mt-1">RCCM : CI-ABJ-03-2026-B13-00264</p>
              <p className="text-[#4A5568] mt-1">Abidjan, Côte d'Ivoire</p>
              <p className="text-[#4A5568] mt-1">Email : contact@horizonspatial.ci</p>
              <p className="text-[#4A5568] mt-1">Tél : (+225) 01 43 43 05 05 / 27 22 25 60 38</p>
            </div>
          </Section>

          {/* Section 2 */}
          <Section
            icon={<Database className="w-5 h-5 text-[#00A86B]" />}
            title="2. Données collectées"
          >
            <p>
              Dans le cadre de l'utilisation de notre site web, nous pouvons être amenés à collecter les données suivantes :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-[#4A5568]">
              <li><strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées, durée de visite, système d'exploitation</li>
              <li><strong>Cookies techniques</strong> : préférences d'affichage (mode sombre/clair), consentement cookies</li>
              <li><strong>Données de contact</strong> : nom, email, téléphone, message (uniquement si vous nous contactez via le formulaire ou WhatsApp)</li>
              <li><strong>Données d'analyse</strong> : statistiques anonymisées de fréquentation du site</li>
            </ul>
          </Section>

          {/* Section 3 */}
          <Section
            icon={<Eye className="w-5 h-5 text-[#0047AB]" />}
            title="3. Finalités du traitement"
          >
            <p>
              Les données collectées sont utilisées exclusivement pour les finalités suivantes :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-[#4A5568]">
              <li>Assurer le bon fonctionnement technique du site web</li>
              <li>Améliorer l'expérience utilisateur et l'ergonomie du site</li>
              <li>Répondre à vos demandes de contact et de renseignements</li>
              <li>Produire des statistiques anonymes de fréquentation</li>
              <li>Respecter nos obligations légales et réglementaires</li>
            </ul>
          </Section>

          {/* Section 4 */}
          <Section
            icon={<Lock className="w-5 h-5 text-[#00A86B]" />}
            title="4. Base légale du traitement"
          >
            <p>
              Le traitement de vos données repose sur les bases légales suivantes :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-[#4A5568]">
              <li><strong>Votre consentement</strong> : pour les cookies non essentiels et l'envoi de communications</li>
              <li><strong>L'intérêt légitime</strong> : pour l'amélioration de nos services et la sécurité du site</li>
              <li><strong>L'exécution contractuelle</strong> : pour le traitement de vos demandes de prestation</li>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section
            icon={<Shield className="w-5 h-5 text-[#0047AB]" />}
            title="5. Cookies"
          >
            <p>
              Notre site utilise des cookies pour fonctionner correctement. Voici les types de cookies utilisés :
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#0047AB]/5">
                    <th className="text-left p-3 font-semibold text-[#0A1628] border border-gray-100">Type</th>
                    <th className="text-left p-3 font-semibold text-[#0A1628] border border-gray-100">Finalité</th>
                    <th className="text-left p-3 font-semibold text-[#0A1628] border border-gray-100">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">Cookies essentiels</td>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">Fonctionnement du site, préférences d'affichage</td>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">Session / 1 an</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-3 border border-gray-100 text-[#4A5568]">Cookies analytiques</td>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">Statistiques de fréquentation anonymisées</td>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">13 mois</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">Cookies de consentement</td>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">Mémorisation de votre choix cookies</td>
                    <td className="p-3 border border-gray-100 text-[#4A5568]">6 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[#4A5568]">
              Vous pouvez à tout moment modifier vos préférences en supprimant les cookies de votre navigateur ou en effaçant le stockage local du site.
            </p>
          </Section>

          {/* Section 6 */}
          <Section
            icon={<UserCheck className="w-5 h-5 text-[#00A86B]" />}
            title="6. Vos droits"
          >
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi ivoirienne relative à la protection des données à caractère personnel, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-[#4A5568]">
              <li><strong>Droit d'accès</strong> : obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
              <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la limitation</strong> : restreindre le traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à l'adresse : <a href="mailto:contact@horizonspatial.ci" className="text-[#0047AB] font-medium hover:underline">contact@horizonspatial.ci</a>
            </p>
          </Section>

          {/* Section 7 */}
          <Section
            icon={<Lock className="w-5 h-5 text-[#0047AB]" />}
            title="7. Sécurité des données"
          >
            <p>
              HORIZON SPATIAL met en œuvre les mesures techniques et organisationnelles appropriées pour assurer la sécurité et la confidentialité de vos données personnelles, notamment :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-[#4A5568]">
              <li>Chiffrement des communications (protocole HTTPS/TLS)</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Hébergement sécurisé des données</li>
              <li>Mise à jour régulière des systèmes de sécurité</li>
            </ul>
          </Section>

          {/* Section 8 */}
          <Section
            icon={<Database className="w-5 h-5 text-[#00A86B]" />}
            title="8. Transfert de données"
          >
            <p>
              Vos données personnelles ne sont pas transférées en dehors de la Côte d'Ivoire, sauf dans le cadre de l'hébergement technique du site (serveurs sécurisés). Aucune donnée n'est vendue, louée ou cédée à des tiers à des fins commerciales.
            </p>
          </Section>

          {/* Section 9 */}
          <Section
            icon={<Mail className="w-5 h-5 text-[#0047AB]" />}
            title="9. Contact"
          >
            <p>
              Pour toute question relative à cette politique de confidentialité ou à l'exercice de vos droits, vous pouvez nous contacter :
            </p>
            <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4 shadow-sm">
              <p className="font-bold text-[#0A1628]">HORIZON SPATIAL</p>
              <p className="text-[#4A5568] mt-2">Email : <a href="mailto:contact@horizonspatial.ci" className="text-[#0047AB] hover:underline">contact@horizonspatial.ci</a></p>
              <p className="text-[#4A5568] mt-1">Tél : (+225) 01 43 43 05 05</p>
              <p className="text-[#4A5568] mt-1">Site : <a href="https://www.horizonspatial.ci" target="_blank" rel="noopener noreferrer" className="text-[#0047AB] hover:underline">www.horizonspatial.ci</a></p>
            </div>
          </Section>
        </div>

        {/* Back to home */}
        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047AB] hover:bg-[#0055CC] text-white font-semibold rounded-xl shadow-lg shadow-[#0047AB]/30 hover:shadow-xl transition-all duration-300 no-underline" style={poppins}>
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </main>

      {/* Mini footer */}
      <footer className="bg-[#0A1628] py-6 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="text-white/30 text-xs" style={poppins}>
            © 2026 HORIZON SPATIAL — Tous droits réservés | RCCM : CI-ABJ-03-2026-B13-00264
          </p>
        </div>
      </footer>
    </div>
  );
}

// Reusable section component
function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1628]" style={poppins}>{title}</h2>
      </div>
      <div className="text-[#4A5568] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}
