// Client Component - wymagany dla interaktywności (useState, handlePlay)
"use client";
import { useState } from "react";
import { TrackItem } from "@/app/components/TrackItem";
import LogoViolet from "@/app/components/LogoViolet";
import { Metadata } from "next";
import { useIntl } from "@/app/lib/intl/context";

const metadata: Metadata = {
  title: "Beats'n'Pieces - Fundacja Bez Kontekstu",
  description: "Posłuchaj utworów muzycznych Fundacji Bez Kontekstu. Kolekcja dźwięków i kompozycji.",
  keywords: ["muzyka", "beats", "pieces", "fundacja", "bez kontekstu", "dźwięki", "kompozycje"],
};

interface Track {
  id: number;
  title: string;
}

interface SoundsPageState {
  currentTrack: number | null;
}

export default function SoundsPage() {
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
    <div className="flex min-h-screen flex-col bg-[#0d0b0e] px-5 mx-auto">
      <main className="relative flex max-w-7xl flex-1 flex-col xl:mt-24 xl:flex-row">
        <LogoViolet pageType="sounds" isHidden={true} />
        {/* Left column - Title */}
        <section className="xl:w-1/2 xl:flex xl:items-start xl:justify-center xl:pt-20" aria-labelledby="page-title">
          {/* Title only for XL screens */}
          <div className="hidden text-7xl  xl:flex xl:flex-col">
            <h2>BEATS&apos;N&apos;</h2>
            <h2>PIECES</h2>
          </div>
        </section>
        {/* Right column - Tracklist */}
        <section
          className="flex w-full flex-1 items-end justify-center lg:mt-20 md:items-center md:px-5 xl:w-1/2 xl:mt-20 xl:pt-40 xl:self-center xl:justify-start xl:px-0"
          aria-labelledby="tracklist-title"
        >
          <div className="w-full max-w-4xl xl:w-[85%]">
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
      </main>
    </div>
  );
}
