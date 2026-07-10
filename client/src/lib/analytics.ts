const CONSENT_KEY = "hspatial_cookie_consent";
let loaded = false;

export function loadUmami() {
  if (loaded) return;
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !websiteId) return;
  const s = document.createElement("script");
  s.src = `${endpoint}/umami`;
  s.defer = true;
  s.dataset.websiteId = websiteId;
  document.head.appendChild(s);
  loaded = true;
}

export function loadAnalyticsIfConsented() {
  if (localStorage.getItem(CONSENT_KEY) === "accepted") loadUmami();
}
