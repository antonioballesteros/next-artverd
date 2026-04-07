import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { floristeriaImages } from "@/lib/floristeriaAssets";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function FloristeriaStorySection() {
  const t = await getTranslations("floristeria.story");

  return (
    <section className="bg-background py-12 md:py-16">
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 px-4 max-md:*:first:order-2 max-md:*:last:order-1 md:grid-cols-2 md:gap-14"
        left={
          <div className="mx-4 text-pretty md:mx-0">
            <p className="text-base leading-relaxed text-emerald-900/90 md:text-lg">
              {t("paragraph1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-emerald-900/90 md:text-lg">
              {t("paragraph2")}
            </p>
          </div>
        }
        right={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl">
            <Image
              src={floristeriaImages.bouquetHero}
                alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
        once={false}
      />
    </section>
  );
}
