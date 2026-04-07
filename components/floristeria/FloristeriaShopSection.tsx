import { Link } from "@/i18n/navigation";
import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { floristeriaImages } from "@/lib/floristeriaAssets";
import { elsie } from "@/lib/fonts";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function FloristeriaShopSection() {
  const t = await getTranslations("floristeria.shop");

  return (
    <section
      className="bg-background py-14 md:py-20"
      aria-labelledby="floristeria-shop-heading"
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2
          id="floristeria-shop-heading"
          className={`${elsie.className} text-3xl font-normal text-emerald-950 md:text-6xl`}
        >
          {t("heading")}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-emerald-900/90 md:text-lg">
          {t("intro")}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/botiga"
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-emerald-800 px-12 py-3.5 text-sm font-semibold tracking-widest text-white uppercase shadow-md transition hover:bg-emerald-900"
          >
            {t("cta")}
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-4 md:mt-20">
        <ScrollConvergePair
          className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
          left={
            <div className="relative aspect-3/4 max-h-[min(90vh,720px)] w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-xl md:mx-0">
              <Image
                src={floristeriaImages.shopInterior}
                alt={t("imageAlt")}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          }
          right={
            <div className="mx-4 text-pretty md:mx-0 md:pl-2">
              <div
                className="mx-auto mb-8 h-px w-20 bg-emerald-200/90 md:mx-0"
                aria-hidden
              />
              <p className="text-base leading-relaxed text-emerald-900/90 md:text-lg">
                {t("paragraph1")}
              </p>
              <p className="mt-5 text-base leading-relaxed text-emerald-900/90 md:text-lg">
                {t("paragraph2")}
              </p>
            </div>
          }
          once={false}
        />
      </div>
    </section>
  );
}
