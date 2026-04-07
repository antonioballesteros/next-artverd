import { Link } from "@/i18n/navigation";
import { artverdImages } from "@/lib/artverdAssets";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HomeSubtitle } from "./HomeSubtitle";
import { ScrollConvergePair } from "../ScrollConvergePair";

export async function HomeWorkshops() {
  const t = await getTranslations("home.workshops");

  return (
    <section className="bg-emerald-50/50" aria-labelledby="workshops-heading">
      <HomeSubtitle>{t("subtitle")}</HomeSubtitle>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 max-md:*:first:order-2 max-md:*:last:order-1 md:grid-cols-2 md:gap-14"
        left={
          <div className="mx-4 md:mx-0">
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
              {t("body")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tallers"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        }
        right={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
            <Image
              src={artverdImages.workshopsRams}
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
