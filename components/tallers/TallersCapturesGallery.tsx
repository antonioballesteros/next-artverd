import { tallersImages } from "@/lib/tallersAssets";
import Image from "next/image";

const CAPTURES: { src: string; alt: string }[] = [
  {
    src: tallersImages.tallerIcons1,
    alt: "Il·lustració decorativa del taller floral",
  },
  {
    src: tallersImages.tallerIcons2,
    alt: "Detall artístic del taller",
  },
  {
    src: tallersImages.tallerIcons3,
    alt: "Motiu floral del taller",
  },
];

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

export function TallersCapturesGallery() {
  return (
    <section
      className="bg-emerald-50/40 py-12 md:py-16"
      aria-label="Galeria il·lustrativa"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end justify-items-center gap-10 px-4 sm:grid-cols-3 sm:gap-6 md:gap-10">
        {CAPTURES.map((item) => (
          <TallersCaptureTile key={item.src} src={item.src} alt={item.alt} />
        ))}
      </div>
    </section>
  );
}
