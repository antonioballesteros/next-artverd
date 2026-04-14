"use client";

import { artverdDecorIcons } from "@/lib/artverdAssets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface DecorativeIconRowItem {
  src: string;
  alt: string;
}

const ICONS: DecorativeIconRowItem[] = [
  { src: artverdDecorIcons.iconFlor, alt: "Icona flor decorativa" },
  { src: artverdDecorIcons.iconPlanta1, alt: "Icona planta decorativa" },
  { src: artverdDecorIcons.iconGirasol, alt: "Icona gira-sol decoratiu" },
  { src: artverdDecorIcons.iconPlanta2, alt: "Icona planta decorativa" },
];

export function DecorativeIconRow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex flex-wrap justify-center gap-8 py-5 md:gap-14 md:py-7"
      aria-hidden
    >
      {ICONS.map((item, index) => (
        <div
          key={item.src}
          className={cn(
            "relative h-12 w-12 shrink-0 md:h-28 md:w-28",
            visible
              ? "animate-[decorative-icon-zoom-in-up_0.75s_ease-out_both]"
              : "translate-y-8 scale-90 opacity-0"
          )}
          style={visible ? { animationDelay: `${index * 0.12}s` } : undefined}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="112px"
          />
        </div>
      ))}
    </div>
  );
}
