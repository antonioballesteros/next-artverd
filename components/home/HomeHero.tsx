"use client";

import { elsie } from "@/lib/fonts";
import { artverdHeroSlides } from "@/lib/artverdAssets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5500;
const FADE_MS = 1000;

export function HomeHero() {
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
    if (reduceMotion || artverdHeroSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % artverdHeroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      className="relative flex h-dvh min-h-dvh w-full items-center overflow-hidden px-4 pb-16 pt-20 md:pb-24 md:pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden>
        {artverdHeroSlides.map((src, index) => {
          const isActive = index === activeIndex;
          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={index === 0}
              className={`object-cover motion-reduce:transition-none ${
                isActive
                  ? "z-10 opacity-100 motion-reduce:animate-none motion-reduce:scale-100 animate-[hero-bg-zoom_5.2s_ease-out_forwards]"
                  : "z-0 scale-100 opacity-0 motion-reduce:animate-none"
              }`}
              style={
                reduceMotion
                  ? undefined
                  : { transition: `opacity ${FADE_MS}ms ease-in-out` }
              }
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
        <h1
          id="hero-heading"
          className={`${elsie.className} mx-auto mt-3 max-w-3xl text-center font-black text-4xl leading-tight tracking-tight md:text-5xl [paint-order:stroke_fill] [-webkit-text-stroke:0.03em_rgb(15_31_20/0.35)] [text-shadow:0_0.06em_0.12em_rgb(0_0_0/0.45),0_0_0.45em_rgb(0_0_0/0.35),0_0_1em_rgb(0_0_0/0.2)]`}
        >
          Passió per les flors, des de l’any 2000
        </h1>
        <p
          className={`${elsie.className} mt-4 max-w-2xl text-lg text-emerald-50/95 md:text-2xl [text-shadow:0_0.05em_0.1em_rgb(0_0_0/0.4),0_0_0.35em_rgb(0_0_0/0.28)]`}
        >
          Sempre queda perfum a les mans de qui regala flors ArtVerd.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/botiga"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
          >
            Coneix la botiga
          </Link>
          <Link
            href="/contacte"
            className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Contacte
          </Link>
        </div>
      </div>
    </section>
  );
}
