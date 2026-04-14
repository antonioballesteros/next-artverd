"use client";

import { artverdSignature, elsie } from "@/lib/fonts";
import { artverdHeroSlides } from "@/lib/artverdAssets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5500;
const FADE_MS = 1000;
/** Hero headline crossfade (ms); slightly softer than an instant swap. */
const HEADLINE_FADE_MS = 900;

export function HomeHero() {
  const t = useTranslations("home.hero");
  const heroHeadlines = [t("headline0"), t("headline1")];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (artverdHeroSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % artverdHeroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const headlineIndex = activeIndex % heroHeadlines.length;

  return (
    <section
      className="relative flex h-dvh min-h-dvh w-full items-center overflow-hidden px-4 pt-20 pb-16 md:pt-24 md:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden>
        {artverdHeroSlides.map((src, index) => {
          const isActive = index === activeIndex;
          const zoomIn = index % 2 === 0;
          const activeZoomClass = zoomIn
            ? "animate-[hero-bg-zoom-in_5.2s_ease-out_forwards]"
            : "animate-[hero-bg-zoom-out_5.2s_ease-out_forwards]";
          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={index === 0}
              className={cn(
                "object-cover",
                isActive ? "z-10 opacity-100" : "z-0 scale-100 opacity-0",
                isActive && activeZoomClass
              )}
              style={{ transition: `opacity ${FADE_MS}ms ease-in-out` }}
              sizes="100vw"
            />
          );
        })}
      </div>
      <div
        className="absolute inset-0 z-1 bg-linear-to-r from-emerald-950/92 via-emerald-900/78 to-emerald-800/35"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl text-white">
        <div className="relative mx-auto mt-3 w-full max-w-3xl px-6 md:px-12">
          <span
            className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 font-serif text-6xl leading-none text-white/25 select-none md:text-8xl"
            aria-hidden
          >
            “
          </span>
          <span
            className="pointer-events-none absolute top-1/2 right-0 z-0 -translate-y-1/2 font-serif text-6xl leading-none text-white/25 select-none md:text-8xl"
            aria-hidden
          >
            ”
          </span>
          <h1
            id="hero-heading"
            className={`${elsie.className} relative z-10 mx-auto grid max-w-2xl grid-cols-1 text-4xl leading-snug font-normal tracking-wide italic [-webkit-text-stroke:0.02em_rgb(15_31_20/0.28)] [paint-order:stroke_fill] [text-shadow:0_0.06em_0.12em_rgb(0_0_0/0.45),0_0_0.45em_rgb(0_0_0/0.35),0_0_1em_rgb(0_0_0/0.2)] md:max-w-3xl md:text-5xl`}
          >
            {heroHeadlines.map((line, i) => {
              const isActive = headlineIndex === i;
              return (
                <span
                  key={line}
                  className="col-start-1 row-start-1 w-full text-center transition-opacity ease-in-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 1 : 0,
                    transitionDuration: `${HEADLINE_FADE_MS}ms`,
                  }}
                  aria-hidden={!isActive}
                >
                  {line}
                </span>
              );
            })}
          </h1>
          <p
            className={`${artverdSignature.className} relative z-10 mt-8 max-w-2xl border-t border-white/25 pt-5 text-right text-3xl text-emerald-50/95 [text-shadow:0_0.04em_0.1em_rgb(0_0_0/0.35)] md:mt-9 md:max-w-3xl md:text-4xl`}
          >
            Art Verd
          </p>
        </div>
      </div>
    </section>
  );
}
