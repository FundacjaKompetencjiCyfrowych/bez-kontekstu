import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/app/components/layout/Navigation";
import { sanityFetch, SanityLive } from "../lib/sanity/live";
import { IntlProvider } from "../lib/intl/context";
import { getDictionary } from "../lib/intl/dictionaries/dynamic";
import { Footer } from "@/app/components/layout/Footer";
import { cache } from "react";
import { settingsQuery } from "../lib/sanity/queries";
import { mapMetadata } from "../lib/sanity/mappers";
import { LenisScrollProvider } from "../lib/lenis";

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

const getSettings = cache(async (locale: string) => {
  return await sanityFetch({ query: settingsQuery, params: { lang: locale } });
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getSettings(locale);
  return mapMetadata(data?.meta);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const { data } = await getSettings(locale);
  return (
    <html lang={locale}>
      <IntlProvider locale={locale} dictionary={dict}>
        <body className={`antialiased bg-background text-foreground ${defectica.variable} ${spaceMono.variable} font-space-mono`}>
          <LenisScrollProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus-brand"
            >
              Skip to main content
            </a>
            <div className="min-h-screen mx-auto flex flex-col w-full max-w-[1430px] overflow-hidden">
              <Navigation />
              <main id="main-content" className="flex flex-col flex-1 relative">
                {children}
              </main>
              <Footer data={data?.footer || {}} />
            </div>
          </LenisScrollProvider>
        </body>
      </IntlProvider>
      <SanityLive />
    </html>
  );
}
