/* 
  Contains config shared across apps in the monorepo.
*/

export const SANITY_CONFIG = {
  projectId: "ppkzed19",
  dataset: "production",
  apiVersion: "2025-09-20",
  useCdn: true,
  autoUpdates: true,
  browserToken: false,
  serverToken: false,
  queries: "apps/web/app/lib/sanity/queries.ts",
  types: "apps/web/app/lib/sanity/types.ts",
  imageQuality: 75,
} as const;
