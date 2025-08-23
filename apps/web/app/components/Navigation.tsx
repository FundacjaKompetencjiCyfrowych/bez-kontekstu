"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/app/lib/types";
import MobileMenuIcon from "@/app/assets/icons/menu_mobile-icon.png";
import Image from "next/image";

const navigationItems: NavItem[] = [
  { title: "Strona główna", href: "/" },
  { title: "Manifest", href: "/manifest" },
  { title: "Projekty", href: "/projekty" },
  { title: "Osoby Współpracujące", href: "/cooperators" },
  { title: "Dla Darczyńców", href: "/donors" },
  { title: "Kontakt", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-black w-full flex justify-center">
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
        <div className="md:hidden w-full absolute top-0">
          {/* Animated menu button that slides down */}
          <div
            className={`fixed z-[9999] transition-all duration-1000 ease-in-out ${isMenuOpen ? "top-[350px]" : "top-[30px]"}`}
            style={{
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex items-center justify-center w-[100vw] bg-black">
              <hr className="absolute w-screen size-1 text-red-500" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="z-[9999] text-white hover:text-white focus:outline-none focus:text-white bg-black px-2 py-1 rounded"
              >
                <Image
                  src={MobileMenuIcon}
                  alt="Bez Kontekstu"
                  className={`w-15 h-15 transition-transform duration-1000 ease-in-out ${isMenuOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>
            </div>
          </div>

          {/* Animated menu that gets revealed as button slides down */}
          <div
            className={`fixed z-[9998] bg-black w-full transition-all duration-1000 ease-in-out`}
            style={{
              left: 0,
              right: 0,
              height: "350px",
              clipPath: isMenuOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            }}
          >
            {/* Menu items */}
            <div className="pb-8 pt-4">
              {navigationItems.map((item) => (
                <div key={item.href} className="border-b border-gray-400 mx-3">
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-600 block py-3 rounded-md text-base font-medium transition-colors font-mono"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
