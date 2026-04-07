import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import {
  BLOG_POST_SLUGS,
  getBlogPostBySlug,
  isBlogPostSlug,
  type BlogPostSlug,
} from "@/lib/blog/blogPosts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: BlogPostSlug }[] {
  return BLOG_POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getMetadataTranslations(locale, "blogPost");

  if (!isBlogPostSlug(slug)) {
    return {
      title: t("notFound.title"),
      description: t("notFound.description"),
    };
  }

  const post = getBlogPostBySlug(slug);

  return {
    title: t(`${post.metadataKey}.title`),
    description: t(`${post.metadataKey}.description`),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!isBlogPostSlug(slug)) {
    notFound();
  }

  const { component: Article } = getBlogPostBySlug(slug);
  return <Article />;
}
