"use client";

import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

interface BlogArticlePostNavProps {
  prevSlug?: string;
  prevLabel?: string;
  nextSlug?: string;
  nextLabel?: string;
  ariaLabel: string;
  allPostsAriaLabel: string;
}

function blogPostHref(slug: string) {
  return { pathname: "/blog/[slug]" as const, params: { slug } };
}

export function BlogArticlePostNav({
  prevSlug,
  prevLabel,
  nextSlug,
  nextLabel,
  ariaLabel,
  allPostsAriaLabel,
}: BlogArticlePostNavProps) {
  return (
    <nav
      className="border-b border-emerald-100/90 bg-[#f3f3f3]/80 backdrop-blur-sm"
      aria-label={ariaLabel}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        {prevSlug && prevLabel ? (
          <Link
            href={blogPostHref(prevSlug)}
            className="group flex max-w-[min(100%,14rem)] items-center gap-2 text-sm font-medium text-emerald-800 transition-colors hover:text-emerald-950 md:max-w-xs md:text-base"
          >
            <ChevronLeft
              className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
              aria-hidden
            />
            <span className="line-clamp-2">{prevLabel}</span>
          </Link>
        ) : (
          <span className="max-w-[min(100%,14rem)] md:max-w-xs" aria-hidden />
        )}

        <Link
          href="/blog"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-200/90 bg-white/90 text-emerald-800 shadow-sm transition-[box-shadow,transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
          aria-label={allPostsAriaLabel}
        >
          <LayoutGrid className="h-5 w-5" aria-hidden />
        </Link>

        {nextSlug && nextLabel ? (
          <Link
            href={blogPostHref(nextSlug)}
            className="group flex max-w-[min(100%,14rem)] items-center gap-2 text-sm font-medium text-emerald-800 transition-colors hover:text-emerald-950 md:max-w-xs md:text-base"
          >
            <span className="line-clamp-2">{nextLabel}</span>
            <ChevronRight
              className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ) : (
          <span className="max-w-[min(100%,14rem)] md:max-w-xs" aria-hidden />
        )}
      </div>
    </nav>
  );
}
