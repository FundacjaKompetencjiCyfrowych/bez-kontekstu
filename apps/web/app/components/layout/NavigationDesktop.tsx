"use client";
import Link from "next/link";
import { useIntl } from "@/app/lib/intl/context";
import { SoundToggler } from "@/app/components/ui/SoundToggler";
import { LanguageToggler } from "@/app/components/ui/LanguageToggler";
import { navigationItems } from "./Navigation";

export function NavigationDesktop() {
  const { dictionary } = useIntl();

  return (
    <div role="menubar" className="hidden xl:flex justify-between px-container pt-10 pb-14 gap-4 items-center text-[1.5rem] font-defectica">
      {navigationItems.map((item) => (
        <Link
          role="menuitem"
          key={item.href}
          href={item.href}
          className="text-muted hover:text-white text-center"
          rel="noopener noreferrer"
        >
          {dictionary[item.key].toLocaleUpperCase()}
        </Link>
      ))}

      <LanguageToggler variant="desktop" />
      <SoundToggler />
    </div>
  );
}
