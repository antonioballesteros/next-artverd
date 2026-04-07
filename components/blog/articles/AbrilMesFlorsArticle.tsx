import {
  BlogArticlePostNav,
  BlogArticleShare,
  BlogPageHeader,
} from "@/components/blog";
import {
  getBlogPostById,
  getLocalizedBlogSlug,
} from "@/lib/blog/blogPosts";
import { getAbrilMesFlorsContent } from "@/lib/blog/abrilMesFlorsContent";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const PREV_POST = {
  id: "el-significat-del-color-de-les-roses",
} as const;

interface AbrilMesFlorsArticleProps {
  locale: AppLocale;
}

export async function AbrilMesFlorsArticle({
  locale,
}: AbrilMesFlorsArticleProps) {
  const t = await getTranslations({ locale, namespace: "blog.article" });
  const content = getAbrilMesFlorsContent(locale);
  const prevPost = getBlogPostById(PREV_POST.id);

  return (
    <div className="bg-[#f3f3f3]">
      <BlogPageHeader title={content.title} />

      <BlogArticlePostNav
        prevSlug={getLocalizedBlogSlug(PREV_POST.id, locale)}
        prevLabel={prevPost.titleByLocale[locale]}
        ariaLabel={t("navigation.ariaLabel")}
        allPostsAriaLabel={t("navigation.allPostsAriaLabel")}
      />

      <article className="relative mx-auto max-w-3xl px-4 py-10 pb-6 md:px-6 md:py-14">
        <div className="space-y-5 text-[0.98rem] leading-relaxed text-black md:text-base">
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "40ms" }}
          >
            {content.introFirst}
          </p>

          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "100ms" }}
          >
            {content.middleSegments.map((segment, index) =>
              segment.type === "strong" ? (
                <strong key={index}>{segment.value}</strong>
              ) : (
                <span key={index}>{segment.value}</span>
              )
            )}
          </p>

          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "160ms" }}
          >
            {content.introLast}
          </p>
        </div>

        <BlogArticleShare shareTitle={content.title} headingLabel={t("share")} />
      </article>
    </div>
  );
}
