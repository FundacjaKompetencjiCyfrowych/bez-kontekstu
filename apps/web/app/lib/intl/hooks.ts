"use client";

import { usePathname, useRouter } from "next/navigation";
import { isLocale, Locale } from "./locale";
import Cookies from "js-cookie";

/** Sets NEXT_LOCALE cookie on the client with the locale selected by the user.*/
const setLocaleCookie = (locale: Locale) => {
  if (document.cookie) {
    Cookies.set("NEXT_LOCALE", locale, { expires: 365, secure: true });
  }
};

/** Returns new pathname with locale prefix */
const getNewLocalePath = (pathname: string, newLocale: Locale) => {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = newLocale;
  return "/" + segments.join("/");
};

/** Returns a locale switcher function which sets locale cookie and updates pathname */
export const useSwitchLocale = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (locale: Locale) => {
    setLocaleCookie(locale);
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
