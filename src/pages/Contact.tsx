import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import SalesTeamStrip from "@/components/SalesTeamStrip";
import { toast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Check, ChevronsUpDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t("contact.toast.title"), description: t("contact.toast.desc") });
    setForm({ name: "", company: "", email: "", phone: "", power: "", subject: t("contact.subject.quote"), message: "" });
  };

  const selectedProduct = form.power ? findProductBySlug(form.power) : null;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("nav.contact") }]}
      />

      {/* Quick contact bar */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-[1500px] mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Phone, label: t("contact.quick.phone"), value: "+31 (0)165 55 60 62", href: "tel:+31165556062", color: "text-accent" },
            { icon: Mail, label: t("contact.quick.email"), value: "sales@rotom.com", href: "mailto:sales@rotom.com", color: "text-brand-cyan" },
            { icon: MessageCircle, label: t("contact.quick.whatsapp"), value: t("contact.quick.whatsappValue"), href: "#", color: "text-accent" },
            { icon: Clock, label: t("contact.quick.hours"), value: t("contact.quick.hoursValue"), href: undefined, color: "text-brand-cyan" },
          ].map((item) => {
            const Inner = (
              <div className="flex items-center gap-3 bg-card border-2 border-border p-4 h-full hover:border-primary transition-colors">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <item.icon className={`size-5 ${item.color}`} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="font-impact text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</div>
                  <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                </div>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href}>{Inner}</a>
            ) : (
              <div key={item.label}>{Inner}</div>
            );
          })}
        </div>
      </section>

      {/* Form + infos */}
      <section className="max-w-[1500px] mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
        <div className="bg-card border-2 border-border p-8">
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
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-impact text-sm uppercase tracking-wider px-8 py-3.5 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors">
              <Send className="size-4" /> {t("contact.form.send")}
            </button>
          </form>
        </div>

        {/* Side infos */}
        <aside className="space-y-6">
          <div className="bg-primary text-primary-foreground p-6 border-l-8 border-fluo-yellow">
            <h3 className="font-impact text-lg uppercase font-bold mb-4">{t("contact.hq")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 text-accent flex-shrink-0 mt-0.5" />
                <span>ROTOM Power Solutions<br />Bredaseweg 26<br />4705 RN Roosendaal<br />Pays-Bas</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-accent flex-shrink-0" />
                <a href="tel:+31165556062" className="text-accent font-bold hover:underline">+31 (0)165 55 60 62</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-brand-cyan flex-shrink-0" />
                <a href="mailto:sales@rotom.com" className="text-brand-cyan hover:underline">sales@rotom.com</a>
              </li>
            </ul>
          </div>

          <div className="border-2 border-border overflow-hidden">
            <iframe
              title="ROTOM Roosendaal"
              src="https://www.openstreetmap.org/export/embed.html?bbox=4.43%2C51.52%2C4.49%2C51.55&layer=mapnik&marker=51.535%2C4.46"
              className="w-full h-[280px] border-0"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      <section className="border-t-2 border-border bg-secondary py-12">
        <div className="max-w-[1500px] mx-auto px-6 mb-6 text-center">
          <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">{t("contact.team.eyebrow")}</div>
          <h2 className="font-impact text-3xl uppercase font-bold text-primary">{t("contact.team.title")}</h2>
        </div>
        <SalesTeamStrip />
      </section>
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
