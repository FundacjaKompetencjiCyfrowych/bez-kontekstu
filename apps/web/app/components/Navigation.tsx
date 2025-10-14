"use client";
import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/app/lib/types";
import MobileMenuIcon from "@/app/assets/icons/menu_mobile-icon.png";
import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import { useLocale, useRoutePath } from "../lib/locales";

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

  // Check if we're on a project detail page (e.g., /projects/1, /projects/2, etc.)
  const isProjectDetailPage = routePath.startsWith("/projects/") && routePath !== "/projects";
  const isCooperatorDetailPage = routePath.startsWith("/cooperators/") && routePath !== "/cooperators";

  const isHomePage = routePath === "/";
  const isSoundPage = routePath === "/sounds";

  const toggleLanguage = () => {
    setLocale(locale === "pl" ? "en" : "pl");
  };

  return (
    <nav className="w-full absolute flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16 mt-6">
          {/* Desktop Navigation */}
          <div className="hidden absolute xl:flex items-center space-x-8 ">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#3f3f41] hover:text-blue-600 text-center text-sm xl:text-lg font-medium transition-colors font-defectica"
              >
                {item.title.toLocaleUpperCase()}
              </Link>
            ))}

            {/* Language Toggle Switch */}
            <div className="hidden lg:block space-x-8">
              <div className="flex items-center justify-between">
                {/* Language Labels */}
                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm xl:text-lg font-defectica transition-colors ${locale === "pl" ? "text-[#3f3f41] font-bold" : "text-[#3f3f41]"}`}
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
                    <div className="relative w-10 h-5 bg-neutral-600 border border-white peer-focus:outline-none rounded-full peer flex items-center">
                      <div
                        className={`w-4 h-4 bg-white border border-gray-500 rounded-full transition-all duration-300 transform ${locale === "en" ? "translate-x-5" : "translate-x-0"}`}
                      ></div>
                    </div>
                  </label>

                  <span
                    className={`text-sm xl:text-lg font-defectica transition-colors ${locale === "en" ? "text-[#3f3f41] font-bold" : "text-[#3f3f41]"}`}
                  >
                    ENG
                  </span>
                </div>

                <div className="flex justify-end items-center xl:ml-6">
                  <Image src={SoundIcon} alt="Sound button" width={20} height={20} className="brightness-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Container */}
        {!isProjectDetailPage && !isCooperatorDetailPage && (
          <div className="xl:hidden w-full top-0 flex justify-center">
            {/* Animated menu */}
            <div
              className={`${isMenuOpen ? "fixed" : "absolute"} z-[9999] transition-all duration-200 ease-in-out w-full max-w-full ${isHomePage
                ? (isMenuOpen
                  ? "top-[470px] md:landscape:top-[330px] lg:landscape:top-[470px]"
                  : `top-[150px] md:top-[250px] md:landscape:top-[290px] lg:landscape:top-[38vh]`)
                : (isMenuOpen
                  ? "top-[470px]"
                  : `top-[25vh] ${isSoundPage ? "md:landscape:top-[215px]" : "md:landscape:top-[290px]"} lg:landscape:top-[38vh]`)
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
              <div className="overflow-visible pt-5 bg-[#0d0b0e]">
                {navigationItems.map((item) => (
                  <div key={item.href} className="mx-6">
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-blue-600 block px-3 py-3 md:landscape:py-1 lg:landscape:py-3 text-xl rounded-md font-defectica"
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
                    <div className="flex items-center gap-4">
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
                        <div className="relative w-15 h-8 bg-neutral-600 border border-white peer-focus:outline-none rounded-full peer flex items-center">
                          <div
                            className={`w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 transform ${locale === "en" ? "translate-x-8" : "translate-x-1"}`}
                          ></div>
                        </div>
                      </label>

                      <span
                        className={`text-xl font-defectica transition-colors ${locale === "en" ? "text-gray-100 font-bold" : "text-gray-100"}`}
                      >
                        ENG
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
