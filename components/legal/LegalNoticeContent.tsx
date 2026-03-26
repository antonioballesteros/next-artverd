import {
  LEGAL_NOTICE_IDENTIFICACIO_INTRO,
  LEGAL_NOTICE_IDENTIFICACIO_LIST,
  LEGAL_NOTICE_SECTIONS,
  type LegalNoticeSection,
} from "@/lib/legal/legalNoticeContent";
import { elsie } from "@/lib/fonts";
import Link from "next/link";

function IdentificacioBlock({ animationIndex }: { animationIndex: number }) {
  const delayMs = 80 + animationIndex * 45;

  return (
    <section
      id="identificacio"
      className="motion-safe:animate-[blog-section-reveal_0.65s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 scroll-mt-28"
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "forwards" }}
      aria-labelledby="heading-identificacio"
    >
      <h2
        id="heading-identificacio"
        className={`${elsie.className} text-2xl font-normal tracking-tight text-[#134845] md:text-3xl`}
      >
        Identificació i titularitat
      </h2>
      <p className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
        {LEGAL_NOTICE_IDENTIFICACIO_INTRO}
      </p>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base">
        {LEGAL_NOTICE_IDENTIFICACIO_LIST.map((item) => (
          <li key={item.slice(0, 40)}>
            {item.startsWith("Lloc web:") ? (
              <>
                Lloc web:{" "}
                <a
                  href="https://www.artverd.com"
                  className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
                >
                  https://www.artverd.com
                </a>
              </>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CondicionsUsBody({ section }: { section: LegalNoticeSection }) {
  return (
    <>
      {section.paragraphs?.map((p) => (
        <p
          key={p.slice(0, 48)}
          className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base"
        >
          {p}
        </p>
      ))}
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed marker:text-emerald-600 md:text-base">
        <li>
          <Link
            href="/avis-legal"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            Avís legal
          </Link>
        </li>
        <li>
          <Link
            href="/politica-de-privacitat"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            Política de privacitat
          </Link>
        </li>
        <li>
          <Link
            href="/politica-de-cookies"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            Política de galetes
          </Link>
        </li>
      </ul>
      {section.trailingParagraphs?.map((p) => (
        <p
          key={p.slice(0, 48)}
          className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base"
        >
          {p}
        </p>
      ))}
    </>
  );
}

function TractamentDadesBody() {
  return (
    <p className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
      Pot consultar tota la informació relativa al tractament de dades personals que recull el
      titular a la pàgina de{" "}
      <Link
        href="/politica-de-privacitat"
        className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
      >
        política de privacitat
      </Link>
      .
    </p>
  );
}

function GaletesLegalBody() {
  return (
    <p className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
      Pot consultar tota la informació relativa a la política de recollida i tractament de les
      galetes a la pàgina de{" "}
      <Link
        href="/politica-de-cookies"
        className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
      >
        política de galetes
      </Link>
      .
    </p>
  );
}

function DefaultSectionBody({ section }: { section: LegalNoticeSection }) {
  return (
    <>
      {section.paragraphs?.map((p) => (
        <p
          key={p.slice(0, 48)}
          className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base"
        >
          {p}
        </p>
      ))}
      {section.listItems?.length ? (
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base">
          {section.listItems.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.trailingParagraphs?.map((p) => (
        <p
          key={p.slice(0, 48)}
          className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base"
        >
          {p}
        </p>
      ))}
    </>
  );
}

function LegalNoticeSectionBlock({
  section,
  index,
}: {
  section: LegalNoticeSection;
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
        className={`${elsie.className} text-2xl font-normal tracking-tight text-[#134845] md:text-3xl`}
      >
        {section.heading}
      </h2>
      {section.id === "condicions-us" ? (
        <CondicionsUsBody section={section} />
      ) : section.id === "tractament-dades" ? (
        <TractamentDadesBody />
      ) : section.id === "galetes" ? (
        <GaletesLegalBody />
      ) : (
        <DefaultSectionBody section={section} />
      )}
    </section>
  );
}

export function LegalNoticeContent() {
  return (
    <div className="bg-[#f3f3f3]">
      <article className="relative mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <IdentificacioBlock animationIndex={0} />

        <div className="mt-12 space-y-12 md:mt-14 md:space-y-14">
          {LEGAL_NOTICE_SECTIONS.map((section, index) => (
            <LegalNoticeSectionBlock
              key={section.id}
              section={section}
              index={index + 1}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
