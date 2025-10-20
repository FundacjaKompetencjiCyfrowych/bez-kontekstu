// Function to convert YouTube URL to embed format
export const getYouTubeEmbedUrl = (url: string): string => {
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle youtube.com/watch format
  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const videoId = urlParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  // Return original URL if it's not a recognized YouTube format
  return url;
};

export const isYouTube = (url: string) => url.includes("youtu.be/") || url.includes("youtube.com/watch");
