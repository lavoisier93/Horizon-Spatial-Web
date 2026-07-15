import { useId } from "react";

/**
 * Icône Google Maps — épingle multicolore (rouge, jaune, vert, bleu Google)
 * avec le point blanc central, rendue en SVG inline (aucune requête externe).
 * Rendue reconnaissable pour que le visiteur identifie immédiatement le lien
 * vers Google Maps. `useId` garantit un clipPath unique par instance.
 */
export function GoogleMapsIcon({ className = "" }: { className?: string }) {
  const clipId = useId();
  return (
    <svg viewBox="8 5 32 40" className={className} role="img" aria-label="Google Maps">
      <defs>
        <clipPath id={clipId}>
          <path d="M24 6 C15.7 6 9 12.7 9 21 c0 11.25 15 23 15 23 s15-11.75 15-23 C39 12.7 32.3 6 24 6 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="4" width="48" height="14" fill="#EA4335" />
        <rect x="0" y="18" width="48" height="7" fill="#FBBC04" />
        <rect x="0" y="25" width="48" height="7" fill="#34A853" />
        <rect x="0" y="32" width="48" height="16" fill="#4285F4" />
      </g>
      <circle cx="24" cy="21" r="5.5" fill="#fff" />
    </svg>
  );
}
