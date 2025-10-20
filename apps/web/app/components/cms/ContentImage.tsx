"use client";

import { cn } from "@/app/lib/utils";
import { urlFor } from "@/app/lib/sanity/image";
import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { SANITY_CONFIG } from "config";
import { SanityImageAsset } from "@/app/lib/sanity/types";
import { SanityReference } from "next-sanity";
const { imageQuality } = SANITY_CONFIG;

const calcAR = (width: unknown, height: unknown) => {
  if (width && height) return Number(width) / Number(height);
  return null;
};

const getSrc = (asset: SanityImageAsset | SanityReference): string => {
  if ("_ref" in asset && asset._ref) return asset._ref;
  if ("url" in asset && asset.url) return asset.url;
  return "";
};

/**
 * Loose type for Sanity image object that can be extended with custom fields
 * @property lqip - base64 encoded low quality image placeholder
 * @property alt - alternative text from CMS
 */
export type Image = {
  asset?: SanityImageAsset | SanityReference;
  lqip?: string | null;
  alt?: string | null;
  [key: string]: unknown | null | undefined;
};

type ContentImageProps = {
  aspect?: number;
  image: Image;
} & Omit<ImageProps, "src" | "loader" | "alt">;

/**
 * Wrapper for next/image with a custom loader for Sanity images
 * @param image - Sanity image object
 * @param aspect - Used with `fill` mode to determine the height of images to fetch. If no value is provided, the original height will be fetched.
 * @see https://nextjs.org/docs/app/api-reference/components/image#loader
 */
export function ContentImage({ image, aspect, ...props }: ContentImageProps) {
  if (!image?.asset) {
    console.warn("Missing Sanity image object in ContentImage component");
    return null;
  }

  const { alt, lqip } = image;

  const ratio = aspect ?? calcAR(props.width, props.height);

  const loader = (p: ImageLoaderProps) => {
    const url = urlFor(image)
      .auto("format") // convert to webp or avif if supported
      .quality(p.quality ?? imageQuality)
      .width(p.width);
    if (ratio) url.height(Math.round(p.width / ratio));
    if (props.fill) {
      url.fit("max");
    } else {
      url.fit("crop");
    }
    return url.url();
  };

  return (
    <Image
      {...props}
      src={getSrc(image.asset)}
      alt={alt || ""}
      loader={loader}
      {...(lqip && {
        placeholder: "blur",
        blurDataURL: lqip,
      })}
      className={cn("object-cover", props.className)}
    />
  );
}
