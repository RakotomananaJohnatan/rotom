export type Bi = { fr: string; en: string };
export type Val = string | Bi;

export interface SpecRowMulti {
  label: Bi;
  /** One value per model column, or a single value common to all columns */
  values: Val[] | Val;
}

export interface SpecSection {
  title: Bi;
  rows: SpecRowMulti[];
}

export interface EvCharger {
  slug: string;
  name: string;
  subtitle: Bi;
  power: string;
  current: "AC" | "DC";
  img: string;
  description: Bi;
  models: string[];
  connectors: string[];
  sections: SpecSection[];
}

import acqSeriesImg from "@/assets/ev-acq-series.jpeg";
import hcSeriesImg from "@/assets/ev-hc-series.jpeg";

const PLACEHOLDER = "/placeholder.svg";

/* ---------- shared values ---------- */
const freq5060 = "50/60Hz";
const wires1P: Bi = { fr: "1P+N+PE (L1, N, PE)", en: "1P+N+PE (L1, N, PE)" };
const wires3P: Bi = { fr: "3P+N+PE (L1, L2, L3, N, PE)", en: "3P+N+PE (L1, L2, L3, N, PE)" };

const workEnv = (temp: Bi): SpecSection => ({
  title: { fr: "Environnement de fonctionnement", en: "Work Environment" },
  rows: [
    { label: { fr: "Plage de température", en: "Temperature Range" }, values: temp },
    { label: { fr: "Altitude de fonctionnement", en: "Operation Altitude" }, values: "≤2000m" },
    {
      label: { fr: "Plage d'humidité", en: "Humidity Range" },
      values: { fr: "5-90 %HR (sans condensation)", en: "5-90%RH (non-condensation)" },
    },
  ],
});

const ui = (screen: Bi, startup: Bi): SpecSection => ({
  title: { fr: "Interface utilisateur et commandes", en: "User Interface and Controls" },
  rows: [
    { label: { fr: "Interaction homme-machine", en: "Human-computer Interaction" }, values: screen },
    {
      label: { fr: "Langue de l'écran", en: "Screen Language" },
      values: { fr: "Anglais par défaut, personnalisable", en: "English by default, customizable" },
    },
    { label: { fr: "Bouton poussoir", en: "Push Button" }, values: { fr: "Arrêt d'urgence", en: "Emergency stop" } },
    { label: { fr: "Méthode de démarrage de charge", en: "Charging Start-up Method" }, values: startup },
    {
      label: { fr: "Indication visuelle", en: "Visual Indication" },
      values: { fr: "Statut repos, charge, défaut", en: "Idle, charging and fault status" },
    },
  ],
});

const protectionFn: Bi = {
  fr: "Sur/sous-tension d'entrée, surtension de sortie, surchauffe, surintensité, court-circuit, fuite, foudre, inversion de batterie, surveillance d'isolation",
  en: "Input over/under voltage, output over voltage, over temperature, over current, short circuit, leakage, lightning, battery reverse connection, insulation monitoring",
};

const protection = (extraLeakage?: boolean): SpecSection => ({
  title: { fr: "Protection", en: "Protection" },
  rows: [
    { label: { fr: "Fonctions de protection", en: "Protection Function" }, values: protectionFn },
    ...(extraLeakage
      ? [{ label: { fr: "Protection différentielle", en: "Leakage Protection" }, values: "Type A + DC 6mA" }]
      : []),
  ],
});

const standards = (chargerStandard: string, protocols: string, ground?: Bi): SpecSection => ({
  title: { fr: "Normes et protocoles de communication", en: "Standards and Communication Protocols" },
  rows: [
    { label: { fr: "Mode de connexion réseau", en: "Networking Mode" }, values: "Wi-Fi / 4G / Ethernet" },
    { label: { fr: "Normes du chargeur", en: "Charger Standard" }, values: chargerStandard },
    { label: { fr: "Protocoles de communication", en: "Communication Protocols" }, values: protocols },
    ...(ground ? [{ label: { fr: "Détection de terre", en: "Ground Detection" }, values: ground }] : []),
  ],
});

const startupBasic: Bi = {
  fr: "Plug and play / Badge / Mot de passe / OCPP",
  en: "Plug and play / RFID card / Password / OCPP",
};
const startupVin: Bi = {
  fr: "Plug and play / Badge / Mot de passe / OCPP / Code VIN",
  en: "Plug and play / RFID card / Password / OCPP / VIN code",
};
const screen43: Bi = { fr: "Écran tactile couleur 4,3 pouces", en: "4.3-inch color touch screen" };
const screen7: Bi = { fr: "Écran tactile couleur 7 pouces", en: "7-inch color touch screen" };
const naturalCooling: Bi = { fr: "Refroidissement naturel", en: "Natural cooling" };
const wallOrPole: Bi = { fr: "Murale ou sur colonne", en: "Wall or pole mounted" };
const auxPower = "GB/T: 12V/24V ; CCS1, CCS2, CHAdeMO: 12V";

/* ---------- chargers ---------- */
export const evChargers: EvCharger[] = [
  {
    slug: "rotom-acq-series",
    name: "ROTOM ACQ Series",
    subtitle: { fr: "Borne de recharge AC domestique", en: "Home AC Charger" },
    power: "7 – 22 kW",
    current: "AC",
    img: acqSeriesImg,
    description: {
      fr: "Borne de recharge AC compacte pour usage domestique et résidentiel, de 7 à 22 kW, installation murale simple et pilotage intelligent.",
      en: "Compact AC charging station for home and residential use, from 7 to 22 kW, with easy wall mounting and smart control.",
    },
    models: ["ACQ0732", "ACQ1116", "ACQ2232"],
    connectors: ["Type 1", "Type 2", "GB/T", "NACS"],
    sections: [
      {
        title: { fr: "Paramètres d'entrée", en: "Input Parameters" },
        rows: [
          {
            label: { fr: "Tension d'entrée", en: "Input Voltage" },
            values: ["220VAC±15%", "380VAC/400VAC±15%", "380VAC/400VAC±15%"],
          },
          { label: { fr: "Courant d'entrée", en: "Input Current" }, values: ["32A", "16A", "32A"] },
          { label: { fr: "Fréquence d'entrée", en: "Input Frequency" }, values: freq5060 },
          { label: { fr: "Câblage", en: "Wires" }, values: [wires1P, wires3P, wires3P] },
        ],
      },
      {
        title: { fr: "Paramètres de sortie", en: "Output Parameters" },
        rows: [
          { label: { fr: "Tension de sortie", en: "Output Voltage" }, values: ["220VAC±15%", "400VAC±15%", "400VAC±15%"] },
          { label: { fr: "Courant de sortie total", en: "Total Output Current" }, values: ["32A", "16A", "32A (64A)"] },
          { label: { fr: "Puissance nominale", en: "Rated Power" }, values: ["7kW", "11kW", "22kW"] },
        ],
      },
      workEnv({ fr: "-20 ~ 50°C ; 25°C (type)", en: "-20~50°C ; 25°C (type)" }),
      ui(screen43, startupBasic),
      protection(true),
      standards(
        "EN IEC 61851-1:2019, EN IEC 61851-21:2021, EN 62196-1:2014, EN IEC 62196-2:2022, EN IEC 61000-3-2:2019, EN 61000-3-3:2013+A2:2021, EN IEC 55014-1:2021, EN IEC 55014-2:2021",
        "OCPP 1.6 / 2.0 (JSON)",
        { fr: "Défaut PEN (marché UK)", en: "Pen fault (UK market)" },
      ),
      {
        title: { fr: "Caractéristiques mécaniques", en: "Mechanical Properties" },
        rows: [
          { label: { fr: "Méthode d'installation", en: "Installation Method" }, values: wallOrPole },
          { label: { fr: "Indice de protection", en: "Environment Protection" }, values: "IP55" },
          { label: { fr: "Refroidissement", en: "Cooling Method" }, values: naturalCooling },
          { label: { fr: "Longueur de câble", en: "Cable Length" }, values: ["4M", "5M", "5M"] },
          { label: { fr: "Dimensions produit (L×l×H)", en: "Product Dimensions (L×W×H)" }, values: "408x210x130mm" },
          { label: { fr: "Dimensions emballage (L×l×H)", en: "Packaging Dimensions (L×W×H)" }, values: "662x412x205mm" },
          { label: { fr: "Poids emballé", en: "Packed Weight" }, values: "N.W: 8.5KG / G.W: 9KG" },
        ],
      },
    ],
  },
  {
    slug: "rotom-hc-series",
    name: "ROTOM HC Series",
    subtitle: { fr: "Station de recharge professionnelle", en: "Business Charging Station" },
    power: "60 – 240 kW",
    current: "DC",
    img: hcSeriesImg,
    description: {
      fr: "Station de recharge rapide DC haute puissance de 60 à 240 kW, conçue pour les flottes, stations-service et sites commerciaux.",
      en: "High-power DC fast charging station from 60 to 240 kW, designed for fleets, service stations and commercial sites.",
    },
    models: ["HC0601K", "HC0801K", "HC0901K", "HC1201K", "HC1501K", "HC1801K", "HC2001K", "HC2401K"],
    connectors: ["CCS1", "CCS2", "CHAdeMO", "GB/T", "NACS"],
    sections: [
      {
        title: { fr: "Paramètres d'entrée", en: "Input Parameters" },
        rows: [
          { label: { fr: "Tension d'entrée (AC)", en: "Input Voltage (AC)" }, values: "AC380V±20%" },
          {
            label: { fr: "Courant d'entrée", en: "Input Current" },
            values: ["0-112A", "0-130A", "0-168A", "0-224A", "0-280A", "0-336A", "0-340A", "0-405A"],
          },
          { label: { fr: "Fréquence d'entrée", en: "Input Frequency" }, values: "47-63Hz" },
          { label: { fr: "Câblage", en: "Wires" }, values: wires3P },
        ],
      },
      {
        title: { fr: "Paramètres de sortie", en: "Output Parameters" },
        rows: [
          { label: { fr: "Tension de sortie", en: "Output Voltage" }, values: "150-1000Vdc" },
          {
            label: { fr: "Courant de sortie total", en: "Total Output Current" },
            values: ["0-200A", "0-266A", "0-300A", "0-400A", "0-500A", "0-600A", "0-665A", "0-798A"],
          },
          {
            label: { fr: "Puissance nominale", en: "Rated Power" },
            values: ["60kW", "80kW", "90kW", "120kW", "150kW", "180kW", "200kW", "240kW"],
          },
          { label: { fr: "Facteur de puissance", en: "Power Factor" }, values: "≥0.98" },
          { label: { fr: "Rendement", en: "Work Efficiency" }, values: "≥0.95" },
          { label: { fr: "Alimentation auxiliaire", en: "Auxiliary Power Supply" }, values: auxPower },
        ],
      },
      workEnv({ fr: "-20 ~ 50°C ; 25°C (type)", en: "-20~50°C ; 25°C (type)" }),
      ui(screen7, startupVin),
      protection(),
      standards(
        "EN 61851-21-2:2021, EN IEC 61000-3-2:2019+A1:2021, EN 61000-3-3:2013+A1:2019+A2:2021, EN 61000-4-2:2009, EN IEC 61000-4-3:2020, EN 61000-4-4:2012, EN 61000-4-5:2014+A1:2017, EN IEC 61000-4-6:2022, EN 61000-4-8:2010, EN IEC 61000-4-11:2020",
        "GBT27930 / CHAdeMO2.0 / DIN70121, OCPP 1.6 (JSON), ISO 15118",
      ),
      {
        title: { fr: "Caractéristiques mécaniques", en: "Mechanical Properties" },
        rows: [
          { label: { fr: "Méthode d'installation", en: "Installation Method" }, values: { fr: "Au sol", en: "Floor-mounted" } },
          { label: { fr: "Indice de protection", en: "Environment Protection" }, values: "IP54" },
          {
            label: { fr: "Pistolets de charge", en: "Charger Plug" },
            values: {
              fr: "Simple ou double pistolet (courant réparti équitablement entre les deux)",
              en: "Single or dual gun (current evenly shared between both)",
            },
          },
          { label: { fr: "Refroidissement", en: "Cooling Method" }, values: naturalCooling },
          { label: { fr: "Longueur de câble", en: "Cable Length" }, values: "5M" },
          { label: { fr: "Dimensions produit (L×l×H)", en: "Product Dimensions (L×W×H)" }, values: "750x530x1609mm" },
          { label: { fr: "Dimensions emballage (L×l×H)", en: "Packaging Dimensions (L×W×H)" }, values: "1100x900x2000mm" },
          { label: { fr: "Poids emballé", en: "Packed Weight" }, values: "328KG - 380KG" },
        ],
      },
    ],
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
    models: ["SC07750 (OC07750)", "SC201K (OC201K)", "SC301K (OC301K)", "SC401K (OC401K)"],
    connectors: ["CCS1", "CCS2", "CHAdeMO", "GB/T", "NACS"],
    sections: [
      {
        title: { fr: "Paramètres d'entrée", en: "Input Parameters" },
        rows: [
          {
            label: { fr: "Tension d'entrée", en: "Input Voltage" },
            values: ["90-265VAC", "260-475VAC", "260-475VAC", "260-475VAC"],
          },
          { label: { fr: "Courant d'entrée", en: "Input Current" }, values: ["32A", "32A", "60A", "67A"] },
          { label: { fr: "Fréquence d'entrée", en: "Input Frequency" }, values: freq5060 },
          { label: { fr: "Câblage", en: "Wires" }, values: [wires1P, wires3P, wires3P, wires3P] },
        ],
      },
      {
        title: { fr: "Paramètres de sortie", en: "Output Parameters" },
        rows: [
          {
            label: { fr: "Tension de sortie", en: "Output Voltage" },
            values: ["200-750VDC", "200-1000VDC", "200-1000VDC", "200-1000VDC"],
          },
          { label: { fr: "Courant de sortie total", en: "Total Output Current" }, values: ["20A", "60A", "100A", "133A"] },
          { label: { fr: "Puissance nominale", en: "Rated Power" }, values: ["7kW", "20kW", "30kW", "40kW"] },
          { label: { fr: "Facteur de puissance", en: "Power Factor" }, values: "≥0.99" },
          { label: { fr: "Rendement", en: "Work Efficiency" }, values: "95%" },
          { label: { fr: "Alimentation auxiliaire", en: "Auxiliary Power Supply" }, values: auxPower },
        ],
      },
      workEnv({
        fr: "-25°C ~ +50°C (dérating au-delà de 50°C, réchauffeur disponible pour zones très froides)",
        en: "-25°C~+50°C (derating above 50°C, heater available for very cold areas)",
      }),
      ui({ fr: "Écran tactile 4,3 pouces", en: "4.3-inch touch screen" }, startupVin),
      protection(),
      standards(
        "EN IEC 61000-6-4:2019, EN IEC 61000-3-2:2019+A1:2020, EN 61000-3-3:2013+A1:2019, EN IEC 61000-6-2:2019, EN IEC 61000-4-2:2009, EN IEC 61000-4-3:2020, EN 61000-4-4:2012, EN 61000-4-5:2014+A1:2017, EN 61000-4-6:2014/AC:2015, EN IEC 61000-4-11:2020",
        "GBT27930 / CHAdeMO2.0 / DIN70121, ISO 15118",
      ),
      {
        title: { fr: "Caractéristiques mécaniques", en: "Mechanical Properties" },
        rows: [
          { label: { fr: "Méthode d'installation", en: "Installation Method" }, values: wallOrPole },
          { label: { fr: "Indice de protection", en: "Environment Protection" }, values: "IP54" },
          {
            label: { fr: "Résistance aux chocs", en: "Crashworthiness Rating" },
            values: { fr: "IK8+ (hors écran)", en: "IK8+ (screen excluded)" },
          },
          { label: { fr: "Refroidissement", en: "Cooling Method" }, values: naturalCooling },
          { label: { fr: "Longueur de câble", en: "Cable Length" }, values: "5m" },
          {
            label: { fr: "Dimensions produit (L×l×H)", en: "Product Dimensions (L×W×H)" },
            values: ["548x378x160mm", "642x454x153mm", "642x454x153mm", "667x475x204mm"],
          },
          { label: { fr: "Dimensions emballage (L×l×H)", en: "Packaging Dimensions (L×W×H)" }, values: "950x630x580mm" },
          {
            label: { fr: "Poids emballé", en: "Packed Weight" },
            values: ["G.W: 41KG", "G.W: 56KG", "G.W: 65KG", "G.W: 85KG"],
          },
        ],
      },
    ],
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
    models: ["VC301K", "VC401K", "VC601K", "VC801K"],
    connectors: ["CCS1", "CCS2", "CHAdeMO", "GB/T", "NACS"],
    sections: [
      {
        title: { fr: "Paramètres d'entrée", en: "Input Parameters" },
        rows: [
          { label: { fr: "Tension d'entrée", en: "Input Voltage" }, values: "AC380V±20%" },
          { label: { fr: "Courant d'entrée", en: "Input Current" }, values: ["0-58A", "0-64A", "0-116A", "0-140A"] },
          { label: { fr: "Fréquence d'entrée", en: "Input Frequency" }, values: "47-63Hz" },
          { label: { fr: "Câblage", en: "Wires" }, values: wires3P },
        ],
      },
      {
        title: { fr: "Paramètres de sortie", en: "Output Parameters" },
        rows: [
          { label: { fr: "Tension de sortie", en: "Output Voltage" }, values: "200-1000VDC" },
          {
            label: { fr: "Courant de sortie total", en: "Total Output Current" },
            values: ["0-100A", "0-133A", "0-200A", "0-266A"],
          },
          { label: { fr: "Puissance nominale", en: "Rated Power" }, values: ["30kW", "40kW", "60kW", "80kW"] },
          { label: { fr: "Facteur de puissance", en: "Power Factor" }, values: "≥0.99" },
          { label: { fr: "Alimentation auxiliaire", en: "Auxiliary Power Supply" }, values: auxPower },
        ],
      },
      workEnv({
        fr: "-20 ~ 50°C ; 25°C (type) — Stockage : -40 ~ 85°C ; 25°C (type) ; dérating intelligent au-delà de 50°C",
        en: "-20~50°C ; 25°C (type) — Storage: -40~85°C ; 25°C (type); intelligent derating above 50°C",
      }),
      ui(screen7, startupVin),
      protection(),
      standards(
        "EN IEC 61851-21-2:2021, EN IEC 61000-6-4:2019, EN IEC 61000-3-11:2017, EN IEC 61000-3-12:2011, EN IEC 61000-6-2:2016, EN IEC 61000-4-2:2009, EN 61000-4-3:2020, EN 61000-4-4:2012, EN 61000-4-5:2014+A1:2017, EN 61000-4-6:2014/AC:2015, EN 61000-4-8:2010, EN IEC 61000-4-11:2020",
        "GBT27930 / CHAdeMO2.0 / DIN70121, OCPP 1.6 (JSON), ISO 15118",
      ),
      {
        title: { fr: "Caractéristiques mécaniques", en: "Mechanical Properties" },
        rows: [
          { label: { fr: "Méthode d'installation", en: "Installation Method" }, values: { fr: "Sur pied (debout)", en: "Standing" } },
          {
            label: { fr: "Pistolets de charge", en: "Charging Guns" },
            values: [
              { fr: "Simple pistolet", en: "Single Gun" },
              { fr: "Simple / double pistolet", en: "Single Gun / Dual Guns" },
              { fr: "Simple / double pistolet", en: "Single Gun / Dual Guns" },
              { fr: "Simple / double pistolet", en: "Single Gun / Dual Guns" },
            ],
          },
          { label: { fr: "Indice de protection", en: "Environment Protection" }, values: "IP54" },
          { label: { fr: "Refroidissement", en: "Cooling Method" }, values: naturalCooling },
          { label: { fr: "Longueur de câble", en: "Cable Length" }, values: "5M" },
          { label: { fr: "Dimensions produit (L×l×H)", en: "Product Dimensions (L×W×H)" }, values: "690x240x1350mm" },
          { label: { fr: "Dimensions emballage (L×l×H)", en: "Packaging Dimensions (L×W×H)" }, values: "1025x625x1535mm" },
          { label: { fr: "Poids emballé", en: "Packed Weight" }, values: ["195KG", "200KG", "210KG", "210KG"] },
        ],
      },
    ],
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
    models: ["VCP601K", "VCP801K", "VCP1201K", "VCP1601K"],
    connectors: ["CCS1", "CCS2", "CHAdeMO", "GB/T", "NACS"],
    sections: [
      {
        title: { fr: "Paramètres d'entrée", en: "Input Parameters" },
        rows: [
          { label: { fr: "Tension d'entrée", en: "Input Voltage" }, values: "AC380V±20%" },
          { label: { fr: "Courant d'entrée", en: "Input Current" }, values: ["0-116A", "0-136A", "0-232A", "0-272A"] },
          { label: { fr: "Fréquence d'entrée", en: "Input Frequency" }, values: "47-63Hz" },
          { label: { fr: "Câblage", en: "Wires" }, values: wires3P },
        ],
      },
      {
        title: { fr: "Paramètres de sortie", en: "Output Parameters" },
        rows: [
          { label: { fr: "Tension de sortie", en: "Output Voltage" }, values: "200-1000VDC" },
          {
            label: { fr: "Courant de sortie total", en: "Total Output Current" },
            values: ["0-200A", "0-226A", "0-400A", "0-532A"],
          },
          { label: { fr: "Puissance nominale", en: "Rated Power" }, values: ["60kW", "80kW", "120kW", "160kW"] },
          { label: { fr: "Facteur de puissance", en: "Power Factor" }, values: "≥0.95" },
          { label: { fr: "Alimentation auxiliaire", en: "Auxiliary Power Supply" }, values: auxPower },
        ],
      },
      workEnv({
        fr: "-20 ~ 50°C ; 25°C (type) — Stockage : -40 ~ 85°C ; 25°C (type) ; dérating intelligent au-delà de 50°C",
        en: "-20~50°C ; 25°C (type) — Storage: -40~85°C ; 25°C (type); intelligent derating above 50°C",
      }),
      ui(screen7, startupVin),
      protection(),
      standards(
        "EN IEC 61851-1:2019, EN IEC 61851-21:2021, EN 62196-1:2014, EN IEC 62196-2:2022, EN 61000-3-2:2019, EN 61000-3-3:2013+A2:2021, EN IEC 55014-1:2021, EN IEC 55014-2:2021, DIN 70121-2014-12, ISO 15118-1",
        "GBT27930 / CHAdeMO2.0 / DIN70121, OCPP 1.6 (JSON), ISO 15118",
      ),
      {
        title: { fr: "Caractéristiques mécaniques", en: "Mechanical Properties" },
        rows: [
          { label: { fr: "Méthode d'installation", en: "Installation Method" }, values: { fr: "Sur pied (debout)", en: "Standing" } },
          { label: { fr: "Pistolets de charge", en: "Charging Guns" }, values: { fr: "Double pistolet", en: "Dual guns" } },
          { label: { fr: "Indice de protection", en: "Environment Protection" }, values: "IP54" },
          { label: { fr: "Refroidissement", en: "Cooling Method" }, values: naturalCooling },
          { label: { fr: "Longueur de câble", en: "Cable Length" }, values: "5M" },
          { label: { fr: "Dimensions produit (L×l×H)", en: "Product Dimensions (L×W×H)" }, values: "690x311x1499mm" },
          { label: { fr: "Dimensions emballage (L×l×H)", en: "Packaging Dimensions (L×W×H)" }, values: "1000x660x1540mm" },
          { label: { fr: "Poids emballé", en: "Packed Weight" }, values: "210KG" },
        ],
      },
    ],
  },
];

export const getEvCharger = (slug?: string) => evChargers.find((c) => c.slug === slug);
