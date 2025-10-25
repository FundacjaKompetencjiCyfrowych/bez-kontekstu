import "server-only";

import { defaultLocale, isLocale } from "../locale";

const dictionaries = {
  en: () => import("./json/en.json").then((module) => module.default),
  pl: () => import("./json/pl.json").then((module) => module.default),
};

/** Server only function to dynamically import the appropriate dictionary */
export const getDictionary = (locale: string) => {
  if (!isLocale(locale)) return dictionaries[defaultLocale]();
  return dictionaries[locale]();
};
