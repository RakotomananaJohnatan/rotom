import { Mail, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/useLang";

const ContactCtaBanner = () => {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-background dark:bg-card">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-1.5 sm:py-2 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-center md:text-left">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex size-10 md:size-12 rounded-full bg-primary items-center justify-center flex-shrink-0">
            <Mail className="size-5 md:size-6 text-fluo-yellow animate-mail-pulse" strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-impact text-lg sm:text-xl md:text-2xl uppercase font-extrabold text-foreground leading-tight tracking-tight">
              {t("cta.contact.title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 max-w-xl">
              {t("cta.contact.subtitle")}
            </p>
          </div>
        </div>
        <a
          href="mailto:sales@rotom-power.com"
          className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-impact text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-fluo-yellow hover:text-fluo-yellow-foreground hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.5)] transition-all w-full md:w-auto"
        >
          {t("cta.contact.button")}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default ContactCtaBanner;
