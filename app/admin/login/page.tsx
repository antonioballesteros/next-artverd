import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "./actions";

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo, error } = await searchParams;
  const redirectQuery = `?redirectTo=${encodeURIComponent(redirectTo ?? "/admin/dashboard")}`;

  return (
    <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Sign in to access the florist dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="flex flex-col gap-4">
            <Input
              type="hidden"
              name="redirectTo"
              value={redirectTo ?? "/admin/dashboard"}
            />
            {error && (
              <p className="text-destructive text-sm" role="alert">
                {error}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in with email
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card text-muted-foreground px-2">or</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link href={`/admin/auth/google${redirectQuery}`}>
                  Sign in with Google
                </Link>
              </Button>
            </div>
          </form>
          <p className="text-muted-foreground mt-4 text-center text-sm">
            No account? Enable email sign-up in Supabase Auth settings, or ask
            an admin to create one.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
