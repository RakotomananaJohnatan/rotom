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
import genSC from "@/assets/gen-sc.png";
import genOE500 from "@/assets/gen-oe500.jpg";
import type { Product } from "@/components/ProductCard";

export const brands = ["ROTOM"];

export type ProductType = "open" | "closed";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Auto-classify generator type from the model code (the token after "ROTOM ").
// Convention: codes starting with "S" → closed (silent), starting with "O" → open.
// Returns null when the name doesn't match the convention (fallback to explicit type).
export const inferTypeFromName = (name: string): ProductType | null => {
  const match = name.trim().match(/^ROTOM\s+([A-Z]+)/i);
  if (!match) return null;
  const code = match[1].toUpperCase();
  if (code.startsWith("S")) return "closed";
  if (code.startsWith("O")) return "open";
  return null;
};

const enrich = (
  list: (Omit<Product, "slug" | "condition"> & { type: ProductType })[],
  condition: "new" | "used"
): Product[] =>
  list.map((p) => ({
    ...p,
    type: inferTypeFromName(p.name) ?? p.type,
    condition,
    slug: slugify(p.name),
  }));

// ROTOM silent-type genset catalogs (all silent diesel).
// `kva` stores the upper power bound used by the catalog slider filter.
// The full power range is shown in the subtitle.
// Ordered spec keys shared by all silent-type ROTOM datasheets.
type SpecKey =
  | "application" | "power" | "temp" | "rainproof" | "sandproof"
  | "corrosionHousing" | "corrosionChassis" | "noise" | "fuelTank"
  | "smBox" | "smChassis" | "smTank"
  | "cabinetInstall" | "cabinetIP" | "wiringProtection" | "battery"
  | "mainElec" | "parallel" | "amf" | "ats" | "sockets"
  | "grounding" | "outlets" | "compliance"
  | "locks" | "microPlate" | "fillerPipe" | "drainage"
  | "oil" | "exhaust" | "inspection"
  | "storage";

const specLabels: Record<SpecKey, { fr: string; en: string }> = {
  application: { fr: "Scénario d'application", en: "Application scenario" },
  power: { fr: "Puissance", en: "Power" },
  temp: { fr: "Température ambiante", en: "Ambient temperature" },
  rainproof: { fr: "Protection - étanche à la pluie", en: "Protection class - rainproof" },
  sandproof: { fr: "Protection - étanche au sable", en: "Protection class - sandproof" },
  corrosionHousing: { fr: "Anti-corrosion - carrosserie", en: "Anti-corrosion grade - housing" },
  corrosionChassis: { fr: "Anti-corrosion - châssis", en: "Anti-corrosion grade - chassis" },
  noise: { fr: "Plage de bruit (dBA)", en: "Noise Range (dBA)" },
  fuelTank: { fr: "Réservoir de carburant", en: "Fuel Tank" },
  smBox: { fr: "Tôlerie - caisson", en: "Sheet Metal Processing - box" },
  smChassis: { fr: "Tôlerie - châssis", en: "Sheet Metal used - chassis" },
  smTank: { fr: "Tôlerie - réservoir", en: "Sheet Metal fuel tank" },
  cabinetInstall: { fr: "Installation de l'armoire de contrôle", en: "Control cabinet installation" },
  cabinetIP: { fr: "Classe de protection de l'armoire", en: "Protection class of cabinet" },
  wiringProtection: { fr: "Protection du câblage groupe-armoire", en: "Generator to control cabinet wiring protection" },
  battery: { fr: "Batterie de démarrage", en: "Starting battery" },
  mainElec: { fr: "Configuration des composants électriques", en: "Main electrical component configuration" },
  parallel: { fr: "Fonction parallèle en option", en: "Optional parallel function" },
  amf: { fr: "AMF", en: "AMF" },
  ats: { fr: "Fonction ATS en option", en: "ATS Function option" },
  sockets: { fr: "Prises optionnelles", en: "Optional sockets" },
  grounding: { fr: "Mise à la terre", en: "Grounding" },
  outlets: { fr: "Sorties de câblage client", en: "Customer wiring outlets" },
  compliance: { fr: "Conformité", en: "Compliance" },
  locks: { fr: "Serrures & charnières", en: "Door locks & Hinges" },
  microPlate: { fr: "Plaque micro-perforée", en: "Micro perforated plate" },
  fillerPipe: { fr: "Tuyau de remplissage", en: "Fuel filler pipe" },
  drainage: { fr: "Drainage", en: "Drainage" },
  oil: { fr: "Composants huile", en: "Oil components" },
  exhaust: { fr: "Pièces d'échappement", en: "Exhaust parts" },
  inspection: { fr: "Porte d'inspection", en: "Inspection door" },
  storage: { fr: "Conteneurisation et stockage", en: "Containerization and storage" },
};

const specSections: { fr: string; en: string; keys: SpecKey[] }[] = [
  { fr: "Fonctionnement et configuration", en: "Operation and Configuration",
    keys: ["application","power","temp","rainproof","sandproof","corrosionHousing","corrosionChassis","noise","fuelTank"] },
  { fr: "Tôlerie", en: "Sheet Metal Processing",
    keys: ["smBox","smChassis","smTank"] },
  { fr: "Système de contrôle électrique", en: "Electrical Control System",
    keys: ["cabinetInstall","cabinetIP","wiringProtection","battery","mainElec","parallel","amf","ats","sockets","grounding","outlets","compliance"] },
  { fr: "Assemblage complet", en: "Complete Assembly",
    keys: ["locks","microPlate","fillerPipe","drainage","oil","exhaust","inspection"] },
  { fr: "Stockage", en: "Storage",
    keys: ["storage"] },
];

const buildSpecs = (values: Record<SpecKey, string>): { fr: [string, string][]; en: [string, string][] } => {
  const fr: [string, string][] = [];
  const en: [string, string][] = [];
  for (const section of specSections) {
    fr.push([section.fr, ""]);
    en.push([section.en, ""]);
    for (const k of section.keys) {
      fr.push([specLabels[k].fr, values[k]]);
      en.push([specLabels[k].en, values[k]]);
    }
  }
  return { fr, en };
};

const specsSR = (() => {
  const base = buildSpecs({
    application: "Prime / Standby",
    power: "6-650 kVA",
    temp: "-10 ~ 40°C",
    rainproof: "IP23 protection. No rain leakage on key parts. No splashing on main engine parts, chassis with drainage design. IP44 design for control cabinet",
    sandproof: "Optional sand protection / Heavy-duty air filter / Desert air filter / Removable air inlet filter",
    corrosionHousing: "1 - 80μm thickness, outdoor powder. Bright, outdoor three years/C3. Except for the corners, no obvious rust stains. 2 - Optional five years",
    corrosionChassis: "Low power blasting, high power sand blasting; 80um thickness, outdoor sanding powder",
    noise: "65-80@7m 75% Load",
    fuelTank: "8h @ 75% Load",
    smBox: "2mm Galvanized",
    smChassis: "4~5mm",
    smTank: "3mm",
    cabinetInstall: "Side of the box",
    cabinetIP: "IP44",
    wiringProtection: "Organ tube",
    battery: "Varta Battery, Domestic Battery Switch",
    mainElec: "Standard with Chint and domestic components",
    parallel: "Built-in simple parallel connection",
    amf: "Standard",
    ats: "160A and below ATS can be built-in",
    sockets: "Optional sockets and switch box",
    grounding: "Ground Strip Design",
    outlets: "BUSBAR at breaker's output terminals",
    compliance: "CE certification and ISO8528",
    locks: "Zinc Alloy Hinges / Carbon Steel Door Locks / Stainless Steel Door Lock",
    microPlate: "Optional",
    fillerPipe: "External locking",
    drainage: "All sewage connections to the sump",
    oil: "Manual oil drain pump",
    exhaust: "Exhaust insulation wrap",
    inspection: "Rock wool + mesh plate",
    storage: "6-30kVA stackable",
  });
  const frMap: Record<string, string> = {
    "Scénario d'application": "Prime / Secours",
    "Protection - étanche à la pluie":
      "Protection IP23. Pas de fuite sur les pièces clés. Pas d'éclaboussures sur les pièces du moteur principal, châssis avec conception de drainage. IP44 pour l'armoire de contrôle",
    "Protection - étanche au sable":
      "Protection sable optionnelle / Filtre à air haute résistance / Filtre à air désert / Filtre à air amovible",
    "Anti-corrosion - carrosserie":
      "1 - Épaisseur 80μm, poudre extérieure. Brillant, trois ans extérieur/C3. Sauf aux coins, pas de traces de rouille visibles. 2 - Option cinq ans",
    "Anti-corrosion - châssis":
      "Grenaillage faible puissance, sablage haute puissance ; épaisseur 80μm, poudre de sablage extérieure",
    "Plage de bruit (dBA)": "65-80@7m 75% charge",
    "Réservoir de carburant": "8h @ 75% charge",
    "Tôlerie - caisson": "2mm galvanisé",
    "Installation de l'armoire de contrôle": "Côté du caisson",
    "Protection du câblage groupe-armoire": "Tube organe",
    "Batterie de démarrage": "Batterie Varta, interrupteur batterie domestique",
    "Configuration des composants électriques": "Standard avec Chint et composants domestiques",
    "Fonction parallèle en option": "Connexion parallèle simple intégrée",
    "Fonction ATS en option": "ATS 160A et moins peut être intégré",
    "Prises optionnelles": "Prises optionnelles et boîte à interrupteurs",
    "Mise à la terre": "Conception bande de mise à la terre",
    "Conformité": "Certification CE et ISO8528",
    "Serrures & charnières": "Charnières en alliage de zinc / Serrures de porte en acier carbone / Serrure de porte en acier inoxydable",
    "Plaque micro-perforée": "Optionnel",
    "Tuyau de remplissage": "Verrouillage externe",
    "Drainage": "Toutes les évacuations connectées au puisard",
    "Composants huile": "Pompe de vidange d'huile manuelle",
    "Pièces d'échappement": "Enroulement isolant d'échappement",
    "Porte d'inspection": "Laine de roche + plaque de grillage",
    "Conteneurisation et stockage": "Empilable 6-30 kVA",
  };
  return {
    fr: base.fr.map(([label, value]) => [label, frMap[label] ?? value]),
    en: base.en,
  };
})();

const specsSRAU = buildSpecs({
  application: "Prime / Standby",
  power: "6-650 kVA",
  temp: "-10 ~ 40°C",
  rainproof: "IP23 protection. No rain leakage in critical areas. No splashing on the main engine components, chassis with drainage design. IP44 design for control cabinet",
  sandproof: "Optional sand protection / Heavy-duty air filter / Desert air filter / Removable air inlet filter",
  corrosionHousing: "1 - 80μm thickness, outdoor powder. Glossy, outdoor three years/C3. Except for the corners, no obvious rust stains. 2 - Optional five years",
  corrosionChassis: "Low power blasting, high power sand blasting; 80um thickness, outdoor sanding powder not available",
  noise: "65-80@7m 75% Load",
  fuelTank: "12h @ 100% Load",
  smBox: "2mm Galvanized",
  smChassis: "4~6mm",
  smTank: "3mm",
  cabinetInstall: "Side of the box",
  cabinetIP: "IP44",
  wiringProtection: "Organ tube",
  battery: "Varta Battery, Domestic Battery Switch",
  mainElec: "ABB / Schneider",
  parallel: "Built-in simple parallel connection",
  amf: "Standard",
  ats: "Built-in ATS up to 160A",
  sockets: "Optional sockets and switch box",
  grounding: "Ground Strip Design",
  outlets: "BUSBAR at breaker's output terminals",
  compliance: "CE certification and ISO8528",
  locks: "Stainless Steel Door Lock Hinge",
  microPlate: "Yes",
  fillerPipe: "External locking",
  drainage: "All sewage connections to the sump",
  oil: "Manual oil drain pump",
  exhaust: "Exhaust insulation sleeve",
  inspection: "Rock wool + mesh plate",
  storage: "6-30kVA stackable",
});

const specsSR2 = buildSpecs({
  application: "Prime / Standby",
  power: "6-1000 kVA",
  temp: "-10 ~ 40°C",
  rainproof: "IP23 protection. No rain leakage in critical areas. IP44 design for control cabinet",
  sandproof: "N/A",
  corrosionHousing: "80μm thickness, outdoor powder. Glossy, outdoor three years/C3. No visible rust except at the corners",
  corrosionChassis: "Low power shot peening, high power sandblasting; 80um thickness, outdoor small sand grain powder coating",
  noise: "65-88@7m 75% Load",
  fuelTank: "8h @ 75% Load",
  smBox: "2mm Galvanized",
  smChassis: "4~5mm",
  smTank: "3mm",
  cabinetInstall: "Side of the box",
  cabinetIP: "IP44",
  wiringProtection: "Wave tube or Organ tube",
  battery: "Varta Battery, Domestic Battery Switch",
  mainElec: "CHINT",
  parallel: "Built-in simple parallel connection",
  amf: "Standard",
  ats: "160A and below ATS can be built-in",
  sockets: "Optional sockets and switch box",
  grounding: "Ground Strip Design",
  outlets: "BUSBAR at breaker's output terminals",
  compliance: "CE certification and ISO8528",
  locks: "Carbon Steel Hinge / Carbon Steel Door Lock",
  microPlate: "No",
  fillerPipe: "Built-in",
  drainage: "No connection, sump hole",
  oil: "Manual oil drain pump",
  exhaust: "Exhaust insulation wrap",
  inspection: "Sea sponge",
  storage: "6-100kVA stackable",
});

const specsSE = buildSpecs({
  application: "Standby",
  power: "6-1000 kVA",
  temp: "-10 ~ 40°C",
  rainproof: "IP23 protection. No rain leakage in critical areas. IP44 design for control cabinet",
  sandproof: "N/A",
  corrosionHousing: "80μm thickness, domestic outdoor powder. Orange lines, outdoor two years/C2, no obvious rust",
  corrosionChassis: "Low power shot blasting, high power sand blasting; 80um thickness, outdoor small abrasive powder coating",
  noise: "70-90@7m 75% Load",
  fuelTank: "8h @ 75% Load",
  smBox: "2mm Carbon steel",
  smChassis: "4~5mm",
  smTank: "3mm",
  cabinetInstall: "Alternator end face of the box (Above 150kVA side of the box)",
  cabinetIP: "IP44",
  wiringProtection: "Wave tube or Organ tube",
  battery: "Varta Battery, Domestic Battery Switch",
  mainElec: "CHINT",
  parallel: "Built-in simple parallel connection",
  amf: "Standard",
  ats: "160A and below ATS can be built-in",
  sockets: "N/A",
  grounding: "Ground Strip Design",
  outlets: "BUSBAR at breaker's output terminals",
  compliance: "CE certification and ISO8528",
  locks: "Carbon Steel Hinge / Carbon Steel Door Lock",
  microPlate: "No",
  fillerPipe: "External locking",
  drainage: "No connection, sump hole",
  oil: "Manual oil drain pump",
  exhaust: "Exhaust insulation wrap",
  inspection: "Sea sponge",
  storage: "6-100kVA stackable",
});

const specsSREU = buildSpecs({
  application: "Prime / Standby",
  power: "6-650 kVA",
  temp: "-10 ~ 40°C",
  rainproof: "IP23 protection. No rain leakage in critical areas. IP44 design for control cabinet",
  sandproof: "Optional sand protection / Heavy Duty / Desert Air Filter / Removable air inlet filter",
  corrosionHousing: "1 - 80μm thickness, outdoor powder. Glossy, outdoor three years/C3. Except for the corners, no obvious rust stains. 2 - Optional five years",
  corrosionChassis: "Small power shot blasting, high power sand blasting; 80um thickness, outdoor small abrasive powder coating",
  noise: "65-71@7m 75% Load",
  fuelTank: "8h @ 75% Load",
  smBox: "2mm Galvanized",
  smChassis: "4~6mm",
  smTank: "3mm",
  cabinetInstall: "Side of the box",
  cabinetIP: "IP44",
  wiringProtection: "Organ tube",
  battery: "Varta Battery, Domestic Battery Switch",
  mainElec: "ABB / Schneider",
  parallel: "Built-in simple parallel connection",
  amf: "Standard",
  ats: "160A and below ATS can be built-in",
  sockets: "Optional sockets and Switch Box",
  grounding: "Ground Strip Design",
  outlets: "BUSBAR at breaker's output terminals",
  compliance: "CE certification and ISO8528",
  locks: "Stainless Steel Door Lock Hinge",
  microPlate: "Yes",
  fillerPipe: "External locking",
  drainage: "All sewage connections to the sump",
  oil: "Manual oil drain pump",
  exhaust: "Exhaust insulation wrap",
  inspection: "Rock wool + mesh plate",
  storage: "6-30kVA stackable",
});

const specsSC = buildSpecs({
  application: "Prime / Standby",
  power: "≥ 500 kVA",
  temp: "-10 ~ 40°C",
  rainproof: "IP23 protection. No rain leakage in generator compartment, chassis with drainage design. IP44 design for control cabinet",
  sandproof: "Optional sand protection / Heavy Duty / Desert Air Filter / Removable air inlet filter",
  corrosionHousing: "130-190μm thickness, polyurethane paint. C4, outdoor five years",
  corrosionChassis: "130-190μm thickness, polyurethane paint. C4, outdoor five years",
  noise: "80-90@7m 75% Load",
  fuelTank: "Independent Fuel Tank",
  smBox: "Container Standard",
  smChassis: "Container Standard",
  smTank: "3mm",
  cabinetInstall: "Side of the box",
  cabinetIP: "IP44",
  wiringProtection: "Organ tube",
  battery: "Varta Battery, Domestic Battery Switch",
  mainElec: "CHINT",
  parallel: "Built-in simple parallel connection",
  amf: "Standard",
  ats: "Built-in option",
  sockets: "Optional sockets and Switch Box",
  grounding: "Ground Strip Design",
  outlets: "BUSBAR at breaker's output terminals",
  compliance: "CE certification and ISO8528",
  locks: "Galvanized door lock hinge",
  microPlate: "Yes",
  fillerPipe: "Built-in (with built-in fuel tank)",
  drainage: "All drain connections to sump",
  oil: "Manual oil drain pump",
  exhaust: "Exhaust insulation wrap",
  inspection: "Container Standard",
  storage: "Stackable Storage",
});

export const newProducts: Product[] = enrich([
  {
    stock: "EN STOCK",
    name: "ROTOM SR",
    subtitle: "Rounded corners, With anti collision corner · 6 à 650 kVA · Diesel",
    kva: "6 à 650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSR,
    type: "closed",
    specs: specsSR,
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SRAU",
    subtitle: "Rounded corners/Right angle optional, With anti collision corner · 6 à 650 kVA · Diesel",
    kva: "6 à 650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSRAU,
    type: "closed",
    specs: specsSRAU,
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SR2",
    subtitle: "Right angle, Without anti collision · 6 à 1000 kVA · Diesel",
    kva: "6 à 1000 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSR2,
    type: "closed",
    specs: specsSR2,
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM SE",
    subtitle: "Right angle, Without anti collision · 6 à 1000 kVA · Diesel",
    kva: "6 à 1000 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSE,
    type: "closed",
    specs: specsSE,
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SREU",
    subtitle: "Rounded corners/Right angle optional, With anti collision corner · 6 à 650 kVA · Diesel",
    kva: "6 à 650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSREU,
    type: "closed",
    specs: specsSREU,
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM SC",
    subtitle: "Containerized · ≥ 500 kVA · Diesel",
    kva: "≥ 500 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSC,
    type: "closed",
    specs: specsSC,
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
        ["Puissance", "500 kVA"],
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
        ["Power", "500 kVA"],
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
