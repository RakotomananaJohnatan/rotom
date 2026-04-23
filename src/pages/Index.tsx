import { useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import {
  Headphones, Shield, Truck, Wrench, LifeBuoy, Heart,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SalesTeamStrip from "@/components/SalesTeamStrip";

import genCummins from "@/assets/gen-cummins.jpg";
import genCat from "@/assets/gen-cat.jpg";
import genPerkins from "@/assets/gen-perkins.jpg";
import genFgWilson from "@/assets/gen-fgwilson.jpg";
import genVolvo from "@/assets/gen-volvo.jpg";
import genDoosan from "@/assets/gen-doosan.jpg";
import catNeufs from "@/assets/cat-neufs.jpg";
import catOccasion from "@/assets/cat-occasion.jpg";
import catHybrid from "@/assets/cat-hybrid.jpg";
import catEquip from "@/assets/cat-equip.jpg";

const categories = [
  { title: "Générateurs Diesel Neufs", img: catNeufs, count: 84, to: "/generateurs-neufs" },
  { title: "Générateurs d'Occasion", img: catOccasion, count: 142, to: "/generateurs-occasion" },
  { title: "Hybrides & Batteries", img: catHybrid, count: 26, to: "/equipements" },
  { title: "Équipements Associés", img: catEquip, count: 58, to: "/equipements" },
];

const products = [
  { stock: "EN STOCK", name: "Cummins C220 D5", subtitle: "220 kVA — Diesel Generator", kva: "220 kVA", year: "2023", fuel: "Diesel", price: "18.750", img: genCummins },
  { stock: "EN STOCK", name: "Caterpillar DE220E0", subtitle: "220 kVA — Diesel Generator", kva: "220 kVA", year: "2022", fuel: "Diesel", price: "21.900", img: genCat },
  { stock: "EN STOCK", name: "Perkins 2006A-E88TAG3", subtitle: "250 kVA — Diesel Generator", kva: "250 kVA", year: "2021", fuel: "Diesel", price: "16.500", img: genPerkins },
  { stock: "SUR COMMANDE", name: "FG Wilson P275-3", subtitle: "275 kVA — Diesel Generator", kva: "275 kVA", year: "2023", fuel: "Diesel", price: "24.800", img: genFgWilson },
  { stock: "SUR COMMANDE", name: "Volvo TAD1342GE", subtitle: "330 kVA — Diesel Generator", kva: "330 kVA", year: "2022", fuel: "Diesel", price: "26.900", img: genVolvo },
  { stock: "EN STOCK", name: "Doosan DP180LB", subtitle: "710 kVA — Diesel Generator", kva: "710 kVA", year: "2021", fuel: "Diesel", price: "42.000", img: genDoosan },
];

const navItems = ["Générateurs neufs", "Générateurs d'occasion", "Équipements associés", "Services", "Contact"];
const brands = ["Caterpillar (CAT)", "Cummins", "Perkins", "Volvo", "FG Wilson", "Doosan"];

const Index = () => {
  const POWER_MIN = 10;
  const POWER_MAX = 2500;
  const [powerRange, setPowerRange] = useState<[number, number]>([POWER_MIN, POWER_MAX]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filteredProducts = products.filter((p) => {
    const value = parseInt(p.kva, 10);
    if (value < powerRange[0] || value > powerRange[1]) return false;
    if (selectedBrands.length > 0) {
      const matches = selectedBrands.some((b) => p.name.toLowerCase().includes(b.split(" ")[0].toLowerCase()));
      if (!matches) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <SalesTeamStrip />


      {/* Categories */}
      <section className="max-w-[1500px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-card border-2 border-border hover:border-primary transition-all cursor-pointer p-4 flex items-center gap-4 group"
            >
              <img
                src={cat.img}
                loading="lazy"
                width={80}
                height={80}
                alt={cat.title}
                className="size-20 object-contain bg-secondary"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-impact text-sm uppercase font-semibold text-primary leading-tight mb-1">
                  {cat.title}
                </h3>
                <a href="#" className="text-xs text-brand-cyan hover:underline inline-flex items-center gap-1">
                  Voir plus →
                </a>
              </div>
            </div>
          ))}

          {/* Contact CTA card */}
          <div className="bg-primary text-primary-foreground p-5 flex items-center gap-4 border-2 border-primary">
            <Headphones className="size-12 text-accent flex-shrink-0" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="font-impact text-base uppercase font-bold leading-tight mb-1">
                Besoin d'un<br />générateur ?
              </h3>
              <p className="text-[11px] text-white/70 mb-2">Notre équipe vous répond sous 24h.</p>
              <button className="bg-accent text-accent-foreground text-[10px] font-impact font-bold uppercase tracking-wider px-3 py-1.5 hover:bg-white transition-colors">
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="max-w-[1500px] mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Filters */}
        <aside>
          <div className="bg-card border-2 border-border p-5">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-primary">
              <h2 className="font-impact text-base uppercase font-bold text-primary">Filtrer les résultats</h2>
              <button
                type="button"
                onClick={() => {
                  setPowerRange([POWER_MIN, POWER_MAX]);
                  setSelectedBrands([]);
                }}
                className="text-xs text-brand-cyan hover:underline font-semibold"
              >
                Réinitialiser
              </button>
            </div>

            {/* Power slider */}
            <div className="mb-6">
              <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Puissance (kVA)</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Diminuer la puissance min"
                  onClick={() => setPowerRange(([min, max]) => [Math.max(POWER_MIN, min - 10), max])}
                  className="size-7 flex items-center justify-center rounded-full bg-fluo-yellow text-fluo-yellow-foreground font-bold hover:brightness-110 transition"
                >
                  −
                </button>
                <Slider
                  min={POWER_MIN}
                  max={POWER_MAX}
                  step={10}
                  value={powerRange}
                  onValueChange={(v) => setPowerRange([v[0], v[1]] as [number, number])}
                  className="flex-1"
                />
                <button
                  type="button"
                  aria-label="Augmenter la puissance max"
                  onClick={() => setPowerRange(([min, max]) => [min, Math.min(POWER_MAX, max + 10)])}
                  className="size-7 flex items-center justify-center rounded-full bg-fluo-yellow text-fluo-yellow-foreground font-bold hover:brightness-110 transition"
                >
                  +
                </button>
              </div>
              <div className="flex justify-between font-mono-spec text-xs mt-3 text-foreground">
                <span>{powerRange[0]} kVA</span>
                <span>{powerRange[1]} kVA</span>
              </div>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Marque</h3>
              <div className="space-y-2">
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer text-sm group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={(e) =>
                        setSelectedBrands((prev) =>
                          e.target.checked ? [...prev, b] : prev.filter((x) => x !== b)
                        )
                      }
                      className="appearance-none size-4 border-2 border-foreground checked:bg-brand-cyan checked:border-brand-cyan relative cursor-pointer"
                    />
                    <span className="group-hover:text-primary transition-colors">{b}</span>
                  </label>
                ))}
                <a href="#" className="text-xs text-brand-cyan hover:underline inline-block mt-1">Voir plus</a>
              </div>
            </div>


            {/* Year */}
            <div className="mb-6">
              <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Année</h3>
              <select className="w-full border border-border bg-white px-3 py-2 text-sm outline-none">
                <option>Sélectionner</option>
              </select>
            </div>

            {/* Disponibilité */}
            <div className="mb-6">
              <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Disponibilité</h3>
              <select className="w-full border border-border bg-white px-3 py-2 text-sm outline-none">
                <option>Toutes les disponibilités</option>
              </select>
            </div>

            <button className="w-full bg-brand-cyan text-white font-impact text-sm uppercase tracking-wider py-3 hover:bg-brand-cyan/90 transition-colors">
              Afficher les résultats (215)
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div>
          <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-primary">
            <h2 className="font-impact text-2xl uppercase font-bold text-primary">
              + 200 Groupes Électrogènes Disponibles
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">Trier par</span>
              <select className="border border-border bg-white px-3 py-1.5 text-sm outline-none">
                <option>Plus récent</option>
                <option>Puissance croissante</option>
                <option>Puissance décroissante</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map((p) => {
              const isStock = p.stock === "EN STOCK";
              return (
                <article
                  key={p.name}
                  className="bg-card border-2 border-border flex flex-col group hover:border-primary transition-all relative"
                >
                  {/* Stock badge */}
                  <div
                    className={`absolute top-3 left-3 z-10 font-impact text-[10px] font-bold uppercase tracking-wider px-3 py-1 ${
                      isStock
                        ? "bg-brand-cyan text-white"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {p.stock}
                  </div>
                  <button className="absolute top-3 right-3 z-10 size-8 rounded-full bg-white border border-border flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">
                    <Heart className="size-4" />
                  </button>

                  {/* Image */}
                  <div className="aspect-[4/3] bg-secondary border-b-2 border-border flex items-center justify-center overflow-hidden">
                    <img
                      src={p.img}
                      loading="lazy"
                      width={400}
                      height={300}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">{p.subtitle}</p>

                    <div className="grid grid-cols-3 gap-2 mb-4 font-mono-spec text-[11px]">
                      <div>
                        <div className="text-primary font-bold">{p.kva}</div>
                        <div className="text-muted-foreground uppercase text-[9px] tracking-wider">Puissance</div>
                      </div>
                      <div>
                        <div className="text-primary font-bold">{p.year}</div>
                        <div className="text-muted-foreground uppercase text-[9px] tracking-wider">Année</div>
                      </div>
                      <div>
                        <div className="text-primary font-bold">{p.fuel}</div>
                        <div className="text-muted-foreground uppercase text-[9px] tracking-wider">Carburant</div>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-end border-t border-border pt-3">
                      <button className="bg-primary text-primary-foreground font-impact text-xs uppercase tracking-wider px-4 py-2.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors">
                        Voir détails
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-secondary border-y border-border py-8">
        <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "Entreprise certifiée", desc: "Normes ISO 9001:2015\nQualité garantie" },
            { icon: Truck, title: "Livraison internationale", desc: "Expédition rapide\npartout dans le monde" },
            { icon: Wrench, title: "Testés & contrôlés", desc: "Tous nos groupes sont testés\navant expédition" },
            { icon: LifeBuoy, title: "Support expert", desc: "Une équipe disponible pour\nvous accompagner" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-white border-2 border-primary flex items-center justify-center flex-shrink-0">
                <item.icon className="size-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-impact text-sm uppercase font-bold text-primary">{item.title}</div>
                <div className="text-xs text-muted-foreground whitespace-pre-line">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-[1500px] mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">À propos de ROTOM</h4>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              ROTOM est spécialisé dans la vente de groupes électrogènes neufs & d'occasion de 10 kVA à 2500 kVA. Nous accompagnons nos clients partout dans le monde avec des solutions fiables et un service sur mesure.
            </p>
            <a href="#" className="text-xs text-accent hover:underline">En savoir plus →</a>
          </div>

          <div>
            <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#" className="hover:text-accent">Générateurs neufs</a></li>
              <li><a href="#" className="hover:text-accent">Générateurs d'occasion</a></li>
              <li><a href="#" className="hover:text-accent">Équipements associés</a></li>
              <li><a href="#" className="hover:text-accent">Services</a></li>
              <li><a href="#" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Services</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#" className="hover:text-accent">Recherche sur demande</a></li>
              <li><a href="#" className="hover:text-accent">Installation</a></li>
              <li><a href="#" className="hover:text-accent">Maintenance</a></li>
              <li><a href="#" className="hover:text-accent">Pièces détachées</a></li>
              <li><a href="#" className="hover:text-accent">Financement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Contact</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="size-3.5 text-accent flex-shrink-0 mt-0.5" />
                <span>ROTOM Power Solutions<br />Bredaseweg 26<br />4705 RN Roosendaal, Pays-Bas</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5 text-accent flex-shrink-0" />
                <span>+31 (0)165 55 60 62</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3.5 text-accent flex-shrink-0" />
                <a href="#" className="hover:text-accent">sales@rotom.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-3.5 text-accent flex-shrink-0" />
                <a href="#" className="hover:text-accent">Discuter sur WhatsApp</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              <a href="#" className="size-10 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Linkedin className="size-4" />
              </a>
              <a href="#" className="size-10 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Facebook className="size-4" />
              </a>
              <a href="#" className="size-10 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Youtube className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-accent text-accent-foreground">
          <div className="max-w-[1500px] mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
            <span>© 2026 ROTOM Power Solutions — Tous droits réservés</span>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Mentions légales</a>
              <a href="#" className="hover:underline">Conditions générales</a>
              <a href="#" className="hover:underline">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
