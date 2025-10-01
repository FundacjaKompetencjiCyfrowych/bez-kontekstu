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
 * Client tools for managing locale.
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

  const routePath = (() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] && isLocale(segments[0])) {
      segments.shift();
    }
    return "/" + segments.join("/");
  })();

  return {
    /** Current locale state initialized from pathname */
    locale,
    /** Updates locale state, sets preference cookie and triggers router.push to update pathname*/
    setLocale,
    /** Pathname without locale prefix */
    routePath,
  };
};
