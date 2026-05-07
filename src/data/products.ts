import genCummins from "@/assets/gen-cummins.jpg";
import genCat from "@/assets/gen-cat.jpg";
import genPerkins from "@/assets/gen-perkins.jpg";
import genFgWilson from "@/assets/gen-fgwilson.jpg";
import genVolvo from "@/assets/gen-volvo.jpg";
import genDoosan from "@/assets/gen-doosan.jpg";
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

export const newProducts: Product[] = enrich([
  { stock: "EN STOCK", name: "ROTOM RG-220", subtitle: "220 kVA — Diesel Generator Neuf", kva: "220 kVA", year: "2024", fuel: "Diesel", img: genCummins, type: "closed" },
  { stock: "SUR COMMANDE", name: "ROTOM RG-330", subtitle: "330 kVA — Diesel Generator Neuf", kva: "330 kVA", year: "2024", fuel: "Diesel", img: genCat, type: "closed" },
  { stock: "EN STOCK", name: "ROTOM RG-400", subtitle: "400 kVA — Diesel Generator Neuf", kva: "400 kVA", year: "2024", fuel: "Diesel", img: genPerkins, type: "open" },
  { stock: "SUR COMMANDE", name: "ROTOM RG-550", subtitle: "550 kVA — Diesel Generator Neuf", kva: "550 kVA", year: "2024", fuel: "Diesel", img: genFgWilson, type: "closed" },
  { stock: "EN STOCK", name: "ROTOM RG-660", subtitle: "660 kVA — Diesel Generator Neuf", kva: "660 kVA", year: "2024", fuel: "Diesel", img: genVolvo, type: "open" },
  { stock: "EN STOCK", name: "ROTOM RG-1000", subtitle: "1000 kVA — Diesel Generator Neuf", kva: "1000 kVA", year: "2024", fuel: "Diesel", img: genDoosan, type: "open" },
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
