import { CookieConsentBanner } from "@/components/legal/CookieConsentBanner";
import { CookieConsentProvider } from "@/components/legal/CookieConsentProvider";
import { VercelTrackingIfConsented } from "@/components/legal/VercelTrackingIfConsented";
import { CartProvider } from "@/components/shop/CartProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { elsie, geistMono, geistSans } from "@/lib/fonts";
import type { Metadata } from "next";
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
      <body className="flex min-h-full flex-col font-sans">
        <CookieConsentProvider>
          <CartProvider>
            <SiteHeader />
            <main className="min-w-0 flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
          <CookieConsentBanner />
          <VercelTrackingIfConsented />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
