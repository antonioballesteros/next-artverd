import { getMetadataTranslations } from "@/lib/i18n/pageMetadata";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  getAllLocalizedBlogSlugs,
  getBlogPostByAnyLocalizedSlug,
  getBlogPostBySlugAndLocale,
} from "@/lib/blog/blogPosts";
import { routing, type AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllLocalizedBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getMetadataTranslations(locale, "blogPost");

  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const post =
    getBlogPostBySlugAndLocale(slug, localeForPage) ??
    getBlogPostByAnyLocalizedSlug(slug);

  if (!post) {
    return buildPageMetadata({
      locale: localeForPage,
      title: t("notFound.title"),
      description: t("notFound.description"),
      localizedPath: {
        ca: "/blog",
        es: "/blog",
      },
    });
  }

  return buildPageMetadata({
    locale: localeForPage,
    title: t(`${post.metadataKey}.title`),
    description: t(`${post.metadataKey}.description`),
    localizedPath: {
      ca: `/blog/${post.slugByLocale.ca}`,
      es: `/blog/${post.slugByLocale.es}`,
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;

  const localeForPage: AppLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const post =
    getBlogPostBySlugAndLocale(slug, localeForPage) ??
    getBlogPostByAnyLocalizedSlug(slug);
  if (!post) {
    notFound();
  }
  const { component: Article } = post;
  return <Article locale={localeForPage} />;
}
