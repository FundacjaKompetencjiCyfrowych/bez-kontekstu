"use client";

import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, isLocale, Locale } from ".";
import { useState } from "react";

/**
 * Sets NEXT_LOCALE cookie on the client with the locale selected by the user.
 */
const setLocaleCookie = (locale: Locale) => {
  if (document.cookie) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax; Secure;`;
  }
};

/**
 * Returns the current locale read from pathname and a function to set the locale.
 * Setting locale will create a preference cookie and update the pathname.
 */
export const useLocale = () => {
  const router = useRouter();
  const pathname = usePathname();

  const initialLocale = (() => {
    const seg = pathname.split("/").filter(Boolean)[0];
    return seg && isLocale(seg) ? seg : defaultLocale;
  })();

  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale); // local state for UI transitions
    setLocaleCookie(newLocale);

    // update path
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = newLocale;
    const newPath = "/" + segments.join("/");
    router.push(newPath + window.location.search);
  };

  return { locale, setLocale };
};
