export interface CityMarker {
  name: string;
  lat: number;
  lng: number;
  isHQ: boolean;
  desc: string;
}

export const CITIES_DATA: CityMarker[] = [
  { name: "Abidjan", lat: 5.3600, lng: -4.0083, isHQ: true, desc: "Siège social" },
  { name: "San-Pédro", lat: 4.7485, lng: -6.6363, isHQ: false, desc: "Zone active" },
  { name: "Yamoussoukro", lat: 6.8276, lng: -5.2893, isHQ: false, desc: "Zone active" },
  { name: "Bouaké", lat: 7.6881, lng: -5.0305, isHQ: false, desc: "Zone active" },
  { name: "Korhogo", lat: 9.4580, lng: -5.6295, isHQ: false, desc: "Zone active" },
];

// GeoJSON data URLs — fichiers locaux (source : geoBoundaries.org, CIV ADM0/ADM1)
export const CIV_OUTLINE_URL = "/geo/civ-outline.geojson";
export const CIV_REGIONS_URL = "/geo/civ-regions.geojson";

export interface InterventionZone {
  city: string;
  type: string;
  desc: string;
  active: boolean;
}

export const interventionZones: InterventionZone[] = [
  { city: "Abidjan", type: "Siège social", desc: "District autonome — Lotissements résidentiels, mixtes et commerciaux", active: true },
  { city: "San-Pédro", type: "Zone active", desc: "Pôle économique Sud-Ouest — Aménagements portuaires et résidentiels", active: true },
  { city: "Yamoussoukro", type: "Zone active", desc: "Capitale politique — Projets d'urbanisation", active: true },
  { city: "Bouaké", type: "Zone active", desc: "Deuxième ville — Restructuration et extension urbaine", active: true },
  { city: "Korhogo", type: "Zone active", desc: "Pôle Nord — Développement urbain et foncier", active: true },
];
