import {
  BlogArticlePostNav,
  BlogArticleShare,
  BlogPageHeader,
} from "@/components/blog";
import {
  getBlogPostById,
  getLocalizedBlogSlug,
} from "@/lib/blog/blogPosts";
import {
  getPerqueTriarArtVerdContent,
} from "@/lib/blog/perqueTriarArtVerdContent";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const NEXT_POST = {
  id: "el-significat-del-color-de-les-roses",
} as const;

interface EventReasonSectionProps {
  title: string;
  body: string;
  animationIndex: number;
}

function EventReasonSection({
  title,
  body,
  animationIndex,
}: EventReasonSectionProps) {
  const delayMs = 140 + animationIndex * 70;

  return (
    <section
      className="rounded-r-xl border-l-4 border-l-emerald-600 bg-emerald-50/45 py-1 pl-5 animate-[blog-section-reveal_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-0 md:pl-6"
      style={{ animationDelay: `${delayMs}ms` }}
      aria-labelledby={`reason-${animationIndex}`}
    >
      <h2
        id={`reason-${animationIndex}`}
        className="text-lg font-bold tracking-tight text-emerald-900 md:text-xl"
      >
        {title}
      </h2>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-emerald-950/90 md:text-base">
        {body}
      </p>
    </section>
  );
}

interface PerqueTriarArtverdArticleProps {
  locale: AppLocale;
}

export async function PerqueTriarArtverdArticle({
  locale,
}: PerqueTriarArtverdArticleProps) {
  const t = await getTranslations({ locale, namespace: "blog.article" });
  const content = getPerqueTriarArtVerdContent(locale);
  const nextPost = getBlogPostById(NEXT_POST.id);

  return (
    <div className="bg-[#f3f3f3]">
      <BlogPageHeader
        title={content.title}
        imageSrc="/images/legacy/blog-triar-art-verd.webp"
        imageAlt={content.headerImageAlt}
      />

      <BlogArticlePostNav
        nextSlug={getLocalizedBlogSlug(NEXT_POST.id, locale)}
        nextLabel={nextPost.titleByLocale[locale]}
        ariaLabel={t("navigation.ariaLabel")}
        allPostsAriaLabel={t("navigation.allPostsAriaLabel")}
      />

      <article className="relative mx-auto max-w-3xl px-4 py-10 pb-6 md:px-6 md:py-14">
        <div className="space-y-5 text-[0.98rem] leading-relaxed text-black md:text-base">
          <p
            className="animate-[blog-section-reveal_0.65s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "40ms" }}
          >
            {content.intro}
          </p>

          <p
            className="animate-[blog-section-reveal_0.65s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "90ms" }}
          >
            {content.leadIn}
          </p>
        </div>

        <div className="mt-10 space-y-8 md:mt-12 md:space-y-10">
          {content.reasons.map((reason, index) => (
            <EventReasonSection
              key={reason.title}
              title={reason.title}
              body={reason.body}
              animationIndex={index}
            />
          ))}
        </div>

        <p
          className="mt-12 text-[0.98rem] leading-relaxed text-black animate-[blog-section-reveal_0.65s_ease-out_forwards] opacity-0 md:text-base"
          style={{
            animationDelay: `${140 + content.reasons.length * 70 + 40}ms`,
          }}
        >
          {content.closingSegments.map((segment, index) =>
            segment.type === "strong" ? (
              <strong key={index}>{segment.value}</strong>
            ) : (
              <span key={index}>{segment.value}</span>
            )
          )}
        </p>

        <BlogArticleShare shareTitle={content.title} headingLabel={t("share")} />
      </article>
    </div>
  );
}
