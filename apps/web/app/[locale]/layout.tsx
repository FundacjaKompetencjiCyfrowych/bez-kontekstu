import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "../globals.css";
import { Navigation } from "../components/Navigation";
import { sanityFetch, SanityLive } from "../lib/sanity/live";
import { IntlProvider } from "../lib/intl/context";
import { getDictionary } from "../lib/intl/dictionaries/dynamic";
import { Footer } from "../components/Footer";
import { cache } from "react";
import { settingsQuery } from "../lib/sanity/queries";
import { mapMetadata } from "../lib/sanity/mappers";
import { SmoothScroll } from "../lib/smoothScroll";

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
        <body className={`antialiased text-foreground ${defectica.variable} ${spaceMono.variable}`}>
          <SmoothScroll>
            <Navigation />
            <div className="min-h-screen bg-[#0d0b0e] max-w-7xl mx-auto flex-1 flex flex-col w-full">
              <main className="flex-1 flex flex-col relative">{children}</main>
              <Footer data={data?.footer || {}} />
            </div>
          </SmoothScroll>
        </body>
      </IntlProvider>
      <SanityLive />
    </html>
  );
}
