import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const LEGACY_REDIRECTS: Record<string, string> = {
  "/inicio": "/es",
  "/inici": "/ca",
  "/home": "/ca",
  "/blog": "/ca/blog",
  "/es/blog": "/es/blog",
  "/2023/04/22/el-significat-del-color-de-les-roses":
    "/ca/blog/el-significat-del-color-de-les-roses",
  "/2023/04/17/abril-el-mes-de-les-flors": "/ca/blog/abril-el-mes-de-les-flors",
  "/2023/04/17/por-que-elegir-flores-de-art-verd-para-tus-eventos-especiales/":
    "/ca/blog/perque-triar-art-verd-pels-teus-events-especials",
  "/tienda": "/es/tienda",
  "/botiga": "/ca/botiga",
  "/producto/osito-de-peluche/": "/ca/botiga/os-de-peluix",
  "/es/producto/taller-jardines/": "/es/tienda/taller-jardineria",
  "/contacto": "/es/contacto",
  "/contacte": "/ca/contacte",
  "/contact": "/ca/contacte",
  "/es/contact": "/es/contacto",
  "/floristeria": "/ca/floristeria",
  "/escuela-de-flores": "/ca/floristeria",
  "/es/escuela-de-flores": "/es/floristeria",
  "/talleres": "/es/talleres",
  "/tallers": "/ca/tallers",
  "/bodas-y-eventos": "/es/bodas-y-eventos",
  "/casaments-i-events": "/ca/casaments-i-events",
  "/aviso-legal": "/es/legal/aviso-legal",
  "/avis-legal": "/ca/legal/avis-legal",
  "/politica-de-cookies": "/ca/legal/politica-de-cookies",
  "/politica-de-privacidad": "/es/legal/politica-de-privacidad",
  "/politica-de-privacitat": "/ca/legal/politica-de-privacitat",
  "/terminos-y-condiciones": "/es/legal/terminos-y-condiciones",
  "/termes-i-condicions": "/ca/legal/termes-i-condicions",
  "/politica-de-accesibilidad": "/es/legal/politica-de-accesibilidad",
  "/politica-d-accessibilitat": "/ca/legal/politica-d-accessibilitat",
  "/es/aviso-legal": "/es/legal/aviso-legal",
  "/ca/avis-legal": "/ca/legal/avis-legal",
  "/es/politica-de-cookies": "/es/legal/politica-de-cookies",
  "/ca/politica-de-cookies": "/ca/legal/politica-de-cookies",
  "/es/politica-de-privacidad": "/es/legal/politica-de-privacidad",
  "/ca/politica-de-privacitat": "/ca/legal/politica-de-privacitat",
  "/es/terminos-y-condiciones": "/es/legal/terminos-y-condiciones",
  "/ca/termes-i-condicions": "/ca/legal/termes-i-condicions",
  "/es/politica-de-accesibilidad": "/es/legal/politica-de-accesibilidad",
  "/ca/politica-d-accessibilitat": "/ca/legal/politica-d-accessibilitat",
};

function normalizeLegacyPath(pathname: string): string {
  const cleanedPath = pathname.toLowerCase();
  if (cleanedPath.length > 1 && cleanedPath.endsWith("/")) {
    return cleanedPath.slice(0, -1);
  }

  if (cleanedPath.endsWith(".html")) {
    return cleanedPath.slice(0, -5);
  }

  return cleanedPath;
}

function getPatternRedirect(pathname: string): string | null {
  if (pathname.startsWith("/en")) {
    const pathWithoutLocale = pathname.slice("/en".length);
    return `/ca${pathWithoutLocale}`;
  }

  if (pathname.startsWith("/es/producto/")) {
    const slug = pathname.slice("/es/producto/".length);
    return slug ? `/es/tienda/${slug}` : "/es/tienda";
  }

  if (pathname.startsWith("/producto/")) {
    const slug = pathname.slice("/producto/".length);
    return slug ? `/ca/botiga/${slug}` : "/ca/botiga";
  }

  if (
    pathname.startsWith("/es/categoria-producto/") ||
    pathname.startsWith("/es/product-category/")
  ) {
    return "/es/tienda";
  }

  if (
    pathname.startsWith("/categoria-producto/") ||
    pathname.startsWith("/categoria-producte/") ||
    pathname.startsWith("/ca/categoria-producto/") ||
    pathname.startsWith("/product-category/")
  ) {
    return "/ca/botiga";
  }

  if (pathname.startsWith("/es/etiqueta/") || pathname.startsWith("/es/tag/")) {
    return "/es/blog";
  }

  if (pathname.startsWith("/etiqueta/") || pathname.startsWith("/tag/")) {
    return "/ca/blog";
  }

  if (pathname.startsWith("/author/") || pathname.startsWith("/es/author/")) {
    return "/ca/blog";
  }

  return null;
}

export default function proxy(request: NextRequest) {
  const normalizedPath = normalizeLegacyPath(request.nextUrl.pathname);

  if (normalizedPath === "/admin" || normalizedPath.startsWith("/admin/")) {
    return NextResponse.next();
  }

  if (
    normalizedPath === "/es/admin" ||
    normalizedPath.startsWith("/es/admin/")
  ) {
    const redirectUrl = new URL(
      normalizedPath.replace("/es/admin", "/admin"),
      request.url
    );
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (
    normalizedPath === "/ca/admin" ||
    normalizedPath.startsWith("/ca/admin/")
  ) {
    const redirectUrl = new URL(
      normalizedPath.replace("/ca/admin", "/admin"),
      request.url
    );
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl, 308);
  }

  const redirectTo =
    LEGACY_REDIRECTS[normalizedPath] ?? getPatternRedirect(normalizedPath);

  if (redirectTo && redirectTo !== normalizedPath) {
    const redirectUrl = new URL(redirectTo, request.url);
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
