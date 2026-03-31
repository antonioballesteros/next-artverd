"use client";

import {
  submitCartOrder,
  type CartOrderFormState,
} from "@/app/actions/cartOrder";
import { useCart } from "@/components/shop/CartProvider";
import { useRouter } from "@/i18n/navigation";
import { elsie } from "@/lib/fonts";
import type { AppLocale } from "@/i18n/routing";
import { serializeCartLines } from "@/lib/shop/cartStorage";
import { useLocale } from "next-intl";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

const initialCartOrderState: CartOrderFormState = { success: false };

function CartOrderSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-emerald-800 px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase shadow-md transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
    >
      {pending ? "S'està enviant…" : "Enviar sol·licitud"}
    </button>
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
      className={formClassName ?? defaultFormClassName}
    >
      <input
        type="hidden"
        name="cart"
        value={serializeCartLines(lines)}
        readOnly
        aria-hidden
      />
      <input type="hidden" name="locale" value={locale} readOnly aria-hidden />
      <div
        className="pointer-events-none absolute -left-[10000px] top-auto m-[-1px] h-px w-px overflow-hidden border-0 p-0 opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="cart-order-website">Website</label>
        <input
          id="cart-order-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <h2
        className={`${elsie.className} text-2xl font-normal text-emerald-950`}
      >
        Dades de contacte
      </h2>
      <p className="mt-2 text-sm text-emerald-800/85">
        Envia la teva cistella per correu. Et respondrem per confirmar la
        comanda i les opcions de pagament o recollida.
      </p>

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
          S&apos;ha enviat la sol·licitud…
        </p>
      ) : null}
      {!state.success ? (
        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label htmlFor="cart-nom" className={labelClass}>
              Nom <span className="text-emerald-700">*</span>
            </label>
            <input
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
              Telèfon <span className="text-emerald-700">*</span>
            </label>
            <input
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
              Correu electrònic <span className="text-emerald-700">*</span>
            </label>
            <input
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
              Observacions
            </label>
            <textarea
              id="cart-observacions"
              name="observacions"
              rows={4}
              maxLength={4000}
              placeholder="Horari preferit, dedicatòria, al·lèrgies, etc."
              className={textareaClass}
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-emerald-800/80">
              En enviar el formulari acceptes que tractem aquestes dades per
              gestionar la teva sol·licitud.
            </p>
            <CartOrderSubmitButton />
          </div>
        </div>
      ) : null}
    </form>
  );
}
