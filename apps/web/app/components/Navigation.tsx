"use client";
import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/app/lib/types";
import MobileMenuIcon from "@/app/assets/icons/menu_mobile-icon.png";
import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import { useRoutePath, useSwitchLocale } from "@/app/lib/intl/hooks";
import { useIntl } from "@/app/lib/intl/context";
import { Header } from "./Header";
import { cn } from "../lib/utils";
import { FiGlobe } from "react-icons/fi";

const navigationItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "manifest", href: "/manifest" },
  { key: "projects", href: "/projects" },
  { key: "collaborators", href: "/cooperators" },
  { key: "sounds", href: "/sounds" },
  { key: "support", href: "/donators" },
  { key: "contact", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, dictionary } = useIntl();
  const routePath = useRoutePath();
  const switchLocale = useSwitchLocale();

  const getMobilePageTitle = (path: string) => {
    const foundItem = navigationItems.find((item) => {
      if (item.href === path) return true;
      if (item.href === "/projects" && path.startsWith("/projects/")) return true;
      if (item.href === "/cooperators" && path.startsWith("/cooperators/")) return true;
      return false;
    });
    if (foundItem) {
      return dictionary.split[foundItem.key];
    }
    return undefined;
  };

  const mobileTitle = getMobilePageTitle(routePath);

  const isProjectDetailPage = routePath.startsWith("/projects/") && routePath !== "/projects";
  const isCooperatorDetailPage = routePath.startsWith("/cooperators/") && routePath !== "/cooperators";
  const isMobileMenuEnabled = !isProjectDetailPage && !isCooperatorDetailPage;

  const toggleLanguage = () => {
    switchLocale(locale === "pl" ? "en" : "pl");
  };

  const toggleSound = () => {
    console.log("toggleSound");
  };

  return (
    <nav className="w-full flex flex-col justify-center relative z-50 mb-10 xl:mb-0">
      {/* Mobile */}
      {isMobileMenuEnabled && (
        <div className="xl:hidden flex justify-between items-center px-5 overflow-hidden">
          {/* Header */}
          <Header title={mobileTitle} className="xl:hidden" showLogo={false} />
          <button onClick={toggleSound} aria-label={`Toggle sound`} className="cursor-pointer">
            <Image
              src={SoundIcon}
              alt="Sound button"
              width={20}
              height={20}
              className="brightness-30 hover:brightness-100 transition-all duration-300 w-10 h-10"
            />
          </button>

          {/* Menu */}
          <div
            className={cn("absolute -bottom-0 left-0 right-0 border-b-1 border-gray-700 transition-all duration-300 z-30", {
              "translate-y-[200px] md:translate-y-[170px] lg:translate-y-[130px]": isMenuOpen,
            })}
          >
            {/* Collapsible */}
            <div
              className={cn("bg-[#0d0b0e] h-screen absolute bottom-0 left-0 right-0 opacity-0 transition-all duration-300", {
                "opacity-100": isMenuOpen,
              })}
            >
              {/* Menu items */}
              <div className="overflow-hidden pb-5 absolute bottom-0 left-0 right-0">
                {navigationItems.map((item) => (
                  <div key={item.href} className="mx-6">
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-blue-600 block px-3 py-3 sm:landscape:py-1 lg:landscape:py-3 text-xl rounded-md font-defectica"
                      onClick={() => setIsMenuOpen(false)}
                      rel="noopener noreferrer"
                    >
                      {dictionary[item.key].toLocaleUpperCase()}
                    </Link>
                  </div>
                ))}

                {/* Language Toggle Switch */}
                <div className="mx-9 py-4 md:landscape:py-1 lg:landscape:py-3">
                  <div className="flex items-center justify-between">
                    {/* Language Labels */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xl font-defectica transition-colors ${locale === "pl" ? "text-gray-100 font-bold" : "text-gray-100"}`}
                      >
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

                      <span
                        className={`text-xl font-defectica transition-colors ${locale === "en" ? "text-gray-100 font-bold" : "text-gray-100"}`}
                      >
                        EN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Toggler */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute top-[-20px] left-1/2 -translate-x-1/2 flex justify-center cursor-pointer"
            >
              <Image src={MobileMenuIcon} alt="Bez Kontekstu" className={`w-12 h-12 top-[-28px] `} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden xl:flex justify-center py-8 sticky top-0">
        <div className="flex space-x-8 ">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#3f3f41] hover:text-blue-600 text-center text-sm xl:text-xl font-medium transition-colors font-defectica"
              rel="noopener noreferrer"
            >
              {dictionary[item.key].toLocaleUpperCase()}
            </Link>
          ))}

          {/* Language Switch */}
          <button onClick={toggleLanguage} aria-label={`Switch to ${locale === "pl" ? "English" : "Polish"}`} className="cursor-pointer">
            <div className="text-[#3f3f41] w-[85px] flex items-center justify-center gap-3 hover:text-white transition-colors duration-300">
              <FiGlobe size={20} />
              <span className={`text-sm xl:text-lg font-defectica leading-0`}>{locale === "en" ? "EN" : "PL"}</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
