import Image, { type StaticImageData } from "next/image";

interface HeroSectionProps {
  src: string | StaticImageData;
  alt: string;
  /** Accessible name for the hero landmark (`aria-label` on the section). */
  ariaLabel: string;
}

export function HeroSection({ src, alt, ariaLabel }: HeroSectionProps) {
  return (
    <section className="relative w-full" aria-label={ariaLabel}>
      <div className="relative aspect-16/10 min-h-[min(52vh,560px)] w-full md:aspect-auto md:min-h-[min(70vh,900px)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="origin-center animate-[hero-ken-burns_14s_ease-out_forwards] object-cover object-center motion-reduce:scale-100 motion-reduce:animate-none"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
