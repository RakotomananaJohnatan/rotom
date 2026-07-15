import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Linkedin, Facebook } from "lucide-react";
import { useLang } from "@/i18n/useLang";

const SiteFooter = () => {
  const { t } = useLang();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">{t("footer.about.title")}</h4>
          <p className="text-xs text-white/70 leading-relaxed mb-3">{t("footer.about.body")}</p>
        </div>

        <div>
          <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">{t("footer.links")}</h4>
          <ul className="space-y-2 text-xs text-white/70">
            <li><Link to="/generateurs-neufs" className="hover:text-fluo-yellow">{t("nav.new")}</Link></li>
            <li><Link to="/generateurs-occasion" className="hover:text-fluo-yellow">{t("nav.used")}</Link></li>
            <li><Link to="/equipements" className="hover:text-fluo-yellow">{t("nav.equip")}</Link></li>
            <li><Link to="/services" className="hover:text-fluo-yellow">{t("nav.services")}</Link></li>
            <li><Link to="/contact" className="hover:text-fluo-yellow">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">{t("footer.services")}</h4>
          <ul className="space-y-2 text-xs text-white/70">
            <li><Link to="/services" className="hover:text-fluo-yellow">{t("footer.svc.research")}</Link></li>
            <li><Link to="/services" className="hover:text-fluo-yellow">{t("footer.svc.install")}</Link></li>
            <li><Link to="/services" className="hover:text-fluo-yellow">{t("footer.svc.maintenance")}</Link></li>
            <li><Link to="/services" className="hover:text-fluo-yellow">{t("footer.svc.parts")}</Link></li>
            <li><Link to="/services" className="hover:text-fluo-yellow">{t("footer.svc.financing")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">{t("footer.contact")}</h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="size-3.5 text-accent flex-shrink-0 mt-0.5" />
              <span>ROTOM Power Generation<br />
                <a href="https://maps.app.goo.gl/oKPJMuFEaW4FH6vTA" target="_blank" rel="noopener noreferrer" className="underline hover:text-fluo-yellow">
                  Alarobia, Rue Tsarasaotra<br />Antananarivo 101, Madagascar
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-3.5 text-accent flex-shrink-0" />
              <a href="tel:+261381153104" className="text-accent hover:underline font-bold">+261 38 11 531 04</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 text-brand-cyan flex-shrink-0" />
              <a href="mailto:sales@rotom-power.com" className="text-brand-cyan hover:underline">sales@rotom-power.com</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-3.5 text-accent flex-shrink-0" />
              <a href="https://wa.me/261381153104" target="_blank" rel="noopener noreferrer" className="hover:text-fluo-yellow">{t("footer.whatsapp")}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">{t("footer.follow")}</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="LinkedIn" className="size-10 rounded-full bg-white/10 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground flex items-center justify-center transition-colors">
              <Linkedin className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="size-10 rounded-full bg-white/10 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground flex items-center justify-center transition-colors">
              <Facebook className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-accent text-accent-foreground">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-center">
          <span>{t("footer.copyright")}</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/mentions-legales" className="hover:underline">{t("footer.legal")}</Link>
            <Link to="/conditions-generales" className="hover:underline">{t("footer.terms")}</Link>
            <Link to="/politique-confidentialite" className="hover:underline">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
