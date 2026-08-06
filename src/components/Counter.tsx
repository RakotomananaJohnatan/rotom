import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/i18n/useLang";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const Counter = ({ to, suffix = "", prefix = "", duration = 1600, className }: CounterProps) => {
  const { lang } = useLang();
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const target = to;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(ease(p) * target));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      // Guarantee the final value even if the animation is interrupted
      // (StrictMode double-mount, re-render, tab switch...).
      setValue(target);
    };
  }, [visible, to, duration]);


  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString(lang === "en" ? "en-US" : "fr-FR")}{suffix}
    </span>
  );
};

export default Counter;
