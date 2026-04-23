import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Fuel, Zap, Box, Volume2, Cable, Gauge, ArrowRight } from "lucide-react";

const equipments = [
  { icon: Zap, title: "Inverseurs de source (ATS)", desc: "Commutation automatique entre réseau et groupe.", count: 18 },
  { icon: Fuel, title: "Citernes & réservoirs", desc: "Réservoirs additionnels 500L à 10 000L double paroi.", count: 12 },
  { icon: Volume2, title: "Capotages insonorisés", desc: "Réduction sonore jusqu'à 65 dB(A) à 7 mètres.", count: 9 },
  { icon: Box, title: "Containers 20'/40'", desc: "Conteneurs aménagés pour groupes haute puissance.", count: 7 },
  { icon: Cable, title: "Câblage & coffrets", desc: "Coffrets de couplage, parallèles, synchronisation.", count: 14 },
  { icon: Gauge, title: "Modules de contrôle", desc: "DSE, ComAp, télémaintenance et supervision GSM.", count: 22 },
];

const Equipements = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Solutions complètes"
      title="Équipements Associés"
      subtitle="Au-delà du groupe électrogène, ROTOM fournit l'ensemble des équipements pour une installation clé en main : inversion, stockage, insonorisation, supervision."
      breadcrumb={[{ label: "Accueil", to: "/" }, { label: "Équipements associés" }]}
    />

    <section className="max-w-[1500px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {equipments.map((eq) => (
          <article key={eq.title} className="bg-card border-2 border-border p-6 group hover:border-fluo-yellow hover:shadow-block transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="size-14 rounded-full bg-primary flex items-center justify-center group-hover:bg-fluo-yellow transition-colors">
                <eq.icon className="size-7 text-fluo-yellow group-hover:text-fluo-yellow-foreground" strokeWidth={1.5} />
              </div>
              <span className="font-mono-spec text-xs text-brand-cyan bg-brand-cyan/10 px-2 py-1">{eq.count} réf.</span>
            </div>
            <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight mb-2">{eq.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{eq.desc}</p>
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-impact uppercase tracking-wider text-brand-cyan hover:text-fluo-yellow transition-colors">
              Demander un devis <ArrowRight className="size-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-primary text-primary-foreground border-y-4 border-fluo-yellow">
      <div className="max-w-[1500px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
        <div>
          <h2 className="font-impact text-3xl uppercase font-bold mb-2">Une demande spécifique ?</h2>
          <p className="text-white/80">Notre bureau d'études conçoit des solutions sur mesure pour votre projet.</p>
        </div>
        <Link to="/contact" className="bg-fluo-yellow text-fluo-yellow-foreground font-impact text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-accent transition-colors">
          Nous consulter
        </Link>
      </div>
    </section>
  </SiteLayout>
);

export default Equipements;
