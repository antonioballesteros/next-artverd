import { Dancing_Script, Elsie, Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const elsie = Elsie({
  weight: ["400", "900"],
  variable: "--font-elsie",
  subsets: ["latin", "latin-ext"],
});

/** Readable script for the ArtVerd “signature” in the hero (softer than display scripts). */
export const artverdSignature = Dancing_Script({
  weight: "600",
  subsets: ["latin", "latin-ext"],
});
