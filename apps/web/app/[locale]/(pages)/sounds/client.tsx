"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TrackItem } from "@/app/components/sounds/TrackItem";
import { cn } from "@/app/lib/utils";

interface Track {
  id: number;
  title: string;
}

interface SoundsClientProps {
  tracks: Track[];
  dictionary: {
    tracklist: string[];
    playing: string;
    play: string;
  };
  className?: string;
}

// YouTube API types
interface YouTubePlayer {
  playVideo: () => void;
  stopVideo: () => void;
  loadVideoById: (videoId: string) => void;
  getVideoData: () => { title: string };
  destroy: () => void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data?: number;
}

// Constants
const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";
const IFRAME_STYLE = {
  position: "absolute" as const,
  left: "-9999px",
  top: "-9999px",
  width: "1px",
  height: "1px",
};
const PLAYER_VARS = {
  autoplay: 0,
  controls: 0,
  disablekb: 1,
  fs: 0,
  iv_load_policy: 3,
  modestbranding: 1,
  playsinline: 1,
  rel: 0,
  mute: 0,
};

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

// Get video title from player with retry
const getVideoTitle = (player: YouTubePlayer, retryDelay: number = 500): Promise<string | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const videoData = player.getVideoData();
        resolve(videoData.title);
      } catch (error) {
        console.error("Error getting video title:", error);
        resolve(null);
      }
    }, retryDelay);
  });
};

export function SoundsClient({ tracks, dictionary, className }: SoundsClientProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const shouldAutoPlayRef = useRef<boolean>(false);

  // Handle player ready event
  const handlePlayerReady = useCallback((event: YouTubePlayerEvent, autoPlay: boolean) => {
    const player = event.target;

    // Get video title
    getVideoTitle(player).then((title) => {
      if (title) setVideoTitle(title);
    });

    // Auto play if requested
    if (autoPlay && typeof player.playVideo === "function") {
      try {
        player.playVideo();
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  }, []);

  // Create new YouTube player instance
  const createPlayer = useCallback((videoId: string, autoPlay: boolean) => {
    if (!iframeRef.current) return;

    // Destroy existing player
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (error) {
        console.error("Error destroying player:", error);
      }
    }

    // Update iframe src
    iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

    // Create new player
    playerRef.current = new (window as any).YT.Player(iframeRef.current, {
      videoId,
      playerVars: {
        ...PLAYER_VARS,
        autoplay: autoPlay ? 1 : 0,
      },
      events: {
        onReady: (event: YouTubePlayerEvent) => handlePlayerReady(event, autoPlay),
        onError: (event: YouTubePlayerEvent) => {
          console.error("YouTube player error:", event.data);
        },
      },
    });
  }, [handlePlayerReady]);

  // Load video into existing player or create new one
  const loadVideo = useCallback(async (trackIndex: number, autoPlay: boolean = false) => {
    const trackUrl = dictionary.tracklist[trackIndex];
    if (!trackUrl) return;

    const videoId = getYouTubeVideoId(trackUrl);
    if (!videoId || !iframeRef.current) return;

    shouldAutoPlayRef.current = autoPlay;

    // If player exists, load new video
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      try {
        playerRef.current.loadVideoById(videoId);

        // Get title after loading
        const title = await getVideoTitle(playerRef.current);
        if (title) setVideoTitle(title);

        // Play if requested
        if (autoPlay) {
          setTimeout(() => {
            if (playerRef.current && typeof playerRef.current.playVideo === "function") {
              playerRef.current.playVideo();
            }
          }, 600);
        }
      } catch (error) {
        console.error("Error loading video:", error);
        createPlayer(videoId, autoPlay);
      }
    } else {
      // Create new player
      createPlayer(videoId, autoPlay);
    }
  }, [dictionary.tracklist, createPlayer]);

  // Load YouTube IFrame API script
  useEffect(() => {
    const scriptId = "youtube-iframe-api";

    // Check if script already exists
    if (document.getElementById(scriptId)) {
      if ((window as any).YT?.Player && !playerRef.current) {
        loadVideo(0);
      }
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = YOUTUBE_API_URL;
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    // Initialize player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        loadVideo(0);
      }
    };
  }, [loadVideo]);

  // Control player methods
  const playAudio = useCallback(() => {
    if (playerRef.current?.playVideo) {
      try {
        playerRef.current.playVideo();
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (playerRef.current?.stopVideo) {
      try {
        playerRef.current.stopVideo();
      } catch (error) {
        console.error("Error stopping video:", error);
      }
    }
  }, []);

  // Toggle track playback
  const toggleTrack = useCallback(
    (index: number) => {
      if (currentTrack === index) {
        // Stop if clicking same track
        stopAudio();
        setCurrentTrack(null);
        setVideoTitle(null);
      } else {
        // Load and play new track
        stopAudio();
        setCurrentTrack(index);
        setVideoTitle(null);

        if ((window as any).YT?.Player) {
          loadVideo(index, true);
        }
      }
    },
    [currentTrack, stopAudio, loadVideo]
  );

  // Get current video ID for iframe src
  const getCurrentVideoId = () => {
    const trackUrl =
      currentTrack !== null
        ? dictionary.tracklist[currentTrack]
        : dictionary.tracklist[0];
    return getYouTubeVideoId(trackUrl || "") || "";
  };

  return (
    <div role="list" aria-label="Tracklist" className={cn("space-y-3", className)}>
      {/* Hidden YouTube iframe - positioned off-screen to allow playback */}
      <iframe
        ref={iframeRef}
        style={IFRAME_STYLE}
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${getCurrentVideoId()}?enablejsapi=1`}
        allow="autoplay; encrypted-media"
        title="YouTube audio player"
      />

      {/* Display current video title */}
      {videoTitle && currentTrack !== null && (
        <div className="mb-5 ml-5 text-sm text-gray-400">Now playing: {videoTitle}</div>
      )}

      {tracks.map((track, index) => {
        // Only show tracks that have URLs in tracklist
        const trackUrl = dictionary.tracklist[index];
        if (!trackUrl) return null;

        return (
          <TrackItem
            key={track.id}
            title={track.title}
            isPlaying={currentTrack === index}
            onPlay={() => toggleTrack(index)}
            aria-label={`${track.title} - ${currentTrack === index ? dictionary.playing : dictionary.play
              }`}
          />
        );
      })}
    </div>
  );
}
