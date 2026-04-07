import { elsie } from "@/lib/fonts";
import { getTranslations } from "next-intl/server";
import { TallersSectionDivider } from "./TallersSectionDivider";

export async function TallersClosingNote() {
  const t = await getTranslations("tallers.closingNote");

  return (
    <section
      className="bg-background py-12 md:py-16"
      aria-label={t("ariaLabel")}
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <TallersSectionDivider />
        <p
          className={`${elsie.className} text-base leading-relaxed text-emerald-900/90 md:text-lg`}
        >
          {t("p1")}
        </p>
        <p
          className={`${elsie.className} mt-6 text-base leading-relaxed text-emerald-900/90 md:text-lg`}
        >
          {t("p2")}
        </p>
        <div className="mt-10">
          <TallersSectionDivider />
        </div>
      </div>
    </section>
  );
}
