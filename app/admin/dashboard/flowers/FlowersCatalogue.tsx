"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { formatCurrencyAmount } from "@/lib/formatCurrency";
import { createFlower, updateFlower, deleteFlower } from "./actions";
import type { Flower } from "@/lib/db/schema";

export interface FlowersCatalogueShopSettings {
  currencyLocale: string;
  currencyCode: string;
  vatRatePercent: number;
  salePriceMultiplier: number;
}

interface FlowersCatalogueProps {
  flowers: Flower[];
  shopSettings: FlowersCatalogueShopSettings;
}

function suggestedSalePrice(cost: number, multiplier: number): string {
  if (Number.isNaN(cost) || cost < 0 || Number.isNaN(multiplier)) {
    return "";
  }
  const v = Math.round(cost * multiplier * 100) / 100;
  return Number.isFinite(v) ? v.toFixed(2) : "";
}

export function FlowersCatalogue({
  flowers,
  shopSettings,
}: FlowersCatalogueProps) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [editFlower, setEditFlower] = useState<Flower | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [showUnitCost, setShowUnitCost] = useState(false);

  const createCostRef = useRef<HTMLInputElement>(null);
  const createSaleRef = useRef<HTMLInputElement>(null);
  const editCostRef = useRef<HTMLInputElement>(null);
  const editSaleRef = useRef<HTMLInputElement>(null);

  const currencyOpts = {
    locale: shopSettings.currencyLocale,
    currencyCode: shopSettings.currencyCode,
  };

  const formatCurrency = (value: string | number) =>
    formatCurrencyAmount(value, currencyOpts);

  const applySuggestedCreate = () => {
    const cost = parseFloat(createCostRef.current?.value ?? "");
    const s = suggestedSalePrice(cost, shopSettings.salePriceMultiplier);
    if (createSaleRef.current && s) {
      createSaleRef.current.value = s;
    }
  };

  const applySuggestedEdit = () => {
    const cost = parseFloat(editCostRef.current?.value ?? "");
    const s = suggestedSalePrice(cost, shopSettings.salePriceMultiplier);
    if (editSaleRef.current && s) {
      editSaleRef.current.value = s;
    }
  };

  const handleCreate = async (formData: FormData) => {
    setFormError(null);
    const result = await createFlower(formData);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    setCreateOpen(false);
    router.refresh();
  };

  const handleUpdate = async (formData: FormData) => {
    setFormError(null);
    const result = await updateFlower(formData);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    setEditFlower(null);
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteFlower(id);
    setDeleteId(null);
    router.refresh();
  };

  const multLabel = `×${shopSettings.salePriceMultiplier}`;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <CardTitle className="shrink-0">Flower catalogue</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit gap-2"
              onClick={() => setShowUnitCost((v) => !v)}
            >
              {showUnitCost ? (
                <>
                  <EyeOffIcon className="size-4" />
                  Hide unit costs
                </>
              ) : (
                <>
                  <EyeIcon className="size-4" />
                  Show unit costs
                </>
              )}
            </Button>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="w-fit sm:shrink-0">Add flower</Button>
            </DialogTrigger>
            <DialogContent>
              <form action={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Add flower</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {formError && (
                    <p className="text-destructive text-sm">{formError}</p>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="create-name">Name</Label>
                    <Input
                      id="create-name"
                      name="name"
                      placeholder="e.g. Roses"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="create-stock">Stock</Label>
                    <Input
                      id="create-stock"
                      name="stock"
                      type="number"
                      min={0}
                      defaultValue={0}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="create-cost">Unit cost</Label>
                    <Input
                      ref={createCostRef}
                      id="create-cost"
                      name="cost"
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex flex-wrap items-end gap-2">
                      <div className="grid min-w-0 flex-1 gap-2">
                        <Label htmlFor="create-sale-price">Sale price</Label>
                        <Input
                          ref={createSaleRef}
                          id="create-sale-price"
                          name="salePrice"
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="shrink-0"
                        onClick={applySuggestedCreate}
                      >
                        Suggested {multLabel}
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table className="text-lg">
            <TableHeader>
              <TableRow className="border-foreground/15 bg-muted/70 hover:bg-muted/70 border-b-2">
                <TableHead>Name</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="min-w-30 whitespace-nowrap">
                  {showUnitCost ? (
                    "Unit cost"
                  ) : (
                    <span
                      className="text-muted-foreground/0 select-none"
                      aria-hidden
                    >
                      Unit cost
                    </span>
                  )}
                </TableHead>
                <TableHead className="min-w-56 whitespace-nowrap">
                  Sale price
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flowers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground text-center"
                  >
                    No flowers yet. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                flowers.map((flower) => (
                  <TableRow key={flower.id}>
                    <TableCell className="font-medium">{flower.name}</TableCell>
                    <TableCell>{flower.stock}</TableCell>
                    <TableCell className="min-w-30 whitespace-nowrap tabular-nums">
                      {showUnitCost ? formatCurrency(flower.cost) : "\u00a0"}
                    </TableCell>
                    <TableCell className="min-w-56 whitespace-nowrap tabular-nums">
                      {formatCurrency(flower.salePrice)}
                      {showUnitCost ? (
                        <span className="text-muted-foreground text-base">
                          {" "}
                          (
                          {formatCurrency(
                            Math.round(
                              Number(flower.cost) *
                                shopSettings.salePriceMultiplier *
                                100
                            ) / 100
                          )}
                          )
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog
                          open={editFlower?.id === flower.id}
                          onOpenChange={(open) =>
                            setEditFlower(open ? flower : null)
                          }
                        >
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setEditFlower(flower)}
                          >
                            <PencilIcon className="size-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <DialogContent>
                            <form action={handleUpdate}>
                              <Input
                                type="hidden"
                                name="id"
                                value={flower.id}
                              />
                              <DialogHeader>
                                <DialogTitle>Edit flower</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                {formError && (
                                  <p className="text-destructive text-sm">
                                    {formError}
                                  </p>
                                )}
                                <div className="grid gap-2">
                                  <Label htmlFor={`edit-name-${flower.id}`}>
                                    Name
                                  </Label>
                                  <Input
                                    id={`edit-name-${flower.id}`}
                                    name="name"
                                    defaultValue={flower.name}
                                    required
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor={`edit-stock-${flower.id}`}>
                                    Stock
                                  </Label>
                                  <Input
                                    id={`edit-stock-${flower.id}`}
                                    name="stock"
                                    type="number"
                                    min={0}
                                    defaultValue={flower.stock}
                                    required
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor={`edit-cost-${flower.id}`}>
                                    Unit cost
                                  </Label>
                                  <Input
                                    ref={editCostRef}
                                    id={`edit-cost-${flower.id}`}
                                    name="cost"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    defaultValue={flower.cost}
                                    required
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <div className="flex flex-wrap items-end gap-2">
                                    <div className="grid min-w-0 flex-1 gap-2">
                                      <Label
                                        htmlFor={`edit-sale-price-${flower.id}`}
                                      >
                                        Sale price
                                      </Label>
                                      <Input
                                        ref={editSaleRef}
                                        id={`edit-sale-price-${flower.id}`}
                                        name="salePrice"
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        defaultValue={flower.salePrice}
                                        required
                                      />
                                    </div>
                                    <Button
                                      type="button"
                                      variant="secondary"
                                      size="sm"
                                      className="shrink-0"
                                      onClick={applySuggestedEdit}
                                    >
                                      Suggested {multLabel}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setEditFlower(null)}
                                >
                                  Cancel
                                </Button>
                                <Button type="submit">Save</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Dialog
                          open={deleteId === flower.id}
                          onOpenChange={(open) =>
                            setDeleteId(open ? flower.id : null)
                          }
                        >
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setDeleteId(flower.id)}
                          >
                            <Trash2Icon className="text-destructive size-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete flower</DialogTitle>
                            </DialogHeader>
                            <p className="text-muted-foreground text-sm">
                              Are you sure you want to delete &quot;
                              {flower.name}
                              &quot;? This cannot be undone.
                            </p>
                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDeleteId(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(flower.id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
