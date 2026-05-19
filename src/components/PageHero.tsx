import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; to?: string }[];
}

const PageHero = ({ eyebrow, title, subtitle, breadcrumb }: PageHeroProps) => (
  <section className="bg-primary text-primary-foreground border-b-4 border-fluo-yellow overflow-hidden">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <nav className="hero-rise flex items-center flex-wrap gap-1.5 text-xs text-white/60 mb-4" style={{ animationDelay: "0ms" }}>
        {breadcrumb.map((b, i) => (
          <span key={b.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" />}
            {b.to ? (
              <Link to={b.to} className="hover:text-fluo-yellow">{b.label}</Link>
            ) : (
              <span className="text-fluo-yellow">{b.label}</span>
            )}
          </span>
        ))}
      </nav>
      {eyebrow && (
        <div className="hero-rise font-impact text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-brand-cyan mb-3" style={{ animationDelay: "150ms" }}>{eyebrow}</div>
      )}
      <h1 className="hero-rise font-impact text-2xl sm:text-4xl md:text-5xl uppercase font-bold leading-tight max-w-3xl" style={{ animationDelay: "300ms" }}>
        {title}
      </h1>
      {subtitle && <p className="hero-rise text-white/80 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base" style={{ animationDelay: "450ms" }}>{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
