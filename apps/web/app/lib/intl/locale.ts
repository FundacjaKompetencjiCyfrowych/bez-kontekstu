// Locale config
export const supportedLocales = ["en", "pl"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "pl";

/**
 * Checks if the string value is a supported locale.
 */
export const isLocale = (value: string): value is Locale => {
  return supportedLocales.includes(value as Locale);
};
