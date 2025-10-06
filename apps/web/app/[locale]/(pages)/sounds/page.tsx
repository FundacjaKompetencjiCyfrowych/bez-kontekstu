"use client";

import { useState } from "react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { TrackItem } from "@/app/components/TrackItem";
import LogoViolet from "@/app/components/LogoViolet";

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
      <LogoViolet />

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
        <div className="xl:w-1/2 flex-1 flex items-center justify-center xl:justify-start xl:self-center xl:mt-20 px-7 xl:px-0">
        <div className="max-w-4xl w-full xl:w-[85%] md:w-1/2">
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
