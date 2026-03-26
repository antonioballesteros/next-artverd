import { artverdImages } from "@/lib/artverdAssets";
import { elsie } from "@/lib/fonts";

export interface LegalPageSubheaderProps {
  title: string;
  id?: string;
}

export function LegalPageSubheader({
  title,
  id = "legal-page-title",
}: LegalPageSubheaderProps) {
  return (
    <header
      className="relative overflow-hidden bg-[#134845] pt-28 pb-14 md:pt-36 md:pb-20"
      aria-labelledby={id}
    >
      <div
        className="absolute inset-0 origin-[center_top] bg-cover bg-top bg-no-repeat motion-safe:animate-[legal-subheader-bg_16s_ease-out_forwards] motion-reduce:animate-none"
        style={{
          backgroundImage: `url(${artverdImages.flowerSectionBg})`,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#134845]/78" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <h1
          id={id}
          className={`${elsie.className} text-4xl font-normal tracking-wide text-white motion-safe:animate-[blog-article-hero-in_0.75s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 md:text-6xl lg:text-7xl`}
          style={{ animationDelay: "60ms", animationFillMode: "forwards" }}
        >
          {title}
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
