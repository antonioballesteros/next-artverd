import { BlogPageHeader, BlogPostGrid } from "@/components/blog";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
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

export default function BlogPage() {
  return (
    <>
      <BlogPageHeader />
      <BlogPostGrid />
    </>
  );
}
