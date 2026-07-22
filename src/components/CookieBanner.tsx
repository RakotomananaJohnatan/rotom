import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/useLang";

const STORAGE_KEY = "rotom_cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    openCookieSettings?: () => void;
  }
}

const updateConsent = (granted: boolean) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
  }
};

const CookieBanner = () => {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
    window.openCookieSettings = () => setVisible(true);
    return () => {
      delete window.openCookieSettings;
    };
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      // ignore
    }
    updateConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookies.title")}
      className="fixed bottom-0 left-0 right-0 z-[60] bg-primary text-primary-foreground border-t-4 border-accent shadow-2xl"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
        <p className="text-xs sm:text-sm leading-relaxed flex-1">
          {t("cookies.message")}{" "}
          <Link to="/politique-confidentialite" className="underline text-fluo-yellow hover:text-accent">
            {t("cookies.link")}
          </Link>
          .
        </p>
        <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={() => choose(false)}
            className="flex-1 md:flex-none px-4 py-2 text-xs font-impact font-bold uppercase tracking-wider border border-white/30 hover:bg-white/10 transition-colors"
          >
            {t("cookies.refuse")}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="flex-1 md:flex-none px-5 py-2 text-xs font-impact font-bold uppercase tracking-wider bg-accent text-accent-foreground hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
