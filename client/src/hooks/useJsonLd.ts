import { useEffect } from "react";

/** Injecte un bloc JSON-LD (schema.org) dans le <head> au montage, le retire au démontage. */
export function useJsonLd(data: object) {
  const serialized = JSON.stringify(data);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = serialized;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized]);
}
