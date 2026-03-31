"use client";

import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";

interface LocalizedCategoryLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

function categoryHref(href: string): ComponentProps<typeof Link>["href"] {
  if (href === "/botiga") return "/botiga";
  if (href.startsWith("/botiga/")) {
    const slug = href.slice("/botiga/".length);
    if (slug && !slug.includes("/")) {
      return { pathname: "/botiga/[slug]", params: { slug } };
    }
  }
  return href as ComponentProps<typeof Link>["href"];
}

export function LocalizedCategoryLink({
  href,
  className,
  children,
}: LocalizedCategoryLinkProps) {
  return (
    <Link href={categoryHref(href)} className={className}>
      {children}
    </Link>
  );
}
