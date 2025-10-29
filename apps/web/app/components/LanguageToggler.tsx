"use client";

import { useIntl } from "@/app/lib/intl/context";
import { useSwitchLocale } from "@/app/lib/intl/hooks";
import { FiGlobe } from "react-icons/fi";

export function LanguageToggler({ variant }: { variant: "mobile" | "desktop" }) {
  const { locale } = useIntl();
  const switchLocale = useSwitchLocale();
  const toggleLanguage = () => {
    switchLocale(locale === "pl" ? "en" : "pl");
  };

  if (variant === "mobile") {
    return (
      <div className="mx-9 py-4 md:landscape:py-1 lg:landscape:py-3">
        <div className="flex items-center justify-between">
          {/* Language Labels */}
          <div className="flex items-center gap-3">
            <span className={`text-xl font-defectica transition-colors ${locale === "pl" ? "text-gray-100 font-bold" : "text-gray-100"}`}>
              PL
            </span>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={locale === "en"}
                onChange={toggleLanguage}
                className="sr-only peer"
                aria-label={`Switch to ${locale === "pl" ? "English" : "Polish"}`}
              />
              <div className="relative w-13 h-7 bg-neutral-600 peer-focus:outline-none rounded-full peer flex items-center">
                <div
                  className={`w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 transform ${locale === "en" ? "translate-x-7" : "translate-x-1"}`}
                ></div>
              </div>
            </label>

            <span className={`text-xl font-defectica transition-colors ${locale === "en" ? "text-gray-100 font-bold" : "text-gray-100"}`}>
              EN
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button onClick={toggleLanguage} aria-label={`Switch to ${locale === "pl" ? "English" : "Polish"}`} className="cursor-pointer">
      <div className="text-[#3f3f41] flex items-center justify-center gap-3 hover:text-white transition-colors duration-300">
        <FiGlobe size={20} />
        <span className={`text-sm xl:text-lg font-defectica leading-0 pt-1`}>{locale === "en" ? "EN" : "PL"}</span>
      </div>
    </button>
  );
}
