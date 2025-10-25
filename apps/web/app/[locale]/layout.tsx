import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "../globals.css";
import { Navigation } from "../components/Navigation";
import { SanityLive } from "../lib/sanity/live";
import { IntlProvider } from "../lib/intl/context";
import { getDictionary } from "../lib/intl/dictionaries/dynamic";
import { Footer } from "../components/Footer";

const defectica = localFont({
  src: [
    {
      path: "../assets/fonts/defectica.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-defectica",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: false,
});

const spaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  fallback: ["Courier New", "Courier", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "FundacjaBez Kontekstu",
  description: "Profesjonalna strona internetowa zbudowana przez Fundację Kompetencji Cyfrowych",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <html lang={locale}>
      <IntlProvider locale={locale} dictionary={dict}>
        <body className={`antialiased text-foreground ${defectica.variable} ${spaceMono.variable}`}>
          <Navigation />
          <div className="bg-[#0d0b0e] max-w-7xl mx-auto">
            <main>{children}</main>
            <Footer dictionary={dict} />
          </div>
        </body>
      </IntlProvider>
      <SanityLive />
    </html>
  );
}
