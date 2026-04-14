"use server";

import { Output, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  bouquetSchema,
  type ParsedBouquet,
} from "@/lib/bouquet/parsed-bouquet-schema";
import type { Flower } from "@/lib/db/schema";

export async function parseBouquetDescription(
  description: string,
  availableFlowers: Flower[],
  isDemo: boolean = false
): Promise<ParsedBouquet> {
  if (isDemo) {
    return {
      requested: {
        description: "Quiero un ramo de 30€",
        maxPrice: 30,
        flowers: [],
        extras: [],
      },
      bouquet: {
        totalPrice: 30,
        flowers: [
          {
            name: "Girasol",
            quantity: 3,
            subtotal: 24,
          },
          {
            name: "Eucalipto",
            quantity: 2,
            subtotal: 6,
          },
        ],
        extras: [],
        calculation_steps:
          "3 Girasol x 8.00 = 24.00; 2 Eucalipto x 3.00 = 6.00; Total = 24.00 + 6.00 = 30.00",
        notes: "We combined Girasoles with Eucalipto to reach exactly 30€.",
      },
    };
  }

  const flowersSummary =
    availableFlowers.length === 0
      ? "No flowers are currently configured in the catalogue."
      : [
          "| Flower Name | Stock | Price per unit |",
          "| :--- | :--- | :--- |",
          ...availableFlowers.map(
            (f) => `| ${f.name} | ${f.stock} | ${f.salePrice} |`
          ),
        ].join("\n");

  const systemPrompt = `
### ROLE
You are a mathematical assistant for a florist.

### INVENTORY DATA (Strict Stock & Price)
${flowersSummary}

### UNIVERSAL OPERATIONAL RULES
0. **STEP BY STEP PROCESS**: Follow the steps in order and do not skip any. 
   - Do not invent any price or quantity. 
1. **IDENTIFICATION**: Match the user's requested flower to the closest name in the inventory. If the user uses plural, match the singular name.
2. **STOCK VALIDATION (Strict)**: 
   - Before any adjustment, perform a boolean check: Is (quantity <= stock)?
   - If TRUE, the request is VALID. Do NOT trigger fallback logic or stock warnings.
3. FALLBACK (Stock is insufficient): 
  - If stock is insufficient for a requested flower: Use all available stock of that flower. 
  - Do not invent a quantity. 
  - To calculate the subtotal, use the real amount of flowers used, not the requested quantity.
  - Recalculate the totalPrice using the new subtotals.
4. **CALCULATION PROTOCOL**: 
   - STEP 1: Multiply (quantity * Price) for each item to get subtotals.(Example: 12.2 * 3.3 = 40.26). If quantity > stock, use the stock value for the subtotal.
   - STEP 2: Sum all subtotals carefully to get the 'totalPrice'. (Example: 40.26 + 22.1 = 66.36).
   - STEP 3: Double-check the math.
     - Check that the subtotal of each flower is equal to the product of the quantity and the price.
     - Check that the sum of the subtotals is equal to the 'totalPrice'.
   
### OUTPUT INSTRUCTIONS
- Use the 'notes' field only to confirm that stock was sufficient or to explain real shortages (where Requested > Stock).
- Use the 'description' field to define the original description received from the user. Do not change it.
  `.trim();

  const userPrompt = `
  User description: "${description.trim()}"
  `;

  try {
    const { output } = await generateText({
      model: openai("o1"), // "gpt-4o-mini" // "gpt-5.2"
      temperature: 0,
      output: Output.object({
        schema: bouquetSchema,
      }),
      system: systemPrompt,
      prompt: userPrompt,
    });

    console.log("output", JSON.stringify(output, null, 2));

    return output;
  } catch (error: unknown) {
    const err = error as { [key: string]: unknown } | undefined;
    // The AI SDK can wrap API errors in a RetryError with nested errors.
    const lastError =
      (err as { lastError?: unknown } | undefined)?.lastError ?? err;
    const statusCode: number | undefined = (
      lastError as { statusCode?: number } | undefined
    )?.statusCode;
    const responseBody: string | undefined = (
      lastError as { responseBody?: string } | undefined
    )?.responseBody;
    const errorCode: string | undefined = (
      lastError as { data?: { error?: { code?: string } } } | undefined
    )?.data?.error?.code;

    // Quota / credits exceeded (429 or explicit insufficient_quota code).
    if (statusCode === 429 || errorCode === "insufficient_quota") {
      throw new Error(
        "The AI service has reached its usage limit. Please check your AI credits or try again in a moment."
      );
    }

    if (statusCode === 400) {
      console.error("Error parsing bouquet description", err);
      throw new Error(
        "The AI could not understand the bouquet description. Please rephrase it and try again."
      );
    }

    console.error(
      "Unexpected error while parsing bouquet description",
      statusCode,
      responseBody ?? err
    );

    throw new Error(
      "Something went wrong while contacting the AI service. Please try again."
    );
  }
}
