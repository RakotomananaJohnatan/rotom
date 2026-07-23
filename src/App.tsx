import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import GenerateursNeufs from "./pages/GenerateursNeufs.tsx";
import GenerateursOccasion from "./pages/GenerateursOccasion.tsx";
import Equipements from "./pages/Equipements.tsx";
import Services from "./pages/Services.tsx";
import Contact from "./pages/Contact.tsx";
import DemandeSurMesure from "./pages/DemandeSurMesure.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import MentionsLegales from "./pages/MentionsLegales.tsx";
import ConditionsGenerales from "./pages/ConditionsGenerales.tsx";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite.tsx";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import { trackPageView } from "@/lib/analytics";

const queryClient = new QueryClient();

const AnalyticsPageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AnalyticsPageViewTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/generateurs-neufs" element={<GenerateursNeufs />} />
              <Route path="/generateurs-occasion" element={<GenerateursOccasion />} />
              <Route path="/equipements" element={<Equipements />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demande-sur-mesure" element={<DemandeSurMesure />} />
              <Route path="/produit/:slug" element={<ProductDetail />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/conditions-generales" element={<ConditionsGenerales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
