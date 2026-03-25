"use client";

import { elsie } from "@/lib/fonts";
import { tallersImages } from "@/lib/tallersAssets";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 6500;
const CROSSFADE_MS = 900;

const SLIDES = [
  {
    image: tallersImages.statementEspai,
    title: "Espai obert per l'expressió",
    body: (
      <>
        Aquest taller és un espai obert per a l&apos;expressió individual i
        l&apos;experimentació.
        <br />
        Et convido a deixar-te portar per la teva intuïció i creativitat mentre
        treballem
        <br />
        junts en el disseny i la creació d&apos;arranjaments florals únics.
      </>
    ),
  },
  {
    image: tallersImages.statementArt,
    title: "Art i bellesa",
    body: (
      <>
        En acabar el taller, no només t&apos;enduràs a casa les teves creacions
        florals, sinó també noves
        <br />
        amistats i una nova perspectiva sobre l&apos;art i la bellesa que ens
        envolta.
      </>
    ),
  },
] as const;

export function TallersStatementSlider() {
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
    if (reduceMotion || SLIDES.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-zinc-900"
      aria-label="Els nostres tallers florals"
      aria-roledescription="carousel"
    >
      <div className="relative aspect-5/3 min-h-[min(52vh,560px)] w-full md:aspect-21/9 md:min-h-[480px]">
        {SLIDES.map((slide, i) => {
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
            key={SLIDES[index].title}
            className="flex max-w-4xl flex-col items-center justify-center md:px-6"
          >
            <p
              className={`${elsie.className} text-center text-[clamp(1.35rem,4vw,2.75rem)] leading-tight font-black tracking-wide drop-shadow-md ${
                reduceMotion
                  ? ""
                  : "animate-[tallers-title-pop_1.1s_ease-out_both]"
              }`}
            >
              {SLIDES[index].title}
            </p>
            <p className="text-md mt-6 max-w-2xl leading-relaxed tracking-wide text-pretty text-white/95 shadow-black/20 drop-shadow-sm md:text-base">
              {SLIDES[index].body}
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto absolute right-0 bottom-5 left-0 z-20 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={String(i)}
            type="button"
            className="h-2.5 w-2.5 rounded-full border border-white/60 transition-[transform,background-color] duration-300 hover:scale-110"
            style={{
              backgroundColor:
                i === index ? "rgb(52 211 153)" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Diapositiva ${i + 1} de ${SLIDES.length}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
