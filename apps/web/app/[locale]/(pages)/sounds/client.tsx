"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TrackItem } from "@/app/components/sounds/TrackItem";
import { cn } from "@/app/lib/utils";

// YouTube IFrame API types
interface YouTubePlayerVars {
  autoplay?: 0 | 1;
  controls?: 0 | 1;
  disablekb?: 0 | 1;
  fs?: 0 | 1;
  iv_load_policy?: 1 | 3;
  modestbranding?: 0 | 1;
  playsinline?: 0 | 1;
  rel?: 0 | 1;
  mute?: 0 | 1;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data: number;
}

interface YouTubeVideoData {
  video_id: string;
  title: string;
  author: string;
  video_quality: string;
}

interface YouTubePlayer {
  loadVideoById(videoId: string): void;
  playVideo(): void;
  stopVideo(): void;
  pauseVideo(): void;
  destroy(): void;
  getVideoData(): YouTubeVideoData;
}

interface YouTubePlayerConstructor {
  new(element: HTMLElement | string, config: {
    videoId?: string;
    playerVars?: YouTubePlayerVars;
    events?: {
      onReady?: (event: YouTubePlayerEvent) => void;
      onError?: (event: YouTubePlayerEvent) => void;
    };
  }): YouTubePlayer;
}

interface YouTubeNamespace {
  Player: YouTubePlayerConstructor;
}

// Extend Window interface to include YouTube API
declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
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

const TEST_SOUND_URL = "https://www.youtube.com/watch?v=hTWKbfoikeg";

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

export function SoundsClient({ tracks, dictionary, className }: SoundsClientProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const shouldAutoPlayRef = useRef<boolean>(false);

  // Initialize YouTube player for specific track index
  const initializePlayer = useCallback((trackIndex: number, autoPlay: boolean = false) => {
    const trackUrl = TEST_SOUND_URL;
    if (!trackUrl) return;

    const videoId = getYouTubeVideoId(trackUrl);
    if (!videoId || !iframeRef.current) return;

    shouldAutoPlayRef.current = autoPlay;

    // If player already exists, just load new video
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      try {
        playerRef.current.loadVideoById(videoId);
        // Get title
        setTimeout(() => {
          try {
            if (playerRef.current) {
              const videoData = playerRef.current.getVideoData();
              setVideoTitle(videoData.title);
            }
          } catch (error) {
            console.error("Error getting video title:", error);
          }
        }, 500);
      } catch (error) {
        console.error("Error loading video:", error);
      }
      return;
    }

    // Destroy existing player if it exists (but doesn't have loadVideoById)
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (error) {
        console.error("Error destroying player:", error);
      }
      playerRef.current = null;
    }

    // Update iframe src first
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }

    // Create new player with selected video
    if (!window.YT?.Player || !iframeRef.current) return;

    playerRef.current = new window.YT.Player(iframeRef.current, {
      videoId: videoId,
      playerVars: {
        autoplay: shouldAutoPlayRef.current ? 1 : 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        mute: 0,
      },
      events: {
        onReady: (event: YouTubePlayerEvent) => {
          try {
            const videoData = event.target.getVideoData();
            setVideoTitle(videoData.title);
          } catch (error) {
            console.error("Error getting video title:", error);
          }

          // Auto play if requested
          if (shouldAutoPlayRef.current && event.target && typeof event.target.playVideo === "function") {
            try {
              event.target.playVideo();
            } catch (error) {
              console.error("Error playing video:", error);
            }
          }
        },
        onError: (event: YouTubePlayerEvent) => {
          console.error("YouTube player error:", event.data);
        },
      },
    });
  }, [TEST_SOUND_URL]);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById("youtube-iframe-api")) {
      // If script exists but player not initialized, wait for API to be ready
      if (window.YT?.Player && !playerRef.current) {
        initializePlayer(0);
      }
      return;
    }

    // Load YouTube IFrame API script
    const tag = document.createElement("script");
    tag.id = "youtube-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        initializePlayer(0);
      }
    };
  }, [initializePlayer]);

  const playAudio = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      try {
        playerRef.current.playVideo();
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  };

  const stopAudio = () => {
    if (playerRef.current && typeof playerRef.current.stopVideo === "function") {
      try {
        playerRef.current.stopVideo();
      } catch (error) {
        console.error("Error stopping video:", error);
      }
    }
  };

  const toggleTrack = (index: number) => {
    if (currentTrack === index) {
      // Stop current track
      stopAudio();
      setCurrentTrack(null);
      setVideoTitle(null);
    } else {
      // Stop current and switch to new track
      stopAudio();
      setCurrentTrack(index);
      setVideoTitle(null);

      // Initialize or load player with new track
      if (window.YT?.Player) {
        // If player exists, try to load video directly
        if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
          const trackUrl = TEST_SOUND_URL;
          const videoId = getYouTubeVideoId(trackUrl);
          if (videoId) {
            try {
              playerRef.current.loadVideoById(videoId);
              // Get title
              setTimeout(() => {
                try {
                  if (playerRef.current) {
                    const videoData = playerRef.current.getVideoData();
                    setVideoTitle(videoData.title);
                  }
                } catch (error) {
                  console.error("Error getting video title:", error);
                }
              }, 500);
              // Play after loading
              setTimeout(() => {
                playAudio();
              }, 600);
            } catch (error) {
              console.error("Error loading video:", error);
              initializePlayer(index, true);
            }
          }
        } else {
          // Initialize new player
          initializePlayer(index, true);
        }
      }
    }
  };

  // Get current video ID for iframe src
  const currentVideoId =
    currentTrack !== null && TEST_SOUND_URL
      ? getYouTubeVideoId(TEST_SOUND_URL)
      : getYouTubeVideoId(TEST_SOUND_URL || "");

  return (
    <div role="list" aria-label="Tracklist" className={cn("space-y-3", className)}>
      {/* Hidden YouTube iframe - positioned off-screen instead of display:none to allow playback */}
      <iframe
        ref={iframeRef}
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px" }}
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${currentVideoId}?enablejsapi=1`}
        allow="autoplay; encrypted-media"
        title="YouTube audio player"
      />

      {/* Display video title if available */}
      {videoTitle && currentTrack !== null && (
        <div className="mb-5 ml-5 text-sm text-gray-400">
          Now playing: {videoTitle}
        </div>
      )}

      {tracks.map((track, index) => {
        // Only show tracks that have URLs in tracklist
        const trackUrl = TEST_SOUND_URL;
        if (!trackUrl) return null;

        return (
          <TrackItem
            key={track.id}
            title={track.title}
            isPlaying={currentTrack === index}
            onPlay={() => toggleTrack(index)}
            aria-label={`${track.title} - ${currentTrack === index ? dictionary.playing : dictionary.play}`}
          />
        );
      })}
    </div>
  );
}
