import { AbrilMesFlorsArticle } from "@/components/blog/articles/AbrilMesFlorsArticle";
import { ElSignificatRosesArticle } from "@/components/blog/articles/ElSignificatRosesArticle";
import { PerqueTriarArtverdArticle } from "@/components/blog/articles/PerqueTriarArtverdArticle";
import type { ComponentType } from "react";

interface BlogPostEntry {
  slug: string;
  metadataKey: string;
  component: ComponentType;
}

const BLOG_POST_ENTRIES = [
  {
    slug: "perque-triar-art-verd-pels-teus-events-especials",
    metadataKey: "perque-triar-art-verd-pels-teus-events-especials",
    component: PerqueTriarArtverdArticle,
  },
  {
    slug: "abril-el-mes-de-les-flors",
    metadataKey: "abril-el-mes-de-les-flors",
    component: AbrilMesFlorsArticle,
  },
  {
    slug: "el-significat-del-color-de-les-roses",
    metadataKey: "el-significat-del-color-de-les-roses",
    component: ElSignificatRosesArticle,
  },
] as const satisfies readonly BlogPostEntry[];

export type BlogPostSlug = (typeof BLOG_POST_ENTRIES)[number]["slug"];

const BLOG_POSTS_BY_SLUG: Record<BlogPostSlug, (typeof BLOG_POST_ENTRIES)[number]> =
  BLOG_POST_ENTRIES.reduce(
    (accumulator, entry) => {
      accumulator[entry.slug] = entry;
      return accumulator;
    },
    {} as Record<BlogPostSlug, (typeof BLOG_POST_ENTRIES)[number]>
  );

export const BLOG_POST_SLUGS: readonly BlogPostSlug[] = BLOG_POST_ENTRIES.map(
  (entry) => entry.slug
);

export function isBlogPostSlug(slug: string): slug is BlogPostSlug {
  return slug in BLOG_POSTS_BY_SLUG;
}

export function getBlogPostBySlug(slug: BlogPostSlug) {
  return BLOG_POSTS_BY_SLUG[slug];
}
