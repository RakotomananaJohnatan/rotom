import { useRef, useState } from "react";
import BrandCascadeSelect, { type BrandOption } from "@/components/BrandCascadeSelect";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { toast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/useLang";
import {
  Send,
  User,
  Gauge,
  Settings2,
  CheckCircle2,
} from "lucide-react";

const ENGINE_BRANDS: BrandOption[] = [
  { value: "Perkins", label: "Perkins", color: "#0033A0" },
  { value: "Cummins", label: "Cummins", color: "#C8102E" },
  { value: "Baudouin", label: "Baudouin", color: "#1B3A6B" },
  { value: "Volvo Penta", label: "Volvo Penta", color: "#1E3160" },
  { value: "Doosan", label: "Doosan", color: "#F58220" },
  { value: "Weichai", label: "Weichai", color: "#E30613" },
  { value: "Yuchai", label: "Yuchai", color: "#0B6E4F" },
  { value: "SME", label: "SME", color: "#333333" },
  { value: "SCANIA", label: "SCANIA", color: "#041E42" },
  { value: "YANMAR", label: "YANMAR", color: "#C8102E" },
  { value: "KUBOTA", label: "KUBOTA", color: "#F5A623" },
  { value: "HD Hyundai", label: "HD Hyundai", color: "#002C5F" },
  { value: "FAW", label: "FAW", color: "#B71C1C" },
  { value: "SDEC", label: "SDEC", color: "#1F6FEB" },
];

const ALTERNATOR_BRANDS: BrandOption[] = [
  { value: "Stamford", label: "Stamford", color: "#003DA5" },
  { value: "Leroy Somer", label: "Leroy Somer", color: "#E30613" },
  { value: "Mecc Alte", label: "Mecc Alte", color: "#0B4D8C" },
];

const CONTROLLERS: BrandOption[] = [
  { value: "Deep Sea Electronics (DSE)", label: "Deep Sea Electronics (DSE)", color: "#004990" },
  { value: "SmartGen", label: "SmartGen", color: "#0A8F3C" },
  { value: "ComAp", label: "ComAp", color: "#E30613" },
];


type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  genType: string;
  power: string;
  fuel: string;
  usage: string;
  autonomy: string;
  noise: string;
  installation: string;
  quantity: string;
  budget: string;
  deadline: string;
  conditions: string;
  description: string;
  engineBrand: string;
  alternatorBrand: string;
  controller: string;
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  genType: "",
  power: "",
  fuel: "",
  usage: "",
  autonomy: "",
  noise: "",
  installation: "",
  quantity: "",
  budget: "",
  deadline: "",
  conditions: "",
  description: "",
  engineBrand: "",
  alternatorBrand: "",
  controller: "",
};

const DemandeSurMesure = () => {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.append("access_key", "5bcbb7a9-17d8-4271-ba1a-c5f93fdfb8d7");
    data.append("subject", "Demande sur mesure — ROTOM");
    data.append("from_name", form.name || "Demande sur mesure ROTOM");
    data.append("replyto", form.email);

    data.append("INFORMATIONS CLIENT", "");
    data.append("Nom complet", form.name);
    data.append("Société", form.company);
    data.append("Email", form.email);
    data.append("Téléphone", form.phone);
    data.append("Pays/Ville", form.location);

    data.append("BESOIN TECHNIQUE", "");
    data.append("Type de groupe électrogène", form.genType);
    data.append("Puissance souhaitée (kVA)", form.power);
    data.append("Type de carburant", form.fuel);
    data.append("Usage prévu", form.usage);
    data.append("Autonomie souhaitée", form.autonomy);
    data.append("Installation souhaitée", form.installation);
    data.append("Localisation", form.location);
    data.append("Engine Brand", form.engineBrand || "Non renseigné");
    data.append("Alternator Brand", form.alternatorBrand || "Non renseigné");
    data.append("Controller/Operating Module", form.controller || "Non renseigné");
    data.append("Objectif souhaité", form.description);

    data.append("CONTRAINTES & BESOINS SPÉCIFIQUES", "");
    data.append("Budget estimatif", form.budget);
    data.append("Délai souhaité", form.deadline);
    data.append("Conditions d'installation", form.conditions);
    data.append("Exigences particulières", form.description);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: data,
      });
      toast({
        title: t("custom.toast.title"),
        description: t("custom.toast.desc"),
      });
      setSubmitted(true);
      setForm(initial);
    } catch {
      toast({ title: t("custom.toast.error.title"), description: t("custom.toast.error.desc") });
    }
  };

  return (
    <SiteLayout>
      <Seo
        title="Demande sur mesure — ROTOM"
        description="Configurez votre groupe électrogène sur mesure : puissance, carburant, contraintes techniques. Réponse technique personnalisée ROTOM."
        path="/demande-sur-mesure"
      />
      <PageHero
        eyebrow={t("custom.hero.eyebrow")}
        title={t("custom.hero.title")}
        subtitle={t("custom.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("nav.custom") }]}
      />

      {/* Intro */}
      <section className="border-b border-border bg-secondary">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          <Reveal variant="fade-in-up">
            <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-3">
              {t("custom.intro.eyebrow")}
            </div>
            <h2 className="font-impact text-2xl sm:text-3xl uppercase font-bold text-primary mb-3">
              {t("custom.intro.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
              {t("custom.intro.body")}
            </p>
          </Reveal>
          <Reveal variant="fade-in-up" delay={120}>
            <button
              type="button"
              onClick={scrollToForm}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm uppercase tracking-wider px-8 py-3.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-all hover:scale-105"
            >
              <Send className="size-4 transition-transform group-hover:translate-x-1" />
              {t("custom.cta.send")}
            </button>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section ref={formRef} className="max-w-[1500px] mx-auto px-4 sm:px-6 py-14">
        {submitted ? (
          <Reveal variant="fade-in-up" className="max-w-2xl mx-auto bg-card border-2 border-border p-10 text-center">
            <div className="mx-auto size-16 rounded-full bg-fluo-yellow/20 flex items-center justify-center mb-5">
              <CheckCircle2 className="size-8 text-primary" strokeWidth={2.5} />
            </div>
            <h3 className="font-impact text-2xl uppercase font-bold text-primary mb-2">
              {t("custom.success.title")}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">{t("custom.success.body")}</p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm uppercase tracking-wider px-6 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-all"
            >
              {t("custom.success.again")}
            </button>
          </Reveal>
        ) : (
          <Reveal variant="fade-in-up" className="bg-card border-2 border-border p-5 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-10">
              {/* Section: Client */}
              <Section icon={User} title={t("custom.sec.client.title")} desc={t("custom.sec.client.desc")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("custom.f.name")} id="name">
                    <Input required id="name" value={form.name} onChange={onChange("name")} />
                  </Field>
                  <Field label={t("custom.f.company")} id="company">
                    <Input id="company" value={form.company} onChange={onChange("company")} />
                  </Field>
                  <Field label={t("custom.f.email")} id="email">
                    <Input required type="email" id="email" value={form.email} onChange={onChange("email")} />
                  </Field>
                  <Field label={t("custom.f.phone")} id="phone">
                    <Input type="tel" id="phone" value={form.phone} onChange={onChange("phone")} />
                  </Field>
                  <Field label={t("custom.f.location")} id="location" className="md:col-span-2">
                    <Input id="location" value={form.location} onChange={onChange("location")} placeholder={t("custom.f.locationPh")} />
                  </Field>
                </div>
              </Section>

              {/* Section: Technique */}
              <Section icon={Gauge} title={t("custom.sec.tech.title")} desc={t("custom.sec.tech.desc")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("custom.f.genType")} id="genType">
                    <Select id="genType" value={form.genType} onChange={onChange("genType")}>
                      <option value="">{t("custom.opt.select")}</option>
                      <option>{t("custom.opt.genType.open")}</option>
                      <option>{t("custom.opt.genType.closed")}</option>
                      <option>{t("custom.opt.genType.container")}</option>
                      <option>{t("custom.opt.genType.mobile")}</option>
                      <option>{t("custom.opt.genType.hybrid")}</option>
                    </Select>
                  </Field>
                  <Field label={t("custom.f.power")} id="power">
                    <Input id="power" value={form.power} onChange={onChange("power")} placeholder={t("custom.f.powerPh")} />
                  </Field>
                  <Field label={t("custom.f.fuel")} id="fuel">
                    <Select id="fuel" value={form.fuel} onChange={onChange("fuel")}>
                      <option value="">{t("custom.opt.select")}</option>
                      <option>{t("custom.opt.fuel.diesel")}</option>
                      <option>{t("custom.opt.fuel.gas")}</option>
                      <option>{t("custom.opt.fuel.gasoline")}</option>
                      <option>{t("custom.opt.fuel.hybrid")}</option>
                    </Select>
                  </Field>
                  <Field label={t("custom.f.usage")} id="usage">
                    <Select id="usage" value={form.usage} onChange={onChange("usage")}>
                      <option value="">{t("custom.opt.select")}</option>
                      <option>{t("custom.opt.usage.backup")}</option>
                      <option>{t("custom.opt.usage.continuous")}</option>
                      <option>{t("custom.opt.usage.site")}</option>
                      <option>{t("custom.opt.usage.event")}</option>
                      <option>{t("custom.opt.usage.industrial")}</option>
                    </Select>
                  </Field>
                  <Field label={t("custom.f.autonomy")} id="autonomy">
                    <Input id="autonomy" value={form.autonomy} onChange={onChange("autonomy")} placeholder={t("custom.f.autonomyPh")} />
                  </Field>
                  <Field label={t("custom.f.noise")} id="noise">
                    <Input id="noise" value={form.noise} onChange={onChange("noise")} placeholder={t("custom.f.noisePh")} />
                  </Field>
                  <Field label={t("custom.f.installation")} id="installation">
                    <Select id="installation" value={form.installation} onChange={onChange("installation")}>
                      <option value="">{t("custom.opt.select")}</option>
                      <option>{t("custom.opt.install.fixed")}</option>
                      <option>{t("custom.opt.install.mobile")}</option>
                    </Select>
                  </Field>
                  <Field label={t("custom.f.quantity")} id="quantity">
                    <Input type="number" min={1} id="quantity" value={form.quantity} onChange={onChange("quantity")} />
                  </Field>
                </div>

                {/* Cascading brand selects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <BrandCascadeSelect
                    id="engineBrand"
                    label={t("custom.f.engineBrand")}
                    placeholder={t("custom.f.brandPlaceholder")}
                    options={ENGINE_BRANDS}
                    value={form.engineBrand}
                    onChange={(v) =>
                      setForm((f) => ({ ...f, engineBrand: v, alternatorBrand: "", controller: "" }))
                    }
                  />
                  {form.engineBrand && (
                    <BrandCascadeSelect
                      id="alternatorBrand"
                      label={t("custom.f.alternatorBrand")}
                      placeholder={t("custom.f.brandPlaceholder")}
                      options={ALTERNATOR_BRANDS}
                      value={form.alternatorBrand}
                      onChange={(v) =>
                        setForm((f) => ({ ...f, alternatorBrand: v, controller: "" }))
                      }
                    />
                  )}
                  {form.alternatorBrand && (
                    <BrandCascadeSelect
                      id="controller"
                      label={t("custom.f.controller")}
                      placeholder={t("custom.f.controllerPlaceholder")}
                      options={CONTROLLERS}
                      value={form.controller}
                      onChange={(v) => setForm((f) => ({ ...f, controller: v }))}
                    />
                  )}
                </div>
              </Section>

              {/* Section: Contraintes */}
              <Section icon={Settings2} title={t("custom.sec.constraints.title")} desc={t("custom.sec.constraints.desc")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("custom.f.budget")} id="budget">
                    <Input id="budget" value={form.budget} onChange={onChange("budget")} placeholder={t("custom.f.budgetPh")} />
                  </Field>
                  <Field label={t("custom.f.deadline")} id="deadline">
                    <Input id="deadline" value={form.deadline} onChange={onChange("deadline")} placeholder={t("custom.f.deadlinePh")} />
                  </Field>
                  <Field label={t("custom.f.conditions")} id="conditions" className="md:col-span-2">
                    <Input id="conditions" value={form.conditions} onChange={onChange("conditions")} placeholder={t("custom.f.conditionsPh")} />
                  </Field>
                  <Field label={t("custom.f.description")} id="description" className="md:col-span-2">
                    <textarea
                      required
                      id="description"
                      rows={6}
                      value={form.description}
                      onChange={onChange("description")}
                      placeholder={t("custom.f.descriptionPh")}
                      className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan resize-none"
                    />
                  </Field>
                </div>
              </Section>

              {/* Note: documents */}
              <p className="text-sm text-muted-foreground">
                {t("custom.files.note")}{" "}
                <a
                  href={`mailto:${t("custom.files.email")}`}
                  className="text-brand-cyan hover:underline"
                >
                  {t("custom.files.email")}
                </a>
              </p>

              <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm uppercase tracking-wider px-8 py-3.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-all hover:scale-105"
                >
                  <Send className="size-4 transition-transform group-hover:translate-x-1" />
                  {t("custom.cta.send")}
                </button>
                <p className="text-xs text-muted-foreground self-center">
                  {t("custom.form.required")}
                </p>
              </div>
            </form>
          </Reveal>
        )}
      </section>
    </SiteLayout>
  );
};

const Section = ({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ElementType;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-start gap-3 mb-5">
      <div className="size-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Icon className="size-5 text-fluo-yellow" strokeWidth={2} />
      </div>
      <div>
        <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight">{title}</h3>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
    </div>
    {children}
  </div>
);

const Field = ({
  label,
  id,
  children,
  className,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`min-w-0 ${className ?? ""}`}>
    <label htmlFor={id} className="font-impact text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">
      {label}
    </label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan"
  />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan"
  />
);

export default DemandeSurMesure;
