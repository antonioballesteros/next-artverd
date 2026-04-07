import { elsie } from "@/lib/fonts";
import { getTranslations } from "next-intl/server";

export async function CasamentsClosingNote() {
  const t = await getTranslations("casamentsIEvents.closingNote");

  return (
    <section
      className="border-t border-emerald-200/60 bg-emerald-50/40 py-12 md:py-16"
      aria-label={t("ariaLabel")}
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p
          className={`${elsie.className} text-lg leading-relaxed text-emerald-950 md:text-xl`}
        >
          {t("text")}
        </p>
      </div>
    </section>
  );
}
