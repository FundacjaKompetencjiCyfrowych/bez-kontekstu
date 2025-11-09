"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TrackItem } from "@/app/components/ui/TrackItem";
import { cn } from "@/app/lib/utils";

// SoundCloud Widget API types
type SoundCloudWidgetEvent = "ready" | "play" | "pause" | "finish" | "error";

type SoundCloudWidgetEventData = {
  ready: undefined;
  play: undefined;
  pause: undefined;
  finish: undefined;
  error: unknown;
};

interface SoundCloudWidget {
  play(): void;
  pause(): void;
  toggle(): void;
  load(url: string, options?: { auto_play?: boolean }): void;
  bind<T extends SoundCloudWidgetEvent>(event: T, callback: (data?: SoundCloudWidgetEventData[T]) => void): void;
  unbind(event: string): void;
  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  seekTo(position: number): void;
}

interface SoundCloudWidgetConstructor {
  new (iframe: HTMLIFrameElement): SoundCloudWidget;
}

interface SoundCloudNamespace {
  Widget: SoundCloudWidgetConstructor;
}

declare global {
  interface Window {
    SC?: SoundCloudNamespace;
  }
}

interface SoundsClientProps {
  tracks: string[]; // now just array of URLs
  dictionary: {
    tracklist: string;
    playing: string;
    play: string;
  };
  className?: string;
}

const TIMEOUTS = {
  IFRAME_LOAD: 400,
  WIDGET_READY: 300,
  DURATION_FETCH: 300,
  AUTO_PLAY: 300,
  RETRY_DELAY: 300,
  TRACK_DELAY: 200,
  PROGRESS_UPDATE: 100,
  PROGRESS_START_DELAY: 100,
  PLAY_EVENT_DELAY: 150,
  API_CHECK_INTERVAL: 100,
  API_LOAD_DELAY: 100,
  TEMP_IFRAME_LOAD: 500,
} as const;

const MAX_RETRY_ATTEMPTS = 3;
const WIDGET_EVENTS = ["ready", "play", "pause", "finish", "error"] as const;

const getSoundCloudEmbedUrl = (trackUrl: string): string => {
  const encodedUrl = encodeURIComponent(trackUrl);
  return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;
};

const updateMap = <K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> => {
  const newMap = new Map(map);
  newMap.set(key, value);
  return newMap;
};

const fetchTrackTitle = async (trackUrl: string): Promise<string | null> => {
  try {
    const oembedUrl = `https://soundcloud.com/oembed?url=${encodeURIComponent(trackUrl)}&format=json`;
    const response = await fetch(oembedUrl);
    if (!response.ok) return null;

    const data = await response.json();
    return data.title || null;
  } catch (error) {
    console.error("Error fetching track title:", error);
    return null;
  }
};

export function SoundsClient({ tracks, dictionary, className }: SoundsClientProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDurations, setTrackDurations] = useState<Map<number, number>>(new Map());
  const [trackTitles, setTrackTitles] = useState<Map<number, string>>(new Map());
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);

  // Load SoundCloud Widget API
  useEffect(() => {
    if (window.SC?.Widget) {
      setIsApiReady(true);
      return;
    }

    const existingScript = document.getElementById("soundcloud-widget-api");
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.SC?.Widget) {
          setIsApiReady(true);
          clearInterval(checkInterval);
        }
      }, TIMEOUTS.API_CHECK_INTERVAL);
      return () => clearInterval(checkInterval);
    }

    const script = document.createElement("script");
    script.id = "soundcloud-widget-api";
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.SC?.Widget) setIsApiReady(true);
      }, TIMEOUTS.API_LOAD_DELAY);
    };
    document.head.appendChild(script);
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const calculateProgress = useCallback((position: number, duration: number): number => {
    if (duration <= 0 || position < 0) return 0;
    return Math.min(100, Math.max(0, (position / duration) * 100));
  }, []);

  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) return;

    const updateProgress = () => {
      if (!widgetRef.current) return stopProgressTracking();

      widgetRef.current.getPosition((position: number) => {
        if (!widgetRef.current || position < 0) return;

        widgetRef.current.getDuration((duration: number) => {
          if (duration <= 0) return;
          setPlaybackProgress(calculateProgress(position, duration));
        });
      });
    };

    updateProgress();
    progressIntervalRef.current = setInterval(updateProgress, TIMEOUTS.PROGRESS_UPDATE);
  }, [calculateProgress, stopProgressTracking]);

  const resetTrackState = useCallback(() => {
    setIsPlaying(false);
    setPlaybackProgress(0);
    stopProgressTracking();
  }, [stopProgressTracking]);

  const tryPlayTrack = useCallback(
    (attempt: number = 0) => {
      if (attempt > MAX_RETRY_ATTEMPTS) return console.error("Failed to play track");

      if (!widgetRef.current) return;

      try {
        widgetRef.current.play();
        setIsPlaying(true);
        setTimeout(() => startProgressTracking(), TIMEOUTS.PROGRESS_START_DELAY);
      } catch {
        setTimeout(() => tryPlayTrack(attempt + 1), TIMEOUTS.RETRY_DELAY * (attempt + 1));
      }
    },
    [startProgressTracking]
  );

  const updateTrackDuration = useCallback((trackIndex: number, duration: number) => {
    if (trackIndex !== -1 && duration > 0) {
      setTrackDurations((prev) => updateMap(prev, trackIndex, duration));
    }
  }, []);

  const bindWidgetEvents = useCallback(
    (trackIndex: number, autoPlay: boolean) => {
      if (!widgetRef.current) return;

      widgetRef.current.bind("ready", () => {
        setTimeout(() => {
          widgetRef.current?.getDuration((duration: number) => updateTrackDuration(trackIndex, duration));
        }, TIMEOUTS.DURATION_FETCH);

        if (autoPlay) setTimeout(() => tryPlayTrack(), TIMEOUTS.AUTO_PLAY);
      });

      widgetRef.current.bind("play", () => {
        setIsPlaying(true);
        setTimeout(startProgressTracking, TIMEOUTS.PLAY_EVENT_DELAY);
      });
      widgetRef.current.bind("pause", () => {
        setIsPlaying(false);
        stopProgressTracking();
      });
      widgetRef.current.bind("finish", () => {
        setCurrentTrack(null);
        resetTrackState();
      });
      widgetRef.current.bind("error", (error) => console.error("SoundCloud widget error:", error));
    },
    [tryPlayTrack, startProgressTracking, stopProgressTracking, updateTrackDuration, resetTrackState]
  );

  useEffect(() => stopProgressTracking, [stopProgressTracking]);

  const destroyWidget = useCallback(() => {
    if (!widgetRef.current) return;

    try {
      WIDGET_EVENTS.forEach((event) => widgetRef.current?.unbind(event));
    } catch (error) {
      console.error("Error unbinding widget events:", error);
    }
    widgetRef.current = null;
  }, []);

  const initializeWidget = useCallback(
    (trackUrl: string, index: number, autoPlay: boolean = false) => {
      if (!isApiReady || !iframeRef.current || !window.SC?.Widget) return;

      destroyWidget();

      iframeRef.current.src = getSoundCloudEmbedUrl(trackUrl);

      setTimeout(() => {
        if (!iframeRef.current || !window.SC?.Widget) return;
        try {
          widgetRef.current = new window.SC.Widget(iframeRef.current);
          bindWidgetEvents(index, autoPlay);
        } catch (error) {
          console.error("Error creating SoundCloud widget:", error);
        }
      }, TIMEOUTS.IFRAME_LOAD);
    },
    [isApiReady, bindWidgetEvents, destroyWidget]
  );

  // Load titles and durations for all tracks
  useEffect(() => {
    if (!isApiReady || !window.SC?.Widget) return;

    tracks.forEach((trackUrl, index) => {
      // Fetch titles
      fetchTrackTitle(trackUrl).then((title) => {
        if (title) setTrackTitles((prev) => updateMap(prev, index, title));
      });

      // Fetch durations using temporary iframe
      const tempIframe = document.createElement("iframe");
      tempIframe.style.position = "absolute";
      tempIframe.style.left = "-9999px";
      tempIframe.style.width = "100px";
      tempIframe.style.height = "100px";
      tempIframe.allow = "autoplay";
      tempIframe.src = getSoundCloudEmbedUrl(trackUrl);
      document.body.appendChild(tempIframe);

      setTimeout(() => {
        try {
          const tempWidget = new window.SC!.Widget(tempIframe);
          tempWidget.bind("ready", () => {
            setTimeout(() => {
              tempWidget.getDuration((duration: number) => {
                updateTrackDuration(index, duration);
                document.body.removeChild(tempIframe);
              });
            }, TIMEOUTS.DURATION_FETCH);
          });
        } catch {
          document.body.removeChild(tempIframe);
        }
      }, TIMEOUTS.TEMP_IFRAME_LOAD);
    });
  }, [isApiReady, tracks, updateTrackDuration]);

  // Initialize first track
  useEffect(() => {
    if (isApiReady && iframeRef.current && tracks.length > 0 && !widgetRef.current) {
      initializeWidget(tracks[0], 0, false);
    }
  }, [isApiReady, tracks, initializeWidget]);

  const handleTrackToggle = useCallback(
    (index: number) => {
      const trackUrl = tracks[index];
      if (!trackUrl) return;

      if (currentTrack !== index) {
        setCurrentTrack(index);
        setIsPlaying(true);
        setPlaybackProgress(0);
        initializeWidget(trackUrl, index, true);
        return;
      }

      if (!widgetRef.current) return;

      if (isPlaying) {
        setIsPlaying(false);
        try {
          widgetRef.current.pause();
        } catch {
          setIsPlaying(true);
        }
      } else {
        setIsPlaying(true);
        try {
          widgetRef.current.play();
        } catch {
          setIsPlaying(false);
        }
      }
    },
    [currentTrack, isPlaying, tracks, initializeWidget]
  );

  const handleSeek = useCallback(
    (newProgress: number) => {
      if (!widgetRef.current || currentTrack === null) return;

      widgetRef.current.getDuration((duration) => {
        if (duration <= 0) return;
        const newPosition = (newProgress / 100) * duration;
        try {
          widgetRef.current!.seekTo(newPosition);
          setPlaybackProgress(newProgress);
        } catch (error) {
          console.error("Error seeking in track:", error);
        }
      });
    },
    [currentTrack]
  );

  return (
    <div role="list" aria-label={dictionary.tracklist} className={cn("space-y-3", className)}>
      <iframe
        ref={iframeRef}
        style={{ position: "absolute", left: "-9999px", width: "100px", height: "100px" }}
        width={100}
        height={100}
        allow="autoplay"
        title="SoundCloud audio player"
      />

      {tracks.map((trackUrl, index) => {
        if (!trackUrl) return null;

        const isCurrentTrack = currentTrack === index;
        const isTrackPlaying = isCurrentTrack && isPlaying;
        const duration = trackDurations.get(index);
        const trackTitle = trackTitles.get(index) || "";

        return (
          <TrackItem
            key={trackUrl}
            title={trackTitle}
            isPlaying={isTrackPlaying}
            duration={duration}
            progress={isCurrentTrack ? playbackProgress : 0}
            trackUrl={trackUrl}
            onSeek={handleSeek}
            onPlay={() => handleTrackToggle(index)}
            aria-label={`${trackTitle} - ${isTrackPlaying ? dictionary.playing : dictionary.play}`}
          />
        );
      })}
    </div>
  );
}
