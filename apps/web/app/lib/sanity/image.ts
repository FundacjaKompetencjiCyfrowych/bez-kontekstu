import { client } from "./client";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { type ImageLoaderProps } from "next/image";

const builder = imageUrlBuilder(client);

/**
 * Utility for creating image URLs from Sanity image assets
 * @see https://www.sanity.io/plugins/image-url
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

/**
 * Next.js image loader for Sanity images
 * @see https://nextjs.org/docs/app/api-reference/components/image#loader
 * @see https://www.sanity.io/docs/image-urls
 */
export function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  return urlFor(src)
    .auto("format")
    .fit("max")
    .width(width)
    .quality(quality ?? 75)
    .url();
}
