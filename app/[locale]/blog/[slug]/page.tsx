import { AbrilMesFlorsArticle } from "@/components/blog/articles/AbrilMesFlorsArticle";
import { ElSignificatRosesArticle } from "@/components/blog/articles/ElSignificatRosesArticle";
import { PerqueTriarArtverdArticle } from "@/components/blog/articles/PerqueTriarArtverdArticle";
import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import {
  MIGRATED_BLOG_SLUGS,
  type MigratedBlogSlug,
  isMigratedBlogSlug,
} from "@/lib/blog/migratedBlogSlugs";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const ARTICLE_BY_SLUG: Record<MigratedBlogSlug, ComponentType> = {
  "perque-triar-art-verd-pels-teus-events-especials": PerqueTriarArtverdArticle,
  "abril-el-mes-de-les-flors": AbrilMesFlorsArticle,
  "el-significat-del-color-de-les-roses": ElSignificatRosesArticle,
};

export function generateStaticParams(): { slug: MigratedBlogSlug }[] {
  return MIGRATED_BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getMetadataTranslations(locale, "blogPost");

  if (!isMigratedBlogSlug(slug)) {
    return {
      title: t("notFound.title"),
      description: t("notFound.description"),
    };
  }

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!isMigratedBlogSlug(slug)) {
    notFound();
  }

  const Article = ARTICLE_BY_SLUG[slug];
  return <Article />;
}
