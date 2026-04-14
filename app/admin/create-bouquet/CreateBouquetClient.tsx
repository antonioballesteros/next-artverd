"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Expand, Shrink } from "lucide-react";

import { BouquetDescriptionInput } from "@/components/bouquet-description-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateBouquetImage } from "@/app/actions/generate-bouquet-image";
import { parseBouquetDescription } from "@/app/actions/parse-bouquet-description";
import type { ParsedBouquet } from "@/lib/bouquet/parsed-bouquet-schema";
import type { Flower, ShopSettings } from "@/lib/db/schema";
import { formatCurrencyAmount } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";

/** Intrinsic pixels from `generateBouquetImage` (`1024x1536` portrait). */
const GENERATED_BOUQUET_IMAGE_WIDTH = 1024;
const GENERATED_BOUQUET_IMAGE_HEIGHT = 1536;

type FlowerCatalogueSortColumn = "name" | "stock" | "salePrice";

type SortDirection = "asc" | "desc";

interface FlowerCatalogueSortHeaderProps {
  label: string;
  column: FlowerCatalogueSortColumn;
  activeColumn: FlowerCatalogueSortColumn;
  direction: SortDirection;
  onSort: (column: FlowerCatalogueSortColumn) => void;
  className?: string;
}

function FlowerCatalogueSortHeader({
  label,
  column,
  activeColumn,
  direction,
  onSort,
  className,
}: FlowerCatalogueSortHeaderProps) {
  const isActive = activeColumn === column;
  const ariaSort: "none" | "ascending" | "descending" = !isActive
    ? "none"
    : direction === "asc"
      ? "ascending"
      : "descending";

  const handleClick = () => {
    onSort(column);
  };

  const sortHint = !isActive
    ? `Sort by ${label}`
    : direction === "asc"
      ? `${label}: ascending. Click to reverse.`
      : `${label}: descending. Click to reverse.`;

  return (
    <TableHead aria-sort={ariaSort} className={cn("p-0", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-10 w-full justify-start gap-1 px-2 text-left font-medium"
        onClick={handleClick}
        aria-label={sortHint}
      >
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <span
          className="inline-flex size-3.5 shrink-0 items-center justify-center"
          aria-hidden
        >
          {isActive ? (
            direction === "asc" ? (
              <ArrowUp className="size-3.5 opacity-70" />
            ) : (
              <ArrowDown className="size-3.5 opacity-70" />
            )
          ) : null}
        </span>
      </Button>
    </TableHead>
  );
}

interface CreateBouquetClientProps {
  flowers: Flower[];
  shopSettings: ShopSettings;
}

export function CreateBouquetClient({
  flowers,
  shopSettings,
}: CreateBouquetClientProps) {
  const [isDemo, setIsDemo] = useState(false);
  const [description, setDescription] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedBouquet | null>(null);
  const [isGeneratingBouquet, setIsGeneratingBouquet] = useState(false);
  const [generateBouquetErrorMessage, setGenerateBouquetErrorMessage] =
    useState<string | null>(null);
  const [generatedBouquetImages, setGeneratedBouquetImages] = useState<
    string[] | null
  >(null);
  const [catalogueSortColumn, setCatalogueSortColumn] =
    useState<FlowerCatalogueSortColumn>("name");
  const [catalogueSortDirection, setCatalogueSortDirection] =
    useState<SortDirection>("asc");
  const [isCatalogueExpanded, setIsCatalogueExpanded] = useState(false);
  const [isBouquetImagePreviewOpen, setIsBouquetImagePreviewOpen] =
    useState(false);
  const [bouquetImagePreviewIndex, setBouquetImagePreviewIndex] = useState(0);

  const currencyOpts = {
    locale: shopSettings.currencyLocale,
    currencyCode: shopSettings.currencyCode,
  };

  const formatCurrency = (value: string | number) =>
    formatCurrencyAmount(value, currencyOpts);

  const getUnitSalePriceForFlower = (name: string) => {
    const match = flowers.find(
      (flower) => flower.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    return match ? Number(match.salePrice) : null;
  };

  const handleCatalogueSort = (column: FlowerCatalogueSortColumn) => {
    if (catalogueSortColumn !== column) {
      setCatalogueSortColumn(column);
      setCatalogueSortDirection("asc");
      return;
    }
    setCatalogueSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedCatalogueFlowers = useMemo(() => {
    if (flowers.length === 0) {
      return flowers;
    }
    const mult = catalogueSortDirection === "asc" ? 1 : -1;
    return [...flowers].sort((a, b) => {
      if (catalogueSortColumn === "name") {
        return (
          mult *
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        );
      }
      if (catalogueSortColumn === "stock") {
        return mult * (a.stock - b.stock);
      }
      return mult * (Number(a.salePrice) - Number(b.salePrice));
    });
  }, [flowers, catalogueSortColumn, catalogueSortDirection]);

  const handleSend = async () => {
    if (!description.trim()) return;

    try {
      setIsSending(true);
      setErrorMessage(null);
      const result = await parseBouquetDescription(
        description,
        flowers,
        isDemo
      );
      setParsed(result);
    } catch (error) {
      console.error("Error parsing bouquet description", error);
      const err = error as Error;
      setParsed(null);
      setErrorMessage(err.message || "Failed to parse bouquet description.");
    } finally {
      setIsSending(false);
    }
  };

  const handleToggleDemoMode = () => {
    const nextIsDemo = !isDemo;
    setIsDemo(nextIsDemo);
    setDescription(nextIsDemo ? "Quiero un ramo de 30€" : "");
  };

  const handleGenerateBouquet = async () => {
    if (!parsed) return;

    try {
      setIsGeneratingBouquet(true);
      setGenerateBouquetErrorMessage(null);
      const result = await generateBouquetImage(parsed);
      setGeneratedBouquetImages(result);
    } catch (error) {
      console.error("Error generating bouquet image", error);
      const err = error as Error;
      setGenerateBouquetErrorMessage(
        err.message || "Failed to generate bouquet image."
      );
    } finally {
      setIsGeneratingBouquet(false);
    }
  };

  /** Same max height for the top row so input and catalogue align; list scrolls inside. */
  const topRowCardClassName = "h-full min-h-0 max-h-[20rem]";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Create new bouquet</h1>
        <p className="text-muted-foreground mt-2">
          Describe the bouquet and generate a preview for your client. Type or
          use the microphone to dictate.
        </p>
      </div>

      <div className="grid min-h-0 gap-6 lg:grid-cols-[7fr_3fr] lg:items-stretch">
        <Card className={topRowCardClassName}>
          <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-3 space-y-0">
            <CardTitle className="text-lg">Describe and iterate</CardTitle>
            <Button
              type="button"
              variant={isDemo ? "default" : "outline"}
              onClick={handleToggleDemoMode}
              disabled={isSending}
            >
              Mode Demo
            </Button>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
            <BouquetDescriptionInput
              value={description}
              onChange={setDescription}
              placeholder="e.g. A bouquet of roses and margaritas, around €30, with a bow"
              disabled={isSending}
              expandToFillHeight
            />

            {errorMessage && (
              <p className="text-destructive shrink-0 text-sm" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="flex shrink-0 justify-end">
              <Button
                type="button"
                onClick={handleSend}
                disabled={!description.trim() || isSending}
              >
                {isSending ? "Parsing..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            topRowCardClassName,
            isCatalogueExpanded && "max-h-none"
          )}
        >
          <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-3 space-y-0">
            <CardTitle className="text-lg">
              Available flowers and sale prices
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCatalogueExpanded((prev) => !prev)}
            >
              {isCatalogueExpanded ? (
                <Shrink className="size-4" aria-hidden />
              ) : (
                <Expand className="size-4" aria-hidden />
              )}
            </Button>
          </CardHeader>
          <CardContent
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              isCatalogueExpanded ? "overflow-visible" : "overflow-hidden"
            )}
          >
            <div
              className={cn(
                "min-h-0 flex-1 rounded-md border",
                isCatalogueExpanded ? "overflow-visible" : "overflow-y-auto"
              )}
            >
              <Table className="text-base">
                <TableHeader className="bg-card sticky top-0 z-10">
                  <TableRow>
                    <FlowerCatalogueSortHeader
                      label="Name"
                      column="name"
                      activeColumn={catalogueSortColumn}
                      direction={catalogueSortDirection}
                      onSort={handleCatalogueSort}
                    />
                    <FlowerCatalogueSortHeader
                      label="Stock"
                      column="stock"
                      activeColumn={catalogueSortColumn}
                      direction={catalogueSortDirection}
                      onSort={handleCatalogueSort}
                    />
                    <FlowerCatalogueSortHeader
                      label="Sale price (per unit)"
                      column="salePrice"
                      activeColumn={catalogueSortColumn}
                      direction={catalogueSortDirection}
                      onSort={handleCatalogueSort}
                      className="whitespace-nowrap"
                    />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flowers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-muted-foreground text-center"
                      >
                        No flowers configured yet. Add them from the dashboard.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedCatalogueFlowers.map((flower) => (
                      <TableRow key={flower.id}>
                        <TableCell className="font-medium">
                          {flower.name}
                        </TableCell>
                        <TableCell>{flower.stock}</TableCell>
                        <TableCell className="whitespace-nowrap tabular-nums">
                          {formatCurrency(flower.salePrice)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {parsed ? (
        <div
          className={cn(
            "grid gap-6 lg:items-start",
            generatedBouquetImages &&
              generatedBouquetImages.length > 0 &&
              "lg:grid-cols-[minmax(0,1fr)_minmax(240px,22rem)]"
          )}
        >
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle className="text-lg">Parsed bouquet details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm font-medium">
                  Description received (requested)
                </p>
                <div className="space-y-2 rounded-md border px-4 py-3">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Description
                    </p>
                    <p className="text-sm">{parsed.requested.description}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Max price
                    </p>
                    <p className="text-sm">
                      {parsed.requested.maxPrice != null
                        ? formatCurrency(parsed.requested.maxPrice)
                        : "Not specified"}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Flowers
                    </p>
                    {parsed.requested.flowers.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No flowers detected in the original request.
                      </p>
                    ) : (
                      <ul className="mt-1 space-y-1 text-sm">
                        {parsed.requested.flowers.map((flower, index) => (
                          <li key={`${flower.name}-requested-${index}`}>
                            {flower.name}
                            {flower.quantity != null
                              ? ` × ${flower.quantity}`
                              : " (quantity not specified)"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Extras
                    </p>
                    {parsed.requested.extras.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No extras detected in the original request.
                      </p>
                    ) : (
                      <ul className="mt-1 flex flex-wrap gap-2 text-xs">
                        {parsed.requested.extras.map((extra, index) => (
                          <li
                            key={`${extra}-requested-${index}`}
                            className="bg-muted rounded-full px-3 py-1"
                          >
                            {extra}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm font-medium">
                  Bouquet to fabricate (proposal)
                </p>
                <div className="space-y-4 rounded-md border px-4 py-3">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Final price
                    </p>
                    <p className="text-base">
                      {parsed.bouquet.totalPrice != null
                        ? formatCurrency(parsed.bouquet.totalPrice)
                        : "Not specified"}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Flowers
                    </p>
                    {parsed.bouquet.flowers.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No flowers proposed.
                      </p>
                    ) : (
                      <Table className="mt-2 text-base">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="whitespace-nowrap">
                              Total price
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {parsed.bouquet.flowers.map((flower, index) => (
                            <TableRow key={`${flower.name}-bouquet-${index}`}>
                              <TableCell className="font-medium">
                                {flower.name}
                              </TableCell>
                              <TableCell>
                                {flower.quantity != null
                                  ? flower.quantity
                                  : "Not specified"}
                              </TableCell>
                              <TableCell className="whitespace-nowrap tabular-nums">
                                {(() => {
                                  const unitPrice = getUnitSalePriceForFlower(
                                    flower.name
                                  );
                                  if (
                                    unitPrice == null ||
                                    flower.quantity == null
                                  ) {
                                    return "–";
                                  }
                                  const total = unitPrice * flower.quantity;
                                  return formatCurrency(total);
                                })()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Extras
                    </p>
                    {parsed.bouquet.extras.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No extras proposed.
                      </p>
                    ) : (
                      <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                        {parsed.bouquet.extras.map((extra, index) => (
                          <li
                            key={`${extra}-bouquet-${index}`}
                            className="bg-muted rounded-full px-3 py-1"
                          >
                            {extra}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      Notes
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm whitespace-pre-line">
                      {parsed.bouquet.notes || "No notes provided."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex flex-col items-end gap-2">
                  {generateBouquetErrorMessage ? (
                    <p className="text-destructive text-sm" role="alert">
                      {generateBouquetErrorMessage}
                    </p>
                  ) : null}
                  <Button
                    type="button"
                    onClick={handleGenerateBouquet}
                    disabled={isGeneratingBouquet}
                  >
                    {isGeneratingBouquet ? "Generating..." : "Generate bouquet"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {generatedBouquetImages && generatedBouquetImages.length > 0 ? (
            <>
              <Card className="min-w-0 lg:sticky lg:top-4 lg:self-start">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Generated bouquet images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {generatedBouquetImages.map((src, index) => (
                      <Button
                        key={`bouquet-thumb-${index}`}
                        type="button"
                        onClick={() => {
                          setBouquetImagePreviewIndex(index);
                          setIsBouquetImagePreviewOpen(true);
                        }}
                        className="group ring-offset-background focus-visible:ring-ring relative w-full cursor-zoom-in rounded-md text-left outline-none focus-visible:ring-2"
                        title="View full size"
                        aria-haspopup="dialog"
                        aria-label={`Open full-size preview of generated bouquet variant ${index + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`Generated bouquet variant ${index + 1}`}
                          width={GENERATED_BOUQUET_IMAGE_WIDTH}
                          height={GENERATED_BOUQUET_IMAGE_HEIGHT}
                          unoptimized
                          className="w-full max-w-full rounded-md object-contain transition-opacity group-hover:opacity-95"
                        />
                        <span
                          className="pointer-events-none absolute inset-0 flex items-end justify-end bg-linear-to-t from-black/40 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                          aria-hidden
                        >
                          <span className="bg-background/90 text-foreground ring-border flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium shadow-sm ring-1">
                            <Expand className="size-3.5" />
                            Full size
                          </span>
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Dialog
                open={isBouquetImagePreviewOpen}
                onOpenChange={setIsBouquetImagePreviewOpen}
              >
                <DialogContent
                  className="max-h-[90vh] max-w-[calc(100vw-2rem)] gap-3 overflow-hidden p-3 sm:max-w-5xl"
                  showCloseButton
                >
                  <DialogHeader className="shrink-0 space-y-1">
                    <DialogTitle>
                      Generated bouquet — variant {bouquetImagePreviewIndex + 1}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      Full-size preview of the selected AI-generated bouquet
                      image.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-muted/30 flex max-h-[min(80vh,calc(90vh-5rem))] min-h-0 justify-center overflow-auto rounded-md p-1">
                    {generatedBouquetImages[bouquetImagePreviewIndex] !=
                    undefined ? (
                      <Image
                        src={generatedBouquetImages[bouquetImagePreviewIndex]!}
                        alt={`Generated bouquet variant ${bouquetImagePreviewIndex + 1}`}
                        width={GENERATED_BOUQUET_IMAGE_WIDTH}
                        height={GENERATED_BOUQUET_IMAGE_HEIGHT}
                        unoptimized
                        className="h-auto max-h-full w-auto max-w-full object-contain"
                      />
                    ) : null}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : null}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parsed bouquet details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Send a description to see the parsed request and the proposed
              bouquet here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
