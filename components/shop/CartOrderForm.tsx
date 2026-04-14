"use client";

import {
  submitCartOrder,
  type CartOrderFormState,
} from "@/app/actions/cartOrder";
import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/navigation";
import { elsie } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/i18n/routing";
import { serializeCartLines } from "@/lib/shop/cartStorage";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

const initialCartOrderState: CartOrderFormState = { success: false };

function CartOrderSubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("botiga.cartOrderPage");
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="min-h-12 w-full rounded-sm bg-emerald-800 px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase shadow-md hover:bg-emerald-900 disabled:opacity-80 sm:w-auto"
    >
      {pending ? t("submitSending") : t("submit")}
    </Button>
  );
}

const labelClass = "mb-2 block text-sm font-medium text-emerald-900";
const fieldClass =
  "w-full rounded border border-emerald-300 bg-white px-3 py-2.5 text-emerald-950 shadow-sm outline-none transition placeholder:text-emerald-800/50 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600";
const textareaClass = `${fieldClass} min-h-28 resize-y`;

const defaultFormClassName =
  "relative mt-8 border-t border-emerald-200/90 pt-8";

interface CartOrderFormProps {
  /** Overrides default form spacing (e.g. on the dedicated checkout page). */
  formClassName?: string;
}

export function CartOrderForm({ formClassName }: CartOrderFormProps) {
  const { lines, clearCart } = useCart();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("botiga.cartOrderPage");
  const router = useRouter();
  const [state, formAction] = useActionState(
    submitCartOrder,
    initialCartOrderState,
  );

  useEffect(() => {
    if (!state.success) return;
    clearCart();
    router.replace({
      pathname: "/botiga/cistella",
      query: { sent: "1" },
    });
  }, [state.success, clearCart, router]);

  return (
    <form
      action={formAction}
      className={cn(defaultFormClassName, formClassName)}
    >
      <Input
        type="hidden"
        name="cart"
        value={serializeCartLines(lines)}
        readOnly
        aria-hidden
      />
      <Input type="hidden" name="locale" value={locale} readOnly aria-hidden />
      <div
        className="pointer-events-none absolute -left-[10000px] top-auto -m-px h-px w-px overflow-hidden border-0 p-0 opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="cart-order-website">Website</label>
        <Input
          id="cart-order-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <h2 className={cn(elsie.className, "text-2xl font-normal text-emerald-950")}>
        {t("contactTitle")}
      </h2>
      <p className="mt-2 text-sm text-emerald-800/85">{t("contactIntro")}</p>

      {state.error ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="mt-6 text-sm text-emerald-800" role="status">
          {t("sentStatus")}
        </p>
      ) : null}
      {!state.success ? (
        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label htmlFor="cart-nom" className={labelClass}>
              {t("nameLabel")} <span className="text-emerald-700">*</span>
            </label>
            <Input
              id="cart-nom"
              name="nom"
              type="text"
              required
              maxLength={120}
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="cart-telefon" className={labelClass}>
              {t("phoneLabel")} <span className="text-emerald-700">*</span>
            </label>
            <Input
              id="cart-telefon"
              name="telefon"
              type="tel"
              required
              maxLength={40}
              autoComplete="tel"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="cart-correu" className={labelClass}>
              {t("emailLabel")} <span className="text-emerald-700">*</span>
            </label>
            <Input
              id="cart-correu"
              name="correu"
              type="email"
              required
              maxLength={320}
              autoComplete="email"
              spellCheck={false}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="cart-observacions" className={labelClass}>
              {t("notesLabel")}
            </label>
            <Textarea
              id="cart-observacions"
              name="observacions"
              rows={4}
              maxLength={4000}
              placeholder={t("notesPlaceholder")}
              className={textareaClass}
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-emerald-800/80">{t("privacyNote")}</p>
            <CartOrderSubmitButton />
          </div>
        </div>
      ) : null}
    </form>
  );
}
