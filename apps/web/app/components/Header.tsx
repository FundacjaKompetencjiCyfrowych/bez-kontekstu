"use client";

import { useState } from "react";
import Image from "next/image";
import SoundIcon from "@/app/assets/icons/sound_button.png";
import LogoViolet from "@/app/components/LogoViolet";
import { useRoutePath } from "../lib/locales";

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showTitle?: boolean;
  className?: string;
}

export function Header({ title = "", showLogo = true, showTitle = true, className }: HeaderProps) {
  // Split title into words for vertical display
  const titleWords = title.split(" ");

  const routePath = useRoutePath();
  const isSoundPage = routePath !== "/sounds";

  return (
    <>
      {/* Title Section */}
      {showTitle && (
        <div className={`flex justify-between items-center my-10 mx-4 md:my-12 md:mx-6 z-10 ${className}`}>
          <div className="flex flex-col">
            {titleWords.map((word, index) => (
              <h1 key={index}>{word}</h1>
            ))}
          </div>
          {isSoundPage && <Image src={SoundIcon} alt="Sound button" width={30} height={30} className="md:w-10 md:h-10" />}
        </div>
      )}

      {/* Violet logo - sticky background */}
      {showLogo && (
        <div className={`sticky top-1/2 h-0 z-0 ${className}`}>
          <LogoViolet />
        </div>
      )}
    </>
  );
}
