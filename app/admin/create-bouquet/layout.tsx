import Link from "next/link";

export default function CreateBouquetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-card border-b">
        <nav className="container mx-auto flex h-14 items-center gap-6 px-4">
          <Link
            href="/admin"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Admin
          </Link>
          <Link
            href="/admin/create-bouquet"
            className="text-muted-foreground hover:text-foreground text-sm font-medium"
          >
            Create new bouquet
          </Link>
        </nav>
      </header>
      <main className="container mx-auto flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
