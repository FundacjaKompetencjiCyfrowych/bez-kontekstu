"use client";

import { createContext, ReactNode, useContext } from "react";
import { defaultLocale, isLocale, Locale } from "./locale";
import { Dictionary } from "./dictionaries/type";

export const IntlContext = createContext<{ locale: Locale; dictionary: Dictionary } | null>(null);

/** Internationalization context provider */
export const IntlProvider = ({ children, locale, dictionary }: { children: ReactNode; locale: string; dictionary: Dictionary }) => {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  return <IntlContext value={{ locale: loc, dictionary }}>{children}</IntlContext>;
};

/** Internationalization hook used for reading the current locale and dictionary in client components */
export const useIntl = () => {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error("useIntl must be used within an IntlProvider");
  }
  return context;
};
