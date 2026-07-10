/**
 * Hook partagé : compteur animé qui démarre lorsqu'une condition `start` passe
 * à `true` (typiquement quand la section entre dans le viewport).
 *
 * Respecte `prefers-reduced-motion` — si l'utilisateur a réduit les animations,
 * on bascule directement sur la valeur finale sans animation.
 *
 * Utilisé par : Home (AnimatedStat), About (StatCard).
 */

import { useEffect, useState } from "react";

export function useCountUp(
  end: number,
  start: boolean,
  duration = 1800,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    // Respect prefers-reduced-motion : pas d'animation, valeur finale d'un coup.
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(end);
      return;
    }

    let raf = 0;
    let begin: number | null = null;
    const tick = (ts: number) => {
      if (begin === null) begin = ts;
      const progress = Math.min((ts - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start, duration]);

  return value;
}
