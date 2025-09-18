"use client";

import { useState } from "react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { TrackItem } from "@/app/components/TrackItem";

export default function SoundsPage() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);

  // Sample tracks data
  const tracks = ["Nazwa utworu", "Nazwa utworu", "Nazwa utworu", "Nazwa utworu", "Nazwa utworu", "Nazwa utworu"];

  const handlePlay = (index: number) => {
    setCurrentTrack(currentTrack === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b0e]">
      {/*Title*/}
      <Header title="BEATS'N' PIECES" />
      {/* Tracklist - centered both vertically and horizontally */}
      <div className="mt-24 md:mt-0 flex-1 flex items-center justify-center px-7">
        <div className="max-w-4xl w-full space-y-1">
          {tracks.map((track, index) => (
            <TrackItem key={index} title={track} isPlaying={currentTrack === index} onPlay={() => handlePlay(index)} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
