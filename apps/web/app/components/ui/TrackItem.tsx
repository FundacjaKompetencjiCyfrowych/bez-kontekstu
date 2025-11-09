"use client";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { FiPlay, FiPause } from "react-icons/fi";
import { FaSoundcloud } from "react-icons/fa";
import { cn } from "@/app/lib/utils";

interface TrackItemProps {
  title: string;
  isPlaying?: boolean;
  duration?: number;
  progress?: number; // 0-100
  trackUrl?: string;
  onPlay?: () => void;
  onSeek?: (newProgress: number) => void;
}

const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function TrackItem({ title, isPlaying = false, duration, progress = 0, trackUrl, onPlay, onSeek }: TrackItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    if (wrapper && text) {
      const checkOverflow = () => {
        const overflowing = text.scrollWidth > wrapper.clientWidth + 2;
        setIsOverflowing(overflowing);
      };
      checkOverflow();
      window.addEventListener("resize", checkOverflow);
      return () => {
        window.removeEventListener("resize", checkOverflow);
      };
    }
  }, [title]);

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onSeek) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = Math.min(Math.max((clickX / width) * 100, 0), 100);
    onSeek(newProgress);
  };

  const materialStyles = cn("glass transition-all duration-300");
  const activeStyles = cn("border-brand-200 shadow-lg shadow-brand-200/30");
  const inactiveStyles = cn("border-brand-200/40 hover:border-brand-200/60");
  const iconStyles = cn("absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2");

  return (
    <div
      className={cn(
        `flex items-center space-x-4 py-3 px-2 hover:bg-black/10 transition-all duration-300 rounded-lg group`,
        `text-white font-space-mono text-[1rem] leading-[1.5rem] md:text-[1.25rem] md:leading-[2rem]`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Play Button */}
      <button
        onClick={onPlay}
        className={cn(
          materialStyles,
          `relative hover:cursor-pointer w-[3.2em] h-[3.2em] rounded-full flex items-center justify-center`,
          isHovered || isPlaying ? activeStyles : inactiveStyles
        )}
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={isPlaying}
      >
        {isPlaying ? <FiPause className={cn(iconStyles)} /> : <FiPlay className={cn(iconStyles, "pl-[4px] pt-[2px]")} />}
      </button>

      {/* Title + Progress container */}
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        className={cn(
          materialStyles,
          `relative flex-1 overflow-hidden rounded-2xl px-4 py-[0.6rem] pr-14 cursor-pointer`,
          isHovered || isPlaying ? activeStyles : inactiveStyles
        )}
      >
        {/* Progress fill */}
        {progress > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 bg-brand-200/30 transition-all duration-100 ease-linear rounded-l-2xl"
            style={{ width: `${progress}%` }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center">
          <div ref={wrapperRef} className="overflow-hidden flex-1">
            <div
              ref={textRef}
              className={cn("inline-block whitespace-nowrap", (isHovered || isPlaying) && isOverflowing && "animate-scroll-text")}
            >
              {title}
            </div>
          </div>

          {/* Remaining time */}
          {duration && (
            <span className="text-white/60 text-[0.75rem] md:text-[0.875rem] tracking-wider ml-3 mr-3 whitespace-nowrap">
              {formatDuration(duration - duration * (progress / 100))}
            </span>
          )}
        </div>

        {/* SoundCloud icon */}
        {trackUrl ? (
          <a
            href={trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} on SoundCloud`}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1/2 -translate-y-1/2 right-0 -translate-x-1/2 z-10 hover:scale-110 transition-transform duration-200"
          >
            <FaSoundcloud fill="black" className="w-[1.6em] h-[1.6em] p-1 bg-white rounded-md" />
          </a>
        ) : (
          <FaSoundcloud
            fill="black"
            className="absolute top-1/2 -translate-y-1/2 right-0 -translate-x-1/2 w-[1.6em] h-[1.6em] p-1 bg-white rounded-md z-10"
          />
        )}
      </div>
    </div>
  );
}
