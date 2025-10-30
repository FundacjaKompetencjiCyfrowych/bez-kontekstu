"use client";

import { useState } from "react";
import { TrackItem } from "@/app/components/sounds/TrackItem";
import { cn } from "@/app/lib/utils";

interface Track {
  id: number;
  title: string;
}

interface SoundsClientProps {
  tracks: Track[];
  dictionary: {
    tracklist: string;
    playing: string;
    play: string;
  };
  className?: string;
}

export function SoundsClient({ tracks, dictionary, className }: SoundsClientProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);

  const toggleTrack = (index: number) => {
    setCurrentTrack(currentTrack === index ? null : index);
  };

  return (
    <div role="list" aria-label={dictionary.tracklist} className={cn("space-y-3", className)}>
      {tracks.map((track, index) => (
        <TrackItem
          key={track.id}
          title={track.title}
          isPlaying={currentTrack === index}
          onPlay={() => toggleTrack(index)}
          aria-label={`${track.title} - ${currentTrack === index ? dictionary.playing : dictionary.play}`}
        />
      ))}
    </div>
  );
}
