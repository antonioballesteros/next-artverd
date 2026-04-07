import { BlogPageHeader, BlogPostGrid } from "@/components/blog";
import { routing, type AppLocale } from "@/i18n/routing";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMetadataTranslations(locale, "blog");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: localeForPage, namespace: "blog" });

  return (
    <>
      <BlogPageHeader title={t("title")} />
      <BlogPostGrid locale={localeForPage} />
    </>
  );
}
