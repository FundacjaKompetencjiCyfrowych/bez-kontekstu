import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, Locale, supportedLocales } from "./locale";

/**
 * Sets the NEXT_LOCALE cookie on the response.
 */
const setLocaleCookie = (response: NextResponse, locale: Locale) => {
  response.cookies.set("NEXT_LOCALE", locale, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: "lax",
    path: "/",
  });
};

/**
 * Determines the locale for the incoming request:
 * 1. NEXT_LOCALE cookie > Accept-Language header > default
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
 * Redirects the incoming request to the appropriate locale and syncs cookie.
 */
export const localeMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Extract locale from pathname if present
  const pathnameLocale = supportedLocales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameLocale) {
    // Pathname has locale - sync cookie to match URL
    const response = NextResponse.next();
    setLocaleCookie(response, pathnameLocale);
    return response;
  }

  // No locale in pathname - redirect to locale-prefixed URL
  const locale = selectLocale(request);
  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  setLocaleCookie(response, locale);

  return response;
};
