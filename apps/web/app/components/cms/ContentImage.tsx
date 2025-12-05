"use client";

import { cn } from "@/app/lib/utils";
import { urlFor } from "@/app/lib/sanity/image";
import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { SANITY_CONFIG } from "config";
import { getShimmer } from "@/app/lib/shimmer";
import { SanityImageAsset, SanityImageDimensions, SanityImageHotspot, SanityImageCrop } from "@/app/lib/sanity/types";
const { imageQuality } = SANITY_CONFIG;

const getSrc = (asset: Image["asset"]): string => {
  if (!asset) {
    return "";
  }
  // Handle dereferenced asset (has url property)
  if ("url" in asset && asset.url) {
    return asset.url;
  }
  // Fallback to reference (if not dereferenced)
  if ("_ref" in asset && asset._ref) {
    return asset._ref;
  }
  return "";
};

const getDimensions = (image: Image): SanityImageDimensions => {
  const dimensions = (image?.asset as SanityImageAsset)?.metadata?.dimensions;
  return {
    _type: "sanity.imageDimensions",
    width: dimensions?.width ?? undefined,
    height: dimensions?.height ?? undefined,
    aspectRatio: dimensions?.aspectRatio ?? undefined,
  };
};

const getLqip = (image: Image): string => {
  return (image?.asset as SanityImageAsset)?.metadata?.lqip ?? "";
};

/**
 * Convert Sanity hotspot coordinates to CSS object-position
 */
const getObjectPosition = (hotspot?: SanityImageHotspot | null): string => {
  if (!hotspot || typeof hotspot.x !== "number" || typeof hotspot.y !== "number") {
    return "center";
  }
  const xPercent = (hotspot.x * 100).toFixed(1);
  const yPercent = (hotspot.y * 100).toFixed(1);
  return `${xPercent}% ${yPercent}%`;
};

/**
 * Loose type for Sanity image object that can be extended with custom fields
 * @property alt - custom field with alternative text from CMS
 */
export type Image = {
  asset?: {
    _ref?: string | null;
    url?: string | null;
    metadata?: { lqip?: string | null; dimensions?: SanityImageDimensions | null } | null;
    [key: string]: unknown;
  } | null;
  alt?: string | null;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
  [key: string]: unknown;
};

type ContentImageProps = {
  aspect?: number;
  image: Image;
  intrinsic?: boolean;
  shimmer?: boolean;
  shimmerColors?: { base?: string; highlight?: string };
  lqip?: boolean;
  width?: number;
  height?: number;
} & Omit<ImageProps, "src" | "loader" | "alt" | "width" | "height" | "placeholder" | "blurDataURL">;

const getSizeProps = (props: ContentImageProps) => {
  if (props.fill) {
    return {};
  }

  if (props.width && props.height) {
    return {
      width: props.width,
      height: props.height,
    };
  }
  const intrinsic = getDimensions(props.image);
  return {
    width: intrinsic.width,
    height: intrinsic.height,
  };
};

const getAspectRatio = (props: ContentImageProps): number => {
  if (props.width && props.height) return props.width / props.height;
  if (props.aspect) return props.aspect;
  const ar = getDimensions(props.image).aspectRatio;
  if (typeof ar === "number") return ar;
  return 1; // default square
};

const getPlaceholderProps = (props: ContentImageProps, aspect: number) => {
  if (props.shimmer && props.lqip) {
    console.warn("Only one can be set at a time in ContentImage component: shimmer, lqip");
  }
  if (props.lqip) {
    const lqip = getLqip(props.image);
    if (!lqip) {
      console.warn("Missing lqip data in ContentImage component");
      return {};
    }
    return {
      placeholder: "blur" as const,
      blurDataURL: getLqip(props.image),
    };
  }
  if (props.shimmer) {
    const w = props.width || 400;
    const h = w / aspect;
    const colors = props.shimmerColors;
    const shimmer = getShimmer(w, h, colors);
    if (!shimmer) {
      console.warn("Missing shimmer data in ContentImage component");
      return {};
    }
    return {
      placeholder: shimmer,
    };
  }
  return {};
};

/**
 * Wrapper for next/image with a custom loader for Sanity images
 * @param image - Sanity image object
 * @param aspect - Used with `fill` mode to enable hotspot cropping
 * @param shimmer - Show a shimmer effect while the image loads
 * @param shimmerColors - Colors for the shimmer effect, object with `base` and `highlight` strings
 * @param lqip - Show a low quality placeholder from `asset->metadata.lqip` while the image loads
 * @param intrinsic - Use intrinsic dimensions from Sanity image object, requires `asset->metadata.dimensions`
 * @see https://nextjs.org/docs/app/api-reference/components/image#loader
 */
export function ContentImage(props: ContentImageProps) {
   
  const { image, aspect, shimmer, shimmerColors, lqip, width, height, fill, intrinsic, ...defaultProps } = props;
  if (!image?.asset) {
    console.warn("Missing Sanity image object in ContentImage component");
    return null;
  }
  if ((fill && width) || (fill && height) || (fill && intrinsic) || (intrinsic && width) || (intrinsic && height)) {
    console.warn("Only one can be set at a time in ContentImage component: intrinsic, width and height, or fill");
    return null;
  }
  const src = getSrc(image.asset);
  const alt = image.alt || "";
  const sizeProps = getSizeProps(props);
  const aspectRatio = getAspectRatio(props);
  const placeholderProps = getPlaceholderProps(props, aspectRatio);
  const fit = fill ? "max" : "crop";
  const objectPosition = getObjectPosition(image.hotspot);

  const loader = (p: ImageLoaderProps) => {
    return urlFor(image)
      .auto("format") // convert to webp or avif if supported
      .quality(p.quality ?? imageQuality)
      .width(p.width) // width picked by Next.js
      .height(Math.round(p.width / aspectRatio))
      .fit(fit)
      .url();
  };

  return (
    <Image
      {...defaultProps}
      {...sizeProps}
      {...placeholderProps}
      src={src}
      alt={alt}
      fill={fill}
      loader={loader}
      className={cn("object-cover", props.className)}
      style={{
        ...defaultProps.style,
        objectPosition,
      }}
    />
  );
}
