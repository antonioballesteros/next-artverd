import {
  ACCESSIBILITY_INTRO_PARAGRAPH,
  ACCESSIBILITY_MEASURES,
  ACCESSIBILITY_MEASURES_INTRO,
  ACCESSIBILITY_SECTIONS,
  type AccessibilityPart,
  type AccessibilitySection,
} from "@/lib/legal/accessibilityPolicyContent";
import { elsie } from "@/lib/fonts";

function AccessibilityParts({
  parts,
  sectionId,
}: {
  parts: readonly AccessibilityPart[];
  sectionId: string;
}) {
  return (
    <>
      {parts.map((part, i) => {
        const key = `${sectionId}-${i}-${part.kind}`;

        if (part.kind === "p") {
          return (
            <p
              key={key}
              className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base"
            >
              {part.text}
            </p>
          );
        }

        if (part.kind === "h3") {
          return (
            <h3
              key={key}
              className="mt-8 text-lg font-semibold tracking-tight text-emerald-900 first:mt-4 md:text-xl"
            >
              {part.text}
            </h3>
          );
        }

        if (part.kind === "ul") {
          return (
            <ul
              key={key}
              className="mt-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base"
            >
              {part.items.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          );
        }

        if (part.kind === "resource-links") {
          return (
            <ul
              key={key}
              className="mt-4 list-none space-y-6 border-l-2 border-emerald-200 pl-5"
            >
              {part.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </>
  );
}

function AccessibilitySectionBlock({
  section,
  index,
}: {
  section: AccessibilitySection;
  index: number;
}) {
  const delayMs = 80 + index * 45;

  return (
    <section
      id={section.id}
      className="motion-safe:animate-[blog-section-reveal_0.65s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 scroll-mt-28"
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "forwards" }}
      aria-labelledby={`heading-${section.id}`}
    >
      <h2
        id={`heading-${section.id}`}
        className={`${elsie.className} text-2xl font-normal tracking-tight text-emerald-900 md:text-3xl`}
      >
        {section.heading}
      </h2>
      <AccessibilityParts parts={section.parts} sectionId={section.id} />
    </section>
  );
}

export function AccessibilityPolicyContent() {
  return (
    <div className="bg-[#f3f3f3]">
      <article className="relative mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <div className="space-y-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "40ms", animationFillMode: "forwards" }}
          >
            {ACCESSIBILITY_INTRO_PARAGRAPH}
          </p>
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "90ms", animationFillMode: "forwards" }}
          >
            {ACCESSIBILITY_MEASURES_INTRO}
          </p>
          <ul
            className="list-disc space-y-2 pl-5 marker:text-emerald-600 motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "140ms", animationFillMode: "forwards" }}
          >
            {ACCESSIBILITY_MEASURES.map((item) => (
              <li key={item.slice(0, 40)}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12 space-y-12 md:mt-14 md:space-y-14">
          {ACCESSIBILITY_SECTIONS.map((section, index) => (
            <AccessibilitySectionBlock key={section.id} section={section} index={index} />
          ))}
        </div>
      </article>
    </div>
  );
}
