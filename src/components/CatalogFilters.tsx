import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useLang } from "@/i18n/useLang";

export type CategoryKey = "open" | "closed" | "new" | "used";

interface CatalogFiltersProps {
  powerRange: [number, number];
  setPowerRange: (r: [number, number]) => void;
  selectedCategories: CategoryKey[];
  setSelectedCategories: (c: CategoryKey[]) => void;
  resultCount: number;
}

const POWER_MIN = 10;
const POWER_MAX = 2500;

const CatalogFilters = ({
  powerRange, setPowerRange, selectedCategories, setSelectedCategories, resultCount,
}: CatalogFiltersProps) => {
  const { t } = useLang();
  const [year, setYear] = useState("");
  const [availability, setAvailability] = useState("");

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "open", label: t("filters.cat.open") },
    { key: "closed", label: t("filters.cat.closed") },
    { key: "new", label: t("filters.cat.new") },
    { key: "used", label: t("filters.cat.used") },
  ];

  return (
    <div className="bg-card border-2 border-border p-5">
      <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-primary">
        <h2 className="font-impact text-base uppercase font-bold text-primary">{t("filters.title")}</h2>
        <button
          type="button"
          onClick={() => {
            setPowerRange([POWER_MIN, POWER_MAX]);
            setSelectedCategories([]);
            setYear("");
            setAvailability("");
          }}
          className="text-xs text-brand-cyan hover:underline font-semibold"
        >
          {t("filters.reset")}
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("filters.power")}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="-"
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
            aria-label="+"
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
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("filters.category")}</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.key} className="flex items-center gap-2 cursor-pointer text-sm group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.key)}
                onChange={(e) =>
                  setSelectedCategories(
                    e.target.checked
                      ? [...selectedCategories, c.key]
                      : selectedCategories.filter((x) => x !== c.key)
                  )
                }
                className="appearance-none size-4 border-2 border-foreground checked:bg-brand-cyan checked:border-brand-cyan relative cursor-pointer"
              />
              <span className="group-hover:text-primary transition-colors">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("filters.year")}</h3>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm outline-none">
          <option value="">{t("filters.allYears")}</option>
          <option>2024</option><option>2023</option><option>2022</option><option>2021</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-impact text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("filters.availability")}</h3>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm outline-none">
          <option value="">{t("filters.allAvailability")}</option>
          <option>{t("common.inStock")}</option>
          <option>{t("common.onOrder")}</option>
        </select>
      </div>

      <button className="w-full bg-brand-cyan text-white font-impact text-sm uppercase tracking-wider py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors">
        {t("filters.show")} ({resultCount})
      </button>
    </div>
  );
};

export default CatalogFilters;
