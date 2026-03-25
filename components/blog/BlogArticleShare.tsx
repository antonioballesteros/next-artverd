"use client";

import { Link2 } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogArticleShareProps {
  shareTitle: string;
}

export function BlogArticleShare({ shareTitle }: BlogArticleShareProps) {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(pageUrl || "");
  const encodedText = encodeURIComponent(`${shareTitle} — Art Verd`);

  const links =
    pageUrl === ""
      ? []
      : [
          {
            label: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          },
          {
            label: "X",
            href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
          },
          {
            label: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          },
          {
            label: "Pinterest",
            href: `https://pinterest.com/pin/find/?url=${encodedUrl}`,
          },
        ];

  return (
    <div className="mt-14 border-t border-emerald-100/90 pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/70">
        Share
      </p>
      <ul className="mt-4 flex flex-wrap gap-2 motion-safe:animate-[blog-section-reveal_0.55s_ease-out_both] motion-reduce:animate-none">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200/90 bg-white/95 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-emerald-50/90 hover:shadow-md motion-reduce:hover:translate-y-0"
            >
              <Link2 className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
