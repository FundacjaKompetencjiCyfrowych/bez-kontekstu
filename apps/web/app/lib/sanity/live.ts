import { client } from "./client";
import { defineLive } from "next-sanity/live";
import { SANITY_CONFIG } from "config";

const { browserToken, serverToken } = SANITY_CONFIG;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken,
  serverToken,
});
