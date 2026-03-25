"use client";

import { artverdImages } from "@/lib/artverdAssets";
import type { BlogPost } from "@/lib/blogPosts";
import Image from "next/image";
import Link from "next/link";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const imageFit = post.imageObjectFit ?? "cover";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200/80 bg-white/90 shadow-sm transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10">
      <Link
        href={post.legacyUrl}
        className="relative block aspect-16/10 overflow-hidden bg-emerald-50/60"
      >
        <Image
          src={post.imageSrc ?? artverdImages.logo}
          alt={post.imageAlt}
          fill
          className={`transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100 ${
            imageFit === "cover" ? "object-cover" : "object-contain p-4"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h2 className="text-xl leading-snug font-semibold text-emerald-950 md:text-2xl">
          <Link
            href={post.legacyUrl}
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
            href={post.legacyUrl}
            className="ml-auto text-sm font-semibold text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline"
          >
            Llegir
          </Link>
        </div>
      </div>
    </article>
  );
}
