import { AbrilMesFlorsArticle } from "@/components/blog/articles/AbrilMesFlorsArticle";
import { ElSignificatRosesArticle } from "@/components/blog/articles/ElSignificatRosesArticle";
import {
  ABRIL_MES_FLORS_DESCRIPTION,
  ABRIL_MES_FLORS_TITLE,
} from "@/lib/blog/abrilMesFlorsContent";
import {
  EL_SIGNIFICAT_ROSES_DESCRIPTION,
  EL_SIGNIFICAT_ROSES_TITLE,
} from "@/lib/blog/elSignificatRosesContent";
import {
  MIGRATED_BLOG_SLUGS,
  type MigratedBlogSlug,
  isMigratedBlogSlug,
} from "@/lib/blog/migratedBlogSlugs";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const ARTICLE_BY_SLUG: Record<MigratedBlogSlug, ComponentType> = {
  "abril-el-mes-de-les-flors": AbrilMesFlorsArticle,
  "el-significat-del-color-de-les-roses": ElSignificatRosesArticle,
};

const METADATA_BY_SLUG: Record<MigratedBlogSlug, Metadata> = {
  "abril-el-mes-de-les-flors": {
    title: ABRIL_MES_FLORS_TITLE,
    description: ABRIL_MES_FLORS_DESCRIPTION,
  },
  "el-significat-del-color-de-les-roses": {
    title: EL_SIGNIFICAT_ROSES_TITLE,
    description: EL_SIGNIFICAT_ROSES_DESCRIPTION,
  },
};

export function generateStaticParams(): { slug: MigratedBlogSlug }[] {
  return MIGRATED_BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isMigratedBlogSlug(slug)) {
    return { title: "Not found" };
  }

  return METADATA_BY_SLUG[slug];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!isMigratedBlogSlug(slug)) {
    notFound();
  }

  const Article = ARTICLE_BY_SLUG[slug];
  return <Article />;
}
