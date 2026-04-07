"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ProductImageGalleryProps {
  productName: string;
  imagePaths: string[];
}

const PRODUCT_GALLERY_IMAGE_SIZES = "(max-width: 1024px) 100vw, 50vw";

interface ProductGalleryImageProps {
  src: string;
  alt: string;
  priority: boolean;
  wrapperClassName: string;
}

function ProductGalleryImage({
  src,
  alt,
  priority,
  wrapperClassName,
}: ProductGalleryImageProps) {
  return (
    <div className={wrapperClassName}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={PRODUCT_GALLERY_IMAGE_SIZES}
        priority={priority}
      />
    </div>
  );
}

export function ProductImageGallery({
  productName,
  imagePaths,
}: ProductImageGalleryProps) {
  const t = useTranslations("botiga.productGallery");
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = imagePaths.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const emblaOptions = useMemo(
    () => ({
      loop: true,
      duration: reduceMotion ? 0 : 25,
    }),
    [reduceMotion]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const syncSelected = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", syncSelected);
    emblaApi.on("reInit", syncSelected);
    return () => {
      emblaApi.off("select", syncSelected);
      emblaApi.off("reInit", syncSelected);
    };
  }, [emblaApi, syncSelected]);

  useEffect(() => {
    if (!emblaApi) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
      if (e.key === "ArrowRight") emblaApi.scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi]);

  if (count === 0) return null;

  const frameClass =
    "relative w-full overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-sm aspect-square";

  if (count === 1) {
    return (
      <ProductGalleryImage
        src={imagePaths[0]}
        alt={productName}
        priority
        wrapperClassName={frameClass}
      />
    );
  }

  return (
    <div
      className="relative w-full"
      aria-roledescription="carousel"
      aria-label={t("carouselOf", { name: productName })}
    >
      <div className={frameClass}>
        <div className="h-full touch-pan-y overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {imagePaths.map((src, i) => (
              <ProductGalleryImage
                key={src}
                src={src}
                alt={t("imageAlt", {
                  name: productName,
                  current: i + 1,
                  total: count,
                })}
                priority={i === 0}
                wrapperClassName="relative h-full min-w-0 shrink-0 basis-full"
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-200/90 bg-white/95 text-emerald-900 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
          aria-label={t("previousImage")}
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-200/90 bg-white/95 text-emerald-900 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
          aria-label={t("nextImage")}
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <div
        className="mt-3 flex flex-wrap items-center justify-center gap-2"
        aria-label={t("slideIndicators")}
      >
        {imagePaths.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-current={i === selectedIndex ? "true" : undefined}
            aria-label={t("goToSlide", { n: i + 1 })}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none ${
              i === selectedIndex
                ? "w-8 bg-emerald-700"
                : "w-2.5 bg-emerald-300/80 hover:bg-emerald-500/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
