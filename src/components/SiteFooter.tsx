import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Linkedin, Facebook, Youtube } from "lucide-react";

const SiteFooter = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-[1500px] mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-5 gap-8">
      <div className="col-span-2 lg:col-span-1">
        <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">À propos de ROTOM</h4>
        <p className="text-xs text-white/70 leading-relaxed mb-3">
          ROTOM est spécialisé dans la vente de groupes électrogènes neufs & d'occasion de 10 kVA à 2500 kVA. Nous accompagnons nos clients partout dans le monde avec des solutions fiables et un service sur mesure.
        </p>
      </div>

      <div>
        <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Liens rapides</h4>
        <ul className="space-y-2 text-xs text-white/70">
          <li><Link to="/generateurs-neufs" className="hover:text-fluo-yellow">Générateurs neufs</Link></li>
          <li><Link to="/generateurs-occasion" className="hover:text-fluo-yellow">Générateurs d'occasion</Link></li>
          <li><Link to="/equipements" className="hover:text-fluo-yellow">Équipements associés</Link></li>
          <li><Link to="/services" className="hover:text-fluo-yellow">Services</Link></li>
          <li><Link to="/contact" className="hover:text-fluo-yellow">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Services</h4>
        <ul className="space-y-2 text-xs text-white/70">
          <li><Link to="/services" className="hover:text-fluo-yellow">Recherche sur demande</Link></li>
          <li><Link to="/services" className="hover:text-fluo-yellow">Installation</Link></li>
          <li><Link to="/services" className="hover:text-fluo-yellow">Maintenance</Link></li>
          <li><Link to="/services" className="hover:text-fluo-yellow">Pièces détachées</Link></li>
          <li><Link to="/services" className="hover:text-fluo-yellow">Financement</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Contact</h4>
        <ul className="space-y-2.5 text-xs text-white/70">
          <li className="flex items-start gap-2">
            <MapPin className="size-3.5 text-accent flex-shrink-0 mt-0.5" />
            <span>ROTOM Power Solutions<br />Bredaseweg 26<br />4705 RN Roosendaal, Pays-Bas</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="size-3.5 text-fluo-yellow flex-shrink-0" />
            <a href="tel:+31165556062" className="text-fluo-yellow hover:underline font-bold">+31 (0)165 55 60 62</a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="size-3.5 text-brand-cyan flex-shrink-0" />
            <a href="mailto:sales@rotom.com" className="text-brand-cyan hover:underline">sales@rotom.com</a>
          </li>
          <li className="flex items-center gap-2">
            <MessageCircle className="size-3.5 text-accent flex-shrink-0" />
            <a href="#" className="hover:text-fluo-yellow">Discuter sur WhatsApp</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-impact text-xs uppercase tracking-widest text-accent mb-4">Suivez-nous</h4>
        <div className="flex gap-3">
          <a href="#" aria-label="LinkedIn" className="size-10 rounded-full bg-white/10 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground flex items-center justify-center transition-colors">
            <Linkedin className="size-4" />
          </a>
          <a href="#" aria-label="Facebook" className="size-10 rounded-full bg-white/10 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground flex items-center justify-center transition-colors">
            <Facebook className="size-4" />
          </a>
          <a href="#" aria-label="YouTube" className="size-10 rounded-full bg-white/10 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground flex items-center justify-center transition-colors">
            <Youtube className="size-4" />
          </a>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10 bg-accent text-accent-foreground">
      <div className="max-w-[1500px] mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
        <span>© 2026 ROTOM Power Solutions — Tous droits réservés</span>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Mentions légales</a>
          <a href="#" className="hover:underline">Conditions générales</a>
          <a href="#" className="hover:underline">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
