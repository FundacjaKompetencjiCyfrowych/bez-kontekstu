"use client";

import { useState } from "react";
import Image from "next/image";
import PlayIcon from "@/app/assets/icons/play.png";
import CloudIcon from "@/app/assets/icons/cloud.png";

interface TrackItemProps {
  title: string;
  isPlaying?: boolean;
  onPlay?: () => void;
}

export function TrackItem({ title, isPlaying = false, onPlay }: TrackItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center space-x-4 py-3 px-2 hover:bg-black/10 transition-all duration-300 rounded-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Play Button */}
      <button
        onClick={onPlay}
        className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isHovered || isPlaying ? "border-purple-400 shadow-lg shadow-purple-400/30" : "border-purple-400/40 hover:border-purple-400/60"
        }`}
      >
        <Image src={PlayIcon} alt="Play" width={35} height={35} />
      </button>

      {/* Song Name Field */}
      <div className="flex-1 relative">
        <div
          className={`bg-black/30 border rounded-2xl px-4 py-3 transition-all duration-300 ${
            isHovered || isPlaying ? "border-purple-400 shadow-lg shadow-purple-400/30" : "border-purple-400/40 hover:border-purple-400/60"
          }`}
        >
          <span className="text-white font-mono text-sm md:text-base tracking-wider">{title}</span>

          {/* Cloud Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div
              className={`rounded border flex items-center justify-center transition-all duration-300 ${
                isHovered || isPlaying
                  ? "bg-white/20 border-white/50 shadow-sm shadow-white/20"
                  : "bg-white/10 border-white/30 hover:bg-white/15"
              }`}
            >
              <Image src={CloudIcon} alt="Cloud" width={30} height={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
