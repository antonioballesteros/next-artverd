import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const redirectTo =
    request.nextUrl.searchParams.get("redirectTo") ?? "/admin/dashboard";
  const callbackUrl = new URL("/admin/auth/callback", request.nextUrl.origin);
  callbackUrl.searchParams.set("redirectTo", redirectTo);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: callbackUrl.toString() },
  });

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    return NextResponse.redirect(new URL(`/login?${params}`, request.url));
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(
    new URL("/login?error=OAuth+failed", request.url)
  );
}
