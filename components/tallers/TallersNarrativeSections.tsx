import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { tallersImages } from "@/lib/tallersAssets";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { TallersSectionDivider } from "./TallersSectionDivider";

export async function TallersNarrativeSections() {
  const t = await getTranslations("tallers.narrative");

  return (
    <div className="bg-background">
      <TallersSectionDivider />

      <section className="pb-4 md:pb-6" aria-label={t("sectionWorkshopsAria")}>
        <ScrollConvergePair
          className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14"
          left={
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl md:aspect-[1564/880]">
              <Image
                src={tallersImages.heroMain}
                alt={t("imageMainAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          }
          right={
            <div className="text-pretty text-emerald-900/90">
              <p className="text-base leading-relaxed md:text-lg">
                {t("section1.p1")}
              </p>
              <p className="mt-4 text-base leading-relaxed md:text-lg">
                {t("section1.p2")}
              </p>
            </div>
          }
          once={false}
        />
      </section>

      <TallersSectionDivider />

      <section className="pb-12 md:pb-16" aria-label={t("sectionColorAria")}>
        <ScrollConvergePair
          className="mx-auto grid max-w-6xl items-center gap-10 px-4 max-md:*:first:order-2 max-md:*:last:order-1 md:grid-cols-2 md:gap-14"
          left={
            <div className="mx-4 text-pretty text-emerald-900/90 md:mx-0">
              <p className="text-base leading-relaxed md:text-lg">
                {t("section2.p1")}
              </p>
              <p className="mt-4 text-base leading-relaxed md:text-lg">
                {t("section2.p2")}
              </p>
            </div>
          }
          right={
            <div className="relative aspect-495/880 w-full max-w-md overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl md:mx-auto md:max-w-none">
              <Image
                src={tallersImages.contentArrangement}
                alt={t("imageArrangementAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          }
          once={false}
        />
      </section>
    </div>
  );
}
