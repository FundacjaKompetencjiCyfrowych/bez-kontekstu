"use client";

import { useCurrentLocale } from "../lib/locales";

export function Loading() {
  const locale = useCurrentLocale();
  const message = locale === "en" ? "Loading..." : "Ładowanie...";
  return <div className="bg-[#0d0b0e] min-h-screen font-mono flex items-center justify-center">{message}</div>;
}
