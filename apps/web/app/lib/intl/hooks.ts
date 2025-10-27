"use client";

import { usePathname, useRouter } from "next/navigation";
import { isLocale, Locale } from "./locale";
import { setLocaleCookie } from "./actions";

/** Returns new pathname with locale prefix */
const getNewLocalePath = (pathname: string, newLocale: Locale) => {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = newLocale;
  return "/" + segments.join("/");
};

/** Returns a locale switcher function which triggers a router.push with new pathname */
export const useSwitchLocale = () => {
  const router = useRouter();
  const pathname = usePathname();

  return async (locale: Locale) => {
    await setLocaleCookie(locale); // server action to set cookie
    router.push(getNewLocalePath(pathname, locale));
  };
};

/** Returns pathname without locale prefix */
export const useRoutePath = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) {
    segments.shift();
  }
  return "/" + segments.join("/");
};
