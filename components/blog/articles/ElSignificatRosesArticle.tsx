import {
  BlogArticlePostNav,
  BlogArticleShare,
  BlogPageHeader,
  RoseMeaningSection,
} from "@/components/blog";
import {
  getBlogPostById,
  getLocalizedBlogSlug,
} from "@/lib/blog/blogPosts";
import { getElSignificatRosesContent } from "@/lib/blog/elSignificatRosesContent";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const PREV_POST = {
  id: "perque-triar-art-verd-pels-teus-events-especials",
} as const;
const NEXT_POST = {
  id: "abril-el-mes-de-les-flors",
} as const;

interface ElSignificatRosesArticleProps {
  locale: AppLocale;
}

export async function ElSignificatRosesArticle({
  locale,
}: ElSignificatRosesArticleProps) {
  const t = await getTranslations({ locale, namespace: "blog.article" });
  const content = getElSignificatRosesContent(locale);
  const prevPost = getBlogPostById(PREV_POST.id);
  const nextPost = getBlogPostById(NEXT_POST.id);

  return (
    <div className="bg-[#f3f3f3]">
      <BlogPageHeader
        title={content.title}
        imageSrc="/images/legacy/blog-el-color-de-les-roses.webp"
        imageAlt={content.headerImageAlt}
      />

      <BlogArticlePostNav
        prevSlug={getLocalizedBlogSlug(PREV_POST.id, locale)}
        prevLabel={prevPost.titleByLocale[locale]}
        nextSlug={getLocalizedBlogSlug(NEXT_POST.id, locale)}
        nextLabel={nextPost.titleByLocale[locale]}
        ariaLabel={t("navigation.ariaLabel")}
        allPostsAriaLabel={t("navigation.allPostsAriaLabel")}
      />

      <article className="relative mx-auto max-w-3xl px-4 py-10 pb-6 md:px-6 md:py-14">
        <div className="space-y-5 text-[0.98rem] leading-relaxed text-black md:text-base">
          {content.intro.map((paragraph, index) => (
            <p
              key={index}
              className="animate-[blog-section-reveal_0.65s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${40 + index * 60}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 space-y-10 md:mt-14 md:space-y-12">
          {content.sections.map((section, index) => (
            <RoseMeaningSection
              key={section.accent}
              accent={section.accent}
              title={section.title}
              paragraphs={section.paragraphs}
              animationIndex={index}
            />
          ))}
        </div>

        <BlogArticleShare shareTitle={content.title} headingLabel={t("share")} />
      </article>
    </div>
  );
}
