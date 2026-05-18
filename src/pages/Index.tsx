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
import { newProducts } from "@/data/products";
import type { CategoryKey } from "@/components/CatalogFilters";
import { useLang } from "@/i18n/useLang";

import heroIndustrial from "@/assets/hero-industrial.png";
import catNeufs from "@/assets/cat-neufs.jpg";
import catOccasion from "@/assets/cat-occasion.jpg";
import catHybrid from "@/assets/cat-hybrid.jpg";
import catEquip from "@/assets/cat-equip.jpg";

const Index = () => {
  const { t } = useLang();

  const categories = [
    { title: t("nav.new"), img: catNeufs, to: "/generateurs-neufs" },
    { title: t("nav.used"), img: catOccasion, to: "/generateurs-occasion" },
    { title: t("home.cat.hybrid"), img: catHybrid, to: "/equipements" },
    { title: t("nav.equip"), img: catEquip, to: "/equipements" },
  ];

  const POWER_MIN = 10;
  const POWER_MAX = 2500;
  const [powerRange, setPowerRange] = useState<[number, number]>([POWER_MIN, POWER_MAX]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>([]);

  const categoryOptions: { key: CategoryKey; label: string }[] = [
    { key: "open", label: t("filters.cat.open") },
    { key: "closed", label: t("filters.cat.closed") },
    { key: "new", label: t("filters.cat.new") },
    { key: "used", label: t("filters.cat.used") },
  ];

  const filteredProducts = newProducts.filter((p) => {
    const value = parseInt(p.kva, 10);
    if (value < powerRange[0] || value > powerRange[1]) return false;
    if (selectedCategories.length > 0) {
      const typeSel = selectedCategories.filter((c) => c === "open" || c === "closed");
      const condSel = selectedCategories.filter((c) => c === "new" || c === "used");
      if (typeSel.length && (!p.type || !typeSel.includes(p.type))) return false;
      if (condSel.length && !condSel.includes(p.condition)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <SalesTeamStrip />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
        <div className="relative aspect-[16/9] max-h-[88vh] w-full">
          <img
            src={heroIndustrial}
            alt="Site industriel avec groupes électrogènes ROTOM"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" aria-hidden />

          <div className="relative z-10 h-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col justify-center">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-5 sm:mb-6 hero-rise">
                <span className="block h-[2px] w-10 sm:w-14 bg-[#c4ff00]" />
                <span className="font-impact text-[11px] sm:text-xs uppercase tracking-[0.32em] text-[#c4ff00] font-bold">
                  {t("home.hero.eyebrow")}
                </span>
              </div>

              <h1 className="font-impact uppercase font-extrabold text-white leading-[0.95] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] hero-rise" style={{ animationDelay: "120ms" }}>
                <span className="block">{t("home.hero.title1")}</span>
                <span className="block text-[#c4ff00] hero-float">{t("home.hero.title2")}</span>
              </h1>

              <p className="mt-6 sm:mt-8 text-white/80 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed hero-rise" style={{ animationDelay: "320ms" }}>
                {t("home.hero.subtitle")}
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 hero-rise" style={{ animationDelay: "480ms" }}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-[#1e6cff] hover:bg-[#1558d6] text-white font-impact text-xs sm:text-sm font-bold uppercase tracking-[0.18em] px-7 sm:px-9 py-4 sm:py-5 rounded-full transition-all hover:shadow-[0_10px_30px_-10px_rgba(30,108,255,0.7)] hover:-translate-y-0.5"
                >
                  {t("home.hero.cta1")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/generateurs-neufs"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/90 text-white hover:bg-white hover:text-black font-impact text-xs sm:text-sm font-bold uppercase tracking-[0.18em] px-7 sm:px-9 py-4 sm:py-5 rounded-full transition-all hover:-translate-y-0.5"
                >
                  {t("home.hero.cta2")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-14">
        <Reveal variant="fade-in-up" className="mb-8 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">{t("home.cat.eyebrow")}</div>
            <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary">
              {t("home.cat.title")}
            </h2>
          </div>
          <Link to="/generateurs-neufs" className="text-sm font-impact uppercase tracking-wider text-brand-cyan link-underline">
            {t("home.cat.viewAll")}
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                    {t("home.cat.viewMore")} <ArrowRight className="size-3" />
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
                  {t("home.cat.need.title")}
                </h3>
                <p className="text-[11px] text-white/70 mb-2">{t("home.cat.need.desc")}</p>
                <span className="bg-fluo-yellow text-fluo-yellow-foreground text-[10px] font-impact font-bold uppercase tracking-wider px-3 py-1.5 inline-block">
                  {t("header.cta")}
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Filters */}
        <aside>
          <div className="bg-card border-2 border-border p-5">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-primary">
              <h2 className="font-impact text-base uppercase font-bold text-primary">{t("filters.title")}</h2>
              <button
                type="button"
                onClick={() => {
                  setPowerRange([POWER_MIN, POWER_MAX]);
                  setSelectedCategories([]);
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
              <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("filters.category")}</h3>
              <div className="space-y-2">
                {categoryOptions.map((c) => (
                  <label key={c.key} className="flex items-center gap-2 cursor-pointer text-sm group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(c.key)}
                      onChange={(e) =>
                        setSelectedCategories((prev) =>
                          e.target.checked ? [...prev, c.key] : prev.filter((x) => x !== c.key)
                        )
                      }
                      className="appearance-none size-4 border-2 border-foreground checked:bg-brand-cyan checked:border-brand-cyan relative cursor-pointer"
                    />
                    <span className="group-hover:text-primary transition-colors">{c.label}</span>
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6 pb-4 border-b-2 border-primary">
            <h2 className="font-impact text-xl sm:text-2xl uppercase font-bold text-primary">
              {filteredProducts.length} {t("new.count")}
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{t("sort.label")}</span>
              <select className="border border-border bg-background px-3 py-1.5 text-sm outline-none flex-1 sm:flex-none">
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

      {/* Stats (déplacés depuis le hero) */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div className="absolute -top-32 -right-32 size-[420px] rounded-full bg-brand-cyan/25 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-20 size-[380px] rounded-full bg-fluo-yellow/15 blur-3xl" aria-hidden />
        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 py-14">
          <Reveal variant="fade-in-up" className="mb-8">
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-fluo-yellow mb-2">{t("home.stats.eyebrow")}</div>
            <h2 className="font-impact text-2xl md:text-3xl uppercase font-bold leading-tight">
              {t("home.stats.title.1")} <span className="text-gradient-brand">{t("home.stats.title.2")}</span> {t("home.stats.title.3")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Zap, v: 200, suffix: "+", l: t("home.stats.s1") },
              { icon: Award, v: 10, suffix: t("home.stats.s3.suffix"), l: t("home.stats.s3") },
              { icon: LifeBuoy, v: 24, suffix: "/7", l: t("home.stats.s4") },
            ].map((s, i) => (
              <Reveal key={s.l} variant="fade-in-up" delay={i * 80}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 hover:border-fluo-yellow transition-colors h-full">
                  <s.icon className="size-6 text-fluo-yellow mb-3" strokeWidth={1.5} />
                  <div className="font-impact text-3xl md:text-4xl font-bold leading-none">
                    <Counter to={s.v} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/60 mt-2">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="relative bg-secondary border-y border-border py-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Wrench, title: t("home.trust.3.title"), desc: t("home.trust.3.desc") },
            { icon: LifeBuoy, title: t("home.trust.4.title"), desc: t("home.trust.4.desc") },
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
        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8">
          <Reveal variant="slide-in-left">
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-fluo-yellow mb-3">{t("home.cta.eyebrow")}</div>
            <h2 className="font-impact text-2xl sm:text-3xl md:text-5xl uppercase font-bold leading-tight">
              {t("home.cta.title.1")}<br />
              <span className="text-gradient-brand">{t("home.cta.title.2")}</span>
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
