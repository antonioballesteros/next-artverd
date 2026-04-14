import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-card border-b">
        <nav className="container mx-auto flex h-14 items-center gap-6 px-4">
          <Link
            href="/admin/dashboard"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/dashboard/flowers"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Flower catalogue
          </Link>
          <Link
            href="/admin/dashboard/settings"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Settings
          </Link>
        </nav>
      </header>
      <main className="container mx-auto flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
