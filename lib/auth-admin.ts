/**
 * Admin whitelist: only emails in ALLOWED_ADMIN_EMAILS can access the dashboard.
 * Comma-separated list in env, e.g. ALLOWED_ADMIN_EMAILS=admin@example.com,other@example.com
 */

const ALLOWED_ADMIN_EMAILS_KEY = "ALLOWED_ADMIN_EMAILS";

function parseAllowedEmails(): string[] {
  const raw = process.env[ALLOWED_ADMIN_EMAILS_KEY];
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

let cached: string[] | null = null;

/**
 * Returns the list of emails that are allowed admin access (from env).
 * Result is cached for the process.
 */
export function getAllowedAdminEmails(): string[] {
  if (cached === null) {
    cached = parseAllowedEmails();
  }
  return cached;
}

/**
 * Returns true if the given email is in the admin whitelist (case-insensitive).
 */
export function isAllowedAdmin(email: string | undefined | null): boolean {
  if (!email) return false;
  const allowed = getAllowedAdminEmails();
  return allowed.includes(email.trim().toLowerCase());
}
