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

      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div className="absolute -top-32 -right-32 size-[480px] rounded-full bg-brand-cyan/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 -left-20 size-[420px] rounded-full bg-fluo-yellow/20 blur-3xl" aria-hidden />

        <div className="relative max-w-[1500px] mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <Reveal variant="fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 mb-6">
              <span className="size-2 rounded-full bg-fluo-yellow animate-pulse" />
              <span className="text-[11px] font-impact uppercase tracking-[0.25em]">25+ ans d'expertise · 60+ pays</span>
            </div>
            <h1 className="font-impact font-bold uppercase leading-[0.95] text-5xl md:text-7xl mb-6">
              Énergie <span className="text-gradient-brand">industrielle</span><br />
              de 10 à 2 500 kVA.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
              Groupes électrogènes neufs et d'occasion, équipements & services. Des solutions fiables, livrées partout dans le monde.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/generateurs-neufs"
                className="group inline-flex items-center gap-2 bg-fluo-yellow text-fluo-yellow-foreground font-impact text-sm font-bold uppercase tracking-wider px-7 py-4 hover:shadow-glow transition-all"
              >
                Voir le catalogue
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-impact text-sm font-bold uppercase tracking-wider px-7 py-4 hover:bg-white/20 transition-all"
              >
                {t("header.cta")}
              </Link>
            </div>
          </Reveal>

          <Reveal variant="scale-in" delay={150} className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/40 to-fluo-yellow/30 blur-2xl" aria-hidden />
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, v: 200, suffix: "+", l: "Groupes en stock" },
                  { icon: Globe2, v: 60, suffix: "+", l: "Pays livrés" },
                  { icon: Award, v: 25, suffix: " ans", l: "D'expérience" },
                  { icon: LifeBuoy, v: 24, suffix: "/7", l: "Support technique" },
                ].map((s) => (
                  <div key={s.l} className="bg-white/5 border border-white/10 p-5 hover:border-fluo-yellow transition-colors">
                    <s.icon className="size-6 text-fluo-yellow mb-3" strokeWidth={1.5} />
                    <div className="font-impact text-3xl font-bold leading-none">
                      <Counter to={s.v} suffix={s.suffix} />
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-white/60 mt-2">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Brand marquee */}
        <div className="relative border-t border-white/10 py-5 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {[...brands, ...brands].map((b, i) => (
              <span key={`${b}-${i}`} className="font-impact text-sm uppercase tracking-[0.25em] text-white/40">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1500px] mx-auto px-6 py-14">
        <Reveal variant="fade-in-up" className="mb-8 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">Catalogue</div>
            <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary">
              Explorez nos gammes
            </h2>
          </div>
          <Link to="/generateurs-neufs" className="text-sm font-impact uppercase tracking-wider text-brand-cyan link-underline">
            Tout voir
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} variant="fade-in-up" delay={i * 80}>
              <Link
                to={cat.to}
                className="bg-card border-2 border-border lift hover:border-fluo-yellow p-4 flex items-center gap-4 group h-full"
              >
                <img
                  src={cat.img}
                  loading="lazy"
                  width={80}
                  height={80}
                  alt={cat.title}
                  className="size-20 object-contain bg-secondary group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-impact text-sm uppercase font-semibold text-primary leading-tight mb-1">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-brand-cyan inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Voir plus <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal variant="fade-in-up" delay={categories.length * 80}>
            <Link to="/contact" className="bg-primary text-primary-foreground p-5 flex items-center gap-4 border-2 border-primary lift hover:border-fluo-yellow h-full relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 size-32 rounded-full bg-fluo-yellow/20 blur-2xl" aria-hidden />
              <Headphones className="size-12 text-fluo-yellow flex-shrink-0 relative" strokeWidth={1.5} />
              <div className="flex-1 relative">
                <h3 className="font-impact text-base uppercase font-bold leading-tight mb-1">
                  Besoin d'un<br />générateur ?
                </h3>
                <p className="text-[11px] text-white/70 mb-2">Notre équipe vous répond sous 24h.</p>
                <span className="bg-fluo-yellow text-fluo-yellow-foreground text-[10px] font-impact font-bold uppercase tracking-wider px-3 py-1.5 inline-block">
                  {t("header.cta")}
                </span>
              </div>
            </Link>
          </Reveal>
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
            {filteredProducts.map((p, i) => (
              <Reveal key={p.slug} variant="fade-in-up" delay={Math.min(i, 5) * 60}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="relative bg-secondary border-y border-border py-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-[1500px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "Entreprise certifiée", desc: "Normes ISO 9001:2015\nQualité garantie" },
            { icon: Truck, title: "Livraison internationale", desc: "Expédition rapide\npartout dans le monde" },
            { icon: Wrench, title: "Testés & contrôlés", desc: "Tous nos groupes sont testés\navant expédition" },
            { icon: LifeBuoy, title: "Support expert", desc: "Une équipe disponible pour\nvous accompagner" },
          ].map((item, i) => (
            <Reveal key={item.title} variant="fade-in-up" delay={i * 100}>
              <div className="flex items-center gap-4 group">
                <div className="size-14 rounded-full bg-card border-2 border-primary flex items-center justify-center flex-shrink-0 group-hover:bg-fluo-yellow group-hover:border-fluo-yellow transition-colors">
                  <item.icon className="size-6 text-primary group-hover:text-fluo-yellow-foreground transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-impact text-sm uppercase font-bold text-primary">{item.title}</div>
                  <div className="text-xs text-muted-foreground whitespace-pre-line">{item.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute -top-20 left-1/4 size-80 rounded-full bg-brand-cyan/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 right-1/4 size-80 rounded-full bg-fluo-yellow/15 blur-3xl" aria-hidden />
        <div className="relative max-w-[1500px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8">
          <Reveal variant="slide-in-left">
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-fluo-yellow mb-3">Prêt à équiper votre site ?</div>
            <h2 className="font-impact text-3xl md:text-5xl uppercase font-bold leading-tight">
              Un projet ? Une recherche précise ?<br />
              <span className="text-gradient-brand">Parlons-en.</span>
            </h2>
          </Reveal>
          <Reveal variant="slide-in-right" delay={150}>
            <Link to="/contact" className="group inline-flex items-center gap-3 bg-fluo-yellow text-fluo-yellow-foreground font-impact text-sm font-bold uppercase tracking-wider px-8 py-5 hover:shadow-glow transition-all">
              {t("header.cta")}
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
