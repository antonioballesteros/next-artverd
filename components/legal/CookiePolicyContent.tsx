import { LEGAL_CONTENT_LAST_UPDATED_LABEL } from "@/lib/legal/legalMeta";
import {
  COOKIE_POLICY_SECTIONS,
  type CookiePolicySection,
  type CookieSectionPart,
} from "@/lib/legal/cookiePolicyContent";
import { Link } from "@/i18n/navigation";
import { elsie } from "@/lib/fonts";

const BROWSER_HELP_LINKS: { label: string; href: string }[] = [
  {
    label: "Firefox",
    href: "https://support.mozilla.org/ca/kb/Galetes",
  },
  {
    label: "Google Chrome",
    href: "https://support.google.com/chrome/answer/95647?hl=ca",
  },
  {
    label: "Internet Explorer",
    href: "https://support.microsoft.com/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d",
  },
  {
    label: "Microsoft Edge",
    href: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
  {
    label: "Safari",
    href: "https://support.apple.com/ca-es/guide/safari/sfri11471/mac",
  },
];

function BrowserLinksList() {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base">
      {BROWSER_HELP_LINKS.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function CookieSectionParts({
  parts,
  sectionId,
}: {
  parts: readonly CookieSectionPart[];
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
              {part.items.map((item) => {
                const cookiePolicyExtra =
                  item.includes("addicional") &&
                  item.includes("política de galetes");

                if (cookiePolicyExtra) {
                  return (
                    <li key={item.slice(0, 48)}>
                      Obtenir informació addicional a la pàgina de{" "}
                      <Link
                        href="/legal/politica-de-cookies"
                        className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
                      >
                        política de galetes
                      </Link>
                      .
                    </li>
                  );
                }

                return <li key={item.slice(0, 48)}>{item}</li>;
              })}
            </ul>
          );
        }

        if (part.kind === "browser-links") {
          return <BrowserLinksList key={key} />;
        }

        if (part.kind === "cookie-table") {
          return (
            <div
              key={key}
              className="mt-4 overflow-x-auto rounded-lg border border-emerald-900/10 bg-white/80 shadow-sm"
            >
              <table className="w-full min-w-xl border-collapse text-left text-[0.85rem] text-emerald-950/90 md:min-w-0 md:text-[0.92rem]">
                <thead>
                  <tr className="border-b border-emerald-900/10 bg-emerald-50/80">
                    <th
                      scope="col"
                      className="px-3 py-2 font-semibold text-emerald-900"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 font-semibold text-emerald-900"
                    >
                      Proveïdor
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 font-semibold text-emerald-900"
                    >
                      Finalitat
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 font-semibold text-emerald-900"
                    >
                      Durada
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 font-semibold text-emerald-900"
                    >
                      Base legal (informativa)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {part.rows.map((row) => (
                    <tr
                      key={row.name.slice(0, 32)}
                      className="border-b border-emerald-900/5 last:border-b-0"
                    >
                      <td className="px-3 py-2.5 align-top font-medium text-emerald-900">
                        {row.name}
                      </td>
                      <td className="px-3 py-2.5 align-top">{row.provider}</td>
                      <td className="px-3 py-2.5 align-top">{row.purpose}</td>
                      <td className="px-3 py-2.5 align-top">{row.duration}</td>
                      <td className="px-3 py-2.5 align-top">{row.legalNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (part.kind === "link-list") {
          return (
            <ul
              key={key}
              className="mt-4 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-emerald-950/90 marker:text-emerald-600 md:text-base"
            >
              {part.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
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

function CookiePolicySectionBlock({
  section,
  index,
}: {
  section: CookiePolicySection;
  index: number;
}) {
  const delayMs = 80 + index * 45;

  return (
    <section
      id={section.id}
      className="scroll-mt-28 animate-[blog-section-reveal_0.65s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-0"
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "forwards" }}
      aria-labelledby={`heading-${section.id}`}
    >
      <h2
        id={`heading-${section.id}`}
        className={`${elsie.className} text-2xl font-normal tracking-tight text-emerald-900 md:text-3xl`}
      >
        {section.heading}
      </h2>
      <CookieSectionParts parts={section.parts} sectionId={section.id} />
    </section>
  );
}

export function CookiePolicyContent() {
  return (
    <div className="bg-[#f3f3f3]">
      <article className="relative mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <p
          className="text-[0.98rem] leading-relaxed text-emerald-950/90 animate-[blog-section-reveal_0.65s_ease-out_forwards] opacity-0 md:text-base"
          style={{ animationDelay: "40ms", animationFillMode: "forwards" }}
        >
          Aquesta política complementa la{" "}
          <Link
            href="/legal/politica-de-privacitat"
            className="font-medium text-emerald-700 underline-offset-2 hover:text-emerald-800 hover:underline"
          >
            política de privacitat
          </Link>{" "}
          quant a l’ús de galetes i tecnologies similars.
        </p>
        <p
          className="mt-3 text-sm text-emerald-950/75 animate-[blog-section-reveal_0.65s_ease-out_forwards] opacity-0"
          style={{ animationDelay: "90ms", animationFillMode: "forwards" }}
        >
          Darrera actualització del text: {LEGAL_CONTENT_LAST_UPDATED_LABEL}.
        </p>

        <div className="mt-12 space-y-12 md:mt-14 md:space-y-14">
          {COOKIE_POLICY_SECTIONS.map((section, index) => (
            <CookiePolicySectionBlock
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
