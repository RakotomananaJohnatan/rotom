import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { useLang } from "@/i18n/useLang";

const ConditionsGenerales = () => {
  const { t } = useLang();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("terms.eyebrow")}
        title={t("terms.title")}
        subtitle={t("terms.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("terms.title") }]}
      />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <Reveal>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>{t("terms.s1.title")}</h2>
            <p>{t("terms.s1.body")}</p>
            <h2>{t("terms.s2.title")}</h2>
            <p>{t("terms.s2.body")}</p>
            <h2>{t("terms.s3.title")}</h2>
            <p>{t("terms.s3.body")}</p>
            <h2>{t("terms.s4.title")}</h2>
            <p>{t("terms.s4.body")}</p>
            <h2>{t("terms.s5.title")}</h2>
            <h3>{t("terms.s5.1.title")}</h3>
            <p>{t("terms.s5.1.body")}</p>
            <h3>{t("terms.s5.2.title")}</h3>
            <p>{t("terms.s5.2.body")}</p>
            <h2>{t("terms.s6.title")}</h2>
            <p>{t("terms.s6.body")}</p>
            <h2>{t("terms.s7.title")}</h2>
            <p>{t("terms.s7.body")}</p>
          </article>
        </Reveal>
      </section>
    </SiteLayout>
  );
};

export default ConditionsGenerales;
