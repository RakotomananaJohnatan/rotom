import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { useLang } from "@/i18n/useLang";
import AddressLink from "@/components/AddressLink";

const MentionsLegales = () => {
  const { t } = useLang();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t("legal.eyebrow")}
        title={t("legal.title")}
        subtitle={t("legal.subtitle")}
        breadcrumb={[{ label: t("common.home"), to: "/" }, { label: t("legal.title") }]}
      />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <Reveal>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>{t("legal.s1.title")}</h2>
            <p>{t("legal.s1.body")}</p>
            <h2>{t("legal.s2.title")}</h2>
            <p>{t("legal.s2.body")}</p>
            <h2>{t("legal.s3.title")}</h2>
            <p>{t("legal.s3.body")}</p>
            <h2>{t("legal.s4.title")}</h2>
            <p>{t("legal.s4.body")}</p>
            <h2>{t("legal.s5.title")}</h2>
            <p>{t("legal.s5.body")}</p>
          </article>
        </Reveal>
      </section>
    </SiteLayout>
  );
};

export default MentionsLegales;
