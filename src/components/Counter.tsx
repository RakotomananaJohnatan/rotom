import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const Counter = ({ to, suffix = "", prefix = "", duration = 1600, className }: CounterProps) => {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(ease(p) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString("fr-FR")}{suffix}
    </span>
  );
};

export default Counter;
