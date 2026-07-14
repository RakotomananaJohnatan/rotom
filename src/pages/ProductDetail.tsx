import { useParams, Link, useNavigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { findProductBySlug, allProducts } from "@/data/products";
import { useLang } from "@/i18n/useLang";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const product = findProductBySlug(slug);

  if (!product) {
    return (
      <SiteLayout>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="font-impact text-4xl uppercase font-bold text-primary mb-4">{t("product.notFound")}</h1>
          <Link to="/generateurs-neufs" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm uppercase tracking-wider px-6 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors">
            {t("product.notFound.cta")}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  
  const catalogTo = product.condition === "new" ? "/generateurs-neufs" : "/generateurs-occasion";
  const catalogLabel = product.condition === "new" ? t("nav.new") : t("nav.used");

  const related = allProducts.filter((p) => p.slug !== product.slug && p.condition === product.condition).slice(0, 3);
  const resolvedSubtitle = product.subtitle.startsWith("i18n:") ? t(product.subtitle.slice(5)) : product.subtitle;

  const features = product.included
    ? product.included[lang]
    : [
        t("product.detail.feat1"),
        t("product.detail.feat2"),
        ...(product.type === "open" ? [] : [t("product.detail.feat3")]),
        t("product.detail.feat4"),
        t("product.detail.feat5"),
        t("product.detail.feat6"),
      ];

  const goQuote = () => {
    navigate(`/contact?power=${encodeURIComponent(product.slug)}`);
  };

  return (
    <SiteLayout>
      <Seo
        title={`${product.name} — ${product.kva} ${product.fuel} — ROTOM`}
        description={`${product.name} : ${product.subtitle}. ${product.stock === "EN STOCK" ? "Disponible en stock" : "Sur commande"} chez ROTOM. Devis et livraison rapides.`}
        path={`/produit/${product.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.subtitle,
          brand: { "@type": "Brand", name: "ROTOM" },
          category: product.condition === "new" ? "Groupe électrogène neuf" : "Groupe électrogène d'occasion",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Puissance", value: product.kva },
            { "@type": "PropertyValue", name: "Carburant", value: product.fuel },
          ],
          offers: {
            "@type": "Offer",
            availability: product.stock === "EN STOCK" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            priceCurrency: "EUR",
            seller: { "@type": "Organization", name: "ROTOM Power Generation" },
          },
        }}
      />
      <PageHero
        eyebrow={t("product.detail.eyebrow")}
        title={product.name}
        breadcrumb={[
          { label: t("common.home"), to: "/" },
          { label: catalogLabel, to: catalogTo },
          { label: product.name },
        ]}
      />

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-10">
        <Link to={catalogTo} className="inline-flex items-center gap-1.5 text-sm text-brand-cyan hover:underline mb-6">
          <ChevronLeft className="size-4" /> {t("common.backToCatalog")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative bg-card border-2 border-border p-2 overflow-hidden">
            <img src={product.img} alt={product.name} className="w-full aspect-[4/3] object-cover" />
          </div>

          {/* Specs + CTA */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-2">{product.subtitle}</p>
            <h2 className="font-impact text-3xl uppercase font-bold text-primary mb-6">{product.name}</h2>

            <div className="grid grid-cols-2 gap-3 mb-6 font-mono-spec">
              {[
                { v: product.kva, l: t("common.power") },
                { v: product.fuel, l: t("common.fuel") },
              ].map((s) => (
                <div key={s.l} className="bg-secondary border-2 border-border p-4">
                  <div className="text-xl font-bold text-primary">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-impact text-sm uppercase font-bold text-primary mb-2">{t("product.detail.desc")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description ? product.description[lang] : t("product.detail.descBody")}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-impact text-sm uppercase font-bold text-primary mb-3">{t("product.detail.included")}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={goQuote}
              className="inline-flex items-center justify-center gap-2 bg-fluo-yellow text-fluo-yellow-foreground font-impact text-base font-bold uppercase tracking-wider px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors w-full md:w-auto"
            >
              {t("common.requestQuote")} <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Specs table */}
        <div className="mt-12 bg-card border-2 border-border">
          <h3 className="font-impact text-base uppercase font-bold text-primary p-4 border-b-2 border-primary">{t("product.detail.specs")}</h3>
          <table className="w-full text-sm">
            <tbody>
              {(product.specs
                ? product.specs[lang]
                : ([
                    [t("common.power"), product.kva],
                    
                    [t("common.fuel"), product.fuel],
                    ["Référence", product.slug.toUpperCase()],
                  ] as [string, string][])
              ).map(([k, v], i) => (
                v === "" ? (
                  <tr key={`h-${k}-${i}`} className="bg-primary/5">
                    <td colSpan={2} className="px-4 py-2.5 font-impact uppercase text-xs font-bold text-primary tracking-wider border-t border-b border-primary/20">{k}</td>
                  </tr>
                ) : (
                  <tr key={`${k}-${i}`} className={i % 2 ? "bg-secondary/40" : ""}>
                    <td className="px-4 py-3 font-impact uppercase text-xs text-muted-foreground tracking-wider w-1/3 align-top">{k}</td>
                    <td className="px-4 py-3 font-mono-spec">{v}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary border-t border-border py-12">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
            <h2 className="font-impact text-2xl uppercase font-bold text-primary mb-6">{catalogLabel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
};

export default ProductDetail;
