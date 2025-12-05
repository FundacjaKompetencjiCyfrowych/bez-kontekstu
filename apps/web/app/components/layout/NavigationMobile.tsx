"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useIntl } from "@/app/lib/intl/context";
import { cn } from "@/app/lib/utils";
import { SoundToggler } from "@/app/components/ui/SoundToggler";
import { LanguageToggler } from "@/app/components/ui/LanguageToggler";
import { MenuIcon } from "@/app/components/layout/MenuIcon";
import { SplitTitle } from "../ui/SplitTitle";
import { navigationItems } from "./Navigation";

interface MobileNavigationProps {
  isMobileMenuEnabled: boolean;
  routePath: string;
}

export function NavigationMobile({ isMobileMenuEnabled, routePath }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOffset, setMenuOffset] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { dictionary } = useIntl();

  // Calculate menu offset dynamically
  const updateMenuOffset = () => {
    const headerHeight = headerRef.current?.getBoundingClientRect().height || 0;
    const listHeight = listRef.current?.getBoundingClientRect().height || 0;
    setMenuOffset(listHeight - headerHeight);
  };

  // Update menu offset initially and on resize
  useEffect(() => {
    setTimeout(() => updateMenuOffset(), 0);
    window.addEventListener("resize", updateMenuOffset);
    return () => window.removeEventListener("resize", updateMenuOffset);
  }, []);

  // Update menu offset on route change
  useEffect(() => {
    setTimeout(() => updateMenuOffset(), 0);
  }, [routePath]);

  const getMobilePageTitle = (path: string) => {
    if (path === "/privacy") {
      return { split: dictionary.split.privacy, sr: dictionary.privacy };
    }
    const foundItem = navigationItems.find((item) => {
      if (item.href === path) return true;
      if (item.href === "/projects" && path.startsWith("/projects/")) return true;
      if (item.href === "/cooperators" && path.startsWith("/cooperators/")) return true;
      return false;
    });
    if (foundItem) {
      return { split: dictionary.split[foundItem.key], sr: dictionary[foundItem.key] };
    }
    return undefined;
  };

  const mobileTitle = getMobilePageTitle(routePath);
  if (!isMobileMenuEnabled) return null;

  return (
    <div className="xl:hidden">
      {/* Header */}
      <div ref={headerRef} className="px-container pb-12 pt-14 flex justify-between items-center">
        <SplitTitle
          mobileText={mobileTitle?.split}
          tabletText={mobileTitle?.split}
          srText={mobileTitle?.sr as string}
          mobile="left"
          tablet="left"
        />
        <div className="text-2xl md:text-3xl pr-5">{/* <SoundToggler /> */}</div>
      </div>

      {/* Menu */}
      <div
        className={cn("absolute bottom-0 left-0 right-0 border-b border-gray-700 transition-transform duration-300 z-30", {
          "translate-y-(--menu-move)": isMenuOpen,
        })}
        style={{ "--menu-move": `${menuOffset}px` } as React.CSSProperties}
      >
        {/* Menu items */}
        <ul
          id="mobile-menu"
          role="menu"
          ref={listRef}
          className={cn(
            "bg-background absolute py-6 bottom-0 left-0 right-0 opacity-0 transition-opacity duration-300 pointer-events-none",
            {
              "opacity-100 pointer-events-auto": isMenuOpen,
            }
          )}
        >
          {navigationItems.map((item) => (
            <li key={item.href} className="mx-6">
              <Link
                href={item.href}
                className="text-gray-200 hover:text-brand-300 block px-3 py-3 sm:landscape:py-1 lg:landscape:py-3 text-xl font-defectica focus-brand"
                onClick={() => setIsMenuOpen(false)}
                rel="noopener noreferrer"
                role="menuitem"
              >
                {dictionary[item.key].toLocaleUpperCase()}
              </Link>
            </li>
          ))}
          <LanguageToggler variant="mobile" />
        </ul>

        {/* Toggler */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center cursor-pointer z-40 focus:outline-none rounded-full focus-brand"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <MenuIcon className="w-13 h-13 md:w-16 md:h-16" />
        </button>
      </div>
    </div>
  );
}
