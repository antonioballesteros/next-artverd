import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { AppLocale } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blogPosts";
import { getTranslations } from "next-intl/server";

interface BlogPostGridProps {
  locale: AppLocale;
}

export async function BlogPostGrid({ locale }: BlogPostGridProps) {
  const posts = getBlogPosts(locale);
  const t = await getTranslations({ locale, namespace: "blog.list" });

  return (
    <div
      id="blog-posts"
      className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 px-4 pb-20 md:grid-cols-2 md:gap-10 md:pb-28 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} readMoreLabel={t("readMore")} />
      ))}
    </div>
  );
}
