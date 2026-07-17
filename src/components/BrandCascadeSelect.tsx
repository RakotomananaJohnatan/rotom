import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type BrandOption = {
  value: string;
  label: string;
  color: string; // hex background for badge
};

interface Props {
  id: string;
  label: string;
  options: BrandOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}

const BrandLogo = ({ option, size = 20 }: { option: BrandOption; size?: number }) => (
  <span
    aria-hidden
    className="inline-flex items-center justify-center rounded-full font-impact text-[10px] text-white flex-shrink-0 shadow-sm"
    style={{
      width: size,
      height: size,
      backgroundColor: option.color,
      fontSize: size <= 20 ? 9 : 11,
      letterSpacing: 0,
    }}
  >
    {option.label.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
  </span>
);

const BrandCascadeSelect = ({ id, label, options, value, onChange, placeholder }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="min-w-0 animate-fade-in-up">
      <label
        htmlFor={id}
        className="font-impact text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block"
      >
        {label}
      </label>
      <div ref={ref} className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "w-full border-2 border-border bg-background px-3 py-2.5 text-sm text-left flex items-center gap-2 outline-none focus:border-brand-cyan transition-colors",
            open && "border-brand-cyan"
          )}
        >
          {selected ? (
            <>
              <BrandLogo option={selected} />
              <span className="flex-1 truncate">{selected.label}</span>
            </>
          ) : (
            <span className="flex-1 text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown
            className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            className="absolute z-30 mt-1 w-full max-h-72 overflow-auto border-2 border-border bg-background shadow-lg animate-fade-in"
          >
            {options.map((o) => {
              const isSel = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-secondary transition-colors",
                      isSel && "bg-secondary"
                    )}
                  >
                    <BrandLogo option={o} />
                    <span className="flex-1 truncate">{o.label}</span>
                    {isSel && <Check className="size-4 text-brand-cyan" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BrandCascadeSelect;
