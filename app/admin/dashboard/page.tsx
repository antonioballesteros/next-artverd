import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Florist admin area. Manage your flower catalogue and bouquets.
      </p>
      <div className="mt-1">
        <Button asChild>
          <Link href="/admin/dashboard/flowers">Flower catalogue</Link>
        </Button>
      </div>
      <p className="text-muted-foreground mt-6">
        Configure your admin preferences and workspace settings.
      </p>
      <div className="mt-1">
        <Button asChild>
          <Link href="/admin/dashboard/settings">Settings</Link>
        </Button>
      </div>
    </div>
  );
}
