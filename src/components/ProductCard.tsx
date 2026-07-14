import { Link } from "react-router-dom";
import { useLang } from "@/i18n/useLang";

export type SpecRow = [string, string];
export interface Product {
  stock: string;
  name: string;
  subtitle: string;
  kva: string;
  year: string;
  fuel: string;
  img: string;
  slug: string;
  condition: "new" | "used";
  type?: "open" | "closed";
  specs?: { fr: SpecRow[]; en: SpecRow[] };
  description?: { fr: string; en: string };
  included?: { fr: string[]; en: string[] };
}

const ProductCard = ({ p }: { p: Product }) => {
  const { t } = useLang();
  return (
    <article className="bg-card border-2 border-border flex flex-col group hover:border-primary transition-all relative">

      <Link to={`/produit/${p.slug}`} className="aspect-[4/3] bg-secondary border-b-2 border-border flex items-center justify-center overflow-hidden">
        <img
          src={p.img}
          loading="lazy"
          width={400}
          height={300}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/produit/${p.slug}`}>
          <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight hover:text-brand-cyan transition-colors">{p.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-4">{p.subtitle.startsWith("i18n:") ? t(p.subtitle.slice(5)) : p.subtitle}</p>

        <div className="grid grid-cols-2 gap-2 mb-4 font-mono-spec text-[11px]">
          <div>
            <div className="text-primary font-bold">{p.kva}</div>
            <div className="text-muted-foreground uppercase text-[9px] tracking-wider">{t("common.power")}</div>
          </div>
          <div>
            <div className="text-primary font-bold">{p.fuel}</div>
            <div className="text-muted-foreground uppercase text-[9px] tracking-wider">{t("common.fuel")}</div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-end border-t border-border pt-3">
          <Link
            to={`/produit/${p.slug}`}
            className="bg-primary text-primary-foreground font-impact text-xs uppercase tracking-wider px-4 py-2.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
          >
            {t("common.viewDetails")}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
