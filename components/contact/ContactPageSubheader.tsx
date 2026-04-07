import { artverdImages } from "@/lib/artverdAssets";
import { elsie } from "@/lib/fonts";
import { getTranslations } from "next-intl/server";

/** Taller hero band matching the legacy contact page (#Subheader + flower background). */
export async function ContactPageSubheader() {
  const t = await getTranslations("contacte.subheader");

  return (
    <header
      className="relative overflow-hidden bg-emerald-900 pt-32 pb-20 md:pt-44 md:pb-28 lg:pt-52 lg:pb-36"
      aria-labelledby="contact-page-title"
    >
      <div
        className="absolute inset-0 origin-[center_top] bg-cover bg-top bg-no-repeat motion-safe:animate-[legal-subheader-bg_16s_ease-out_forwards] motion-reduce:animate-none"
        style={{
          backgroundImage: `url(${artverdImages.flowerSectionBg})`,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-emerald-900/78" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <h1
          id="contact-page-title"
          className={`${elsie.className} text-4xl font-normal tracking-wide text-white motion-safe:animate-[blog-article-hero-in_0.75s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:text-6xl lg:text-7xl`}
          style={{ animationDelay: "60ms", animationFillMode: "forwards" }}
        >
          {t("title")}
        </h1>
        <div
          className="mx-auto mt-6 h-px w-28 origin-center bg-emerald-300/90 motion-safe:animate-[blog-title-line_0.95s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:mt-8"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          aria-hidden
        />
      </div>
    </header>
  );
}
