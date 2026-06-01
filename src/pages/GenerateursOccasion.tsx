import { useState, useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CatalogFilters from "@/components/CatalogFilters";
import ProductCard from "@/components/ProductCard";
import { usedProducts } from "@/data/products";
import type { CategoryKey } from "@/components/CatalogFilters";
import { CheckCircle2, Wrench, Truck } from "lucide-react";
import { useLang } from "@/i18n/useLang";
import Reveal from "@/components/Reveal";

const GenerateursOccasion = () => {
  const { t } = useLang();
  const [powerRange, setPowerRange] = useState<[number, number]>([10, 2500]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>([]);

  const filtered = useMemo(() => usedProducts.filter((p) => {
    const v = parseInt(p.kva, 10);
    if (v < powerRange[0] || v > powerRange[1]) return false;
    if (selectedCategories.length) {
      const typeSel = selectedCategories.filter((c) => c === "open" || c === "closed");
      const condSel = selectedCategories.filter((c) => c === "new" || c === "used");
      if (typeSel.length && (!p.type || !typeSel.includes(p.type))) return false;
      if (condSel.length && !condSel.includes(p.condition)) return false;
    }
    return true;
  }), [powerRange, selectedCategories]);

  return (
    <SiteLayout>
      <Seo
        title="Générateurs d'occasion — ROTOM"
        description="Groupes électrogènes d'occasion révisés et garantis ROTOM, de 10 à 2500 kVA. Disponibles en stock avec maintenance assurée."
        path="/generateurs-occasion"
      />
      <PageHero
        eyebrow={t("used.hero.eyebrow")}
        title={t("used.hero.title")}
        subtitle={t("used.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("nav.used") }]}
      />

      <section className="bg-brand-cyan/10 border-b border-border">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: CheckCircle2, title: t("used.feat.1.title"), desc: t("used.feat.1.desc") },
            { icon: Wrench, title: t("used.feat.2.title"), desc: t("used.feat.2.desc") },
            { icon: Truck, title: t("used.feat.3.title"), desc: t("used.feat.3.desc") },
          ].map((it, i) => (
            <Reveal key={it.title} variant="fade-in-up" delay={i * 100}>
              <div className="lift flex items-center gap-3 bg-card border-2 border-border p-4 h-full hover:border-brand-cyan transition-colors group">
                <div className="size-10 rounded-full bg-brand-cyan flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <it.icon className="size-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-impact text-sm uppercase font-bold text-primary">{it.title}</div>
                  <div className="text-xs text-muted-foreground">{it.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside>
          <CatalogFilters
            powerRange={powerRange}
            setPowerRange={setPowerRange}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            resultCount={filtered.length}
          />
        </aside>

        <div>
          <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-primary">
            <h2 className="font-impact text-2xl uppercase font-bold text-primary">
              {filtered.length} {t("used.count")}
            </h2>
            <select className="border border-border bg-background px-3 py-1.5 text-sm outline-none">
              <option>{t("sort.recent")}</option>
              <option>{t("sort.kvaAsc")}</option>
              <option>{t("sort.kvaDesc")}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} variant="fade-in-up" delay={Math.min(i, 8) * 60} className="lift">
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default GenerateursOccasion;
