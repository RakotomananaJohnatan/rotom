import { useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Headphones, Shield, Truck, Wrench, LifeBuoy, ArrowRight, Zap, Globe2, Award } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SalesTeamStrip from "@/components/SalesTeamStrip";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { newProducts, brands } from "@/data/products";
import { useLang } from "@/i18n/LanguageContext";

import catNeufs from "@/assets/cat-neufs.jpg";
import catOccasion from "@/assets/cat-occasion.jpg";
import catHybrid from "@/assets/cat-hybrid.jpg";
import catEquip from "@/assets/cat-equip.jpg";

const Index = () => {
  const { t } = useLang();

  const categories = [
    { title: t("nav.new"), img: catNeufs, to: "/generateurs-neufs" },
    { title: t("nav.used"), img: catOccasion, to: "/generateurs-occasion" },
    { title: "Hybrides & Batteries", img: catHybrid, to: "/equipements" },
    { title: t("nav.equip"), img: catEquip, to: "/equipements" },
  ];

  const POWER_MIN = 10;
  const POWER_MAX = 2500;
  const [powerRange, setPowerRange] = useState<[number, number]>([POWER_MIN, POWER_MAX]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filteredProducts = newProducts.filter((p) => {
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
            <Link
              key={cat.title}
              to={cat.to}
              className="bg-card border-2 border-border hover:border-fluo-yellow transition-all cursor-pointer p-4 flex items-center gap-4 group"
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
                <span className="text-xs text-brand-cyan hover:underline inline-flex items-center gap-1">
                  Voir plus →
                </span>
              </div>
            </Link>
          ))}

          <Link to="/contact" className="bg-primary text-primary-foreground p-5 flex items-center gap-4 border-2 border-primary hover:border-fluo-yellow transition-colors">
            <Headphones className="size-12 text-fluo-yellow flex-shrink-0" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="font-impact text-base uppercase font-bold leading-tight mb-1">
                Besoin d'un<br />générateur ?
              </h3>
              <p className="text-[11px] text-white/70 mb-2">Notre équipe vous répond sous 24h.</p>
              <span className="bg-fluo-yellow text-fluo-yellow-foreground text-[10px] font-impact font-bold uppercase tracking-wider px-3 py-1.5 inline-block">
                {t("header.cta")}
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="max-w-[1500px] mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Filters */}
        <aside>
          <div className="bg-card border-2 border-border p-5">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-primary">
              <h2 className="font-impact text-base uppercase font-bold text-primary">{t("filters.title")}</h2>
              <button
                type="button"
                onClick={() => {
                  setPowerRange([POWER_MIN, POWER_MAX]);
                  setSelectedBrands([]);
                }}
                className="text-xs text-brand-cyan hover:underline font-semibold"
              >
                {t("filters.reset")}
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("filters.power")}</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="-"
                  onClick={() => setPowerRange(([min, max]) => [Math.max(POWER_MIN, min - 10), max] as [number, number])}
                  className="size-7 flex items-center justify-center rounded-full bg-fluo-yellow text-fluo-yellow-foreground font-bold hover:brightness-110 transition"
                >−</button>
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
                  aria-label="+"
                  onClick={() => setPowerRange(([min, max]) => [min, Math.min(POWER_MAX, max + 10)] as [number, number])}
                  className="size-7 flex items-center justify-center rounded-full bg-fluo-yellow text-fluo-yellow-foreground font-bold hover:brightness-110 transition"
                >+</button>
              </div>
              <div className="flex justify-between font-mono-spec text-xs mt-3 text-foreground">
                <span>{powerRange[0]} kVA</span>
                <span>{powerRange[1]} kVA</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("filters.brand")}</h3>
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
              </div>
            </div>

            <button className="w-full bg-brand-cyan text-white font-impact text-sm uppercase tracking-wider py-3 hover:bg-brand-cyan/90 transition-colors">
              {t("filters.show")} ({filteredProducts.length})
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div>
          <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-primary">
            <h2 className="font-impact text-2xl uppercase font-bold text-primary">
              {filteredProducts.length} {t("new.count")}
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{t("sort.label")}</span>
              <select className="border border-border bg-background px-3 py-1.5 text-sm outline-none">
                <option>{t("sort.recent")}</option>
                <option>{t("sort.kvaAsc")}</option>
                <option>{t("sort.kvaDesc")}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map((p) => <ProductCard key={p.slug} p={p} />)}
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

      <SiteFooter />
    </div>
  );
};

export default Index;
