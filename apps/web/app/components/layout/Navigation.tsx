"use client";
import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/app/lib/types";
import { useRoutePath } from "@/app/lib/intl/hooks";
import { useIntl } from "@/app/lib/intl/context";
import { Header } from "@/app/components/layout/Header";
import { cn } from "@/app/lib/utils";
import { SoundToggler } from "@/app/components/layout/SoundToggler";
import { LanguageToggler } from "@/app/components/layout/LanguageToggler";
import { MenuIcon } from "@/app/components/layout/MenuIcon";

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
  const { dictionary } = useIntl();
  const routePath = useRoutePath();

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

  return (
    <nav className="w-full flex flex-col justify-center relative z-50 mb-10 xl:mb-0">
      {/* Mobile */}
      {isMobileMenuEnabled && (
        <div className="xl:hidden flex justify-between items-center px-5 overflow-hidden">
          {/* Header */}
          <Header title={mobileTitle} className="xl:hidden" />
          <SoundToggler />

          {/* Menu */}
          <div
            className={cn("absolute -bottom-0 left-0 right-0 border-b-1 border-gray-700 transition-all duration-300 z-30", {
              "translate-y-[260px] sm:landscape:translate-y-[30px] lg:landscape:translate-y-[120px] md:translate-y-[150px]": isMenuOpen,
            })}
          >
            {/* Collapsible */}
            <div
              className={cn(
                "bg-background h-screen absolute bottom-0 left-0 right-0 opacity-0 transition-all duration-300 pointer-events-none",
                {
                  "opacity-100 pointer-events-auto": isMenuOpen,
                }
              )}
            >
              {/* Menu items */}
              <div id="mobile-menu" className="overflow-hidden pb-5 absolute bottom-0 left-0 right-0" role="menu">
                {navigationItems.map((item) => (
                  <div key={item.href} className="mx-6">
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-violet-400 block px-3 py-3 sm:landscape:py-1 lg:landscape:py-3 text-xl rounded-md font-defectica focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50"
                      onClick={() => setIsMenuOpen(false)}
                      rel="noopener noreferrer"
                      role="menuitem"
                    >
                      {dictionary[item.key].toLocaleUpperCase()}
                    </Link>
                  </div>
                ))}

                <LanguageToggler variant="mobile" />
              </div>
            </div>
            {/* Toggler */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon className={`w-12 h-12 top-[-28px] `} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden xl:flex justify-between py-5 items-center" role="menubar">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-muted hover:text-white text-center text-sm xl:text-xl font-medium transition-colors font-defectica focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50 rounded"
            rel="noopener noreferrer"
            role="menuitem"
          >
            {dictionary[item.key].toLocaleUpperCase()}
          </Link>
        ))}

        {/* Language Switch */}
        <LanguageToggler variant="desktop" />
        <SoundToggler />
      </div>
    </nav>
  );
}
