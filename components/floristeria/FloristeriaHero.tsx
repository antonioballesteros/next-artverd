"use client";

import { floristeriaHeroSlides } from "@/lib/floristeriaAssets";
import { elsie } from "@/lib/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5200;
const FADE_MS = 900;

export function FloristeriaHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || floristeriaHeroSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % floristeriaHeroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (i) =>
        (i - 1 + floristeriaHeroSlides.length) % floristeriaHeroSlides.length
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % floristeriaHeroSlides.length);
  }, []);

  return (
    <section
      className="relative flex min-h-[min(100dvh,720px)] w-full items-stretch overflow-hidden bg-black pb-6 md:min-h-[min(100dvh,780px)] md:pb-10"
      aria-labelledby="floristeria-hero-heading"
    >
      <div className="relative flex min-h-[min(60vh,600px)] w-full flex-1 md:min-h-[520px]">
        {/* Vertical thumbnails — mirrors legacy Gyges strip (desktop). */}
        <div
          className="relative z-20 hidden w-[76px] shrink-0 flex-col justify-center gap-1.5 border-r border-white/10 bg-black/40 px-2 py-6 backdrop-blur-sm lg:flex"
          aria-label="Galeria d’imatges"
        >
          {floristeriaHeroSlides.map((src, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border-2 transition-[border-color,box-shadow] duration-300 ${
                  selected
                    ? "border-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)] ring-2 ring-emerald-400/90"
                    : "border-zinc-800 opacity-80 hover:border-zinc-500 hover:opacity-100"
                }`}
                aria-label={`Mostrar foto ${index + 1} de ${floristeriaHeroSlides.length}`}
                aria-current={selected ? "true" : undefined}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[min(55vh,560px)] flex-1">
          <div className="absolute inset-0" aria-hidden>
            {floristeriaHeroSlides.map((src, index) => {
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
                  className={`object-cover motion-reduce:transition-none ${
                    isActive
                      ? `z-10 ${activeZoomClass} opacity-100 motion-reduce:scale-100 motion-reduce:animate-none`
                      : "z-0 scale-100 opacity-0 motion-reduce:animate-none"
                  }`}
                  style={
                    reduceMotion
                      ? undefined
                      : { transition: `opacity ${FADE_MS}ms ease-in-out` }
                  }
                  sizes="(max-width: 1024px) 100vw, calc(100vw - 76px)"
                />
              );
            })}
          </div>

          <div
            className="absolute inset-0 z-5 bg-linear-to-t from-emerald-950/75 via-emerald-950/25 to-transparent"
            aria-hidden
          />

          <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-10 md:px-10 md:pb-14">
            <p
              className={`${elsie.className} max-w-3xl text-3xl leading-tight font-normal tracking-wide text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-4xl lg:text-5xl`}
              id="floristeria-hero-heading"
            >
              La teva floristeria a Terrassa
            </p>
            <p className="mt-3 max-w-xl text-sm text-emerald-50/95 md:text-base">
              Carrer Cardaire, 11 · Terrassa
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2 lg:hidden">
            {floristeriaHeroSlides.map((src, index) => (
              <button
                key={src}
                type="button"
                className="pointer-events-auto h-2.5 w-2.5 rounded-full border border-white/50 transition-[transform,background-color] duration-300 hover:scale-110"
                style={{
                  backgroundColor:
                    index === activeIndex
                      ? "rgb(52 211 153)"
                      : "rgba(255,255,255,0.35)",
                }}
                onClick={() => setActiveIndex(index)}
                aria-label={`Foto ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>

          <div className="absolute top-1/2 left-2 z-20 -translate-y-1/2 md:left-4 lg:left-6">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label="Imatge anterior"
            >
              <ChevronLeft className="h-7 w-7" aria-hidden strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute top-1/2 right-2 z-20 -translate-y-1/2 md:right-4 lg:right-6">
            <button
              type="button"
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label="Imatge següent"
            >
              <ChevronRight className="h-7 w-7" aria-hidden strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
