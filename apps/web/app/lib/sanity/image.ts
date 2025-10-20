import { client } from "./client";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

/**
 * Utility for creating image URLs from Sanity image assets
 * @see https://www.sanity.io/plugins/image-url
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
