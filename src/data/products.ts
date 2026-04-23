import genCummins from "@/assets/gen-cummins.jpg";
import genCat from "@/assets/gen-cat.jpg";
import genPerkins from "@/assets/gen-perkins.jpg";
import genFgWilson from "@/assets/gen-fgwilson.jpg";
import genVolvo from "@/assets/gen-volvo.jpg";
import genDoosan from "@/assets/gen-doosan.jpg";
import type { Product } from "@/components/ProductCard";

export const brands = ["Caterpillar (CAT)", "Cummins", "Perkins", "Volvo", "FG Wilson", "Doosan"];

export const newProducts: Product[] = [
  { stock: "EN STOCK", name: "Cummins C220 D5", subtitle: "220 kVA — Diesel Generator Neuf", kva: "220 kVA", year: "2024", fuel: "Diesel", img: genCummins },
  { stock: "SUR COMMANDE", name: "Caterpillar DE330E0", subtitle: "330 kVA — Diesel Generator Neuf", kva: "330 kVA", year: "2024", fuel: "Diesel", img: genCat },
  { stock: "EN STOCK", name: "Perkins 2206A-E13TAG2", subtitle: "400 kVA — Diesel Generator Neuf", kva: "400 kVA", year: "2024", fuel: "Diesel", img: genPerkins },
  { stock: "SUR COMMANDE", name: "FG Wilson P550-3", subtitle: "550 kVA — Diesel Generator Neuf", kva: "550 kVA", year: "2024", fuel: "Diesel", img: genFgWilson },
  { stock: "EN STOCK", name: "Volvo TAD1642GE", subtitle: "660 kVA — Diesel Generator Neuf", kva: "660 kVA", year: "2024", fuel: "Diesel", img: genVolvo },
  { stock: "EN STOCK", name: "Doosan DP222LC", subtitle: "1000 kVA — Diesel Generator Neuf", kva: "1000 kVA", year: "2024", fuel: "Diesel", img: genDoosan },
];

export const usedProducts: Product[] = [
  { stock: "EN STOCK", name: "Cummins C150 D5", subtitle: "150 kVA — Diesel Generator Occasion", kva: "150 kVA", year: "2018", fuel: "Diesel", img: genCummins },
  { stock: "EN STOCK", name: "Caterpillar DE220E0", subtitle: "220 kVA — Diesel Generator Occasion", kva: "220 kVA", year: "2019", fuel: "Diesel", img: genCat },
  { stock: "EN STOCK", name: "Perkins 2006A-E88TAG3", subtitle: "250 kVA — Diesel Generator Occasion", kva: "250 kVA", year: "2017", fuel: "Diesel", img: genPerkins },
  { stock: "SUR COMMANDE", name: "FG Wilson P275-3", subtitle: "275 kVA — Diesel Generator Occasion", kva: "275 kVA", year: "2020", fuel: "Diesel", img: genFgWilson },
  { stock: "EN STOCK", name: "Volvo TAD1342GE", subtitle: "330 kVA — Diesel Generator Occasion", kva: "330 kVA", year: "2018", fuel: "Diesel", img: genVolvo },
  { stock: "EN STOCK", name: "Doosan DP180LB", subtitle: "710 kVA — Diesel Generator Occasion", kva: "710 kVA", year: "2016", fuel: "Diesel", img: genDoosan },
];
