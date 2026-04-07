import { tallersImages } from "@/lib/tallersAssets";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const CAPTURE_SRCS = [
  tallersImages.tallerIcons1,
  tallersImages.tallerIcons2,
  tallersImages.tallerIcons3,
] as const;

interface TallersCaptureTileProps {
  src: string;
  alt: string;
}

/** Intrinsic size of legacy workshop icon assets (194×243). */
const CAPTURE_WIDTH = 194;
const CAPTURE_HEIGHT = 243;

function TallersCaptureTile({ src, alt }: TallersCaptureTileProps) {
  return (
    <div className="w-full max-w-[220px]">
      <Image
        src={src}
        alt={alt}
        width={CAPTURE_WIDTH}
        height={CAPTURE_HEIGHT}
        className="h-auto w-full object-contain drop-shadow-md"
        sizes="(max-width: 639px) min(220px, 100vw), 220px"
      />
    </div>
  );
}

export async function TallersCapturesGallery() {
  const t = await getTranslations("tallers.capturesGallery");
  const imageAlts = t.raw("imageAlts") as string[];

  return (
    <section
      className="bg-emerald-50/40 py-12 md:py-16"
      aria-label={t("ariaLabel")}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end justify-items-center gap-10 px-4 sm:grid-cols-3 sm:gap-6 md:gap-10">
        {CAPTURE_SRCS.map((src, i) => (
          <TallersCaptureTile
            key={src}
            src={src}
            alt={imageAlts[i] ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
