import { z } from "zod";

const flowerSchema = z.object({
  name: z.string().describe("Flower name"),
  quantity: z
    .number()
    .int()
    .positive()
    .nullable()
    .describe(
      "Number of stems for this flower. For requested flowers this is the quantity explicitly mentioned by the user (or null if they did not specify). For the final bouquet this is the quantity proposed by you."
    ),
  subtotal: z
    .number()
    .describe(
      "Subtotal price of the flower, as the product of quantity and price."
    ),
});

/** Zod schema for AI structured output and shared domain typing. */
export const bouquetSchema = z.object({
  requested: z
    .object({
      description: z
        .string()
        .describe(
          "Description of the bouquet requested by the user. This is the original description received from the user."
        ),
      maxPrice: z
        .number()
        .positive()
        .nullable()
        .describe(
          "Maximum total bouquet price requested by the user, or null if no price was specified."
        ),
      flowers: z
        .array(flowerSchema)
        .describe(
          "Flowers explicitly requested by the user in their description. Use null quantity when the user did not specify a number of stems."
        ),
      extras: z
        .array(z.string())
        .describe(
          "Extras explicitly requested by the user (e.g. bow, wrapping)."
        ),
    })
    .describe(
      "Structured representation of what the user asked for, before any optimisation or stock/price adjustments."
    ),
  bouquet: z
    .object({
      totalPrice: z
        .number()
        .describe(
          "Total price of the proposed bouquet, as the sum of each subtotal price (quantity * price) for each flower in the final bouquet."
        ),
      flowers: z
        .array(flowerSchema)
        .describe(
          "Flowers you propose for the final bouquet, respecting stock and price constraints."
        ),
      extras: z
        .array(z.string())
        .describe(
          "Extras you propose for the final bouquet (e.g. bow, wrapping), possibly including requested extras."
        ),
      calculation_steps: z
        .string()
        .describe("Show the math here step by step."),
      notes: z
        .string()
        .describe(
          "Notes about the final bouquet proposal with the logic used to calculate the flowers and their quantities and the final price. Use this to explain the reasoning to the florist."
        ),
    })
    .describe("Final bouquet you propose to fabricate."),
});

export type ParsedBouquet = z.infer<typeof bouquetSchema>;
