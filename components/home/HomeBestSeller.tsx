import { Link } from "@/i18n/navigation";
import { artverdImages } from "@/lib/artverdAssets";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ScrollConvergePair } from "../ScrollConvergePair";
import { HomeSubtitle } from "./HomeSubtitle";

export async function HomeBestSeller() {
  const t = await getTranslations("home.bestSeller");

  return (
    <section className="bg-emerald-50/50" aria-labelledby="bestseller-heading">
      <HomeSubtitle>{t("subtitle")}</HomeSubtitle>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14"
        left={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
            <Image
              src={artverdImages.bestSeller}
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
        right={
          <div>
            <p className="mx-4 mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:mx-0 md:text-lg">
              {t("body")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/botiga"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                {t("ctaShop")}
              </Link>
            </div>
          </div>
        }
        once={false}
      />
    </section>
  );
}
