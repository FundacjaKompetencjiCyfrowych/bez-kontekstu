"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/app/lib/types";
import MobileMenuIcon from "@/app/assets/icons/menu_mobile-icon.png";
import Image from "next/image";

const navigationItems: NavItem[] = [
  { title: "STRONA GLOWNA", href: "/" },
  { title: "MANIFEST", href: "/manifest" },
  { title: "PROJEKTY", href: "/projects" },
  { title: "WSPOLPRACE", href: "/cooperators" },
  { title: "DLA DARZYNCOW", href: "/donators" },
  { title: "KONTAKT", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"PL" | "ENG">("PL");
  const pathname = usePathname();

  // Check if we're on a project detail page (e.g., /projects/1, /projects/2, etc.)
  const isProjectDetailPage = pathname.startsWith("/projects/") && pathname !== "/projects";

  // Function to toggle language
  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "PL" ? "ENG" : "PL"));
  };

  return (
    <nav className="w-full absolute flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden absolute md:flex items-center space-x-8">
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

        {/* Mobile Navigation Container */}
        {!isProjectDetailPage && (
          <div className="md:hidden w-full top-0 flex justify-center">
            {/* Animated menu button with gray line */}
            <div
              className={`absolute top-[120px] z-[9999] transition-all duration-200 ease-in-out w-full max-w-full ${isMenuOpen ? "top-[418px]" : "top-0"}`}
            >
              <div className="flex items-center justify-center w-full relative">
                <div className="absolute top-[-33px] left-0 right-0 flex justify-center h-[35px] border-b-1 border-gray-700"></div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-100 absolute top-[-21px] flex justify-center">
                  <Image
                    src={MobileMenuIcon}
                    alt="Bez Kontekstu"
                    className={`w-12 h-12 top-[-28px] transition-transform opacity-90 duration-500 ease-in-out `}
                  />
                </button>
              </div>
            </div>

            {/* Animated menu  */}
            <div
              className={`fixed z-[9998] bg-[#0d0b0e] w-[100vw] transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              style={{
                top: 20,
                left: 0,
                right: 0,
                height: "400px",
              }}
            >
              {/* Menu items */}
              <div className="overflow-visible bg-[#0d0b0e]">
                {navigationItems.map((item) => (
                  <div key={item.href} className="mx-6">
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-blue-600 block px-3 py-3 text-xl rounded-md font-defectica"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}

                {/* Language Toggle Switch */}
                <div className="mx-9 pt-4">
                  <div className="flex items-center justify-between">
                    {/* Language Labels */}
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xl font-defectica transition-colors ${currentLanguage === "PL" ? "text-gray-100 font-bold" : "text-gray-100"}`}
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
                        <div className="relative w-15 h-8 bg-gray-800 border border-white peer-focus:outline-none rounded-full peer flex items-center">
                          <div
                            className={`w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 transform ${currentLanguage === "ENG" ? "translate-x-8" : "translate-x-1"}`}
                          ></div>
                        </div>
                      </label>

                      <span
                        className={`text-xl font-defectica transition-colors ${currentLanguage === "ENG" ? "text-gray-100 font-bold" : "text-gray-100"}`}
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
