import {
  LEGAL_CONTENT_LAST_UPDATED_LABEL,
} from "@/lib/legal/legalMeta";
import {
  PRIVACY_POLICY_FINALITAT_LEAD,
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_INTRO_CLOSING_BEFORE_LINK,
  PRIVACY_POLICY_SECTIONS,
  type PrivacyPolicySection,
} from "@/lib/legal/privacyPolicyContent";
import { Link } from "@/i18n/navigation";
import { elsie } from "@/lib/fonts";

function IdentitatSectionBody({ section }: { section: PrivacyPolicySection }) {
  return (
    <ul className="mt-4 list-disc space-y-3 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base">
      {section.listItems?.map((item) => (
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
  );
}

function DefaultSectionBody({ section }: { section: PrivacyPolicySection }) {
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

function FinalitatSectionBody({ section }: { section: PrivacyPolicySection }) {
  return (
    <>
      <p className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
        {PRIVACY_POLICY_FINALITAT_LEAD}
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed marker:text-emerald-600 md:text-base">
        <li>
          <Link
            href="/legal/avis-legal"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            Avís legal
          </Link>
        </li>
        <li>
          <Link
            href="/legal/politica-de-privacitat"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            Política de privacitat
          </Link>
        </li>
      </ul>
      {section.paragraphs?.map((p) => (
        <p
          key={p.slice(0, 48)}
          className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base"
        >
          {p}
        </p>
      ))}
      <ul className="mt-4 list-disc space-y-3 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base">
        {section.listItems?.map((item, idx) => (
          <li key={item.slice(0, 40)}>
            {idx === 2 ? (
              <>
                Per analitzar la navegació dels usuaris. El responsable recull
                altres dades no identificatives que s’obtenen mitjançant l’ús de
                galetes que es descarreguen a l’ordinador de l’usuari quan
                navega pel lloc web; les característiques i la finalitat estan
                detallades a la pàgina de{" "}
                <Link
                  href="/legal/politica-de-cookies"
                  className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
                >
                  política de galetes
                </Link>
                .
              </>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

function NavegacioSectionBody({ section }: { section: PrivacyPolicySection }) {
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
      {section.analyticsServiceEntries?.length ? (
        <ul className="mt-4 list-disc space-y-3 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base">
          {section.analyticsServiceEntries.map((entry) => (
            <li key={entry.name}>
              <span className="font-semibold text-emerald-900">{entry.name}</span>
              {": "}
              {entry.purpose}{" "}
              <a
                href={entry.docHref}
                className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.docLabel}
              </a>
              .
            </li>
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

function GaletesSectionBody({ section }: { section: PrivacyPolicySection }) {
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
      <p className="mt-4 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
        Pot consultar tota la informació relativa a la política de recollida i
        tractament de les galetes a la pàgina de{" "}
        <Link
          href="/legal/politica-de-cookies"
          className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
        >
          política de galetes
        </Link>
        .
      </p>
    </>
  );
}

function PrivacyPolicySectionBlock({
  section,
  index,
}: {
  section: PrivacyPolicySection;
  index: number;
}) {
  const delayMs = 80 + index * 45;

  return (
    <section
      id={section.id}
      className="scroll-mt-28 motion-safe:animate-[blog-section-reveal_0.65s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "forwards" }}
      aria-labelledby={`heading-${section.id}`}
    >
      <h2
        id={`heading-${section.id}`}
        className={`${elsie.className} text-2xl font-normal tracking-tight text-emerald-900 md:text-3xl`}
      >
        {section.heading}
      </h2>
      {section.id === "identitat" ? (
        <IdentitatSectionBody section={section} />
      ) : section.id === "finalitat" ? (
        <FinalitatSectionBody section={section} />
      ) : section.id === "galetes" ? (
        <GaletesSectionBody section={section} />
      ) : section.id === "navegacio" ? (
        <NavegacioSectionBody section={section} />
      ) : (
        <DefaultSectionBody section={section} />
      )}
    </section>
  );
}

export function PrivacyPolicyContent() {
  return (
    <div className="bg-[#f3f3f3]">
      <article className="relative mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <div className="space-y-5 text-[0.98rem] leading-relaxed text-emerald-950/90 md:text-base">
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "40ms", animationFillMode: "forwards" }}
          >
            {PRIVACY_POLICY_INTRO[0]}{" "}
            <a
              href="https://www.artverd.com"
              className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
            >
              https://www.artverd.com
            </a>
          </p>
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "90ms", animationFillMode: "forwards" }}
          >
            {PRIVACY_POLICY_INTRO[1]}
          </p>
          <p
            className="motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "140ms", animationFillMode: "forwards" }}
          >
            {PRIVACY_POLICY_INTRO_CLOSING_BEFORE_LINK}
            <Link
              href="/legal/avis-legal"
              className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
            >
              avís legal
            </Link>
            .
          </p>
          <p
            className="text-sm text-emerald-950/75 motion-safe:animate-[blog-section-reveal_0.65s_ease-out_forwards] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: "190ms", animationFillMode: "forwards" }}
          >
            Darrera actualització del text: {LEGAL_CONTENT_LAST_UPDATED_LABEL}.
          </p>
        </div>

        <div className="mt-12 space-y-12 md:mt-14 md:space-y-14">
          {PRIVACY_POLICY_SECTIONS.map((section, index) => (
            <PrivacyPolicySectionBlock
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
