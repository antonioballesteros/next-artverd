"use client";

import { floristeriaHeroSlides } from "@/lib/floristeriaAssets";
import { elsie } from "@/lib/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectCoverflow, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const SLIDE_INTERVAL_MS = 2000;

interface CoverflowSlideCardProps {
  src: string;
  index: number;
  onImagePainted?: () => void;
}

function CoverflowSlideCard(props: CoverflowSlideCardProps) {
  const { src, index, onImagePainted } = props;
  const { isActive } = useSwiperSlide();

  return (
    <div
      className={`relative aspect-3/4 w-full overflow-hidden rounded-2xl border border-emerald-900/12 bg-white shadow-[0_20px_50px_-12px_rgba(15,80,50,0.18)] transition-[opacity,box-shadow] duration-300 ${
        isActive
          ? "opacity-100 ring-2 ring-emerald-500/55 ring-offset-2 ring-offset-[#faf9f6]"
          : "opacity-[0.48]"
      }`}
      style={
        isActive
          ? {
              WebkitBoxReflect:
                "below 2px linear-gradient(transparent, rgba(0,0,0,0.22))",
            }
          : undefined
      }
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 78vw, 340px"
        priority={index === 0}
        draggable={false}
        onLoadingComplete={onImagePainted}
      />
      {isActive ? (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/20"
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-black/35"
          aria-hidden
        />
      )}
    </div>
  );
}

export function FloristeriaHero() {
  const swiperRef = useRef<SwiperType | null>(null);
  const imagePaintDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const [coverflowReady, setCoverflowReady] = useState(false);
  const [autoplayReverse, setAutoplayReverse] = useState(false);

  const scheduleSwiperLayoutUpdate = useCallback(() => {
    if (imagePaintDebounceRef.current) {
      clearTimeout(imagePaintDebounceRef.current);
    }
    imagePaintDebounceRef.current = setTimeout(() => {
      imagePaintDebounceRef.current = null;
      const swiper = swiperRef.current;
      if (!swiper || swiper.destroyed) return;
      swiper.update();
    }, 32);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (imagePaintDebounceRef.current) {
        clearTimeout(imagePaintDebounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;
    const ap = swiper.params.autoplay;
    if (typeof ap !== "object" || !ap) return;
    ap.reverseDirection = autoplayReverse;
    if (reduceMotion) return;
    if (swiper.autoplay?.running && !swiper.autoplay.paused) {
      swiper.autoplay.stop();
      swiper.autoplay.start();
    }
  }, [autoplayReverse, reduceMotion]);

  return (
    <section
      className="relative w-full overflow-x-clip bg-linear-to-b from-emerald-50/95 via-emerald-50/80 to-[#faf9f6] pb-8 md:pb-12"
      aria-labelledby="floristeria-hero-heading"
    >
      <div className="relative mx-auto max-w-[1500px] px-3 pt-6 md:px-6 md:pt-10">
        <div
          className={`relative overflow-x-clip py-4 transition-opacity duration-200 md:py-8 ${
            coverflowReady ? "opacity-100" : "pointer-events-none opacity-0"
          } ${reduceMotion ? "duration-0" : ""}`}
        >
          <Swiper
            className="floristeria-coverflow overflow-visible!"
            modules={[EffectCoverflow, Autoplay, Keyboard]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop={floristeriaHeroSlides.length > 2}
            speed={reduceMotion ? 0 : 550}
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: SLIDE_INTERVAL_MS,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: autoplayReverse,
                  }
            }
            keyboard={{ enabled: true }}
            coverflowEffect={{
              rotate: 40,
              stretch: -8,
              depth: 168,
              modifier: 1,
              slideShadows: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              const reveal = () => {
                if (swiper.destroyed) return;
                swiper.update();
                setCoverflowReady(true);
              };
              requestAnimationFrame(() => {
                requestAnimationFrame(reveal);
              });
            }}
            onSlideNextTransitionEnd={() => {
              setAutoplayReverse(false);
            }}
            onSlidePrevTransitionEnd={() => {
              setAutoplayReverse(true);
            }}
          >
            {floristeriaHeroSlides.map((src, index) => (
              <SwiperSlide
                key={src}
                className="w-[min(78vw,280px)]! sm:w-[min(72vw,300px)]! md:w-[320px]! lg:w-[340px]!"
              >
                <CoverflowSlideCard
                  src={src}
                  index={index}
                  onImagePainted={scheduleSwiperLayoutUpdate}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-14 items-center md:left-1 md:w-16">
            <button
              type="button"
              onClick={() => {
                setAutoplayReverse(true);
                swiperRef.current?.slidePrev();
              }}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-emerald-800/20 bg-white/90 text-emerald-950 shadow-md backdrop-blur-sm transition hover:bg-white md:h-12 md:w-12"
              aria-label="Previous image"
            >
              <ChevronLeft
                className="h-7 w-7 md:h-8 md:w-8"
                aria-hidden
                strokeWidth={1.5}
              />
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end md:right-1 md:w-16">
            <button
              type="button"
              onClick={() => {
                setAutoplayReverse(false);
                swiperRef.current?.slideNext();
              }}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-emerald-800/20 bg-white/90 text-emerald-950 shadow-md backdrop-blur-sm transition hover:bg-white md:h-12 md:w-12"
              aria-label="Next image"
            >
              <ChevronRight
                className="h-7 w-7 md:h-8 md:w-8"
                aria-hidden
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-2 pb-2 text-center md:px-4">
          <p
            className={`${elsie.className} text-3xl leading-tight font-normal tracking-wide text-emerald-950 md:text-4xl lg:text-5xl`}
            id="floristeria-hero-heading"
          >
            La teva floristeria a Terrassa
          </p>
          <p className="mt-3 text-sm text-emerald-800/90 md:text-base">
            Carrer Cardaire, 11 · Terrassa
          </p>
        </div>
      </div>
    </section>
  );
}
