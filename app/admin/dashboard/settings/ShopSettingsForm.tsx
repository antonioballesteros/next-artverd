"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CURRENCY_LOCALE_OPTIONS } from "@/lib/currencyLocales";
import { updateShopSettings } from "./actions";

export interface ShopSettingsFormProps {
  currencyLocale: string;
  currencyCode: string;
  vatRatePercent: string;
  salePriceMultiplier: string;
}

function normalizeLocale(value: string): string {
  return CURRENCY_LOCALE_OPTIONS.some((o) => o.value === value)
    ? value
    : CURRENCY_LOCALE_OPTIONS[0].value;
}

export function ShopSettingsForm({
  currencyLocale,
  currencyCode,
  vatRatePercent,
  salePriceMultiplier,
}: ShopSettingsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [locale, setLocale] = useState(() => normalizeLocale(currencyLocale));
  const [code, setCode] = useState(currencyCode);
  const [vat, setVat] = useState(vatRatePercent);
  const [multiplier, setMultiplier] = useState(salePriceMultiplier);

  const dismissSavedSoon = () => {
    if (savedTimerRef.current) {
      clearTimeout(savedTimerRef.current);
    }
    savedTimerRef.current = setTimeout(() => {
      setSaved(false);
      savedTimerRef.current = null;
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) {
        clearTimeout(savedTimerRef.current);
      }
    };
  }, []);

  const clearSavedOnEdit = () => {
    if (saved) {
      setSaved(false);
      if (savedTimerRef.current) {
        clearTimeout(savedTimerRef.current);
        savedTimerRef.current = null;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await updateShopSettings(formData);
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    // Keep UI aligned with what we just saved. router.refresh() can briefly
    // serve cached RSC with old props, which would revert uncontrolled/defaultValue fields.
    setLocale(normalizeLocale(String(formData.get("currencyLocale"))));
    setCode(String(formData.get("currencyCode")).trim().toUpperCase());
    setVat(String(formData.get("vatRatePercent")));
    setMultiplier(String(formData.get("salePriceMultiplier")));
    setSaved(true);
    dismissSavedSoon();
    router.refresh();
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Shop settings</CardTitle>
        <CardDescription>
          Currency display, VAT rate, and sale-price multiplier (cost ×
          multiplier = suggested sale price in the flower catalogue).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <p className="text-destructive text-sm" role="alert">
              {error}
            </p>
          )}
          <div className="grid gap-2">
            <Label htmlFor="currencyLocale">Currency locale</Label>
            <select
              id="currencyLocale"
              name="currencyLocale"
              value={locale}
              onChange={(e) => {
                clearSavedOnEdit();
                setLocale(e.target.value);
              }}
              required
              className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {CURRENCY_LOCALE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-muted-foreground text-xs">
              How amounts are formatted (e.g. es-ES → 1.234,56 €; en-GB →
              €1,234.56 for EUR).
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currencyCode">Currency code (ISO 4217)</Label>
            <Input
              id="currencyCode"
              name="currencyCode"
              value={code}
              onChange={(e) => {
                clearSavedOnEdit();
                setCode(e.target.value);
              }}
              placeholder="EUR"
              maxLength={3}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="vatRatePercent">VAT rate (%)</Label>
            <Input
              id="vatRatePercent"
              name="vatRatePercent"
              type="number"
              min={0}
              max={100}
              step="0.01"
              value={vat}
              onChange={(e) => {
                clearSavedOnEdit();
                setVat(e.target.value);
              }}
              required
            />
            <p className="text-muted-foreground text-xs">
              For quotes and future price breakdowns (e.g. 21 for Spain standard
              VAT).
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="salePriceMultiplier">Sale price multiplier</Label>
            <Input
              id="salePriceMultiplier"
              name="salePriceMultiplier"
              type="number"
              min={0.01}
              max={1000}
              step="0.001"
              value={multiplier}
              onChange={(e) => {
                clearSavedOnEdit();
                setMultiplier(e.target.value);
              }}
              required
            />
            <p className="text-muted-foreground text-xs">
              Suggested sale price = unit cost × this value (you can still edit
              each flower manually).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" className="w-fit" disabled={saving}>
              {saving ? "Saving…" : "Save settings"}
            </Button>
            {saved && !saving && (
              <p
                className="flex items-center gap-1.5 text-sm font-medium text-emerald-600"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2Icon className="size-4 shrink-0" aria-hidden />
                Settings saved
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
