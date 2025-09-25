"use client";

import { useState } from "react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { TrackItem } from "@/app/components/TrackItem";
import logoViolet from "@/app/assets/images/logo_violet.png";
import Image from "next/image";

export default function SoundsPage() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);

  // Sample tracks data
  const tracks = ["Nazwa utworu", "Nazwa utworu", "Nazwa utworu", "Nazwa utworu", "Nazwa utworu", "Nazwa utworu"];

  const handlePlay = (index: number) => {
    setCurrentTrack(currentTrack === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b0e]">
      <Header title="BEATS'N' PIECES" className="xl:hidden" />
      <Image
        src={logoViolet}
        alt="Bez Kontekstu"
        className="hidden xl:block absolute blur-[6px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-80 h-80 sm:w-128 sm:h-128 md:w-160 md:h-160 opacity-50"
      />

      <div className="max-w-7xl xl:mt-24 flex-1 flex flex-col xl:flex-row">
        {/* Left column - Title */}
        <div className="xl:w-1/2 xl:flex xl:items-start xl:justify-center xl:pt-20">
          {/* Title only for XL screens */}
          <div className="hidden xl:flex xl:flex-col">
            <h1>BEATS&apos;N&apos;</h1>
            <h1>PIECES</h1>
          </div>
        </div>

        {/* Right column - Tracklist */}
        <div className="xl:w-1/2 xl:mb-10 flex-1 flex items-end justify-center xl:justify-start px-7">
          <div className="max-w-4xl w-full xl:w-3/4 md:w-1/2">
            {tracks.map((track, index) => (
              <TrackItem key={index} title={track} isPlaying={currentTrack === index} onPlay={() => handlePlay(index)} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
