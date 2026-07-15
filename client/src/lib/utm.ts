export function addUtm(url: string, source: string, medium: string, campaign: string = "plaquette_amenageurs_2026") {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`;
}
