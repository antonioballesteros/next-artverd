import { artverdImages } from "@/lib/artverdAssets";
import { artverdSignature } from "@/lib/fonts";
import { getTranslations } from "next-intl/server";
import { HomeSubtitle } from "./HomeSubtitle";

interface HomeTestimonialItem {
  quote: string;
  author: string;
}

export async function HomeTestimonials() {
  const t = await getTranslations("home.testimonials");
  const items = t.raw("items") as HomeTestimonialItem[];

  return (
    <section className="bg-emerald-50/50" aria-labelledby="reviews-heading">
      <HomeSubtitle>{t("subtitle")}</HomeSubtitle>
      <div
        className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: `url(${artverdImages.flowerSectionBg})` }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <li
              key={`${item.author}-${index}`}
              className="flex flex-col rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm"
            >
              <p className="leading-relaxed text-emerald-900/90">
                “{item.quote}”
              </p>
              <p
                className={`${artverdSignature.className} mt-auto text-right text-xl text-emerald-950`}
              >
                {item.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
