export interface EvCharger {
  slug: string;
  name: string;
  subtitle: { fr: string; en: string };
  power: string;
  current: "AC" | "DC";
  img: string;
  description: { fr: string; en: string };
}

const PLACEHOLDER = "/placeholder.svg";

export const evChargers: EvCharger[] = [
  {
    slug: "rotom-acq-series",
    name: "ROTOM ACQ Series",
    subtitle: { fr: "Borne de recharge AC domestique", en: "Home AC Charger" },
    power: "7 – 22 kW",
    current: "AC",
    img: PLACEHOLDER,
    description: {
      fr: "Borne de recharge AC compacte pour usage domestique et résidentiel, de 7 à 22 kW, installation murale simple et pilotage intelligent.",
      en: "Compact AC charging station for home and residential use, from 7 to 22 kW, with easy wall mounting and smart control.",
    },
  },
  {
    slug: "rotom-hc-series",
    name: "ROTOM HC Series",
    subtitle: { fr: "Station de recharge professionnelle", en: "Business Charging Station" },
    power: "60 – 240 kW",
    current: "DC",
    img: PLACEHOLDER,
    description: {
      fr: "Station de recharge rapide DC haute puissance de 60 à 240 kW, conçue pour les flottes, stations-service et sites commerciaux.",
      en: "High-power DC fast charging station from 60 to 240 kW, designed for fleets, service stations and commercial sites.",
    },
  },
  {
    slug: "rotom-sc-oc-series",
    name: "ROTOM SC+OC Series",
    subtitle: { fr: "Chargeur DC professionnel / domestique", en: "Business/Home DC Charger" },
    power: "7 – 40 kW",
    current: "DC",
    img: PLACEHOLDER,
    description: {
      fr: "Chargeur DC polyvalent de 7 à 40 kW, adapté aussi bien aux petites entreprises qu'aux installations résidentielles haut de gamme.",
      en: "Versatile DC charger from 7 to 40 kW, suitable for small businesses as well as premium residential installations.",
    },
  },
  {
    slug: "rotom-vc-series",
    name: "ROTOM VC Series",
    subtitle: { fr: "Station de recharge professionnelle", en: "Business Charging Station" },
    power: "30 – 80 kW",
    current: "DC",
    img: PLACEHOLDER,
    description: {
      fr: "Station de recharge DC de 30 à 80 kW pour parkings d'entreprise, hôtels et commerces.",
      en: "DC charging station from 30 to 80 kW for corporate car parks, hotels and retail locations.",
    },
  },
  {
    slug: "rotom-vcp-series",
    name: "ROTOM VCP Series",
    subtitle: { fr: "Station de recharge professionnelle", en: "Business Charging Station" },
    power: "60 – 160 kW",
    current: "DC",
    img: PLACEHOLDER,
    description: {
      fr: "Station de recharge DC ultra-rapide de 60 à 160 kW, pensée pour les axes routiers et les flottes intensives.",
      en: "Ultra-fast DC charging station from 60 to 160 kW, built for highway corridors and intensive fleet operations.",
    },
  },
];

export const getEvCharger = (slug?: string) => evChargers.find((c) => c.slug === slug);
