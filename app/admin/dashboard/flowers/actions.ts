"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { flowers } from "@/lib/db/schema";

export async function getFlowers() {
  return db.select().from(flowers).orderBy(flowers.name);
}

export async function createFlower(formData: FormData) {
  const name = formData.get("name") as string | null;
  const stock = formData.get("stock");
  const cost = formData.get("cost");
  const salePrice = formData.get("salePrice");

  if (!name?.trim()) {
    return { error: "Name is required" };
  }
  const stockNum = stock != null ? parseInt(String(stock), 10) : NaN;
  if (Number.isNaN(stockNum) || stockNum < 0) {
    return { error: "Stock must be a non-negative integer" };
  }
  const costNum = cost != null ? parseFloat(String(cost)) : NaN;
  if (Number.isNaN(costNum) || costNum < 0) {
    return { error: "Cost must be a non-negative number" };
  }
  const salePriceNum =
    salePrice != null && String(salePrice).trim() !== ""
      ? parseFloat(String(salePrice))
      : NaN;
  if (Number.isNaN(salePriceNum) || salePriceNum < 0) {
    return { error: "Sale price must be a non-negative number" };
  }

  await db.insert(flowers).values({
    name: name.trim(),
    stock: stockNum,
    cost: costNum.toFixed(2),
    salePrice: salePriceNum.toFixed(2),
  });

  revalidatePath("/admin/dashboard/flowers");
  return { success: true };
}

export async function updateFlower(formData: FormData) {
  const idRaw = formData.get("id");
  const id = idRaw != null ? parseInt(String(idRaw), 10) : NaN;
  if (Number.isNaN(id) || id < 1) {
    return { error: "Invalid flower" };
  }

  const name = formData.get("name") as string | null;
  const stock = formData.get("stock");
  const cost = formData.get("cost");
  const salePrice = formData.get("salePrice");

  if (!name?.trim()) {
    return { error: "Name is required" };
  }
  const stockNum = stock != null ? parseInt(String(stock), 10) : NaN;
  if (Number.isNaN(stockNum) || stockNum < 0) {
    return { error: "Stock must be a non-negative integer" };
  }
  const costNum = cost != null ? parseFloat(String(cost)) : NaN;
  if (Number.isNaN(costNum) || costNum < 0) {
    return { error: "Cost must be a non-negative number" };
  }
  const salePriceNum =
    salePrice != null && String(salePrice).trim() !== ""
      ? parseFloat(String(salePrice))
      : NaN;
  if (Number.isNaN(salePriceNum) || salePriceNum < 0) {
    return { error: "Sale price must be a non-negative number" };
  }

  await db
    .update(flowers)
    .set({
      name: name.trim(),
      stock: stockNum,
      cost: costNum.toFixed(2),
      salePrice: salePriceNum.toFixed(2),
    })
    .where(eq(flowers.id, id));

  revalidatePath("/admin/dashboard/flowers");
  return { success: true };
}

export async function deleteFlower(id: number) {
  await db.delete(flowers).where(eq(flowers.id, id));
  revalidatePath("/admin/dashboard/flowers");
  return { success: true };
}
