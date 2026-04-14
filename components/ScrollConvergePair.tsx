"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollConvergeOffset = 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

interface ScrollConvergePairProps {
  left: ReactNode;
  right: ReactNode;
  /** Grid / layout wrapper classes (e.g. `mx-auto grid max-w-6xl md:grid-cols-2`). */
  className?: string;
  /** Horizontal offset before the reveal. Default 24 (6rem). */
  offset?: ScrollConvergeOffset;
  /** IntersectionObserver root margin. */
  rootMargin?: string;
  threshold?: number | number[];
  /** If true, stop observing after the first time the block enters view. */
  once?: boolean;
}

const OFFSET_LEFT: Record<ScrollConvergeOffset, string> = {
  4: "-translate-x-4",
  6: "-translate-x-6",
  8: "-translate-x-8",
  10: "-translate-x-10",
  12: "-translate-x-12",
  16: "-translate-x-16",
  20: "-translate-x-20",
  24: "-translate-x-24",
  32: "-translate-x-32",
};

const OFFSET_RIGHT: Record<ScrollConvergeOffset, string> = {
  4: "translate-x-4",
  6: "translate-x-6",
  8: "translate-x-8",
  10: "translate-x-10",
  12: "translate-x-12",
  16: "translate-x-16",
  20: "translate-x-20",
  24: "translate-x-24",
  32: "translate-x-32",
};

export function ScrollConvergePair({
  left,
  right,
  className,
  offset = 24,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
  once = true,
}: ScrollConvergePairProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          if (once) return;
          setVisible(false);
          return;
        }
        setVisible(true);
        if (once) obs.disconnect();
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin, threshold]);

  const offsetLeft = OFFSET_LEFT[offset];
  const offsetRight = OFFSET_RIGHT[offset];

  const panelBase =
    "motion-reduce:translate-x-0 max-md:translate-x-0 transition-transform duration-1000 ease-out will-change-transform";

  return (
    <div ref={rootRef} className={className}>
      <div
        className={cn(panelBase, visible ? "translate-x-0" : offsetLeft)}
      >
        {left}
      </div>
      <div
        className={cn(panelBase, visible ? "translate-x-0" : offsetRight)}
      >
        {right}
      </div>
    </div>
  );
}
