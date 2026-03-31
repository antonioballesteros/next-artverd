"use server";

import { randomUUID } from "node:crypto";

import { routing, type AppLocale } from "@/i18n/routing";
import { parseCartLines, type CartLine } from "@/lib/shop/cartStorage";
import { formatEur } from "@/lib/shop/formatEur";
import {
  getCartStorageSlug,
  getLineUnitPriceEur,
  getProductBySlug,
  getProductName,
  getVariantLabel,
} from "@/lib/shop/products";
import { hasLocale } from "next-intl";
import { getResendFromTo } from "@/lib/resendFromTo";
import { Resend } from "resend";

const SPAM_TRAP_FIELD = "website";
const SPAM_TRAP_RESPONSE_DELAY_MS = 200;

const MAX_OBSERVATIONS_LENGTH = 4000;
const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 40;

export type CartOrderFormState = {
  success: boolean;
  error?: string;
};

interface ResolvedLine {
  productName: string;
  slug: string;
  quantity: number;
  variantLabel?: string;
  unitEur: number;
  lineTotalEur: number;
}

function parseOrderLocale(formData: FormData): AppLocale {
  const raw = String(formData.get("locale") ?? "").trim();
  if (hasLocale(routing.locales, raw)) return raw as AppLocale;
  return routing.defaultLocale as AppLocale;
}

function resolveOrderLines(
  lines: CartLine[],
  locale: AppLocale
):
  | { ok: true; resolved: ResolvedLine[]; totalEur: number }
  | { ok: false; error: string } {
  if (lines.length === 0) {
    return { ok: false, error: "La cistella és buida." };
  }
  if (lines.length > 80) {
    return { ok: false, error: "La cistella té massa línies." };
  }

  const resolved: ResolvedLine[] = [];
  let totalEur = 0;

  for (const line of lines) {
    if (
      line.quantity < 1 ||
      line.quantity > 99 ||
      !Number.isInteger(line.quantity)
    ) {
      return { ok: false, error: "Quantitat no vàlida en algun producte." };
    }

    const product = getProductBySlug(line.slug);
    if (!product) {
      return {
        ok: false,
        error: "Hi ha un producte que ja no està disponible.",
      };
    }
    if (product.soldOut) {
      return {
        ok: false,
        error: `El producte «${getProductName(product, locale)}» no està disponible ara mateix.`,
      };
    }

    if (product.price.kind === "variants") {
      if (
        !line.variantId ||
        !product.price.options.some((o) => o.id === line.variantId)
      ) {
        return {
          ok: false,
          error: `Cal triar una opció vàlida per a «${getProductName(product, locale)}».`,
        };
      }
      if (
        line.complementId &&
        !product.price.complements?.some((c) => c.id === line.complementId)
      ) {
        return {
          ok: false,
          error: `Complement no vàlid per a «${getProductName(product, locale)}».`,
        };
      }
    } else if (line.variantId || line.complementId) {
      return { ok: false, error: "Dades de cistella no vàlides." };
    }

    const unitEur = getLineUnitPriceEur(
      product.price,
      line.variantId,
      line.complementId
    );
    const lineTotalEur = unitEur * line.quantity;
    totalEur += lineTotalEur;

    resolved.push({
      productName: getProductName(product, locale),
      slug: getCartStorageSlug(product),
      quantity: line.quantity,
      variantLabel: getVariantLabel(
        product.price,
        line.variantId,
        line.complementId
      ),
      unitEur,
      lineTotalEur,
    });
  }

  return { ok: true, resolved, totalEur };
}

function isValidEmail(value: string): boolean {
  if (value.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitCartOrder(
  _prevState: CartOrderFormState | undefined,
  formData: FormData
): Promise<CartOrderFormState> {
  const spamTrap = String(formData.get(SPAM_TRAP_FIELD) ?? "").trim();
  if (spamTrap.length > 0) {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, SPAM_TRAP_RESPONSE_DELAY_MS);
    });
    return { success: true };
  }

  const name = String(formData.get("nom") ?? "").trim();
  const phone = String(formData.get("telefon") ?? "").trim();
  const email = String(formData.get("correu") ?? "").trim();
  const observations = String(formData.get("observacions") ?? "").trim();
  const cartRaw = String(formData.get("cart") ?? "");

  if (!name || !phone || !email) {
    return { success: false, error: "Omple el nom, el telèfon i el correu." };
  }
  if (name.length > MAX_NAME_LENGTH || phone.length > MAX_PHONE_LENGTH) {
    return { success: false, error: "Alguns camps són massa llargs." };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: "El correu electrònic no és vàlid." };
  }
  if (observations.length > MAX_OBSERVATIONS_LENGTH) {
    return { success: false, error: "Les observacions són massa llargues." };
  }

  const lines = parseCartLines(cartRaw);
  const orderLocale = parseOrderLocale(formData);

  const order = resolveOrderLines(lines, orderLocale);
  if (!order.ok) {
    return { success: false, error: order.error };
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

  const { resolved: items, totalEur } = order;

  const linesText = items
    .map((line, i) => {
      const variantPart = line.variantLabel ? ` · ${line.variantLabel}` : "";
      return [
        `${i + 1}. ${line.productName}${variantPart}`,
        `   Slug: ${line.slug}`,
        `   Quantitat: ${line.quantity}`,
        `   Preu unitari: ${formatEur(line.unitEur)}`,
        `   Subtotal: ${formatEur(line.lineTotalEur)}`,
      ].join("\n");
    })
    .join("\n\n");

  const body = [
    "Nova sol·licitud des de la cistella (sense pagament online).",
    "",
    "Dades de contacte:",
    `Nom: ${name}`,
    `Telèfon: ${phone}`,
    `Correu: ${email}`,
    observations ? `\nObservacions:\n${observations}` : "\nObservacions: (cap)",
    "",
    "—",
    "Línies de la comanda (preus del catàleg en el moment de l’enviament):",
    "",
    linesText,
    "",
    `Total estimat: ${formatEur(totalEur)}`,
  ].join("\n");

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: email,
      subject: `Cistella — ${name}`,
      text: body,
      tags: [{ name: "source", value: "cart-order" }],
    },
    { idempotencyKey: `cart-order/${randomUUID()}` }
  );

  if (error) {
    return {
      success: false,
      error: "No s’ha pogut enviar la sol·licitud. Torna-ho a provar més tard.",
    };
  }

  return { success: true };
}
