import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Search, Wrench, Truck, LifeBuoy, CreditCard, Cog, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLang } from "@/i18n/useLang";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

const Services = () => {
  const { t } = useLang();

  const services = [
    { icon: Search, title: t("services.s1.title"), desc: t("services.s1.desc") },
    { icon: Cog, title: t("services.s2.title"), desc: t("services.s2.desc") },
    { icon: Wrench, title: t("services.s3.title"), desc: t("services.s3.desc") },
    { icon: Truck, title: t("services.s4.title"), desc: t("services.s4.desc") },
    { icon: LifeBuoy, title: t("services.s5.title"), desc: t("services.s5.desc") },
    { icon: CreditCard, title: t("services.s6.title"), desc: t("services.s6.desc") },
  ];

  const process = [
    { n: "01", title: t("services.p1.title"), desc: t("services.p1.desc") },
    { n: "02", title: t("services.p2.title"), desc: t("services.p2.desc") },
    { n: "03", title: t("services.p3.title"), desc: t("services.p3.desc") },
    { n: "04", title: t("services.p4.title"), desc: t("services.p4.desc") },
    { n: "05", title: t("services.p5.title"), desc: t("services.p5.desc") },
  ];

  const bullets = [
    t("services.why.b1"),
    t("services.why.b2"),
    t("services.why.b3"),
    t("services.why.b4"),
    t("services.why.b5"),
  ];

  const stats = [
    { v: "10+", l: t("services.stat1") },
    { v: "200+", l: t("services.stat2") },
    { v: "60+", l: t("services.stat3") },
    { v: "24/7", l: t("services.stat4") },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("nav.services") }]}
      />

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} variant="fade-in-up" delay={i * 80}>
              <article className="lift bg-card border-2 border-border p-6 group hover:border-primary transition-all h-full">
                <div className="size-14 rounded-full bg-fluo-yellow flex items-center justify-center mb-4 group-hover:bg-brand-cyan transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <s.icon className="size-7 text-fluo-yellow-foreground group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative bg-secondary border-y border-border py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6">
          <Reveal variant="fade-in-up" className="text-center mb-10">
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">{t("services.process.eyebrow")}</div>
            <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary">{t("services.process.title")}</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {process.map((step, i) => (
              <Reveal key={step.n} variant="fade-in-up" delay={i * 100}>
                <div className="lift bg-card border-2 border-border p-5 relative h-full hover:border-fluo-yellow transition-colors">
                  <div className="font-impact text-4xl font-bold text-fluo-yellow leading-none mb-3">{step.n}</div>
                  <h3 className="font-impact text-sm uppercase font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal variant="slide-in-left">
          <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">{t("services.why.eyebrow")}</div>
          <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary mb-6">{t("services.why.title.1")}<br />{t("services.why.title.2")}</h2>
          <ul className="space-y-3">
            {bullets.map((item, i) => (
              <Reveal key={item} as="li" variant="fade-in-up" delay={i * 70} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </Reveal>
            ))}
          </ul>
        </Reveal>
        <Reveal variant="slide-in-right">
          <div className="relative bg-primary text-primary-foreground p-6 sm:p-10 border-l-8 border-fluo-yellow overflow-hidden">
            <div className="absolute -top-16 -right-16 size-48 rounded-full bg-fluo-yellow/15 blur-3xl pointer-events-none" />
            <div className="relative grid grid-cols-2 gap-6">
              {stats.map((stat) => {
                const num = parseInt(stat.v);
                const suffix = stat.v.replace(/^\d+/, "");
                return (
                  <div key={stat.l}>
                    <div className="font-impact text-4xl sm:text-5xl font-bold text-fluo-yellow leading-none">
                      {isNaN(num) ? stat.v : <><Counter to={num} />{suffix}</>}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/70 mt-2">{stat.l}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative bg-fluo-yellow text-fluo-yellow-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
          <Reveal variant="slide-in-left">
            <h2 className="font-impact text-2xl md:text-3xl uppercase font-bold">{t("services.cta.title")}</h2>
            <p className="text-sm mt-1">{t("services.cta.desc")}</p>
          </Reveal>
          <Reveal variant="slide-in-right">
            <Link to="/contact" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-brand-cyan transition-all hover:scale-105">
              {t("services.cta.btn")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Services;
