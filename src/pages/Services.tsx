import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Search, Wrench, Truck, LifeBuoy, CreditCard, Cog, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  { icon: Search, title: "Recherche sur demande", desc: "Vous cherchez un modèle précis ? Notre équipe sourcing localise le groupe idéal dans notre réseau international en moins de 48h." },
  { icon: Cog, title: "Installation & mise en service", desc: "Nos techniciens certifiés assurent l'installation, le raccordement électrique et la mise en service partout dans le monde." },
  { icon: Wrench, title: "Maintenance préventive", desc: "Contrats de maintenance annuels avec interventions planifiées, vidanges, contrôles et tests en charge." },
  { icon: Truck, title: "Livraison internationale", desc: "Logistique optimisée par voie maritime, aérienne ou routière avec gestion des formalités douanières." },
  { icon: LifeBuoy, title: "Support technique 24/7", desc: "Assistance téléphonique et télémaintenance pour diagnostic à distance et résolution rapide d'incidents." },
  { icon: CreditCard, title: "Solutions de financement", desc: "Crédit-bail, location longue durée, financement projet : nous adaptons la solution à votre budget." },
];

const process = [
  { n: "01", title: "Étude du besoin", desc: "Analyse de votre site, calcul de puissance, contraintes environnementales." },
  { n: "02", title: "Devis détaillé", desc: "Proposition technique et financière sous 24-48h avec plusieurs options." },
  { n: "03", title: "Production / sourcing", desc: "Fabrication ou sélection en stock du groupe correspondant à vos specs." },
  { n: "04", title: "Tests & expédition", desc: "Tests en charge avant départ, photos, rapport, expédition sécurisée." },
  { n: "05", title: "Installation & SAV", desc: "Mise en service sur site et accompagnement long terme." },
];

const Services = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Notre savoir-faire"
      title="Nos Services"
      subtitle="ROTOM accompagne ses clients de la définition du besoin à la maintenance long terme. Une offre 360° pour des installations énergétiques fiables."
      breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Services" }]}
    />

    {/* Services grid */}
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

    {/* Process */}
    <section className="bg-secondary border-y border-border py-16">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="text-center mb-10">
          <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">Méthodologie</div>
          <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary">Notre processus en 5 étapes</h2>
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

    {/* Why ROTOM */}
    <section className="max-w-[1500px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">Pourquoi ROTOM</div>
        <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary mb-6">Plus de 25 ans<br />d'expertise énergétique</h2>
        <ul className="space-y-3">
          {[
            "Réseau international de partenaires constructeurs",
            "Stock permanent de plus de 200 groupes",
            "Équipe multilingue (NL, FR, EN, ES)",
            "Certifications ISO 9001:2015",
            "Garantie constructeur et SAV mondial",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-brand-cyan flex-shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-primary text-primary-foreground p-10 border-l-8 border-fluo-yellow">
        <div className="grid grid-cols-2 gap-6">
          {[
            { v: "25+", l: "Années d'expérience" },
            { v: "200+", l: "Groupes en stock" },
            { v: "60+", l: "Pays livrés" },
            { v: "24/7", l: "Support technique" },
          ].map((stat) => (
            <div key={stat.l}>
              <div className="font-impact text-5xl font-bold text-fluo-yellow leading-none">{stat.v}</div>
              <div className="text-xs uppercase tracking-wider text-white/70 mt-2">{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-fluo-yellow text-fluo-yellow-foreground">
      <div className="max-w-[1500px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
        <div>
          <h2 className="font-impact text-2xl md:text-3xl uppercase font-bold">Prêt à lancer votre projet ?</h2>
          <p className="text-sm mt-1">Obtenez un devis personnalisé sous 24h.</p>
        </div>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-brand-cyan transition-colors">
          Contactez-nous <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  </SiteLayout>
);

export default Services;
