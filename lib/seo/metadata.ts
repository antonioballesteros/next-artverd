import { routing, type AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://www.artverd.com";
const DEFAULT_OG_IMAGE = "/icon.png";

const OPEN_GRAPH_LOCALE_BY_APP_LOCALE: Record<AppLocale, string> = {
  ca: "ca_ES",
  es: "es_ES",
};

function normalizeBaseUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizePreferredHost(value: string): string {
  try {
    const parsed = new URL(value);

    // Keep a single canonical production host to avoid SEO mismatches.
    if (parsed.hostname === "artverd.com") {
      parsed.hostname = "www.artverd.com";
    }

    return parsed.toString();
  } catch {
    return value;
  }
}

function toHttpsUrlIfDomain(value: string): string {
  if (!value) return value;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    FALLBACK_SITE_URL;
  const normalized = normalizePreferredHost(toHttpsUrlIfDomain(raw));
  const isVercelPreview =
    typeof process.env.VERCEL_ENV === "string" &&
    process.env.VERCEL_ENV !== "production";
  const shouldUseFallbackForPreview =
    isVercelPreview &&
    !process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (shouldUseFallbackForPreview) {
    return normalizeBaseUrl(FALLBACK_SITE_URL);
  }

  return normalizeBaseUrl(normalized);
}

export function getSiteMetadataBase(): URL {
  return new URL(getSiteUrl());
}

function getLocalePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function toAbsoluteUrl(path: string): string {
  return new URL(path, getSiteMetadataBase()).toString();
}

export function getLocalePathByLocale(
  locale: AppLocale,
  localizedPath: Record<AppLocale, string>
): string {
  const localizedSegment = localizedPath[locale];

  if (localizedSegment === "/") {
    return `/${locale}`;
  }

  return `/${locale}${getLocalePath(localizedSegment)}`;
}

export function buildPageMetadata({
  locale,
  title,
  description,
  localizedPath,
  imagePath = DEFAULT_OG_IMAGE,
}: {
  locale: AppLocale;
  title: string;
  description: string;
  localizedPath: Record<AppLocale, string>;
  imagePath?: string;
}): Metadata {
  const canonicalPath = getLocalePathByLocale(locale, localizedPath);
  const caPath = getLocalePathByLocale("ca", localizedPath);
  const esPath = getLocalePathByLocale("es", localizedPath);
  const canonical = toAbsoluteUrl(canonicalPath);
  const caUrl = toAbsoluteUrl(caPath);
  const esUrl = toAbsoluteUrl(esPath);
  const alternateLocale = locale === "ca" ? "es_ES" : "ca_ES";
  const ogLocale = OPEN_GRAPH_LOCALE_BY_APP_LOCALE[locale];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ca: caUrl,
        es: esUrl,
        "x-default": caUrl,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Art Verd",
      title,
      description,
      url: canonical,
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      images: [{ url: imagePath }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: getSiteMetadataBase(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    languages: {
      ca: `/${routing.defaultLocale}`,
      es: "/es",
      "x-default": `/${routing.defaultLocale}`,
    },
  },
};
