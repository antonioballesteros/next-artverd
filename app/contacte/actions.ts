"use server";

import { randomUUID } from "node:crypto";

import { Resend } from "resend";

/** Resend sandbox: test-only sender (no verified domain required). */
const RESEND_TEST_FROM = "Art Verd <onboarding@resend.dev>";
/** Resend sandbox: simulates successful delivery to inbox. */
const RESEND_TEST_TO = "delivered@resend.dev";

function isResendTestMode(): boolean {
  const v = process.env.RESEND_TEST_MODE;
  return v === "1" || v === "true";
}

export type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
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

  let from: string;
  let to: string;

  console.log("isResendTestMode()", isResendTestMode());

  console.log("process.env.RESEND_FROM", process.env.RESEND_FROM);
  console.log(
    "process.env.CONTACT_INBOX_EMAIL",
    process.env.CONTACT_INBOX_EMAIL
  );
  console.log("RESEND_TEST_FROM", RESEND_TEST_FROM);
  console.log("RESEND_TEST_TO", RESEND_TEST_TO);
  console.log("apiKey", apiKey);
  console.log("email", { name, email, message });

  if (isResendTestMode()) {
    from = process.env.RESEND_FROM ?? RESEND_TEST_FROM;
    to = process.env.CONTACT_INBOX_EMAIL ?? RESEND_TEST_TO;
  } else {
    const productionFrom = process.env.RESEND_FROM;
    const productionTo = process.env.CONTACT_INBOX_EMAIL;
    if (!productionFrom || !productionTo) {
      return {
        success: false,
        error: "El servei de correu no està disponible en aquest moment.",
      };
    }
    from = productionFrom;
    to = productionTo;
  }

  console.log("from", { from, to, apiKey });

  const resend = new Resend(apiKey);

  const result = await resend.emails.send(
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

  if (result.error) {
    console.log("result.error", result);
    return {
      success: false,
      error: "No s'ha pogut enviar el missatge. Torna-ho a provar més tard.",
    };
  }

  return { success: true };
}
