export * from "./hook";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

// Locale config
export const supportedLocales = ["en", "pl"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "pl";

/**
 * Checks if the string value is a supported locale.
 */
export const isLocale = (value: string): value is Locale => {
  return supportedLocales.includes(value as Locale);
};

/**
 * Determines the locale for the incoming request:
 * 1. *NEXT_LOCALE cookie > Accept-Language header > default*
 */
export const selectLocale = (request: NextRequest) => {
  // Check if there is a locale in the cookie
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // Check if there is a locale in the Accept-Language header
  const headers = Object.fromEntries(request.headers.entries());
  const preferredLocales = new Negotiator({ headers }).languages();

  // Match best locale or use default
  return match(preferredLocales, supportedLocales, defaultLocale) as Locale;
};

/**
 * Redirects the incoming request to the appropriate locale.
 */
export const localeMiddleware = (request: NextRequest) => {
  // Dont redirect if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = supportedLocales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = selectLocale(request);
  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
};
