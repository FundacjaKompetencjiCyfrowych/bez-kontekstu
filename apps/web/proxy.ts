import { NextResponse, NextRequest } from "next/server";
import { localeMiddleware } from "./app/lib/intl/middleware";

const middlewares = [localeMiddleware];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip _next, api, and public files (like favicon.ico, robots.txt, images, etc.)
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || /\.[^\/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  for (const fn of middlewares) {
    const response = fn(request);
    if (response) return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal paths and API routes
    "/((?!_next|api).*)",
  ],
};
