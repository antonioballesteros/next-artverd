"use client";

import { artverdImages } from "@/lib/artverdAssets";
import type { BlogPostListItem } from "@/lib/blogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BlogPostCardProps {
  post: BlogPostListItem;
  readMoreLabel: string;
}

export function BlogPostCard({ post, readMoreLabel }: BlogPostCardProps) {
  const imageFit = post.imageObjectFit ?? "cover";
  const postHref = {
    pathname: "/blog/[slug]" as const,
    params: { slug: post.slug },
  };

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/90 py-0 shadow-sm transition-shadow duration-300 hover:shadow-md hover:shadow-emerald-900/10">
      <Link
        href={postHref}
        className="relative block aspect-16/10 overflow-hidden bg-emerald-50/60"
      >
        <Image
          src={post.imageSrc ?? artverdImages.logo}
          alt={post.imageAlt}
          fill
          className={cn(
            "transition duration-700 ease-out group-hover:scale-[1.03]",
            imageFit === "cover" ? "object-cover" : "object-contain p-4"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <CardContent className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h2 className="text-xl leading-snug font-semibold text-emerald-950 md:text-2xl">
          <Link
            href={postHref}
            className="transition-colors hover:text-emerald-700"
          >
            {post.title}
          </Link>
        </h2>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-emerald-900/85 md:text-base">
          {post.excerpt}
        </p>

        <div className="flex border-t border-emerald-100/90 pt-4">
          <Link
            href={postHref}
            className="ml-auto text-sm font-semibold text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline"
          >
            {readMoreLabel}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
