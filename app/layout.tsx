import type { Metadata } from "next";
import { elsie, geistMono, geistSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Art Verd · La teva floristeria a Terrassa",
    template: "%s · Art Verd",
  },
  description:
    "Floristeria Art Verd: rams, plantes i decoració a Terrassa. Passió per les flors des de l’any 2000. Lliuraments a domicili.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ca"
      className={`${geistSans.variable} ${geistMono.variable} ${elsie.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
