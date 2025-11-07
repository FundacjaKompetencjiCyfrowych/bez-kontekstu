"use client";

import { useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import { FaSoundcloud } from "react-icons/fa";

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
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={isPlaying}
        className={`relative hover:cursor-pointer md:bg-neutral-600/30 xl:bg-neutral-600/0 w-10 h-10 md:w-14 md:h-14 xl:align-middle rounded-full border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 ${isHovered || isPlaying ? "border-purple-400 shadow-lg shadow-purple-400/30" : "border-purple-400/40 hover:border-purple-400/60"
          }`}
      >
        {isPlaying ? <FiPause width={30} height={30} className="md:w-10 md:h-10" /> : <FiPlay width={30} height={30} className="md:w-10 md:h-10 ml-2" />}
      </button>

      {/* Song Name Field */}
      <div className="flex-1 relative">
        <div
          className={`bg-black/30 flex items-center h-[40px] md:h-[50px] md:bg-neutral-600/30 xl:bg-neutral-600/0 border rounded-2xl px-4 py-2 transition-all duration-300 ${isHovered || isPlaying ? "border-purple-400 shadow-lg shadow-purple-400/30" : "border-purple-400/40 "
            }`}
          className={`bg-black/30 flex items-center h-[40px] md:h-[50px] md:bg-neutral-600/30 xl:bg-neutral-600/0 border rounded-2xl px-4 py-2 transition-all duration-300 ${isHovered || isPlaying ? "border-purple-400 shadow-lg shadow-purple-400/30" : "border-purple-400/40 "
            }`}
        >
          <span className="text-white font-mono text-sm md:text-xl tracking-wider">{title}</span>

          {/* Cloud Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div
              className={`rounded border flex items-center justify-center transition-all duration-300 ${isHovered || isPlaying
                ? "bg-white/20 border-white/50 shadow-sm shadow-white/20"
                : "bg-white/10 border-white/30 hover:bg-white/15"
                }`}
            >
              <FaSoundcloud className="w-6 h-5 md:w-9 md:h-8 py-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
