import { useEffect, useRef } from "react";

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable parallax on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Respecte la préférence système "mouvement réduit"
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Only compute when section is near viewport
        if (rect.bottom < -200 || rect.top > windowH + 200) return;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowH / 2;
        const delta = (sectionCenter - viewportCenter) * speed;
        if (Math.abs(delta - offsetRef.current) > 0.5) {
          offsetRef.current = delta;
          el.style.transform = `translate3d(0, ${delta}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial position
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return ref;
}
