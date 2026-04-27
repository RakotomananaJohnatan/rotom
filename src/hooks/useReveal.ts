import { useEffect, useRef, useState } from "react";

/**
 * Reveals a section once it enters the viewport.
 * Returns ref + a `data-reveal` attribute (true once visible).
 *
 * Usage:
 *   const { ref, visible } = useReveal();
 *   <div ref={ref} className={visible ? "animate-fade-in-up" : "opacity-0"} />
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: { threshold?: number; once?: boolean }) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (opts?.once !== false) obs.unobserve(e.target);
          } else if (opts?.once === false) {
            setVisible(false);
          }
        });
      },
      { threshold: opts?.threshold ?? 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [opts?.threshold, opts?.once]);

  return { ref, visible };
}
