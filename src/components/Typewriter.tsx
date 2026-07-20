import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  start: boolean;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
  className?: string;
  cursorClassName?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const Typewriter = ({
  text,
  start,
  speed = 45,
  startDelay = 0,
  onDone,
  className,
  cursorClassName,
}: TypewriterProps) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    setCount(0);
    setDone(false);
    if (!start) return;
    if (prefersReducedMotion()) {
      setCount(text.length);
      setDone(true);
      onDoneRef.current?.();
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          onDoneRef.current?.();
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [start, text, speed, startDelay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!done && start && (
        <span
          aria-hidden="true"
          className={cursorClassName ?? "inline-block w-[0.08em] h-[0.9em] align-[-0.05em] bg-current ml-1 animate-pulse"}
        />
      )}
    </span>
  );
};

export default Typewriter;
