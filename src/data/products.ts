import genCummins from "@/assets/gen-cummins.jpg";
import genCat from "@/assets/gen-cat.jpg";
import genPerkins from "@/assets/gen-perkins.jpg";
import genFgWilson from "@/assets/gen-fgwilson.jpg";
import genVolvo from "@/assets/gen-volvo.jpg";
import genDoosan from "@/assets/gen-doosan.jpg";
import genSRAsset from "@/assets/rotom-sr.png";
import genSRAUAsset from "@/assets/rotom-srau.png";
import genSR2Asset from "@/assets/rotom-sr2.png";
import genSEAsset from "@/assets/rotom-se.png";
import genSREUAsset from "@/assets/rotom-sreu.png";
import genSCAsset from "@/assets/rotom-sc.png";
import genOE500Asset from "@/assets/rotom-oe-500.jpg";
import used60kvaAsset from "@/assets/used-60kva.jpeg";
import used30kvaAsset from "@/assets/used-30kva.jpeg";
import used20kvaAsset from "@/assets/used-20kva.jpeg";
import used13kvaAsset from "@/assets/used-13kva.jpg";
import used250kvaAsset from "@/assets/used-250kva.jpg";
import used275kvaAsset from "@/assets/275kva-200kw.jpg";
import used375kvaAsset from "@/assets/375-kva-300kw.jpg";
import used410kvaAsset from "@/assets/410kva-328kw.jpg";
import used500kvaAsset from "@/assets/500-kva-400kw.jpg";
import used640kvaAsset from "@/assets/640kva-512kw.jpg";
import used675kvaAsset from "@/assets/675-kva-540kw.jpg";
import used700kvaAsset from "@/assets/700kva-560kw.jpg";
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
    fr: base.fr.map(([label, value]) => [label, frMap[label] ?? value]) as [string, string][],
    en: base.en,
  };
})();

const specsSRAU = (() => {
  const base = buildSpecs({
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
  const frMap: Record<string, string> = {
    "Scénario d'application": "Prime / Secours",
    "Protection - étanche à la pluie": "Protection IP23. Pas de fuite dans les zones critiques. Pas d'éclaboussures sur les composants du moteur principal, châssis avec conception de drainage. IP44 pour l'armoire de contrôle",
    "Protection - étanche au sable": "Protection sable optionnelle / Filtre à air haute résistance / Filtre à air désert / Filtre à air amovible",
    "Anti-corrosion - carrosserie": "1 - Épaisseur 80μm, poudre extérieure. Brillant, trois ans extérieur/C3. Sauf aux coins, pas de traces de rouille visibles. 2 - Option cinq ans",
    "Anti-corrosion - châssis": "Grenaillage faible puissance, sablage haute puissance ; épaisseur 80μm, poudre de sablage non disponible",
    "Plage de bruit (dBA)": "65-80@7m 75% charge",
    "Réservoir de carburant": "12h @ 100% charge",
    "Tôlerie - caisson": "2mm galvanisé",
    "Installation de l'armoire de contrôle": "Côté du caisson",
    "Protection du câblage groupe-armoire": "Tube organe",
    "Batterie de démarrage": "Batterie Varta, interrupteur batterie domestique",
    "Configuration des composants électriques": "ABB/Schneider",
    "Fonction parallèle en option": "Connexion parallèle simple intégrée",
    "Fonction ATS en option": "ATS intégré jusqu'à 160A",
    "Prises optionnelles": "Prises optionnelles et boîte à interrupteurs",
    "Mise à la terre": "Conception bande de mise à la terre",
    "Sorties de câblage client": "BUSBAR aux bornes de sortie du disjoncteur",
    "Conformité": "Certification CE et ISO8528",
    "Serrures & charnières": "Charnière de porte en acier inoxydable",
    "Plaque micro-perforée": "Oui",
    "Tuyau de remplissage": "Verrouillage externe",
    "Drainage": "Toutes les évacuations connectées au puisard",
    "Composants huile": "Pompe de vidange d'huile manuelle",
    "Pièces d'échappement": "Manchon isolant d'échappement",
    "Porte d'inspection": "Laine de roche + plaque de grillage",
    "Conteneurisation et stockage": "Empilable 6-30 kVA",
  };
  return {
    fr: base.fr.map(([label, value]) => [label, frMap[label] ?? value]) as [string, string][],
    en: base.en,
  };
})();

const specsSR2 = (() => {
  const base = buildSpecs({
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
  const frMap: Record<string, string> = {
    "Scénario d'application": "Prime / Secours",
    "Protection - étanche à la pluie": "Protection IP23. Pas de fuite dans les zones critiques. IP44 pour l'armoire de contrôle",
    "Protection - étanche au sable": "N/A",
    "Anti-corrosion - carrosserie": "Épaisseur 80μm, poudre extérieure. Brillant, trois ans extérieur/C3. Pas de rouille visible sauf aux coins",
    "Anti-corrosion - châssis": "Grenaillage faible puissance, sablage haute puissance ; épaisseur 80μm, revêtement poudre grain fin extérieur",
    "Plage de bruit (dBA)": "65-88@7m 75% charge",
    "Réservoir de carburant": "8h @ 75% charge",
    "Tôlerie - caisson": "2mm galvanisé",
    "Installation de l'armoire de contrôle": "Côté du caisson",
    "Protection du câblage groupe-armoire": "Tube ondulé ou tube organe",
    "Batterie de démarrage": "Batterie Varta, interrupteur batterie domestique",
    "Fonction parallèle en option": "Connexion parallèle simple intégrée",
    "Fonction ATS en option": "ATS 160A et moins peut être intégré",
    "Prises optionnelles": "Prises optionnelles et boîte à interrupteurs",
    "Mise à la terre": "Conception bande de mise à la terre",
    "Sorties de câblage client": "BUSBAR aux bornes de sortie du disjoncteur",
    "Conformité": "Certification CE et ISO8528",
    "Serrures & charnières": "Charnière en acier carbone / Serrure de porte en acier carbone",
    "Plaque micro-perforée": "Non",
    "Tuyau de remplissage": "Intégré",
    "Drainage": "Pas de connexion, trou de puisard",
    "Composants huile": "Pompe de vidange d'huile manuelle",
    "Pièces d'échappement": "Enroulement isolant d'échappement",
    "Porte d'inspection": "Éponge marine",
    "Conteneurisation et stockage": "Empilable 6-100 kVA",
  };
  return {
    fr: base.fr.map(([label, value]) => [label, frMap[label] ?? value]) as [string, string][],
    en: base.en,
  };
})();

const specsSE = (() => {
  const base = buildSpecs({
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
  const frMap: Record<string, string> = {
    "Scénario d'application": "Secours",
    "Protection - étanche à la pluie": "Protection IP23. Pas de fuite dans les zones critiques. IP44 pour l'armoire de contrôle",
    "Protection - étanche au sable": "N/A",
    "Anti-corrosion - carrosserie": "Épaisseur 80μm, poudre extérieure domestique. Lignes oranges, deux ans extérieur/C2, pas de rouille visible",
    "Anti-corrosion - châssis": "Grenaillage faible puissance, sablage haute puissance ; épaisseur 80μm, revêtement poudre abrasive fine extérieure",
    "Plage de bruit (dBA)": "70-90@7m 75% charge",
    "Réservoir de carburant": "8h @ 75% charge",
    "Tôlerie - caisson": "2mm acier carbone",
    "Installation de l'armoire de contrôle": "Face de l'alternateur du caisson (Au-dessus de 150kVA, côté du caisson)",
    "Protection du câblage groupe-armoire": "Tube ondulé ou tube organe",
    "Batterie de démarrage": "Batterie Varta, interrupteur batterie domestique",
    "Fonction parallèle en option": "Connexion parallèle simple intégrée",
    "Fonction ATS en option": "ATS 160A et moins peut être intégré",
    "Prises optionnelles": "N/A",
    "Mise à la terre": "Conception bande de mise à la terre",
    "Sorties de câblage client": "BUSBAR aux bornes de sortie du disjoncteur",
    "Conformité": "Certification CE et ISO8528",
    "Serrures & charnières": "Charnière en acier carbone / Serrure de porte en acier carbone",
    "Plaque micro-perforée": "Non",
    "Tuyau de remplissage": "Verrouillage externe",
    "Drainage": "Pas de connexion, trou de puisard",
    "Composants huile": "Pompe de vidange d'huile manuelle",
    "Pièces d'échappement": "Enroulement isolant d'échappement",
    "Porte d'inspection": "Éponge marine",
    "Conteneurisation et stockage": "Empilable 6-100 kVA",
  };
  return {
    fr: base.fr.map(([label, value]) => [label, frMap[label] ?? value]) as [string, string][],
    en: base.en,
  };
})();

const specsSREU = (() => {
  const base = buildSpecs({
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
  const frMap: Record<string, string> = {
    "Scénario d'application": "Prime / Secours",
    "Protection - étanche à la pluie": "Protection IP23. Pas de fuite dans les zones critiques. IP44 pour l'armoire de contrôle",
    "Protection - étanche au sable": "Protection sable optionnelle / Filtre à air haute résistance/désert / Filtre à air amovible",
    "Anti-corrosion - carrosserie": "1 - Épaisseur 80μm, poudre extérieure. Brillant, trois ans extérieur/C3. Sauf aux coins, pas de traces de rouille visibles. 2 - Option cinq ans",
    "Anti-corrosion - châssis": "Grenaillage faible puissance, sablage haute puissance ; épaisseur 80μm, revêtement poudre abrasive fine extérieure",
    "Plage de bruit (dBA)": "65-71@7m 75% charge",
    "Réservoir de carburant": "8h @ 75% charge",
    "Tôlerie - caisson": "2mm galvanisé",
    "Installation de l'armoire de contrôle": "Côté du caisson",
    "Protection du câblage groupe-armoire": "Tube organe",
    "Batterie de démarrage": "Batterie Varta, interrupteur batterie domestique",
    "Configuration des composants électriques": "ABB/Schneider",
    "Fonction parallèle en option": "Connexion parallèle simple intégrée",
    "Fonction ATS en option": "ATS 160A et moins peut être intégré",
    "Prises optionnelles": "Prises optionnelles et boîte à interrupteurs",
    "Mise à la terre": "Conception bande de mise à la terre",
    "Sorties de câblage client": "BUSBAR aux bornes de sortie du disjoncteur",
    "Conformité": "Certification CE et ISO8528",
    "Serrures & charnières": "Charnière de porte en acier inoxydable",
    "Plaque micro-perforée": "Oui",
    "Tuyau de remplissage": "Verrouillage externe",
    "Drainage": "Toutes les évacuations connectées au puisard",
    "Composants huile": "Pompe de vidange d'huile manuelle",
    "Pièces d'échappement": "Enroulement isolant d'échappement",
    "Porte d'inspection": "Laine de roche + plaque de grillage",
    "Conteneurisation et stockage": "Empilable 6-30 kVA",
  };
  return {
    fr: base.fr.map(([label, value]) => [label, frMap[label] ?? value]) as [string, string][],
    en: base.en,
  };
})();

const specsSC = (() => {
  const base = buildSpecs({
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
  const frMap: Record<string, string> = {
    "Scénario d'application": "Prime / Secours",
    "Protection - étanche à la pluie": "Protection IP23. Pas de fuite dans le compartiment générateur, châssis avec conception de drainage. IP44 pour l'armoire de contrôle",
    "Protection - étanche au sable": "Protection sable optionnelle / Filtre à air haute résistance/désert / Filtre à air amovible",
    "Anti-corrosion - carrosserie": "Épaisseur 130-190μm, peinture polyuréthane. C4, cinq ans extérieur",
    "Anti-corrosion - châssis": "Épaisseur 130-190μm, peinture polyuréthane. C4, cinq ans extérieur",
    "Plage de bruit (dBA)": "80-90@7m 75% charge",
    "Réservoir de carburant": "Réservoir de carburant indépendant",
    "Tôlerie - caisson": "Standard conteneur",
    "Tôlerie - châssis": "Standard conteneur",
    "Installation de l'armoire de contrôle": "Côté du caisson",
    "Protection du câblage groupe-armoire": "Tube organe",
    "Batterie de démarrage": "Batterie Varta, interrupteur batterie domestique",
    "Fonction parallèle en option": "Connexion parallèle simple intégrée",
    "Fonction ATS en option": "Option intégrée",
    "Prises optionnelles": "Prises optionnelles et boîte à interrupteurs",
    "Mise à la terre": "Conception bande de mise à la terre",
    "Sorties de câblage client": "BUSBAR aux bornes de sortie du disjoncteur",
    "Conformité": "Certification CE et ISO8528",
    "Serrures & charnières": "Charnière de porte galvanisée",
    "Plaque micro-perforée": "Oui",
    "Tuyau de remplissage": "Intégré (avec réservoir intégré)",
    "Drainage": "Toutes les évacuations connectées au puisard",
    "Composants huile": "Pompe de vidange d'huile manuelle",
    "Pièces d'échappement": "Enroulement isolant d'échappement",
    "Porte d'inspection": "Standard conteneur",
    "Conteneurisation et stockage": "Stockage empilable",
  };
  return {
    fr: base.fr.map(([label, value]) => [label, frMap[label] ?? value]) as [string, string][],
    en: base.en,
  };
})();

export const newProducts: Product[] = enrich([
  {
    stock: "EN STOCK",
    name: "ROTOM SR",
    subtitle: "i18n:products.new.sr.subtitle",
    kva: "6 à 650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSRAsset,
    type: "closed",
    specs: specsSR,
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SRAU",
    subtitle: "i18n:products.new.srau.subtitle",
    kva: "6 à 650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSRAUAsset,
    type: "closed",
    specs: specsSRAU,
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SR2",
    subtitle: "i18n:products.new.sr2.subtitle",
    kva: "6 à 1000 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSR2Asset,
    type: "closed",
    specs: specsSR2,
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM SE",
    subtitle: "i18n:products.new.se.subtitle",
    kva: "6 à 1000 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSEAsset,
    type: "closed",
    specs: specsSE,
  },
  {
    stock: "EN STOCK",
    name: "ROTOM SREU",
    subtitle: "i18n:products.new.sreu.subtitle",
    kva: "6 à 650 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSREUAsset,
    type: "closed",
    specs: specsSREU,
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM SC",
    subtitle: "i18n:products.new.sc.subtitle",
    kva: "≥ 500 kVA",
    year: "2024",
    fuel: "Diesel",
    img: genSCAsset,
    type: "closed",
    specs: specsSC,
  },
  {
    stock: "SUR COMMANDE",
    name: "ROTOM OE-500",
    subtitle: "i18n:products.new.oe500.subtitle",
    kva: "500 kVA",
    year: "TBD",
    fuel: "Diesel",
    img: genOE500Asset,
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

// Simple used-generator spec factory. Values are shown as-is on the product card / detail page.
// Labels are localized; values are kept identical across FR and EN except where a light FR
// wording improves readability (Canopy → Capoté, Open → Ouvert, Prime → Continue, Standby → Secours).
const makeUsedSpecs = (opts: {
  ratingsEn: string; ratingsFr: string;
  engine: string; alternator: string; speed: string; phase: string;
  fuelTank: string; fuelTankFr: string;
  control: string;
  soundEn: string; soundFr: string;
}): { fr: [string, string][]; en: [string, string][] } => ({
  en: [
    ["Ratings", opts.ratingsEn],
    ["Engine", opts.engine],
    ["Alternator", opts.alternator],
    ["Speed", opts.speed],
    ["Phase", opts.phase],
    ["Fuel Tank Capacity", opts.fuelTank],
    ["Control Panel", opts.control],
    ["Sound Proofing", opts.soundEn],
  ],
  fr: [
    ["Puissance nominale", opts.ratingsFr],
    ["Moteur", opts.engine],
    ["Alternateur", opts.alternator],
    ["Vitesse", opts.speed],
    ["Phase", opts.phase],
    ["Capacité du réservoir", opts.fuelTankFr],
    ["Panneau de contrôle", opts.control],
    ["Insonorisation", opts.soundFr],
  ],
});

type UsedSeed = {
  power: string; // e.g. "250 kVA / 200 kW"
  kva: string; // e.g. "250 kVA"
  ratingsEn: string; ratingsFr: string;
  engine: string; alternator: string;
  fuelTank: string; fuelTankFr: string;
  control: string;
  soundEn: "Canopy" | "Open"; soundFr: "Capoté" | "Ouvert";
};

const usedSeeds: UsedSeed[] = [
  { power: "250 kVA / 200 kW", kva: "250 kVA", ratingsEn: "250 kVA / 200 kW (Standby)", ratingsFr: "250 kVA / 200 kW (Secours)", engine: "Perkins 1300 series", alternator: "Leroy Somer / FG Wilson", fuelTank: "Standard 503-liter spill containment tank", fuelTankFr: "Réservoir standard 503 L à rétention", control: "DSE7320/8610", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "675 kVA / 540 kW", kva: "675 kVA", ratingsEn: "675 kVA / 540 kW (Prime)", ratingsFr: "675 kVA / 540 kW (Continue)", engine: "Perkins 1300 series", alternator: "Leroy Somer", fuelTank: "Standard 600-liter spill containment tank", fuelTankFr: "Réservoir standard 600 L à rétention", control: "DSE7320/8610", soundEn: "Open", soundFr: "Ouvert" },
  { power: "500 kVA / 400 kW", kva: "500 kVA", ratingsEn: "500 kVA / 400 kW (Prime)", ratingsFr: "500 kVA / 400 kW (Continue)", engine: "Doosan KZ550", alternator: "Mecc alte", fuelTank: "Standard 600-liter spill containment tank", fuelTankFr: "Réservoir standard 600 L à rétention", control: "DSE8610", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "640 kVA / 512 kW", kva: "640 kVA", ratingsEn: "640 kVA / 512 kW (Prime)", ratingsFr: "640 kVA / 512 kW (Continue)", engine: "Doosan Bobcat PG710", alternator: "Mecalt", fuelTank: "Standard 600-liter spill containment tank", fuelTankFr: "Réservoir standard 600 L à rétention", control: "DSE8610", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "60 kVA / 50 kW", kva: "60 kVA", ratingsEn: "60 kVA / 50 kW (Prime)", ratingsFr: "60 kVA / 50 kW (Continue)", engine: "Cummins Bobcat", alternator: "Stamford", fuelTank: "Standard 60-liter spill containment tank", fuelTankFr: "Réservoir standard 60 L à rétention", control: "DSE", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "30 kVA / 24 kW", kva: "30 kVA", ratingsEn: "30 kVA / 24 kW (Prime)", ratingsFr: "30 kVA / 24 kW (Continue)", engine: "Cummins Bobcat", alternator: "Stamford", fuelTank: "Standard 50-liter spill containment tank", fuelTankFr: "Réservoir standard 50 L à rétention", control: "DSE", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "20 kVA / 16 kW", kva: "20 kVA", ratingsEn: "20 kVA / 16 kW (Prime)", ratingsFr: "20 kVA / 16 kW (Continue)", engine: "Cummins Bobcat", alternator: "Stamford", fuelTank: "Standard 40-liter spill containment tank", fuelTankFr: "Réservoir standard 40 L à rétention", control: "DSE", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "375 kVA / 300 kW", kva: "375 kVA", ratingsEn: "375 kVA / 300 kW (Prime)", ratingsFr: "375 kVA / 300 kW (Continue)", engine: "Cummins", alternator: "Leroy Somer", fuelTank: "Standard 400-liter spill containment tank", fuelTankFr: "Réservoir standard 400 L à rétention", control: "DSE", soundEn: "Open", soundFr: "Ouvert" },
  { power: "13 kVA / 10 kW", kva: "13 kVA", ratingsEn: "13 kVA / 10 kW (Prime)", ratingsFr: "13 kVA / 10 kW (Continue)", engine: "Himoinsa", alternator: "Leroy Somer", fuelTank: "Standard 30-liter spill containment tank", fuelTankFr: "Réservoir standard 30 L à rétention", control: "—", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "275 kVA / 200 kW", kva: "275 kVA", ratingsEn: "275 kVA / 200 kW (Prime)", ratingsFr: "275 kVA / 200 kW (Continue)", engine: "Perkins", alternator: "Leroy Somer", fuelTank: "Standard 300-liter spill containment tank", fuelTankFr: "Réservoir standard 300 L à rétention", control: "DSE 7320 MKII", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "700 kVA / 560 kW", kva: "700 kVA", ratingsEn: "700 kVA / 560 kW (Prime)", ratingsFr: "700 kVA / 560 kW (Continue)", engine: "SDMO Doosan", alternator: "Leroy Somer", fuelTank: "Standard 600-liter spill containment tank", fuelTankFr: "Réservoir standard 600 L à rétention", control: "APM403", soundEn: "Canopy", soundFr: "Capoté" },
  { power: "410 kVA / 328 kW", kva: "410 kVA", ratingsEn: "410 kVA / 328 kW (Prime)", ratingsFr: "410 kVA / 328 kW (Continue)", engine: "Doosan", alternator: "Stamford PI044G1", fuelTank: "Standard 600-liter spill containment tank", fuelTankFr: "Réservoir standard 600 L à rétention", control: "DSE 7320 MKII", soundEn: "Canopy", soundFr: "Capoté" },
];

export const usedProducts: Product[] = enrich([
  ...usedSeeds.map((s) => ({
    stock: "EN STOCK",
    name: s.power,
    subtitle: "i18n:products.used.subtitle",
    kva: s.kva,
    year: "—",
    fuel: "Diesel",
    img: s.kva === "250 kVA" ? used250kvaAsset : s.kva === "275 kVA" ? used275kvaAsset : s.kva === "375 kVA" ? used375kvaAsset : s.kva === "410 kVA" ? used410kvaAsset : s.kva === "500 kVA" ? used500kvaAsset : s.kva === "640 kVA" ? used640kvaAsset : s.kva === "675 kVA" ? used675kvaAsset : s.kva === "700 kVA" ? used700kvaAsset : s.kva === "60 kVA" ? used60kvaAsset : s.kva === "30 kVA" ? used30kvaAsset : s.kva === "20 kVA" ? used20kvaAsset : s.kva === "13 kVA" ? used13kvaAsset : "/placeholder.svg",
    type: (s.soundEn === "Canopy" ? "closed" : "open") as ProductType,
    specs: makeUsedSpecs({
      ratingsEn: s.ratingsEn, ratingsFr: s.ratingsFr,
      engine: s.engine, alternator: s.alternator,
      speed: "1500 RPM (50 Hz)", phase: "3-Phase",
      fuelTank: s.fuelTank, fuelTankFr: s.fuelTankFr,
      control: s.control,
      soundEn: s.soundEn, soundFr: s.soundFr,
    }),
  })),
], "used");

export const allProducts: Product[] = [...newProducts, ...usedProducts];

export const findProductBySlug = (slug: string) => allProducts.find((p) => p.slug === slug);
