import { Link } from "@/i18n/navigation";
import { ScrollConvergePair } from "@/components/ScrollConvergePair";
import { artverdImages } from "@/lib/artverdAssets";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HomeSubtitle } from "./HomeSubtitle";

interface IntroCheckListItemProps {
  children: React.ReactNode;
}

function IntroCheckListItem({ children }: IntroCheckListItemProps) {
  return (
    <li className="flex gap-1">
      <Check
        className="mt-1.5 h-5 w-5 shrink-0 text-emerald-600"
        aria-hidden
        strokeWidth={2}
      />
      <span>{children}</span>
    </li>
  );
}

export async function HomeIntro() {
  const t = await getTranslations("home.intro");

  return (
    <section className="bg-emerald-50/50" aria-labelledby="intro-heading">
      <HomeSubtitle>{t("subtitle")}</HomeSubtitle>
      <ScrollConvergePair
        className="mx-auto grid max-w-6xl items-center gap-10 max-md:*:first:order-2 max-md:*:last:order-1 md:grid-cols-2 md:gap-14"
        left={
          <div>
            <div className="mx-4 mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-emerald-900/90 md:mx-0 md:text-lg">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>
            <ul className="mt-8 max-w-2xl list-none space-y-3 text-emerald-900/90 md:text-lg">
              <IntroCheckListItem>{t("checklist1")}</IntroCheckListItem>
              <IntroCheckListItem>{t("checklist2")}</IntroCheckListItem>
              <IntroCheckListItem>{t("checklist3")}</IntroCheckListItem>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/floristeria"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                {t("ctaShop")}
              </Link>
              <Link
                href="/contacte"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                {t("ctaContact")}
              </Link>
            </div>
          </div>
        }
        right={
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-emerald-900/10 shadow-lg">
            <Image
              src={artverdImages.tenda}
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
