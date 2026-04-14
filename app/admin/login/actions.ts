"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isAllowedAdmin } from "@/lib/auth-admin";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect(
      "/login?error=" + encodeURIComponent("Email and password are required.")
    );
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const redirectTo = formData.get("redirectTo") as string | null;
    const params = new URLSearchParams({ error: error.message });
    if (redirectTo) params.set("redirectTo", redirectTo);
    redirect(`/login?${params.toString()}`);
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  if (isAllowedAdmin(email)) {
    redirect(redirectTo ?? "/admin/dashboard");
  }
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
