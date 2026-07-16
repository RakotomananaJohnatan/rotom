import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Globe, ChevronDown, Sun, Moon, Menu, X } from "lucide-react";
import logoRotom from "@/assets/logo-rotom.svg";
import { useLang } from "@/i18n/useLang";
import { useTheme } from "@/theme/ThemeContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalSearch from "@/components/GlobalSearch";

const SiteHeader = () => {
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Detect scroll to strengthen shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure header height to reserve space with a placeholder
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const navItems = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.new"), to: "/generateurs-neufs" },
    { label: t("nav.used"), to: "/generateurs-occasion" },
    { label: t("nav.equip"), to: "/equipements" },
    { label: t("nav.services"), to: "/services" },
    { label: t("nav.custom"), to: "/demande-sur-mesure" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground border-b-4 border-accent transition-shadow duration-300",
          scrolled ? "shadow-xl" : "shadow-md"
        )}
      >
      {/* Top row */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-6">
        <Link to="/" className="flex-shrink-0 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 flex items-center bg-[#ddff00] ml-0" aria-label="ROTOM Power Generation">
          <img src={logoRotom} alt="ROTOM Power Generation" width={170} height={56} className="h-9 sm:h-12 w-auto object-contain ml-[2.5px] mt-[2.5px] mr-[2.5px] mb-[2.5px]" />
        </Link>

        {/* Desktop search */}
        <div className="hidden md:block flex-1 max-w-2xl mx-4">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            className="hidden sm:flex items-center justify-center size-8 hover:text-accent transition-colors outline-none"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden sm:flex items-center gap-1.5 text-sm hover:text-accent transition-colors outline-none">
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
            className="hidden lg:inline-flex bg-accent text-accent-foreground font-impact text-sm font-bold uppercase tracking-wider px-5 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
          >
            {t("header.cta")}
          </Link>

          {/* Burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden flex items-center justify-center size-10 hover:text-accent transition-colors outline-none"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="md:hidden px-4 sm:px-6 pb-3">
        <GlobalSearch />
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block border-t border-white/10">
        <div className="max-w-[1500px] mx-auto px-6">
          <ul className="flex items-center gap-8 justify-center flex-wrap">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
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

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-primary animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="px-4 sm:px-6 py-4">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `block py-3 text-sm font-impact font-semibold uppercase tracking-widest border-b border-white/10 transition-colors ${
                        isActive ? "text-fluo-yellow" : "hover:text-accent"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
                  className="flex items-center justify-center size-10 rounded-md bg-white/10 hover:text-accent transition-colors"
                >
                  {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm bg-white/10 px-3 h-10 rounded-md hover:text-accent transition-colors outline-none">
                    <Globe className="size-4" /> {lang.toUpperCase()} <ChevronDown className="size-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[140px]">
                    <DropdownMenuItem onClick={() => setLang("fr")} className={lang === "fr" ? "font-bold text-primary" : ""}>
                      🇫🇷 Français
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLang("en")} className={lang === "en" ? "font-bold text-primary" : ""}>
                      🇬🇧 English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link
                to="/contact"
                className="flex-1 text-center bg-accent text-accent-foreground font-impact text-sm font-bold uppercase tracking-wider px-5 py-3 hover:bg-fluo-yellow hover:text-fluo-yellow-foreground transition-colors"
              >
                {t("header.cta")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
    <div
      ref={placeholderRef}
      style={{ height: headerHeight }}
      aria-hidden="true"
      className="w-full flex-shrink-0"
    />
    </>
  );
};

export default SiteHeader;
