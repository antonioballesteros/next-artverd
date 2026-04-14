"use client";

import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contactForm";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialContactState: ContactFormState = { success: false };

function ContactSubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("contacte.form");
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="min-h-12 rounded-full bg-[#67aa25] px-10 py-3 text-sm font-bold tracking-wide text-white shadow-sm hover:bg-[#5e9b21] disabled:cursor-not-allowed disabled:opacity-80"
    >
      {pending ? t("submitting") : t("submit")}
    </Button>
  );
}

const fieldClass =
  "border border-[#ebebeb] bg-[rgba(244,249,240,1)] px-5 py-3 text-[#0f1f14] shadow-none outline-none transition placeholder:text-emerald-900/70 focus:border-[#d5e5ee] focus:text-[#63a71f]";
const inputClass = `w-full rounded-full ${fieldClass}`;
const textareaClass = `w-full min-h-36 resize-y rounded-3xl ${fieldClass}`;
export function ContactMessageForm() {
  const t = useTranslations("contacte.form");
  const locale = useLocale() as AppLocale;
  const [state, formAction] = useActionState(
    submitContactForm,
    initialContactState,
  );

  return (
    <form action={formAction} className="relative flex flex-col gap-6">
      <input type="hidden" name="locale" value={locale} readOnly aria-hidden />
      {/* Anti-spam trap field: must stay empty */}
      <div
        className="pointer-events-none absolute -left-[10000px] top-auto -m-px h-px w-px overflow-hidden border-0 p-0 opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">{t("honeypotLabel")}</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {state.error ? (
        <p
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p
          className="rounded-2xl border border-[#67aa25]/40 bg-[#f4f9f0] px-4 py-3 text-sm text-[#0f1f14]"
          role="status"
        >
          {t("success")}
        </p>
      ) : null}
      <div
        className="motion-safe:animate-[decorative-icon-zoom-in-up_0.85s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationDelay: "80ms", animationFillMode: "forwards" }}
      >
        <label
          htmlFor="contact-nom"
          className="mb-2 block text-sm font-medium text-emerald-900"
        >
          {t("nameLabel")} <span className="text-[#67aa25]">*</span>
        </label>
        <input
          id="contact-nom"
          name="nom"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
        />
      </div>
      <div
        className="motion-safe:animate-[decorative-icon-zoom-in-up_0.85s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationDelay: "140ms", animationFillMode: "forwards" }}
      >
        <label
          htmlFor="contact-correu"
          className="mb-2 block text-sm font-medium text-emerald-900"
        >
          {t("emailLabel")} <span className="text-[#67aa25]">*</span>
        </label>
        <input
          id="contact-correu"
          name="correu"
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          className={inputClass}
        />
      </div>
      <div
        className="motion-safe:animate-[decorative-icon-zoom-in-up_0.85s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
      >
        <label
          htmlFor="contact-missatge"
          className="mb-2 block text-sm font-medium text-emerald-900"
        >
          {t("messageLabel")} <span className="text-[#67aa25]">*</span>
        </label>
        <textarea
          id="contact-missatge"
          name="missatge"
          required
          rows={6}
          className={textareaClass}
        />
      </div>
      <div
        className="motion-safe:animate-[decorative-icon-zoom-in-up_0.85s_ease-out_both] motion-safe:opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
        style={{ animationDelay: "260ms", animationFillMode: "forwards" }}
      >
        <ContactSubmitButton />
      </div>
    </form>
  );
}
