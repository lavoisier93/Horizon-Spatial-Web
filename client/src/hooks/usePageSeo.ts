import { useEffect } from "react";

export interface PageSeoOptions {
  title: string;
  description: string;
  /** URL canonique complète de la page (avec https://www.horizonspatial.ci). */
  url: string;
  /** URL absolue de l'image de partage (Open Graph / Twitter Card). */
  image: string;
  ogType?: "website" | "profile";
  locale?: string;
}

function setMeta(selector: string, attrName: string, attrValue: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(selector: string, attrs: Record<string, string>) {
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    for (const [name, value] of Object.entries(attrs)) {
      el.setAttribute(name, value);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("href", attrs.href);
}

/**
 * Met à jour title + meta SEO (description, canonical, hreflang, Open Graph,
 * Twitter Card) au montage de la page.
 *
 * Ne restaure rien au démontage : chaque page réaffirme systématiquement ses
 * propres valeurs à son propre montage, la page suivante écrasant celles de
 * la précédente. Supprimer les balises au démontage (comme le faisait
 * l'ancienne implémentation locale à About.tsx) effaçait les tags statiques
 * de index.html de façon définitive pour le reste de la session SPA.
 */
export function usePageSeo({ title, description, url, image, ogType = "website", locale = "fr_CI" }: PageSeoOptions) {
  useEffect(() => {
    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);

    setLink('link[rel="canonical"]', { rel: "canonical", href: url });
    setLink('link[rel="alternate"][hreflang="fr-CI"]', { rel: "alternate", hreflang: "fr-CI", href: url });
    setLink('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", hreflang: "x-default", href: url });

    setMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setMeta('meta[property="og:locale"]', "property", "og:locale", locale);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", image);

    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
  }, [title, description, url, image, ogType, locale]);
}
