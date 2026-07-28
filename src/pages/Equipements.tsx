import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Fuel, Zap, Box, Volume2, Cable, Gauge, Filter, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/useLang";
import Reveal from "@/components/Reveal";

type EquipCategory = "all" | "power" | "storage" | "acoustic" | "cabling" | "filters";

const Equipements = () => {
  const { t, lang } = useLang();
  const [activeCat, setActiveCat] = useState<EquipCategory>("all");

  const equipments = useMemo(
    () => [
      { key: "ats", icon: Zap, title: t("equip.ats.title"), desc: t("equip.ats.desc"), count: 18, cat: "power" as EquipCategory },
      { key: "tank", icon: Fuel, title: t("equip.tank.title"), desc: t("equip.tank.desc"), count: 12, cat: "storage" as EquipCategory },
      { key: "canopy", icon: Volume2, title: t("equip.canopy.title"), desc: t("equip.canopy.desc"), count: 9, cat: "acoustic" as EquipCategory },
      { key: "container", icon: Box, title: t("equip.container.title"), desc: t("equip.container.desc"), count: 7, cat: "storage" as EquipCategory },
      { key: "cable", icon: Cable, title: t("equip.cable.title"), desc: t("equip.cable.desc"), count: 14, cat: "cabling" as EquipCategory },
      { key: "control", icon: Gauge, title: t("equip.control.title"), desc: t("equip.control.desc"), count: 22, cat: "power" as EquipCategory },
      { key: "filters", icon: Filter, title: t("equip.filters.title"), desc: t("equip.filters.desc"), count: 25, cat: "filters" as EquipCategory },
    ],
    [t]
  );

  const filters: { key: EquipCategory; label: string }[] = [
    { key: "all", label: t("equip.filter.all") },
    { key: "power", label: t("equip.filter.power") },
    { key: "storage", label: t("equip.filter.storage") },
    { key: "acoustic", label: t("equip.filter.acoustic") },
    { key: "cabling", label: t("equip.filter.cabling") },
    { key: "filters", label: t("equip.filter.filters") },
  ];

  const filtered = activeCat === "all" ? equipments : equipments.filter((e) => e.cat === activeCat);

  return (
    <SiteLayout>
      <Seo
        title={lang === "en"
          ? "Generator accessories & equipment — ATS, tanks, canopies — ROTOM Madagascar"
          : "Équipements pour groupes électrogènes — ATS, cuves, capotages — ROTOM Madagascar"}
        description={lang === "en"
          ? "ROTOM accessories for diesel generators in Madagascar: ATS transfer switches, surge protectors, fuel tanks, acoustic canopies, cabling and filtration."
          : "Équipements ROTOM pour groupes électrogènes à Madagascar : ATS, parafoudres, cuves carburant, capotages acoustiques, câblage et filtration."}
        path="/equipements"
      />
      <PageHero
        eyebrow={t("equip.hero.eyebrow")}
        title={t("equip.hero.title")}
        subtitle={t("equip.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("equip.hero.title") }]}
      />

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b-2 border-border pb-4">
          <span className="font-impact text-xs uppercase tracking-[0.25em] text-muted-foreground mr-2">
            {t("equip.filter.label")}
          </span>
          {filters.map((f) => {
            const isActive = activeCat === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveCat(f.key)}
                className={`font-impact text-xs uppercase tracking-wider px-4 py-2 border-2 transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-brand-cyan hover:text-brand-cyan"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((eq, i) => (
            <Reveal key={eq.title} variant="fade-in-up" delay={i * 80}>
              <article className="lift bg-card border-2 border-border p-6 group hover:border-fluo-yellow hover:shadow-block transition-all h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-14 rounded-full bg-primary flex items-center justify-center group-hover:bg-fluo-yellow transition-colors group-hover:scale-110 duration-300">
                    <eq.icon className="size-7 text-fluo-yellow group-hover:text-fluo-yellow-foreground" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono-spec text-xs text-brand-cyan bg-brand-cyan/10 px-2 py-1">{eq.count} {t("equip.refs")}</span>
                </div>
                <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight mb-2">{eq.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{eq.desc}</p>
                <Link to={`/contact?product=equip:${eq.key}`} className="inline-flex items-center gap-1.5 text-xs font-impact uppercase tracking-wider text-brand-cyan hover:text-fluo-yellow transition-colors group/link">
                  {t("equip.cta.quote")} <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative bg-primary text-primary-foreground border-y-4 border-fluo-yellow overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-fluo-yellow/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
          <Reveal variant="slide-in-left">
            <h2 className="font-impact text-3xl uppercase font-bold mb-2">{t("equip.custom.title")}</h2>
            <p className="text-white/80">{t("equip.custom.desc")}</p>
          </Reveal>
          <Reveal variant="slide-in-right">
            <Link to="/contact" className="inline-block bg-fluo-yellow text-fluo-yellow-foreground font-impact text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-accent transition-all hover:scale-105">
              {t("equip.custom.cta")}
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Equipements;
