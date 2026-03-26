import {
  TERMS_AND_CONDITIONS_SECTIONS,
  type TermsSection,
  type TermsSectionPart,
} from "@/lib/legal/termsAndConditionsContent";
import { elsie } from "@/lib/fonts";
import Link from "next/link";

function TermsSectionParts({
  parts,
  sectionId,
}: {
  parts: readonly TermsSectionPart[];
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
              className="mt-8 text-lg font-semibold tracking-tight text-[#134845] first:mt-4 md:text-xl"
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

        if (part.kind === "privacy-link") {
          return (
            <p
              key={key}
              className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base"
            >
              Per al tractament de dades personals, consulti la pàgina de{" "}
              <Link
                href="/legal/politica-de-privacitat"
                className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
              >
                política de privacitat
              </Link>
              .
            </p>
          );
        }

        return null;
      })}
    </>
  );
}

function TermsSectionBlock({
  section,
  index,
}: {
  section: TermsSection;
  index: number;
}) {
  const delayMs = 80 + index * 35;

  return (
    <section
      id={section.id}
      className="scroll-mt-28 motion-safe:animate-[blog-section-reveal_0.65s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "forwards" }}
      aria-labelledby={`heading-${section.id}`}
    >
      <h2
        id={`heading-${section.id}`}
        className={`${elsie.className} text-2xl font-normal tracking-tight text-[#134845] md:text-3xl`}
      >
        {section.heading}
      </h2>
      <TermsSectionParts parts={section.parts} sectionId={section.id} />
    </section>
  );
}

export function TermsAndConditionsContent() {
  return (
    <div className="bg-[#f3f3f3]">
      <article className="relative mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <p
          className="text-[0.98rem] leading-relaxed text-emerald-950/90 motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:text-base"
          style={{ animationDelay: "40ms", animationFillMode: "forwards" }}
        >
          Aquests termes complementen l’
          <Link
            href="/legal/avis-legal"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            avís legal
          </Link>{" "}
          i la{" "}
          <Link
            href="/legal/politica-de-privacitat"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            política de privacitat
          </Link>{" "}
          quan faci servir la botiga o els serveis en línia.
        </p>

        <div className="mt-12 space-y-12 md:mt-14 md:space-y-14">
          {TERMS_AND_CONDITIONS_SECTIONS.map((section, index) => (
            <TermsSectionBlock
              key={section.id}
              section={section}
              index={index}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
