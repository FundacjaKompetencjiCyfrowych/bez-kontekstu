"use client";
import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/app/lib/types";
import MobileMenuIcon from "@/app/assets/icons/menu_mobile-icon.png";
import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import { useLocale, useRoutePath } from "../lib/locales";
import LanguageIcon from "@/app/assets/icons/lang_glob.png";

const navigationItems: NavItem[] = [
  { title: "STRONA GŁÓWNA", href: "/" },
  { title: "MANIFEST", href: "/manifest" },
  { title: "PROJEKTY", href: "/projects" },
  { title: "WSPÓŁPRACE", href: "/cooperators" },
  { title: "DŹWIĘKI", href: "/sounds" },
  { title: "DLA DARCZYŃCÓW", href: "/donators" },
  { title: "KONTAKT", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const routePath = useRoutePath();

  const isProjectDetailPage = routePath.startsWith("/projects/") && routePath !== "/projects";
  const isCooperatorDetailPage = routePath.startsWith("/cooperators/") && routePath !== "/cooperators";
  const isHomePage = routePath === "/";
  const isSoundPage = routePath === "/sounds";

  const toggleLanguage = () => {
    setLocale(locale === "pl" ? "en" : "pl");
  };

  const toggleSound = () => {
    console.log("toggleSound");
  };

  return (
    <nav className="w-full h-12 absolute flex justify-center z-50">
      <div className="max-w-7xl mt-6 mx-auto">
        {/* Desktop Navigation */}
        <div className="flex justify-center">
          <div className="hidden absolute xl:flex space-x-8 ">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#3f3f41] hover:text-blue-600 text-center text-sm xl:text-xl font-medium transition-colors font-defectica"
              >
                {item.title.toLocaleUpperCase()}
              </Link>
            ))}

            {/* Language */}
            <div className="w-[85px] flex items-center justify-center gap-3">
              {/* Toggle Switch */}
              <button
                onClick={toggleLanguage}
                aria-label={`Switch to ${locale === "pl" ? "English" : "Polish"}`}
                className="cursor-pointer"
              >
                <Image
                  src={LanguageIcon}
                  alt="Language button"
                  width={20}
                  height={20}
                  className="brightness-20 hover:brightness-100 transition-all duration-300"
                />
              </button>
              <span className={`text-sm xl:text-lg font-defectica leading-0 text-[#3f3f41]`}>{locale === "en" ? "EN" : "PL"}</span>

            </div>
            <button onClick={toggleSound} aria-label={`Toggle sound`} className="cursor-pointer">
              <Image
                src={SoundIcon}
                alt="Sound button"
                width={20}
                height={20}
                className="brightness-30 hover:brightness-100 transition-all duration-300"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Container */}
        {!isProjectDetailPage && !isCooperatorDetailPage && (
          <div className="xl:hidden w-full top-0 flex justify-center z-50">
            {/* Animated menu */}
            <div
              className={`${isMenuOpen ? "fixed" : "absolute"} z-[9999] transition-all duration-200 ease-in-out w-full max-w-full ${isHomePage
                ? isMenuOpen
                  ? "top-[470px] md:landscape:top-[330px] lg:landscape:top-[470px]"
                  : `top-[150px] md:top-[250px] md:landscape:top-[290px] lg:landscape:top-[38vh]`
                : isMenuOpen
                  ? "top-[470px]"
                  : `top-[25vh] ${isSoundPage ? "sm:landscape:top-[140px] md:landscape:top-[215px]" : "sm:landscape:top-[180px] md:landscape:top-[290px]"} lg:landscape:top-[38vh]`
                }`}
            >
              {/* Gray bottom line for menu open button */}
              <div className="flex items-center justify-center w-full relative">
                <div className="absolute top-[-33px] left-0 right-0 flex justify-center h-[35px] border-b-1 border-gray-700"></div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-100 absolute top-[-20px] flex justify-center">
                  <Image src={MobileMenuIcon} alt="Bez Kontekstu" className={`w-12 h-12 top-[-28px] `} />
                </button>
              </div>
            </div>

            <div
              className={`fixed z-[9998] bg-[#0d0b0e] w-full transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: "470px",
              }}
            >
              {/* Menu items */}
              <div className="overflow-visible pt-5">
                {navigationItems.map((item) => (
                  <div key={item.href} className="mx-6">
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-blue-600 block px-3 py-3 sm:landscape:py-1 lg:landscape:py-3 text-xl rounded-md font-defectica"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
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
          </div>
        )}
      </div>
    </nav>
  );
}
