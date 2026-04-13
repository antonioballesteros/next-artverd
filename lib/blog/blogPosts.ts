import { AbrilMesFlorsArticle } from "@/components/blog/articles/AbrilMesFlorsArticle";
import { ElSignificatRosesArticle } from "@/components/blog/articles/ElSignificatRosesArticle";
import { PerqueTriarArtverdArticle } from "@/components/blog/articles/PerqueTriarArtverdArticle";
import type { AppLocale } from "@/i18n/routing";
import type { ReactNode } from "react";

type BlogArticleComponent = (props: { locale: AppLocale }) => Promise<ReactNode> | ReactNode;

interface BlogPostEntry {
  id: string;
  slugByLocale: Record<AppLocale, string>;
  metadataKey: string;
  titleByLocale: Record<AppLocale, string>;
  component: BlogArticleComponent;
}

const BLOG_POST_ENTRIES = [
  {
    id: "perque-triar-art-verd-pels-teus-events-especials",
    slugByLocale: {
      ca: "perque-triar-art-verd-pels-teus-events-especials",
      es: "por-que-elegir-art-verd-para-tus-eventos-especiales",
    },
    metadataKey: "perque-triar-art-verd-pels-teus-events-especials",
    titleByLocale: {
      ca: "¿Perqué triar Artverd pels teus events especials?",
      es: "¿Por qué elegir Artverd para tus eventos especiales?",
    },
    component: PerqueTriarArtverdArticle,
  },
  {
    id: "abril-el-mes-de-les-flors",
    slugByLocale: {
      ca: "abril-el-mes-de-les-flors",
      es: "abril-el-mes-de-las-flores",
    },
    metadataKey: "abril-el-mes-de-les-flors",
    titleByLocale: {
      ca: "Abril el mes de les flors",
      es: "Abril, el mes de las flores",
    },
    component: AbrilMesFlorsArticle,
  },
  {
    id: "el-significat-del-color-de-les-roses",
    slugByLocale: {
      ca: "el-significat-del-color-de-les-roses",
      es: "el-significado-del-color-de-las-rosas",
    },
    metadataKey: "el-significat-del-color-de-les-roses",
    titleByLocale: {
      ca: "El significat del color de les roses",
      es: "El significado del color de las rosas",
    },
    component: ElSignificatRosesArticle,
  },
] as const satisfies readonly BlogPostEntry[];

export type BlogPostId = (typeof BLOG_POST_ENTRIES)[number]["id"];
export type BlogPostSlug = (typeof BLOG_POST_ENTRIES)[number]["slugByLocale"][AppLocale];

const BLOG_POSTS_BY_ID: Record<BlogPostId, (typeof BLOG_POST_ENTRIES)[number]> =
  BLOG_POST_ENTRIES.reduce(
    (accumulator, entry) => {
      accumulator[entry.id] = entry;
      return accumulator;
    },
    {} as Record<BlogPostId, (typeof BLOG_POST_ENTRIES)[number]>
  );

const BLOG_POST_IDS = BLOG_POST_ENTRIES.map((entry) => entry.id) as readonly BlogPostId[];

export function getBlogPostById(id: BlogPostId) {
  return BLOG_POSTS_BY_ID[id];
}

export function getBlogPostBySlugAndLocale(slug: string, locale: AppLocale) {
  return BLOG_POST_ENTRIES.find((entry) => entry.slugByLocale[locale] === slug);
}

export function getBlogPostByAnyLocalizedSlug(slug: string) {
  return BLOG_POST_ENTRIES.find(
    (entry) => entry.slugByLocale.ca === slug || entry.slugByLocale.es === slug
  );
}

export function getLocalizedBlogSlug(id: BlogPostId, locale: AppLocale): string {
  return BLOG_POSTS_BY_ID[id].slugByLocale[locale];
}

export function getAllLocalizedBlogSlugs(): string[] {
  return BLOG_POST_IDS.flatMap((id) => {
    const post = BLOG_POSTS_BY_ID[id];
    return [post.slugByLocale.ca, post.slugByLocale.es];
  });
}

export function getBlogSlugsForLocale(locale: AppLocale): string[] {
  return BLOG_POST_IDS.map((id) => BLOG_POSTS_BY_ID[id].slugByLocale[locale]);
}
