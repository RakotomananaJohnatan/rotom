import { Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { getEvCharger, type Val } from "@/data/evChargers";
import { useLang } from "@/i18n/useLang";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";

const EvChargerDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
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

  const v = (val: Val) => (typeof val === "string" ? val : val[lang]);
  const cols = charger.models.length;

  const goQuote = () => navigate(`/contact?product=${encodeURIComponent(`ev:${charger.slug}`)}`);

  return (
    <SiteLayout>
      <Seo
        title={`${charger.name} — ${charger.power} ${charger.current} — ROTOM`}
        description={charger.description[lang]}
        path={`/borne-recharge/${charger.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: charger.name,
          description: charger.description[lang],
          brand: { "@type": "Brand", name: "ROTOM" },
          category: en ? "EV charging station" : "Borne de recharge pour véhicule électrique",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Puissance", value: charger.power },
            { "@type": "PropertyValue", name: "Courant", value: charger.current },
          ],
        }}
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

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-10">
        <Link to="/ev-charging-station" className="inline-flex items-center gap-1.5 text-sm text-brand-cyan hover:underline mb-6">
          <ChevronLeft className="size-4" /> {en ? "Back to catalog" : "Retour au catalogue"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative bg-card border-2 border-border p-2 overflow-hidden">
            <img
              src={charger.img}
              width={600}
              height={450}
              alt={`${charger.name} — ${charger.power} ${charger.current} — ROTOM`}
              className="w-full aspect-[4/3] object-contain p-8"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-2">{charger.subtitle[lang]}</p>
            <h2 className="font-impact text-3xl uppercase font-bold text-primary mb-6">{charger.name}</h2>

            <div className="grid grid-cols-2 gap-3 mb-6 font-mono-spec">
              <div className="bg-secondary border-2 border-border p-4">
                <div className="text-xl font-bold text-primary">{charger.power}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {en ? "Power" : "Puissance"}
                </div>
              </div>
              <div className="bg-secondary border-2 border-border p-4">
                <div className="text-xl font-bold text-primary">{charger.current}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {en ? "Current type" : "Type de courant"}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-impact text-sm uppercase font-bold text-primary mb-2">
                {en ? "Description" : "Description"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{charger.description[lang]}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-impact text-sm uppercase font-bold text-primary mb-3">
                {en ? "Available connectors" : "Connecteurs disponibles"}
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {charger.connectors.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-impact text-sm uppercase font-bold text-primary mb-3">
                {en ? "Available models" : "Modèles disponibles"}
              </h3>
              <div className="flex flex-wrap gap-2 font-mono-spec text-xs">
                {charger.models.map((m) => (
                  <span key={m} className="border-2 border-border bg-secondary px-2.5 py-1.5">{m}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={goQuote}
                className="inline-flex items-center justify-center gap-2 bg-fluo-yellow text-fluo-yellow-foreground font-impact text-base font-bold uppercase tracking-wider px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors w-full sm:w-auto"
              >
                {en ? "Request a quote" : "Demander un devis"} <ArrowRight className="size-4" />
              </button>
              <Link
                to="/ev-charging-station"
                className="inline-flex items-center justify-center border-2 border-primary text-primary font-impact text-base font-bold uppercase tracking-wider px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {en ? "Back to catalog" : "Retour au catalogue"}
              </Link>
            </div>
          </div>
        </div>

        {/* Specs table */}
        <div className="mt-12 bg-card border-2 border-border overflow-x-auto">
          <h3 className="font-impact text-base uppercase font-bold text-primary p-4 border-b-2 border-primary">
            {en ? "Technical specifications" : "Caractéristiques techniques"}
          </h3>
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="bg-secondary">
                <th className="px-4 py-3 text-left font-impact uppercase text-xs text-muted-foreground tracking-wider w-1/4">
                  {en ? "Model" : "Modèle"}
                </th>
                {charger.models.map((m) => (
                  <th key={m} className="px-4 py-3 text-left font-mono-spec text-xs font-bold text-primary whitespace-nowrap">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {charger.sections.map((section) => (
                <Fragment key={section.title.en}>
                  <tr className="bg-primary/5">
                    <td
                      colSpan={cols + 1}
                      className="px-4 py-2.5 font-impact uppercase text-xs font-bold text-primary tracking-wider border-t border-b border-primary/20"
                    >
                      {section.title[lang]}
                    </td>
                  </tr>
                  {section.rows.map((row, i) => {
                    const isArray = Array.isArray(row.values);
                    return (
                      <tr key={`${section.title.en}-${row.label.en}`} className={i % 2 ? "bg-secondary/40" : ""}>
                        <td className="px-4 py-3 font-impact uppercase text-xs text-muted-foreground tracking-wider align-top">
                          {row.label[lang]}
                        </td>
                        {isArray ? (
                          (row.values as Val[]).map((val, j) => (
                            <td key={j} className="px-4 py-3 font-mono-spec align-top text-xs">
                              {v(val)}
                            </td>
                          ))
                        ) : (
                          <td colSpan={cols} className="px-4 py-3 font-mono-spec align-top text-xs">
                            {v(row.values as Val)}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
};

export default EvChargerDetail;
