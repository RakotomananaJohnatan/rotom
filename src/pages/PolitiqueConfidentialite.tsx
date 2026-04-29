import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";

const PolitiqueConfidentialite = () => {
  const { t } = useLang();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("privacy.eyebrow")}
        title={t("privacy.title")}
        subtitle={t("privacy.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("privacy.title") }]}
      />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <Reveal>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>{t("privacy.s1.title")}</h2>
            <p>{t("privacy.s1.body")}</p>
            <h2>{t("privacy.s2.title")}</h2>
            <p>{t("privacy.s2.body")}</p>
            <h2>{t("privacy.s3.title")}</h2>
            <p>{t("privacy.s3.body")}</p>
            <h2>{t("privacy.s4.title")}</h2>
            <p>{t("privacy.s4.body")}</p>
            <h2>{t("privacy.s5.title")}</h2>
            <p>{t("privacy.s5.body")}</p>
            <h2>{t("privacy.s6.title")}</h2>
            <p>{t("privacy.s6.body")}</p>
            <h2>{t("privacy.s7.title")}</h2>
            <p>{t("privacy.s7.body")}</p>
          </article>
        </Reveal>
      </section>
    </SiteLayout>
  );
};

export default PolitiqueConfidentialite;
