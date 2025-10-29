// Client Component - wymagany dla interaktywności (useState, handlePlay)
"use client";

import { useState } from "react";
import { TrackItem } from "@/app/components/TrackItem";
import { useIntl } from "@/app/lib/intl/context";
import { LogoContainer } from "@/app/components/Logo";

interface Track {
  id: number;
  title: string;
}

// interface SoundsPageState {
//   currentTrack: number | null;
// }

export function SoundsClient() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const { dictionary } = useIntl();
  const tracks: Track[] = [
    { id: 1, title: dictionary.track },
    { id: 2, title: dictionary.track },
    { id: 3, title: dictionary.track },
    { id: 4, title: dictionary.track },
    { id: 5, title: dictionary.track },
    { id: 6, title: dictionary.track },
  ];

  const handlePlay = (index: number) => {
    setCurrentTrack(currentTrack === index ? null : index);
  };

  return (
    <div className="flex flex-col px-5">
      <LogoContainer variant="centered" />
      <div className="relative flex flex-col xl:flex-row xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:w-[90%] xl:h-3/4 xl:justify-center">
        {/* Left column - Title */}
        <section className="xl:w-1/3 xl:flex xl:items-start xl:justify-start" aria-labelledby="page-title">
          {/* Title only for XL screens */}
          <div className="hidden text-7xl xl:flex xl:flex-col">
            <h2>BEATS&apos;N&apos;</h2>
            <h2>PIECES</h2>
          </div>
        </section>

        {/* Right column - Tracklist */}
        <section
          className="flex w-full items-end justify-center lg:mt-20 md:items-center md:px-5 xl:w-1/3 xl:self-center xl:justify-start xl:px-0"
          aria-labelledby="tracklist-title"
        >
          <div className="w-full">
            <h2 id="tracklist-title" className="sr-only">
              {dictionary.tracklist}
            </h2>
            <div role="list" aria-label={dictionary.tracklist}>
              {tracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  title={track.title}
                  isPlaying={currentTrack === index}
                  onPlay={() => handlePlay(index)}
                  aria-label={`${track.title} - ${currentTrack === index ? dictionary.playing : dictionary.play}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
