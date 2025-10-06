import { NextResponse, NextRequest } from "next/server";
import { localeMiddleware } from "./app/lib/locales";

const middlewares = [localeMiddleware];

export function middleware(request: NextRequest) {
  for (const fn of middlewares) {
    const response = fn(request);
    if (response) return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal paths
    "/((?!_next).*)",
  ],
};
