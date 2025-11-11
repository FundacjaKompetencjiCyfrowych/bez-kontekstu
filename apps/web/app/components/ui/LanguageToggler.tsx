"use client";

import { useIntl } from "@/app/lib/intl/context";
import { useSwitchLocale } from "@/app/lib/intl/hooks";
import { FiGlobe } from "react-icons/fi";
import { Toggle } from "@/app/components/ui/Toggle";
import { Locale } from "@/app/lib/intl/locale";

export function LanguageToggler({ variant }: { variant: "mobile" | "desktop" }) {
  const { locale } = useIntl();
  const switchLocale = useSwitchLocale();

  const handleToggle = (value: string) => {
    switchLocale(value as Locale);
  };

  if (variant === "mobile") {
    return (
      <div className="mx-9 py-4 md:landscape:py-1 lg:landscape:py-3">
        <div className="flex items-center justify-between">
          <Toggle option1="pl" option2="en" value={locale} onChange={handleToggle} />
        </div>
      </div>
    );
  }

  // desktop version
  return (
    <button
      onClick={() => switchLocale(locale === "pl" ? "en" : "pl")}
      aria-label={`Switch to ${locale === "pl" ? "English" : "Polish"}`}
      className="cursor-pointer"
    >
      <div className="text-muted hover:text-white flex items-center justify-center gap-3 focus-brand rounded">
        <FiGlobe style={{ width: "1em", height: "1em" }} aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
      </div>
    </button>
  );
}
