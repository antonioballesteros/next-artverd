"use server";

import { randomUUID } from "node:crypto";

import { getResendFromTo } from "@/lib/resendFromTo";
import { Resend } from "resend";

export type ContactFormState = {
  success: boolean;
  error?: string;
};

/** Name matches the hidden "website" field; if filled, treat as automated submission. */
const SPAM_TRAP_FIELD = "website";
/** Small delay before responding to trap hits (mild cost for automated abuse). */
const SPAM_TRAP_RESPONSE_DELAY_MS = 200;

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

  if (!name || !email || !message) {
    return { success: false, error: "Omple tots els camps." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "El servei de correu no està disponible en aquest moment.",
    };
  }

  const addresses = getResendFromTo();
  if (!addresses) {
    return {
      success: false,
      error: "El servei de correu no està disponible en aquest moment.",
    };
  }
  const { from, to } = addresses;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: email,
      subject: `Contact form: ${name}`,
      text: [
        "New message from the contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      tags: [{ name: "source", value: "contact" }],
    },
    { idempotencyKey: `contact/${randomUUID()}` }
  );

  if (error) {
    return {
      success: false,
      error: "No s'ha pogut enviar el missatge. Torna-ho a provar més tard.",
    };
  }

  return { success: true };
}
