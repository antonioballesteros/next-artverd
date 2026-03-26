export const MIGRATED_BLOG_SLUGS = [
  "perque-triar-art-verd-pels-teus-events-especials",
  "el-significat-del-color-de-les-roses",
  "abril-el-mes-de-les-flors",
] as const;

export type MigratedBlogSlug = (typeof MIGRATED_BLOG_SLUGS)[number];

export function isMigratedBlogSlug(slug: string): slug is MigratedBlogSlug {
  return (MIGRATED_BLOG_SLUGS as readonly string[]).includes(slug);
}
