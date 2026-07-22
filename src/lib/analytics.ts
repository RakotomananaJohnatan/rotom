// Google Analytics 4 loader. Only invoked AFTER the user grants consent.
// Guarantees no request is made to google-analytics.com before consent.

const GA_ID = "G-VRHQNMZQCE";
let loaded = false;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const loadAnalytics = () => {
  if (typeof window === "undefined" || loaded) return;
  loaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag as typeof window.gtag;

  gtag("js", new Date());
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  gtag("config", GA_ID, { anonymize_ip: true });
};
