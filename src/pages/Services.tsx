import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Search, Wrench, Truck, LifeBuoy, CreditCard, Cog, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

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
    { v: "25+", l: t("services.stat1") },
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

      <section className="max-w-[1500px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article key={s.title} className="bg-card border-2 border-border p-6 group hover:border-primary transition-all">
              <div className="size-14 rounded-full bg-fluo-yellow flex items-center justify-center mb-4 group-hover:bg-brand-cyan transition-colors">
                <s.icon className="size-7 text-fluo-yellow-foreground group-hover:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary border-y border-border py-16">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="text-center mb-10">
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">{t("services.process.eyebrow")}</div>
            <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary">{t("services.process.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {process.map((step) => (
              <div key={step.n} className="bg-card border-2 border-border p-5 relative">
                <div className="font-impact text-4xl font-bold text-fluo-yellow leading-none mb-3">{step.n}</div>
                <h3 className="font-impact text-sm uppercase font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">{t("services.why.eyebrow")}</div>
          <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary mb-6">{t("services.why.title.1")}<br />{t("services.why.title.2")}</h2>
          <ul className="space-y-3">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-primary text-primary-foreground p-10 border-l-8 border-fluo-yellow">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.l}>
                <div className="font-impact text-5xl font-bold text-fluo-yellow leading-none">{stat.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-2">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fluo-yellow text-fluo-yellow-foreground">
        <div className="max-w-[1500px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <h2 className="font-impact text-2xl md:text-3xl uppercase font-bold">{t("services.cta.title")}</h2>
            <p className="text-sm mt-1">{t("services.cta.desc")}</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-brand-cyan transition-colors">
            {t("services.cta.btn")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Services;
