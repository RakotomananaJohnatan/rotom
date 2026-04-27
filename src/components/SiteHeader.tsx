import { Link, NavLink } from "react-router-dom";
import { Globe, ChevronDown, Sun, Moon } from "lucide-react";
import logoRotom from "@/assets/logo-rotom.png";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme } from "@/theme/ThemeContext";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalSearch from "@/components/GlobalSearch";

const SiteHeader = () => {
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();

  const navItems = [
    { label: t("nav.new"), to: "/generateurs-neufs" },
    { label: t("nav.used"), to: "/generateurs-occasion" },
    { label: t("nav.equip"), to: "/equipements" },
    { label: t("nav.services"), to: "/services" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  return (
    <header className="bg-primary text-primary-foreground border-b-4 border-accent">
      <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="flex-shrink-0 bg-white rounded-md px-3 py-2 flex items-center" aria-label="ROTOM Power Generation">
          <img src={logoRotom} alt="ROTOM Power Generation" width={170} height={56} className="h-12 w-auto object-contain" />
        </Link>

        <div className="flex-1 max-w-2xl mx-4">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            className="flex items-center justify-center size-8 hover:text-accent transition-colors outline-none"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm hover:text-accent transition-colors outline-none">
              <Globe className="size-4" /> {lang.toUpperCase()} <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              <DropdownMenuItem onClick={() => setLang("fr")} className={lang === "fr" ? "font-bold text-primary" : ""}>
                🇫🇷 Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")} className={lang === "en" ? "font-bold text-primary" : ""}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/contact"
            className="bg-accent text-accent-foreground font-impact text-sm font-bold uppercase tracking-wider px-5 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
          >
            {t("header.cta")}
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
