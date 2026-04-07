import { CookieConsentProvider } from "@/components/legal/CookieConsentProvider";
import { VercelTrackingIfConsented } from "@/components/legal/VercelTrackingIfConsented";
import { CartProvider } from "@/components/shop/CartProvider";
import { elsie, geistMono, geistSans } from "@/lib/fonts";
import { getLocale } from "next-intl/server";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${elsie.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <CookieConsentProvider>
          <CartProvider>{children}</CartProvider>
          <VercelTrackingIfConsented />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
