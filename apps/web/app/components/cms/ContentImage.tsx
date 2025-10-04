"use client";

import { sanityLoader } from "@/app/lib/sanity/image";
import Image, { ImageProps } from "next/image";

/**
 * Wrapper for next/image with a custom loader for Sanity images
 * @see https://nextjs.org/docs/app/api-reference/components/image#loader
 */
export function ContentImage(props: ImageProps) {
  return <Image loader={sanityLoader} {...props} alt={props.alt} />;
}
