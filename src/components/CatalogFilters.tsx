import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface CatalogFiltersProps {
  brands: string[];
  powerRange: [number, number];
  setPowerRange: (r: [number, number]) => void;
  selectedBrands: string[];
  setSelectedBrands: (b: string[]) => void;
  resultCount: number;
}

const POWER_MIN = 10;
const POWER_MAX = 2500;

const CatalogFilters = ({
  brands, powerRange, setPowerRange, selectedBrands, setSelectedBrands, resultCount
}: CatalogFiltersProps) => {
  const [year, setYear] = useState("");
  const [availability, setAvailability] = useState("");

  return (
    <div className="bg-card border-2 border-border p-5">
      <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-primary">
        <h2 className="font-impact text-base uppercase font-bold text-primary">Filtrer les résultats</h2>
        <button
          type="button"
          onClick={() => {
            setPowerRange([POWER_MIN, POWER_MAX]);
            setSelectedBrands([]);
            setYear("");
            setAvailability("");
          }}
          className="text-xs text-brand-cyan hover:underline font-semibold"
        >
          Réinitialiser
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Puissance (kVA)</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Diminuer la puissance min"
            onClick={() => setPowerRange([Math.max(POWER_MIN, powerRange[0] - 10), powerRange[1]])}
            className="size-7 flex items-center justify-center rounded-full bg-fluo-yellow text-fluo-yellow-foreground font-bold hover:brightness-110 transition"
          >−</button>
          <Slider
            min={POWER_MIN}
            max={POWER_MAX}
            step={10}
            value={powerRange}
            onValueChange={(v) => setPowerRange([v[0], v[1]] as [number, number])}
            className="flex-1"
          />
          <button
            type="button"
            aria-label="Augmenter la puissance max"
            onClick={() => setPowerRange([powerRange[0], Math.min(POWER_MAX, powerRange[1] + 10)])}
            className="size-7 flex items-center justify-center rounded-full bg-fluo-yellow text-fluo-yellow-foreground font-bold hover:brightness-110 transition"
          >+</button>
        </div>
        <div className="flex justify-between font-mono-spec text-xs mt-3 text-foreground">
          <span>{powerRange[0]} kVA</span>
          <span>{powerRange[1]} kVA</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Marque</h3>
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer text-sm group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={(e) =>
                  setSelectedBrands(e.target.checked ? [...selectedBrands, b] : selectedBrands.filter((x) => x !== b))
                }
                className="appearance-none size-4 border-2 border-foreground checked:bg-brand-cyan checked:border-brand-cyan relative cursor-pointer"
              />
              <span className="group-hover:text-primary transition-colors">{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Année</h3>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full border border-border bg-white px-3 py-2 text-sm outline-none">
          <option value="">Toutes les années</option>
          <option>2024</option><option>2023</option><option>2022</option><option>2021</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">Disponibilité</h3>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full border border-border bg-white px-3 py-2 text-sm outline-none">
          <option value="">Toutes les disponibilités</option>
          <option>En stock</option>
          <option>Sur commande</option>
        </select>
      </div>

      <button className="w-full bg-brand-cyan text-white font-impact text-sm uppercase tracking-wider py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors">
        Afficher les résultats ({resultCount})
      </button>
    </div>
  );
};

export default CatalogFilters;
