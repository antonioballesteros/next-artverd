"use server";

import type { ParsedBouquet } from "@/lib/bouquet/parsed-bouquet-schema";
import { openai } from "@ai-sdk/openai";
import { generateImage } from "ai";

/**
 * DALL·E 3 only allows fixed sizes; `1024x1792` is the portrait (vertical) option.
 * GPT-Image-1 only allows fixed sizes; `1024x1536` is the portrait (vertical) option.
 */
const BOUQUET_IMAGE_MODEL = "gpt-image-1-mini" as const; // gpt-image-1 // gpt-image-1-mini // dall-e-3 // gpt-4o-image
const BOUQUET_IMAGE_SIZE = "1024x1536" as const;
const BOUQUET_IMAGE_QUALITY = "low" as const; // low // standard // hd
const BOUQUET_IMAGE_COUNT = 2;

function formatBouquetFlowersForImagePrompt(
  flowers: ParsedBouquet["bouquet"]["flowers"]
): string {
  if (flowers.length === 0) {
    return "Use the description only; no explicit flower list was provided.";
  }
  const flowersTable = [
    "| Flower | Exact stem count (mandatory) |",
    "| :--- | :--- |",
    ...flowers.map((flower) => {
      const stems = flower.quantity != null ? String(flower.quantity) : "—";
      return `| ${flower.name} | ${stems} |`;
    }),
  ].join("\n");

  const perFlowerMandatory = flowers
    .filter(
      (flower) =>
        flower.quantity != null &&
        Number.isFinite(flower.quantity) &&
        flower.quantity > 0
    )
    .map((flower) => {
      const n = flower.quantity as number;
      const stemWord = n === 1 ? "stem" : "stems";
      return (
        `- **${flower.name}**: Show **exactly ${n}** clearly separate, fully visible ${stemWord} ` +
        `(distinct blooms or flower heads). The customer must be able to count ${n} individual ${flower.name} ${stemWord} ` +
        `in the frame — not ${n - 1}, not ${n + 1}. Do not hide extras behind foliage or merge blooms into one.`
      );
    });

  const countChecklist = flowers
    .filter(
      (flower) =>
        flower.quantity != null &&
        Number.isFinite(flower.quantity) &&
        flower.quantity > 0
    )
    .map(
      (flower) => `  - ${flower.name}: ${flower.quantity} (must match exactly)`
    )
    .join("\n");

  const hasNumericStemCounts = perFlowerMandatory.length > 0;

  const intro = hasNumericStemCounts
    ? "The table below is the shop specification. **You must match every numeric stem count exactly.** " +
      "Under-counting or over-counting any flower type makes the image unacceptable."
    : "Include every flower type from the table. Numeric stem counts are not specified (—); use amounts consistent with the client description while showing each listed type clearly.";

  const sections: string[] = [
    "### MANDATORY STEM COUNTS",
    intro,
    "",
    flowersTable,
  ];

  if (hasNumericStemCounts) {
    sections.push(
      "",
      "### Per-type requirements (follow every bullet)",
      ...perFlowerMandatory,
      "",
      "### Final checklist before you finish the image",
      "Mentally count each flower type in the bouquet and confirm:",
      countChecklist
    );
  }

  return sections.join("\n");
}

function formatBouquetExtrasForImagePrompt(
  extras: ParsedBouquet["bouquet"]["extras"]
): string {
  if (extras.length === 0) {
    return "";
  }
  const extrasTable = [
    "| Extra |",
    "| :--- |",
    ...extras.map((extra) => `| ${extra} |`),
  ].join("\n");

  return [
    "### EXTRAS (mandatory where applicable)",
    "Include every item below if it would be visible in a real bouquet photo. Do not omit listed extras.",
    "",
    extrasTable,
  ].join("\n");
}

export async function generateBouquetImage(
  parsedBouquet: ParsedBouquet
): Promise<string[]> {
  console.log("parsedBouquet", parsedBouquet);
  const flowersSection = formatBouquetFlowersForImagePrompt(
    parsedBouquet.bouquet.flowers
  );
  const extrasSection = formatBouquetExtrasForImagePrompt(
    parsedBouquet.bouquet.extras
  );

  const prompt = `
### ROLE
You are a professional florist rendering a **spec-accurate** product photo for a real order.

### INSTRUCTIONS
Generate one professional, photorealistic bouquet image.

**Priority order (do not invert):**
1. **Exact stem counts** from the bouquet specification below override aesthetics, symmetry shortcuts, or “prettier” compositions.
2. Then match mood, style, and occasion from the client description.
3. Keep lighting and background natural; do not sacrifice countable stems for artistic blur or heavy occlusion.

If any instruction conflicts with the stem-count table, **follow the table**.

### CLIENT DESCRIPTION
Mood, style, occasion: ${parsedBouquet.requested.description}

### BOUQUET SPECIFICATION
${flowersSection}
${extrasSection}
`.trim();

  console.log("prompt", prompt);

  // return "https://picsum.photos/200/300";

  const { images } = await generateImage({
    model: openai.image(BOUQUET_IMAGE_MODEL),
    prompt,
    n: BOUQUET_IMAGE_COUNT,
    size: BOUQUET_IMAGE_SIZE,
    providerOptions: {
      openai: {
        quality: BOUQUET_IMAGE_QUALITY,
      },
    },
  });

  return images.map((file) => `data:${file.mediaType};base64,${file.base64}`);
}
