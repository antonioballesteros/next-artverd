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

function TallersCaptureTile({ src, alt }: TallersCaptureTileProps) {
  return (
    <div className="relative aspect-194/243 max-w-[220px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain drop-shadow-md"
        sizes="220px"
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
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-4 sm:grid-cols-3 sm:gap-6 md:gap-10">
        {CAPTURES.map((item) => (
          <TallersCaptureTile key={item.src} src={item.src} alt={item.alt} />
        ))}
      </div>
    </section>
  );
}
