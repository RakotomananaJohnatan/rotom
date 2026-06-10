import genCummins from "@/assets/gen-cummins.jpg";
import genCat from "@/assets/gen-cat.jpg";
import genPerkins from "@/assets/gen-perkins.jpg";
import genFgWilson from "@/assets/gen-fgwilson.jpg";
import genVolvo from "@/assets/gen-volvo.jpg";
import genDoosan from "@/assets/gen-doosan.jpg";
import genSR from "@/assets/gen-sr.jpg";
import genSRAU from "@/assets/gen-srau.jpg";
import genSR2 from "@/assets/gen-sr2.jpg";
import genSE from "@/assets/gen-se.jpg";
import genSREU from "@/assets/gen-sreu.jpg";
import genSC from "@/assets/gen-sc.jpg";
import genOE500 from "@/assets/gen-oe500.jpg";
import type { Product } from "@/components/ProductCard";

export const brands = ["ROTOM"];

export type ProductType = "open" | "closed";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const enrich = (
  list: (Omit<Product, "slug" | "condition"> & { type: ProductType })[],
  condition: "new" | "used"
): Product[] =>
  list.map((p) => ({ ...p, condition, slug: slugify(p.name) }));

// ROTOM silent-type genset catalogs (all silent diesel).
// `kva` stores the upper power bound used by the catalog slider filter.
// The full power range is shown in the subtitle.
export const newProducts: Product[] = enrich([
  {
    stock: "EN STOCK",
    name: "ROTOM SR",
    subtitle: "Silent-type Genset · 6 à 650 kVA · Diesel",
    kva: "650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSR,
    type: "closed",
    specs: {
      fr: [
        ["Puissance", "6 ~ 650 kVA"],
        ["Application", "Prime / Secours"],
        ["Carburant", "Diesel"],
        ["Niveau sonore", "65–80 dBA @ 7m (75% charge)"],
        ["Température ambiante", "-10 ~ 40°C"],
        ["Protection boîtier", "IP23 / IP44 (armoire)"],
        ["Réservoir", "8h @ 75% charge"],
        ["Tôlerie", "2mm galvanisé"],
        ["Composants électriques", "Chint + composants standards"],
        ["Certification", "CE, ISO8528"],
      ],
      en: [
        ["Power", "6 ~ 650 kVA"],
        ["Application", "Prime / Standby"],
        ["Fuel", "Diesel"],
        ["Noise Level", "65–80 dBA @ 7m (75% load)"],
        ["Ambient Temperature", "-10 ~ 40°C"],
        ["Enclosure Protection", "IP23 / IP44 (control cabinet)"],
        ["Fuel Tank", "8h @ 75% load"],
        ["Sheet Metal", "2mm galvanized"],
        ["Electrical Components", "Chint + standard components"],
        ["Certification", "CE, ISO8528"],
      ],
    },
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SRAU",
    subtitle: "Australia Rental Type · 6 à 650 kVA · Diesel",
    kva: "650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSRAU,
    type: "closed",
    specs: {
      fr: [
        ["Puissance", "6 ~ 650 kVA"],
        ["Application", "Prime / Secours"],
        ["Carburant", "Diesel"],
        ["Niveau sonore", "65–71 dBA @ 7m (75% charge)"],
        ["Température ambiante", "-10 ~ 40°C"],
        ["Protection boîtier", "IP23 / IP44 (armoire)"],
        ["Réservoir", "12h @ 100% charge"],
        ["Tôlerie", "2mm galvanisé"],
        ["Composants électriques", "ABB / Schneider"],
        ["Certification", "CE, ISO8528"],
      ],
      en: [
        ["Power", "6 ~ 650 kVA"],
        ["Application", "Prime / Standby"],
        ["Fuel", "Diesel"],
        ["Noise Level", "65–71 dBA @ 7m (75% load)"],
        ["Ambient Temperature", "-10 ~ 40°C"],
        ["Enclosure Protection", "IP23 / IP44 (control cabinet)"],
        ["Fuel Tank", "12h @ 100% load"],
        ["Sheet Metal", "2mm galvanized"],
        ["Electrical Components", "ABB / Schneider"],
        ["Certification", "CE, ISO8528"],
      ],
    },
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SR2",
    subtitle: "Silent-type SR2 · 6 à 1000 kVA · Diesel",
    kva: "1000 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSR2,
    type: "closed",
    specs: {
      fr: [
        ["Puissance", "6 ~ 1000 kVA"],
        ["Application", "Prime / Secours"],
        ["Carburant", "Diesel"],
        ["Niveau sonore", "65–88 dBA @ 7m (75% charge)"],
        ["Température ambiante", "-10 ~ 40°C"],
        ["Protection boîtier", "IP23 / IP44 (armoire)"],
        ["Réservoir", "8h @ 75% charge"],
        ["Tôlerie", "2mm galvanisé"],
        ["Composants électriques", "Chint"],
        ["Certification", "CE, ISO8528"],
      ],
      en: [
        ["Power", "6 ~ 1000 kVA"],
        ["Application", "Prime / Standby"],
        ["Fuel", "Diesel"],
        ["Noise Level", "65–88 dBA @ 7m (75% load)"],
        ["Ambient Temperature", "-10 ~ 40°C"],
        ["Enclosure Protection", "IP23 / IP44 (control cabinet)"],
        ["Fuel Tank", "8h @ 75% load"],
        ["Sheet Metal", "2mm galvanized"],
        ["Electrical Components", "Chint"],
        ["Certification", "CE, ISO8528"],
      ],
    },
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM SE",
    subtitle: "Silent-type SE · 6 à 1000 kVA · Diesel",
    kva: "1000 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSE,
    type: "closed",
    specs: {
      fr: [
        ["Puissance", "6 ~ 1000 kVA"],
        ["Application", "Secours"],
        ["Carburant", "Diesel"],
        ["Niveau sonore", "70–90 dBA @ 7m (75% charge)"],
        ["Température ambiante", "-10 ~ 40°C"],
        ["Protection boîtier", "IP23 / IP44 (armoire)"],
        ["Réservoir", "8h @ 75% charge"],
        ["Tôlerie", "2mm acier au carbone"],
        ["Composants électriques", "Chint"],
        ["Certification", "CE, ISO8528"],
      ],
      en: [
        ["Power", "6 ~ 1000 kVA"],
        ["Application", "Standby"],
        ["Fuel", "Diesel"],
        ["Noise Level", "70–90 dBA @ 7m (75% load)"],
        ["Ambient Temperature", "-10 ~ 40°C"],
        ["Enclosure Protection", "IP23 / IP44 (control cabinet)"],
        ["Fuel Tank", "8h @ 75% load"],
        ["Sheet Metal", "2mm carbon steel"],
        ["Electrical Components", "Chint"],
        ["Certification", "CE, ISO8528"],
      ],
    },
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SREU",
    subtitle: "Europe Rental EURO 5 · 6 à 650 kVA · Diesel",
    kva: "650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSREU,
    type: "closed",
    specs: {
      fr: [
        ["Puissance", "6 ~ 650 kVA"],
        ["Application", "Prime / Secours"],
        ["Carburant", "Diesel"],
        ["Niveau sonore", "65–71 dBA @ 7m (75% charge)"],
        ["Température ambiante", "-10 ~ 40°C"],
        ["Protection boîtier", "IP23 / IP44 (armoire)"],
        ["Réservoir", "8h @ 75% charge"],
        ["Tôlerie", "2mm galvanisé"],
        ["Composants électriques", "ABB / Schneider"],
        ["Norme", "EURO 5"],
        ["Certification", "CE, ISO8528"],
      ],
      en: [
        ["Power", "6 ~ 650 kVA"],
        ["Application", "Prime / Standby"],
        ["Fuel", "Diesel"],
        ["Noise Level", "65–71 dBA @ 7m (75% load)"],
        ["Ambient Temperature", "-10 ~ 40°C"],
        ["Enclosure Protection", "IP23 / IP44 (control cabinet)"],
        ["Fuel Tank", "8h @ 75% load"],
        ["Sheet Metal", "2mm galvanized"],
        ["Electrical Components", "ABB / Schneider"],
        ["Standard", "EURO 5"],
        ["Certification", "CE, ISO8528"],
      ],
    },
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM SC",
    subtitle: "Container-type · ≥ 500 kVA · Diesel",
    kva: "≥ 500 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSC,
    type: "closed",
    specs: {
      fr: [
        ["Puissance", "≥ 500 kVA"],
        ["Application", "Prime / Secours"],
        ["Carburant", "Diesel"],
        ["Niveau sonore", "80–90 dBA @ 7m (75% charge)"],
        ["Température ambiante", "-10 ~ 40°C"],
        ["Protection boîtier", "IP23 / IP44 (armoire)"],
        ["Réservoir", "Réservoir indépendant"],
        ["Structure", "Standard conteneur"],
        ["Composants électriques", "Chint"],
        ["Certification", "CE, ISO8528"],
      ],
      en: [
        ["Power", "≥ 500 kVA"],
        ["Application", "Prime / Standby"],
        ["Fuel", "Diesel"],
        ["Noise Level", "80–90 dBA @ 7m (75% load)"],
        ["Ambient Temperature", "-10 ~ 40°C"],
        ["Enclosure Protection", "IP23 / IP44 (control cabinet)"],
        ["Fuel Tank", "Independent fuel tank"],
        ["Structure", "Container standard"],
        ["Electrical Components", "Chint"],
        ["Certification", "CE, ISO8528"],
      ],
    },
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM OE-500",
    subtitle: "Open-type Genset · 500 kVA · Diesel",
    kva: "500 kVA",
    year: "TBD",
    fuel: "Diesel",
    img: genOE500,
    type: "open",
    description: {
      fr: "Groupe électrogène industriel de type ouvert équipé d'un moteur Cummins QSZ13-G3. Conçu pour les applications Prime et Secours nécessitant une puissance élevée, il offre une consommation de carburant optimisée et une grande fiabilité pour les sites industriels, chantiers de construction et installations permanentes.",
      en: "Industrial open-type generator set powered by a Cummins QSZ13-G3 engine. Designed for prime and standby applications requiring high power output, it delivers optimised fuel consumption and high reliability for industrial sites, construction sites, and permanent installations.",
    },
    included: {
      fr: [
        "Moteur Cummins QSZ13-G3 (13L, 6 cylindres)",
        "Alternateur TAL A473 C",
        "Tableau de contrôle DSE 8610 MKII",
        "Test de charge en usine (0% à 110%)",
        "Certifié CE et ISO8528",
      ],
      en: [
        "Cummins QSZ13-G3 engine (13L, 6 cylinders)",
        "TAL A473 C alternator",
        "DSE 8610 MKII control panel",
        "Factory load test (0% to 110%)",
        "CE and ISO8528 certified",
      ],
    },
    specs: {
      fr: [
        ["Puissance Prime", "500 kVA / 400 kW"],
        ["Puissance Secours", "550 kVA / 440 kW"],
        ["Application", "Prime / Secours"],
        ["Carburant", "Diesel"],
        ["Moteur", "Cummins QSZ13-G3"],
        ["Vitesse nominale", "1500 tr/min (50Hz)"],
        ["Alternateur", "TAL A473 C"],
        ["Système de refroidissement", "Refroidi par eau"],
        ["Dimensions (L×l×H)", "3560 × 1380 × 2080 mm"],
        ["Poids net", "3490 kg"],
        ["Température ambiante", "+5°C ~ +50°C"],
        ["Certification", "CE, ISO8528, ISO3046"],
      ],
      en: [
        ["Prime Power", "500 kVA / 400 kW"],
        ["Standby Power", "550 kVA / 440 kW"],
        ["Application", "Prime / Standby"],
        ["Fuel", "Diesel"],
        ["Engine", "Cummins QSZ13-G3"],
        ["Rated Speed", "1500 RPM (50Hz)"],
        ["Alternator", "TAL A473 C"],
        ["Cooling System", "Water cooled"],
        ["Dimensions (L×W×H)", "3560 × 1380 × 2080 mm"],
        ["Net Weight", "3490 kg"],
        ["Ambient Temperature", "+5°C ~ +50°C"],
        ["Certification", "CE, ISO8528, ISO3046"],
      ],
    },
  },
], "new");

export const usedProducts: Product[] = enrich([
  { stock: "EN STOCK", name: "ROTOM RU-150", subtitle: "150 kVA — Diesel Generator Occasion", kva: "150 kVA", year: "2018", fuel: "Diesel", img: genCummins, type: "closed" },
  { stock: "EN STOCK", name: "ROTOM RU-220", subtitle: "220 kVA — Diesel Generator Occasion", kva: "220 kVA", year: "2019", fuel: "Diesel", img: genCat, type: "closed" },
  { stock: "EN STOCK", name: "ROTOM RU-250", subtitle: "250 kVA — Diesel Generator Occasion", kva: "250 kVA", year: "2017", fuel: "Diesel", img: genPerkins, type: "open" },
  { stock: "SUR COMMANDE", name: "ROTOM RU-275", subtitle: "275 kVA — Diesel Generator Occasion", kva: "275 kVA", year: "2020", fuel: "Diesel", img: genFgWilson, type: "closed" },
  { stock: "EN STOCK", name: "ROTOM RU-330", subtitle: "330 kVA — Diesel Generator Occasion", kva: "330 kVA", year: "2018", fuel: "Diesel", img: genVolvo, type: "open" },
  { stock: "EN STOCK", name: "ROTOM RU-710", subtitle: "710 kVA — Diesel Generator Occasion", kva: "710 kVA", year: "2016", fuel: "Diesel", img: genDoosan, type: "open" },
], "used");

export const allProducts: Product[] = [...newProducts, ...usedProducts];

export const findProductBySlug = (slug: string) => allProducts.find((p) => p.slug === slug);
