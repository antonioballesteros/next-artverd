/** Blog posts that are fully migrated to this app (served under `/blog/[slug]`). */

export const MIGRATED_BLOG_SLUGS = ["el-significat-del-color-de-les-roses"] as const;

export type MigratedBlogSlug = (typeof MIGRATED_BLOG_SLUGS)[number];

export function isMigratedBlogSlug(slug: string): slug is MigratedBlogSlug {
  return (MIGRATED_BLOG_SLUGS as readonly string[]).includes(slug);
}
