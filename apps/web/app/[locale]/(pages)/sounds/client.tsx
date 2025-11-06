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

// Constants
const SOUNDCLOUD_TRACKS = [
  "https://soundcloud.com/bez-kontekstu/arcade-ii-1",
  "https://soundcloud.com/bez-kontekstu/cloud-music-2",
  "https://soundcloud.com/bez-kontekstu/graduation-3",
] as const;

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

// Helper functions
const getSoundCloudEmbedUrl = (trackUrl: string): string => {
  const encodedUrl = encodeURIComponent(trackUrl);
  return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;
};

const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const updateMap = <K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> => {
  const newMap = new Map(map);
  newMap.set(key, value);
  return newMap;
};

// Fetch track title from SoundCloud oEmbed API
const fetchTrackTitle = async (trackUrl: string): Promise<string | null> => {
  try {
    const oembedUrl = `https://soundcloud.com/oembed?url=${encodeURIComponent(trackUrl)}&format=json`;
    const response = await fetch(oembedUrl);
    if (!response.ok) return null;

    const data = await response.json();
    // Extract title from HTML or use title field
    if (data.title) {
      return data.title;
    }
    return null;
  } catch (error) {
    console.error("Error fetching track title:", error);
    return null;
  }
};

export function SoundsClient({ tracks, dictionary, className }: SoundsClientProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDurations, setTrackDurations] = useState<Map<number, string>>(new Map());
  const [trackTitles, setTrackTitles] = useState<Map<number, string>>(new Map());
  const [playbackProgress, setPlaybackProgress] = useState<number>(0); // 0-100
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);

  // Load SoundCloud Widget API
  useEffect(() => {
    // Check if already loaded
    if (window.SC?.Widget) {
      setIsApiReady(true);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.getElementById("soundcloud-widget-api");
    if (existingScript) {
      // Wait for API to be ready
      const checkInterval = setInterval(() => {
        if (window.SC?.Widget) {
          setIsApiReady(true);
          clearInterval(checkInterval);
        }
      }, TIMEOUTS.API_CHECK_INTERVAL);
      return () => clearInterval(checkInterval);
    }

    // Load SoundCloud Widget API
    const script = document.createElement("script");
    script.id = "soundcloud-widget-api";
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        if (window.SC?.Widget) {
          setIsApiReady(true);
        }
      }, TIMEOUTS.API_LOAD_DELAY);
    };

    document.head.appendChild(script);
  }, []);

  // Track playback progress
  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Calculate progress percentage
  const calculateProgress = useCallback((position: number, duration: number): number => {
    if (duration <= 0 || position < 0) return 0;
    return Math.min(100, Math.max(0, (position / duration) * 100));
  }, []);

  const startProgressTracking = useCallback(() => {
    // Don't start if already tracking
    if (progressIntervalRef.current) {
      return;
    }

    const updateProgress = () => {
      if (!widgetRef.current) {
        stopProgressTracking();
        return;
      }

      widgetRef.current.getPosition((position: number) => {
        if (!widgetRef.current) return;

        // Only update if position is valid (>= 0)
        if (position < 0) return;

        widgetRef.current.getDuration((duration: number) => {
          if (duration <= 0) return;

          const progress = calculateProgress(position, duration);
          setPlaybackProgress(progress);
        });
      });
    };

    updateProgress();
    progressIntervalRef.current = setInterval(updateProgress, TIMEOUTS.PROGRESS_UPDATE);
  }, [stopProgressTracking, calculateProgress]);

  // Reset track state
  const resetTrackState = useCallback(() => {
    setIsPlaying(false);
    setPlaybackProgress(0);
    stopProgressTracking();
  }, [stopProgressTracking]);

  // Try to play track with retry logic
  const tryPlayTrack = useCallback(
    (attempt: number = 0) => {
      if (attempt > MAX_RETRY_ATTEMPTS) {
        console.error("Failed to play track after multiple attempts");
        return;
      }

      if (!widgetRef.current) return;

      try {
        widgetRef.current.play();
        setIsPlaying(true);
        // Start progress tracking when playing starts (in case play event doesn't fire)
        setTimeout(() => {
          startProgressTracking();
        }, TIMEOUTS.PROGRESS_START_DELAY);
      } catch (error) {
        console.error(`Error playing track (attempt ${attempt + 1}):`, error);
        if (attempt < MAX_RETRY_ATTEMPTS) {
          setTimeout(() => tryPlayTrack(attempt + 1), TIMEOUTS.RETRY_DELAY * (attempt + 1));
        }
      }
    },
    [startProgressTracking]
  );

  // Update track duration in state
  const updateTrackDuration = useCallback((trackIndex: number, duration: number) => {
    if (trackIndex !== -1 && duration > 0) {
      const formattedDuration = formatDuration(duration);
      setTrackDurations((prev) => updateMap(prev, trackIndex, formattedDuration));
    }
  }, []);

  // Bind widget events
  const bindWidgetEvents = useCallback(
    (trackUrl: string, autoPlay: boolean) => {
      if (!widgetRef.current) return;

      const trackIndex = SOUNDCLOUD_TRACKS.findIndex((url) => url === trackUrl);

      widgetRef.current.bind("ready", () => {
        // Get track duration
        if (widgetRef.current) {
          setTimeout(() => {
            widgetRef.current?.getDuration((duration: number) => {
              updateTrackDuration(trackIndex, duration);
            });
          }, TIMEOUTS.DURATION_FETCH);
        }

        // Auto-play if requested
        if (autoPlay && widgetRef.current) {
          setTimeout(() => {
            widgetRef.current && tryPlayTrack();
          }, TIMEOUTS.AUTO_PLAY);
        }
      });

      widgetRef.current.bind("play", () => {
        setIsPlaying(true);
        // Start tracking after a small delay to ensure widget is ready
        setTimeout(() => {
          startProgressTracking();
        }, TIMEOUTS.PLAY_EVENT_DELAY);
      });

      widgetRef.current.bind("pause", () => {
        setIsPlaying(false);
        stopProgressTracking();
      });

      widgetRef.current.bind("finish", () => {
        setCurrentTrack(null);
        resetTrackState();
      });
      widgetRef.current.bind("error", (error: unknown) => {
        console.error("SoundCloud widget error:", error);
      });
    },
    [tryPlayTrack, startProgressTracking, stopProgressTracking, updateTrackDuration, resetTrackState]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, [stopProgressTracking]);

  // Destroy existing widget
  const destroyWidget = useCallback(() => {
    if (!widgetRef.current) return;

    try {
      WIDGET_EVENTS.forEach((event) => {
        widgetRef.current?.unbind(event);
      });
    } catch (error) {
      console.error("Error unbinding widget events:", error);
    }
    widgetRef.current = null;
  }, []);

  // Initialize widget when API is ready or when track changes
  const initializeWidget = useCallback(
    (trackUrl: string, autoPlay: boolean = false) => {
      if (!isApiReady || !iframeRef.current || !window.SC?.Widget) {
        return;
      }

      destroyWidget();

      // Update iframe src
      if (iframeRef.current) {
        iframeRef.current.src = getSoundCloudEmbedUrl(trackUrl);
      }

      // Wait for iframe to update, then create new widget
      setTimeout(() => {
        if (!iframeRef.current || !window.SC?.Widget) {
          console.warn("Cannot create widget: iframe or API not available");
          return;
        }

        try {
          widgetRef.current = new window.SC.Widget(iframeRef.current);
          bindWidgetEvents(trackUrl, autoPlay);
        } catch (error) {
          console.error("Error creating SoundCloud widget:", error);
        }
      }, TIMEOUTS.IFRAME_LOAD);
    },
    [isApiReady, bindWidgetEvents, destroyWidget]
  );

  // Load titles and durations for all tracks when API is ready
  useEffect(() => {
    if (!isApiReady || !window.SC?.Widget) return;

    // Track which durations have been loaded to avoid duplicates
    const loadedDurations = new Set<number>();

    // Fetch all track titles first
    const loadAllTitles = async () => {
      for (let i = 0; i < SOUNDCLOUD_TRACKS.length; i++) {
        const trackUrl = SOUNDCLOUD_TRACKS[i];
        if (!trackUrl) continue;

        const title = await fetchTrackTitle(trackUrl);
        if (title) {
          setTrackTitles((prev) => updateMap(prev, i, title));
        }

        await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.TRACK_DELAY));
      }
    };

    // Create temporary iframe for loading track duration
    const createTempIframe = (trackUrl: string): HTMLIFrameElement => {
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.width = "100px";
      iframe.style.height = "100px";
      iframe.src = getSoundCloudEmbedUrl(trackUrl);
      iframe.allow = "autoplay";
      return iframe;
    };

    // Load duration for a single track
    const loadTrackDuration = async (index: number, trackUrl: string): Promise<void> => {
      const tempIframe = createTempIframe(trackUrl);
      document.body.appendChild(tempIframe);

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          try {
            const tempWidget = new window.SC!.Widget(tempIframe);
            tempWidget.bind("ready", () => {
              setTimeout(() => {
                tempWidget.getDuration((duration: number) => {
                  updateTrackDuration(index, duration);
                  document.body.removeChild(tempIframe);
                  resolve();
                });
              }, TIMEOUTS.DURATION_FETCH);
            });
          } catch (error) {
            console.error(`Error loading duration for track ${index}:`, error);
            document.body.removeChild(tempIframe);
            resolve();
          }
        }, TIMEOUTS.TEMP_IFRAME_LOAD);
      });
    };

    // Create temporary iframes to load all tracks and get their durations
    const loadAllDurations = async () => {
      for (let i = 0; i < SOUNDCLOUD_TRACKS.length; i++) {
        if (loadedDurations.has(i)) continue;

        const trackUrl = SOUNDCLOUD_TRACKS[i];
        if (!trackUrl) continue;

        loadedDurations.add(i);
        await loadTrackDuration(i, trackUrl);
        await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.TRACK_DELAY));
      }
    };

    // Load titles and durations in parallel
    loadAllTitles();
    loadAllDurations();
  }, [isApiReady, updateTrackDuration]);

  // Initialize widget when API is ready (with first track)
  useEffect(() => {
    if (isApiReady && iframeRef.current && !widgetRef.current) {
      const firstTrackUrl = SOUNDCLOUD_TRACKS[0];
      if (firstTrackUrl) {
        initializeWidget(firstTrackUrl, false);
      }
    }
  }, [isApiReady, initializeWidget]);

  const handleTrackToggle = useCallback(
    (index: number) => {
      const trackUrl = SOUNDCLOUD_TRACKS[index];
      if (!trackUrl) return;

      if (currentTrack === index) {
        // Same track - toggle play/pause
        if (widgetRef.current) {
          if (isPlaying) {
            widgetRef.current.pause();
            setIsPlaying(false);
          } else {
            widgetRef.current.play();
            setIsPlaying(true);
          }
        }
      } else {
        // Different track - create new widget with this track
        setCurrentTrack(index);
        resetTrackState();
        initializeWidget(trackUrl, true);
      }
    },
    [currentTrack, isPlaying, initializeWidget, resetTrackState]
  );

  return (
    <div role="list" aria-label="Tracklist" className={cn("space-y-3", className)}>
      {/* Hidden SoundCloud iframe */}
      <iframe
        ref={iframeRef}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "100px",
          height: "100px",
        }}
        width="100"
        height="100"
        allow="autoplay"
        title="SoundCloud audio player"
        scrolling="no"
        frameBorder="no"
      />

      {tracks.map((track, index) => {
        // Only show tracks that have URLs
        const trackUrl = SOUNDCLOUD_TRACKS[index];
        if (!trackUrl) return null;

        const isCurrentTrack = currentTrack === index;
        const isTrackPlaying = isCurrentTrack && isPlaying;

        const duration = trackDurations.get(index);
        const trackTitle = trackTitles.get(index) || track.title; // Use fetched title or fallback to default
        const progress = isCurrentTrack ? playbackProgress : 0;

        return (
          <TrackItem
            key={track.id}
            title={trackTitle}
            isPlaying={isTrackPlaying}
            duration={duration}
            progress={progress}
            trackUrl={trackUrl}
            onPlay={() => handleTrackToggle(index)}
            aria-label={`${trackTitle} - ${isTrackPlaying ? dictionary.playing : dictionary.play}`}
          />
        );
      })}
    </div>
  );
}
