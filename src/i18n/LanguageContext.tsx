import { createContext, useEffect, useState, ReactNode } from "react";
import { fr } from "./fr";
import { en } from "./en";

export type Lang = "fr" | "en";
type Dict = typeof fr;

const dicts: Record<Lang, Dict> = { fr, en };

export interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LangCtx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "fr";
    const saved = localStorage.getItem("rotom_lang") as Lang | null;
    return saved === "en" || saved === "fr" ? saved : "fr";
  });

  useEffect(() => {
    localStorage.setItem("rotom_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const dict = dicts[lang] as Record<string, string>;
    return dict[key] ?? (dicts.fr as Record<string, string>)[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export for backwards compatibility
export { useLang } from "./useLang";
