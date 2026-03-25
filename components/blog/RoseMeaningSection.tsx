import type { RoseAccent } from "@/lib/blog/elSignificatRosesContent";

interface RoseMeaningSectionProps {
  accent: RoseAccent;
  title: string;
  paragraphs: string[];
  /** Stagger index for entrance animation. */
  animationIndex: number;
}

const ACCENT_STYLES: Record<
  RoseAccent,
  { border: string; title: string; softBg: string }
> = {
  vermella: {
    border: "border-l-red-500",
    title: "text-red-700",
    softBg: "bg-red-50/50",
  },
  blanca: {
    border: "border-l-stone-400",
    title: "text-stone-800",
    softBg: "bg-stone-50/80",
  },
  groga: {
    border: "border-l-amber-500",
    title: "text-amber-800",
    softBg: "bg-amber-50/60",
  },
  taronja: {
    border: "border-l-orange-500",
    title: "text-orange-800",
    softBg: "bg-orange-50/50",
  },
  rosa: {
    border: "border-l-pink-400",
    title: "text-pink-800",
    softBg: "bg-pink-50/50",
  },
  blava: {
    border: "border-l-sky-600",
    title: "text-sky-800",
    softBg: "bg-sky-50/60",
  },
};

export function RoseMeaningSection({
  accent,
  title,
  paragraphs,
  animationIndex,
}: RoseMeaningSectionProps) {
  const styles = ACCENT_STYLES[accent];
  const delayMs = 120 + animationIndex * 75;

  return (
    <section
      className={`rounded-r-xl border-l-4 py-1 pl-5 md:pl-6 ${styles.border} ${styles.softBg} motion-safe:opacity-0 motion-safe:animate-[blog-section-reveal_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:opacity-100 motion-reduce:animate-none`}
      style={{ animationDelay: `${delayMs}ms` }}
      aria-labelledby={`rose-section-${accent}`}
    >
      <h2
        id={`rose-section-${accent}`}
        className={`text-lg font-bold tracking-tight md:text-xl ${styles.title}`}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-emerald-950/90 md:text-base">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
