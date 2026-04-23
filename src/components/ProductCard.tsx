import { Heart } from "lucide-react";

export interface Product {
  stock: string;
  name: string;
  subtitle: string;
  kva: string;
  year: string;
  fuel: string;
  img: string;
}

const ProductCard = ({ p }: { p: Product }) => {
  const isStock = p.stock === "EN STOCK";
  return (
    <article className="bg-card border-2 border-border flex flex-col group hover:border-primary transition-all relative">
      <div
        className={`absolute top-3 left-3 z-10 font-impact text-[10px] font-bold uppercase tracking-wider px-3 py-1 ${
          isStock ? "bg-brand-cyan text-white" : "bg-accent text-accent-foreground"
        }`}
      >
        {p.stock}
      </div>
      <button className="absolute top-3 right-3 z-10 size-8 rounded-full bg-white border border-border flex items-center justify-center hover:bg-fluo-yellow hover:border-fluo-yellow transition-colors">
        <Heart className="size-4" />
      </button>

      <div className="aspect-[4/3] bg-secondary border-b-2 border-border flex items-center justify-center overflow-hidden">
        <img
          src={p.img}
          loading="lazy"
          width={400}
          height={300}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight">{p.name}</h3>
        <p className="text-xs text-muted-foreground mb-4">{p.subtitle}</p>

        <div className="grid grid-cols-3 gap-2 mb-4 font-mono-spec text-[11px]">
          <div>
            <div className="text-primary font-bold">{p.kva}</div>
            <div className="text-muted-foreground uppercase text-[9px] tracking-wider">Puissance</div>
          </div>
          <div>
            <div className="text-primary font-bold">{p.year}</div>
            <div className="text-muted-foreground uppercase text-[9px] tracking-wider">Année</div>
          </div>
          <div>
            <div className="text-primary font-bold">{p.fuel}</div>
            <div className="text-muted-foreground uppercase text-[9px] tracking-wider">Carburant</div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-end border-t border-border pt-3">
          <button className="bg-primary text-primary-foreground font-impact text-xs uppercase tracking-wider px-4 py-2.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors">
            Voir détails
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
