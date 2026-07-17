import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/useLang";

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
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const selected = options.find((o) => o.value === value);

  const updateCoords = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    if (open) updateCoords();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => updateCoords();
    const onResize = () => updateCoords();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
  }, [open]);

  const handleSelect = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div className="min-w-0 animate-fade-in-up">
      <label
        htmlFor={id}
        className="font-impact text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block"
      >
        {label}
      </label>
      <button
        type="button"
        id={id}
        ref={triggerRef}
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
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={listRef}
            role="listbox"
            style={{ top: coords.top, left: coords.left, width: coords.width }}
            className="absolute z-[100] mt-1 max-h-72 overflow-auto border-2 border-border bg-background shadow-lg"
          >
            <li>
              <button
                type="button"
                role="option"
                aria-selected={!value}
                onClick={() => handleSelect("")}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left text-muted-foreground hover:bg-secondary transition-colors",
                  !value && "bg-secondary"
                )}
              >
                <span className="flex-1 truncate">{t("common.none")}</span>
                {!value && <Check className="size-4 text-brand-cyan" />}
              </button>
            </li>
            {options.map((o) => {
              const isSel = o.value === value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onClick={() => handleSelect(o.value)}
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
          </ul>,
          document.body
        )}
    </div>
  );
};

export default BrandCascadeSelect;
