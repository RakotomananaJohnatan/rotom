import { Mail, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/useLang";

const ContactCtaBanner = () => {
  const { t } = useLang();
  return (
    <section
      className="relative overflow-hidden border-y-2 border-black"
      style={{ backgroundColor: "#c4ff00" }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex size-14 md:size-16 rounded-full bg-black items-center justify-center flex-shrink-0">
            <Mail className="size-7 md:size-8" style={{ color: "#c4ff00" }} strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-impact text-2xl sm:text-3xl md:text-4xl uppercase font-extrabold text-black leading-tight tracking-tight">
              {t("cta.contact.title")}
            </h2>
            <p className="text-sm sm:text-base text-black/80 mt-1 max-w-xl">
              {t("cta.contact.subtitle")}
            </p>
          </div>
        </div>
        <a
          href="mailto:sales@rotom-power.com"
          className="group inline-flex items-center justify-center gap-2 bg-black text-white font-impact text-xs sm:text-sm font-bold uppercase tracking-[0.18em] px-6 sm:px-8 py-4 sm:py-5 rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all w-full md:w-auto"
        >
          {t("cta.contact.button")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default ContactCtaBanner;
