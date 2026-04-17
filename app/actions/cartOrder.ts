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
import { getTranslations } from "next-intl/server";
import { getResendFromTo } from "@/lib/resendFromTo";
import { Resend } from "resend";

type CartOrderErrorsTranslate = (
  key: string,
  values?: Record<string, string | number>
) => string;

// Use a non-semantic name to avoid password managers/autofill filling it accidentally.
const SPAM_TRAP_FIELD = "__order_reference_code";
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
  customAmountEur?: number;
  customDescription?: string;
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
  locale: AppLocale,
  te: CartOrderErrorsTranslate
):
  | { ok: true; resolved: ResolvedLine[]; totalEur: number }
  | { ok: false; error: string } {
  if (lines.length === 0) {
    return { ok: false, error: te("emptyCart") };
  }
  if (lines.length > 80) {
    return { ok: false, error: te("tooManyLines") };
  }

  const resolved: ResolvedLine[] = [];
  let totalEur = 0;

  for (const line of lines) {
    if (
      line.quantity < 1 ||
      line.quantity > 99 ||
      !Number.isInteger(line.quantity)
    ) {
      return { ok: false, error: te("invalidQuantity") };
    }

    const product = getProductBySlug(line.slug);
    if (!product) {
      return {
        ok: false,
        error: te("productNotFound"),
      };
    }
    if (product.soldOut) {
      return {
        ok: false,
        error: te("productSoldOut", {
          name: getProductName(product, locale),
        }),
      };
    }

    if (product.price.kind === "variants") {
      if (
        !line.variantId ||
        (!product.price.options.some((o) => o.id === line.variantId) &&
          product.price.customOption?.id !== line.variantId)
      ) {
        return {
          ok: false,
          error: te("invalidVariant", {
            name: getProductName(product, locale),
          }),
        };
      }
      if (
        line.complementId &&
        !product.price.complements?.some((c) => c.id === line.complementId)
      ) {
        return {
          ok: false,
          error: te("invalidComplement", {
            name: getProductName(product, locale),
          }),
        };
      }
      const customOption =
        product.price.customOption &&
        line.variantId === product.price.customOption.id
          ? product.price.customOption
          : undefined;
      if (customOption) {
        if (
          typeof line.customAmountEur !== "number" ||
          !Number.isFinite(line.customAmountEur) ||
          line.customAmountEur < customOption.minAmountEur ||
          line.customAmountEur > customOption.maxAmountEur
        ) {
          return {
            ok: false,
            error: te("invalidVariant", {
              name: getProductName(product, locale),
            }),
          };
        }
        if (!line.customDescription?.trim()) {
          return {
            ok: false,
            error: te("invalidVariant", {
              name: getProductName(product, locale),
            }),
          };
        }
      } else if (
        line.customAmountEur !== undefined ||
        line.customDescription?.trim()
      ) {
        return { ok: false, error: te("invalidCartData") };
      }
    } else if (line.variantId || line.complementId) {
      return { ok: false, error: te("invalidCartData") };
    }

    const unitEur = getLineUnitPriceEur(
      product.price,
      line.variantId,
      line.complementId,
      line.customAmountEur
    );
    const lineTotalEur = unitEur * line.quantity;
    totalEur += lineTotalEur;

    resolved.push({
      productName: getProductName(product, locale),
      slug: getCartStorageSlug(product),
      quantity: line.quantity,
      variantLabel: getVariantLabel(
        product.price,
        locale,
        line.variantId,
        line.complementId,
        undefined
      ),
      customAmountEur: line.customAmountEur,
      customDescription: line.customDescription?.trim(),
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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

  const orderLocale = parseOrderLocale(formData);
  const te = await getTranslations({
    locale: orderLocale,
    namespace: "botiga.cartOrderErrors",
  });

  const name = String(formData.get("nom") ?? "").trim();
  const phone = String(formData.get("telefon") ?? "").trim();
  const email = String(formData.get("correu") ?? "").trim();
  const observations = String(formData.get("observacions") ?? "").trim();
  const cartRaw = String(formData.get("cart") ?? "");

  if (!name || !phone || !email) {
    return { success: false, error: te("fillRequiredFields") };
  }
  if (name.length > MAX_NAME_LENGTH || phone.length > MAX_PHONE_LENGTH) {
    return { success: false, error: te("fieldsTooLong") };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: te("invalidEmail") };
  }
  if (observations.length > MAX_OBSERVATIONS_LENGTH) {
    return { success: false, error: te("observationsTooLong") };
  }

  const lines = parseCartLines(cartRaw);

  const order = resolveOrderLines(lines, orderLocale, te);
  if (!order.ok) {
    return { success: false, error: order.error };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: te("emailServiceUnavailable"),
    };
  }

  const addresses = getResendFromTo();
  if (!addresses) {
    return {
      success: false,
      error: te("emailServiceUnavailable"),
    };
  }
  const { from, to } = addresses;

  const { resolved: items, totalEur } = order;

  const linesText = items
    .map((line, i) => {
      const variantPart = line.variantLabel ? ` · ${line.variantLabel}` : "";
      const customAmountPart =
        line.customAmountEur !== undefined
          ? `\n   Import personalitzat: ${formatEur(line.customAmountEur)}`
          : "";
      const customDescriptionPart =
        line.customDescription && line.customAmountEur !== undefined
          ? `   Descripció: ${line.customDescription}`
          : "";
      return [
        `${i + 1}. ${line.productName}${variantPart}`,
        `   Slug: ${line.slug}`,
        `   Quantitat: ${line.quantity}`,
        `   Preu unitari: ${formatEur(line.unitEur)}`,
        customAmountPart,
        customDescriptionPart,
        `   Subtotal: ${formatEur(line.lineTotalEur)}`,
      ].join("\n");
    })
    .join("\n\n");

  const body = [
    "Dades de contacte:",
    `Nom: ${name}`,
    `Telèfon: ${phone}`,
    `Correu: ${email}`,
    `\nObservacions:\n${observations.trim() || "(cap)"}`,
    "",
    "—",
    "Línies de la comanda (preus del catàleg en el moment de l’enviament):",
    "",
    linesText,
    "",
    `Total estimat: ${formatEur(totalEur)}`,
  ].join("\n");

  const linesHtml = items
    .map((line, i) => {
      const variantPart = line.variantLabel
        ? ` <span style="color:#475569;">· ${escapeHtml(line.variantLabel)}</span>`
        : "";
      const customAmountPart =
        line.customAmountEur !== undefined
          ? `<div style="margin-top:4px;color:#334155;">Import personalitzat: <strong>${escapeHtml(
              formatEur(line.customAmountEur)
            )}</strong></div>`
          : "";
      const customDescriptionPart =
        line.customDescription && line.customAmountEur !== undefined
          ? `<div style="margin-top:4px;color:#334155;">Descripció: ${escapeHtml(
              line.customDescription
            )}</div>`
          : "";

      return `
        <li style="margin:0 0 12px 0;padding:12px;border:1px solid #e2e8f0;border-radius:8px;background:#ffffff;">
          <div style="font-size:15px;font-weight:600;color:#0f172a;">
            ${i + 1}. ${escapeHtml(line.productName)}${variantPart}
          </div>
          <div style="margin-top:6px;color:#334155;">Slug: ${escapeHtml(
            line.slug
          )}</div>
          <div style="margin-top:4px;color:#334155;">Quantitat: <strong>${line.quantity}</strong></div>
          <div style="margin-top:4px;color:#334155;">Preu unitari: <strong>${escapeHtml(
            formatEur(line.unitEur)
          )}</strong></div>
          ${customAmountPart}
          ${customDescriptionPart}
          <div style="margin-top:6px;color:#0f172a;">Subtotal: <strong>${escapeHtml(
            formatEur(line.lineTotalEur)
          )}</strong></div>
        </li>
      `;
    })
    .join("");

  const html = `
    <div style="background:#f8fafc;padding:24px;font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="padding:18px 20px;background:#f1f5f9;border-bottom:1px solid #e2e8f0;">
          <h1 style="margin:0;font-size:18px;">Nova comanda de cistella</h1>
          <p style="margin:6px 0 0 0;color:#334155;">Preus del catàleg en el moment de l’enviament</p>
        </div>

        <div style="padding:20px;">
          <h2 style="margin:0 0 10px 0;font-size:15px;">Dades de contacte</h2>
          <p style="margin:4px 0;"><strong>Nom:</strong> ${escapeHtml(name)}</p>
          <p style="margin:4px 0;"><strong>Telèfon:</strong> ${escapeHtml(phone)}</p>
          <p style="margin:4px 0;"><strong>Correu:</strong> ${escapeHtml(email)}</p>

          <h2 style="margin:18px 0 10px 0;font-size:15px;">Observacions</h2>
          <p style="margin:0;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;white-space:pre-wrap;">
            ${escapeHtml(observations.trim() || "(cap)")}
          </p>

          <h2 style="margin:18px 0 10px 0;font-size:15px;">Línies de la comanda</h2>
          <ul style="margin:0;padding:0;list-style:none;">
            ${linesHtml}
          </ul>

          <div style="margin-top:18px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:16px;">
            <strong>Total estimat: ${escapeHtml(formatEur(totalEur))}</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send(
      {
        from,
        to: [to],
        replyTo: email,
        subject: `Cistella — ${name}`,
        text: body,
        html,

        tags: [{ name: "source", value: "cart-order" }],
      },
      { idempotencyKey: `cart-order/${randomUUID()}` }
    );

    const { error } = result;
    if (error) {
      return {
        success: false,
        error: te("sendFailed"),
      };
    }
  } catch {
    return {
      success: false,
      error: te("sendFailed"),
    };
  }

  return { success: true };
}
