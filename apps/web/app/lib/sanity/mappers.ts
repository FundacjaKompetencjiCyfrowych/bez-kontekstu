import { Metadata } from "next";
import { Meta } from "./types";
import { urlFor } from "./image";

export const mapMetadata = (meta: Meta | undefined | null) => {
  const returns: Metadata = {};
  if (!meta || typeof meta !== "object") return returns;

  const { title, description, ogImage } = meta;

  if (title) returns.title = title;
  if (description) returns.description = description;
  if (ogImage)
    returns.openGraph = {
      images: [{ url: urlFor(ogImage).width(1200).height(630).fit("crop").auto("format").url() }],
      ...returns.openGraph,
    };

  return returns;
};
