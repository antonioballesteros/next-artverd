"use server";

import { randomUUID } from "node:crypto";

import { routing, type AppLocale } from "@/i18n/routing";
import { getResendFromTo } from "@/lib/resendFromTo";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

function parseContactLocale(formData: FormData): AppLocale {
  const raw = String(formData.get("locale") ?? "").trim();
  if (hasLocale(routing.locales, raw)) return raw as AppLocale;
  return routing.defaultLocale as AppLocale;
}

export type ContactFormState = {
  success: boolean;
  error?: string;
};

/** Non-semantic trap name to reduce accidental autofill by browsers/password managers. */
const SPAM_TRAP_FIELD = "__contact_reference_code";
/** Small delay before responding to trap hits (mild cost for automated abuse). */
const SPAM_TRAP_RESPONSE_DELAY_MS = 200;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function submitContactForm(
  _prevState: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
  const spamTrap = String(formData.get(SPAM_TRAP_FIELD) ?? "").trim();
  if (spamTrap.length > 0) {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, SPAM_TRAP_RESPONSE_DELAY_MS);
    });
    // Likely bot: discard without sending email or revealing failure
    return { success: true };
  }

  const name = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("correu") ?? "").trim();
  const message = String(formData.get("missatge") ?? "").trim();

  const locale = parseContactLocale(formData);
  const tErrors = await getTranslations({
    locale,
    namespace: "contacte.errors",
  });

  if (!name || !email || !message) {
    return { success: false, error: tErrors("fillAllFields") };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: tErrors("emailServiceUnavailable"),
    };
  }

  const addresses = getResendFromTo();
  if (!addresses) {
    return {
      success: false,
      error: tErrors("emailServiceUnavailable"),
    };
  }
  const { from, to } = addresses;

  const textBody = [
    "New message from the contact form.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlBody = `
    <div style="background:#f8fafc;padding:24px;font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="padding:18px 20px;background:#f1f5f9;border-bottom:1px solid #e2e8f0;">
          <h1 style="margin:0;font-size:18px;">New contact message</h1>
          <p style="margin:6px 0 0 0;color:#334155;">A user submitted the contact form.</p>
        </div>
        <div style="padding:20px;">
          <h2 style="margin:0 0 10px 0;font-size:15px;">Contact details</h2>
          <p style="margin:4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>

          <h2 style="margin:18px 0 10px 0;font-size:15px;">Message</h2>
          <p style="margin:0;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </p>
        </div>
      </div>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send(
      {
        from,
        to: [to],
        replyTo: email,
        subject: `Contact form: ${name}`,
        text: textBody,
        html: htmlBody,
        tags: [{ name: "source", value: "contact" }],
      },
      { idempotencyKey: `contact/${randomUUID()}` }
    );

    if (error) {
      return {
        success: false,
        error: tErrors("sendFailed"),
      };
    }
  } catch {
    return {
      success: false,
      error: tErrors("sendFailed"),
    };
  }

  return { success: true };
}
