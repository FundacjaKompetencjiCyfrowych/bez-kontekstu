"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/app/lib/types";
import MobileMenuIcon from "@/app/assets/icons/menu_mobile-icon.png";
import Image from "next/image";

const navigationItems: NavItem[] = [
  { title: "STRONA GŁÓWNA", href: "/" },
  { title: "MANIFEST", href: "/manifest" },
  { title: "PROJEKTY", href: "/projects" },
  { title: "WSPÓŁPRACE", href: "/cooperators" },
  { title: "DLA DARCZYŃCÓW", href: "/donators" },
  { title: "KONTAKT", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"PL" | "ENG">("PL");
  const pathname = usePathname();

  // Check if we're on a project detail page (e.g., /projects/1, /projects/2, etc.)
  const isProjectDetailPage = pathname.startsWith("/projects/") && pathname !== "/projects";

  // Check if we're on the home page
  const isHomePage = pathname === "/";

  // Check if we're on any other page (not home, not project detail)
  const isOtherPage = !isHomePage && !isProjectDetailPage;

  // Function to toggle language
  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "PL" ? "ENG" : "PL"));
  };

  return (
    <nav className="w-full absolute flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          {/* Desktop Navigation - only show on large screens */}
          <div className="hidden absolute lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-center text-sm font-medium transition-colors font-mono"
              >
                {item.title.toLocaleUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Container - show on mobile and tablets */}
        {!isProjectDetailPage && (
          <div className="lg:hidden w-full top-0 flex justify-center">
            {/* Animated menu button with gray line */}
            <div
              className={`${isMenuOpen ? "fixed" : "absolute"} z-[9999] transition-all duration-200 ease-in-out w-full max-w-full ${
                isHomePage
                  ? isMenuOpen
                    ? "top-[418px] md:top-[550px]"
                    : "top-[120px] md:top-[150px]"
                  : isMenuOpen
                    ? "top-[400px] md:top-[480px]"
                    : "top-[220px] md:top-[250px]"
              }`}
            >
              <div className="flex items-center justify-center w-full relative">
                <div className="absolute top-[-33px] left-0 right-0 flex justify-center h-[35px] border-b-1 border-gray-700"></div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-100 absolute top-[-21px] flex justify-center">
                  <Image
                    src={MobileMenuIcon}
                    alt="Bez Kontekstu"
                    className={`w-12 h-12 md:w-16 md:h-16 top-[-28px] md:top-[-36px] transition-transform opacity-90 duration-500 ease-in-out `}
                  />
                </button>
              </div>
            </div>

            {/* Animated menu  */}
            <div
              className={`fixed z-[9998] h-[410px] top-0 left-0 right-0 bg-[#0d0b0e] w-[100vw] transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"} md:h-[550px]`}
            >
              {/* Menu items */}
              <div className="overflow-visible pt-5 md:pt-8 bg-[#0d0b0e]">
                {navigationItems.map((item) => (
                  <div key={item.href} className="mx-6 md:mx-8 md:text-center">
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-blue-600 block px-3 py-3 md:py-4 text-xl md:text-2xl rounded-md font-defectica"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}

                {/* Language Toggle Switch */}
                <div className="mx-9 md:mx-auto pt-4 md:pt-6">
                  <div className="flex items-center justify-between md:justify-center">
                    {/* Language Labels */}
                    <div className="flex items-center gap-4 md:gap-6">
                      <span
                        className={`text-xl md:text-2xl font-defectica transition-colors ${currentLanguage === "PL" ? "text-gray-100 font-bold" : "text-gray-100"}`}
                      >
                        PL
                      </span>

                      {/* Toggle Switch */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentLanguage === "ENG"}
                          onChange={toggleLanguage}
                          className="sr-only peer"
                          aria-label={`Switch to ${currentLanguage === "PL" ? "English" : "Polish"}`}
                        />
                        <div className="relative w-15 h-8 md:w-20 md:h-10 bg-neutral-600 border border-white peer-focus:outline-none rounded-full peer flex items-center">
                          <div
                            className={`w-5 h-5 md:w-6 md:h-6 bg-white border border-gray-300 rounded-full transition-all duration-300 transform ${currentLanguage === "ENG" ? "translate-x-8 md:translate-x-10" : "translate-x-1"}`}
                          ></div>
                        </div>
                      </label>

                      <span
                        className={`text-xl md:text-2xl font-defectica transition-colors ${currentLanguage === "ENG" ? "text-gray-100 font-bold" : "text-gray-100"}`}
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
