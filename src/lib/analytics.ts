// Google Analytics 4 consent + page-view tracking.
// gtag.js may be loaded in <head>, but page_view hits are sent only after consent.

const GA_ID = "G-VRHQNMZQCE";
const CONSENT_KEY = "rotom_cookie_consent";
const CLIENT_ID_KEY = "rotom_ga_client_id";
let configured = false;
let jsInitialized = false;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const loadAnalytics = () => {
  if (typeof window === "undefined") return;
  ensureGtag();
  ensureScript();

  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });

  if (!jsInitialized) {
    jsInitialized = true;
    window.gtag?.("js", new Date());
  }

  if (!configured) {
    configured = true;
    window.gtag?.("config", GA_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
  }
};

export const grantAnalyticsConsent = () => {
  loadAnalytics();
  trackPageView();
};

export const denyAnalyticsConsent = () => {
  if (typeof window === "undefined") return;
  ensureGtag();
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
};

export const hasAnalyticsConsent = () => {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
};

export const trackPageView = () => {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  loadAnalytics();

  const pageTitle = document.title;
  const pageLocation = window.location.href;
  const pagePath = `${window.location.pathname}${window.location.search}`;

  // Keep Consent Mode state explicit for Google Tag diagnostics.
  window.gtag?.("event", "page_view", {
    send_to: GA_ID,
    page_title: pageTitle,
    page_location: pageLocation,
    page_path: pagePath,
  });

  // Reliable GA4 collection hit, visible as /g/collect in DevTools after consent.
  sendGaCollect("page_view", {
    dl: pageLocation,
    dt: pageTitle,
    dp: pagePath,
  });
};

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = ((...args: unknown[]) => {
      window.dataLayer!.push(args);
    }) as typeof window.gtag;
  }
};

const ensureScript = () => {
  const src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const getClientId = () => {
  try {
    const existing = localStorage.getItem(CLIENT_ID_KEY);
    if (existing) return existing;
    const generated = `${Date.now()}.${Math.floor(Math.random() * 1_000_000_000)}`;
    localStorage.setItem(CLIENT_ID_KEY, generated);
    return generated;
  } catch {
    return `${Date.now()}.${Math.floor(Math.random() * 1_000_000_000)}`;
  }
};

const sendGaCollect = (eventName: string, params: Record<string, string>) => {
  const search = new URLSearchParams({
    v: "2",
    tid: GA_ID,
    cid: getClientId(),
    en: eventName,
    ul: navigator.language,
    sr: `${screen.width}x${screen.height}`,
    _p: String(Math.floor(Math.random() * 1_000_000_000)),
    ...params,
  });

  fetch(`https://www.google-analytics.com/g/collect?${search.toString()}`, {
    method: "GET",
    mode: "no-cors",
    credentials: "omit",
    keepalive: true,
  }).catch(() => {
    // Ignore network/ad-blocker failures.
  });
};
