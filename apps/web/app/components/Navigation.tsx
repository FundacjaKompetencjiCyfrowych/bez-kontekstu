"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/app/lib/types";

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
        <div className="flex justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-center text-sm font-medium transition-colors"
              >
                {item.title.toLocaleUpperCase()}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center absolute right-[5px] top-[5px]">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-white focus:outline-none focus:text-white">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 pb-8 z-50 bg-black w-full">
            {navigationItems.map((item) => (
              <div className="border-b border-gray-400 mx-3">
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-600 block py-1 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
