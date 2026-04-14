import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_AVATAR_HOSTS = [
  "lh3.googleusercontent.com",
  //  "avatars.githubusercontent.com",
  //  "secure.gravatar.com",
] as const;

function isAllowedAvatarUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      ALLOWED_AVATAR_HOSTS.some(
        (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)
      )
    );
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const urlParam = request.nextUrl.searchParams.get("url");

  if (!urlParam) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  const decodedUrl = decodeURIComponent(urlParam);
  if (!isAllowedAvatarUrl(decodedUrl)) {
    return NextResponse.json({ error: "Invalid avatar URL" }, { status: 400 });
  }

  try {
    const res = await fetch(decodedUrl, {
      headers: {
        "User-Agent": "NextBouquetAI-AvatarProxy/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const body = await res.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
