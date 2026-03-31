import {
  BlogArticlePostNav,
  BlogArticleShare,
  BlogPageHeader,
  RoseMeaningSection,
} from "@/components/blog";
import {
  EL_SIGNIFICAT_ROSES_INTRO,
  EL_SIGNIFICAT_ROSES_SECTIONS,
  EL_SIGNIFICAT_ROSES_TITLE,
} from "@/lib/blog/elSignificatRosesContent";

const PREV_POST = {
  slug: "perque-triar-art-verd-pels-teus-events-especials",
  label: "¿Perqué triar Artverd pels teus events especials?",
};
const NEXT_POST = {
  slug: "abril-el-mes-de-les-flors",
  label: "Abril el mes de les flors",
};

export function ElSignificatRosesArticle() {
  return (
    <div className="bg-[#f3f3f3]">
      <BlogPageHeader
        title={EL_SIGNIFICAT_ROSES_TITLE}
        imageSrc="/images/legacy/blog-el-color-de-les-roses.webp"
        imageAlt="Roses de diversos colors per Sant Jordi"
      />

      <BlogArticlePostNav
        prevSlug={PREV_POST.slug}
        prevLabel={PREV_POST.label}
        nextSlug={NEXT_POST.slug}
        nextLabel={NEXT_POST.label}
      />

      <article className="relative mx-auto max-w-3xl px-4 py-10 pb-6 md:px-6 md:py-14">
        <div className="space-y-5 text-[0.98rem] leading-relaxed text-black md:text-base">
          {EL_SIGNIFICAT_ROSES_INTRO.map((paragraph, index) => (
            <p
              key={index}
              className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
              style={{ animationDelay: `${40 + index * 60}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 space-y-10 md:mt-14 md:space-y-12">
          {EL_SIGNIFICAT_ROSES_SECTIONS.map((section, index) => (
            <RoseMeaningSection
              key={section.accent}
              accent={section.accent}
              title={section.title}
              paragraphs={section.paragraphs}
              animationIndex={index}
            />
          ))}
        </div>

        <BlogArticleShare shareTitle={EL_SIGNIFICAT_ROSES_TITLE} />
      </article>
    </div>
  );
}
