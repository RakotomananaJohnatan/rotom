import { useState, useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import CatalogFilters from "@/components/CatalogFilters";
import ProductCard from "@/components/ProductCard";
import { usedProducts, brands } from "@/data/products";
import { CheckCircle2, Wrench, Truck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";

const GenerateursOccasion = () => {
  const { t } = useLang();
  const [powerRange, setPowerRange] = useState<[number, number]>([10, 2500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filtered = useMemo(() => usedProducts.filter((p) => {
    const v = parseInt(p.kva, 10);
    if (v < powerRange[0] || v > powerRange[1]) return false;
    if (selectedBrands.length && !selectedBrands.some((b) => p.name.toLowerCase().includes(b.split(" ")[0].toLowerCase()))) return false;
    return true;
  }), [powerRange, selectedBrands]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("used.hero.eyebrow")}
        title={t("used.hero.title")}
        subtitle={t("used.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("nav.used") }]}
      />

      <section className="bg-brand-cyan/10 border-b border-border">
        <div className="max-w-[1500px] mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: CheckCircle2, title: "Testés en charge", desc: "Bancs de test certifiés" },
            { icon: Wrench, title: "Révisés", desc: "Pièces d'usure remplacées" },
            { icon: Truck, title: "Livraison rapide", desc: "Stock disponible immédiat" },
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

      <section className="max-w-[1500px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside>
          <CatalogFilters
            brands={brands}
            powerRange={powerRange}
            setPowerRange={setPowerRange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
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
