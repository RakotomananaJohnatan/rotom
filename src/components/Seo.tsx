import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/useLang";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object | object[];
}

const BASE_URL = "https://rotom.lovable.app";
const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/16becfb8-2d6f-4914-96df-8cc953203c89/id-preview-852d6271--cd9c3fd5-dbff-4821-b92f-156f169febc6.lovable.app-1776845825830.png";

const Seo = ({ title, description, path, image, jsonLd }: SeoProps) => {
  const { lang } = useLang();
  const url = `${BASE_URL}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === "en" ? "en_US" : "fr_FR"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
