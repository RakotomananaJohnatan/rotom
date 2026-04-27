import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type Variant = "fade-in-up" | "fade-in" | "scale-in" | "slide-in-left" | "slide-in-right";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Reveal = ({ children, variant = "fade-in-up", delay = 0, className, as: Tag = "div" }: RevealProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const animClass = `animate-${variant}`;
  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
      className={cn(visible ? animClass : "opacity-0", className)}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
