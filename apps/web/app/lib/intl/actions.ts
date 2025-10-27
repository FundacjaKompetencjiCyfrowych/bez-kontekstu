"use server";

import { cookies } from "next/headers";
import { Locale } from "./locale";

export async function setLocaleCookie(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
