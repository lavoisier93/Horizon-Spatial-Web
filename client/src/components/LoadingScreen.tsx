import { useEffect, useState } from "react";

// Phase 1 : losanges tournants (1,5 s) — première impression dynamique.
// Phase 2 : logo SVG pathReveal + pulse + texte + progress bar (2,4 s)
//           reproduction fidèle du fichier référence `hspatial-immersive.html`.
// Total ≈ 3,9 s + fadeOut 0,8 s. Skip via sessionStorage aux visites suivantes.
export function LoadingScreen() {
  const alreadySeen = typeof sessionStorage !== "undefined" && sessionStorage.getItem("hs_loading_seen") === "1";
  const [visible, setVisible] = useState(!alreadySeen);
  const [fadeOut, setFadeOut] = useState(false);
  const [phase, setPhase] = useState<1 | 2>(1);

  useEffect(() => {
    if (alreadySeen) return;
    const t1 = setTimeout(() => setPhase(2), 1500);
    const t2 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        try { sessionStorage.setItem("hs_loading_seen", "1"); } catch {}
      }, 800);
    }, 1500 + 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [alreadySeen]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050508]"
      style={{
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? "hidden" : "visible",
        transition: "opacity 0.8s ease, visibility 0.8s ease",
      }}
      role="status"
      aria-live="polite"
      aria-label="Chargement du site Horizon Spatial"
    >
      {/* Phase 1 : losanges tournants */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: phase === 1 ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div className="relative w-[100px] h-[100px]">
          <div className="loader-diamond absolute top-0 left-[20px] w-[40px] h-[40px] border-[3px] border-[#0047AB]" />
          <div className="loader-diamond loader-diamond-2 absolute bottom-0 left-[40px] w-[40px] h-[40px] border-[3px] border-[#00A86B]" />
        </div>
      </div>

      {/* Phase 2 : logo SVG + texte + barre de progression */}
      <div
        style={{
          opacity: phase === 2 ? 1 : 0,
          transition: "opacity 0.5s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.75rem",
        }}
      >
        {phase === 2 && (
          <>
            <svg
              className="loader-icon-svg"
              viewBox="0 0 237.4442 119.9429"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "220px", height: "auto" }}
              aria-hidden="true"
            >
              <g transform="scale(3.2297424049981)">
                <path className="loader-path path-blue-1" fill="#0047ab" d="m8.605 18.568 9.961-9.963 9.963 9.963 4.302-4.302L18.566 0 0 18.568l18.566 18.567L28.99 26.709l10.428 10.428h4.52L31.25 24.451h.003l-4.302-4.305-8.385 8.383z" />
                <path className="loader-path path-blue-2" fill="#2b75b7" d="m37.133 18.566-4.304 4.303-4.302-4.303 4.304-4.303z" />
                <path className="loader-path path-blue-3" fill="#2b75b7" d="m61.897 18.566 1.575 1.576 1.575-1.576-1.575-1.574-1.575 1.574zm3.622 2.707 1.229 1.23 1.229-1.23-1.229-1.229-1.229 1.229zm2.936-7.502-2.238 2.238 2.238 2.238 2.238-2.238-2.238-2.238z" />
                <path className="loader-path path-green-1" fill="#00a86b" d="m62.604 15.508-1.464-1.463-.8.799-.953-.953.799-.801L47.096 0 36.671 10.424 26.246 0h-4.521l7.25 7.25 5.437 5.438 4.302 4.301 8.383-8.383 9.963 9.963-9.963 9.961-9.962-9.963-4.304 4.303 14.266 14.266L62.605 21.63l-3.061-3.061 3.06-3.061zm-6.383-.137 1.266-1.266 1.266 1.266-1.266 1.266-1.266-1.266zm4.125 6.738-1.34 1.34-1.34-1.34 1.34-1.34 1.34 1.34z" />
                <path className="loader-path path-green-2" fill="#00a86b" d="m62.053 25.938 2.555 2.557 2.556-2.557-2.556-2.555-2.555 2.555zm9.455-7.479-2.012 2.012 2.012 2.01 2.01-2.01-2.01-2.012zm-5.197-5.576-1.293-1.293-1.294 1.293 1.294 1.295 1.293-1.295z" />
              </g>
            </svg>

            <div className="loader-hs-text">HORIZON SPATIAL</div>

            <div className="loader-progress-container">
              <div className="loader-progress-fill" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
