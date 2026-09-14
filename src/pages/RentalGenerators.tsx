import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { toast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/useLang";
import { Send, User, Settings2, CheckCircle2 } from "lucide-react";

const KVA_OPTIONS = [
  "6 kVA", "10 kVA", "13 kVA", "20 kVA", "30 kVA", "40 kVA", "50 kVA", "60 kVA",
  "80 kVA", "100 kVA", "125 kVA", "150 kVA", "175 kVA", "200 kVA", "250 kVA",
  "275 kVA", "300 kVA", "375 kVA", "400 kVA", "410 kVA", "450 kVA", "500 kVA",
  "550 kVA", "600 kVA", "640 kVA", "650 kVA", "675 kVA", "700 kVA",
];

const PRIME_HOURS = Array.from({ length: 17 }, (_, i) => String(i + 8)); // 8..24
const RENTAL_DAYS = [
  ...Array.from({ length: 81 }, (_, i) => String(i + 10)), // 10..90
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  genset: string;
  category: "" | "Prime" | "Standby";
  hours: string;
  rentalDays: string;
  rentalDaysPlus: boolean;
  locationType: "" | "Local" | "Remote";
  city: string;
  ats: "" | "Yes" | "No";
  extra: string;
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  genset: "",
  category: "",
  hours: "",
  rentalDays: "",
  rentalDaysPlus: false,
  locationType: "",
  city: "",
  ats: "",
  extra: "",
};

const RentalGenerators = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailLabels = lang === "fr"
      ? {
          subject: "Demande de location — ROTOM",
          fromName: "Demande de location ROTOM",
          customerSection: "INFORMATIONS CLIENT",
          rentalSection: "DÉTAILS DE LA LOCATION",
          fullName: "Nom complet",
          company: "Société",
          email: "Email",
          phone: "Téléphone",
          genset: "Groupe électrogène",
          category: "Catégorie",
          hours: "Heures",
          rentalDays: "Jours de location",
          rentalLocation: "Lieu de location",
          city: "Ville",
          atsAvailability: "Disponibilité d'un ATS existant",
          extraDetails: "Détails du matériel supplémentaire",
          standbyHours: "4 heures",
          daysAndAbove: "90 jours et plus",
          prime: "Prime",
          standby: "Secours",
          local: "Local",
          remote: "Éloigné",
          yes: "Oui",
          no: "Non",
        }
      : {
          subject: "Rental Request — ROTOM",
          fromName: "ROTOM Rental Request",
          customerSection: "CUSTOMER INFORMATION",
          rentalSection: "RENTAL DETAILS",
          fullName: "Full name",
          company: "Company",
          email: "Email",
          phone: "Phone",
          genset: "Genset",
          category: "Category",
          hours: "Hours",
          rentalDays: "Rental days",
          rentalLocation: "Location for rental",
          city: "City",
          atsAvailability: "Existing ATS availability",
          extraDetails: "Extra material details",
          standbyHours: "4 hours",
          daysAndAbove: "90 days and above",
          prime: "Prime",
          standby: "Standby",
          local: "Local",
          remote: "Remote",
          yes: "Yes",
          no: "No",
        };
    const category = form.category === "Standby" ? emailLabels.standby : emailLabels.prime;
    const rentalLocation = form.locationType === "Remote" ? emailLabels.remote : emailLabels.local;
    const atsAvailability = form.ats === "Yes" ? emailLabels.yes : emailLabels.no;
    const data = new URLSearchParams();
    data.append("access_key", "5bcbb7a9-17d8-4271-ba1a-c5f93fdfb8d7");
    data.append("subject", emailLabels.subject);
    data.append("from_name", form.name || emailLabels.fromName);
    data.append("replyto", form.email);

    data.append(emailLabels.customerSection, "");
    data.append(emailLabels.fullName, form.name);
    data.append(emailLabels.company, form.company);
    data.append(emailLabels.email, form.email);
    data.append(emailLabels.phone, form.phone);

    data.append(emailLabels.rentalSection, "");
    data.append(emailLabels.genset, form.genset);
    data.append(emailLabels.category, category);
    if (form.category === "Prime") data.append(emailLabels.hours, form.hours);
    if (form.category === "Standby") data.append(emailLabels.hours, emailLabels.standbyHours);
    data.append(
      emailLabels.rentalDays,
      form.rentalDaysPlus ? emailLabels.daysAndAbove : form.rentalDays,
    );
    data.append(emailLabels.rentalLocation, rentalLocation);
    data.append(emailLabels.city, form.city);
    data.append(emailLabels.atsAvailability, atsAvailability);
    data.append(emailLabels.extraDetails, form.extra || "—");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: data,
      });
      if (!res.ok) throw new Error("send failed");
      toast({
        title: t("custom.toast.title"),
        description: t("custom.toast.desc"),
      });
      setSubmitted(true);
      setForm(initial);
    } catch {
      toast({
        title: t("custom.toast.error.title"),
        description: t("custom.toast.error.desc"),
      });
    }
  };

  return (
    <SiteLayout>
      <Seo
        title={
          lang === "en"
            ? "Rental generators — Diesel genset rental — ROTOM Madagascar"
            : "Générateurs en location — Location de groupes électrogènes — ROTOM Madagascar"
        }
        description={
          lang === "en"
            ? "Rent a diesel generator in Madagascar: prime or standby, from 6 to 700 kVA. Fast response from ROTOM Antananarivo."
            : "Louez un groupe électrogène diesel à Madagascar : prime ou secours, de 6 à 700 kVA. Réponse rapide ROTOM Antananarivo."
        }
        path="/rental-generators"
      />
      <PageHero
        eyebrow={t("rental.hero.eyebrow")}
        title={t("rental.hero.title")}
        subtitle={t("rental.hero.subtitle")}
        breadcrumb={[
          { label: t("common.home"), to: "/" },
          { label: t("rental.hero.title") },
        ]}
      />

      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-14">
        {submitted ? (
          <Reveal
            variant="fade-in-up"
            className="max-w-2xl mx-auto bg-card border-2 border-border p-10 text-center"
          >
            <div className="mx-auto size-16 rounded-full bg-fluo-yellow/20 flex items-center justify-center mb-5">
              <CheckCircle2 className="size-8 text-primary" strokeWidth={2.5} />
            </div>
            <h3 className="font-impact text-2xl uppercase font-bold text-primary mb-2">
              {t("custom.success.title")}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t("custom.success.body")}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm uppercase tracking-wider px-6 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-all"
            >
              {t("custom.success.again")}
            </button>
          </Reveal>
        ) : (
          <Reveal
            variant="fade-in-up"
            className="max-w-4xl mx-auto bg-card border-2 border-border p-5 sm:p-8"
          >
            <form onSubmit={onSubmit} className="space-y-10">
              {/* Rental details */}
              <Section icon={Settings2} title={t("rental.sec.details.title")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("rental.f.genset")} id="genset">
                    <Select
                      required
                      id="genset"
                      value={form.genset}
                      onChange={(e) => set("genset", e.target.value)}
                    >
                      <option value="">{t("custom.opt.select")}</option>
                      {KVA_OPTIONS.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label={t("rental.f.category")} id="category">
                    <Select
                      required
                      id="category"
                      value={form.category}
                      onChange={(e) => {
                        const v = e.target.value as FormState["category"];
                        setForm((f) => ({ ...f, category: v, hours: "" }));
                      }}
                    >
                      <option value="">{t("custom.opt.select")}</option>
                      <option value="Prime">{t("rental.opt.prime")}</option>
                      <option value="Standby">{t("rental.opt.standby")}</option>
                    </Select>
                  </Field>

                  {form.category === "Prime" && (
                    <Field label={t("rental.f.hours")} id="hours">
                      <Select
                        required
                        id="hours"
                        value={form.hours}
                        onChange={(e) => set("hours", e.target.value)}
                      >
                        <option value="">{t("custom.opt.select")}</option>
                        {PRIME_HOURS.map((h) => (
                          <option key={h} value={h}>
                            {h} h
                          </option>
                        ))}
                      </Select>
                    </Field>
                  )}

                  {form.category === "Standby" && (
                    <Field label={t("rental.f.hours")} id="hours-fixed">
                      <Input
                        id="hours-fixed"
                        value="4 hours"
                        readOnly
                        className="bg-muted cursor-not-allowed"
                      />
                    </Field>
                  )}

                  <Field label={t("rental.f.days")} id="rentalDays">
                    <Select
                      required={!form.rentalDaysPlus}
                      id="rentalDays"
                      value={form.rentalDaysPlus ? "plus" : form.rentalDays}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "plus") {
                          setForm((f) => ({
                            ...f,
                            rentalDaysPlus: true,
                            rentalDays: "",
                          }));
                        } else {
                          setForm((f) => ({
                            ...f,
                            rentalDaysPlus: false,
                            rentalDays: v,
                          }));
                        }
                      }}
                    >
                      <option value="">{t("custom.opt.select")}</option>
                      {RENTAL_DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d} {lang === "en" ? "days" : "jours"}
                        </option>
                      ))}
                      <option value="plus">{t("rental.opt.daysPlus")}</option>
                    </Select>
                  </Field>

                  <Field label={t("rental.f.location")} id="locationType">
                    <Select
                      required
                      id="locationType"
                      value={form.locationType}
                      onChange={(e) =>
                        set("locationType", e.target.value as FormState["locationType"])
                      }
                    >
                      <option value="">{t("custom.opt.select")}</option>
                      <option value="Local">{t("rental.opt.local")}</option>
                      <option value="Remote">{t("rental.opt.remote")}</option>
                    </Select>
                  </Field>

                  {form.locationType && (
                    <Field
                      label={t("rental.f.city")}
                      id="city"
                      className="md:col-span-2"
                    >
                      <Input
                        required
                        id="city"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        placeholder={t("rental.f.cityPh")}
                      />
                    </Field>
                  )}

                  <Field label={t("rental.f.ats")} id="ats" className="md:col-span-2">
                    <div className="flex items-center gap-6 pt-1">
                      {(["Yes", "No"] as const).map((opt) => (
                        <label key={opt} className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="ats"
                            value={opt}
                            required
                            checked={form.ats === opt}
                            onChange={() => set("ats", opt)}
                            className="accent-brand-cyan"
                          />
                          <span className="text-sm">
                            {opt === "Yes" ? t("rental.opt.yes") : t("rental.opt.no")}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  {form.ats && (
                    <Field label={t("rental.f.extra")} id="extra" className="md:col-span-2">
                      <textarea
                        id="extra"
                        rows={4}
                        value={form.extra}
                        onChange={(e) => set("extra", e.target.value)}
                        placeholder={t("rental.f.extraPh")}
                        className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan resize-none"
                      />
                    </Field>
                  )}
                </div>
              </Section>

              {/* Contact */}
              <Section icon={User} title={t("custom.sec.client.title")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("custom.f.name")} id="name">
                    <Input
                      required
                      id="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </Field>
                  <Field label={t("custom.f.company")} id="company">
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                  </Field>
                  <Field label={t("custom.f.email")} id="email">
                    <Input
                      required
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label={t("custom.f.phone")} id="phone">
                    <Input
                      type="tel"
                      id="phone"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </Field>
                </div>
              </Section>

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
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-start gap-3 mb-5">
      <div className="size-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Icon className="size-5 text-fluo-yellow" strokeWidth={2} />
      </div>
      <div>
        <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight">
          {title}
        </h3>
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
    <label
      htmlFor={id}
      className="font-impact text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block"
    >
      {label}
    </label>
    {children}
  </div>
);

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan ${className ?? ""}`}
  />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan"
  />
);

export default RentalGenerators;
