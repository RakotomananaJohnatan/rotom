import { Link, useParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { getEvCharger } from "@/data/evChargers";
import { useLang } from "@/i18n/useLang";

const EvChargerDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const en = lang === "en";
  const charger = getEvCharger(slug);

  if (!charger) {
    return (
      <SiteLayout>
        <PageHero
          title={en ? "Charging station not found" : "Borne de recharge introuvable"}
          breadcrumb={[{ label: t("common.home"), to: "/" }]}
        />
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-16">
          <Link to="/ev-charging-station" className="text-brand-cyan link-underline font-impact uppercase text-sm">
            {en ? "Back to catalog" : "Retour au catalogue"}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Seo
        title={`${charger.name} — ${charger.power} ${charger.current} — ROTOM`}
        description={charger.description[lang]}
        path={`/borne-recharge/${charger.slug}`}
      />
      <PageHero
        eyebrow={en ? "EV Charging Station" : "Borne de recharge"}
        title={charger.name}
        subtitle={charger.subtitle[lang]}
        breadcrumb={[
          { label: t("common.home"), to: "/" },
          { label: en ? "EV Charging Station" : "Bornes de recharge", to: "/ev-charging-station" },
          { label: charger.name },
        ]}
      />

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-secondary border-2 border-border aspect-[4/3] flex items-center justify-center">
          <img
            src={charger.img}
            width={600}
            height={450}
            alt={`${charger.name} — ${charger.power} ${charger.current} — ROTOM`}
            className="w-full h-full object-contain p-10"
          />
        </div>

        <div>
          <h2 className="font-impact text-2xl uppercase font-bold text-primary mb-4">
            {en ? "Overview" : "Présentation"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{charger.description[lang]}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card border-2 border-border p-4">
              <div className="font-mono-spec text-lg text-primary font-bold">{charger.power}</div>
              <div className="text-muted-foreground uppercase text-[10px] tracking-wider">{en ? "Power" : "Puissance"}</div>
            </div>
            <div className="bg-card border-2 border-border p-4">
              <div className="font-mono-spec text-lg text-primary font-bold">{charger.current}</div>
              <div className="text-muted-foreground uppercase text-[10px] tracking-wider">{en ? "Current type" : "Type de courant"}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/contact?product=${encodeURIComponent(charger.name)}`}
              className="bg-primary text-primary-foreground font-impact text-xs uppercase tracking-wider px-6 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
            >
              {en ? "Request a quote" : "Demander un devis"}
            </Link>
            <Link
              to="/ev-charging-station"
              className="border-2 border-primary text-primary font-impact text-xs uppercase tracking-wider px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {en ? "Back to catalog" : "Retour au catalogue"}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default EvChargerDetail;
