import { Mail, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/useLang";

const ContactCtaBanner = () => {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-background dark:bg-card">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-center md:items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex size-14 md:size-16 rounded-full bg-primary items-center justify-center flex-shrink-0">
            <Mail className="size-7 md:size-8 text-fluo-yellow animate-mail-pulse" strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-impact text-2xl sm:text-3xl md:text-4xl uppercase font-extrabold text-foreground leading-tight tracking-tight">
              {t("cta.contact.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-xl">
              {t("cta.contact.subtitle")}
            </p>
          </div>
        </div>
        <a
          href="mailto:sales@rotom-power.com"
          className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-impact text-xs sm:text-sm font-bold uppercase tracking-[0.18em] px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:bg-fluo-yellow hover:text-fluo-yellow-foreground hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.5)] transition-all w-full md:w-auto"
        >
          {t("cta.contact.button")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default ContactCtaBanner;
