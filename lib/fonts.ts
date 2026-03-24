import { Elsie, Geist, Geist_Mono } from "next/font/google";

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
