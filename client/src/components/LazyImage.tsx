import { useEffect, useRef, useState } from "react";

// Uses IntersectionObserver to only load images when they enter the viewport.
// Shows a blurred placeholder until the image is loaded.
export function LazyImage({ src, alt, className = "", style, onClick, width, height }: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /** Dimensions intrinsèques de l'image — évitent le CLS (Cumulative Layout Shift). */
  width?: number;
  height?: number;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" } // Start loading 200px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={style}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onClick={onClick}
    />
  );
}
