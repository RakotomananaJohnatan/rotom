import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Package, FileText, Layers, Wrench, Factory, AtSign, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/useLang";
import { searchEntries, ResolvedEntry, SearchResultType } from "@/lib/search";
import { cn } from "@/lib/utils";

const typeIcon: Record<SearchResultType, typeof Package> = {
  product: Package,
  page: FileText,
  section: Layers,
  brand: Factory,
  service: Wrench,
  equipment: Layers,
  contact: AtSign,
};

const typeLabel = (t: SearchResultType, lang: "fr" | "en") => {
  const fr: Record<SearchResultType, string> = {
    product: "Produit", page: "Page", section: "Section", brand: "Marque",
    service: "Service", equipment: "Équipement", contact: "Contact",
  };
  const en: Record<SearchResultType, string> = {
    product: "Product", page: "Page", section: "Section", brand: "Brand",
    service: "Service", equipment: "Equipment", contact: "Contact",
  };
  return (lang === "fr" ? fr : en)[t];
};

const GlobalSearch = () => {
  const { t, lang } = useLang();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results: ResolvedEntry[] = query.trim() ? searchEntries(query, t, 12) : [];

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Cmd/Ctrl-K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const choose = (r: ResolvedEntry) => {
    setOpen(false);
    setQuery("");
    if (r.external || r.to.startsWith("http")) {
      window.open(r.to, "_blank", "noopener,noreferrer");
    } else {
      navigate(r.to);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(results.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      if (results[highlight]) {
        e.preventDefault();
        choose(results[highlight]);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-stretch">
        <div className="flex-1 flex items-stretch relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={t("header.search")}
            aria-label={t("header.search")}
            className="flex-1 bg-white text-foreground px-4 py-3 text-sm rounded-l-sm outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/70 pr-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center text-muted-foreground hover:text-primary"
              aria-label="Clear"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => { inputRef.current?.focus(); setOpen(true); }}
          className="bg-white text-primary px-4 border-l border-border rounded-r-sm hover:bg-accent transition-colors"
          aria-label="Search"
        >
          <Search className="size-5" />
        </button>
      </div>

      {open && query.trim() && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-card text-foreground border-2 border-border shadow-block max-h-[70vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-sm text-muted-foreground text-center">
              {lang === "fr" ? "Aucun résultat pour" : "No results for"} <span className="font-bold text-primary">"{query}"</span>
            </div>
          ) : (
            <ul role="listbox">
              {results.map((r, i) => {
                const Icon = typeIcon[r.type];
                const active = i === highlight;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => choose(r)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-left border-b border-border/60 last:border-b-0 transition-colors",
                        active ? "bg-secondary" : "hover:bg-secondary/60"
                      )}
                    >
                      {r.img ? (
                        <img src={r.img} alt="" className="size-10 object-cover rounded-sm border border-border flex-shrink-0" />
                      ) : (
                        <div className="size-10 rounded-sm bg-primary text-fluo-yellow flex items-center justify-center flex-shrink-0">
                          <Icon className="size-4" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-impact text-sm uppercase font-bold text-primary truncate">{r.resolvedTitle}</span>
                          <span className="font-mono-spec text-[9px] uppercase tracking-wider text-brand-cyan border border-brand-cyan/40 px-1.5 py-0.5 flex-shrink-0">
                            {typeLabel(r.type, lang)}
                          </span>
                        </div>
                        {r.resolvedSubtitle && (
                          <div className="text-xs text-muted-foreground truncate">{r.resolvedSubtitle}</div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/40 flex items-center justify-between">
            <span>↑ ↓ {lang === "fr" ? "Naviguer" : "Navigate"} · ↵ {lang === "fr" ? "Ouvrir" : "Open"} · Esc {lang === "fr" ? "Fermer" : "Close"}</span>
            <span className="hidden md:inline">⌘K</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
