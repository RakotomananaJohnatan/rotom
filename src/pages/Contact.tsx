import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import ContactCtaBanner from "@/components/ContactCtaBanner";
import { toast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Check, ChevronsUpDown } from "lucide-react";
import { useLang } from "@/i18n/useLang";
import Reveal from "@/components/Reveal";
import { allProducts, findProductBySlug } from "@/data/products";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    power: "",
    subject: t("contact.subject.quote"),
    message: "",
  });
  const [openPower, setOpenPower] = useState(false);

  useEffect(() => {
    const slug = searchParams.get("power");
    if (slug) {
      const product = findProductBySlug(slug);
      if (product) setForm((f) => ({ ...f, power: product.slug }));
    }
  }, [searchParams]);

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selected = form.power ? findProductBySlug(form.power) : null;
    const powerLabel = selected ? `${selected.kva} — ${selected.name}` : "";
    const data = new URLSearchParams();
    data.append("access_key", "5bcbb7a9-17d8-4271-ba1a-c5f93fdfb8d7");
    data.append("subject", `Contact ROTOM — ${form.subject}`);
    data.append("from_name", form.name || "Contact ROTOM");
    data.append("replyto", form.email);
    data.append("CONTACT", "");
    data.append("Nom complet", form.name);
    data.append("Société", form.company);
    data.append("Email", form.email);
    data.append("Téléphone", form.phone);
    data.append("Puissance recherchée (kVA)", powerLabel);
    data.append("Sujet", form.subject);
    data.append("Message", form.message);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: data,
      });
      toast({
        title: t("contact.toast.title"),
        description: t("contact.toast.desc"),
      });
      setForm({ name: "", company: "", email: "", phone: "", power: "", subject: t("contact.subject.quote"), message: "" });
    } catch {
      toast({ title: t("contact.toast.error.title"), description: t("contact.toast.error.desc") });
    }
  };

  const selectedProduct = form.power ? findProductBySlug(form.power) : null;

  return (
    <SiteLayout>
      <Seo
        title="Contact — ROTOM"
        description="Contactez ROTOM pour un devis sur un groupe électrogène industriel, une demande de maintenance ou une intervention urgente."
        path="/contact"
      />
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("nav.contact") }]}
      />

      {/* Quick contact bar */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Phone, label: t("contact.quick.phone"), value: "+261 38 11 531 04", href: "tel:+261381153104", color: "text-accent" },
            { icon: Mail, label: t("contact.quick.email"), value: "sales@rotom-power.com", href: "mailto:sales@rotom-power.com", color: "text-brand-cyan" },
            { icon: MessageCircle, label: t("contact.quick.whatsapp"), value: t("contact.quick.whatsappValue"), href: "https://wa.me/261381153104", color: "text-accent" },
            { icon: Clock, label: t("contact.quick.hours"), value: t("contact.quick.hoursValue"), href: undefined, color: "text-brand-cyan" },
          ].map((item, i) => {
            const Inner = (
              <div className="lift flex items-center gap-3 bg-card border-2 border-border p-4 h-full hover:border-primary transition-colors group">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className={`size-5 ${item.color}`} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="font-impact text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</div>
                  <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                </div>
              </div>
            );
            return (
              <Reveal key={item.label} variant="fade-in-up" delay={i * 80}>
                {item.href ? <a href={item.href}>{Inner}</a> : Inner}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Form + infos */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
        <Reveal variant="slide-in-left" className="bg-card border-2 border-border p-5 sm:p-8">
          <h2 className="font-impact text-2xl uppercase font-bold text-primary mb-1">{t("contact.form.title")}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t("contact.form.required")}</p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={t("contact.form.name")} id="name">
                <input required value={form.name} onChange={onChange("name")} id="name" type="text"
                  className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan" />
              </Field>
              <Field label={t("contact.form.company")} id="company">
                <input value={form.company} onChange={onChange("company")} id="company" type="text"
                  className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan" />
              </Field>
              <Field label={t("contact.form.email")} id="email">
                <input required value={form.email} onChange={onChange("email")} id="email" type="email"
                  className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan" />
              </Field>
              <Field label={t("contact.form.phone")} id="phone">
                <input value={form.phone} onChange={onChange("phone")} id="phone" type="tel"
                  className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan" />
              </Field>

              {/* Searchable Combobox for power */}
              <Field label={t("contact.form.power")} id="power">
                <Popover open={openPower} onOpenChange={setOpenPower}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      role="combobox"
                      aria-expanded={openPower}
                      className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan flex items-center justify-between text-left"
                    >
                      <span className={cn("truncate", !selectedProduct && "text-muted-foreground")}>
                        {selectedProduct ? `${selectedProduct.kva} — ${selectedProduct.name}` : t("contact.form.powerPlaceholder")}
                      </span>
                      <ChevronsUpDown className="size-4 text-muted-foreground flex-shrink-0 ml-2" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput placeholder={t("contact.form.powerSearch")} />
                      <CommandList>
                        <CommandEmpty>{t("contact.form.powerEmpty")}</CommandEmpty>
                        <CommandGroup>
                          {allProducts.map((p) => (
                            <CommandItem
                              key={p.slug}
                              value={`${p.kva} ${p.name}`}
                              onSelect={() => {
                                setForm((f) => ({ ...f, power: p.slug }));
                                setOpenPower(false);
                              }}
                            >
                              <Check className={cn("mr-2 size-4", form.power === p.slug ? "opacity-100" : "opacity-0")} />
                              <span className="font-bold text-primary mr-2">{p.kva}</span>
                              <span className="truncate">{p.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </Field>

              <Field label={t("contact.form.subject")} id="subject">
                <select value={form.subject} onChange={onChange("subject")} id="subject"
                  className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan">
                  <option>{t("contact.subject.quote")}</option>
                  <option>{t("contact.subject.tech")}</option>
                  <option>{t("contact.subject.svc")}</option>
                  <option>{t("contact.subject.search")}</option>
                  <option>{t("contact.subject.other")}</option>
                </select>
              </Field>
            </div>

            <Field label={t("contact.form.message")} id="message">
              <textarea required value={form.message} onChange={onChange("message")} id="message" rows={6}
                className="w-full border-2 border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-cyan resize-none" />
            </Field>

            <button type="submit"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm uppercase tracking-wider px-8 py-3.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-all hover:scale-105">
              <Send className="size-4 transition-transform group-hover:translate-x-1" /> {t("contact.form.send")}
            </button>
          </form>
        </Reveal>

        {/* Side infos */}
        <Reveal as="aside" variant="slide-in-right" className="space-y-6">
          <div className="relative bg-primary text-primary-foreground p-6 border-l-8 border-fluo-yellow overflow-hidden">
            <div className="absolute -top-12 -right-12 size-40 rounded-full bg-fluo-yellow/15 blur-3xl pointer-events-none" />
            <h3 className="relative font-impact text-lg uppercase font-bold mb-4">{t("contact.hq")}</h3>
            <ul className="relative space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 text-accent flex-shrink-0 mt-0.5" />
                <span>ROTOM Power Generation<br />
                  <a href="https://maps.app.goo.gl/oKPJMuFEaW4FH6vTA" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-cyan">
                    Alarobia, Rue Tsarasaotra<br />Antananarivo 101<br />Madagascar
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-accent flex-shrink-0" />
                <a href="tel:+261381153104" className="text-accent font-bold hover:underline">+261 38 11 531 04</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-brand-cyan flex-shrink-0" />
                <a href="mailto:sales@rotom-power.com" className="text-brand-cyan hover:underline">sales@rotom-power.com</a>
              </li>
            </ul>
          </div>

          <div className="border-2 border-border overflow-hidden lift">
            <iframe
              title="ROTOM Antananarivo"
              src="https://www.openstreetmap.org/export/embed.html?bbox=47.5080%2C-18.8792%2C47.5280%2C-18.8592&layer=mapnik&marker=-18.8692%2C47.5180"
              className="w-full h-[280px] border-0"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>

      <ContactCtaBanner />
    </SiteLayout>
  );
};

const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="font-impact text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 block">{label}</label>
    {children}
  </div>
);

export default Contact;
