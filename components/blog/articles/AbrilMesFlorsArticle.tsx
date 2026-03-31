import {
  BlogArticlePostNav,
  BlogArticleShare,
  BlogPageHeader,
} from "@/components/blog";
import {
  ABRIL_MES_FLORS_INTRO_FIRST,
  ABRIL_MES_FLORS_INTRO_LAST,
  ABRIL_MES_FLORS_MIDDLE_SEGMENTS,
  ABRIL_MES_FLORS_TITLE,
} from "@/lib/blog/abrilMesFlorsContent";

const PREV_POST = {
  slug: "el-significat-del-color-de-les-roses",
  label: "El significat del color de les roses",
};

export function AbrilMesFlorsArticle() {
  return (
    <div className="bg-[#f3f3f3]">
      <BlogPageHeader title={ABRIL_MES_FLORS_TITLE} />

      <BlogArticlePostNav
        prevSlug={PREV_POST.slug}
        prevLabel={PREV_POST.label}
      />

      <article className="relative mx-auto max-w-3xl px-4 py-10 pb-6 md:px-6 md:py-14">
        <div className="space-y-5 text-[0.98rem] leading-relaxed text-black md:text-base">
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "40ms" }}
          >
            {ABRIL_MES_FLORS_INTRO_FIRST}
          </p>

          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "100ms" }}
          >
            {ABRIL_MES_FLORS_MIDDLE_SEGMENTS.map((segment, index) =>
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
            {ABRIL_MES_FLORS_INTRO_LAST}
          </p>
        </div>

        <BlogArticleShare shareTitle={ABRIL_MES_FLORS_TITLE} />
      </article>
    </div>
  );
}
