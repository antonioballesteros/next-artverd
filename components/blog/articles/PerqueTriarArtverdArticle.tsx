import {
  BlogArticlePostNav,
  BlogArticleShare,
  BlogPageHeader,
} from "@/components/blog";
import {
  PERQUE_TRIAR_ARTVERD_CLOSING_SEGMENTS,
  PERQUE_TRIAR_ARTVERD_INTRO,
  PERQUE_TRIAR_ARTVERD_LEAD_IN,
  PERQUE_TRIAR_ARTVERD_REASONS,
  PERQUE_TRIAR_ARTVERD_TITLE,
} from "@/lib/blog/perqueTriarArtVerdContent";

const NEXT_POST = {
  href: "/blog/abril-el-mes-de-les-flors",
  label: "Abril el mes de les flors",
};

interface EventReasonSectionProps {
  title: string;
  body: string;
  animationIndex: number;
}

function EventReasonSection({ title, body, animationIndex }: EventReasonSectionProps) {
  const delayMs = 140 + animationIndex * 70;

  return (
    <section
      className="rounded-r-xl border-l-4 border-l-emerald-600 bg-emerald-50/45 py-1 pl-5 motion-safe:animate-[blog-section-reveal_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:pl-6"
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

export function PerqueTriarArtverdArticle() {
  return (
    <div className="bg-[#f3f3f3]">
      <BlogPageHeader
        title={PERQUE_TRIAR_ARTVERD_TITLE}
        imageSrc="/images/legacy/blog-triar-art-verd.jpg"
        imageAlt="Flors i decoració per a esdeveniments especials"
      />

      <BlogArticlePostNav nextHref={NEXT_POST.href} nextLabel={NEXT_POST.label} />

      <article className="relative mx-auto max-w-3xl px-4 py-10 pb-6 md:px-6 md:py-14">
        <div className="space-y-5 text-[0.98rem] leading-relaxed text-black md:text-base">
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "40ms" }}
          >
            {PERQUE_TRIAR_ARTVERD_INTRO}
          </p>

          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "90ms" }}
          >
            {PERQUE_TRIAR_ARTVERD_LEAD_IN}
          </p>
        </div>

        <div className="mt-10 space-y-8 md:mt-12 md:space-y-10">
          {PERQUE_TRIAR_ARTVERD_REASONS.map((reason, index) => (
            <EventReasonSection
              key={reason.title}
              title={reason.title}
              body={reason.body}
              animationIndex={index}
            />
          ))}
        </div>

        <p
          className="mt-12 text-[0.98rem] leading-relaxed text-black motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:text-base"
          style={{ animationDelay: `${140 + PERQUE_TRIAR_ARTVERD_REASONS.length * 70 + 40}ms` }}
        >
          {PERQUE_TRIAR_ARTVERD_CLOSING_SEGMENTS.map((segment, index) =>
            segment.type === "strong" ? (
              <strong key={index}>{segment.value}</strong>
            ) : (
              <span key={index}>{segment.value}</span>
            ),
          )}
        </p>

        <BlogArticleShare shareTitle={PERQUE_TRIAR_ARTVERD_TITLE} />
      </article>
    </div>
  );
}
