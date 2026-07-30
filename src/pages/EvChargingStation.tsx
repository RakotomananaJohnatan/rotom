import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { evChargers } from "@/data/evChargers";
import { useLang } from "@/i18n/useLang";

const EvChargingStation = () => {
  const { t, lang } = useLang();
  const en = lang === "en";

  return (
    <SiteLayout>
      <Seo
        title={en ? "EV Charging Stations 7–240 kW — ROTOM" : "Bornes de recharge 7 à 240 kW — ROTOM"}
        description={en
          ? "ROTOM AC and DC EV charging stations, from 7 kW home chargers to 240 kW ultra-fast business stations."
          : "Bornes de recharge ROTOM AC et DC, du chargeur domestique 7 kW à la station ultra-rapide 240 kW."}
        path="/ev-charging-station"
      />
      <PageHero
        eyebrow={en ? "E-mobility" : "Mobilité électrique"}
        title={en ? "EV Charging Station" : "Bornes de recharge"}
        subtitle={en
          ? "Discover our range of AC and DC charging stations, from 7 kW home chargers to 240 kW ultra-fast business stations."
          : "Découvrez notre gamme de bornes de recharge AC et DC, du chargeur domestique 7 kW à la station ultra-rapide 240 kW."}
        breadcrumb={[
          { label: t("common.home"), to: "/" },
          { label: en ? "EV Charging Station" : "Bornes de recharge" },
        ]}
      />

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-primary">
          <h2 className="font-impact text-2xl uppercase font-bold text-primary">
            {evChargers.length} {en ? "charging stations" : "bornes de recharge"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {evChargers.map((c, i) => (
            <Reveal key={c.slug} variant="fade-in-up" delay={Math.min(i, 8) * 60} className="lift h-full">
              <article className="bg-card border-2 border-border flex flex-col h-full group hover:border-primary transition-all">
                <Link to={`/borne-recharge/${c.slug}`} className="aspect-[4/3] bg-secondary border-b-2 border-border flex items-center justify-center overflow-hidden">
                  <img
                    src={c.img}
                    loading="lazy"
                    width={400}
                    height={300}
                    alt={`${c.name} — ${c.power} ${c.current} — ROTOM`}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link to={`/borne-recharge/${c.slug}`}>
                    <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight hover:text-brand-cyan transition-colors">{c.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mb-4">{c.subtitle[lang]}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4 font-mono-spec text-[11px]">
                    <div>
                      <div className="text-primary font-bold">{c.power}</div>
                      <div className="text-muted-foreground uppercase text-[9px] tracking-wider">{en ? "Power" : "Puissance"}</div>
                    </div>
                    <div>
                      <div className="text-primary font-bold">{c.current}</div>
                      <div className="text-muted-foreground uppercase text-[9px] tracking-wider">{en ? "Current" : "Courant"}</div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-end border-t border-border pt-3">
                    <Link
                      to={`/borne-recharge/${c.slug}`}
                      className="bg-primary text-primary-foreground font-impact text-xs uppercase tracking-wider px-4 py-2.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
                    >
                      {t("common.viewDetails")}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default EvChargingStation;
