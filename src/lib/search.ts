import { allProducts } from "@/data/products";
import { evChargers } from "@/data/evChargers";

export type SearchResultType = "product" | "page" | "section" | "brand" | "service" | "equipment" | "contact";

export interface SearchEntry {
  id: string;
  type: SearchResultType;
  // Translation keys (preferred) — resolved at search-time
  titleKey?: string;
  subtitleKey?: string;
  // Or static strings
  title?: string;
  subtitle?: string;
  // Free-text keywords to widen matching (any language, raw strings)
  keywords?: string[];
  to: string;
  // Whether the entry should open in a new tab (e.g. external maps link)
  external?: boolean;
  img?: string;
}

// Static, language-agnostic index (we resolve translations via the t() function in the component).
const pages: SearchEntry[] = [
  { id: "page-home", type: "page", titleKey: "common.home", to: "/", keywords: ["accueil", "home", "rotom"] },
  { id: "page-new", type: "page", titleKey: "nav.new", subtitleKey: "new.hero.subtitle", to: "/generateurs-neufs", keywords: ["neuf", "new", "generator", "groupe electrogene"] },
  { id: "page-used", type: "page", titleKey: "nav.used", subtitleKey: "used.hero.subtitle", to: "/generateurs-occasion", keywords: ["occasion", "used", "second hand", "refurbished"] },
  { id: "page-equip", type: "page", titleKey: "nav.equip", to: "/equipements", keywords: ["equipement", "equipment", "accessoires", "accessories"] },
  { id: "page-services", type: "page", titleKey: "nav.services", to: "/services", keywords: ["service", "services", "maintenance", "installation"] },
  { id: "page-contact", type: "page", titleKey: "nav.contact", subtitleKey: "contact.hero.subtitle", to: "/contact", keywords: ["contact", "devis", "quote", "email", "telephone", "phone"] },
  { id: "page-ev", type: "page", titleKey: "search.ev.title", to: "/ev-charging-station", keywords: ["borne", "recharge", "charging", "station", "ev", "vehicule electrique", "electric vehicle", "acq", "hc series", "vc series", "vcp", "sc+oc"] },
  { id: "page-rental", type: "page", titleKey: "search.rental.title", to: "/rental-generators", keywords: ["location", "rental", "louer", "rent", "generateur en location"] },
  { id: "page-custom", type: "page", titleKey: "search.custom.title", to: "/demande-sur-mesure", keywords: ["sur mesure", "custom", "demande specifique", "specific request", "engine brand", "alternator", "controller"] },
];


const services: SearchEntry[] = [
  { id: "svc-research", type: "service", titleKey: "footer.svc.research", to: "/services", keywords: ["sourcing", "recherche", "demande"] },
  { id: "svc-install", type: "service", titleKey: "footer.svc.install", to: "/services", keywords: ["installation", "mise en service", "commissioning"] },
  { id: "svc-maintenance", type: "service", titleKey: "footer.svc.maintenance", to: "/services", keywords: ["maintenance", "entretien", "preventive"] },
  { id: "svc-parts", type: "service", titleKey: "footer.svc.parts", to: "/services", keywords: ["pieces", "spare parts", "detachees"] },
  { id: "svc-financing", type: "service", titleKey: "footer.svc.financing", to: "/services", keywords: ["financement", "credit", "financing", "leasing"] },
  { id: "svc-loadbank", type: "service", titleKey: "search.loadbank.title", to: "/services", keywords: ["load bank", "banc de charge", "test", "essai", "pleine puissance", "full power", "performance"] },
  { id: "svc-support", type: "service", title: "Support 24/7", to: "/services", keywords: ["support", "24/7", "assistance", "telemaintenance"] },
  { id: "svc-delivery", type: "service", title: "Livraison internationale / International delivery", to: "/services", keywords: ["livraison", "delivery", "international", "logistics", "douane"] },
];


const equipments: SearchEntry[] = [
  { id: "eq-ats", type: "equipment", title: "Inverseurs de source (ATS)", to: "/equipements", keywords: ["ats", "inverseur", "automatic transfer switch", "commutation"] },
  { id: "eq-tanks", type: "equipment", title: "Citernes & réservoirs", to: "/equipements", keywords: ["citerne", "reservoir", "tank", "fuel", "carburant"] },
  { id: "eq-canopy", type: "equipment", title: "Capotages insonorisés", to: "/equipements", keywords: ["capot", "insonorise", "soundproof", "canopy", "silent", "db"] },
  { id: "eq-container", type: "equipment", title: "Containers 20'/40'", to: "/equipements", keywords: ["container", "conteneur", "20", "40"] },
  { id: "eq-cabling", type: "equipment", title: "Câblage & coffrets", to: "/equipements", keywords: ["cablage", "coffret", "cabling", "synchronisation", "parallel"] },
  { id: "eq-control", type: "equipment", title: "Modules de contrôle (DSE, ComAp)", to: "/equipements", keywords: ["dse", "comap", "telemaintenance", "supervision", "gsm"] },
];

const brandEntries: SearchEntry[] = [];

const productEntries: SearchEntry[] = allProducts.map((p) => ({
  id: `product-${p.slug}`,
  type: "product",
  title: p.name,
  subtitle: `${p.kva} · ${p.fuel} · ${p.year} · ${p.condition === "new" ? "Neuf / New" : "Occasion / Used"}`,
  to: `/produit/${p.slug}`,
  img: p.img,
  keywords: [p.name, p.kva, p.year, p.fuel, p.subtitle, p.condition === "new" ? "neuf new" : "occasion used", p.stock],
}));

const EV_KEYWORDS: Record<string, string[]> = {"rotom-acq-series": ["acq", "home ac charger", "borne domestique", "home charger", "ac", "7kw", "11kw", "22kw"], "rotom-hc-series": ["hc series", "business charging station", "station professionnelle", "dc", "60kw", "240kw", "ultra-fast", "ultra-rapide"], "rotom-sc-oc-series": ["sc+oc", "sc series", "oc series", "business/home dc charger", "dc", "7kw", "40kw"], "rotom-vc-series": ["vc series", "business charging station", "dc", "30kw", "80kw", "slim", "ultra-slim"], "rotom-vcp-series": ["vcp series", "business charging station", "dc", "60kw", "160kw", "slim", "ultra-slim"]};

const evEntries: SearchEntry[] = evChargers.map((c) => ({
  id: `ev-${c.slug}`,
  type: "product",
  title: c.name,
  subtitle: `${c.power} · ${c.current}`,
  to: `/borne-recharge/${c.slug}`,
  img: c.img,
  keywords: [c.name, c.power, c.current, c.subtitle.fr, c.subtitle.en, "borne recharge ev charging station", ...(EV_KEYWORDS[c.slug] ?? []), ...c.models],
}));

const contactInfo: SearchEntry[] = [
  { id: "ct-phone", type: "contact", title: "+261 38 11 531 04", subtitle: "Téléphone / Phone", to: "/contact", keywords: ["telephone", "phone", "+261", "appeler", "call"] },
  { id: "ct-email", type: "contact", title: "sales@rotom-power.com", subtitle: "Email", to: "/contact", keywords: ["mail", "email", "sales", "@rotom"] },
  { id: "ct-address", type: "contact", title: "Alarobia, Rue Tsarasaotra, Antananarivo 101", subtitle: "Madagascar", to: "https://maps.app.goo.gl/oKPJMuFEaW4FH6vTA", external: true, keywords: ["adresse", "address", "antananarivo", "madagascar", "alarobia", "siege", "headquarters"] },
  { id: "ct-whatsapp", type: "contact", title: "WhatsApp", subtitle: "Discuter en direct / Chat live", to: "/contact", keywords: ["whatsapp", "chat", "messagerie"] },
];

export const searchIndex: SearchEntry[] = [
  ...pages,
  ...productEntries,
  ...evEntries,
  ...brandEntries,
  ...services,
  ...equipments,
  ...contactInfo,
];

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export interface ResolvedEntry extends SearchEntry {
  resolvedTitle: string;
  resolvedSubtitle: string;
  haystack: string;
  score: number;
}

export const searchEntries = (
  query: string,
  t: (k: string) => string,
  limit = 12
): ResolvedEntry[] => {
  const q = normalize(query.trim());
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored: ResolvedEntry[] = [];
  for (const entry of searchIndex) {
    const title = entry.titleKey ? t(entry.titleKey) : entry.title ?? "";
    const subtitle = entry.subtitleKey ? t(entry.subtitleKey) : entry.subtitle ?? "";
    const kw = (entry.keywords ?? []).join(" ");
    const haystack = normalize(`${title} ${subtitle} ${kw}`);

    let score = 0;
    for (const tk of tokens) {
      if (!haystack.includes(tk)) {
        score = -1;
        break;
      }
      // boost by position / title hits
      if (normalize(title).includes(tk)) score += 5;
      if (normalize(title).startsWith(tk)) score += 5;
      if (normalize(subtitle).includes(tk)) score += 2;
      score += 1;
    }
    if (score > 0) {
      // Type boosts
      if (entry.type === "product") score += 1;
      if (entry.type === "page") score += 2;
      scored.push({ ...entry, resolvedTitle: title, resolvedSubtitle: subtitle, haystack, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
};
