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
    <html lang="pl">
      <body className={`antialiased text-foreground ${defectica.variable} ${spaceMono.variable}`}>
        <Navigation />
        <main className="bg-[#0d0b0e]">{children}</main>
      </body>
    </html>
  );
}
