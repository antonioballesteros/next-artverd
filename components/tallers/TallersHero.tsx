import { tallersImages } from "@/lib/tallersAssets";
import Image from "next/image";

export function TallersHero() {
  return (
    <section className="relative w-full" aria-label="Tallers — main image">
      <div className="relative aspect-16/10 min-h-[min(52vh,560px)] w-full md:aspect-auto md:min-h-[min(70vh,900px)]">
        <Image
          src={tallersImages.heroMain}
          alt="Floral workshop — working with flowers and foliage"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
