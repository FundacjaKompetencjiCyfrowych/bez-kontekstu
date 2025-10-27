import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

export interface ShimmerColors {
  base?: string;
  highlight?: string;
}

export const shimmer = (w: number, h: number, colors: ShimmerColors = {}) => {
  const baseColor = colors.base || "#f6f7f8";
  const highlightColor = colors.highlight || "#edeef1";

  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<linearGradient id="g">
<stop stop-color="${baseColor}" offset="0%" />
<stop stop-color="${highlightColor}" offset="20%" />
<stop stop-color="${baseColor}" offset="40%" />
<stop stop-color="${baseColor}" offset="100%" />
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="${baseColor}" />
<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;
};

export const toBase64 = (str: string) => (typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str));

export const getShimmer = (w: number, h: number, colors?: ShimmerColors) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h, colors))}` as PlaceholderValue;
