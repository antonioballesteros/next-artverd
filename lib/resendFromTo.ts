/** Resend sandbox: test-only sender (no verified domain required). */
const RESEND_TEST_FROM = "Art Verd <onboarding@resend.dev>";
const RESEND_TEST_TO = "delivered@resend.dev";

export function isResendTestMode(): boolean {
  const v = process.env.RESEND_TEST_MODE;
  return v === "1" || v === "true";
}

/**
 * Resolves Resend `from` / `to` for transactional email.
 * In test mode uses sandbox addresses; otherwise `RESEND_FROM` and `RESEND_TO`.
 * Returns null when production env vars are missing or empty.
 */
export function getResendFromTo(): { from: string; to: string } | null {
  if (isResendTestMode()) {
    return { from: RESEND_TEST_FROM, to: RESEND_TEST_TO };
  }
  const from = process.env.RESEND_FROM ?? "";
  const to = process.env.RESEND_TO ?? "";
  if (!from || !to) {
    return null;
  }
  return { from, to };
}
