import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Fuel, Zap, Box, Volume2, Cable, Gauge, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const Equipements = () => {
  const { t } = useLang();

  const equipments = [
    { icon: Zap, title: t("equip.ats.title"), desc: t("equip.ats.desc"), count: 18 },
    { icon: Fuel, title: t("equip.tank.title"), desc: t("equip.tank.desc"), count: 12 },
    { icon: Volume2, title: t("equip.canopy.title"), desc: t("equip.canopy.desc"), count: 9 },
    { icon: Box, title: t("equip.container.title"), desc: t("equip.container.desc"), count: 7 },
    { icon: Cable, title: t("equip.cable.title"), desc: t("equip.cable.desc"), count: 14 },
    { icon: Gauge, title: t("equip.control.title"), desc: t("equip.control.desc"), count: 22 },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("equip.hero.eyebrow")}
        title={t("equip.hero.title")}
        subtitle={t("equip.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("equip.hero.title") }]}
      />

      <section className="max-w-[1500px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipments.map((eq) => (
            <article key={eq.title} className="bg-card border-2 border-border p-6 group hover:border-fluo-yellow hover:shadow-block transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="size-14 rounded-full bg-primary flex items-center justify-center group-hover:bg-fluo-yellow transition-colors">
                  <eq.icon className="size-7 text-fluo-yellow group-hover:text-fluo-yellow-foreground" strokeWidth={1.5} />
                </div>
                <span className="font-mono-spec text-xs text-brand-cyan bg-brand-cyan/10 px-2 py-1">{eq.count} {t("equip.refs")}</span>
              </div>
              <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight mb-2">{eq.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{eq.desc}</p>
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-impact uppercase tracking-wider text-brand-cyan hover:text-fluo-yellow transition-colors">
                {t("equip.cta.quote")} <ArrowRight className="size-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground border-y-4 border-fluo-yellow">
        <div className="max-w-[1500px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <h2 className="font-impact text-3xl uppercase font-bold mb-2">{t("equip.custom.title")}</h2>
            <p className="text-white/80">{t("equip.custom.desc")}</p>
          </div>
          <Link to="/contact" className="bg-fluo-yellow text-fluo-yellow-foreground font-impact text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-accent transition-colors">
            {t("equip.custom.cta")}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Equipements;
