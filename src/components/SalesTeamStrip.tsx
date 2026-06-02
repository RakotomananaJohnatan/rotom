import { Phone } from "lucide-react";
import rep1 from "@/assets/rep1.jpg";
import rep3 from "@/assets/rep3.jpg";
import shahidAsset from "@/assets/shahid-mian.png.asset.json";

export const reps = [
  { name: "Usman Mansoor", role: "CTO", phone: "+261 38 11 514 42", email: "usman.mansoor@first-energy.mg", img: rep1 },
  { name: "Shahid Mian", role: "Sales Manager", phone: "+261 38 11 381 82", email: "shahid.mian@first-energy.mg", img: shahidAsset.url },
  { name: "Arjen van Dijk", role: "Sales Manager", phone: "+31-623024203", email: "sales@rotompower.com", img: rep3 },
];

const SalesTeamStrip = () => (
  <section className="bg-card border-b border-border py-5 sm:py-6">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {reps.map((rep) => (
        <div key={rep.name} className="flex items-center gap-4">
          <img
            src={rep.img}
            loading="lazy"
            width={72}
            height={72}
            alt={rep.name}
            className="size-[72px] object-cover rounded-full border-2 border-accent"
          />
          <div className="min-w-0">
            <div className="flex gap-1 mb-1 text-xs">
              <span>🇳🇱</span><span>🇫🇷</span><span>🇪🇸</span><span>🇬🇧</span>
            </div>
            <div className="font-bold text-sm text-primary">{rep.name}</div>
            <div className="flex items-center gap-1.5 text-xs mt-1">
              <Phone className="size-3 text-primary" />
              <span className="text-muted-foreground">Portable :</span>
              <a href={`tel:${rep.phone.replace(/\s/g, "")}`} className="text-primary font-bold hover:text-brand-cyan hover:underline">{rep.phone}</a>
            </div>
            <a href={`mailto:${rep.email}`} className="text-xs text-brand-cyan font-medium hover:underline">
              {rep.email}
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SalesTeamStrip;
