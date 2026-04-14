import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isAllowedAdmin } from "@/lib/auth-admin";
import { Button } from "@/components/ui/button";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = Boolean(user?.email && isAllowedAdmin(user.email));
  const { message } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 font-sans">
      <p>Next Bouquet AI</p>
      {message === "admin_required" && (
        <p className="text-muted-foreground text-sm">
          You are signed in but do not have access to the dashboard.
        </p>
      )}
      {isAdmin && (
        <>
          <Button asChild>
            <Link href="/admin/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/create-bouquet">Create new bouquet</Link>
          </Button>
        </>
      )}
    </div>
  );
}
