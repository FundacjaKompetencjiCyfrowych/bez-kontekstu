import { client } from "./client";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { type ImageLoaderProps } from "next/image";

// Docs: https://www.sanity.io/docs/image-urls

const builder = imageUrlBuilder(client);

// Utility for creating image URLs from Sanity image assets
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Next.js image loader
export function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  return urlFor(src)
    .auto("format")
    .fit("max")
    .width(width)
    .quality(quality ?? 75)
    .url();
}
