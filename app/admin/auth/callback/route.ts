import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAllowedAdmin } from "@/lib/auth-admin";

/**
 * Origin for post-OAuth redirects. Local dev must keep the browser's actual
 * scheme (http://localhost) — some proxies set x-forwarded-host without TLS,
 * and forcing https breaks plain localhost.
 */
function getRedirectOrigin(request: Request): string {
  const url = new URL(request.url);
  const host = url.hostname;
  const isLocalDev =
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedHost) {
    const proto = isLocalDev
      ? "http"
      : (request.headers.get("x-forwarded-proto") ?? "https");
    return `${proto}://${forwardedHost}`;
  }

  return url.origin;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") ?? "/admin/dashboard";

  const next = redirectTo.startsWith("/") ? redirectTo : "/admin/dashboard";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=Missing+code", request.url)
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    return NextResponse.redirect(new URL(`/login?${params}`, request.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const origin = getRedirectOrigin(request);

  if (!user?.email || !isAllowedAdmin(user.email)) {
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
