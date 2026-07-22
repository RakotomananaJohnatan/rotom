import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import CookieBanner from "./CookieBanner";

const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background flex flex-col">
    <SiteHeader />
    <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
    <SiteFooter />
    <CookieBanner />
  </div>
);

export default SiteLayout;

