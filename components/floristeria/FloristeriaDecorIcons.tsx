import { floristeriaImages } from "@/lib/floristeriaAssets";
import Image from "next/image";

interface DecorIconItem {
  src: string;
}

const ICONS: DecorIconItem[] = [
  { src: floristeriaImages.iconPlanta },
  { src: floristeriaImages.iconFlor },
  { src: floristeriaImages.iconPlantaAlt },
  { src: floristeriaImages.iconGirasol },
];

export function FloristeriaDecorIcons() {
  return (
    <section
      className="border-y border-emerald-100/80 bg-emerald-50/40 py-12 md:py-16"
      aria-hidden
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-10">
        {ICONS.map((item) => (
          <div key={item.src} className="flex min-w-0 flex-1 justify-center">
            <Image
              src={item.src}
              alt=""
              width={128}
              height={128}
              className="h-16 w-16 object-contain drop-shadow-sm sm:h-20 sm:w-20 md:h-28 md:w-28"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
