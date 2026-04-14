"use client";

import { elsie } from "@/lib/fonts";
import { tallersImages } from "@/lib/tallersAssets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

const SLIDE_INTERVAL_MS = 6500;
const CROSSFADE_MS = 900;

const SLIDE_IMAGES = [tallersImages.statementEspai, tallersImages.statementArt] as const;

export function TallersStatementSlider() {
  const t = useTranslations("tallers.statementSlider");
  const slides = useMemo(
    () =>
      [
        {
          image: SLIDE_IMAGES[0],
          title: t("slide0.title"),
          body: t("slide0.body"),
        },
        {
          image: SLIDE_IMAGES[1],
          title: t("slide1.title"),
          body: t("slide1.body"),
        },
      ] as const,
    [t]
  );

  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, slides.length]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-zinc-900"
      aria-label={t("sectionAriaLabel")}
      aria-roledescription="carousel"
    >
      <div className="relative aspect-5/3 min-h-[min(52vh,560px)] w-full md:aspect-21/9 md:min-h-[480px]">
        {slides.map((slide, i) => {
          const active = i === index;
          const zoomIn = i % 2 === 0;
          const activeZoomClass = zoomIn
            ? "animate-[hero-bg-zoom-in_5.2s_ease-out_forwards]"
            : "animate-[hero-bg-zoom-out_5.2s_ease-out_forwards]";
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                active ? "z-1 opacity-100" : "z-0 opacity-0"
              }`}
              style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
              aria-hidden={!active}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                className={`object-cover object-center motion-reduce:transition-none ${
                  active
                    ? `motion-reduce:scale-100 motion-reduce:animate-none ${
                        reduceMotion ? "" : activeZoomClass
                      }`
                    : "scale-100 motion-reduce:animate-none"
                }`}
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/40" aria-hidden />
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-white">
          <div
            key={slides[index].title}
            className="flex max-w-4xl flex-col items-center justify-center md:px-6"
          >
            <p
              className={`${elsie.className} text-center text-[clamp(1.35rem,4vw,2.75rem)] leading-tight font-black tracking-wide drop-shadow-md ${
                reduceMotion
                  ? ""
                  : "animate-[tallers-title-pop_1.1s_ease-out_both]"
              }`}
            >
              {slides[index].title}
            </p>
            <p className="text-md mt-6 max-w-2xl whitespace-pre-line leading-relaxed tracking-wide text-pretty text-white/95 shadow-black/20 drop-shadow-sm md:text-base">
              {slides[index].body}
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto absolute right-0 bottom-5 left-0 z-20 flex justify-center gap-2">
        {slides.map((_, i) => (
          <Button
            key={String(i)}
            type="button"
            variant="ghost"
            size="icon-xs"
            className="size-2.5 rounded-full border border-white/60 transition-[transform,background-color] duration-300 hover:scale-110"
            style={{
              backgroundColor:
                i === index ? "rgb(52 211 153)" : "rgba(255,255,255,0.35)",
            }}
            aria-label={t("slideLabel", {
              current: i + 1,
              total: slides.length,
            })}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
