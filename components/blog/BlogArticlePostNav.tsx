import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface BlogArticlePostNavProps {
  prevHref?: string;
  prevLabel: string;
  nextHref?: string;
  nextLabel?: string;
}

export function BlogArticlePostNav({
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: BlogArticlePostNavProps) {
  return (
    <nav
      className="border-b border-emerald-100/90 bg-[#f3f3f3]/80 backdrop-blur-sm"
      aria-label="Article navigation"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        {prevHref && (
          <Link
            href={prevHref}
            className="group flex max-w-[min(100%,14rem)] items-center gap-2 text-sm font-medium text-emerald-800 transition-colors hover:text-emerald-950 md:max-w-xs md:text-base"
          >
            <ChevronLeft
              className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              aria-hidden
            />
            <span className="line-clamp-2">{prevLabel}</span>
          </Link>
        )}

        <Link
          href="/blog"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-200/90 bg-white/90 text-emerald-800 shadow-sm transition-[box-shadow,transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md motion-reduce:hover:translate-y-0"
          aria-label="All blog posts"
        >
          <LayoutGrid className="h-5 w-5" aria-hidden />
        </Link>

        {nextHref && (
          <Link
            href={nextHref}
            className="group flex max-w-[min(100%,14rem)] items-center gap-2 text-sm font-medium text-emerald-800 transition-colors hover:text-emerald-950 md:max-w-xs md:text-base"
          >
            <span className="line-clamp-2">{nextLabel}</span>
            <ChevronRight
              className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              aria-hidden
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
