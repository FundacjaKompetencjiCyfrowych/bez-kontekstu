import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";

const defectica = localFont({
  src: [
    {
      path: "./assets/fonts/defectica.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/defectica.ttf",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${defectica.className} ${spaceMono.className} h-full`}>
      <body className="antialiased h-full flex flex-col bg-background text-foreground font-defectica">
        <Navigation />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
