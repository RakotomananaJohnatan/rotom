import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, Globe, ChevronDown } from "lucide-react";
import logoRotom from "@/assets/logo-rotom.png";

const navItems = [
  { label: "Générateurs neufs", to: "/generateurs-neufs" },
  { label: "Générateurs d'occasion", to: "/generateurs-occasion" },
  { label: "Équipements associés", to: "/equipements" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const SiteHeader = () => {
  useLocation();
  return (
    <header className="bg-primary text-primary-foreground border-b-4 border-accent">
      <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="flex-shrink-0 bg-white rounded-md px-3 py-2 flex items-center" aria-label="ROTOM Power Generation">
          <img src={logoRotom} alt="ROTOM Power Generation" width={170} height={56} className="h-12 w-auto object-contain" />
        </Link>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex items-stretch">
            <input
              type="text"
              placeholder="Rechercher un générateur, marque, modèle..."
              className="flex-1 bg-white text-foreground px-4 py-3 text-sm rounded-l-sm outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/70"
            />
            <button className="bg-white text-primary px-4 border-l border-border rounded-r-sm hover:bg-accent transition-colors">
              <Search className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button className="flex items-center gap-1.5 text-sm hover:text-accent transition-colors">
            <Globe className="size-4" /> FR <ChevronDown className="size-3" />
          </button>
          <Link
            to="/contact"
            className="bg-accent text-accent-foreground font-impact text-sm font-bold uppercase tracking-wider px-5 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </div>

      <nav className="border-t border-white/10">
        <div className="max-w-[1500px] mx-auto px-6">
          <ul className="flex items-center gap-8 justify-center flex-wrap">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-4 text-xs font-impact font-semibold uppercase tracking-widest transition-colors ${
                      isActive ? "text-fluo-yellow border-b-2 border-fluo-yellow" : "hover:text-accent"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
