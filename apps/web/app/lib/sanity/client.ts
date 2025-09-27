import { createClient } from "next-sanity";
import { SANITY_CONFIG } from "config";

const { projectId, dataset, apiVersion, useCdn } = SANITY_CONFIG;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});
