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
    <div className="container mx-auto flex-1 px-4 py-6">
      {message === "admin_required" && (
        <p className="text-muted-foreground text-sm">
          You are signed in but do not have access to the dashboard.
        </p>
      )}
      {isAdmin && (
        <div>
          <h1 className="text-2xl font-semibold">Admin area</h1>
          <p className="text-muted-foreground mt-2">
            Florist admin area. Manage your flower catalogue and bouquets.
          </p>
          <div className="mt-1">
            <Button asChild>
              <Link href="/admin/dashboard">Dashboard</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-6">Create new bouquets.</p>
          <div className="mt-1">
            <Button asChild>
              <Link href="/admin/create-bouquet">Create new bouquet</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
